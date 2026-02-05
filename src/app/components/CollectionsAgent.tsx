import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  History, 
  Settings2, 
  MessageSquare, 
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Zap,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface CollectionsAgentProps {
  onBack: () => void;
}

export const CollectionsAgent: React.FC<CollectionsAgentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'threads' | 'policy' | 'simulation' | 'history'>('overview');

  const policy = {
    autonomyLevel: "High",
    autoResolveLimit: "$500.00",
    escalationThreshold: "$5,000.00",
    strategy: "Empathetic Professional",
    activeRules: [
      "Auto-waive late fees if account is < 15 days overdue",
      "Offer 3-month payment plans for balances < $2k",
      "Escalate immediately if client has open 'Critical' support ticket"
    ]
  };

  const activeThreads = [
    { client: "Adams Health", balance: "$4,200", status: "Negotiating", lastAction: "Offered 4-month plan", time: "2m ago" },
    { client: "St. Lucia Resort", balance: "$12,400", status: "Escalated", lastAction: "Waiting for CEO approval", time: "15m ago" },
    { client: "Dragon Windows", balance: "$850", status: "Resolved", lastAction: "Payment scheduled for Friday", time: "1h ago" }
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
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Collections Agent</h2>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            AGENT_ID: ARC_COLLECTIONS_01 // STATUS: OPERATIONAL
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'overview', icon: <ShieldCheck size={18} />, label: 'Command Overview' },
            { id: 'threads', icon: <MessageSquare size={18} />, label: 'Active Threads' },
            { id: 'policy', icon: <Settings2 size={18} />, label: 'Policy Engine' },
            { id: 'simulation', icon: <Zap size={18} />, label: 'Simulation Mode' },
            { id: 'history', icon: <History size={18} />, label: 'Action History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
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
            {activeTab === 'overview' && (
              <Motion.div 
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Total Managed AR</div>
                    <div className="text-2xl font-mono text-white font-bold">$32,414</div>
                  </div>
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Success Rate</div>
                    <div className="text-2xl font-mono text-green-400 font-bold">92.4%</div>
                  </div>
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Avg Resolution</div>
                    <div className="text-2xl font-mono text-blue-400 font-bold">4.2 Days</div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle size={16} className="text-yellow-500" />
                    High Priority Exceptions
                  </h3>
                  <div className="space-y-3">
                    {activeThreads.filter(t => t.status === 'Escalated').map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-lg group hover:border-zinc-700 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                            {t.client[0]}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{t.client}</div>
                            <div className="text-xs text-zinc-500">{t.lastAction}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-mono text-white">{t.balance}</div>
                            <div className="text-[10px] text-red-400 uppercase font-bold">{t.status}</div>
                          </div>
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-blue-500 transition-all">
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'policy' && (
              <Motion.div 
                key="policy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Autonomy Configuration</h3>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-mono">ENFORCED</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold">Auto-Approval Limit</span>
                        <input type="text" value={policy.autoResolveLimit} className="mt-1 w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:border-blue-500/50 outline-none" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold">Escalation Threshold</span>
                        <input type="text" value={policy.escalationThreshold} className="mt-1 w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:border-blue-500/50 outline-none" />
                      </label>
                    </div>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold">Communication Persona</span>
                        <select className="mt-1 w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:border-blue-500/50 outline-none">
                          <option>Empathetic Professional</option>
                          <option>Direct & Firm</option>
                          <option>Flexible Advisor</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Active Operational Rules</div>
                    {policy.activeRules.map((rule, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-black/40 border border-zinc-800 rounded group">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span className="text-xs text-zinc-300 flex-grow">{rule}</span>
                        <button className="text-[10px] text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">REMOVE</button>
                      </div>
                    ))}
                    <button className="w-full py-2 border border-dashed border-zinc-700 text-zinc-500 text-xs hover:border-zinc-500 hover:text-zinc-300 rounded transition-all">
                      + Add Policy Rule
                    </button>
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'simulation' && (
              <Motion.div 
                key="simulation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={120} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                      <Zap size={20} />
                      Predictive Simulation Mode
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-2xl">
                      ARC is running Monte Carlo simulations on your current AR portfolio. Adjust variables to see projected impacts on cash flow and client retention.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">What If: Policy Change</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-black/40 border border-zinc-800 rounded-lg">
                        <div className="text-xs text-white font-bold mb-2">Automate payment plan offers for all {'>'}30 day accounts</div>
                        <div className="flex items-center gap-4 text-[10px] text-zinc-500">
                          <span className="flex items-center gap-1 text-green-400"><TrendingUp size={12} /> +18% Cash Flow</span>
                          <span className="flex items-center gap-1 text-yellow-400"><AlertCircle size={12} /> -2% Margin (Fees)</span>
                        </div>
                      </div>
                      <div className="p-4 bg-black/40 border border-zinc-800 rounded-lg opacity-50">
                        <div className="text-xs text-white font-bold mb-2">Increase late fee to 5% after 45 days</div>
                        <div className="flex items-center gap-4 text-[10px] text-zinc-500">
                          <span className="flex items-center gap-1 text-green-400"><TrendingUp size={12} /> +$4k/mo Revenue</span>
                          <span className="flex items-center gap-1 text-red-400"><TrendingUp size={12} /> +12% Churn Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Projected 30-Day Outlook</h4>
                    <div className="h-48 flex items-end gap-2 px-2">
                      {[40, 65, 45, 90, 55, 70, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-600/20 border-t-2 border-blue-500 rounded-t relative group">
                          <Motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            className="w-full bg-blue-500/40 rounded-t"
                          />
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            ${(h * 120).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-zinc-600 font-mono px-2">
                      <span>WK1</span>
                      <span>WK2</span>
                      <span>WK3</span>
                      <span>WK4</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded uppercase tracking-widest transition-all">
                    Reset Sandbox
                  </button>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all">
                    Commit to Production
                  </button>
                </div>
              </Motion.div>
            )}

            {activeTab === 'history' && (
              <Motion.div 
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Audit Log</h3>
                  <div className="space-y-4">
                    {[
                      { action: "Sent payment reminder", target: "Adams Health", time: "2m ago", agent: "ARC_COL_01" },
                      { action: "Applied 'Late Fee Waiver' policy", target: "Dragon Windows", time: "1h ago", agent: "ARC_COL_01" },
                      { action: "Policy Rule Added: 'Escalate if Critical Ticket'", target: "System", time: "5h ago", agent: "Eric (Human)" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 py-3 border-b border-zinc-800 last:border-0">
                        <div className="text-[10px] font-mono text-zinc-600 w-24">{item.time}</div>
                        <div className="flex-grow">
                          <div className="text-xs text-zinc-200 font-bold">{item.action}</div>
                          <div className="text-[10px] text-zinc-500">Target: {item.target}</div>
                        </div>
                        <div className="text-[10px] px-2 py-0.5 bg-zinc-800 rounded text-zinc-400 font-mono">{item.agent}</div>
                      </div>
                    ))}
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
