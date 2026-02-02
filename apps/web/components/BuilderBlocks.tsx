import { StrategySpec } from "@prompttrader/schema";

interface BuilderBlocksProps {
  spec: StrategySpec;
}

export default function BuilderBlocks({ spec }: BuilderBlocksProps) {
  return (
    <section style={{ display: "grid", gap: "16px" }}>
      <h2>Visual Builder (Preview)</h2>
      <div style={{ display: "grid", gap: "12px" }}>
        <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px" }}>
          <h3>Entries</h3>
          <p>Long: {spec.entryRules.long.description}</p>
          <p>Short: {spec.entryRules.short.description}</p>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px" }}>
          <h3>Exits</h3>
          <p>{spec.exitRules.description}</p>
          <p>Long: {spec.entry_rules.long.description}</p>
          <p>Short: {spec.entry_rules.short.description}</p>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px" }}>
          <h3>Exits</h3>
          <p>{spec.exit_rules.description}</p>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px" }}>
          <h3>Risk</h3>
          <p>Mode: {spec.risk.mode}</p>
          <p>Risk %: {spec.risk.riskPercent ?? "-"}</p>
          <p>Max risk per trade: {spec.risk.max_risk_per_trade_percent}%</p>
        </div>
      </div>
    </section>
  );
}
