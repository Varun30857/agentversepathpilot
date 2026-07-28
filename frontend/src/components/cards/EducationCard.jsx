import { GraduationCap, Calendar, Award } from 'lucide-react'

export default function EducationCard({ data, darkMode }) {
  const educationList = data?.education || []
  const items = Array.isArray(educationList) ? educationList : [educationList]

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Education
          </h3>
          <p className="text-xs text-slate-400">Academic Background</p>
        </div>
      </div>

      {items.length > 0 && items[0] ? (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:to-violet-500">
          {items.map((edu, i) => {
            const degree = typeof edu === 'object' ? (edu.degree || edu.title || 'Degree') : edu
            const college = typeof edu === 'object' ? (edu.college || edu.institution || edu.school || '') : ''
            const cgpa = typeof edu === 'object' ? (edu.cgpa || edu.gpa || '') : ''

            return (
              <div key={i} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-dark-900 shadow-md shadow-cyan-400/50" />

                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {degree}
                </h4>

                {college && (
                  <p className={`text-sm mt-0.5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {college}
                  </p>
                )}

                {cgpa && (
                  <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    GPA / Score: {cgpa}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-slate-500 text-sm italic">No education details extracted</div>
      )}
    </div>
  )
}
