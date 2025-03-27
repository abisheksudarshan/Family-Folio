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
  alpha
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const steps = ['Account Information', 'Security'];

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateStep1()) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
        py: 6
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: theme.palette.secondary.main,
              width: 56,
              height: 56,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <PersonAddIcon fontSize="large" />
          </Avatar>
          
          <Typography
            component="h1"
            variant="h4"
            fontWeight="600"
            sx={{ mb: 0.5 }}
          >
            Create Account
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Join Family Folio to start managing your finances
          </Typography>
          
          <Box sx={{ width: '100%', mb: 4 }}>
            {activeStep === 0 && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    mb: 3
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 2,
                      width: '100%',
                      mb: 3
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => console.log('Google signup')}
                      startIcon={
                        <Box component="img" src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" sx={{ width: 20, height: 20 }} />
                      }
                      sx={{ 
                        borderRadius: 2,
                        flex: 1,
                        px: 2,
                        py: 1.5,
                        color: 'text.primary',
                        borderColor: alpha('#000', 0.2),
                        '&:hover': {
                          borderColor: alpha('#000', 0.3),
                          bgcolor: alpha('#000', 0.05)
                        }
                      }}
                    >
                      Google
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => console.log('Apple signup')}
                      startIcon={
                        <Box component="img" src="https://cdn.cdnlogo.com/logos/a/10/apple.svg" sx={{ width: 20, height: 20 }} />
                      }
                      sx={{ 
                        borderRadius: 2,
                        flex: 1,
                        px: 2,
                        py: 1.5,
                        color: 'text.primary',
                        borderColor: alpha('#000', 0.2),
                        '&:hover': {
                          borderColor: alpha('#000', 0.3),
                          bgcolor: alpha('#000', 0.05)
                        }
                      }}
                    >
                      Apple
                    </Button>
                  </Box>
                  
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
                      sx={{ px: 2, bgcolor: 'background.paper' }}
                    >
                      Or register with email
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                  </Box>
                </Box>
              </>
            )}
            <Stepper
              activeStep={activeStep}
              sx={{
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
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          
          {errors.form && (
            <Box
              sx={{
                width: '100%',
                p: 2,
                mb: 2,
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: theme.palette.error.main,
                borderRadius: 1,
                textAlign: 'center'
              }}
            >
              <Typography variant="body2">{errors.form}</Typography>
            </Box>
          )}
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
          >
            {activeStep === 0 ? (
              <Grid container spacing={2}>
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
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
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 4,
                mb: 2
              }}
            >
              {activeStep === 1 && (
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    px: 3
                  }}
                >
                  Back
                </Button>
              )}
              <Box sx={{ flex: activeStep === 0 ? '1 1 auto' : '0 0 auto' }} />
              {activeStep === 0 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<CheckCircleOutlineIcon />}
                  size="large"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  endIcon={isLoading ? null : <CheckCircleOutlineIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
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
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;