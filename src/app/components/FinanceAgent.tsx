import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  ArrowLeft, 
  BarChart3, 
  PieChart, 
  Wallet, 
  ShieldCheck, 
  AlertCircle, 
  TrendingDown, 
  TrendingUp,
  FileText,
  Lock,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface FinanceAgentProps {
  onBack: () => void;
}

const data = [
  { name: 'Week 1', cash: 45000, ar: 32000 },
  { name: 'Week 2', cash: 52000, ar: 28000 },
  { name: 'Week 3', cash: 48000, ar: 41000 },
  { name: 'Week 4', cash: 61000, ar: 35000 },
];

export const FinanceAgent: React.FC<FinanceAgentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'aging' | 'autonomy'>('overview');

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
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Finance Agent</h2>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            AGENT_ID: ARC_FINANCE_01 // MODE: TREASURY_GUARD
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'overview', icon: <PieChart size={18} />, label: 'Cash Overview' },
            { id: 'aging', icon: <BarChart3 size={18} />, label: 'AR Aging' },
            { id: 'autonomy', icon: <Lock size={18} />, label: 'Risk & Policies' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Cash Position</h4>
            <div className="text-2xl font-mono font-bold text-white mb-1">$127,482</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
              <TrendingUp size={12} />
              +8.4% WoW
            </div>
          </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Cash Flow Velocity</h4>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey="name" stroke="#71717a" fontSize={10} />
                          <YAxis stroke="#71717a" fontSize={10} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '10px' }}
                          />
                          <Area type="monotone" dataKey="cash" stroke="#10b981" fillOpacity={1} fill="url(#colorCash)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Bad Debt Risk</div>
                      <div className="text-xl font-mono font-bold text-red-400">Low (3.2%)</div>
                      <p className="text-[10px] text-zinc-500 mt-2 italic">"ARC mitigated $12k risk today via proactive collections."</p>
                    </div>
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">DSO Target</div>
                      <div className="text-xl font-mono font-bold text-white">30 Days</div>
                      <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Recent Cash movements</h3>
                    <span className="text-[10px] text-zinc-500 font-mono">SOURCE: ODOO_JOURNAL</span>
                  </div>
                  <div className="divide-y divide-zinc-800/50">
                    {[
                      { ref: "PAY-901", entity: "Raffoul Logistics", amount: "+$4,200", type: "CR", date: "Today" },
                      { ref: "EXP-122", entity: "Fiber Provider X", amount: "-$12,400", type: "DR", date: "Today" },
                      { ref: "PAY-899", entity: "Island Blue", amount: "+$850", type: "CR", date: "Yesterday" }
                    ].map((tx, i) => (
                      <div key={i} className="p-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded ${tx.type === 'CR' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-400'}`}>
                            {tx.type === 'CR' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          </div>
                          <div>
                            <div className="font-bold text-white">{tx.entity}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">{tx.ref}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold font-mono ${tx.type === 'CR' ? 'text-emerald-400' : 'text-zinc-200'}`}>{tx.amount}</div>
                          <div className="text-[10px] text-zinc-500">{tx.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'aging' && (
              <Motion.div 
                key="aging"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Receivables Aging bucket</h4>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { range: '0-30', amount: 120000, color: '#10b981' },
                        { range: '31-60', amount: 45000, color: '#3b82f6' },
                        { range: '61-90', amount: 28000, color: '#f59e0b' },
                        { range: '91+', amount: 12000, color: '#ef4444' },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                        <XAxis dataKey="range" stroke="#71717a" fontSize={10} />
                        <YAxis stroke="#71717a" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', fontSize: '10px' }} />
                        <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'autonomy' && (
              <Motion.div 
                key="autonomy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-xl flex items-start gap-4">
                  <ShieldCheck className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">ARC Financial Safeguards</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      ARC is authorized to approve payment plans up to <span className="text-emerald-400 font-bold">$10,000</span> for accounts with a loyalty score of 8+. Any amount higher requires your direct command via the terminal.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-black/40 border border-zinc-800 rounded-lg">
                        <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Max Discount Authority</div>
                        <div className="text-xs text-white font-mono">15% (waived fees)</div>
                      </div>
                      <div className="p-3 bg-black/40 border border-zinc-800 rounded-lg">
                        <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Risk Threshold</div>
                        <div className="text-xs text-white font-mono">Auto-Freeze @ $25k</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Zap size={14} className="text-emerald-500" />
                    Pending Financial Actions
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-black/40 border border-zinc-800 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Approve Raffoul Refund</div>
                        <div className="text-[10px] text-zinc-500">Overpayment credit: $1,240.00</div>
                      </div>
                      <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-[10px] font-bold text-white uppercase rounded transition-all">Authorize</button>
                    </div>
                    <div className="p-3 bg-black/40 border border-zinc-800 rounded-lg flex items-center justify-between opacity-50">
                      <div>
                        <div className="text-xs font-bold text-white">Auto-Reconciliation</div>
                        <div className="text-[10px] text-zinc-500">Matching 42 bank entries...</div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 italic">IN_PROGRESS</span>
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
