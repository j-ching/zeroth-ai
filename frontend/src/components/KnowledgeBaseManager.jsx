import React, { useState } from 'react';

const KnowledgeBaseManager = ({ knowledgeBases, setKnowledgeBases }) => {
  const [kbName, setKbName] = useState('');
  const [kbDescription, setKbDescription] = useState('');
  const [kbType, setKbType] = useState('vector');
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentContent, setDocumentContent] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [query, setQuery] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateKnowledgeBase = async (e) => {
    e.preventDefault();
    
    // In a real app, this would call the backend API
    const newKb = {
      id: Date.now().toString(),
      name: kbName,
      description: kbDescription,
      type: kbType,
      created_at: new Date().toISOString()
    };
    
    // Update local state
    setKnowledgeBases([...knowledgeBases, newKb]);
    
    // Reset form
    setKbName('');
    setKbDescription('');
    setKbType('vector');
    
    alert('Knowledge base created successfully!');
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    
    if (!documentContent && !selectedFile) {
      alert('Please provide document content or upload a file');
      return;
    }
    
    // In a real app, this would send the document to the backend
    alert('Document added to knowledge base');
    
    // Reset form
    setDocumentContent('');
    setDocumentTitle('');
    setSelectedFile(null);
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    
    if (!query) {
      alert('Please enter a query');
      return;
    }
    
    // In a real app, this would send the query to the backend
    alert(`Querying knowledge base: ${query}`);
    
    // Reset form
    setQuery('');
  };

  return (
    <div className="knowledge-base-manager">
      <div className="card">
        <h2>Create Knowledge Base</h2>
        <form onSubmit={handleCreateKnowledgeBase}>
          <div className="form-group">
            <label htmlFor="kbName">Knowledge Base Name</label>
            <input
              type="text"
              id="kbName"
              value={kbName}
              onChange={(e) => setKbName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="kbDescription">Description</label>
            <textarea
              id="kbDescription"
              value={kbDescription}
              onChange={(e) => setKbDescription(e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="kbType">Type</label>
            <select
              id="kbType"
              value={kbType}
              onChange={(e) => setKbType(e.target.value)}
            >
              <option value="vector">Vector Database</option>
              <option value="graph">Graph Database</option>
              <option value="relational">Relational Database</option>
            </select>
          </div>
          
          <button type="submit" className="btn">Create Knowledge Base</button>
        </form>
      </div>
      
      <div className="card">
        <h2>Add Document</h2>
        <form onSubmit={handleAddDocument}>
          <div className="form-group">
            <label htmlFor="documentTitle">Document Title</label>
            <input
              type="text"
              id="documentTitle"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="Optional title for the document"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="documentContent">Document Content</label>
            <textarea
              id="documentContent"
              value={documentContent}
              onChange={(e) => setDocumentContent(e.target.value)}
              rows="6"
              placeholder="Paste document content here or upload a file below"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="documentFile">Or Upload File</label>
            <input
              type="file"
              id="documentFile"
              onChange={handleFileChange}
              accept=".txt,.pdf,.doc,.docx,.md"
            />
          </div>
          
          <button type="submit" className="btn">Add Document</button>
        </form>
      </div>
      
      <div className="card">
        <h2>Query Knowledge Base</h2>
        <form onSubmit={handleQuery}>
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your question or query"
              required
            />
          </div>
          
          <button type="submit" className="btn">Query Knowledge Base</button>
        </form>
      </div>
      
      <div className="card">
        <h2>Existing Knowledge Bases</h2>
        {knowledgeBases.length === 0 ? (
          <p>No knowledge bases created yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {knowledgeBases.map(kb => (
                <tr key={kb.id}>
                  <td>{kb.name}</td>
                  <td>{kb.description}</td>
                  <td>{kb.type}</td>
                  <td>{new Date(kb.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-secondary" style={{marginRight: '0.5rem'}}>View</button>
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

export default KnowledgeBaseManager;