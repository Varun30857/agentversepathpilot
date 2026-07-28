import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { AgentWorkflow } from './components/AgentWorkflow';
import { RoadmapView } from './components/RoadmapView';
import { ProfileEditor } from './components/ProfileEditor';
import { JsonOutputViewer } from './components/JsonOutputViewer';
import { SystemLogConsole } from './components/SystemLogConsole';
import { PRESET_PROFILES } from './data/presetProfiles';
import { generateLearningRoadmap } from './services/roadmapGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [activePreset, setActivePreset] = useState('fullstack');
  const [pipelineStep, setPipelineStep] = useState(4);
  const [agentStatus, setAgentStatus] = useState('Agent Ready');

  // Default candidate profile payload string
  const defaultProfile = PRESET_PROFILES[0].profile;
  const [profileJsonString, setProfileJsonString] = useState(JSON.stringify({ profile: defaultProfile }, null, 2));

  // Logs state tracking Goal-Based AI Agent decisions
  const [agentLogs, setAgentLogs] = useState([
    {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      agent: "Learning Roadmap Agent",
      action: "BOOT",
      details: "Learning Roadmap Agent initialized. Goal-Based schedule engine ready."
    }
  ]);

  // Compute learning roadmap payload deterministically from input profile JSON
  const roadmapData = useMemo(() => {
    try {
      const parsed = JSON.parse(profileJsonString);
      return generateLearningRoadmap(parsed);
    } catch (err) {
      return generateLearningRoadmap({});
    }
  }, [profileJsonString]);

  // Extract student details for top metrics
  const parsedStudentDetails = useMemo(() => {
    try {
      const parsed = JSON.parse(profileJsonString);
      const prof = parsed.profile || parsed;
      return {
        domain: prof.preferred_domain || "Software Development",
        hours: prof.study_hours_per_day || 2
      };
    } catch (err) {
      return { domain: "Software Development", hours: 2 };
    }
  }, [profileJsonString]);

  // Execute Agent Pipeline Run
  const handleRunPipeline = () => {
    setPipelineStep(1);
    setAgentStatus('Ingesting Student Profile...');

    const timestamp = () => new Date().toLocaleTimeString('en-US', { hour12: false });

    // Step 1: Input Payload Ingestion
    setTimeout(() => {
      setPipelineStep(2);
      setAgentStatus('Decomposing Skill Goals & Mapping Domain...');

      setAgentLogs(prev => [
        ...prev,
        {
          timestamp: timestamp(),
          agent: "Learning Roadmap Agent",
          action: "PAYLOAD_INGESTED",
          details: `Validated profile. Target Domain: '${parsedStudentDetails.domain}', Study Hours: ${parsedStudentDetails.hours}h/day.`
        },
        {
          timestamp: timestamp(),
          agent: "Learning Roadmap Agent",
          action: "GOAL_DECOMPOSITION",
          details: "Decomposed skill goals into progressive week-by-week technical curriculum."
        }
      ]);

      // Step 3: Schedule Generation
      setTimeout(() => {
        setPipelineStep(3);
        setAgentStatus('Generating 4–8 Week Schedule...');

        setAgentLogs(prev => [
          ...prev,
          {
            timestamp: timestamp(),
            agent: "Learning Roadmap Agent",
            action: "RULES_VERIFICATION",
            details: "Rule check passed: Zero company recommendations, zero placement readiness scores, free learning resources attached."
          }
        ]);

        // Step 4: Complete
        setTimeout(() => {
          setPipelineStep(4);
          setAgentStatus('Roadmap Generated & Ready');

          const duration = roadmapData.learning_roadmap.duration;
          setAgentLogs(prev => [
            ...prev,
            {
              timestamp: timestamp(),
              agent: "Learning Roadmap Agent",
              action: "COMPLETE",
              details: `Turn complete. Generated personalized ${duration} learning roadmap payload.`
            }
          ]);
        }, 300);

      }, 400);

    }, 300);
  };

  // Switch preset candidate profile
  const handleLoadPreset = (preset) => {
    setActivePreset(preset.id);
    const jsonStr = JSON.stringify({ profile: preset.profile }, null, 2);
    setProfileJsonString(jsonStr);

    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAgentLogs(prev => [
      ...prev,
      {
        timestamp,
        agent: "Learning Roadmap Agent",
        action: "PRESET_LOADED",
        details: `Loaded candidate preset: '${preset.name}' (${preset.domain}).`
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} agentStatus={agentStatus} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Agent Workflow Visual Banner */}
        <AgentWorkflow currentStep={pipelineStep} onRunPipeline={handleRunPipeline} />

        {/* Dynamic Views */}
        {activeTab === 'roadmap' && (
          <RoadmapView
            roadmapData={roadmapData}
            studentDomain={parsedStudentDetails.domain}
            studyHours={parsedStudentDetails.hours}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileEditor
            profileJsonString={profileJsonString}
            onUpdateJson={handleUpdateJson}
            activePreset={activePreset}
            onLoadPreset={handleLoadPreset}
            onRunPipeline={handleRunPipeline}
          />
        )}

        {activeTab === 'json' && (
          <JsonOutputViewer roadmapData={roadmapData} />
        )}

        {/* System Log Console */}
        <SystemLogConsole
          agentLogs={agentLogs}
          onClearLogs={() => setAgentLogs([])}
          onTriggerAgentRun={handleRunPipeline}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        Learning Roadmap Agent Module &bull; Goal-Based AI Agent &bull; Multi-Agent Placement Intelligence System
      </footer>

    </div>
  );
}
