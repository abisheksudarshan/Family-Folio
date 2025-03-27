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
  FormHelperText,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
        py: 12
      }}
    >
      <Container maxWidth="xs">
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
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          
          <Typography
            component="h1"
            variant="h4"
            fontWeight="600"
            sx={{ mb: 0.5 }}
          >
            Welcome Back
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Sign in to Family Folio to manage your finances
          </Typography>
          
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            
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
              sx={{
                mb: 1,
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
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                color="primary"
                sx={{ textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
            
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
                sx={{ px: 2, bgcolor: 'background.paper' }}
              >
                Or continue with
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => console.log('Google login')}
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
                onClick={() => console.log('Apple login')}
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
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;