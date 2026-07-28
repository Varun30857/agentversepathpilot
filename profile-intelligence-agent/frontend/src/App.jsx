import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import UploadSection from './components/UploadSection'
import LoadingScreen from './components/LoadingScreen'
import AnalysisDashboard from './components/AnalysisDashboard'
import SkillGapPage from './pages/SkillGapPage'
import RoadmapPage from './pages/RoadmapPage'
import ChatPage from './pages/ChatPage'
import Footer from './components/Footer'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activePage, setActivePage] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data)
    setIsLoading(false)
    setActivePage('analysis')
  }

  const handleUploadStart = () => {
    setIsLoading(true)
  }

  const handleReset = () => {
    setAnalysisData(null)
    setActivePage('home')
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      darkMode
        ? 'bg-dark-900 text-white'
        : 'bg-slate-50 text-slate-900'
    }`}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? '#1E293B' : '#fff',
            color: darkMode ? '#fff' : '#0F172A',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#22C55E', secondary: '#fff' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      />

      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onReset={handleReset}
        hasAnalysis={!!analysisData}
      />

      <div className="flex">
        <Sidebar
          darkMode={darkMode}
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          hasAnalysis={!!analysisData}
        />

        <main className="flex-1 min-h-screen overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Hero darkMode={darkMode} onGetStarted={() => setActivePage('upload')} />
              </motion.div>
            )}

            {activePage === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-20 px-4 pb-12 max-w-4xl mx-auto"
              >
                <UploadSection
                  darkMode={darkMode}
                  onUploadStart={handleUploadStart}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              </motion.div>
            )}

            {activePage === 'analysis' && analysisData && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pt-20 pb-12"
              >
                <AnalysisDashboard
                  data={analysisData}
                  darkMode={darkMode}
                  onReset={handleReset}
                  onNavigateToSkillGap={() => setActivePage('skillgap')}
                  onNavigateToChat={() => setActivePage('chat')}
                />
              </motion.div>
            )}

            {activePage === 'skillgap' && (
              <motion.div
                key="skillgap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SkillGapPage darkMode={darkMode} analysisData={analysisData} />
              </motion.div>
            )}

            {activePage === 'roadmap' && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RoadmapPage darkMode={darkMode} analysisData={analysisData} />
              </motion.div>
            )}

            {activePage === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatPage darkMode={darkMode} analysisData={analysisData} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {activePage === 'home' && <Footer darkMode={darkMode} />}
    </div>
  )
}
