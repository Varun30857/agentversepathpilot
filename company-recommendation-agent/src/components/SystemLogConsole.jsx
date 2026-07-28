import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Play } from 'lucide-react';

export function SystemLogConsole({ agentLogs, onClearLogs, onTriggerAgentRun }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 cursor-pointer hover:bg-slate-900 transition-all select-none"
      >
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-200 font-mono tracking-wide uppercase">
            Agent Execution & Evaluation Trace
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
            {agentLogs.length} Events
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTriggerAgentRun();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-all"
          >
            <Play className="w-3 h-3 fill-current" />
            Evaluate Turn
          </button>

          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Log Entries View */}
      {isOpen && (
        <div className="p-4 bg-slate-950/95 font-mono-code text-xs space-y-2 max-h-64 overflow-y-auto">
          {agentLogs.length === 0 ? (
            <div className="text-slate-500 italic py-2">No evaluation events logged yet. Trigger evaluation above.</div>
          ) : (
            agentLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-3 text-slate-300 border-b border-slate-900/80 pb-1.5">
                <span className="text-slate-500 shrink-0 text-[11px]">[{log.timestamp}]</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-semibold text-indigo-300 shrink-0">
                  {log.agent}
                </span>
                <span className="text-emerald-400 shrink-0 font-bold">[{log.action}]</span>
                <span className="text-slate-300 break-all">{log.details}</span>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
