import React, { useState } from 'react';
import { PRESET_PROFILES } from '../data/presetProfiles';
import { FileJson, Sparkles, Check, AlertCircle, RefreshCw } from 'lucide-react';

export function ProfileEditor({ profileJsonString, onUpdateJson, activePreset, onLoadPreset }) {
  const [editorMode, setEditorMode] = useState('preset'); // 'preset' | 'raw_json'
  const [jsonText, setJsonText] = useState(profileJsonString);
  const [jsonError, setJsonError] = useState(null);

  const handleJsonChange = (e) => {
    const val = e.target.value;
    setJsonText(val);
    try {
      JSON.parse(val);
      setJsonError(null);
      onUpdateJson(val);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setJsonError(null);
      onUpdateJson(formatted);
    } catch (err) {
      setJsonError("Cannot format invalid JSON: " + err.message);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-2xl">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileJson className="w-5 h-5 text-indigo-400" />
            Input Student Profile Payload
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Structured candidate JSON evaluated by the Company Recommendation Agent
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setEditorMode('preset')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              editorMode === 'preset'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => {
              setEditorMode('raw_json');
              setJsonText(profileJsonString);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              editorMode === 'raw_json'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw JSON Editor
          </button>
        </div>
      </div>

      {/* Preset Selector View */}
      {editorMode === 'preset' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Select a candidate profile preset to evaluate company recommendation agent scoring:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESET_PROFILES.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => onLoadPreset(preset)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border-indigo-500 shadow-xl shadow-indigo-500/20'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {preset.name}
                      {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                    </h3>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {preset.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">{preset.subtitle}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {preset.profile.education?.degree && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {preset.profile.education.degree} ({preset.profile.education.cgpa} CGPA)
                      </span>
                    )}
                    {preset.profile.preferred_domain && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60">
                        Domain: {preset.profile.preferred_domain}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Raw JSON Editor View */}
      {editorMode === 'raw_json' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Input Profile JSON Payload
            </span>
            <button
              onClick={handleFormatJson}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Auto-Format JSON
            </button>
          </div>

          <textarea
            value={jsonText}
            onChange={handleJsonChange}
            rows={18}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono-code text-xs leading-relaxed focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Paste student profile JSON here..."
          />

          {jsonError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{jsonError}</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
