// =============================================================================
// App.js - Main Application Component
// =============================================================================
// This file serves as the entry point for the Family Folio finance application.
// It configures the global theme, sets up routing, and handles authentication.
// =============================================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// =========================================================================
// Layout Components
// =========================================================================
import Navigation from './components/Navigation';

// =========================================================================
// Auth & Public Pages
// =========================================================================
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

// =========================================================================
// Protected Pages
// =========================================================================
// Dashboard
import Dashboard from './pages/Dashboard';

// Assets & Net Worth
import AssetsLiabilities from './pages/AssetsLiabilities';
import PortfolioBreakdown from './pages/PortfolioBreakdown';

// Transactions & Spending
import Transactions from './pages/Transactions';
import ExpenseBreakdown from './pages/ExpenseBreakdown';
import BillsSubscriptions from './pages/BillsSubscriptions';
import CreditCardStrategy from './pages/CreditCardStrategy';

// Planning
import Goals from './pages/Goals';
import Income from './pages/Income';
import TaxPlanning from './pages/TaxPlanning';

// User Settings
import Settings from './pages/Settings';

// =========================================================================
// Authentication Context
// =========================================================================
import AuthProvider, { useAuth } from './contexts/AuthContext';

/**
 * Protected Route Component
 * 
 * Serves as an authentication guard for private routes.
 * Redirects unauthenticated users to the login page.
 * Renders a loading state when authentication status is being determined.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @returns {React.ReactNode} - Protected content or redirection
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state while determining authentication
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Render children when authenticated
  return children;
};

/**
 * Application Theme Configuration
 * 
 * Defines global design tokens including colors, typography,
 * and other theme variables used throughout the application.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue - primary actions and navigation
    },
    secondary: {
      main: '#dc004e', // Pink - accent elements and highlights
    },
    background: {
      default: '#f5f5f5', // Light gray - default page background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
  },
});

/**
 * Protected Layout Component
 * 
 * Provides the common layout structure for authenticated pages,
 * including the navigation sidebar and proper spacing.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render inside the layout
 * @returns {React.ReactNode} - Layout with children
 */
const ProtectedLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navigation Sidebar */}
      <Navigation />
      
      {/* Main Content Area */}
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

/**
 * Main Application Component
 * 
 * Sets up the application environment with theming and authentication context.
 * Serves as the entry point for the application.
 * 
 * @returns {React.ReactNode} - Application root with providers and routing
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes CSS across browsers */}
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

/**
 * Application Routes Component
 * 
 * Defines all application routes and their respective components.
 * Handles authentication-based redirects and routing logic.
 * 
 * @returns {React.ReactNode} - Route configuration
 */
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      {/* ========================================================================= */}
      {/* Public Routes - Accessible without authentication                         */}
      {/* Redirects to dashboard if user is already authenticated                   */}
      {/* ========================================================================= */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
      
      {/* ========================================================================= */}
      {/* Protected Routes - Requires authentication                                */}
      {/* All wrapped in the ProtectedRoute component and ProtectedLayout           */}
      {/* ========================================================================= */}
      
      {/* Dashboard */}
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
      
      {/* Transactions */}
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
      
      {/* Assets & Net Worth */}
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
        path="/assets-liabilities" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <AssetsLiabilities />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Spending & Budget */}
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
        path="/credit-card-strategy" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <CreditCardStrategy />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Financial Planning */}
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
        path="/tax-planning" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <TaxPlanning />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* User Settings */}
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
      
      {/* ========================================================================= */}
      {/* Special Routes - Handling root path and 404                               */}
      {/* ========================================================================= */}
      
      {/* Redirect root to login or dashboard based on auth status */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Navigate to="/login" />
        } 
      />
      
      {/* 404 Page - Handles all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;