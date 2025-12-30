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
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  LinearProgress,
  Card,
  CardContent
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

const ModelManager = () => {
  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [trainingDataPath, setTrainingDataPath] = useState('');
  const [epochs, setEpochs] = useState(10);
  const [learningRate, setLearningRate] = useState(0.001);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const [models, setModels] = useState([
    {
      id: '1',
      name: 'GPT-3.5 Turbo',
      description: 'General-purpose language model',
      file_path: 'gpt-3.5-turbo.bin',
      version: '1.0.0',
      created_at: '2023-05-10',
      status: 'Trained'
    },
    {
      id: '2',
      name: 'Llama 2 7B',
      description: 'Open-source language model',
      file_path: 'llama-2-7b.pt',
      version: '1.1.2',
      created_at: '2023-06-15',
      status: 'Training'
    },
    {
      id: '3',
      name: 'Custom Customer Support',
      description: 'Fine-tuned for customer service',
      file_path: 'custom-support.onnx',
      version: '2.0.1',
      created_at: '2023-07-22',
      status: 'Ready'
    }
  ]);

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
      created_at: new Date().toISOString().split('T')[0],
      status: 'Uploaded'
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
    
    // Simulate training process
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          alert('Model training completed!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Upload Model
            </Typography>
            <Box component="form" onSubmit={handleUploadModel} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Model Name"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={modelDescription}
                    onChange={(e) => setModelDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                  >
                    Upload Model File
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept=".bin,.pt,.h5,.onnx,.safetensors"
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
                    Upload Model
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Model Information
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Upload pre-trained models or train new models using your data.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Alert severity="info">
                Supported formats: .bin, .pt, .h5, .onnx, .safetensors
              </Alert>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Train Model
        </Typography>
        <Box component="form" onSubmit={handleTrainModel} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Training Data Path"
                value={trainingDataPath}
                onChange={(e) => setTrainingDataPath(e.target.value)}
                placeholder="Path to training data"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Epochs: {epochs}</InputLabel>
                <Select
                  value={epochs}
                  label={`Epochs: ${epochs}`}
                  onChange={(e) => setEpochs(e.target.value)}
                >
                  {[...Array(20)].map((_, i) => (
                    <MenuItem key={i+1} value={i+1}>{i+1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Learning Rate: {learningRate}
              </Typography>
              <Slider
                value={learningRate}
                onChange={(e, newValue) => setLearningRate(newValue)}
                step={0.0001}
                min={0.0001}
                max={0.1}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Learning Rate"
                type="number"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                InputProps={{ inputProps: { min: 0.0001, max: 0.1, step: 0.0001 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" size="large" disabled={isTraining}>
                {isTraining ? 'Training...' : 'Start Training'}
              </Button>
            </Grid>
            {isTraining && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={trainingProgress} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {trainingProgress}%
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Existing Models
        </Typography>
        {models.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No models uploaded yet.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {models.map(model => (
                  <TableRow key={model.id}>
                    <TableCell component="th" scope="row">
                      {model.name}
                    </TableCell>
                    <TableCell>{model.description}</TableCell>
                    <TableCell>{model.file_path}</TableCell>
                    <TableCell>{model.version}</TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: model.status === 'Ready' ? 'success.main' : 
                                 model.status === 'Training' ? 'warning.main' : 
                                 'info.main' 
                        }}
                      >
                        {model.status}
                      </Typography>
                    </TableCell>
                    <TableCell>{model.created_at}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                        Download
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

export default ModelManager;