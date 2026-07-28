import { Brain, Heart, Zap } from 'lucide-react'

export default function Footer({ darkMode }) {
  return (
    <footer className={`border-t py-8 px-4 lg:px-8 transition-colors ${
      darkMode ? 'bg-dark-950/80 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-white" />
          </div>
          <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Profile Intelligence Agent
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for
          <span className="font-bold text-blue-400">AgentVerse Hackathon 2026</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>Powered by Gemini AI</span>
        </div>
      </div>
    </footer>
  )
}
