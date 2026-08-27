import { invoke } from "@tauri-apps/api/core";
async function tauriInvoke(cmd, args) {
    try {
        return await invoke(cmd, args);
    }
    catch (err) {
        const win = typeof window !== "undefined" ? window : {};
        if (win.__TAURI_INTERNALS__?.invoke) {
            return await win.__TAURI_INTERNALS__.invoke(cmd, args);
        }
        if (win.__TAURI__?.core?.invoke) {
            return await win.__TAURI__.core.invoke(cmd, args);
        }
        throw err;
    }
}
export const api = {
    agentAnalytics: () => tauriInvoke("agent_analytics"),
    listVps: () => tauriInvoke("list_vps_cmd"),
};
//# sourceMappingURL=api.js.map