import type { NextApiRequest, NextApiResponse } from "next";
import { generateMql5 } from "@prompttrader/generator";
import { StrategySpec } from "@prompttrader/schema";

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

  const code = generateMql5(spec);
  res.status(200).json({ code });
}
