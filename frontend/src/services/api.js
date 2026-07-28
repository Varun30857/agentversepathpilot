import axios from 'axios'

// Base API client — proxied by Vite to localhost:8000
const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
})

// ---------------------------------------------------------------------------
// Resume Upload & Analysis
// ---------------------------------------------------------------------------

/**
 * Upload a PDF resume and get AI analysis.
 * @param {File} file — PDF file
 * @param {Function} onProgress — progress callback (0-100)
 */
export async function uploadResume(file, onProgress) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/profile/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (evt) => {
      if (onProgress && evt.total) {
        onProgress(Math.round((evt.loaded * 100) / evt.total))
      }
    },
  })

  const payload = response.data?.analysis ?? response.data
  if (typeof payload === 'string') {
    try {
      const cleaned = payload.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      return JSON.parse(cleaned)
    } catch {
      return { raw: payload }
    }
  }
  return payload
}

// ---------------------------------------------------------------------------
// Skill Gap Analysis (SkillMap AI Agent)
// ---------------------------------------------------------------------------

/**
 * Analyze skill gap for a target role.
 * @param {string[]} skills — current skills list
 * @param {string} targetRole — desired career role
 */
export async function analyzeSkillGap(skills, targetRole) {
  const response = await api.post('/skill-analysis', {
    skills,
    target_role: targetRole,
  })
  return response.data?.data ?? response.data
}

// ---------------------------------------------------------------------------
// Career Chat Assistant
// ---------------------------------------------------------------------------

/**
 * Send a message to the AI career chat assistant.
 * @param {string} message — user's message
 * @param {object} resumeContext — analysis data from resume upload
 * @param {Array} conversationHistory — previous messages [{role, content}]
 */
export async function sendChatMessage(message, resumeContext = null, conversationHistory = []) {
  const response = await api.post('/chat', {
    message,
    resume_context: resumeContext,
    conversation_history: conversationHistory,
  })
  return response.data?.response ?? response.data
}

export default api
