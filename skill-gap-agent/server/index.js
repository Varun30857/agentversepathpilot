import express from 'express';
import cors from 'cors';
import { analyzeSkillGap } from './skillGapEngine.js';
import { COMPANY_REQUIREMENTS, ROLE_REQUIREMENTS } from './knowledgeBase.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '10mb' }));

/**
 * CORE AGENT ENDPOINT
 * POST /agent/skill-gap
 * 
 * Rules:
 * - Return ONLY valid JSON
 * - Do not fabricate information
 * - Readiness score must be integer between 0 and 100
 */
app.post('/agent/skill-gap', (req, res) => {
  try {
    const input = req.body;

    if (!input || typeof input !== 'object') {
      return res.status(400).json({
        error: "Invalid request payload. Expected JSON object with 'profile' and either 'target_company' or 'target_role'."
      });
    }

    const result = analyzeSkillGap(input);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error analyzing skill gap:", err);
    return res.status(500).json({
      error: "Internal agent error during skill gap analysis."
    });
  }
});

/**
 * METADATA & KNOWLEDGE BASE ENDPOINTS FOR FRONTEND UI
 */
app.get('/api/targets', (req, res) => {
  res.json({
    companies: Object.values(COMPANY_REQUIREMENTS).map(c => ({ id: c.name.toLowerCase(), name: c.name, reqs: c })),
    roles: Object.values(ROLE_REQUIREMENTS).map(r => ({ id: r.name.toLowerCase(), name: r.name, reqs: r }))
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'online', agent: 'Skill Gap Agent', role: 'Placement Intelligence System' });
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite dist build if available
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.listen(PORT, () => {
  console.log(`🚀 Skill Gap Agent API Server listening on http://localhost:${PORT}`);
  console.log(`📌 Agent Endpoint: POST http://localhost:${PORT}/agent/skill-gap`);
});

