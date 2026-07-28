import React, { useState } from 'react';
import { User, Building2, Briefcase, FileCode2, Play, Sparkles, RefreshCw } from 'lucide-react';

const PRESET_PROFILES = {
  cs_senior: {
    name: "CS Senior Student (Java & Web)",
    data: {
      profile: {
        education: {
          degree: "B.Tech",
          branch: "Computer Science & Engineering",
          cgpa: 8.4
        },
        technical_skills: {
          programming_languages: ["Java", "SQL", "JavaScript", "C++"],
          frameworks: ["React", "Express.js"],
          libraries: ["HTML/CSS"],
          databases: ["MySQL"],
          tools: ["Git", "VS Code"],
          cloud: [],
          others: ["Data Structures", "OOPs", "REST APIs"]
        },
        projects: [
          {
            title: "Student Placement Portal",
            tech_stack: ["Java", "React", "MySQL"]
          }
        ],
        certifications: ["Java SE Fundamentals"],
        internships: [],
        work_experience: [],
        achievements: ["Hackathon Runner Up"],
        preferred_domain: "Software Development"
      },
      target_company: "Zoho"
    }
  },
  backend_asp: {
    name: "Backend Engineer Aspirant",
    data: {
      profile: {
        education: {
          degree: "B.E.",
          branch: "Information Technology",
          cgpa: 7.9
        },
        technical_skills: {
          programming_languages: ["Python", "SQL", "JavaScript"],
          frameworks: ["Django", "Node.js", "Express.js"],
          libraries: ["Pandas"],
          databases: ["PostgreSQL", "MongoDB"],
          tools: ["Git", "Docker", "Postman"],
          cloud: ["AWS"],
          others: ["REST API", "Database Design"]
        },
        projects: [
          {
            title: "E-Commerce Microservices Backend",
            tech_stack: ["Node.js", "Express.js", "MongoDB", "Docker"]
          }
        ],
        certifications: ["AWS Cloud Practitioner"],
        internships: [],
        work_experience: [],
        achievements: [],
        preferred_domain: "Backend Engineering"
      },
      target_role: "Backend Engineer"
    }
  },
  data_science: {
    name: "Data Science Aspirant",
    data: {
      profile: {
        education: {
          degree: "B.Tech",
          branch: "Artificial Intelligence & Data Science",
          cgpa: 8.8
        },
        technical_skills: {
          programming_languages: ["Python", "R", "SQL"],
          frameworks: ["Scikit-Learn", "Pandas", "NumPy", "TensorFlow"],
          libraries: ["Matplotlib", "Seaborn"],
          databases: ["PostgreSQL"],
          tools: ["Git", "Jupyter Notebooks"],
          cloud: [],
          others: ["Machine Learning", "Statistics"]
        },
        projects: [
          {
            title: "Customer Churn Prediction Model",
            tech_stack: ["Python", "Scikit-Learn", "Pandas"]
          }
        ],
        certifications: ["IBM Data Science Certificate"],
        internships: [],
        work_experience: [],
        achievements: [],
        preferred_domain: "Data Science"
      },
      target_role: "Data Scientist"
    }
  }
};

export default function ProfileEditor({ onAnalyze, loading, targets }) {
  const [targetType, setTargetType] = useState('company'); // 'company' or 'role'
  const [selectedCompany, setSelectedCompany] = useState('Zoho');
  const [selectedRole, setSelectedRole] = useState('Software Developer');
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(PRESET_PROFILES.cs_senior.data.profile, null, 2)
  );
  const [jsonError, setJsonError] = useState('');

  const handlePresetChange = (key) => {
    if (PRESET_PROFILES[key]) {
      const pData = PRESET_PROFILES[key].data;
      setJsonInput(JSON.stringify(pData.profile, null, 2));
      if (pData.target_company) {
        setTargetType('company');
        setSelectedCompany(pData.target_company);
      } else if (pData.target_role) {
        setTargetType('role');
        setSelectedRole(pData.target_role);
      }
    }
  };

  const handleRunAnalysis = () => {
    setJsonError('');
    try {
      const parsedProfile = JSON.parse(jsonInput);
      const payload = {
        profile: parsedProfile
      };
      if (targetType === 'company') {
        payload.target_company = selectedCompany;
      } else {
        payload.target_role = selectedRole;
      }
      onAnalyze(payload);
    } catch (e) {
      setJsonError('Invalid Profile JSON. Please check formatting & syntax.');
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={20} color="#6366f1" /> Candidate Profile & Target Input
        </h2>
        
        {/* Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#06b6d4" />
          <select 
            className="form-select" 
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            onChange={(e) => handlePresetChange(e.target.value)}
          >
            <option value="cs_senior">Preset: CS Senior Student (Java)</option>
            <option value="backend_asp">Preset: Backend Aspirant</option>
            <option value="data_science">Preset: Data Science Aspirant</option>
          </select>
        </div>
      </div>

      {/* Target Selector Bar */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
        <div className="form-label" style={{ marginBottom: '0.75rem' }}>Target Specification Mode</div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
            <input 
              type="radio" 
              name="targetType" 
              value="company" 
              checked={targetType === 'company'} 
              onChange={() => setTargetType('company')}
            />
            <Building2 size={16} color="#a5b4fc" /> Target Company
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
            <input 
              type="radio" 
              name="targetType" 
              value="role" 
              checked={targetType === 'role'} 
              onChange={() => setTargetType('role')}
            />
            <Briefcase size={16} color="#67e8f9" /> Target Job Role
          </label>
        </div>

        <div style={{ marginTop: '0.85rem' }}>
          {targetType === 'company' ? (
            <div>
              <label className="form-label">Select Company</label>
              <select 
                className="form-select" 
                value={selectedCompany} 
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                {targets?.companies?.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                )) || (
                  <>
                    <option value="Zoho">Zoho</option>
                    <option value="Google">Google</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="TCS">TCS</option>
                    <option value="Infosys">Infosys</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Swiggy">Swiggy</option>
                    <option value="Uber">Uber</option>
                    <option value="Atlassian">Atlassian</option>
                    <option value="Razorpay">Razorpay</option>
                  </>
                )}
              </select>
            </div>
          ) : (
            <div>
              <label className="form-label">Select Role</label>
              <select 
                className="form-select" 
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {targets?.roles?.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                )) || (
                  <>
                    <option value="Software Developer">Software Developer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Engineer">Data Engineer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="ML Engineer">ML Engineer</option>
                    <option value="Mobile App Developer">Mobile App Developer</option>
                  </>
                )}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* JSON Editor */}
      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="form-label" style={{ marginBottom: 0 }}>Structured Profile JSON</label>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>Profile Intelligence Schema</span>
        </div>

        <textarea 
          className="form-textarea code-font" 
          rows={14} 
          value={jsonInput} 
          onChange={(e) => setJsonInput(e.target.value)}
        />
        {jsonError && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: '600' }}>
            ⚠️ {jsonError}
          </div>
        )}
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={handleRunAnalysis}
        disabled={loading}
      >
        {loading ? (
          <>
            <RefreshCw size={18} className="spin" /> Analyzing Profile & Requirements...
          </>
        ) : (
          <>
            <Play size={18} /> Run Skill Gap Analysis
          </>
        )}
      </button>
    </div>
  );
}
