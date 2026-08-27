import { definePlugin, type PluginDefinition } from "./sdk";
import { AnalyticsPage } from "./AnalyticsPage";

export const analyticsPlugin: PluginDefinition = definePlugin({
  manifest: {
    id: "xconsole-plugin-analytics",
    name: "Analytics & Telemetry",
    version: "2.0.0",
    description:
      "Real-time process telemetry, CPU/RAM/GPU monitoring, prompt cache efficiency, agent tool usage intelligence, and infrastructure metrics for xConsole.",
    author: "xConsole Team",
    icon: "ChartIcon",
    category: "system",
  },
  renderView: AnalyticsPage,
  apply: () => {
    console.log(`[Plugin Harness] Analytics & Telemetry plugin mounted`);
    return () => {
      console.log(`[Plugin Harness] Analytics & Telemetry plugin unmounted`);
    };
  },
});

export default analyticsPlugin;
