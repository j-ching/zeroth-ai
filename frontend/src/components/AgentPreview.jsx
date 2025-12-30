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
  Alert,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  Divider
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

const AgentPreview = () => {
  const [selectedAgent, setSelectedAgent] = useState('');
  const [inputText, setInputText] = useState('');
  const [previewOutput, setPreviewOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock agents data
  const mockAgents = [
    { id: '1', name: 'Customer Support Agent', description: 'Helps with customer inquiries', type: 'Support' },
    { id: '2', name: 'Content Generator', description: 'Creates marketing content', type: 'Creative' },
    { id: '3', name: 'Data Analyst', description: 'Analyzes data and generates reports', type: 'Analytics' },
    { id: '4', name: 'Technical Support', description: 'Handles technical issues', type: 'Support' },
    { id: '5', name: 'Research Assistant', description: 'Assists with research tasks', type: 'Research' }
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Agent Preview
            </Typography>
            <Box component="form" onSubmit={handlePreview} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select Agent</InputLabel>
                    <Select
                      value={selectedAgent}
                      label="Select Agent"
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      required
                    >
                      <MenuItem value="">
                        <em>Select an Agent</em>
                      </MenuItem>
                      {mockAgents.map(agent => (
                        <MenuItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Input Text"
                    multiline
                    rows={5}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text for the agent to process..."
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    type="submit" 
                    size="large" 
                    disabled={isLoading}
                    sx={{ mr: 2 }}
                  >
                    {isLoading ? 'Previewing...' : 'Preview Agent'}
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={handleRun} 
                    size="large" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Running...' : 'Run Agent'}
                  </Button>
                </Grid>
                {isLoading && (
                  <Grid item xs={12}>
                    <LinearProgress />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>

          {previewOutput && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Agent Output
              </Typography>
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'grey.50', 
                  borderRadius: 2, 
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-line'
                }}
              >
                {previewOutput}
              </Box>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Available Agents
            </Typography>
            {mockAgents.map(agent => (
              <Box key={agent.id} sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="bold">
                  {agent.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {agent.description}
                </Typography>
                <Chip 
                  label={agent.type} 
                  size="small" 
                  sx={{ 
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            ))}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              About Agent Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" paragraph>
              The Agent Preview feature allows you to test and validate your agents before deployment. 
              You can provide input text and see how the agent would respond without permanently executing the agent.
            </Typography>
            <Typography variant="body2" paragraph>
              The "Preview Agent" button simulates how the agent would respond, while the "Run Agent" button 
              executes the agent with your input and returns the actual result.
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              Remember to configure your agent properly before running it in production.
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentPreview;