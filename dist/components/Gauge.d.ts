import type { ReactNode } from "react";
interface GaugeProps {
    value: number;
    label: string;
    sublabel?: string;
    size?: number;
    strokeWidth?: number;
    icon?: ReactNode;
    color?: string;
    formatValue?: (v: number) => string;
}
export declare function Gauge({ value, label, sublabel, size, strokeWidth, icon, color, formatValue, }: GaugeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Gauge.d.ts.map