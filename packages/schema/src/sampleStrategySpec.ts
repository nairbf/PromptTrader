import { StrategySpec } from "./strategySpec";

export const sampleStrategySpec: StrategySpec = {
  metadata: {
    name: "MA + RSI Trend",
    description: "SMA crossover with RSI confirmation and ATR-based exits.",
    symbols: ["EURUSD"],
    timeframes: ["H1"],
    sessionTimezone: "UTC",
    session: { start: "08:00", end: "20:00" }
  },
  inputs: [
    { key: "fastMa", label: "Fast SMA", type: "number", value: 20 },
    { key: "slowMa", label: "Slow SMA", type: "number", value: 50 },
    { key: "rsiPeriod", label: "RSI Period", type: "number", value: 14 },
    { key: "atrPeriod", label: "ATR Period", type: "number", value: 14 }
  ],
  indicators: [
    { id: "smaFast", type: "SMA", params: { period: 20 } },
    { id: "smaSlow", type: "SMA", params: { period: 50 } },
    { id: "rsi", type: "RSI", params: { period: 14 } },
    { id: "atr", type: "ATR", params: { period: 14 } }
  ],
  entryRules: {
    session_timezone: "UTC",
    session: { start: "08:00", end: "20:00" }
  },
  inputs: [
    { key: "fast_ma", label: "Fast SMA", type: "number", value: 20 },
    { key: "slow_ma", label: "Slow SMA", type: "number", value: 50 },
    { key: "rsi_period", label: "RSI Period", type: "number", value: 14 },
    { key: "atr_period", label: "ATR Period", type: "number", value: 14 }
  ],
  indicators: [
    { id: "sma_fast", type: "SMA", params: { period: 20 } },
    { id: "sma_slow", type: "SMA", params: { period: 50 } },
    { id: "rsi", type: "RSI", params: { period: 14 } },
    { id: "atr", type: "ATR", params: { period: 14 } }
  ],
  entry_rules: {
    long: {
      description: "Fast SMA crosses above Slow SMA and RSI > 55.",
      conditions: {
        type: "group",
        operator: "AND",
        conditions: [
          {
            type: "cross",
            direction: "above",
            left: { type: "indicator", ref: { id: "smaFast" } },
            right: { type: "indicator", ref: { id: "smaSlow" } }
            left: { type: "indicator", ref: { id: "sma_fast" } },
            right: { type: "indicator", ref: { id: "sma_slow" } }
          },
          {
            type: "comparison",
            left: { type: "indicator", ref: { id: "rsi" } },
            operator: ">",
            right: { type: "number", value: 55 }
          }
        ]
      }
    },
    short: {
      description: "Fast SMA crosses below Slow SMA and RSI < 45.",
      conditions: {
        type: "group",
        operator: "AND",
        conditions: [
          {
            type: "cross",
            direction: "below",
            left: { type: "indicator", ref: { id: "smaFast" } },
            right: { type: "indicator", ref: { id: "smaSlow" } }
            left: { type: "indicator", ref: { id: "sma_fast" } },
            right: { type: "indicator", ref: { id: "sma_slow" } }
          },
          {
            type: "comparison",
            left: { type: "indicator", ref: { id: "rsi" } },
            operator: "<",
            right: { type: "number", value: 45 }
          }
        ]
      }
    }
  },
  exitRules: {
    description: "ATR-based stop and 2R take profit.",
    stopLossAtrMultiplier: 1.5,
    takeProfitRr: 2
  },
  risk: {
    mode: "percentEquity",
    riskPercent: 1,
    maxRiskPerDayPercent: 3
  },
  tradeManagement: {
    breakEven: {
      enabled: true,
      triggerRr: 1,
      offsetPoints: 5
    },
    trailingStop: {
      enabled: true,
      atrMultiplier: 1
  exit_rules: {
    description: "ATR-based stop and 2R take profit.",
    stop_loss_atr_multiplier: 1.5,
    take_profit_rr: 2
  },
  risk: {
    mode: "percent_equity",
    max_risk_per_trade_percent: 1,
    max_risk_per_day_percent: 3
  },
  trade_management: {
    break_even: {
      enabled: true,
      trigger_rr: 1,
      offset_points: 5
    },
    trailing_stop: {
      enabled: true,
      atr_multiplier: 1
    },
    partials: {
      enabled: true,
      levels: [
        { rr: 1, percentClose: 50 },
        { rr: 2, percentClose: 25 }
        { rr: 1, percent_close: 50 },
        { rr: 2, percent_close: 25 }
      ]
    }
  },
  execution: {
    orderType: "market",
    slippagePoints: 10,
    magicNumber: 24001
  },
  constraints: {
    maxTradesPerDay: 3,
    maxPositions: 1,
    cooldownBars: 2,
    oneTradePerBar: true,
    maxSpread: 20
    order_type: "market",
    slippage_points: 10,
    magic_number: 24001
  },
  constraints: {
    max_trades_per_day: 3,
    cooldown_bars: 2,
    one_trade_per_bar: true,
    max_spread_points: 20
  }
};
