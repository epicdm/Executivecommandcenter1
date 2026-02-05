import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  ArrowLeft, 
  Cpu, 
  MessageSquare, 
  ShieldCheck,
  ChevronRight,
  Database
} from 'lucide-react';

interface MemoryVaultProps {
  onBack: () => void;
}

export const MemoryVault: React.FC<MemoryVaultProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const memories = [
    {
      id: "MEM-8821",
      timestamp: "2026-02-03 14:22",
      category: "Decision",
      summary: "Waived late fees for Raffoul ($450) based on 6-month loyalty projection.",
      impact: "Retained high-value B2B account; Projected LTV increase +$12k.",
      tags: ["Finance", "Retention"]
    },
    {
      id: "MEM-8819",
      timestamp: "2026-02-03 09:15",
      category: "Analysis",
      summary: "Detected pattern of signal degradation in Zone 4 before hardware failure.",
      impact: "Preventative dispatch saved 4 hours of total downtime.",
      tags: ["Field", "Predictive"]
    },
    {
      id: "MEM-8815",
      timestamp: "2026-02-02 16:45",
      category: "Sales",
      summary: "Pivoted Dragon Windows lead to 'Hot' after cross-referencing support stability.",
      impact: "Contract signed 24h later.",
      tags: ["Sales", "Integration"]
    },
    {
      id: "MEM-8810",
      timestamp: "2026-02-01 11:30",
      category: "Policy",
      summary: "Updated autonomy threshold for Collections Agent to $500 waiver cap.",
      impact: "Reduced manager approval queue by 65%.",
      tags: ["Admin", "Autonomy"]
    }
  ];

  const filteredMemories = memories.filter(m => 
    m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Episodic Memory Vault</h2>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <History size={12} className="text-blue-500" />
            ARC_COGNITIVE_HISTORY // PERSISTENCE: 100%
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Search & Filter Bar */}
        <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl focus-within:border-blue-500/50 transition-all">
            <Search size={18} className="text-zinc-600" />
            <input 
              type="text" 
              placeholder="Search ARC's past decisions, impact reports, or reasoning patterns..."
              className="bg-transparent border-none focus:outline-none w-full text-sm text-zinc-300 placeholder:text-zinc-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
            <Filter size={18} />
          </button>
          <button className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
            <Calendar size={18} />
          </button>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((memory, i) => (
              <Motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative flex gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-blue-500/30 transition-all"
              >
                {/* Timeline Visual */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center text-blue-500 group-hover:border-blue-500/50 transition-all">
                    <Database size={18} />
                  </div>
                  <div className="flex-1 w-px bg-zinc-800 my-2" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{memory.timestamp}</span>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase rounded border border-blue-500/20">
                        {memory.category}
                      </span>
                      <div className="flex gap-2">
                        {memory.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded italic">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-700">{memory.id}</span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {memory.summary}
                  </h3>

                  <div className="p-4 bg-zinc-950 border border-zinc-800/50 rounded-xl flex items-start gap-3">
                    <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-emerald-500 mb-1">Impact Analysis</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{memory.impact}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500 hover:text-blue-400 transition-colors">
                      <MessageSquare size={14} />
                      View Full Reasoning Chain
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500 hover:text-blue-400 transition-colors">
                      <Cpu size={14} />
                      Audit Policy Bridge
                    </button>
                    <ChevronRight size={16} className="ml-auto text-zinc-700 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              </Motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
