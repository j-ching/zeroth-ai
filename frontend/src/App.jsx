import React, { useState, useEffect } from 'react';
import './App.css';
import AgentBuilder from './components/AgentBuilder';
import ModelManager from './components/ModelManager';
import KnowledgeBaseManager from './components/KnowledgeBaseManager';
import AgentPreview from './components/AgentPreview';

function App() {
  const [activeTab, setActiveTab] = useState('agent-builder');
  const [agents, setAgents] = useState([]);
  const [models, setModels] = useState([]);
  const [knowledgeBases, setKnowledgeBases] = useState([]);

  // Simulated API calls to backend
  useEffect(() => {
    // In a real app, these would fetch data from the backend
    // fetchAgents();
    // fetchModels();
    // fetchKnowledgeBases();
  }, []);

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'agent-builder':
        return <AgentBuilder agents={agents} setAgents={setAgents} />;
      case 'model-manager':
        return <ModelManager models={models} setModels={setModels} />;
      case 'knowledge-base':
        return <KnowledgeBaseManager knowledgeBases={knowledgeBases} setKnowledgeBases={setKnowledgeBases} />;
      case 'agent-preview':
        return <AgentPreview />;
      default:
        return <AgentBuilder agents={agents} setAgents={setAgents} />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Agent Platform</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'agent-builder' ? 'active' : ''}
            onClick={() => setActiveTab('agent-builder')}
          >
            Agent Builder
          </button>
          <button 
            className={activeTab === 'model-manager' ? 'active' : ''}
            onClick={() => setActiveTab('model-manager')}
          >
            Model Manager
          </button>
          <button 
            className={activeTab === 'knowledge-base' ? 'active' : ''}
            onClick={() => setActiveTab('knowledge-base')}
          >
            Knowledge Base
          </button>
          <button 
            className={activeTab === 'agent-preview' ? 'active' : ''}
            onClick={() => setActiveTab('agent-preview')}
          >
            Agent Preview
          </button>
        </nav>
      </header>
      
      <main className="app-main">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;