import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { ToolIcon, SearchIcon, ZapIcon, LayersIcon, } from "../icons";
function getToolCategory(name) {
    if (name.startsWith("db_") || name.includes("sql") || name.includes("database")) {
        return { label: "Database", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: "db" };
    }
    if (name.startsWith("cloudflare_") || name.includes("tunnel") || name.includes("dns")) {
        return { label: "Cloudflare", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: "cf" };
    }
    if (name.includes("file") || name.includes("dir") || name.includes("sftp")) {
        return { label: "Filesystem", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: "file" };
    }
    if (name.includes("command") || name.includes("exec") || name.includes("run")) {
        return { label: "Terminal / Exec", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: "term" };
    }
    if (name.includes("skill") || name.includes("memory") || name.includes("soul") || name.includes("taste")) {
        return { label: "Agent Memory", color: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: "mem" };
    }
    return { label: "General Tool", color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20", icon: "gen" };
}
export function ToolsTelemetryTab({ data }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("count");
    const totalToolCalls = useMemo(() => data.tools_all.reduce((acc, t) => acc + t.count, 0), [data.tools_all]);
    const maxToolCount = useMemo(() => Math.max(1, ...(data.tools_all.map((t) => t.count) || [1])), [data.tools_all]);
    // Group by category counts
    const categoryStats = useMemo(() => {
        const map = new Map();
        for (const t of data.tools_all) {
            const cat = getToolCategory(t.name).label;
            map.set(cat, (map.get(cat) || 0) + t.count);
        }
        return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
    }, [data.tools_all]);
    // Filtered tools
    const filteredTools = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return data.tools_all
            .filter((t) => {
            if (selectedCategory !== "all" && getToolCategory(t.name).label !== selectedCategory) {
                return false;
            }
            if (!q)
                return true;
            return t.name.toLowerCase().includes(q);
        })
            .sort((a, b) => {
            if (sortBy === "count")
                return b.count - a.count;
            return a.name.localeCompare(b.name);
        });
    }, [data.tools_all, searchQuery, selectedCategory, sortBy]);
    return (_jsxs("div", { className: "flex flex-col gap-6 animate-in fade-in duration-200", children: [_jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [_jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-purple-500/20 bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { className: "flex items-center justify-between text-purple-400", children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", children: "Total Invocations" }), _jsx(ToolIcon, { size: 18 })] }), _jsx("div", { className: "mt-3 font-mono text-3xl font-bold text-purple-300", children: totalToolCalls.toLocaleString() }), _jsx("div", { className: "mt-1 text-xs text-[var(--text-faint,#a1a1aa)]", children: "across all autonomous agent cycles" })] }), _jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-cyan-500/20 bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { className: "flex items-center justify-between text-cyan-400", children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", children: "Unique Tools" }), _jsx(LayersIcon, { size: 18 })] }), _jsx("div", { className: "mt-3 font-mono text-3xl font-bold text-cyan-300", children: data.tools_all.length }), _jsx("div", { className: "mt-1 text-xs text-[var(--text-faint,#a1a1aa)]", children: "registered & executed tools" })] }), _jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-emerald-500/20 bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", children: "Most Active Tool" }), _jsx(ZapIcon, { size: 18 })] }), _jsx("div", { className: "mt-3 font-mono text-xl font-bold text-emerald-300 truncate", children: data.tools_all[0]?.name || "None" }), _jsxs("div", { className: "mt-1 text-xs text-[var(--text-faint,#a1a1aa)]", children: [data.tools_all[0]?.count || 0, " executions (", Math.round(((data.tools_all[0]?.count || 0) / Math.max(1, totalToolCalls)) * 100), "% share)"] })] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsxs("button", { type: "button", onClick: () => setSelectedCategory("all"), className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition border ${selectedCategory === "all"
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                            : "bg-[var(--surface-2,#18181b)] text-[var(--text-dim,#a1a1aa)] border-[var(--border,#27272a)] hover:text-white"}`, children: ["All Categories (", totalToolCalls, ")"] }), categoryStats.map((c) => (_jsxs("button", { type: "button", onClick: () => setSelectedCategory(c.label), className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition border ${selectedCategory === c.label
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-[var(--surface-2,#18181b)] text-[var(--text-dim,#a1a1aa)] border-[var(--border,#27272a)] hover:text-white"}`, children: [_jsx("span", { children: c.label }), _jsxs("span", { className: "text-[10px] text-[var(--text-faint,#71717a)]", children: ["(", c.count, ")"] })] }, c.label)))] }), _jsxs("div", { className: "rounded-xl border border-[var(--border,#27272a)] bg-[var(--surface,#09090b)] p-4", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--border,#27272a)] pb-3", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wider text-[var(--text,#e4e4e7)]", children: ["Tool Matrix Directory (", filteredTools.length, " tools)"] }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative flex items-center", children: [_jsx("div", { className: "pointer-events-none absolute left-2.5 text-[var(--text-faint,#71717a)]", children: _jsx(SearchIcon, { size: 14 }) }), _jsx("input", { type: "text", placeholder: "Search tool name...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "h-8 w-48 rounded-lg border border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)] pl-8 pr-2.5 text-xs text-[var(--text,#e4e4e7)] placeholder-[var(--text-faint,#71717a)] focus:border-purple-500 focus:outline-none" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "h-8 rounded-lg border border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)] px-2.5 text-xs text-[var(--text,#e4e4e7)] focus:border-purple-500 focus:outline-none cursor-pointer", children: [_jsx("option", { value: "count", children: "Sort by Calls (High \u2192 Low)" }), _jsx("option", { value: "name", children: "Sort by Name (A \u2192 Z)" })] })] })] }), filteredTools.length === 0 ? (_jsx("div", { className: "flex h-36 items-center justify-center text-xs text-[var(--text-faint,#71717a)]", children: "No tools found matching the search query." })) : (_jsx("div", { className: "mt-3 flex flex-col gap-3", children: filteredTools.map((tool, idx) => {
                            const cat = getToolCategory(tool.name);
                            const pct = Math.round((tool.count / Math.max(1, totalToolCalls)) * 100);
                            return (_jsxs("div", { className: "rounded-lg border border-[var(--border,#27272a)] bg-[var(--surface-2,#18181b)]/60 p-3 hover:border-purple-500/30 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsxs("span", { className: "font-mono text-xs text-[var(--text-faint,#71717a)] w-6 shrink-0", children: ["#", idx + 1] }), _jsx("span", { className: "font-mono text-sm font-semibold text-[var(--text,#fafafa)] truncate", children: tool.name }), _jsx("span", { className: `rounded px-2 py-0.5 text-[10px] font-mono border uppercase tracking-wider ${cat.color}`, children: cat.label })] }), _jsxs("div", { className: "flex items-center gap-4 shrink-0 font-mono text-xs", children: [_jsxs("span", { className: "text-[var(--text-faint,#71717a)]", children: [pct, "% share"] }), _jsxs("span", { className: "rounded bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 font-bold text-purple-300", children: [tool.count, " calls"] })] })] }), _jsx("div", { className: "mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface,#09090b)]", children: _jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-500", style: { width: `${Math.max(2, (tool.count / maxToolCount) * 100)}%` } }) })] }, tool.name));
                        }) }))] })] }));
}
//# sourceMappingURL=ToolsTelemetryTab.js.map