import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { PieChart as PieIcon } from 'lucide-react'

export default function ExperienceChart({ data, darkMode }) {
  const exp = data?.experience || []
  const projects = data?.projects || []
  const edu = data?.education || []

  const chartData = [
    { name: 'Work Exp', value: Array.isArray(exp) ? Math.max(exp.length, 1) : 1 },
    { name: 'Projects', value: Array.isArray(projects) ? Math.max(projects.length, 1) : 1 },
    { name: 'Education', value: Array.isArray(edu) ? Math.max(edu.length, 1) : 1 },
  ]

  const COLORS = ['#7C3AED', '#06B6D4', '#2563EB']

  return (
    <div className={`card h-full ${darkMode ? 'glass-dark border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
          <PieIcon className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className={`font-bold text-lg leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Profile Overview
          </h3>
          <p className="text-xs text-slate-400">Experience & Portfolio Ratio</p>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0',
                borderRadius: '12px',
                color: darkMode ? '#FFFFFF' : '#0F172A',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-4 text-xs mt-2">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
