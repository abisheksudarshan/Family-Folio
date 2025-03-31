// =============================================================================
// ForgotPassword.js - Password Reset Request Component
// =============================================================================
// This component allows users to request a password reset by providing their email.
// It features form validation, loading states, and success confirmation.
// =============================================================================

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Link, 
  Paper,
  CircularProgress,
  useTheme,
  alpha,
  Avatar,
  Alert
} from '@mui/material';
import { 
  LockReset as LockResetIcon, 
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

/**
 * Forgot Password Component
 * 
 * Provides functionality for users to reset their password 
 * by receiving reset instructions via email. The component
 * handles email validation, request submission, and displays
 * appropriate feedback to the user.
 */
const ForgotPassword = () => {
  // =========================================================================
  // Hooks and State
  // =========================================================================
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Form state
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false); // Controls loading indicator
  const [isSubmitted, setIsSubmitted] = useState(false); // Controls view switching

  // =========================================================================
  // Styles
  // =========================================================================
  const styles = {
    // Container styles
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFFFFF',
      py: 6
    },
    
    // Card styles
    cardBase: {
      p: 4,
      borderRadius: 3,
      background: '#FFFFFF',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
    },
    
    // Content styles
    cardContent: {
      position: 'relative', 
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    // Input styles
    inputField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 2
      },
      mb: 2
    },
    
    // Button styles
    primaryButton: {
      mt: 2,
      mb: 3,
      py: 1.5,
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textTransform: 'none',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)'
      }
    },
    
    // Secondary button styles
    secondaryButton: {
      borderRadius: 2,
      py: 1,
      px: 2,
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }
    },
    
    // Logo styles
    appLogo: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      mb: 3
    },
    
    // Avatar styles
    avatarIcon: {
      m: 1,
      width: 64,
      height: 64,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      mb: 2
    }
  };

  // =========================================================================
  // Form Handlers
  // =========================================================================
  
  /**
   * Handles email input changes
   * Updates email state and clears error state when user types
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear any previous errors
  };

  /**
   * Validates email format
   * Sets appropriate error messages if validation fails
   * 
   * @returns {boolean} - True if valid, false otherwise
   */
  const validateEmail = () => {
    // Check for empty email
    if (!email) {
      setError('Email is required');
      return false;
    } 
    
    // Check for valid email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Email is invalid');
      return false;
    }
    
    return true;
  };

  /**
   * Handles form submission
   * Validates email and simulates sending reset instructions
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateEmail()) {
      setIsLoading(true);
      
      // Simulate API call for password reset
      // In a real app, this would be an API call to backend
      setTimeout(() => {
        console.log(`Password reset email sent to: ${email}`);
        setIsLoading(false);
        setIsSubmitted(true); // Show success confirmation
      }, 1500); // Simulate network delay
    }
  };

  /**
   * Resets the form to try with another email
   */
  const handleTryAnotherEmail = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
  };

  // =========================================================================
  // Render Helper Components
  // =========================================================================
  
  /**
   * Renders the application logo component
   * 
   * @returns {React.ReactNode} - Logo component
   */
  const AppLogo = () => (
    <Box sx={styles.appLogo}>
      <Typography
        variant="h3"
        fontWeight="800"
        sx={{ 
          color: theme.palette.primary.main,
          letterSpacing: '-0.5px',
          mb: 1
        }}
      >
        Family Folio
      </Typography>
    </Box>
  );

  /**
   * Renders the request form for password reset
   * 
   * @returns {React.ReactNode} - Request form view
   */
  const RequestFormView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* App Logo */}
      <AppLogo />
      
      {/* Lock Reset Icon */}
      <Avatar
        sx={{
          ...styles.avatarIcon,
          bgcolor: theme.palette.info.main,
        }}
      >
        <LockResetIcon sx={{ fontSize: 30 }} />
      </Avatar>
      
      {/* Page Title */}
      <Typography
        component="h1"
        variant="h4"
        fontWeight="600"
        sx={{ mb: 0.5 }}
      >
        Forgot Password?
      </Typography>
      
      {/* Subtitle */}
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Enter your email and we'll send you instructions to reset your password
      </Typography>
      
      {/* Password Reset Request Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%' }}
      >
        {/* Email Field */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmailChange}
          error={Boolean(error)}
          helperText={error}
          variant="outlined"
          sx={styles.inputField}
          InputProps={{
            startAdornment: (
              <EmailIcon color="action" sx={{ mr: 1 }} />
            ),
          }}
        />
        
        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={styles.primaryButton}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Reset Password"
          )}
        </Button>
        
        {/* Back to Login Link */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            component={RouterLink}
            to="/login"
            variant="text"
            color="inherit"
            startIcon={<ArrowBackIcon />}
            sx={styles.secondaryButton}
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );

  /**
   * Renders the success confirmation after form submission
   * 
   * @returns {React.ReactNode} - Success view
   */
  const SuccessView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* App Logo */}
      <AppLogo />
      
      {/* Success Icon */}
      <Avatar
        sx={{
          ...styles.avatarIcon,
          bgcolor: theme.palette.success.main,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 30 }} />
      </Avatar>
      
      {/* Success Title */}
      <Typography
        component="h1"
        variant="h4"
        fontWeight="600"
        sx={{ mb: 0.5 }}
      >
        Check Your Email
      </Typography>
      
      {/* Success Message */}
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        We've sent instructions to reset your password to:
      </Typography>
      
      {/* Email Alert */}
      <Alert 
        severity="success"
        sx={{ 
          mb: 3, 
          borderRadius: 2, 
          width: '100%',
          alignItems: 'center'
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium">
          {email}
        </Typography>
      </Alert>
      
      {/* Additional Instructions */}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        If you don't see the email in your inbox, please check your spam folder or try again.
      </Typography>
      
      {/* Return to Login Button */}
      <Button
        component={RouterLink}
        to="/login"
        variant="contained"
        size="large"
        startIcon={<ArrowBackIcon />}
        sx={styles.primaryButton}
      >
        Return to Login
      </Button>
      
      {/* Try Another Email Button */}
      <Button
        onClick={handleTryAnotherEmail}
        variant="text"
        color="primary"
        size="small"
        sx={{ mt: 2 }}
      >
        Try another email
      </Button>
    </Box>
  );

  // =========================================================================
  // Component Render
  // =========================================================================
  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={styles.cardBase}>
          <Box sx={styles.cardContent}>
            {/* Conditional Rendering Based on Submission State */}
            {!isSubmitted ? <RequestFormView /> : <SuccessView />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;