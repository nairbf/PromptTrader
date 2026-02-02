export type ComparisonOperator = ">" | ">=" | "<" | "<=" | "==" | "!=";

export type LogicalGroup = {
  type: "group";
  operator: "AND" | "OR";
  conditions: ConditionNode[];
};

export type IndicatorRef = {
  id: string;
  line?: string;
  shift?: number;
};

export type PriceRef = {
  type: "price";
  field: "open" | "high" | "low" | "close" | "hl2" | "hlc3";
  shift?: number;
};

export type ValueRef =
  | { type: "number"; value: number }
  | { type: "indicator"; ref: IndicatorRef }
  | PriceRef;

export type ComparisonCondition = {
  type: "comparison";
  left: ValueRef;
  operator: ComparisonOperator;
  right: ValueRef;
};

export type CrossCondition = {
  type: "cross";
  direction: "above" | "below";
  left: ValueRef;
  right: ValueRef;
};

export type ConditionNode = LogicalGroup | ComparisonCondition | CrossCondition;

export type EntryRule = {
  description: string;
  conditions: ConditionNode;
};

export type ExitRule = {
  description: string;
  stopLossAtrMultiplier?: number;
  takeProfitRr?: number;
  exitConditions?: ConditionNode;
};

export type RiskSettings = {
  mode: "fixedLot" | "percentEquity";
  fixedLot?: number;
  riskPercent?: number;
  maxRiskPerDayPercent?: number;
};

export type TradeManagement = {
  breakEven?: {
    enabled: boolean;
    triggerRr: number;
    offsetPoints: number;
  };
  trailingStop?: {
    enabled: boolean;
    atrMultiplier: number;
  };
  partials?: {
    enabled: boolean;
    levels: Array<{ rr: number; percentClose: number }>;
  };
};

export type ExecutionSettings = {
  orderType: "market" | "limit" | "stop";
  slippagePoints: number;
  magicNumber: number;
};

export type Constraints = {
  maxTradesPerDay: number;
  maxPositions: number;
  cooldownBars: number;
  oneTradePerBar: boolean;
  maxSpread: number;
};

export type IndicatorSpec = {
  id: string;
  type: "SMA" | "EMA" | "RSI" | "ATR" | "MACD";
  params: Record<string, number>;
};

export type StrategySpec = {
  metadata: {
    name: string;
    description: string;
    symbols: string[];
    timeframes: string[];
    sessionTimezone: string;
    session: { start: string; end: string };
  };
  inputs: Array<{ key: string; label: string; type: "number" | "boolean"; value: number | boolean }>;
  indicators: IndicatorSpec[];
  entryRules: {
    long: EntryRule;
    short: EntryRule;
  };
  exitRules: ExitRule;
  risk: RiskSettings;
  tradeManagement: TradeManagement;
  execution: ExecutionSettings;
  constraints: Constraints;
};
