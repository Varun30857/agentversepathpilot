import React from 'react';
import { Trophy, Star, CheckCircle, Flame, Building2, Code, Layers, Award, Sparkles } from 'lucide-react';

export function CompanyRecommendations({ recommendationData }) {
  const recommendations = recommendationData?.company_recommendations || [];
  const bestCompany = recommendationData?.best_company || {};

  return (
    <div className="space-y-8">

      {/* Best Company Match Header Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border border-amber-500/40 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Trophy className="w-4 h-4 text-amber-400" />
                Top Overall Recommendation
              </span>
              <span className="text-xs text-slate-400 font-medium">Utility Agent Score</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              {bestCompany.company || "Evaluating..."}
              {bestCompany.match_percentage > 0 && (
                <span className="text-xl font-bold px-3 py-1 rounded-xl bg-amber-500 text-slate-950">
                  {bestCompany.match_percentage}% Match
                </span>
              )}
            </h2>

            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {bestCompany.reason}
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <Star className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Top 10 Ranked Companies Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Top 10 Company Matches
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked sequentially by highest calculated utility match percentage (0–100)
          </p>
        </div>

        <div className="text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-mono">
          Evaluating 20 Catalog Companies
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 gap-5">
        {recommendations.map((item, idx) => {
          const isTop1 = idx === 0;
          const matchColor =
            item.match_percentage >= 80
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
              : item.match_percentage >= 50
              ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
              : item.match_percentage >= 30
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
              : 'text-slate-400 bg-slate-800/40 border-slate-700/50';

          const progressBg =
            item.match_percentage >= 80
              ? 'from-emerald-500 to-teal-400'
              : item.match_percentage >= 50
              ? 'from-indigo-500 to-purple-500'
              : item.match_percentage >= 30
              ? 'from-amber-500 to-orange-500'
              : 'from-slate-600 to-slate-500';

          return (
            <div
              key={item.company || idx}
              className={`glass-card glass-card-hover rounded-2xl p-6 transition-all border ${
                isTop1
                  ? 'border-indigo-500/50 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800/80">
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black font-mono text-indigo-400 shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {item.company}
                      {isTop1 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Top Choice
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* Match Percentage Badge & Gauge Bar */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-32 md:w-44 bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full bg-gradient-to-r ${progressBg} transition-all duration-700 ease-out`}
                      style={{ width: `${item.match_percentage}%` }}
                    />
                  </div>

                  <span className={`px-3 py-1.5 rounded-xl text-sm font-extrabold border ${matchColor}`}>
                    {item.match_percentage}% Match
                  </span>
                </div>

              </div>

              {/* Analytical Reasons Bullet Points */}
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recommendation Analysis & Fit Rationale
                </h4>
                <ul className="space-y-1.5">
                  {item.reason && item.reason.map((r, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Profile Strengths Chips (Matching Skills, Projects, Certifications) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/60">
                
                {/* Matching Skills */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    Matching Skills ({item.matching_skills?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.matching_skills && item.matching_skills.length > 0 ? (
                      item.matching_skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-medium">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">None matched</span>
                    )}
                  </div>
                </div>

                {/* Matching Projects */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    Matching Projects ({item.matching_projects?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.matching_projects && item.matching_projects.length > 0 ? (
                      item.matching_projects.map((proj, pIdx) => (
                        <span key={pIdx} className="text-[10px] px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60 font-medium">
                          {proj}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">None matched</span>
                    )}
                  </div>
                </div>

                {/* Matching Certifications */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    Matching Certifications ({item.matching_certifications?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.matching_certifications && item.matching_certifications.length > 0 ? (
                      item.matching_certifications.map((cert, cIdx) => (
                        <span key={cIdx} className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-medium">
                          {cert}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">None matched</span>
                    )}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
