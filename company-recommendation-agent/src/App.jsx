import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { AgentWorkflow } from './components/AgentWorkflow';
import { ProfileEditor } from './components/ProfileEditor';
import { CompanyRecommendations } from './components/CompanyRecommendations';
import { JsonOutputViewer } from './components/JsonOutputViewer';
import { SystemLogConsole } from './components/SystemLogConsole';
import { PRESET_PROFILES } from './data/presetProfiles';
import { evaluateCompanyRecommendations } from './services/recommendationEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [activePreset, setActivePreset] = useState('fullstack');
  const [pipelineStep, setPipelineStep] = useState(4);
  const [agentStatus, setAgentStatus] = useState('Agent Ready');
  
  // Default candidate profile payload
  const defaultProfile = PRESET_PROFILES[0].profile;
  const [profileJsonString, setProfileJsonString] = useState(JSON.stringify({ profile: defaultProfile }, null, 2));

  // Logs state
  const [agentLogs, setAgentLogs] = useState([
    {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      agent: "Company Recommendation Agent",
      action: "BOOT",
      details: "Company Recommendation Agent initialized & target company catalog loaded."
    }
  ]);

  // Compute recommendation results deterministically from current profile JSON
  const recommendationData = useMemo(() => {
    try {
      const parsed = JSON.parse(profileJsonString);
      return evaluateCompanyRecommendations(parsed);
    } catch (err) {
      return evaluateCompanyRecommendations({});
    }
  }, [profileJsonString]);

  // Execute Agent Evaluation Turn
  const handleRunPipeline = () => {
    setPipelineStep(1);
    setAgentStatus('Receiving Profile Payload...');

    const timestamp = () => new Date().toLocaleTimeString('en-US', { hour12: false });

    // Step 1: Input Payload Ingestion
    setTimeout(() => {
      setPipelineStep(2);
      setAgentStatus('Calculating Match Scores...');

      setAgentLogs(prev => [
        ...prev,
        {
          timestamp: timestamp(),
          agent: "Company Recommendation Agent",
          action: "PAYLOAD_RECEIVED",
          details: "Validated incoming candidate profile payload."
        },
        {
          timestamp: timestamp(),
          agent: "Company Recommendation Agent",
          action: "UTILITY_EVAL",
          details: "Evaluating profile across technical skills, degree, CGPA, projects, certifications & domain fit for 20 catalog companies."
        }
      ]);

      // Step 3: Ranking & Sorting Top 10
      setTimeout(() => {
        setPipelineStep(3);
        setAgentStatus('Ranking Top 10 Companies...');

        setAgentLogs(prev => [
          ...prev,
          {
            timestamp: timestamp(),
            agent: "Company Recommendation Agent",
            action: "SORT",
            details: "Sorted target company recommendations by highest match percentage (0–100) descending."
          }
        ]);

        // Step 4: Complete
        setTimeout(() => {
          setPipelineStep(4);
          setAgentStatus('Agent Turn Complete');

          const best = recommendationData.best_company;
          setAgentLogs(prev => [
            ...prev,
            {
              timestamp: timestamp(),
              agent: "Company Recommendation Agent",
              action: "COMPLETE",
              details: `Turn complete. Generated Top 10 recommendations. Best match: ${best.company} (${best.match_percentage}%).`
            }
          ]);
        }, 300);

      }, 400);

    }, 300);
  };

  // Switch preset profile
  const handleLoadPreset = (preset) => {
    setActivePreset(preset.id);
    const jsonStr = JSON.stringify({ profile: preset.profile }, null, 2);
    setProfileJsonString(jsonStr);

    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAgentLogs(prev => [
      ...prev,
      {
        timestamp,
        agent: "Company Recommendation Agent",
        action: "PRESET_LOADED",
        details: `Loaded candidate preset: '${preset.name}'.`
      }
    ]);

    handleRunPipeline();
  };

  // Update profile from JSON text edit
  const handleUpdateJson = (newJsonStr) => {
    setProfileJsonString(newJsonStr);
    setActivePreset('custom');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top System Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} agentStatus={agentStatus} />

      {/* Main Dashboard Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Visual Agent Workflow Pipeline */}
        <AgentWorkflow currentStep={pipelineStep} onRunPipeline={handleRunPipeline} />

        {/* Tab Views */}
        {activeTab === 'recommendations' && (
          <CompanyRecommendations recommendationData={recommendationData} />
        )}

        {activeTab === 'profile' && (
          <ProfileEditor
            profileJsonString={profileJsonString}
            onUpdateJson={handleUpdateJson}
            activePreset={activePreset}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {activeTab === 'json' && (
          <JsonOutputViewer recommendationData={recommendationData} />
        )}

        {/* Agent System Log Console */}
        <SystemLogConsole
          agentLogs={agentLogs}
          onClearLogs={() => setAgentLogs([])}
          onTriggerAgentRun={handleRunPipeline}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500">
        Company Recommendation Agent Module &bull; Utility-Based AI Agent &bull; Powered by Antigravity AI
      </footer>

    </div>
  );
}
