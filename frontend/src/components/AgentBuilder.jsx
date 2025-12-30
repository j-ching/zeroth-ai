import React, { useState } from 'react';

const AgentBuilder = ({ agents, setAgents }) => {
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [agentConfig, setAgentConfig] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 1024,
    system_prompt: 'You are a helpful AI assistant.',
    tools: []
  });

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    
    // In a real app, this would call the backend API
    const newAgent = {
      id: Date.now().toString(),
      name: agentName,
      description: agentDescription,
      config: agentConfig,
      created_at: new Date().toISOString()
    };
    
    // Update local state
    setAgents([...agents, newAgent]);
    
    // Reset form
    setAgentName('');
    setAgentDescription('');
    setAgentConfig({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1024,
      system_prompt: 'You are a helpful AI assistant.',
      tools: []
    });
    
    alert('Agent created successfully!');
  };

  const handleConfigChange = (field, value) => {
    setAgentConfig({
      ...agentConfig,
      [field]: value
    });
  };

  return (
    <div className="agent-builder">
      <div className="card">
        <h2>Create New Agent</h2>
        <form onSubmit={handleCreateAgent}>
          <div className="form-group">
            <label htmlFor="agentName">Agent Name</label>
            <input
              type="text"
              id="agentName"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="agentDescription">Description</label>
            <textarea
              id="agentDescription"
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <select
              id="model"
              value={agentConfig.model}
              onChange={(e) => handleConfigChange('model', e.target.value)}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="llama-2">Llama 2</option>
              <option value="mistral">Mistral</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="temperature">Temperature: {agentConfig.temperature}</label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="1"
              step="0.1"
              value={agentConfig.temperature}
              onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="systemPrompt">System Prompt</label>
            <textarea
              id="systemPrompt"
              value={agentConfig.system_prompt}
              onChange={(e) => handleConfigChange('system_prompt', e.target.value)}
              rows="4"
            />
          </div>
          
          <button type="submit" className="btn">Create Agent</button>
        </form>
      </div>
      
      <div className="card">
        <h2>Existing Agents</h2>
        {agents.length === 0 ? (
          <p>No agents created yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Model</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(agent => (
                <tr key={agent.id}>
                  <td>{agent.name}</td>
                  <td>{agent.description}</td>
                  <td>{agent.config.model}</td>
                  <td>{new Date(agent.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-secondary" style={{marginRight: '0.5rem'}}>Edit</button>
                    <button className="btn btn-secondary">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AgentBuilder;