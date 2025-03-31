// src/pages/Register.js
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Link, 
  Paper, 
  Grid,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider,
  useTheme,
  alpha,
  Avatar
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  PersonAdd as PersonAddIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Register Component
 * 
 * Provides user registration functionality with a multi-step form process
 * and social signup options (Google, Apple).
 */
const Register = () => {
  // =========================================================================
  // Hooks and State
  // =========================================================================
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Form state
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Registration steps
  const steps = ['Account Information', 'Security'];

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
      background: '#ffffff',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden'
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
      mb: 1
    },
    
    // Button styles
    primaryButton: {
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
      py: 1.5,
      px: 3,
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }
    },
    
    // Social media buttons
    socialButton: {
      borderRadius: 2,
      flex: 1,
      px: 2,
      py: 1.5,
      color: 'text.primary',
      borderColor: alpha('#000', 0.15),
      transition: 'all 0.3s ease',
      textTransform: 'none',
      '&:hover': {
        borderColor: alpha('#000', 0.3),
        bgcolor: alpha('#000', 0.05),
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }
    },
    
    // Stepper styles
    stepper: {
      width: '100%',
      '& .MuiStepLabel-root': {
        color: alpha(theme.palette.primary.main, 0.3),
      },
      '& .MuiStepLabel-active': {
        color: theme.palette.primary.main,
      },
      '& .MuiStepLabel-completed': {
        color: theme.palette.success.main,
      }
    }
  };

  // =========================================================================
  // Form Handlers
  // =========================================================================
  
  /**
   * Handles input field changes
   * Updates form state and clears field errors when user types
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  /**
   * Validates step 1 (account information) inputs
   * Returns true if valid, false otherwise
   */
  const validateStep1 = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validates step 2 (security) inputs
   * Returns true if valid, false otherwise
   */
  const validateStep2 = () => {
    const newErrors = {};
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles navigation to next step
   * Validates current step before proceeding
   */
  const handleNext = () => {
    if (activeStep === 0 && validateStep1()) {
      setActiveStep(1);
    }
  };

  /**
   * Handles navigation to previous step
   */
  const handleBack = () => {
    setActiveStep(0);
  };

  /**
   * Handles form submission
   * Performs validation and attempts registration if valid
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeStep === 1 && validateStep2()) {
      setIsLoading(true);
      try {
        // In a real app, you would make an API call to your backend
        // const response = await axios.post('http://localhost:8000/api/auth/register', formData);
        
        // For demonstration purposes, we'll simulate a successful registration
        setTimeout(() => {
          console.log('Registration successful', formData);
          
          // Option 1: Redirect to login page
          navigate('/login', { 
            state: { 
              registrationSuccess: true,
              email: formData.email 
            } 
          });
          
          // Option 2: Auto-login after registration
          // const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
          // const mockUser = {
          //   id: '1',
          //   firstName: formData.firstName,
          //   lastName: formData.lastName,
          //   email: formData.email
          // };
          // login(mockToken, mockUser);
          // navigate('/dashboard');
          
          setIsLoading(false);
        }, 1500); // Simulate network delay
      } catch (error) {
        console.error('Registration failed', error);
        setErrors({
          form: 'Registration failed. Please try again.'
        });
        setIsLoading(false);
      }
    }
  };

  /**
   * Toggles password visibility
   */
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Toggles confirm password visibility
   */
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // =========================================================================
  // Component Render
  // =========================================================================
  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="sm">
        {/* Main Card */}
        <Paper 
          elevation={0} 
          sx={{
            p: 4,
            borderRadius: 3,
            background: '#FFFFFF',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box sx={styles.cardContent}>
            {/* App Logo & Name */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 3 
              }}
            >
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
            
            {/* Avatar Icon */}
            <Avatar
              sx={{
                m: 1,
                bgcolor: theme.palette.secondary.main,
                width: 64,
                height: 64,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                mb: 2
              }}
            >
              <PersonAddIcon sx={{ fontSize: 30 }} />
            </Avatar>
            
            {/* Page Title */}
            <Typography
              component="h1"
              variant="h4"
              fontWeight="600"
              sx={{ mb: 0.5 }}
            >
              Create Account
            </Typography>
            
            {/* Subtitle */}
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Join Family Folio to start managing your finances
            </Typography>
            
            {/* Social Signup Section - Step 1 Only */}
            {activeStep === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  mb: 3
                }}
              >
                {/* Social Login Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    width: '100%',
                    mb: 3
                  }}
                >
                  {/* Google Signup */}
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => console.log('Google signup')}
                    startIcon={
                      <Box component="img" src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" sx={{ width: 20, height: 20 }} />
                    }
                    sx={styles.socialButton}
                  >
                    Google
                  </Button>
                  
                  {/* Apple Signup */}
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => console.log('Apple signup')}
                    startIcon={
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.96-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.71 3.35-4.92 0.21-9.82-1.96-14.7-6.52-3.18-2.73-7.16-7.42-11.94-14.08-5.12-7.22-9.32-15.6-12.6-25.14-3.6-10.39-5.4-20.45-5.4-30.19 0-11.16 2.41-20.8 7.23-28.88 3.78-6.54 8.79-11.66 15.13-15.37 6.31-3.71 13.1-5.61 20.41-5.82 4 0 9.45 1.24 16.37 3.64 6.91 2.42 11.37 3.64 13.38 3.64 1.47 0 6.44-1.43 14.9-4.29 7.99-2.64 14.74-3.74 20.25-3.31 14.97 1.19 26.22 7.07 33.76 17.67-13.4 8.11-20 19.52-19.84 34.15 0.14 11.39 4.23 20.87 12.27 28.39 3.68 3.47 7.76 6.16 12.3 8.05-0.99 2.88-2.04 5.63-3.17 8.28zM104.8 7.21c0 8.9-3.28 17.22-9.79 24.9-7.87 9.16-17.4 14.43-27.68 13.62-0.15-1.3-0.22-2.63-0.22-4 0-7.76 3.41-16.07 9.43-22.9 3-3.47 6.82-6.37 11.45-8.69 4.63-2.24 9.01-3.5 13.12-3.77 0.16 0.56 0.21 1.12 0.21 1.69z" fill="#000000"/>
                        </svg>
                      </Box>
                    }
                    sx={styles.socialButton}
                  >
                    Apple
                  </Button>
                </Box>
                
                {/* Divider with Text */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Divider sx={{ flex: 1 }} />
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ px: 2 }}
                  >
                    Or register with email
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>
              </Box>
            )}
            
            {/* Stepper Navigation */}
            <Stepper
              activeStep={activeStep}
              sx={{
                ...styles.stepper,
                mb: 4
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {/* Form Error Display */}
            {errors.form && (
              <Box
                sx={{
                  width: '100%',
                  p: 2,
                  mb: 2,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  borderRadius: 2,
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2">{errors.form}</Typography>
              </Box>
            )}
            
            {/* Registration Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%' }}
            >
              {/* Step 1: Personal Information Fields */}
              {activeStep === 0 ? (
                <Grid container spacing={2}>
                  {/* First Name Field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={formData.firstName}
                      onChange={handleChange}
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName}
                      variant="outlined"
                      sx={styles.inputField}
                    />
                  </Grid>
                  
                  {/* Last Name Field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName}
                      variant="outlined"
                      sx={styles.inputField}
                    />
                  </Grid>
                  
                  {/* Email Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      variant="outlined"
                      sx={styles.inputField}
                    />
                  </Grid>
                </Grid>
              ) : (
                /* Step 2: Security Fields */
                <Grid container spacing={2}>
                  {/* Password Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      error={Boolean(errors.password)}
                      helperText={errors.password || 'Password must be at least 8 characters long'}
                      variant="outlined"
                      sx={styles.inputField}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  
                  {/* Confirm Password Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={Boolean(errors.confirmPassword)}
                      helperText={errors.confirmPassword}
                      variant="outlined"
                      sx={styles.inputField}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleToggleConfirmPasswordVisibility}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              )}
              
              {/* Form Navigation Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 4,
                  mb: 2
                }}
              >
                {/* Back Button - Step 2 Only */}
                {activeStep === 1 && (
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    sx={styles.secondaryButton}
                  >
                    Back
                  </Button>
                )}
                
                {/* Spacer */}
                <Box sx={{ flex: activeStep === 0 ? '1 1 auto' : '0 0 auto' }} />
                
                {/* Next/Submit Button */}
                {activeStep === 0 ? (
                  /* Next Button for Step 1 */
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<CheckCircleOutlineIcon />}
                    size="large"
                    sx={styles.primaryButton}
                  >
                    Next
                  </Button>
                ) : (
                  /* Submit Button for Step 2 */
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    endIcon={isLoading ? null : <CheckCircleOutlineIcon />}
                    sx={{
                      ...styles.primaryButton,
                      px: 4,
                      minWidth: 120
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Register"
                    )}
                  </Button>
                )}
              </Box>
              
              {/* Sign In Link */}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="subtitle2"
                    color="primary"
                    fontWeight="600"
                    sx={{ textDecoration: 'none' }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;