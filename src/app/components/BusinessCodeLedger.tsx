import React from 'react';
import { motion as Motion } from 'motion/react';
import { 
  Code, 
  Database, 
  Link2, 
  GitBranch, 
  Cpu, 
  Activity,
  ChevronRight,
  Terminal,
  Layers
} from 'lucide-react';

export const BusinessCodeLedger: React.FC = () => {
  const ledgerState = {
    metadata: {
      version: "4.2.0-STABLE",
      tenant: "EPIC_CORP_CARIBBEAN",
      engine: "ARC_CORE_V9"
    },
    departments: {
      finance: {
        status: "ACTIVE",
        liquidity: 12500000,
        pending_reconciliation: 14,
        odoo_sync_delay: "42ms"
      },
      support: {
        capacity: 0.88,
        active_tickets: 142,
        ai_resolution_rate: "94.2%"
      },
      field_service: {
        active_nodes: 12,
        zone_alerts: ["ZONE_4_STORM_RISK"],
        dispatch_latency: "12m"
      }
    },
    active_policies: [
      { id: "P-01", logic: "IF customer.loyalty > 80 THEN waive_fee(LIMIT: 500)" },
      { id: "P-02", logic: "IF node.packet_loss > 15% THEN dispatch_technician(PRIORITY: HIGH)" }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-black/60 backdrop-blur-md rounded-2xl border border-zinc-800 overflow-hidden font-mono">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Code size={18} className="text-emerald-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Business-as-Code Ledger</h2>
            <div className="text-[10px] text-zinc-500">REAL-TIME ERP STATE REFLECTION</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full">
            <Activity size={10} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] text-zinc-400">STATE_HEALTH: OK</span>
          </div>
          <span className="text-[10px] text-zinc-600">ID: 4x992-B-ALPHA</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Sidebar: Logic Tree */}
        <div className="lg:col-span-4 border-r border-zinc-800 p-4 space-y-6 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Layers size={12} />
              Logic Hierarchies
            </h3>
            <div className="space-y-1">
              {['Global_Directives', 'Departmental_Hooks', 'Autonomy_Wrappers', 'Biometric_Gates'].map((item) => (
                <div key={item} className="flex items-center gap-2 p-2 hover:bg-zinc-800/50 rounded cursor-pointer group transition-colors">
                  <ChevronRight size={12} className="text-zinc-700 group-hover:text-blue-400 transition-colors" />
                  <span className="text-xs text-zinc-400 group-hover:text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <GitBranch size={12} />
              Active Subprocesses
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-blue-400 font-bold">ARC_COLLECTIONS_ENGINE</span>
                  <span className="text-[9px] text-zinc-600">RUNNING</span>
                </div>
                <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden">
                  <Motion.div 
                    className="h-full bg-blue-500"
                    animate={{ width: ["20%", "80%", "40%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg opacity-60">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-amber-400 font-bold">SATELLITE_LINK_WATCHDOG</span>
                  <span className="text-[9px] text-zinc-600">IDLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main: State IDE */}
        <div className="lg:col-span-8 flex flex-col bg-zinc-950/50">
          <div className="flex-1 p-6 overflow-y-auto">
            <pre className="text-[11px] leading-relaxed">
              <code className="text-zinc-400">
                <span className="text-blue-400">class</span> <span className="text-emerald-400">EpicCorporation</span> {'{'}{"\n"}
                {'  '}
                <span className="text-zinc-600">// Persistent state derived from Odoo ERP</span>{"\n"}
                {'  '}
                <span className="text-purple-400">@Autonomy</span>(Level: <span className="text-amber-500">4</span>){"\n"}
                {'  '}
                <span className="text-blue-400">public state</span>: BusinessState = {'{'}{"\n"}
                {'    '}metadata: {'{'}{"\n"}
                {'      '}version: <span className="text-emerald-500">"4.2.0"</span>,{"\n"}
                {'      '}tenant: <span className="text-emerald-500">"EPIC_CORP_CARIBBEAN"</span>,{"\n"}
                {'      '}region: <span className="text-emerald-500">"LATAM_EAST"</span>{"\n"}
                {'    '}{'}'},{"\n\n"}
                {'    '}departments: {'{'}{"\n"}
                {'      '}finance: {'{'}{"\n"}
                {'        '}status: <span className="text-emerald-500">"OPERATIONAL"</span>,{"\n"}
                {'        '}daily_revenue_target: <span className="text-amber-500">850000</span>,{"\n"}
                {'        '}automation_efficiency: <span className="text-amber-500">0.92</span>{"\n"}
                {'      '}{'}'},{"\n"}
                {'      '}support: {'{'}{"\n"}
                {'        '}latency_ms: <span className="text-amber-500">142</span>,{"\n"}
                {'        '}active_arcs: <span className="text-amber-500">24</span>{"\n"}
                {'      '}{'}'}{"\n"}
                {'    '}{'}'}{"\n"}
                {'  '}{'}'}{"\n\n"}
                {'  '}
                <span className="text-zinc-600">// Active Business Logic Wrappers</span>{"\n"}
                {'  '}
                <span className="text-blue-400">async execute</span>(command: Command) {'{'}{"\n"}
                {'    '}
                <span className="text-blue-400">const</span> policy = <span className="text-blue-400">this</span>.policies.match(command);{"\n"}
                {'    '}
                <span className="text-blue-400">if</span> (policy.requires_biometric) {'{'}{"\n"}
                {'      '}
                <span className="text-blue-400">await</span> ARC.triggerGovernanceBridge(command);{"\n"}
                {'    '}{'}'}{"\n"}
                {'    '}
                <span className="text-blue-400">return</span> Odoo.commit(command.diff);{"\n"}
                {'  '}{'}'}{"\n"}
                {'}'}
              </code>
            </pre>
          </div>

          {/* Bottom Terminal */}
          <div className="h-32 bg-black border-t border-zinc-800 p-4 font-mono">
            <div className="flex items-center gap-2 text-zinc-600 mb-2">
              <Terminal size={12} />
              <span className="text-[10px] uppercase font-bold tracking-widest">ARC_KRT_LOGS</span>
            </div>
            <div className="space-y-1 overflow-y-auto max-h-16 text-[10px]">
              <div className="flex gap-2">
                <span className="text-zinc-700">[11:04:22]</span>
                <span className="text-emerald-500">INFO:</span>
                <span className="text-zinc-400">Polled Odoo endpoint /partner/882... latency 41ms</span>
              </div>
              <div className="flex gap-2 text-zinc-500 animate-pulse">
                <span className="text-zinc-700">[11:04:18]</span>
                <span className="text-blue-500">DEBUG:</span>
                <span className="text-zinc-400">Recalculating risk weights for Zone 4 infrastructure mesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
