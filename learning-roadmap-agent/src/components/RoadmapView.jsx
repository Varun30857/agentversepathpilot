import React, { useState } from 'react';
import { Calendar, CheckSquare, Code, ExternalLink, GraduationCap, Layers, Flag, Search, Sparkles, BookOpen, Clock, Target } from 'lucide-react';

export function RoadmapView({ roadmapData, studentDomain, studyHours }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [completedTasks, setCompletedTasks] = useState({});

  const roadmap = roadmapData?.learning_roadmap || { duration: "8 Weeks", weeks: [] };
  const weeks = roadmap.weeks || [];

  // Toggle task completion checkmark
  const toggleTask = (weekNum, taskIdx) => {
    const key = `${weekNum}-${taskIdx}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calculate completion statistics
  let totalTasksCount = 0;
  let completedCount = 0;

  weeks.forEach(w => {
    (w.tasks || []).forEach((_, idx) => {
      totalTasksCount++;
      if (completedTasks[`${w.week}-${idx}`]) {
        completedCount++;
      }
    });
  });

  const completionPercentage = totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : 0;

  // Filter weeks by search or tab selection
  const filteredWeeks = weeks.filter(w => {
    if (selectedWeek !== 'all' && w.week !== Number(selectedWeek)) {
      return false;
    }
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const matchesGoal = w.goal.toLowerCase().includes(q);
    const matchesTopics = (w.topics || []).some(t => t.toLowerCase().includes(q));
    const matchesTasks = (w.tasks || []).some(t => t.toLowerCase().includes(q));
    return matchesGoal || matchesTopics || matchesTasks;
  });

  const getResourceTypeBadge = (type) => {
    switch (type) {
      case 'Documentation':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Practice Platform':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Course':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'YouTube':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Metrics Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Personalized {roadmap.duration} Curriculum
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Domain: {studentDomain || 'Software Development'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Goal-Based Personalized Learning Roadmap
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Progressive week-by-week learning curriculum designed to build technical depth, algorithms mastery, and project execution based on your target domain and daily commitment.
            </p>
          </div>

          {/* Quick Metrics & Completion Progress */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1 justify-center">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Duration
              </div>
              <div className="text-lg font-bold text-white mt-0.5 font-mono">{roadmap.duration}</div>
            </div>

            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1 justify-center">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Daily Target
              </div>
              <div className="text-lg font-bold text-white mt-0.5 font-mono">{studyHours || 2} Hours/Day</div>
            </div>

            <div className="text-center px-3">
              <div className="text-xs text-slate-400 flex items-center gap-1 justify-center">
                <Target className="w-3.5 h-3.5 text-teal-400" />
                Progress
              </div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5 font-mono">
                {completionPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-4">
          <div className="flex-1 bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
            {completedCount} of {totalTasksCount} tasks completed
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Week Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedWeek === 'all'
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            All Weeks ({weeks.length})
          </button>
          {weeks.map((w) => (
            <button
              key={w.week}
              onClick={() => setSelectedWeek(w.week.toString())}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedWeek === w.week.toString()
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              Week {w.week}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search topics, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Week Cards List */}
      <div className="space-y-6">
        {filteredWeeks.length === 0 ? (
          <div className="glass-panel p-8 text-center rounded-2xl border border-slate-800 text-slate-400">
            No roadmap weeks match your search criteria.
          </div>
        ) : (
          filteredWeeks.map((weekItem) => (
            <div
              key={weekItem.week}
              className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-slate-700/80 transition-all shadow-xl space-y-5"
            >
              
              {/* Week Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-extrabold text-sm flex items-center justify-center shadow-inner">
                    W{weekItem.week}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Week {weekItem.week} Goal
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {weekItem.goal}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                    {studyHours || 2} Hours/Day
                  </span>
                </div>
              </div>

              {/* Topics to Learn */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  Topics To Learn
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(weekItem.topics || []).map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid: Practical Tasks & Coding Practice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Practical Tasks */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                    Practical Action Tasks
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {(weekItem.tasks || []).map((task, idx) => {
                      const key = `${weekItem.week}-${idx}`;
                      const isDone = !!completedTasks[key];

                      return (
                        <li
                          key={idx}
                          onClick={() => toggleTask(weekItem.week, idx)}
                          className={`flex items-start gap-2.5 p-2 rounded-lg transition-all cursor-pointer ${
                            isDone ? 'bg-emerald-950/20 text-slate-400 line-through' : 'hover:bg-slate-900 text-slate-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}}
                            className="mt-0.5 accent-emerald-500 rounded cursor-pointer"
                          />
                          <span className="leading-snug">{task}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Coding Practice & Mini Project */}
                <div className="space-y-4">
                  
                  {/* Coding Practice */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      Coding Practice
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      {weekItem.coding_practice}
                    </p>
                  </div>

                  {/* Mini Project (if applicable) */}
                  {weekItem.mini_project && (
                    <div className="bg-gradient-to-r from-emerald-950/30 to-teal-950/30 p-4 rounded-xl border border-emerald-500/20">
                      <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Weekly Mini Project
                      </h4>
                      <p className="text-xs font-semibold text-white">
                        {weekItem.mini_project}
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* Free Learning Resources */}
              {(weekItem.resources || []).length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    Free Learning Resources
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {weekItem.resources.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getResourceTypeBadge(res.type)}`}>
                            {res.type}
                          </span>
                          <span className="text-xs text-slate-200 font-medium truncate group-hover:text-emerald-400 transition-colors">
                            {res.title}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Milestone */}
              {weekItem.milestone && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Flag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Weekly Milestone Target
                    </span>
                    <p className="text-xs font-medium text-slate-200">
                      {weekItem.milestone}
                    </p>
                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}
