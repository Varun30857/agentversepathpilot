import { motion } from 'framer-motion'
import { ArrowRight, Compass, Sparkles, Upload, Zap, Shield, BarChart3, Target, Map, MessageSquare } from 'lucide-react'

const features = [
  { icon: Zap, label: 'ResumeSense AI', desc: 'Instant resume scoring & extraction', color: 'text-yellow-400' },
  { icon: Target, label: 'SkillMap AI', desc: 'Goal-based skill gap analysis', color: 'text-emerald-400' },
  { icon: MessageSquare, label: 'AI Career Chat', desc: 'Contextual AI career mentor', color: 'text-cyan-400' },
]

const floatingBadges = [
  { label: 'Python & FastAPI', color: 'from-blue-600 to-cyan-500', delay: 0 },
  { label: 'React & Tailwind', color: 'from-violet-600 to-pink-500', delay: 0.3 },
  { label: 'Llama 3.3 AI', color: 'from-emerald-600 to-teal-500', delay: 0.6 },
  { label: 'Skill Gap Roadmap', color: 'from-orange-600 to-red-500', delay: 0.9 },
]

export default function Hero({ darkMode, onGetStarted }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient dot-grid pt-16">
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-600/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-blue-300">PathPilot AI · Powered by Llama 3.3</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
            >
              <span className="text-white">PathPilot AI</span>
              <br />
              <span className="gradient-text">Career Readiness</span>
              <br />
              <span className="text-white">& Intelligence</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg"
            >
              Upload your PDF resume to unlock instant AI analysis with ResumeSense, align your skills to dream roles with SkillMap, and chat with your personal AI Career Mentor.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={onGetStarted}
                className="ripple-btn relative flex items-center gap-2.5 px-8 py-4 rounded-2xl
                  bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 text-white font-bold text-base
                  hover:from-blue-500 hover:to-cyan-400 transition-all duration-300
                  shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.03]
                  active:scale-[0.98] group"
              >
                <Upload className="w-5 h-5 group-hover:animate-bounce" />
                Upload Your Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/20 text-white font-semibold text-base
                  hover:bg-white/5 transition-all duration-200 backdrop-blur-sm"
              >
                API Documentation
              </a>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Icon className={`w-4 h-4 ${f.color}`} />
                    <div>
                      <div className="text-xs font-semibold text-white">{f.label}</div>
                      <div className="text-[10px] text-slate-400">{f.desc}</div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Column — AI Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Central Compass Icon */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-64 h-64 mx-auto"
              >
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/30 to-violet-600/30 blur-2xl animate-pulse-slow" />

                {/* Main Circle */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-blue-500/20 animate-glow">
                  {/* Rotating Ring */}
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-blue-500/30 animate-spin-slow" />
                  <div className="absolute inset-8 rounded-full border border-violet-500/30 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

                  {/* Compass Icon */}
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/40">
                    <Compass className="w-10 h-10 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-dark-900 animate-pulse" />
                  </div>
                </div>

                {/* Orbital Dots */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateX(110px) translateY(-50%)`,
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ delay: i * 0.3, duration: 1.8, repeat: Infinity }}
                  />
                ))}
              </motion.div>

              {/* Floating Skill Badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { delay: badge.delay + 0.8, duration: 0.4 },
                    scale: { delay: badge.delay + 0.8, duration: 0.4 },
                    y: { delay: badge.delay + 1.2, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className={`absolute px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold shadow-lg`}
                  style={{
                    top: `${[15, 75, 25, 65][i]}%`,
                    left: i % 2 === 0 ? '-10%' : '85%',
                  }}
                >
                  {badge.label}
                </motion.div>
              ))}

              {/* Scan Line */}
              <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
                style={{ top: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: 'ResumeSense', label: 'Model-Based Analysis' },
            { value: 'SkillMap', label: 'Goal-Based Roadmap' },
            { value: 'Llama 3.3', label: 'Groq AI Power' },
            { value: '24/7 Mentor', label: 'Interactive AI Chat' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
