import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { Mic, Send, Lightbulb, Command, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

interface CommandCenterProps {
  onNavigate: (view: 'dashboard' | 'collections' | 'support' | 'sales' | 'finance' | 'field' | 'strategy' | 'memory' | 'policy' | 'global-infra' | 'ledger') => void;
  onTriggerGovernance: (command: string, category: string, value: string, risk: 'Low' | 'Medium' | 'High', onApprove: () => void) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onNavigate, onTriggerGovernance }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    "Invasion: Deploy Sales to Kingston Flow outage",
    "Mesh: Arbitrage staff from Barbados to St. Vincent",
    "Collections: Review accounts >60 days",
    "Memory: Recall last Raffoul decision",
    "Field: Enter Emergency War Room"
  ];

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isExecuting) return;

    const lowerInput = input.toLowerCase();

    // Immediate navigation commands
    if (lowerInput.includes('ledger') || lowerInput.includes('code')) {
      onNavigate('ledger');
      setInput('');
      return;
    }
    if (lowerInput.includes('memory')) {
      onNavigate('memory');
      setInput('');
      return;
    }
    if (lowerInput.includes('policy') || lowerInput.includes('settings')) {
      onNavigate('policy');
      setInput('');
      return;
    }
    if (lowerInput.includes('strategy')) {
      onNavigate('strategy');
      setInput('');
      return;
    }
    if (lowerInput.includes('war room') || lowerInput.includes('emergency')) {
      toast.warning("Entering War Room Protocol...");
      setInput('');
      return;
    }

    if (lowerInput.includes('invasion') || lowerInput.includes('competitor') || lowerInput.includes('strike')) {
      onNavigate('invasion');
      setInput('');
      return;
    }
    if (lowerInput.includes('mesh') || lowerInput.includes('arbitrage') || lowerInput.includes('staff')) {
      // Potentially scroll to mesh or just notify
      toast.info("Accessing Human Compute Mesh...");
      setInput('');
      return;
    }

    if (lowerInput.includes('resilience') || lowerInput.includes('island') || lowerInput.includes('weather')) {
      onNavigate('resilience');
      setInput('');
      return;
    }

    // Governance Check
    if (lowerInput.includes('waive') || lowerInput.includes('fee') || lowerInput.includes('liquidate') || lowerInput.includes('procure') || lowerInput.includes('order')) {
      onTriggerGovernance(
        input,
        lowerInput.includes('procure') || lowerInput.includes('order') ? "Supply Chain Procurement" : "Financial Liability",
        lowerInput.includes('procure') || lowerInput.includes('order') ? "$12,400.00" : "$450.00",
        "Medium",
        () => executeCommand(input)
      );
      setInput('');
      return;
    }

    executeCommand(input);
  };

  const executeCommand = async (cmd: string) => {
    setIsExecuting(true);
    setExecutionSteps(["Initializing ARC Nexus...", "Authenticating with Odoo ERP...", "Analyzing command parameters..."]);
    
    // Simulate multi-step execution
    const executionFlow = [
      "Accessing database records...",
      "Cross-referencing departmental dependencies...",
      "Applying autonomous business-as-code logic...",
      "Updating system state in real-time...",
      "Command Executed Successfully."
    ];

    for (const step of executionFlow) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExecutionSteps(prev => [...prev, step]);
    }

    toast.success(`ARC executed command: ${cmd}`, {
      description: "Autonomous ledger updates completed.",
    });
    
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionSteps([]);
      setInput('');
    }, 2000);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      toast.error("Speech recognition not supported in this browser.");
      return;
    }
    
    setIsListening(!isListening);
    if (!isListening) {
      toast.info("ARC listening...", { duration: 2000 });
      
      // Mock voice input after 2 seconds
      setTimeout(() => {
        const mockCommand = "Collections: Offer Raffoul 6 months, waive fees";
        setInput(mockCommand);
        setIsListening(false);
        toast.success("Command recognized: " + mockCommand);
      }, 2500);
    }
  };

  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Command size={16} />
          <h2 className="text-sm font-bold uppercase tracking-widest">Command Interface</h2>
        </div>
        {isExecuting && (
          <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            ARC_BUSY
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isExecuting ? (
          <Motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form onSubmit={handleCommand} className="relative mb-6">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or say: 'Have Collections offer Raffoul 6 months, waive fees'"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-4 pl-12 pr-24 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                <span className="text-xl font-bold">{'>'}</span>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className={`p-2 rounded-md transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
                >
                  <Mic size={20} />
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="flex items-center gap-3 w-full p-2 text-left text-xs text-zinc-500 hover:text-blue-400 hover:bg-blue-500/5 rounded transition-all group"
                >
                  <Lightbulb size={14} className="group-hover:text-blue-400" />
                  <span className="opacity-80">Suggested:</span>
                  <span className="font-medium text-zinc-400 group-hover:text-blue-300">"{s}"</span>
                </button>
              ))}
            </div>
          </Motion.div>
        ) : (
          <Motion.div
            key="executing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-[200px] bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-[11px]"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900">
              <span className="text-zinc-500">EX_PROCESS_LOG: {input.substring(0, 30)}...</span>
              <span className="text-blue-500">PID: {Math.floor(Math.random() * 9000) + 1000}</span>
            </div>
            <div className="space-y-1 max-h-[140px] overflow-y-auto">
              {executionSteps.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-zinc-700">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  <span className={i === executionSteps.length - 1 ? 'text-blue-400' : 'text-zinc-400'}>
                    {i === executionSteps.length - 1 ? '→ ' : '  '}
                    {step}
                  </span>
                  {step.includes('Successfully') && <CheckCircle2 size={12} className="text-green-500 inline ml-1" />}
                </div>
              ))}
              <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
