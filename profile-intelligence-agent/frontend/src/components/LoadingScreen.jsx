import { motion } from 'framer-motion'
import { Brain, Scan, Zap } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900/95 backdrop-blur-xl"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Main Animation */}
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="w-40 h-40 rounded-full border-2 border-dashed border-blue-500/40"
        />
        {/* Inner rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-violet-500/40"
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/40"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
        </div>

        {/* Scanning dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/60" />
        </motion.div>

        {/* Scan line */}
        <motion.div
          animate={{ y: ['-50%', '50%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute inset-8 overflow-hidden rounded-full"
        >
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <h3 className="text-2xl font-black text-white mb-2">Analyzing Your Resume</h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          Gemini AI is extracting insights, skills, and career data...
        </p>

        {/* Animated steps */}
        <div className="mt-8 flex flex-col gap-3">
          {[
            { icon: Scan, label: 'Parsing PDF document', delay: 0 },
            { icon: Brain, label: 'Extracting information with AI', delay: 0.8 },
            { icon: Zap, label: 'Generating career insights', delay: 1.6 },
          ].map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ delay: step.delay, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 max-w-xs mx-auto"
              >
                <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-sm text-slate-300">{step.label}</span>
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: step.delay + 0.5, duration: 1, repeat: Infinity }}
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"
                />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
