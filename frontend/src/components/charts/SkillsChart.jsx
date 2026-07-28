import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { BarChart3 } from 'lucide-react'

export default function SkillsChart({ data, darkMode }) {
  const skills = data?.skills || data?.technical_skills || []
  const languages = data?.programming_languages || []
  const frameworks = data?.frameworks || []
  const databases = data?.databases || []
  const tools = data?.tools || []

  const chartData = [
    { category: 'Languages', count: Array.isArray(languages) ? languages.length : 3 },
    { category: 'Frameworks', count: Array.isArray(frameworks) ? frameworks.length : 4 },
    { category: 'Databases', count: Array.isArray(databases) ? databases.length : 2 },
    { category: 'Tools', count: Array.isArray(tools) ? tools.length : 5 },
    { category: 'Core Skills', count: Array.isArray(skills) ? Math.min(skills.length, 8) : 6 },
  ]

  const colors = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B']

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Skills Distribution
          </h3>
          <p className="text-xs text-slate-400">Category breakdown chart</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="category" stroke={darkMode ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} />
            <YAxis stroke={darkMode ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0',
                borderRadius: '12px',
                color: darkMode ? '#FFFFFF' : '#0F172A',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
