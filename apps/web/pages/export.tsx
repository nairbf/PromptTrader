import Layout from "../components/Layout";
import CodePreview from "../components/CodePreview";
import { sampleStrategySpec } from "@prompttrader/schema";
import { generateMql5 } from "@prompttrader/generator";

export default function ExportPage() {
  const code = generateMql5(sampleStrategySpec);

  return (
    <Layout>
      <CodePreview code={code} />
    </Layout>
  );
}
