// src/pages/Login.js
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
  CircularProgress,
  Divider,
  useTheme,
  alpha,
  Avatar
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Login Component
 * 
 * Provides user authentication functionality with email/password
 * and social media login options (Google, Apple).
 */
const Login = () => {
  // =========================================================================
  // Hooks and State
  // =========================================================================
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
   * Validates form inputs before submission
   * Returns true if valid, false otherwise
   */
  const validate = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Performs validation and attempts login if valid
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      try {
        // In a real app, you would make an API call to your backend
        // const response = await axios.post('http://localhost:8000/api/auth/login', formData);
        // const { token, user } = response.data;
        
        // For demonstration, we'll simulate a successful login after a short delay
        setTimeout(() => {
          // Simulate a JWT token
          const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
          
          // Mock user data
          const mockUser = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: formData.email
          };
          
          // Store in context and localStorage (via context)
          login(mockToken, mockUser);
          
          // Redirect to dashboard
          navigate('/dashboard');
          setIsLoading(false);
        }, 1000); // Simulate network delay
      } catch (error) {
        console.error('Login failed', error);
        setErrors({
          form: 'Invalid email or password'
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

  // =========================================================================
  // Component Render
  // =========================================================================
  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="xs">
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
                bgcolor: theme.palette.primary.main,
                width: 64,
                height: 64,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                mb: 2
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 30 }} />
            </Avatar>
            
            {/* Page Title */}
            <Typography
              component="h1"
              variant="h4"
              fontWeight="600"
              sx={{ mb: 0.5 }}
            >
              Welcome Back
            </Typography>
            
            {/* Subtitle */}
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Sign in to Family Folio to manage your finances
            </Typography>
            
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
            
            {/* Login Form */}
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
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                variant="outlined"
                sx={styles.inputField}
              />
              
              {/* Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
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
              
              {/* Forgot Password Link */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: 'none', fontWeight: 'medium' }}
                >
                  Forgot password?
                </Link>
              </Box>
              
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
                  "Sign In"
                )}
              </Button>
              
              {/* Divider */}
              <Box
                sx={{
                  position: 'relative',
                  mt: 1,
                  mb: 4,
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
                  Or continue with
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>
              
              {/* Social Login Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                {/* Google Login */}
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => console.log('Google login')}
                  startIcon={
                    <Box component="img" src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" sx={{ width: 20, height: 20 }} />
                  }
                  sx={styles.socialButton}
                >
                  Google
                </Button>
                
                {/* Apple Login */}
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => console.log('Apple login')}
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
              
              {/* Sign Up Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="subtitle2"
                    color="primary"
                    fontWeight="600"
                    sx={{ textDecoration: 'none' }}
                  >
                    Sign Up
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

export default Login;