import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Fingerprint, 
  X, 
  Lock, 
  Cpu, 
  AlertCircle,
  Database,
  ArrowRight
} from 'lucide-react';

interface GovernanceBridgeProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  command: string;
  impact: {
    category: string;
    value: string;
    risk: 'Low' | 'Medium' | 'High';
  };
}

export const GovernanceBridge: React.FC<GovernanceBridgeProps> = ({ isOpen, onClose, onApprove, command, impact }) => {
  const [verifying, setVerifying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (verifying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onApprove();
              setVerifying(false);
              setProgress(0);
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [verifying, onApprove]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <Motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">L4 Governance Bridge</h2>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu size={40} />
              </div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">ARC Execution Request</div>
              <p className="text-lg font-bold text-white italic leading-tight">"{command}"</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Impact Category</div>
                <div className="text-xs font-bold text-white uppercase">{impact.category}</div>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Estimated Value</div>
                <div className="text-xs font-bold text-blue-400 font-mono">{impact.value}</div>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Database size={16} />
                  <span className="text-[10px] font-bold uppercase">Proposed Odoo Diff</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">ID: 882-C-9</span>
              </div>
              <div className="space-y-2 font-mono text-[10px]">
                <div className="flex items-center justify-between p-2 rounded bg-red-500/5 border border-red-500/10 text-red-400">
                  <span>- account.move.line: 7721 (Fee)</span>
                  <span className="line-through">$450.00</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-emerald-500/5 border border-emerald-500/10 text-emerald-500">
                  <span>+ account.move.line: 7721 (Waived)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-blue-500/5 border border-blue-500/10 text-blue-400">
                  <span>+ res.partner.note: "ARC Governance Waiver"</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3">
              <AlertCircle size={18} className="text-amber-500 shrink-0" />
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                This command exceeds the <span className="text-amber-500 font-bold">Standard Autonomy Threshold ($1,000)</span>. Manual biometric verification required to commit changes to ERP.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {!verifying ? (
                <Motion.button 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setVerifying(true)}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl flex items-center justify-center gap-3 transition-all group overflow-hidden relative shadow-lg shadow-blue-500/20"
                >
                  <Fingerprint size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-black uppercase tracking-widest italic">Verify & Execute</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                </Motion.button>
              ) : (
                <Motion.div 
                  key="verifying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-center gap-3 text-blue-400 animate-pulse">
                    <Fingerprint size={32} />
                    <span className="text-xs font-bold uppercase tracking-widest">Scanning Biometrics...</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <Motion.div 
                      className="h-full bg-blue-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={onClose}
              disabled={verifying}
              className="w-full mt-4 py-3 text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Cancel Transaction
            </button>
          </div>
        </div>
      </Motion.div>
    </div>
  );
};
