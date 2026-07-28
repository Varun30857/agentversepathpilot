import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Wrench, Layers, Award, Code, 
  TrendingUp, ShieldCheck, FileText, ChevronRight, Code2 
} from 'lucide-react';

export default function SkillGapReport({ reportData }) {
  const [activeView, setActiveView] = useState('visual'); // 'visual' or 'json'

  if (!reportData || !reportData.skill_gap) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Code size={48} color="#6366f1" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
        <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Awaiting Analysis Input</h3>
        <p style={{ fontSize: '0.9rem' }}>Select a target company or role and click <strong>Run Skill Gap Analysis</strong> to view results.</p>
      </div>
    );
  }

  const { skill_gap } = reportData;
  const score = skill_gap.readiness_score || 0;

  // Gauge color based on readiness score
  let scoreColor = '#10b981'; // green
  if (score < 50) scoreColor = '#ef4444'; // red
  else if (score < 80) scoreColor = '#f59e0b'; // amber

  // SVG Gauge calculations
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel fade-in" style={{ padding: '1.75rem' }}>
      
      {/* Top Header & View Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-secondary)', fontWeight: 700 }}>
            Placement Intelligence Analysis
          </span>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            Skill Gap Identification Report
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
          <button 
            className={`btn-secondary ${activeView === 'visual' ? 'active' : ''}`}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', background: activeView === 'visual' ? 'var(--accent-primary)' : 'transparent', color: activeView === 'visual' ? '#fff' : 'var(--text-muted)' }}
            onClick={() => setActiveView('visual')}
          >
            Visual Dashboard
          </button>
          <button 
            className={`btn-secondary ${activeView === 'json' ? 'active' : ''}`}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', background: activeView === 'json' ? 'var(--accent-primary)' : 'transparent', color: activeView === 'json' ? '#fff' : 'var(--text-muted)' }}
            onClick={() => setActiveView('json')}
          >
            <Code2 size={14} /> JSON Output
          </button>
        </div>
      </div>

      {activeView === 'json' ? (
        <div>
          <div className="code-block" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {JSON.stringify(reportData, null, 2)}
          </div>
        </div>
      ) : (
        <div>
          {/* Target & Score Summary Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.6))', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Target Benchmark</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0.2rem 0 0.5rem 0' }}>
                {skill_gap.target_company ? `Target Company: ${skill_gap.target_company}` : `Target Role: ${skill_gap.target_role}`}
              </h3>
              
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {skill_gap.summary}
              </p>
            </div>

            {/* Circular Readiness Score */}
            <div className="gauge-container">
              <svg className="gauge-svg" viewBox="0 0 140 140">
                <circle className="gauge-bg" cx="70" cy="70" r={radius} />
                <circle 
                  className="gauge-fill" 
                  cx="70" 
                  cy="70" 
                  r={radius} 
                  stroke={scoreColor}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="gauge-text">
                <div className="gauge-number" style={{ color: scoreColor }}>{score}</div>
                <div className="gauge-label">Readiness Score</div>
              </div>
            </div>
          </div>

          {/* Grid section for Matching vs Missing */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            
            {/* Matching Skills */}
            <div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.18)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <h4 style={{ color: '#34d399', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <CheckCircle2 size={18} /> Matching Skills ({skill_gap.matching_skills?.length || 0})
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skill_gap.matching_skills?.length > 0 ? (
                  skill_gap.matching_skills.map((skill, idx) => (
                    <span key={idx} className="skill-pill matching">
                      ✓ {skill}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>None detected</span>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.18)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <h4 style={{ color: '#f87171', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <XCircle size={18} /> Missing Skills ({skill_gap.missing_skills?.length || 0})
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skill_gap.missing_skills?.length > 0 ? (
                  skill_gap.missing_skills.map((skill, idx) => (
                    <span key={idx} className="skill-pill missing">
                      ✗ {skill}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.85rem', color: '#34d399' }}>All target skills matched!</span>
                )}
              </div>
            </div>

          </div>

          {/* Missing Categorized Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            
            {/* Missing Frameworks */}
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <Layers size={15} /> Missing Frameworks
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {skill_gap.missing_frameworks?.length > 0 ? (
                  skill_gap.missing_frameworks.map((fw, i) => (
                    <span key={i} className="skill-pill framework">{fw}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>None missing</span>
                )}
              </div>
            </div>

            {/* Missing Tools */}
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#67e8f9', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <Wrench size={15} /> Missing Tools
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {skill_gap.missing_tools?.length > 0 ? (
                  skill_gap.missing_tools.map((tool, i) => (
                    <span key={i} className="skill-pill tool">{tool}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>None missing</span>
                )}
              </div>
            </div>

            {/* Missing Certifications */}
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fcd34d', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <Award size={15} /> Missing Certifications
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {skill_gap.missing_certifications?.length > 0 ? (
                  skill_gap.missing_certifications.map((cert, i) => (
                    <span key={i} className="skill-pill cert">{cert}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>None missing</span>
                )}
              </div>
            </div>

            {/* Missing Project Experience */}
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <Code size={15} /> Missing Projects
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {skill_gap.missing_project_experience?.length > 0 ? (
                  skill_gap.missing_project_experience.map((proj, i) => (
                    <span key={i} className="skill-pill project">{proj}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>None missing</span>
                )}
              </div>
            </div>

          </div>

          {/* Student Strengths & Priority Learning Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            
            {/* Student Strengths */}
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ShieldCheck size={18} /> Highlighted Strengths
              </h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {skill_gap.strengths?.map((str, idx) => (
                  <li key={idx} style={{ fontSize: '0.875rem', color: 'var(--text-main)', padding: '0.4rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: '#6366f1', fontWeight: 'bold' }}>•</span> {str}
                  </li>
                ))}
              </ul>
            </div>

            {/* Priority Learning List */}
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <TrendingUp size={18} /> Priority Learning List
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {skill_gap.priority_learning?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ 
                      width: '22px', 
                      height: '22px', 
                      borderRadius: '50%', 
                      background: 'rgba(6, 182, 212, 0.2)', 
                      color: '#67e8f9', 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
