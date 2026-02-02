import Layout from "../components/Layout";
import StrategyBuilder from "../components/StrategyBuilder";
import { sampleStrategySpec } from "@prompttrader/schema";

export default function BuilderPage() {
  return (
    <Layout>
      <StrategyBuilder initialSpec={sampleStrategySpec} />
    </Layout>
  );
}
