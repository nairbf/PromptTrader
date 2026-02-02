import { useState } from "react";
import Layout from "../components/Layout";
import { StrategySpec, sampleStrategySpec } from "@prompttrader/schema";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [spec, setSpec] = useState<StrategySpec | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleInterpret = async () => {
    setStatus("Interpreting prompt into StrategySpec...");
    const response = await fetch("/api/interpret", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    setSpec(data.spec ?? sampleStrategySpec);
    setStatus(data.message ?? "Generated StrategySpec.");
  };

  return (
    <Layout>
      <section style={{ display: "grid", gap: "16px", maxWidth: "720px" }}>
        <h2>Describe your strategy</h2>
        <p>
          Enter a deterministic, specific prompt (entries, exits, indicators, risk). The system will
          reject vague prompts and request clarifications.
        </p>
        <textarea
          rows={6}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: Buy when SMA(20) crosses above SMA(50) and RSI(14) > 55, sell on opposite cross, use 1% risk and ATR(14)*1.5 SL with 2R TP."
          style={{ width: "100%", padding: "12px" }}
        />
        <button type="button" onClick={handleInterpret} style={{ width: "200px" }}>
          Interpret Prompt
        </button>
        {status ? <p>{status}</p> : null}
        {spec ? (
          <div>
            <h3>Generated Spec Preview</h3>
            <pre style={{ background: "#f7f7f7", padding: "12px" }}>
              {JSON.stringify(spec, null, 2)}
            </pre>
          </div>
        ) : null}
      </section>
    </Layout>
  );
}
