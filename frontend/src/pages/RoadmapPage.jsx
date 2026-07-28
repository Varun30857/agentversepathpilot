import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Map, Loader2, CheckCircle2, Clock, Star, ExternalLink,
  ChevronDown, ChevronUp, Award, Briefcase, AlertCircle, Target
} from 'lucide-react'
import { analyzeSkillGap } from '../services/api'
import toast from 'react-hot-toast'

const TARGET_ROLES = [
  { id: 'Software Developer', icon: '💻' },
  { id: 'Full Stack Developer', icon: '🌐' },
  { id: 'Data Scientist', icon: '📊' },
  { id: 'AI Engineer', icon: '🤖' },
  { id: 'DevOps Engineer', icon: '⚙️' },
]

const PHASE_COLORS = [
  'from-blue-600 to-cyan-500',
  'from-violet-600 to-pink-500',
  'from-emerald-600 to-teal-500',
  'from-orange-600 to-red-500',
]

export default function RoadmapPage({ darkMode, analysisData }) {
  const [selectedRole, setSelectedRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [roadmapData, setRoadmapData] = useState(null)
  const [expandedPhase, setExpandedPhase] = useState(0)

  const currentSkills = analysisData?.skills || analysisData?.technical_skills || []

  const handleGenerate = async () => {
    if (!selectedRole) {
      toast.error('Please select a target role first')
      return
    }

    setLoading(true)
    try {
      const data = await analyzeSkillGap(currentSkills, selectedRole)
      setRoadmapData(data)
      setExpandedPhase(0)
      toast.success('Learning roadmap generated! 🗺️')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to generate roadmap.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 pb-16 px-4 lg:px-8 max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-500/30 mb-4">
          <Map className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300">Learning Roadmap</span>
        </div>
        <h1 className={`text-4xl font-black mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Your Career <span className="gradient-text">Roadmap</span>
        </h1>
        <p className={`text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Get a structured, phase-by-phase learning plan tailored to your target role with resource recommendations and project ideas.
        </p>
      </motion.div>

      {/* Role Selector & Generate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl p-6 mb-8 border ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}
      >
        <h2 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Choose Your Target Role
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {TARGET_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200
                ${selectedRole === role.id
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 scale-[1.02]'
                  : darkMode
                    ? 'border-white/10 text-slate-400 hover:border-emerald-500/50 hover:text-white'
                    : 'border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-slate-900'
                }`}
            >
              <span>{role.icon}</span>
              {role.id}
            </button>
          ))}
        </div>

        {!analysisData && (
          <div className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${darkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
            <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
            <p className="text-sm text-yellow-400">
              Upload your resume first for a personalized roadmap based on your current skills.
              Without a resume, we'll generate a general roadmap for the selected role.
            </p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!selectedRole || loading}
          className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300
            ${!selectedRole || loading
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-500/25 hover:scale-[1.01]'
            }`}
        >
          {loading
            ? <><Loader2 className="w-5 h-5 animate-spin" />Generating Roadmap...</>
            : <><Map className="w-5 h-5" />Generate My Roadmap</>
          }
        </button>
      </motion.div>

      {/* Roadmap Content */}
      <AnimatePresence>
        {roadmapData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary Banner */}
            <div className={`rounded-2xl p-5 border bg-gradient-to-r ${
              darkMode
                ? 'from-emerald-600/10 to-teal-600/10 border-emerald-500/20'
                : 'from-emerald-50 to-teal-50 border-emerald-200'
            }`}>
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black gradient-text">{roadmapData.readiness_score ?? 0}%</div>
                  <div className="text-xs text-slate-400">Current Readiness</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {roadmapData.estimated_total_time || 'N/A'}
                  </div>
                  <div className="text-xs text-slate-400">Estimated Time</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {(roadmapData.learning_roadmap || []).length}
                  </div>
                  <div className="text-xs text-slate-400">Learning Phases</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {(roadmapData.missing_skills || []).length}
                  </div>
                  <div className="text-xs text-slate-400">Skills to Gain</div>
                </div>
              </div>
            </div>

            {/* Phase Cards */}
            {(roadmapData.learning_roadmap || []).map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}
              >
                {/* Phase Header */}
                <button
                  onClick={() => setExpandedPhase(expandedPhase === i ? -1 : i)}
                  className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${PHASE_COLORS[i % PHASE_COLORS.length]} flex items-center justify-center text-white font-black text-lg shrink-0`}>
                    {phase.phase || i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {phase.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className={`flex items-center gap-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        {phase.duration}
                      </span>
                      {(phase.skills || []).length > 0 && (
                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {phase.skills.length} skill{phase.skills.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  {expandedPhase === i
                    ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  }
                </button>

                {/* Phase Body */}
                <AnimatePresence>
                  {expandedPhase === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={`px-5 pb-5 border-t ${darkMode ? 'border-white/10' : 'border-slate-100'}`}
                    >
                      <div className="pt-4 space-y-4">
                        {/* Skills */}
                        {(phase.skills || []).length > 0 && (
                          <div>
                            <p className={`text-xs font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Skills to Learn
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {phase.skills.map((s, j) => (
                                <span key={j} className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700'}`}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Resources */}
                        {(phase.resources || []).length > 0 && (
                          <div>
                            <p className={`text-xs font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Recommended Resources
                            </p>
                            <div className="space-y-2">
                              {phase.resources.map((res, j) => (
                                <a
                                  key={j}
                                  href={typeof res === 'object' ? res.url : '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100'}`}
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                    {typeof res === 'object' ? res.name : res}
                                  </span>
                                  {typeof res === 'object' && res.type && (
                                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-white/10 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                                      {res.type}
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Milestone */}
                        {phase.milestone && (
                          <div className={`flex items-start gap-2.5 p-3 rounded-xl ${darkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
                            <Star className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-yellow-400 mb-0.5">Phase Goal</div>
                              <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{phase.milestone}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Recommended Projects */}
            {(roadmapData.recommended_projects || []).length > 0 && (
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  🛠️ Recommended Portfolio Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {roadmapData.recommended_projects.map((proj, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                      <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{proj.title}</div>
                      <div className={`text-xs mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{proj.description}</div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(proj.skills_practiced || []).map((s, j) => (
                          <span key={j} className={`px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          <Clock className="w-3 h-3" />{proj.time_estimate}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          proj.difficulty === 'Beginner'
                            ? 'bg-green-500/20 text-green-400'
                            : proj.difficulty === 'Intermediate'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}>
                          {proj.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {(roadmapData.certifications_recommended || []).length > 0 && (
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border-yellow-500/20' : 'bg-amber-50 border-amber-200'}`}>
                <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  🏆 Recommended Certifications
                </h3>
                <div className="space-y-3">
                  {roadmapData.certifications_recommended.map((cert, i) => (
                    <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                      <Award className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cert.name}</div>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          {cert.provider && <span className="text-xs text-slate-400">by {cert.provider}</span>}
                          {cert.estimated_prep_time && (
                            <span className="text-xs text-slate-400">Prep: {cert.estimated_prep_time}</span>
                          )}
                          {cert.difficulty && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              cert.difficulty === 'Beginner'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {cert.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
