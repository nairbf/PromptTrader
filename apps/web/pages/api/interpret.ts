import type { NextApiRequest, NextApiResponse } from "next";
import { sampleStrategySpec } from "@prompttrader/schema";

const isVaguePrompt = (prompt: string) => {
  const requiredKeywords = ["entry", "exit", "risk", "stop", "take", "indicator"];
  const lowered = prompt.toLowerCase();
  const matched = requiredKeywords.filter((keyword) => lowered.includes(keyword)).length;
  return prompt.trim().length < 30 || matched < 2;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt : "";
  if (isVaguePrompt(prompt)) {
    res.status(422).json({
      message: "Prompt is too vague. Specify entries, exits, indicators, and risk settings.",
      clarifyingQuestions: [
        "Which indicators and parameters should define the entry?",
        "What exit rules (SL/TP, time-based) should be used?",
        "What position sizing or risk-per-trade should be applied?"
      ]
    });
    return;
  }

  res.status(200).json({
    message: "Generated StrategySpec (sample).",
    spec: sampleStrategySpec
  });
}
