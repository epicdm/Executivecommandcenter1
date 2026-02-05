import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Zap, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Filter,
  BarChart3,
  Calendar,
  Sparkles
} from 'lucide-react';

interface SalesAgentProps {
  onBack: () => void;
}

export const SalesAgent: React.FC<SalesAgentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'intelligence' | 'automation'>('pipeline');

  const leads = [
    { id: "L-442", name: "Caribbean Sands Resort", value: "$12,500/mo", score: 92, status: "HOT", context: "Needs redundancy setup after recent outage" },
    { id: "L-441", name: "Port Authority", value: "$45,000/mo", score: 78, status: "WURMING", context: "Competitor contract expiring in 30 days" },
    { id: "L-440", name: "MegaMart St. Lucia", value: "$8,200/mo", score: 45, status: "AT_RISK", context: "3 open support tickets on existing account" }
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
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Sales Agent</h2>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            AGENT_ID: ARC_SALES_04 // MODE: REVENUE_MAXIMIZER
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'pipeline', icon: <BarChart3 size={18} />, label: 'Lead Pipeline' },
            { id: 'intelligence', icon: <Sparkles size={18} />, label: 'ARC Intelligence' },
            { id: 'automation', icon: <Zap size={18} />, label: 'Outreach Autonomy' }
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
          
          <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Target vs Actual</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-zinc-400 font-mono">Q1_REVENUE</span>
                  <span className="text-white">72%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[72%]" />
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 italic">"ARC predicts 94% achievement based on current pipeline velocity."</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeTab === 'pipeline' && (
              <Motion.div 
                key="pipeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Potential ARR</div>
                    <div className="text-xl font-mono font-bold text-white">$520.4K</div>
                  </div>
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Avg Deal Size</div>
                    <div className="text-xl font-mono font-bold text-blue-400">$18.2K</div>
                  </div>
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">ARC Win Rate</div>
                    <div className="text-xl font-mono font-bold text-green-400">31.4%</div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Lead Intelligence Feed</h3>
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors">
                        <Filter size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-zinc-800/50">
                    {leads.map((lead, i) => (
                      <div key={i} className="p-4 hover:bg-zinc-800/30 transition-all group">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-bold text-white">{lead.name}</h4>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                lead.status === 'HOT' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                                lead.status === 'AT_RISK' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}>
                                {lead.status}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">{lead.context}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-white font-mono">{lead.value}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">ID: {lead.id}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="text-[10px] text-zinc-500 uppercase font-bold">ARC SCORE:</div>
                              <div className={`text-xs font-black ${lead.score > 80 ? 'text-green-500' : 'text-blue-400'}`}>{lead.score}</div>
                            </div>
                            {lead.status === 'AT_RISK' && (
                              <div className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10">
                                <AlertTriangle size={10} />
                                Revenue at Risk
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-white uppercase rounded transition-all">
                              Profile
                            </button>
                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-[10px] font-bold text-white uppercase rounded transition-all">
                              Assign Tech
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'intelligence' && (
              <Motion.div 
                key="intelligence"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-900/10 border border-blue-500/20 rounded-xl relative">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Users size={16} />
                      Cross-Dept Insights
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="mt-1"><AlertTriangle size={14} className="text-yellow-500" /></div>
                        <div className="text-xs text-zinc-400">
                          <span className="text-white font-bold">MegaMart St. Lucia</span> is showing 40% increased interest in fiber backup solutions. Support logs show 2 outages in their zone this month.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1"><TrendingUp size={14} className="text-green-500" /></div>
                        <div className="text-xs text-zinc-400">
                          Finance reports <span className="text-white font-bold">Caribbean Sands</span> just cleared a $50k back-balance. High probability for upsell to Premium Tier.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Calendar size={16} />
                      Autonomous Scheduling
                    </h4>
                    <div className="space-y-3">
                      {[
                        { name: "John Wick", company: "Continental", time: "14:00 Today", type: "Demo" },
                        { name: "S. Connor", company: "Cyberdyne", time: "09:30 Tomorrow", type: "Closing" }
                      ].map((evt, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-black/40 border border-zinc-800 rounded-lg">
                          <div>
                            <div className="text-xs font-bold text-white">{evt.name}</div>
                            <div className="text-[10px] text-zinc-500">{evt.company}</div>
                          </div>
                          <div className="text-right text-[10px]">
                            <div className="text-blue-400 font-bold">{evt.time}</div>
                            <div className="text-zinc-600 uppercase font-mono">{evt.type}</div>
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
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">ARC Outreach Engine</h3>
                      <p className="text-[10px] text-zinc-500 mt-1">Autonomous communication based on lead sentiment and dept data.</p>
                    </div>
                    <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] font-bold text-green-500 uppercase">Active</div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-black/40 border border-zinc-800 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <MessageSquare size={16} className="text-blue-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">Draft: Caribbean Sands Outreach</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono italic">Sentiment: 0.84 (Empathetic/Urgent)</span>
                      </div>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded text-xs text-zinc-400 font-mono leading-relaxed mb-4">
                        "Hello [Contact], ARC noticed the recent connectivity stability issues in your zone. Given your upcoming peak season, I've reserved a high-priority technician slot to discuss our Redundant Fiber Tier..."
                      </div>
                      <div className="flex justify-end gap-2">
                        <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-white uppercase rounded transition-all">Refine</button>
                        <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-[10px] font-bold text-white uppercase rounded transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                          <Zap size={12} />
                          Send Now
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-lg group">
                      <div>
                        <div className="text-xs font-bold text-white mb-1">Auto-Schedule Demos</div>
                        <div className="text-[10px] text-zinc-500">Allow ARC to find and book slots in sales rep calendars for hot leads.</div>
                      </div>
                      <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
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
