import { useState } from "react";
import {
  ConditionNode,
  EntryRule,
  IndicatorSpec,
  StrategySpec,
  ValueRef
} from "@prompttrader/schema";

const defaultValueRef = (): ValueRef => ({ type: "number", value: 0 });

const defaultCondition = (): ConditionNode => ({
  type: "comparison",
  left: defaultValueRef(),
  operator: ">",
  right: defaultValueRef()
});

const defaultGroup = (): ConditionNode => ({
  type: "group",
  operator: "AND",
  conditions: [defaultCondition()]
});

const indicatorTypes: IndicatorSpec["type"][] = ["SMA", "EMA", "RSI", "ATR", "MACD"];

const ConditionEditor = ({
  node,
  onChange,
  onRemove
}: {
  node: ConditionNode;
  onChange: (node: ConditionNode) => void;
  onRemove?: () => void;
}) => {
  const updateField = (field: string, value: string) => {
    if (field === "type") {
      if (value === "group") {
        onChange(defaultGroup());
        return;
      }
      if (value === "comparison") {
        onChange(defaultCondition());
        return;
      }
      onChange({ type: "cross", direction: "above", left: defaultValueRef(), right: defaultValueRef() });
      return;
    }
  };

  return (
    <div style={{ border: "1px solid #eee", padding: "12px", borderRadius: "8px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <label>
          Type
          <select value={node.type} onChange={(event) => updateField("type", event.target.value)}>
            <option value="group">Group</option>
            <option value="comparison">Comparison</option>
            <option value="cross">Cross</option>
          </select>
        </label>
        {onRemove ? (
          <button type="button" onClick={onRemove}>
            Remove
          </button>
        ) : null}
      </div>

      {node.type === "group" ? (
        <div style={{ display: "grid", gap: "8px" }}>
          <label>
            Operator
            <select
              value={node.operator}
              onChange={(event) => onChange({ ...node, operator: event.target.value as "AND" | "OR" })}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </label>
          {node.conditions.map((condition, index) => (
            <ConditionEditor
              key={index}
              node={condition}
              onChange={(updated) => {
                const next = [...node.conditions];
                next[index] = updated;
                onChange({ ...node, conditions: next });
              }}
              onRemove={() => {
                const next = node.conditions.filter((_, idx) => idx !== index);
                onChange({ ...node, conditions: next.length ? next : [defaultCondition()] });
              }}
            />
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...node, conditions: [...node.conditions, defaultCondition()] })}
          >
            Add Condition
          </button>
        </div>
      ) : null}

      {node.type === "comparison" ? (
        <div style={{ display: "grid", gap: "8px" }}>
          <ValueRefEditor value={node.left} onChange={(left) => onChange({ ...node, left })} />
          <label>
            Operator
            <select
              value={node.operator}
              onChange={(event) => onChange({ ...node, operator: event.target.value as "<" | "<=" | ">" | ">=" | "==" | "!=" })}
            >
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
              <option value="<">&lt;</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
          </label>
          <ValueRefEditor value={node.right} onChange={(right) => onChange({ ...node, right })} />
        </div>
      ) : null}

      {node.type === "cross" ? (
        <div style={{ display: "grid", gap: "8px" }}>
          <label>
            Direction
            <select
              value={node.direction}
              onChange={(event) => onChange({ ...node, direction: event.target.value as "above" | "below" })}
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </label>
          <ValueRefEditor value={node.left} onChange={(left) => onChange({ ...node, left })} />
          <ValueRefEditor value={node.right} onChange={(right) => onChange({ ...node, right })} />
        </div>
      ) : null}
    </div>
  );
};

const ValueRefEditor = ({
  value,
  onChange
}: {
  value: ValueRef;
  onChange: (value: ValueRef) => void;
}) => {
  const setType = (type: ValueRef["type"]) => {
    if (type === "number") {
      onChange({ type: "number", value: 0 });
      return;
    }
    if (type === "indicator") {
      onChange({ type: "indicator", ref: { id: "indicatorId", shift: 0 } });
      return;
    }
    onChange({ type: "price", field: "close", shift: 0 });
  };

  return (
    <div style={{ display: "grid", gap: "6px" }}>
      <label>
        Value Type
        <select value={value.type} onChange={(event) => setType(event.target.value as ValueRef["type"])}>
          <option value="number">Number</option>
          <option value="indicator">Indicator</option>
          <option value="price">Price</option>
        </select>
      </label>
      {value.type === "number" ? (
        <label>
          Number
          <input
            type="number"
            value={value.value}
            onChange={(event) => onChange({ ...value, value: Number(event.target.value) })}
          />
        </label>
      ) : null}
      {value.type === "indicator" ? (
        <div style={{ display: "grid", gap: "6px" }}>
          <label>
            Indicator ID
            <input
              value={value.ref.id}
              onChange={(event) => onChange({ ...value, ref: { ...value.ref, id: event.target.value } })}
            />
          </label>
          <label>
            Shift
            <input
              type="number"
              value={value.ref.shift ?? 0}
              onChange={(event) =>
                onChange({ ...value, ref: { ...value.ref, shift: Number(event.target.value) } })
              }
            />
          </label>
        </div>
      ) : null}
      {value.type === "price" ? (
        <div style={{ display: "grid", gap: "6px" }}>
          <label>
            Field
            <select
              value={value.field}
              onChange={(event) =>
                onChange({ ...value, field: event.target.value as "open" | "high" | "low" | "close" | "hl2" | "hlc3" })
              }
            >
              <option value="open">open</option>
              <option value="high">high</option>
              <option value="low">low</option>
              <option value="close">close</option>
              <option value="hl2">hl2</option>
              <option value="hlc3">hlc3</option>
            </select>
          </label>
          <label>
            Shift
            <input
              type="number"
              value={value.shift ?? 0}
              onChange={(event) => onChange({ ...value, shift: Number(event.target.value) })}
            />
          </label>
        </div>
      ) : null}
    </div>
  );
};

const EntryRuleEditor = ({
  rule,
  onChange
}: {
  rule: EntryRule;
  onChange: (rule: EntryRule) => void;
}) => {
  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <label>
        Description
        <input
          value={rule.description}
          onChange={(event) => onChange({ ...rule, description: event.target.value })}
        />
      </label>
      <ConditionEditor node={rule.conditions} onChange={(conditions) => onChange({ ...rule, conditions })} />
    </div>
  );
};

const IndicatorEditor = ({
  indicator,
  onChange,
  onRemove
}: {
  indicator: IndicatorSpec;
  onChange: (indicator: IndicatorSpec) => void;
  onRemove: () => void;
}) => {
  const [paramText, setParamText] = useState(JSON.stringify(indicator.params, null, 2));

  return (
    <div style={{ border: "1px solid #eee", padding: "12px", borderRadius: "8px" }}>
      <div style={{ display: "grid", gap: "8px" }}>
        <label>
          ID
          <input value={indicator.id} onChange={(event) => onChange({ ...indicator, id: event.target.value })} />
        </label>
        <label>
          Type
          <select
            value={indicator.type}
            onChange={(event) => onChange({ ...indicator, type: event.target.value as IndicatorSpec["type"] })}
          >
            {indicatorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Params (JSON)
          <textarea
            rows={4}
            value={paramText}
            onChange={(event) => setParamText(event.target.value)}
            onBlur={() => {
              try {
                const parsed = JSON.parse(paramText);
                onChange({ ...indicator, params: parsed });
              } catch (error) {
                setParamText(JSON.stringify(indicator.params, null, 2));
              }
            }}
          />
        </label>
        <button type="button" onClick={onRemove}>
          Remove Indicator
        </button>
      </div>
    </div>
  );
};

export default function StrategyBuilder({ initialSpec }: { initialSpec: StrategySpec }) {
  const [spec, setSpec] = useState<StrategySpec>(initialSpec);

  const updateIndicators = (nextIndicators: IndicatorSpec[]) => {
    setSpec({ ...spec, indicators: nextIndicators });
  };

  return (
    <div style={{ display: "grid", gap: "24px" }}>
      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Indicators</h2>
        {spec.indicators.map((indicator, index) => (
          <IndicatorEditor
            key={`${indicator.id}-${index}`}
            indicator={indicator}
            onChange={(updated) => {
              const next = [...spec.indicators];
              next[index] = updated;
              updateIndicators(next);
            }}
            onRemove={() => {
              const next = spec.indicators.filter((_, idx) => idx !== index);
              updateIndicators(next);
            }}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            updateIndicators([
              ...spec.indicators,
              { id: `indicator${spec.indicators.length + 1}`, type: "SMA", params: { period: 20 } }
            ])
          }
        >
          Add Indicator
        </button>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Entry Rules - Long</h2>
        <EntryRuleEditor
          rule={spec.entryRules.long}
          onChange={(rule) => setSpec({ ...spec, entryRules: { ...spec.entryRules, long: rule } })}
        />
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Entry Rules - Short</h2>
        <EntryRuleEditor
          rule={spec.entryRules.short}
          onChange={(rule) => setSpec({ ...spec, entryRules: { ...spec.entryRules, short: rule } })}
        />
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Exit Rules</h2>
        <label>
          Description
          <input
            value={spec.exitRules.description}
            onChange={(event) =>
              setSpec({ ...spec, exitRules: { ...spec.exitRules, description: event.target.value } })
            }
          />
        </label>
        <label>
          Stop Loss ATR Multiplier
          <input
            type="number"
            value={spec.exitRules.stopLossAtrMultiplier ?? 0}
            onChange={(event) =>
              setSpec({
                ...spec,
                exitRules: { ...spec.exitRules, stopLossAtrMultiplier: Number(event.target.value) }
              })
            }
          />
        </label>
        <label>
          Take Profit R:R
          <input
            type="number"
            value={spec.exitRules.takeProfitRr ?? 0}
            onChange={(event) =>
              setSpec({
                ...spec,
                exitRules: { ...spec.exitRules, takeProfitRr: Number(event.target.value) }
              })
            }
          />
        </label>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Risk</h2>
        <label>
          Mode
          <select
            value={spec.risk.mode}
            onChange={(event) => setSpec({ ...spec, risk: { ...spec.risk, mode: event.target.value as StrategySpec["risk"]["mode"] } })}
          >
            <option value="fixedLot">Fixed Lot</option>
            <option value="percentEquity">% Equity</option>
          </select>
        </label>
        <label>
          Fixed Lot
          <input
            type="number"
            value={spec.risk.fixedLot ?? 0}
            onChange={(event) =>
              setSpec({ ...spec, risk: { ...spec.risk, fixedLot: Number(event.target.value) } })
            }
          />
        </label>
        <label>
          Risk %
          <input
            type="number"
            value={spec.risk.riskPercent ?? 0}
            onChange={(event) =>
              setSpec({ ...spec, risk: { ...spec.risk, riskPercent: Number(event.target.value) } })
            }
          />
        </label>
        <label>
          Max Risk % per Day
          <input
            type="number"
            value={spec.risk.maxRiskPerDayPercent ?? 0}
            onChange={(event) =>
              setSpec({
                ...spec,
                risk: { ...spec.risk, maxRiskPerDayPercent: Number(event.target.value) }
              })
            }
          />
        </label>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Constraints</h2>
        <label>
          Max Spread
          <input
            type="number"
            value={spec.constraints.maxSpread}
            onChange={(event) =>
              setSpec({
                ...spec,
                constraints: { ...spec.constraints, maxSpread: Number(event.target.value) }
              })
            }
          />
        </label>
        <label>
          Max Positions
          <input
            type="number"
            value={spec.constraints.maxPositions}
            onChange={(event) =>
              setSpec({
                ...spec,
                constraints: { ...spec.constraints, maxPositions: Number(event.target.value) }
              })
            }
          />
        </label>
        <label>
          Max Trades per Day
          <input
            type="number"
            value={spec.constraints.maxTradesPerDay}
            onChange={(event) =>
              setSpec({
                ...spec,
                constraints: { ...spec.constraints, maxTradesPerDay: Number(event.target.value) }
              })
            }
          />
        </label>
        <label>
          Cooldown Bars
          <input
            type="number"
            value={spec.constraints.cooldownBars}
            onChange={(event) =>
              setSpec({
                ...spec,
                constraints: { ...spec.constraints, cooldownBars: Number(event.target.value) }
              })
            }
          />
        </label>
        <label>
          One Trade per Bar
          <input
            type="checkbox"
            checked={spec.constraints.oneTradePerBar}
            onChange={(event) =>
              setSpec({
                ...spec,
                constraints: { ...spec.constraints, oneTradePerBar: event.target.checked }
              })
            }
          />
        </label>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Live Spec JSON</h2>
        <pre style={{ background: "#f7f7f7", padding: "12px" }}>{JSON.stringify(spec, null, 2)}</pre>
      </section>
    </div>
  );
}
