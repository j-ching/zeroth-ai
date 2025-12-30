import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextareaAutosize
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const KnowledgeBaseManager = () => {
  const [kbName, setKbName] = useState('');
  const [kbDescription, setKbDescription] = useState('');
  const [kbType, setKbType] = useState('vector');
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentContent, setDocumentContent] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const [knowledgeBases, setKnowledgeBases] = useState([
    {
      id: '1',
      name: 'Company Documentation',
      description: 'Internal company policies and procedures',
      type: 'vector',
      created_at: '2023-06-10',
      documents: 42
    },
    {
      id: '2',
      name: 'Product Knowledge Base',
      description: 'Product specifications and user guides',
      type: 'vector',
      created_at: '2023-07-15',
      documents: 28
    },
    {
      id: '3',
      name: 'Research Papers',
      description: 'Academic papers and research documents',
      type: 'graph',
      created_at: '2023-08-01',
      documents: 15
    }
  ]);

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
      created_at: new Date().toISOString().split('T')[0],
      documents: 0
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Create Knowledge Base" />
          <Tab label="Add Document" />
          <Tab label="Query Knowledge Base" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Create Knowledge Base
            </Typography>
            <Box component="form" onSubmit={handleCreateKnowledgeBase} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Knowledge Base Name"
                    value={kbName}
                    onChange={(e) => setKbName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={kbDescription}
                    onChange={(e) => setKbDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={kbType}
                      label="Type"
                      onChange={(e) => setKbType(e.target.value)}
                    >
                      <MenuItem value="vector">Vector Database</MenuItem>
                      <MenuItem value="graph">Graph Database</MenuItem>
                      <MenuItem value="relational">Relational Database</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" size="large">
                    Create Knowledge Base
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Add Document
            </Typography>
            <Box component="form" onSubmit={handleAddDocument} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Document Title"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="Optional title for the document"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Document Content"
                    multiline
                    rows={6}
                    value={documentContent}
                    onChange={(e) => setDocumentContent(e.target.value)}
                    placeholder="Paste document content here or upload a file below"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept=".txt,.pdf,.doc,.docx,.md"
                    />
                  </Button>
                  {selectedFile && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected file: {selectedFile.name}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" size="large">
                    Add Document
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Query Knowledge Base
            </Typography>
            <Box component="form" onSubmit={handleQuery} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your question or query"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" size="large">
                    Query Knowledge Base
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Existing Knowledge Bases
        </Typography>
        {knowledgeBases.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No knowledge bases created yet.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Documents</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {knowledgeBases.map(kb => (
                  <TableRow key={kb.id}>
                    <TableCell component="th" scope="row">
                      {kb.name}
                    </TableCell>
                    <TableCell>{kb.description}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {kb.type}
                      </Typography>
                    </TableCell>
                    <TableCell>{kb.documents}</TableCell>
                    <TableCell>{kb.created_at}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                        View
                      </Button>
                      <Button variant="outlined" size="small" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default KnowledgeBaseManager;