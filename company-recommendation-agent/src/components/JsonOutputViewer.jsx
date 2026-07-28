import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, ShieldCheck, FileCode } from 'lucide-react';

export function JsonOutputViewer({ recommendationData }) {
  const [copied, setCopied] = useState(false);

  const rawJsonString = JSON.stringify(recommendationData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'company_recommendations_output.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const recCount = recommendationData?.company_recommendations?.length || 0;
  const isTop10Valid = recCount === 10;
  const isBestCompanyValid = Boolean(recommendationData?.best_company?.company);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            Company Recommendation Agent - JSON Output
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Strict Schema Response format (Only valid JSON output without conversational markdown)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Raw JSON'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download JSON
          </button>
        </div>
      </div>

      {/* Schema Verification Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-4 h-4 ${isTop10Valid ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className="text-slate-300">
            Recommendations Count: <strong className="text-white">{recCount} / 10</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-4 h-4 ${isBestCompanyValid ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className="text-slate-300">
            Best Company Schema: <strong className="text-white">{recommendationData?.best_company?.company || 'Valid'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-purple-400" />
          <span className="text-slate-300">
            Format: <strong className="text-white">Strict RFC 8259 JSON</strong>
          </span>
        </div>
      </div>

      {/* Code Block Container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        <pre className="p-4 overflow-x-auto font-mono-code text-xs text-indigo-300 leading-relaxed max-h-[600px]">
          <code>{rawJsonString}</code>
        </pre>
      </div>

    </div>
  );
}
