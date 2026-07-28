import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X, CheckCircle, CloudUpload, Loader2, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import sampleData from '../../../sample_resume_data.json'

export default function UploadSection({ darkMode, onUploadStart, onAnalysisComplete }) {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (f) => {
    if (!f) return
    if (f.type !== 'application/pdf') {
      toast.error('Please upload a PDF file only (.pdf)', { icon: '📄' })
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10MB')
      return
    }
    setFile(f)
    setUploadSuccess(false)
    setProgress(0)
  }

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    handleFile(dropped)
  }, [])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const onDragLeave = useCallback(() => setDragOver(false), [])

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please select a PDF resume first')
      return
    }

    setUploading(true)
    setProgress(0)
    onUploadStart()

    const formData = new FormData()
    formData.append('file', file)

    let progressInterval = null

    try {
      progressInterval = setInterval(() => {
        setProgress(p => {
          if (p >= 85) {
            clearInterval(progressInterval)
            return 85
          }
          return p + Math.random() * 12
        })
      }, 300)

      const response = await axios.post('/api/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      clearInterval(progressInterval)
      setProgress(100)

      const payload = response.data?.analysis ?? response.data
      let parsedData = payload

      if (typeof payload === 'string') {
        try {
          const cleaned = payload.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
          parsedData = JSON.parse(cleaned)
        } catch {
          parsedData = { raw: payload }
        }
      }

      if (!parsedData || typeof parsedData !== 'object') {
        parsedData = { raw: payload }
      }

      setUploadSuccess(true)
      setUploading(false)
      toast.success(response.data?.message || 'ResumeSense AI Analysis Complete! 🎉', { duration: 4000 })

      setTimeout(() => {
        onAnalysisComplete(parsedData)
      }, 800)

    } catch (err) {
      if (progressInterval) clearInterval(progressInterval)
      setUploading(false)
      setProgress(0)
      const msg = err.response?.data?.detail || err.message || 'Analysis failed. Please try again.'
      toast.error(msg)
    }
  }

  const handleLoadSample = () => {
    onUploadStart()
    setUploading(true)
    setProgress(30)
    setTimeout(() => setProgress(75), 400)
    setTimeout(() => {
      setProgress(100)
      setUploading(false)
      setUploadSuccess(true)
      toast.success('Loaded Sample Resume Data! 🎉')
      setTimeout(() => {
        onAnalysisComplete(sampleData)
      }, 500)
    }, 800)
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col justify-center py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-4">
          <CloudUpload className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">ResumeSense AI Module</span>
        </div>
        <h2 className={`text-4xl font-black mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Upload Your PDF Resume
        </h2>
        <p className={`text-base max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Upload your resume in PDF format for automated skill extraction, readiness scoring, and career intelligence.
        </p>
      </motion.div>

      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 cursor-pointer
          ${dragOver
            ? 'border-blue-500 bg-blue-600/10 scale-[1.01]'
            : uploadSuccess
              ? 'border-green-500 bg-green-500/5'
              : file
                ? darkMode ? 'border-violet-500/50 bg-violet-600/5' : 'border-violet-400/50 bg-violet-50'
                : darkMode ? 'border-white/10 hover:border-blue-500/50 hover:bg-blue-600/5' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {/* Animated Upload Icon */}
        <AnimatePresence mode="wait">
          {uploadSuccess ? (
            <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-9 h-9 text-green-400" />
              </div>
              <p className="text-green-400 font-bold text-lg">Analysis Complete!</p>
              <p className="text-slate-400 text-sm mt-1">Opening your dashboard...</p>
            </motion.div>
          ) : file ? (
            <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-violet-500/30 flex items-center justify-center mb-4">
                <FileText className="w-9 h-9 text-violet-400" />
              </div>
              <p className={`font-bold text-base truncate max-w-xs mx-auto ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {file.name}
              </p>
              <p className="text-slate-400 text-sm mt-1">{formatSize(file.size)}</p>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); setProgress(0) }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Remove file
              </button>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div
                animate={dragOver ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-blue-500/30 flex items-center justify-center mb-4"
              >
                <Upload className={`w-8 h-8 ${dragOver ? 'text-blue-400' : 'text-slate-400'}`} />
              </motion.div>
              <p className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {dragOver ? 'Drop it here!' : 'Drag & drop your PDF resume'}
              </p>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                or <span className="text-blue-400 font-medium underline underline-offset-2">click to browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">PDF files only · Max 10MB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress Bar */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                Extracting & Analyzing with PathPilot AI...
              </span>
              <span className="text-xs font-bold text-blue-400">{Math.round(progress)}%</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-400 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analyze Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 space-y-3"
      >
        <button
          onClick={handleAnalyze}
          disabled={!file || uploading || uploadSuccess}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300
            ${!file || uploading || uploadSuccess
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 text-white hover:scale-[1.01] shadow-xl shadow-blue-500/25 active:scale-[0.99]'
            }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Resume...
            </>
          ) : uploadSuccess ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-400" />
              Analysis Complete
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Analyze PDF Resume with AI
            </>
          )}
        </button>

        {/* Demo Data Button */}
        <button
          onClick={handleLoadSample}
          disabled={uploading || uploadSuccess}
          className={`w-full py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all border
            ${darkMode
              ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-violet-500/40'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Don't have a PDF? Test with Sample Resume Data
        </button>
      </motion.div>

      {/* Info pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-6 mt-6"
      >
        {['🔒 PDF Secure Parsing', '⚡ Groq & Llama 3.3', '🤖 PathPilot Intelligence'].map((tag, i) => (
          <span key={i} className="text-xs text-slate-500">{tag}</span>
        ))}
      </motion.div>
    </div>
  )
}
