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
  stop_loss_atr_multiplier?: number;
  take_profit_rr?: number;
  exit_conditions?: ConditionNode;
};

export type RiskSettings = {
  mode: "fixed_lot" | "percent_equity";
  fixed_lot?: number;
  max_risk_per_trade_percent?: number;
  max_risk_per_day_percent?: number;
};

export type TradeManagement = {
  break_even?: {
    enabled: boolean;
    trigger_rr: number;
    offset_points: number;
  };
  trailing_stop?: {
    enabled: boolean;
    atr_multiplier: number;
  };
  partials?: {
    enabled: boolean;
    levels: Array<{ rr: number; percent_close: number }>;
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
  order_type: "market" | "limit" | "stop";
  slippage_points: number;
  magic_number: number;
};

export type Constraints = {
  max_trades_per_day: number;
  cooldown_bars: number;
  one_trade_per_bar: boolean;
  max_spread_points: number;
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
    session_timezone: string;
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
  entry_rules: {
    long: EntryRule;
    short: EntryRule;
  };
  exit_rules: ExitRule;
  risk: RiskSettings;
  trade_management: TradeManagement;
  execution: ExecutionSettings;
  constraints: Constraints;
};
