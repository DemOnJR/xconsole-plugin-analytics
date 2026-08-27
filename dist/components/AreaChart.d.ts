interface AreaChartProps {
    data: number[];
    labels?: string[];
    height?: number;
    color?: string;
    fillColor?: string;
    unit?: string;
    title?: string;
    subtitle?: string;
    minLabel?: string;
    maxLabel?: string;
    showGrid?: boolean;
    valueFormatter?: (v: number) => string;
}
export declare function AreaChart({ data, labels, height, color, fillColor, unit, title, subtitle, showGrid, valueFormatter, }: AreaChartProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AreaChart.d.ts.map