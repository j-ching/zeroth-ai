import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Widgets,
  Psychology,
  ModelTraining,
  Storage,
  Settings
} from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AgentBuilder from './components/AgentBuilder';
import ModelManager from './components/ModelManager';
import KnowledgeBaseManager from './components/KnowledgeBaseManager';
import AgentPreview from './components/AgentPreview';

// Create a Manus-like theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem component={Link} to="/" button key="Dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/agent-builder" button key="Agent Builder">
          <ListItemIcon>
            <Psychology />
          </ListItemIcon>
          <ListItemText primary="Agent Builder" />
        </ListItem>
        <ListItem component={Link} to="/model-manager" button key="Model Manager">
          <ListItemIcon>
            <ModelTraining />
          </ListItemIcon>
          <ListItemText primary="Model Manager" />
        </ListItem>
        <ListItem component={Link} to="/knowledge-base" button key="Knowledge Base">
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          <ListItemText primary="Knowledge Base" />
        </ListItem>
        <ListItem component={Link} to="/agent-preview" button key="Agent Preview">
          <ListItemIcon>
            <Widgets />
          </ListItemIcon>
          <ListItemText primary="Agent Preview" />
        </ListItem>
        <ListItem component={Link} to="/settings" button key="Settings">
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                AI Agent Platform
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="navigation"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              marginTop: '64px',
            }}
          >
            <Container maxWidth="xl">
              <Routes>
                <Route path="/" element={
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h4" gutterBottom>
                      AI Agent Platform Dashboard
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Welcome to the AI Agent Platform. Use the navigation menu to access different features.
                    </Typography>
                  </Paper>
                } />
                <Route path="/agent-builder" element={<AgentBuilder />} />
                <Route path="/model-manager" element={<ModelManager />} />
                <Route path="/knowledge-base" element={<KnowledgeBaseManager />} />
                <Route path="/agent-preview" element={<AgentPreview />} />
                <Route path="/settings" element={
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h5">Settings</Typography>
                    <Typography variant="body1">Platform settings will be available here.</Typography>
                  </Paper>
                } />
              </Routes>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;