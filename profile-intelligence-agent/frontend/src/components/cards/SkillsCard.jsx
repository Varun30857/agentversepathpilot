import { Cpu, Code, Layers, Database, Wrench, Heart } from 'lucide-react'

export default function SkillsCard({ data, darkMode }) {
  const skills = data?.skills || data?.technical_skills || []
  const languages = data?.programming_languages || []
  const frameworks = data?.frameworks || []
  const databases = data?.databases || []
  const tools = data?.tools || []
  const softSkills = data?.soft_skills || []

  const categories = [
    { title: 'Technical Skills', items: skills, icon: Cpu, color: 'from-blue-600 to-cyan-500', text: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Languages', items: languages, icon: Code, color: 'from-violet-600 to-purple-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
    { title: 'Frameworks', items: frameworks, icon: Layers, color: 'from-cyan-600 to-teal-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { title: 'Databases', items: databases, icon: Database, color: 'from-emerald-600 to-green-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Tools', items: tools, icon: Wrench, color: 'from-orange-600 to-amber-500', text: 'text-orange-400', bg: 'bg-orange-500/10' },
    { title: 'Soft Skills', items: softSkills, icon: Heart, color: 'from-pink-600 to-rose-500', text: 'text-pink-400', bg: 'bg-pink-500/10' },
  ].filter(cat => cat.items && cat.items.length > 0)

  // Fallback if structured categories are empty
  const allSkills = categories.length > 0 ? null : (Array.isArray(skills) ? skills : [skills])

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Skills & Competencies
          </h3>
          <p className="text-xs text-slate-400">Extracted Tech Stack</p>
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="space-y-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-3.5 h-3.5 ${cat.text}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {cat.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`skill-chip ${darkMode ? 'bg-white/5 border border-white/10 text-slate-200' : 'bg-slate-100 border border-slate-200 text-slate-800'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {(allSkills || []).map((skill, i) => (
            <span
              key={i}
              className={`skill-chip ${darkMode ? 'bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-800'}`}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
