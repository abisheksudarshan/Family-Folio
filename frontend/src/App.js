// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Layout Components
import Navigation from './components/Navigation';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import PortfolioBreakdown from './pages/PortfolioBreakdown';
import ExpenseBreakdown from './pages/ExpenseBreakdown';
import Goals from './pages/Goals';
import Income from './pages/Income';
import BillsSubscriptions from './pages/BillsSubscriptions';
import TaxPlanning from './pages/TaxPlanning';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AssetsLiabilities from './pages/AssetsLiabilities';
import CreditCardStrategy from './pages/CreditCardStrategy';

// Auth Context
import AuthProvider, { useAuth } from './contexts/AuthContext';

// Auth Guard Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    // You could show a loading spinner here
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
  },
});

// Layout component for authenticated pages
const ProtectedLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '40px' },
          mt: ['48px', '56px', '64px'], // Toolbar height for different breakpoints
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Separate component for routes to use the auth context
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/transactions" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Transactions />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/portfolio-breakdown" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <PortfolioBreakdown />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/expense-breakdown" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <ExpenseBreakdown />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/goals" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Goals />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/income" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Income />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/bills-subscriptions" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <BillsSubscriptions />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/tax-planning" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <TaxPlanning />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/assets-liabilities" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <AssetsLiabilities />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />

     <Route 
        path="/credit-card-strategy" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <CreditCardStrategy />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Settings />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect root to login or dashboard based on auth status */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Navigate to="/login" />
        } 
      />
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;