import type { AgentAnalytics, ResourceSnapshot } from "../types";
interface DashboardTabProps {
    data: AgentAnalytics;
    samples: ResourceSnapshot[];
    onSelectTab: (tabId: string) => void;
}
export declare function DashboardTab({ data, samples, onSelectTab }: DashboardTabProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=DashboardTab.d.ts.map