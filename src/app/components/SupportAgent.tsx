import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  Headphones, 
  ArrowLeft, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  History,
  Activity,
  UserCheck,
  Zap,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

interface SupportAgentProps {
  onBack: () => void;
}

export const SupportAgent: React.FC<SupportAgentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'sla' | 'workload' | 'automation'>('realtime');

  const tickets = [
    { id: "T-892", client: "Raffoul Logistics", priority: "Critical", status: "ARC_HANDLING", time: "12m", issue: "Network Outage (Branch A)" },
    { id: "T-891", client: "Global Tech", priority: "High", status: "PENDING_HUMAN", time: "45m", issue: "Billing Discrepancy" },
    { id: "T-890", client: "Island Blue", priority: "Normal", status: "RESOLVED", time: "2h", issue: "Password Reset" }
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Support Agent</h2>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            AGENT_ID: ARC_SUPPORT_02 // MODE: SEMI-AUTONOMOUS
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'realtime', icon: <Activity size={18} />, label: 'Real-time Flow' },
            { id: 'sla', icon: <Clock size={18} />, label: 'SLA Guardrail' },
            { id: 'workload', icon: <UserCheck size={18} />, label: 'Tech Allocation' },
            { id: 'automation', icon: <Zap size={18} />, label: 'Autonomy Rules' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeTab === 'realtime' && (
              <Motion.div 
                key="realtime"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Active Support Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: "Active Tickets", value: "61", color: "text-white" },
                    { label: "ARC Resolved Today", value: "142", color: "text-purple-400" },
                    { label: "Mean Wait Time", value: "1.4m", color: "text-green-400" },
                    { label: "Critical Escalations", value: "3", color: "text-red-400" }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">{stat.label}</div>
                      <div className={`text-xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Active Ticket Stream</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] text-zinc-500 font-mono">FILTER: ALL_LIVE</span>
                      <button className="text-[9px] text-purple-400 font-bold hover:underline uppercase">Export Logs</button>
                    </div>
                  </div>
                  <div className="divide-y divide-zinc-800/50">
                    {tickets.map((ticket, i) => (
                      <div key={i} className="p-4 hover:bg-zinc-800/30 transition-all group flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className={`mt-1 w-2 h-2 rounded-full ${
                            ticket.priority === 'Critical' ? 'bg-red-500 animate-pulse' :
                            ticket.priority === 'High' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono text-zinc-500">{ticket.id}</span>
                              <h4 className="text-sm font-bold text-white">{ticket.client}</h4>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                ticket.status === 'ARC_HANDLING' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                ticket.status === 'RESOLVED' ? 'bg-green-500/10 text-green-400' :
                                'bg-zinc-800 text-zinc-400'
                              }`}>
                                {ticket.status}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 mb-2">{ticket.issue}</p>
                            <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
                              <span className="flex items-center gap-1"><Clock size={10} /> {ticket.time} open</span>
                              <span className="flex items-center gap-1"><MessageSquare size={10} /> 4 messages</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-white uppercase rounded transition-all">
                            View Thread
                          </button>
                          {ticket.status === 'PENDING_HUMAN' && (
                            <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-[10px] font-bold text-white uppercase rounded transition-all shadow-lg shadow-purple-600/20">
                              Intervene
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Automation Spotlight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Zap size={80} className="text-purple-400" />
                    </div>
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">ARC Intelligent Routing</h4>
                    <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                      ARC has identified that <span className="text-white font-bold">Raffoul Logistics</span> has a pending $32k balance in Finance. Support priority has been automatically elevated to "Critical" to maintain relationship leverage.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-grow bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-3/4" />
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">Synergy Active</span>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Tech Dispatch Queue</h4>
                    <div className="space-y-3">
                      {[
                        { name: "John Doe", skill: "Fiber Repair", dist: "1.2km", status: "En Route" },
                        { name: "Sarah Smith", skill: "Network Config", dist: "4.5km", status: "On Site" }
                      ].map((tech, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] p-2 bg-black/40 rounded border border-zinc-800/50">
                          <div>
                            <span className="text-white font-bold block">{tech.name}</span>
                            <span className="text-zinc-500">{tech.skill}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-zinc-400 block">{tech.dist}</span>
                            <span className="text-green-500 uppercase font-bold">{tech.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'automation' && (
              <Motion.div 
                key="automation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Support Autonomy Policy</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-lg group">
                      <div>
                        <div className="text-xs font-bold text-white mb-1">Auto-Resolve Standard Issues</div>
                        <div className="text-[10px] text-zinc-500">Enable ARC to handle password resets, basic billing FAQs, and status updates.</div>
                      </div>
                      <div className="w-10 h-5 bg-purple-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-lg group">
                      <div>
                        <div className="text-xs font-bold text-white mb-1">Cross-Departmental Escalation</div>
                        <div className="text-[10px] text-zinc-500">Automatically escalate Support tickets for clients with overdue Finance balances.</div>
                      </div>
                      <div className="w-10 h-5 bg-purple-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>

                    <div className="p-4 bg-black/40 border border-zinc-800 rounded-lg">
                      <div className="text-xs font-bold text-white mb-4">Autonomy Trigger Matrix</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] text-zinc-500 uppercase font-bold">ARC Response Threshold</label>
                          <select className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-[11px] outline-none">
                            <option>Immediate (Low Latency)</option>
                            <option>Wait 5m (Review Period)</option>
                            <option>Only on Weekends</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-zinc-500 uppercase font-bold">Intervention Trigger</label>
                          <select className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-[11px] outline-none">
                            <option>Sentiment Score {'<'} 0.3</option>
                            <option>3+ Messages w/o Resolution</option>
                            <option>Client Keywords: "Legal", "Cancel"</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
