// src/pages/NotFound.js
import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper,
  useTheme,
  alpha,
  Avatar
} from '@mui/material';
import { 
  Home as HomeIcon, 
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Reusable style objects - similar to Dashboard
  const styles = {
    // Container styles
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${alpha(theme.palette.grey[200], 0.6)} 0%, ${alpha(theme.palette.grey[300], 0.8)} 100%)`,
      py: 6
    },
    // Card styles
    cardBase: {
      p: 5,
      borderRadius: 3,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: 600,
      mx: 'auto',
      textAlign: 'center'
    },
    // Background decoration styles
    cardDecoration: {
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      zIndex: 0,
      overflow: 'hidden'
    },
    decorationCircle: (color) => ({
      position: 'absolute',
      top: -60,
      right: -60,
      width: 200,
      height: 200,
      borderRadius: '50%',
      backgroundColor: alpha(color, 0.08)
    }),
    // Content styles
    cardContent: {
      position: 'relative', 
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    // Button styles
    primaryButton: {
      mt: 4,
      py: 1.5,
      px: 3,
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textTransform: 'none',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)'
      }
    },
    secondaryButton: {
      mt: 2,
      borderRadius: 2,
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }
    }
  };

  return (
    <Box sx={styles.pageContainer}>
      <Container>
        <Paper elevation={0} sx={styles.cardBase}>
          {/* Decorative elements */}
          <Box sx={styles.cardDecoration}>
            <Box sx={styles.decorationCircle(theme.palette.primary.main)} />
            <Box sx={{
              ...styles.decorationCircle(alpha('#fff', 0.6)), 
              top: 'auto', 
              bottom: -60, 
              right: 'auto', 
              left: -60
            }} />
          </Box>
          
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
                  background: `linear-gradient(90deg, #4dabf5, #1565c0)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                  mb: 3
                }}
              >
                Family Folio
              </Typography>
            </Box>
            
            <Avatar
              sx={{
                bgcolor: alpha('#1976d2', 0.1),
                color: '#1976d2',
                width: 100,
                height: 100,
                mb: 3
              }}
            >
              <SentimentDissatisfiedIcon sx={{ fontSize: 60 }} />
            </Avatar>
            
            <Typography
              variant="h1"
              fontWeight="800"
              sx={{ 
                mb: 1,
                fontSize: { xs: '4rem', sm: '6rem' },
                background: `linear-gradient(90deg, #4dabf5, #1565c0)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              404
            </Typography>
            
            <Typography
              variant="h4"
              fontWeight="600"
              sx={{ mb: 2 }}
            >
              Page Not Found
            </Typography>
            
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
              sx={styles.primaryButton}
            >
              Back to Home
            </Button>
            
            <Button
              variant="text"
              color="inherit"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              sx={styles.secondaryButton}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;