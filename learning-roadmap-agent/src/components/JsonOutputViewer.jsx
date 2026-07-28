import React, { useState } from 'react';
import { Copy, Check, FileCode, CheckCircle2, ShieldCheck } from 'lucide-react';

export function JsonOutputViewer({ roadmapData }) {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(roadmapData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Agent Output: learning_roadmap JSON Payload
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Raw valid JSON schema response produced by Learning Roadmap Agent.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            Strict Schema Compliant
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-mono font-medium transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Payload</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Formatted Code Box */}
      <div className="relative font-mono text-xs">
        <pre className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 text-emerald-300 overflow-x-auto leading-relaxed max-h-[600px]">
          {jsonString}
        </pre>
      </div>

    </div>
  );
}
