import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DownloadIcon, CopyIcon, CheckIcon, InfoIcon, } from "../icons";
export function ExportReportsTab({ data, samples }) {
    const [copied, setCopied] = useState(false);
    const fullReport = {
        exportedAt: new Date().toISOString(),
        version: "2.0.0",
        analytics: data,
        recentResourceSamples: samples,
    };
    const jsonString = JSON.stringify(fullReport, null, 2);
    const handleCopy = () => {
        void navigator.clipboard.writeText(jsonString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleDownloadJSON = () => {
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `xconsole-telemetry-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const handleDownloadToolsCSV = () => {
        const headers = "Tool Name,Execution Count,Percentage Share\n";
        const totalCalls = Math.max(1, data.tools_all.reduce((a, b) => a + b.count, 0));
        const rows = data.tools_all
            .map((t) => `"${t.name}",${t.count},${((t.count / totalCalls) * 100).toFixed(1)}%`)
            .join("\n");
        const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `xconsole-tools-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const handleDownloadCacheCSV = () => {
        const headers = "Timestamp,Session,Prompt Tokens,Hit Tokens,Miss Tokens,Hit Pct\n";
        const rows = data.cache
            .map((c) => `"${c.ts}","${c.session}",${c.prompt},${c.hit},${c.miss},${c.pct}%`)
            .join("\n");
        const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `xconsole-cache-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };
    return (_jsxs("div", { className: "flex flex-col gap-6 animate-in fade-in duration-200", children: [_jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [_jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-[var(--border,#27272a)] bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold text-white", children: "Full JSON Report" }), _jsx("p", { className: "mt-1 text-xs text-[var(--text-faint,#71717a)]", children: "Complete raw state including hardware metrics, sessions, tools, and cache logs." })] }), _jsxs("div", { className: "mt-4 flex items-center gap-2", children: [_jsxs("button", { type: "button", onClick: handleDownloadJSON, className: "flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-cyan-500 transition cursor-pointer", children: [_jsx(DownloadIcon, { size: 14 }), _jsx("span", { children: "Download JSON" })] }), _jsxs("button", { type: "button", onClick: handleCopy, className: "flex items-center gap-1.5 rounded-lg border border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)] px-3 py-1.5 text-xs text-[var(--text,#e4e4e7)] hover:bg-white/5 transition cursor-pointer", children: [copied ? _jsx(CheckIcon, { size: 14, className: "text-emerald-400" }) : _jsx(CopyIcon, { size: 14 }), _jsx("span", { children: copied ? "Copied!" : "Copy Raw" })] })] })] }), _jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-[var(--border,#27272a)] bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold text-white", children: "Tool Invocations CSV" }), _jsx("p", { className: "mt-1 text-xs text-[var(--text-faint,#71717a)]", children: "Structured spreadsheet containing all executed agent tool counts and usage ratios." })] }), _jsx("div", { className: "mt-4", children: _jsxs("button", { type: "button", onClick: handleDownloadToolsCSV, className: "flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300 hover:bg-purple-500/20 transition cursor-pointer", children: [_jsx(DownloadIcon, { size: 14 }), _jsx("span", { children: "Export Tools (.csv)" })] }) })] }), _jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-[var(--border,#27272a)] bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold text-white", children: "Prompt Cache CSV" }), _jsx("p", { className: "mt-1 text-xs text-[var(--text-faint,#71717a)]", children: "Evaluation history of prompt cache hit vs miss tokens per turn." })] }), _jsx("div", { className: "mt-4", children: _jsxs("button", { type: "button", onClick: handleDownloadCacheCSV, className: "flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer", children: [_jsx(DownloadIcon, { size: 14 }), _jsx("span", { children: "Export Cache (.csv)" })] }) })] })] }), _jsxs("div", { className: "rounded-xl border border-[var(--border,#27272a)] bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-[var(--border,#27272a)] pb-3 mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(InfoIcon, { size: 16, className: "text-cyan-400" }), _jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-[var(--text,#e4e4e7)]", children: "Raw Telemetry Payload Preview" })] }), _jsxs("span", { className: "font-mono text-[11px] text-[var(--text-faint,#71717a)]", children: [(jsonString.length / 1024).toFixed(1), " KB payload"] })] }), _jsx("pre", { className: "max-h-96 overflow-y-auto rounded-lg bg-[var(--surface-2,#18181b)] p-4 font-mono text-xs text-[var(--text-dim,#a1a1aa)] select-text border border-[var(--border,#27272a)]", children: jsonString })] })] }));
}
//# sourceMappingURL=ExportReportsTab.js.map