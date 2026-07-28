import { motion } from 'framer-motion'
import { ArrowLeft, Target, MessageSquare, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'
import PersonalInfoCard from './cards/PersonalInfoCard'
import SkillsCard from './cards/SkillsCard'
import EducationCard from './cards/EducationCard'
import ProjectsCard from './cards/ProjectsCard'
import ExperienceCard from './cards/ExperienceCard'
import CertificationsCard from './cards/CertificationsCard'
import SkillsChart from './charts/SkillsChart'
import ExperienceChart from './charts/ExperienceChart'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function AnalysisDashboard({ data, darkMode, onReset, onNavigateToSkillGap, onNavigateToChat }) {
  const name = data?.candidate_name || data?.name || 'Candidate'
  const score = data?.resume_score || data?.score || null

  return (
    <div className="px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 pb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={onReset}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all
                ${darkMode ? 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10' : 'text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200'}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>/ ResumeSense AI Analysis</span>
          </div>
          <h1 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Resume Analysis Report
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            AI-powered insights for <span className="text-blue-400 font-semibold">{name}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {score !== null && (
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30">
              <div className="text-2xl font-black gradient-text">{score}</div>
              <div>
                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>/ 100</div>
                <div className="text-[10px] text-slate-400">Resume Score</div>
              </div>
            </div>
          )}

          {onNavigateToSkillGap && (
            <button
              onClick={onNavigateToSkillGap}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              <Target className="w-4 h-4" />
              Skill Gap Report
            </button>
          )}

          {onNavigateToChat && (
            <button
              onClick={onNavigateToChat}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Ask AI Mentor
            </button>
          )}
        </div>
      </motion.div>

      {/* Card Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-12"
      >
        <motion.div variants={itemVariants} className="md:col-span-2 xl:col-span-1">
          <PersonalInfoCard data={data} darkMode={darkMode} />
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-2">
          <SkillsCard data={data} darkMode={darkMode} />
        </motion.div>

        <motion.div variants={itemVariants} className="xl:col-span-2">
          <EducationCard data={data} darkMode={darkMode} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ExperienceCard data={data} darkMode={darkMode} />
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-2">
          <ProjectsCard data={data} darkMode={darkMode} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CertificationsCard data={data} darkMode={darkMode} />
        </motion.div>

        {/* Strengths and Weaknesses */}
        {(data?.strengths || data?.weaknesses) && (
          <motion.div variants={itemVariants} className="md:col-span-2 xl:col-span-3">
            <StrengthsWeaknessesCard data={data} darkMode={darkMode} />
          </motion.div>
        )}

        {/* Charts Row */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <SkillsChart data={data} darkMode={darkMode} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ExperienceChart data={data} darkMode={darkMode} />
        </motion.div>

        {/* Improvement Suggestions */}
        {(data?.improvement_suggestions || data?.suggestions) && (
          <motion.div variants={itemVariants} className="md:col-span-2 xl:col-span-3">
            <SuggestionsCard data={data} darkMode={darkMode} />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function StrengthsWeaknessesCard({ data, darkMode }) {
  const strengths = data?.strengths || []
  const weaknesses = data?.weaknesses || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Strengths */}
      <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Candidate Strengths
          </h3>
        </div>
        <ul className="space-y-2.5">
          {strengths.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-1 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Areas for Growth
          </h3>
        </div>
        <ul className="space-y-2.5">
          {weaknesses.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SuggestionsCard({ data, darkMode }) {
  const suggestions = data?.improvement_suggestions || data?.suggestions || []
  const items = Array.isArray(suggestions) ? suggestions : [suggestions]

  return (
    <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Actionable Improvement Suggestions
        </h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((s, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{s}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
