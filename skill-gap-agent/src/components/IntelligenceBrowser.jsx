import React, { useState } from 'react';
import { Building2, Briefcase, CheckCircle, Code, Layers, Wrench, Award } from 'lucide-react';

export default function IntelligenceBrowser({ targets }) {
  const [activeTab, setActiveTab] = useState('companies'); // 'companies' or 'roles'
  const [selectedKey, setSelectedKey] = useState(targets?.companies?.[0]?.name || 'Zoho');

  const companiesList = targets?.companies || [];
  const rolesList = targets?.roles || [];

  const currentItem = activeTab === 'companies' 
    ? companiesList.find(c => c.name.toLowerCase() === selectedKey.toLowerCase())?.reqs
    : rolesList.find(r => r.name.toLowerCase() === selectedKey.toLowerCase())?.reqs;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Category Toggle Header */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Placement Intelligence Matrix
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Inspect standard target baseline expectations used by the Skill Gap Agent.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn-secondary ${activeTab === 'companies' ? 'active' : ''}`}
            style={{ background: activeTab === 'companies' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'companies' ? '#fff' : 'var(--text-muted)' }}
            onClick={() => {
              setActiveTab('companies');
              setSelectedKey(companiesList[0]?.name || 'Zoho');
            }}
          >
            <Building2 size={16} /> Target Companies ({companiesList.length})
          </button>
          <button 
            className={`btn-secondary ${activeTab === 'roles' ? 'active' : ''}`}
            style={{ background: activeTab === 'roles' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'roles' ? '#fff' : 'var(--text-muted)' }}
            onClick={() => {
              setActiveTab('roles');
              setSelectedKey(rolesList[0]?.name || 'Software Developer');
            }}
          >
            <Briefcase size={16} /> Target Job Roles ({rolesList.length})
          </button>
        </div>
      </div>

      {/* Main Grid: Selector Sidebar & Requirements View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: '1.5rem' }}>
        
        {/* Item List Sidebar */}
        <div className="glass-panel" style={{ padding: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: '0.75rem' }}>
            {activeTab === 'companies' ? 'Select Company' : 'Select Role'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {(activeTab === 'companies' ? companiesList : rolesList).map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedKey(item.name)}
                style={{
                  background: selectedKey.toLowerCase() === item.name.toLowerCase() ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  border: '1px solid',
                  borderColor: selectedKey.toLowerCase() === item.name.toLowerCase() ? 'var(--accent-primary)' : 'transparent',
                  color: selectedKey.toLowerCase() === item.name.toLowerCase() ? '#ffffff' : 'var(--text-muted)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{item.name}</span>
                {selectedKey.toLowerCase() === item.name.toLowerCase() && (
                  <CheckCircle size={14} color="#a5b4fc" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Requirements Panel */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          {currentItem ? (
            <div>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-secondary)' }}>
                  Benchmark Specification
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  {currentItem.name}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Minimum Academic CGPA: <strong style={{ color: '#34d399' }}>{currentItem.min_cgpa} / 10.0</strong>
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                
                {/* Languages */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Code size={16} /> Required Languages
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {currentItem.required_languages?.map((l, i) => (
                      <span key={i} className="skill-pill framework">{l}</span>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#67e8f9', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Layers size={16} /> Required Frameworks
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {currentItem.required_frameworks?.map((fw, i) => (
                      <span key={i} className="skill-pill tool">{fw}</span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fcd34d', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Wrench size={16} /> Required Tools
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {currentItem.required_tools?.map((t, i) => (
                      <span key={i} className="skill-pill cert">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Award size={16} /> Expected Certifications
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {currentItem.required_certifications?.map((c, i) => (
                      <span key={i} className="skill-pill project">{c}</span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Core Focus & Expected Projects */}
              <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    Core Concepts & Focus
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {currentItem.core_focus?.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    Expected Project Types
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {currentItem.required_project_types?.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>Select an item to view intelligence specs</div>
          )}
        </div>

      </div>

    </div>
  );
}
