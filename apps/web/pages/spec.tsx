import Layout from "../components/Layout";
import SpecViewer from "../components/SpecViewer";
import { sampleStrategySpec } from "@prompttrader/schema";

export default function SpecPage() {
  return (
    <Layout>
      <SpecViewer spec={sampleStrategySpec} />
    </Layout>
  );
}
