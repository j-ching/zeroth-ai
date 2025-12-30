import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextareaAutosize,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';

const AgentBuilder = () => {
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [agentConfig, setAgentConfig] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 1024,
    system_prompt: 'You are a helpful AI assistant.',
    tools: []
  });

  const [agents, setAgents] = useState([
    {
      id: '1',
      name: 'Customer Support Agent',
      description: 'Handles customer inquiries and support tickets',
      config: { model: 'gpt-4', temperature: 0.5 },
      created_at: '2023-06-15'
    },
    {
      id: '2',
      name: 'Data Analysis Agent',
      description: 'Analyzes data and generates reports',
      config: { model: 'gpt-3.5-turbo', temperature: 0.3 },
      created_at: '2023-07-20'
    }
  ]);

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    
    // In a real app, this would call the backend API
    const newAgent = {
      id: Date.now().toString(),
      name: agentName,
      description: agentDescription,
      config: agentConfig,
      created_at: new Date().toISOString().split('T')[0]
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Create New Agent
            </Typography>
            <Box component="form" onSubmit={handleCreateAgent} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Agent Name"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Model</InputLabel>
                    <Select
                      value={agentConfig.model}
                      label="Model"
                      onChange={(e) => handleConfigChange('model', e.target.value)}
                    >
                      <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                      <MenuItem value="gpt-4">GPT-4</MenuItem>
                      <MenuItem value="llama-2">Llama 2</MenuItem>
                      <MenuItem value="mistral">Mistral</MenuItem>
                      <MenuItem value="claude-3">Claude 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Max Tokens</InputLabel>
                    <Select
                      value={agentConfig.max_tokens}
                      label="Max Tokens"
                      onChange={(e) => handleConfigChange('max_tokens', parseInt(e.target.value))}
                    >
                      <MenuItem value={256}>256</MenuItem>
                      <MenuItem value={512}>512</MenuItem>
                      <MenuItem value={1024}>1024</MenuItem>
                      <MenuItem value={2048}>2048</MenuItem>
                      <MenuItem value={4096}>4096</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Temperature: {agentConfig.temperature}
                  </Typography>
                  <Slider
                    value={agentConfig.temperature}
                    onChange={(e, newValue) => handleConfigChange('temperature', newValue)}
                    step={0.1}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="System Prompt"
                    multiline
                    rows={4}
                    value={agentConfig.system_prompt}
                    onChange={(e) => handleConfigChange('system_prompt', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" size="large">
                    Create Agent
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Agent Configuration
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Configure your agent's behavior, model selection, and other parameters.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Alert severity="info">
                Your agent will use the selected model and parameters when processing requests.
              </Alert>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Existing Agents
        </Typography>
        {agents.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No agents created yet.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agents.map(agent => (
                  <TableRow key={agent.id}>
                    <TableCell component="th" scope="row">
                      {agent.name}
                    </TableCell>
                    <TableCell>{agent.description}</TableCell>
                    <TableCell>{agent.config.model}</TableCell>
                    <TableCell>{agent.created_at}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                        Edit
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

export default AgentBuilder;