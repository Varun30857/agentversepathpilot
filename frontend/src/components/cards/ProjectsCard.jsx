import { FolderGit2, Code2, ExternalLink } from 'lucide-react'

export default function ProjectsCard({ data, darkMode }) {
  const projectsList = data?.projects || []
  const items = Array.isArray(projectsList) ? projectsList : [projectsList]

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
          <FolderGit2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Projects
          </h3>
          <p className="text-xs text-slate-400">Featured Technical Work</p>
        </div>
      </div>

      {items.length > 0 && items[0] ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((proj, i) => {
            const title = typeof proj === 'object' ? (proj.title || proj.name || 'Project') : proj
            const tech = typeof proj === 'object' ? (proj.technologies || proj.tech || proj.skills || []) : []
            const desc = typeof proj === 'object' ? proj.description : null

            return (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01] ${
                  darkMode
                    ? 'bg-white/5 border-white/10 hover:border-emerald-500/40'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {title}
                  </h4>
                  <Code2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                </div>

                {desc && (
                  <p className={`text-xs mb-3 line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {desc}
                  </p>
                )}

                {Array.isArray(tech) && tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-slate-500 text-sm italic">No projects extracted</div>
      )}
    </div>
  )
}
