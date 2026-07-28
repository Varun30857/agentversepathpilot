import { User, Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function PersonalInfoCard({ data, darkMode }) {
  const name = data?.name || data?.candidate_name || 'Candidate Name'
  const email = data?.email || 'N/A'
  const phone = data?.phone || 'N/A'

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
          <User className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Personal Information
          </h3>
          <p className="text-xs text-slate-400">Candidate Profile</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-slate-500 font-medium mb-1">Full Name</div>
          <div className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            {name}
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-violet-400 shrink-0" />
            <span className={`text-sm truncate ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
