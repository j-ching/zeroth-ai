import React, { useState } from 'react';

const AgentPreview = () => {
  const [selectedAgent, setSelectedAgent] = useState('');
  const [inputText, setInputText] = useState('');
  const [previewOutput, setPreviewOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock agents data
  const mockAgents = [
    { id: '1', name: 'Customer Support Agent', description: 'Helps with customer inquiries' },
    { id: '2', name: 'Content Generator', description: 'Creates marketing content' },
    { id: '3', name: 'Data Analyst', description: 'Analyzes data and generates reports' }
  ];

  const handlePreview = async (e) => {
    e.preventDefault();
    
    if (!selectedAgent) {
      alert('Please select an agent');
      return;
    }
    
    if (!inputText) {
      alert('Please enter input text');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      setPreviewOutput(`This is a preview of the agent's response to: "${inputText}"\n\nThe agent would process this input and generate a relevant response based on its configuration and training.`);
      setIsLoading(false);
    }, 1500);
  };

  const handleRun = async (e) => {
    e.preventDefault();
    
    if (!selectedAgent) {
      alert('Please select an agent');
      return;
    }
    
    if (!inputText) {
      alert('Please enter input text');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      setPreviewOutput(`The agent "${mockAgents.find(a => a.id === selectedAgent)?.name}" has processed your input: "${inputText}"\n\nActual response would be generated here based on the agent's capabilities and the input provided.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="agent-preview">
      <div className="card">
        <h2>Agent Preview</h2>
        <form onSubmit={handlePreview}>
          <div className="form-group">
            <label htmlFor="agentSelect">Select Agent</label>
            <select
              id="agentSelect"
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              required
            >
              <option value="">-- Select an Agent --</option>
              {mockAgents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} - {agent.description}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="inputText">Input Text</label>
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows="4"
              placeholder="Enter text for the agent to process..."
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Previewing...' : 'Preview Agent'}
            </button>
            <button type="button" className="btn" onClick={handleRun} disabled={isLoading}>
              {isLoading ? 'Running...' : 'Run Agent'}
            </button>
          </div>
        </form>
      </div>
      
      {previewOutput && (
        <div className="card">
          <h2>Agent Output</h2>
          <div className="agent-preview-output">
            {previewOutput}
          </div>
        </div>
      )}
      
      <div className="card">
        <h2>About Agent Preview</h2>
        <p>
          The Agent Preview feature allows you to test and validate your agents before deployment. 
          You can provide input text and see how the agent would respond without permanently executing the agent.
        </p>
        <p>
          The "Preview Agent" button simulates how the agent would respond, while the "Run Agent" button 
          executes the agent with your input and returns the actual result.
        </p>
      </div>
    </div>
  );
};

export default AgentPreview;