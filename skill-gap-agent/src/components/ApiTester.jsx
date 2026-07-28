import React, { useState } from 'react';
import { Terminal, Copy, Check, Send, Code, ShieldCheck } from 'lucide-react';

export default function ApiTester() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [testPayload, setTestPayload] = useState(JSON.stringify({
    "profile": {
      "education": {
        "degree": "B.Tech",
        "branch": "CSE",
        "cgpa": 8.1
      },
      "technical_skills": {
        "programming_languages": ["Java", "SQL", "Git"],
        "frameworks": [],
        "libraries": [],
        "databases": ["MySQL"],
        "tools": ["Git"],
        "cloud": [],
        "others": ["Problem Solving"]
      },
      "projects": [
        {
          "title": "College Portal",
          "tech_stack": ["Java", "SQL"]
        }
      ],
      "certifications": [],
      "internships": [],
      "work_experience": [],
      "achievements": [],
      "preferred_domain": "Software Development"
    },
    "target_company": "Zoho"
  }, null, 2));

  const [responseJson, setResponseJson] = useState(null);
  const [loading, setLoading] = useState(false);

  const curlSnippet = `curl -X POST http://localhost:5000/agent/skill-gap \\
  -H "Content-Type: application/json" \\
  -d '${testPayload.replace(/'/g, "'\\''")}'`;

  const fetchSnippet = `fetch('http://localhost:5000/agent/skill-gap', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(${testPayload})
})
.then(res => res.json())
.then(data => console.log(data));`;

  const pythonSnippet = `import requests

url = 'http://localhost:5000/agent/skill-gap'
payload = ${testPayload}

response = requests.post(url, json=payload)
print(response.json())`;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendLiveRequest = async () => {
    setLoading(true);
    setResponseJson(null);
    try {
      const res = await fetch('/agent/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: testPayload
      });
      const data = await res.json();
      setResponseJson(data);
    } catch (err) {
      setResponseJson({ error: "Failed to connect to agent endpoint: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Endpoint Spec Card */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ background: '#10b981', color: '#000', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
            POST
          </span>
          <code style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f3f4f6', fontFamily: 'var(--font-mono)' }}>
            /agent/skill-gap
          </code>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
          Official API endpoint for the <strong>Skill Gap Agent</strong> in the Placement Intelligence Multi-Agent System. Identifies skill gaps, computes readiness score (0-100), missing items, strengths, priority learning list, and summary.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#a5b4fc', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={14} /> Strict Output: JSON Only
          </span>
          <span style={{ fontSize: '0.8rem', color: '#67e8f9', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            ⚡ Response Time: &lt; 50ms
          </span>
        </div>
      </div>

      {/* Interactive Request & Response Live Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Request Input */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>Request JSON Body</h3>
            <button 
              className="btn-primary" 
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
              onClick={handleSendLiveRequest}
              disabled={loading}
            >
              <Send size={14} /> Send API Request
            </button>
          </div>
          <textarea 
            className="form-textarea code-font"
            rows={14}
            value={testPayload}
            onChange={(e) => setTestPayload(e.target.value)}
          />
        </div>

        {/* Response Output */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Agent Output JSON
          </h3>
          <div className="code-block" style={{ height: '320px', overflowY: 'auto' }}>
            {loading ? (
              <span style={{ color: 'var(--text-muted)' }}>Executing agent analysis...</span>
            ) : responseJson ? (
              JSON.stringify(responseJson, null, 2)
            ) : (
              <span style={{ color: 'var(--text-subtle)' }}>Click 'Send API Request' to test live output</span>
            )}
          </div>
        </div>

      </div>

      {/* Code Integration Snippets */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={18} color="#6366f1" /> Integration Code Snippets
        </h3>

        {/* cURL Snippet */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>cURL Command</span>
            <button 
              className="btn-secondary" 
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              onClick={() => copyToClipboard(curlSnippet, 'curl')}
            >
              {copiedKey === 'curl' ? <Check size={12} color="#10b981" /> : <Copy size={12} />} Copy
            </button>
          </div>
          <pre className="code-block">{curlSnippet}</pre>
        </div>

        {/* JavaScript Fetch Snippet */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>JavaScript (fetch)</span>
            <button 
              className="btn-secondary" 
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              onClick={() => copyToClipboard(fetchSnippet, 'fetch')}
            >
              {copiedKey === 'fetch' ? <Check size={12} color="#10b981" /> : <Copy size={12} />} Copy
            </button>
          </div>
          <pre className="code-block">{fetchSnippet}</pre>
        </div>

        {/* Python Snippet */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Python (requests)</span>
            <button 
              className="btn-secondary" 
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              onClick={() => copyToClipboard(pythonSnippet, 'python')}
            >
              {copiedKey === 'python' ? <Check size={12} color="#10b981" /> : <Copy size={12} />} Copy
            </button>
          </div>
          <pre className="code-block">{pythonSnippet}</pre>
        </div>

      </div>

    </div>
  );
}
