import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, TrendingUp, AlertCircle, CheckCircle2, BookOpen,
  Loader2, ChevronRight, Zap, Star, Award, BarChart3
} from 'lucide-react'
import { analyzeSkillGap } from '../services/api'
import toast from 'react-hot-toast'

const TARGET_ROLES = [
  { id: 'Software Developer', icon: '💻', color: 'from-blue-600 to-cyan-500' },
  { id: 'Full Stack Developer', icon: '🌐', color: 'from-violet-600 to-pink-500' },
  { id: 'Data Scientist', icon: '📊', color: 'from-emerald-600 to-teal-500' },
  { id: 'AI Engineer', icon: '🤖', color: 'from-orange-600 to-red-500' },
  { id: 'DevOps Engineer', icon: '⚙️', color: 'from-slate-600 to-blue-600' },
]

const PRIORITY_COLORS = {
  High: 'text-red-400 bg-red-500/10 border-red-500/30',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  Low: 'text-green-400 bg-green-500/10 border-green-500/30',
}

export default function SkillGapPage({ darkMode, analysisData }) {
  const [selectedRole, setSelectedRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [gapData, setGapData] = useState(null)

  const currentSkills = analysisData?.skills || analysisData?.technical_skills || []

  const handleAnalyze = async () => {
    if (!selectedRole) {
      toast.error('Please select a target role first')
      return
    }
    if (!analysisData) {
      toast.error('Please upload and analyze your resume first')
      return
    }

    setLoading(true)
    try {
      const data = await analyzeSkillGap(currentSkills, selectedRole)
      setGapData(data)
      toast.success('Skill gap analysis complete! 🎯')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 pb-16 px-4 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/10 border border-violet-500/30 mb-4">
          <Target className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">SkillMap AI Agent</span>
        </div>
        <h1 className={`text-4xl font-black mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Skill Gap <span className="gradient-text">Analysis</span>
        </h1>
        <p className={`text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Select your target role and let PathPilot AI compare your current skills with industry requirements to build your personalized learning roadmap.
        </p>
      </motion.div>

      {/* Role Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl p-6 mb-6 border ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}
      >
        <h2 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          🎯 Select Your Target Role
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {TARGET_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`relative p-4 rounded-xl border-2 text-center transition-all duration-200 group
                ${selectedRole === role.id
                  ? 'border-violet-500 bg-violet-600/10 scale-[1.02]'
                  : darkMode
                    ? 'border-white/10 hover:border-violet-500/50 hover:bg-white/5'
                    : 'border-slate-200 hover:border-violet-400 hover:bg-violet-50'
                }`}
            >
              <div className="text-2xl mb-2">{role.icon}</div>
              <div className={`text-xs font-semibold leading-tight ${darkMode ? 'text-white' : 'text-slate-700'}`}>
                {role.id}
              </div>
              {selectedRole === role.id && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Current Skills Preview */}
        {analysisData && currentSkills.length > 0 && (
          <div className="mb-5">
            <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Your current skills ({currentSkills.length} detected):
            </p>
            <div className="flex flex-wrap gap-2">
              {currentSkills.slice(0, 20).map((skill, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border
                    ${darkMode ? 'bg-blue-600/10 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'}`}
                >
                  {skill}
                </span>
              ))}
              {currentSkills.length > 20 && (
                <span className="text-xs text-slate-400 flex items-center">+{currentSkills.length - 20} more</span>
              )}
            </div>
          </div>
        )}

        {!analysisData && (
          <div className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${darkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
            <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
            <p className="text-sm text-yellow-400">Upload and analyze your resume first to get personalized skill gap analysis.</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!selectedRole || loading}
          className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300
            ${!selectedRole || loading
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:from-violet-500 hover:to-pink-500 shadow-xl shadow-violet-500/25 hover:scale-[1.01]'
            }`}
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" />Analyzing Skills...</>
          ) : (
            <><Target className="w-5 h-5" />Analyze Skill Gap</>
          )}
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {gapData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ScoreCard
                label="Readiness Score"
                value={`${gapData.readiness_score ?? 0}%`}
                icon={<BarChart3 className="w-6 h-6" />}
                color="from-blue-600 to-cyan-500"
                darkMode={darkMode}
              />
              <ScoreCard
                label="Skill Gap"
                value={`${gapData.skill_gap_percentage ?? 0}%`}
                icon={<AlertCircle className="w-6 h-6" />}
                color="from-red-500 to-orange-500"
                darkMode={darkMode}
              />
              <ScoreCard
                label="Skills Matched"
                value={`${(gapData.current_skills_matched || []).length}/${(gapData.required_skills_for_role || []).length}`}
                icon={<CheckCircle2 className="w-6 h-6" />}
                color="from-green-500 to-emerald-500"
                darkMode={darkMode}
              />
            </div>

            {/* Readiness Bar */}
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                📊 Role Readiness: {gapData.target_role}
              </h3>
              <div className={`h-4 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-slate-100'} mb-2`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${gapData.readiness_score ?? 0}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0%</span>
                <span className="font-semibold text-violet-400">{gapData.readiness_score ?? 0}% Ready</span>
                <span>100%</span>
              </div>
            </div>

            {/* Missing Skills */}
            {(gapData.missing_skills || []).length > 0 && (
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  🚀 Missing Skills to Learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(gapData.missing_skills || []).map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div className={`px-2 py-0.5 rounded-full text-xs font-bold border ${PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.Medium}`}>
                        {item.priority}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>{item.skill}</div>
                        <div className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.why_needed}</div>
                        {item.category && (
                          <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${darkMode ? 'bg-white/10 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                            {item.category}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Roadmap Preview */}
            {(gapData.learning_roadmap || []).length > 0 && (
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className={`font-bold text-lg mb-5 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  🗺️ Your Learning Roadmap
                </h3>
                <div className="space-y-4">
                  {(gapData.learning_roadmap || []).map((phase, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {phase.phase || i + 1}
                        </div>
                        {i < (gapData.learning_roadmap.length - 1) && (
                          <div className="w-0.5 h-full bg-gradient-to-b from-violet-600/50 to-transparent mt-2" />
                        )}
                      </div>
                      <div className={`flex-1 pb-4 ${i < gapData.learning_roadmap.length - 1 ? 'border-b border-white/5' : ''}`}>
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                              {phase.title}
                            </h4>
                            <div className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              ⏱ {phase.duration}
                            </div>
                          </div>
                        </div>
                        {phase.skills && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {phase.skills.map((s, j) => (
                              <span key={j} className={`px-2 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-violet-600/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {phase.milestone && (
                          <div className={`mt-2 flex items-start gap-1.5 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            <Star className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0" />
                            <span>{phase.milestone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Search Tips */}
            {(gapData.job_search_tips || []).length > 0 && (
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  💼 Job Search Tips
                </h3>
                <ul className="space-y-2.5">
                  {(gapData.job_search_tips || []).map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScoreCard({ label, value, icon, color, darkMode }) {
  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <div className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>{value}</div>
      <div className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
    </div>
  )
}
