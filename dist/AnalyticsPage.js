import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState, useCallback } from "react";
import { api } from "./api";
import { ChartIcon, CacheIcon, ToolIcon, ChatIcon, CpuIcon, ServerIcon, DownloadIcon, RefreshIcon, PauseIcon, PlayIcon, CloseIcon, } from "./icons";
import { DashboardTab } from "./components/DashboardTab";
import { CacheTelemetryTab } from "./components/CacheTelemetryTab";
import { ToolsTelemetryTab } from "./components/ToolsTelemetryTab";
import { ConversationsTab } from "./components/ConversationsTab";
import { HardwareMonitorTab } from "./components/HardwareMonitorTab";
import { InfrastructureTab } from "./components/InfrastructureTab";
import { ExportReportsTab } from "./components/ExportReportsTab";
const TABS = [
    { id: "dashboard", label: "Dashboard", icon: ChartIcon },
    { id: "cache", label: "AI Prompt Cache", icon: CacheIcon },
    { id: "tools", label: "Agent Tools", icon: ToolIcon },
    { id: "sessions", label: "Sessions", icon: ChatIcon },
    { id: "hardware", label: "Hardware & RAM", icon: CpuIcon },
    { id: "infrastructure", label: "Infrastructure", icon: ServerIcon },
    { id: "export", label: "Export & Reports", icon: DownloadIcon },
];
export function AnalyticsPage({ onClose }) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [data, setData] = useState(null);
    const [samples, setSamples] = useState([]);
    const [err, setErr] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pollIntervalSec, setPollIntervalSec] = useState(3); // 3 seconds default
    const [isPaused, setIsPaused] = useState(false);
    // Fetch telemetry
    const fetchTelemetry = useCallback(async () => {
        try {
            setIsRefreshing(true);
            const a = await api.agentAnalytics();
            setData(a);
            setErr(null);
            setSamples((prev) => {
                const next = [...prev.slice(-179), a.resource];
                return next;
            });
        }
        catch (e) {
            setErr(String(e));
        }
        finally {
            setIsRefreshing(false);
        }
    }, []);
    // Polling loop
    useEffect(() => {
        void fetchTelemetry();
        if (isPaused || pollIntervalSec <= 0)
            return;
        const intervalId = window.setInterval(() => {
            void fetchTelemetry();
        }, pollIntervalSec * 1000);
        return () => {
            window.clearInterval(intervalId);
        };
    }, [fetchTelemetry, isPaused, pollIntervalSec]);
    // Handle ESC key to close modal
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && onClose) {
                e.preventDefault();
                onClose();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    const lastSample = useMemo(() => {
        return samples[samples.length - 1] ?? data?.resource;
    }, [samples, data]);
    return (_jsxs("div", { className: "flex h-full w-full min-h-0 flex-1 flex-col bg-[var(--surface,#09090b)] text-[var(--text,#fafafa)] select-none font-sans", "aria-label": "Analytics & Telemetry Suite", children: [_jsxs("header", { className: "flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)] px-6 py-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400", children: _jsx(ChartIcon, { size: 18 }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-sm font-semibold tracking-tight text-white", children: "Analytics & Telemetry Suite" }), _jsx("span", { className: "rounded bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.2 text-[10px] font-mono text-cyan-300", children: "v2.0" }), _jsxs("span", { className: "flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }), _jsx("span", { children: "Live Stream" })] })] }), _jsx("p", { className: "text-[11px] text-[var(--text-faint,#71717a)]", children: "AI prompt cache efficiency, agent tool execution intelligence, CPU/RAM/GPU telemetry" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex items-center rounded-lg border border-[var(--border,#27272a)] bg-[var(--surface,#09090b)] p-0.5 text-xs font-mono", children: [_jsxs("button", { type: "button", onClick: () => setIsPaused(!isPaused), className: `flex h-7 items-center gap-1 rounded px-2 transition ${isPaused
                                            ? "bg-amber-500/20 text-amber-300"
                                            : "text-[var(--text-dim,#a1a1aa)] hover:text-white"}`, title: isPaused ? "Resume real-time polling" : "Pause live polling", children: [isPaused ? _jsx(PlayIcon, { size: 12 }) : _jsx(PauseIcon, { size: 12 }), _jsx("span", { className: "text-[10px]", children: isPaused ? "Paused" : "Live" })] }), _jsxs("select", { value: pollIntervalSec, onChange: (e) => {
                                            setPollIntervalSec(Number(e.target.value));
                                            setIsPaused(false);
                                        }, disabled: isPaused, className: "h-7 rounded bg-transparent px-2 text-[11px] text-[var(--text,#e4e4e7)] focus:outline-none cursor-pointer disabled:opacity-50", children: [_jsx("option", { value: 1, children: "1s tick" }), _jsx("option", { value: 3, children: "3s tick" }), _jsx("option", { value: 5, children: "5s tick" }), _jsx("option", { value: 10, children: "10s tick" }), _jsx("option", { value: 30, children: "30s tick" })] })] }), _jsxs("button", { type: "button", onClick: () => void fetchTelemetry(), disabled: isRefreshing, className: "flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border,#27272a)] bg-[var(--surface,#09090b)] px-2.5 text-xs font-mono text-[var(--text-dim,#a1a1aa)] hover:bg-white/5 hover:text-white transition cursor-pointer disabled:opacity-50", title: "Manual refresh", children: [_jsx(RefreshIcon, { size: 13, className: isRefreshing ? "animate-spin text-cyan-400" : "" }), _jsx("span", { className: "hidden sm:inline", children: "Refresh" })] }), onClose && (_jsx("button", { type: "button", className: "flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border,#27272a)] text-zinc-400 hover:bg-white/5 hover:text-white transition cursor-pointer", onClick: onClose, title: "Close modal (Esc)", children: _jsx(CloseIcon, { size: 14 }) }))] })] }), _jsx("div", { className: "flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)]/60 px-6 py-2", children: TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (_jsxs("button", { type: "button", onClick: () => setActiveTab(tab.id), className: `flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer border ${isActive
                            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-sm"
                            : "border-transparent text-[var(--text-dim,#a1a1aa)] hover:border-[var(--border,#27272a)] hover:bg-white/5 hover:text-white"}`, children: [_jsx(Icon, { size: 14 }), _jsx("span", { children: tab.label })] }, tab.id));
                }) }), _jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 py-5 bg-[var(--surface,#09090b)]/40", children: [err ? (_jsxs("div", { className: "rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs font-mono text-red-300", children: ["Error loading telemetry data: ", err] })) : null, !data ? (_jsxs("div", { className: "flex h-64 flex-col items-center justify-center gap-3 text-xs text-[var(--text-faint,#71717a)]", children: [_jsx(RefreshIcon, { size: 24, className: "animate-spin text-cyan-400" }), _jsx("span", { children: "Connecting to xConsole telemetry kernel\u2026" })] })) : (_jsxs("div", { className: "mx-auto max-w-[1300px]", children: [activeTab === "dashboard" && (_jsx(DashboardTab, { data: data, samples: samples, onSelectTab: (tabId) => setActiveTab(tabId) })), activeTab === "cache" && _jsx(CacheTelemetryTab, { data: data }), activeTab === "tools" && _jsx(ToolsTelemetryTab, { data: data }), activeTab === "sessions" && _jsx(ConversationsTab, { data: data }), activeTab === "hardware" && lastSample && (_jsx(HardwareMonitorTab, { samples: samples, lastSample: lastSample })), activeTab === "infrastructure" && _jsx(InfrastructureTab, {}), activeTab === "export" && _jsx(ExportReportsTab, { data: data, samples: samples })] }))] }), _jsxs("footer", { className: "flex shrink-0 items-center justify-between border-t border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)] px-6 py-2 text-[11px] font-mono text-[var(--text-faint,#71717a)]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { children: ["Samples in buffer: ", samples.length] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Cache hit: ", _jsxs("strong", { className: "text-cyan-400", children: [data?.cache_avg_pct.toFixed(0) || 0, "%"] })] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Host CPU:", " ", _jsxs("strong", { className: "text-amber-400", children: [lastSample?.cpu_pct.toFixed(0) || 0, "%"] })] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { children: "xConsole Cordis Telemetry" }) })] })] }));
}
export default AnalyticsPage;
//# sourceMappingURL=AnalyticsPage.js.map