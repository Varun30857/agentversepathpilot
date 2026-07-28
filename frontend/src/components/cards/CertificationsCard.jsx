import { Award, CheckCircle2 } from 'lucide-react'

export default function CertificationsCard({ data, darkMode }) {
  const certsList = data?.certifications || []
  const items = Array.isArray(certsList) ? certsList : [certsList]

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center">
          <Award className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Certifications
          </h3>
          <p className="text-xs text-slate-400">Verified Credentials</p>
        </div>
      </div>

      {items.length > 0 && items[0] ? (
        <div className="space-y-3">
          {items.map((cert, i) => {
            const title = typeof cert === 'object' ? (cert.name || cert.title || 'Certification') : cert
            const issuer = typeof cert === 'object' ? cert.issuer : null

            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {title}
                  </div>
                  {issuer && <div className="text-xs text-slate-400">{issuer}</div>}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-slate-500 text-sm italic">No certifications listed</div>
      )}
    </div>
  )
}
