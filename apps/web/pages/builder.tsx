import Layout from "../components/Layout";
import BuilderBlocks from "../components/BuilderBlocks";
import { sampleStrategySpec } from "@prompttrader/schema";

export default function BuilderPage() {
  return (
    <Layout>
      <BuilderBlocks spec={sampleStrategySpec} />
    </Layout>
  );
}
