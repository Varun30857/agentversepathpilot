import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Upload, LayoutDashboard, Target, Map, MessageSquare,
  Sparkles, ChevronRight, Compass
} from 'lucide-react'

export default function Sidebar({ darkMode, activePage, setActivePage, sidebarOpen, setSidebarOpen, hasAnalysis }) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, desc: 'Landing Page' },
    { id: 'upload', label: 'Upload Resume', icon: Upload, desc: 'PDF Analyzer' },
    ...(hasAnalysis ? [{ id: 'analysis', label: 'Resume Dashboard', icon: LayoutDashboard, desc: 'ResumeSense AI' }] : []),
    { id: 'skillgap', label: 'Skill Gap Report', icon: Target, desc: 'SkillMap AI' },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map, desc: 'Career Plan' },
    { id: 'chat', label: 'AI Career Chat', icon: MessageSquare, desc: 'Personal Mentor' },
  ]

  const handleSelect = (id) => {
    setActivePage(id)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-64px)] w-64 p-4 flex flex-col transition-transform duration-300 border-r shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${darkMode
            ? 'bg-dark-900/95 border-white/10 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900'
          } backdrop-blur-xl`}
      >
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
          </div>
          <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>PathPilot AI Modules</p>
        </div>

        {/* Menu Items */}
        <div className="space-y-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left group
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                    ${isActive
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-slate-100 group-hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{item.label}</div>
                    <div className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-blue-400 translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
              </button>
            )
          })}
        </div>

        {/* AI Agent Status Box */}
        <div className={`p-3.5 rounded-xl border mt-auto ${darkMode ? 'bg-gradient-to-br from-violet-600/10 to-blue-600/10 border-violet-500/20' : 'bg-violet-50 border-violet-200'}`}>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>PathPilot AI Engine</span>
          </div>
          <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Powered by Groq & Llama 3.3 for real-time resume intelligence.
          </p>
        </div>
      </aside>
    </>
  )
}
