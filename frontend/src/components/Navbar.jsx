import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass, Sun, Moon, Menu, X, Zap, Home, Upload, Target, Map, MessageSquare, User, LayoutDashboard
} from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode, activePage, setActivePage, sidebarOpen, setSidebarOpen, onReset, hasAnalysis }) {
  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload Resume', icon: Upload },
    ...(hasAnalysis ? [{ id: 'analysis', label: 'Dashboard', icon: LayoutDashboard }] : []),
    { id: 'skillgap', label: 'Skill Gap', icon: Target },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  ]

  const handleNavClick = (id) => {
    if (id === 'home') {
      onReset()
    } else {
      setActivePage(id)
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 lg:px-6
        ${darkMode
          ? 'bg-dark-900/80 border-b border-white/10'
          : 'bg-white/80 border-b border-slate-200'
        } backdrop-blur-xl`}
    >
      {/* Logo */}
      <button
        onClick={onReset}
        className="flex items-center gap-2.5 mr-8 group text-left"
      >
        <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
          <Compass className="w-5 h-5 text-white" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-dark-900 animate-pulse" />
        </div>
        <div className="hidden sm:block">
          <div className="text-sm font-black leading-tight gradient-text">PathPilot AI</div>
          <div className={`text-[10px] font-medium leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Career Intelligence Agent
          </div>
        </div>
      </button>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-1 flex-1">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = activePage === link.id
          return (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                ${isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </button>
          )
        })}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs font-semibold text-blue-300">PathPilot v2.0</span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
            ${darkMode
              ? 'bg-white/5 hover:bg-white/10 text-slate-300'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
        >
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun className="w-[18px] h-[18px]" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon className="w-[18px] h-[18px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg">
          <User className="w-4 h-4 text-white" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
            ${darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
        >
          {sidebarOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </motion.nav>
  )
}
