import React from 'react';
import { Terminal, Trash2, Play, Activity } from 'lucide-react';

export function SystemLogConsole({ agentLogs, onClearLogs, onTriggerAgentRun }) {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl space-y-3">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Agent Execution System Log Console
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTriggerAgentRun}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3" />
            <span>Trigger Turn</span>
          </button>

          <button
            onClick={onClearLogs}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Clear Console Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Log Terminal Window */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto">
        {agentLogs.length === 0 ? (
          <div className="text-slate-600 italic">No agent log events recorded.</div>
        ) : (
          agentLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2.5 leading-snug">
              <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
              <span className="text-emerald-400 font-bold shrink-0">{log.agent}</span>
              <span className="text-indigo-300 shrink-0">&lt;{log.action}&gt;</span>
              <span className="text-slate-300">{log.details}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
