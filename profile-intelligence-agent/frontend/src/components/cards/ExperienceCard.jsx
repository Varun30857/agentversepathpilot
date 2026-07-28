import { Briefcase, Building, Calendar } from 'lucide-react'

export default function ExperienceCard({ data, darkMode }) {
  const expList = data?.experience || []
  const items = Array.isArray(expList) ? expList : [expList]

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Experience
          </h3>
          <p className="text-xs text-slate-400">Work History Timeline</p>
        </div>
      </div>

      {items.length > 0 && items[0] ? (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:to-amber-500">
          {items.map((exp, i) => {
            const company = typeof exp === 'object' ? (exp.company || exp.organization || 'Company') : exp
            const role = typeof exp === 'object' ? (exp.role || exp.title || 'Role') : ''
            const duration = typeof exp === 'object' ? (exp.duration || exp.period || '') : ''

            return (
              <div key={i} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-orange-400 border-2 border-dark-900 shadow-md shadow-orange-400/50" />

                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {company}
                  </h4>
                </div>

                {role && (
                  <p className={`text-sm mt-0.5 font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {role}
                  </p>
                )}

                {duration && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{duration}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-slate-500 text-sm italic">No work experience extracted</div>
      )}
    </div>
  )
}
