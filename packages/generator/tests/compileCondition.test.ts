import { describe, expect, it } from "vitest";
import { compileCondition } from "../src/index";
import { ConditionNode } from "@prompttrader/schema";

describe("compileCondition", () => {
  it("compiles comparison and cross nodes deterministically", () => {
    const node: ConditionNode = {
      type: "group",
      operator: "AND",
      conditions: [
        {
          type: "comparison",
          left: { type: "number", value: 1 },
          operator: ">",
          right: { type: "number", value: 0 }
        },
        {
          type: "cross",
          direction: "above",
          left: { type: "indicator", ref: { id: "fast" } },
          right: { type: "indicator", ref: { id: "slow" } }
        }
      ]
    };

    const result = compileCondition(node);
    expect(result).toBe(\"(1 > 0 AND (buf_fast[1] <= buf_slow[1] && buf_fast[0] > buf_slow[0]))\");
  });
});
