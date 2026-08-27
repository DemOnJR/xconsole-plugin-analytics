import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Gauge({ value, label, sublabel, size = 110, strokeWidth = 9, icon, color, formatValue, }) {
    const clamped = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clamped / 100) * circumference;
    // Auto determine color if not provided
    let strokeColor = color;
    if (!strokeColor) {
        if (clamped >= 85)
            strokeColor = "#ef4444"; // Red
        else if (clamped >= 65)
            strokeColor = "#f59e0b"; // Amber
        else
            strokeColor = "#10b981"; // Emerald
    }
    const formatted = formatValue ? formatValue(clamped) : `${Math.round(clamped)}%`;
    return (_jsxs("div", { className: "flex flex-col items-center justify-center p-3 rounded-xl border border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)]/40 hover:border-[var(--accent,#06b6d4)]/40 transition-colors", children: [_jsxs("div", { className: "relative flex items-center justify-center", style: { width: size, height: size }, children: [_jsxs("svg", { width: size, height: size, className: "rotate-[-90deg]", children: [_jsx("circle", { cx: size / 2, cy: size / 2, r: radius, stroke: "var(--border,#27272a)", strokeWidth: strokeWidth, fill: "none", opacity: 0.5 }), _jsx("circle", { cx: size / 2, cy: size / 2, r: radius, stroke: strokeColor, strokeWidth: strokeWidth, strokeDasharray: circumference, strokeDashoffset: offset, strokeLinecap: "round", fill: "none", className: "transition-all duration-700 ease-out" })] }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center select-none", children: [icon && _jsx("div", { className: "mb-0.5 text-[var(--text-faint,#71717a)]", children: icon }), _jsx("span", { className: "font-mono text-base font-bold tracking-tight text-[var(--text,#fafafa)]", children: formatted })] })] }), _jsxs("div", { className: "mt-2 text-center select-none", children: [_jsx("div", { className: "text-xs font-medium text-[var(--text,#e4e4e7)]", children: label }), sublabel && (_jsx("div", { className: "text-[11px] font-mono text-[var(--text-faint,#71717a)]", children: sublabel }))] })] }));
}
//# sourceMappingURL=Gauge.js.map