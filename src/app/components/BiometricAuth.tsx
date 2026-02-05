import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  Fingerprint, 
  ShieldCheck, 
  Lock, 
  X,
  Scan,
  ShieldAlert,
  Cpu
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BiometricAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  actionName: string;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({ isOpen, onClose, onVerified, actionName }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('verifying');
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
    
    if (status === 'verifying') {
      const timeout = setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
          onVerified();
          onClose();
        }, 1000);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80">
        <Motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl shadow-blue-500/10"
        >
          {/* Header */}
          <div className="p-8 pb-0 flex justify-between items-start">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-900 rounded-full text-zinc-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="px-8 pb-12 text-center">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">L4_BIOMETRIC_AUTH</h2>
            <p className="text-sm text-zinc-500 mb-8 font-mono">
              Action: <span className="text-blue-400 font-bold uppercase">{actionName}</span>
            </p>

            {/* Scanning UI */}
            <div className="relative w-48 h-48 mx-auto mb-10">
              <div className="absolute inset-0 border-2 border-zinc-800 rounded-3xl" />
              
              <div className="absolute inset-4 rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {status === 'idle' ? (
                    <Motion.div 
                      key="idle"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="cursor-pointer group flex flex-col items-center gap-4"
                      onClick={() => setStatus('scanning')}
                    >
                      <Fingerprint size={64} className="text-zinc-700 group-hover:text-blue-500 transition-colors" />
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Press to Scan</span>
                    </Motion.div>
                  ) : status === 'scanning' || status === 'verifying' ? (
                    <Motion.div key="active" className="relative w-full h-full flex items-center justify-center">
                      <Fingerprint size={64} className="text-blue-500" />
                      
                      {/* Scan Line */}
                      {status === 'scanning' && (
                        <Motion.div 
                          className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_#60a5fa]"
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      
                      {/* Radar Ring */}
                      <Motion.div 
                        className="absolute inset-8 border border-blue-500/30 rounded-full"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </Motion.div>
                  ) : (
                    <Motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <CheckCircle2 size={64} className="text-emerald-500" />
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress Ring Background */}
              <svg className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90">
                <circle 
                  cx="50%" cy="50%" r="48%" 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-zinc-900" 
                  strokeWidth="2" 
                />
                <Motion.circle 
                  cx="50%" cy="50%" r="48%" 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-blue-500" 
                  strokeWidth="2"
                  strokeDasharray="100 100"
                  animate={{ strokeDashoffset: 100 - progress }}
                  transition={{ ease: "linear" }}
                />
              </svg>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-xs font-mono">
                {status === 'idle' ? (
                  <span className="text-zinc-600">WAITING_FOR_INPUT</span>
                ) : status === 'scanning' ? (
                  <span className="text-blue-400 animate-pulse">ACQUIRING_BIOMETRICS... {progress}%</span>
                ) : status === 'verifying' ? (
                  <span className="text-amber-500 animate-pulse">CRYPTOGRAPHIC_VALIDATION...</span>
                ) : (
                  <span className="text-emerald-500 font-bold">IDENTITY_CONFIRMED // L4_GRANTED</span>
                )}
              </div>

              <div className="flex items-center gap-2 p-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl w-full">
                <Scan size={14} className="text-zinc-600" />
                <div className="flex-1 text-left">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Executive Authority</div>
                  <div className="text-xs text-zinc-300">EPIC_ADMIN_ROOT</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Cpu size={12} className="text-blue-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Decoration */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x" />
        </Motion.div>
      </div>
    </AnimatePresence>
  );
};

// Add lucide CheckCircle2 import if needed
import { CheckCircle2 } from 'lucide-react';
