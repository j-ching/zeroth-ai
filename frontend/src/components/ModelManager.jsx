import React, { useState } from 'react';

const ModelManager = ({ models, setModels }) => {
  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [trainingDataPath, setTrainingDataPath] = useState('');
  const [epochs, setEpochs] = useState(10);
  const [learningRate, setLearningRate] = useState(0.001);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadModel = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a model file to upload');
      return;
    }
    
    // In a real app, this would upload the file to the backend
    const newModel = {
      id: Date.now().toString(),
      name: modelName,
      description: modelDescription,
      file_path: selectedFile.name,
      version: '1.0.0',
      created_at: new Date().toISOString()
    };
    
    // Update local state
    setModels([...models, newModel]);
    
    // Reset form
    setModelName('');
    setModelDescription('');
    setSelectedFile(null);
    
    alert('Model uploaded successfully!');
  };

  const handleTrainModel = async (e) => {
    e.preventDefault();
    
    if (!trainingDataPath) {
      alert('Please provide a training data path');
      return;
    }
    
    // In a real app, this would send a request to the backend
    alert(`Model training initiated with ${epochs} epochs and learning rate ${learningRate}`);
  };

  return (
    <div className="model-manager">
      <div className="card">
        <h2>Upload Model</h2>
        <form onSubmit={handleUploadModel}>
          <div className="form-group">
            <label htmlFor="modelName">Model Name</label>
            <input
              type="text"
              id="modelName"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="modelDescription">Description</label>
            <textarea
              id="modelDescription"
              value={modelDescription}
              onChange={(e) => setModelDescription(e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="modelFile">Model File</label>
            <input
              type="file"
              id="modelFile"
              onChange={handleFileChange}
              accept=".bin,.pt,.h5,.onnx,.safetensors"
            />
          </div>
          
          <button type="submit" className="btn">Upload Model</button>
        </form>
      </div>
      
      <div className="card">
        <h2>Train Model</h2>
        <form onSubmit={handleTrainModel}>
          <div className="form-group">
            <label htmlFor="trainingDataPath">Training Data Path</label>
            <input
              type="text"
              id="trainingDataPath"
              value={trainingDataPath}
              onChange={(e) => setTrainingDataPath(e.target.value)}
              placeholder="Path to training data"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="epochs">Epochs: {epochs}</label>
            <input
              type="range"
              id="epochs"
              min="1"
              max="100"
              value={epochs}
              onChange={(e) => setEpochs(parseInt(e.target.value))}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="learningRate">Learning Rate: {learningRate}</label>
            <input
              type="number"
              id="learningRate"
              min="0.0001"
              max="0.1"
              step="0.0001"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            />
          </div>
          
          <button type="submit" className="btn">Start Training</button>
        </form>
      </div>
      
      <div className="card">
        <h2>Existing Models</h2>
        {models.length === 0 ? (
          <p>No models uploaded yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>File Path</th>
                <th>Version</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map(model => (
                <tr key={model.id}>
                  <td>{model.name}</td>
                  <td>{model.description}</td>
                  <td>{model.file_path}</td>
                  <td>{model.version}</td>
                  <td>{new Date(model.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-secondary" style={{marginRight: '0.5rem'}}>Download</button>
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

export default ModelManager;