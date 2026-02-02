import { StrategySpec } from "@prompttrader/schema";

interface SpecViewerProps {
  spec: StrategySpec;
}

export default function SpecViewer({ spec }: SpecViewerProps) {
  return (
    <section>
      <h2>StrategySpec JSON</h2>
      <pre
        style={{
          background: "#111",
          color: "#f5f5f5",
          padding: "16px",
          borderRadius: "8px",
          overflowX: "auto"
        }}
      >
        {JSON.stringify(spec, null, 2)}
      </pre>
    </section>
  );
}
