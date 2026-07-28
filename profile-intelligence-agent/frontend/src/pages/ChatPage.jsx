import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, Send, Bot, User, Sparkles, Loader2,
  HelpCircle, RefreshCw, AlertCircle
} from 'lucide-react'
import { sendChatMessage } from '../services/api'
import toast from 'react-hot-toast'

const SUGGESTED_QUESTIONS = [
  "How can I improve my resume?",
  "Which skills should I learn next?",
  "Am I ready for software developer roles?",
  "Suggest projects tailored to my profile",
]

export default function ChatPage({ darkMode, analysisData }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: analysisData
        ? `Hello **${analysisData.candidate_name || 'there'}**! 👋 I'm your PathPilot AI Career Assistant.\n\nI've analyzed your resume and loaded your skills context (${(analysisData.skills || []).slice(0, 5).join(', ')}...). How can I help guide your career journey today?`
        : "Hello! 👋 I'm your PathPilot AI Career Assistant. Upload your resume to get personalized advice, or ask me any general career questions!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSend = async (textToSend) => {
    const query = textToSend || input
    if (!query.trim() || loading) return

    const userMsg = { role: 'user', content: query.trim() }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    if (!textToSend) setInput('')
    setLoading(true)

    try {
      // Send conversation history without initial assistant greeting
      const historyForApi = updatedMessages
        .slice(1)
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await sendChatMessage(query, analysisData, historyForApi)

      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I ran into an issue connecting to the PathPilot AI engine. Please check your network connection and try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 pb-8 px-4 lg:px-8 max-w-5xl mx-auto h-[calc(100vh-20px)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 shrink-0 flex items-center justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-600/10 border border-cyan-500/30 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300">AI Career Assistant</span>
          </div>
          <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            PathPilot <span className="gradient-text">Chat</span>
          </h1>
        </div>

        {analysisData && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/30">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300">
              Resume Context Loaded ({analysisData.candidate_name || 'Candidate'})
            </span>
          </div>
        )}
      </motion.div>

      {/* Suggested Questions */}
      <div className="mb-4 shrink-0 overflow-x-auto pb-1 scrollbar-hide flex gap-2">
        {SUGGESTED_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            disabled={loading}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 shrink-0
              ${darkMode
                ? 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-cyan-600/10 text-slate-300'
                : 'bg-white border-slate-200 hover:border-cyan-400 hover:bg-cyan-50 text-slate-700 shadow-sm'
              }`}
          >
            💬 {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div
        className={`flex-1 overflow-y-auto rounded-2xl p-4 sm:p-6 mb-4 border space-y-4
          ${darkMode ? 'bg-dark-800/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-violet-600 to-pink-500'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-600'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[82%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-tr-none'
                  : darkMode
                    ? 'bg-white/10 border border-white/10 text-slate-200 rounded-tl-none'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className={`rounded-2xl px-4 py-3 ${darkMode ? 'bg-white/10 text-slate-300' : 'bg-white border border-slate-200 text-slate-600'}`}>
              <div className="flex items-center gap-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>PathPilot AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className="shrink-0 relative flex items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            analysisData
              ? "Ask anything about your resume, career path, or interview tips..."
              : "Ask a career question (e.g. How do I format my resume?)..."
          }
          className={`w-full py-4 pl-5 pr-14 rounded-2xl text-sm outline-none transition-all duration-200 ${
            darkMode
              ? 'bg-dark-800 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20'
              : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm'
          }`}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className={`absolute right-2.5 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
            !input.trim() || loading
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 shadow-md shadow-cyan-500/25'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
