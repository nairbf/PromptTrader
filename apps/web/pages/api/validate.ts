import type { NextApiRequest, NextApiResponse } from "next";
import { StrategySpec } from "@prompttrader/schema";

type ValidationIssue = { level: "error" | "warning"; message: string };

const validateSpec = (spec: StrategySpec): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  if (!spec.metadata?.name) {
    issues.push({ level: "error", message: "Missing strategy name." });
  }
  if (!spec.entryRules?.long || !spec.entryRules?.short) {
    issues.push({ level: "error", message: "Missing entry rules for long/short." });
  }
  if (!spec.exitRules?.stopLossAtrMultiplier && !spec.exitRules?.exitConditions) {
  if (!spec.entry_rules?.long || !spec.entry_rules?.short) {
    issues.push({ level: "error", message: "Missing entry rules for long/short." });
  }
  if (!spec.exit_rules?.stop_loss_atr_multiplier && !spec.exit_rules?.exit_conditions) {
    issues.push({
      level: "warning",
      message: "No stop loss specified. Consider adding SL for risk control."
    });
  }
  if (spec.constraints.maxTradesPerDay <= 0) {
    issues.push({ level: "warning", message: "Max trades per day should be greater than 0." });
  }
  if (spec.constraints.maxPositions <= 0) {
    issues.push({ level: "warning", message: "Max positions should be greater than 0." });
  }
  if (spec.constraints.max_trades_per_day <= 0) {
    issues.push({ level: "warning", message: "Max trades per day should be greater than 0." });
  }
  return issues;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const spec = req.body?.spec as StrategySpec | undefined;
  if (!spec) {
    res.status(400).json({ message: "Missing StrategySpec" });
    return;
  }

  const issues = validateSpec(spec);
  res.status(200).json({ issues });
}
