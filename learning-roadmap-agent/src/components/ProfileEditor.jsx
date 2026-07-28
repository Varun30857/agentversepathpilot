import React, { useState } from 'react';
import { PRESET_PROFILES } from '../data/presetProfiles';
import { UserCheck, Play, RefreshCw, AlertCircle, FileJson, CheckCircle2 } from 'lucide-react';

export function ProfileEditor({ profileJsonString, onUpdateJson, activePreset, onLoadPreset, onRunPipeline }) {
  const [jsonText, setJsonText] = useState(profileJsonString);
  const [isValidJson, setIsValidJson] = useState(true);

  // Synchronize internal text state when external profileJsonString changes
  React.useEffect(() => {
    setJsonText(profileJsonString);
    setIsValidJson(true);
  }, [profileJsonString]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setJsonText(text);
    try {
      JSON.parse(text);
      setIsValidJson(true);
      onUpdateJson(text);
    } catch (err) {
      setIsValidJson(false);
    }
  };

  const handleReset = () => {
    const defaultPreset = PRESET_PROFILES[0];
    onLoadPreset(defaultPreset);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Presets Selector Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Candidate Profile Ingestion Payload
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a preset student profile or modify the JSON payload below to test goal-based roadmap generation.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default Preset</span>
          </button>
        </div>

        {/* Preset Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {PRESET_PROFILES.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onLoadPreset(preset)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-100'}`}>
                    {preset.name}
                  </h3>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-emerald-400 border border-slate-800">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                  {preset.subtitle}
                </p>
                <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between border-t border-slate-800/60 pt-2">
                  <span>Domain: {preset.domain}</span>
                  <span className="font-mono text-emerald-400">{preset.hoursPerDay}h/day</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* JSON Payload Editor Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl space-y-4">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Student Profile JSON Schema
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {isValidJson ? (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valid JSON Payload
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-400 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                Syntax Error in JSON
              </span>
            )}

            <button
              onClick={onRunPipeline}
              disabled={!isValidJson}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
                isValidJson
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Generate Roadmap</span>
            </button>
          </div>
        </div>

        {/* Textarea Editor */}
        <div className="relative font-mono text-xs">
          <textarea
            value={jsonText}
            onChange={handleTextChange}
            rows={18}
            className={`w-full bg-slate-950 p-4 rounded-xl border text-slate-200 focus:outline-none transition-all leading-relaxed ${
              isValidJson ? 'border-slate-800 focus:border-emerald-500/60' : 'border-red-500/60 text-red-200'
            }`}
            placeholder="Paste student profile JSON here..."
          />
        </div>
      </div>

    </div>
  );
}
