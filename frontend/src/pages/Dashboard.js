// src/pages/Dashboard.js
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  Grid, 
  Divider, 
  Avatar, 
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // Use the logout function from AuthContext
    logout();
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 56, 
                    height: 56, 
                    mr: 2,
                    fontSize: '1.5rem' 
                  }}
                >
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography component="h1" variant="h4">
                    Welcome, {user?.firstName || 'User'}!
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {user?.email || 'user@example.com'}
                  </Typography>
                </Box>
              </Box>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              Welcome to Family Folio! This is your personal finance dashboard where you can track investments, expenses, monthly inflow and outflow.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your financial journey starts here. The complete dashboard is coming soon.
            </Typography>
          </Paper>
        </Grid>
        
        {/* Placeholder Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              avatar={<AccountBalanceWalletIcon color="primary" />}
              title="Portfolio Balance"
            />
            <CardContent>
              <Typography variant="h4" component="div">
                $0.00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your investments and see your portfolio grow over time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              avatar={<TrendingUpIcon color="primary" />}
              title="Monthly Savings"
            />
            <CardContent>
              <Typography variant="h4" component="div">
                $0.00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your savings progress towards your financial goals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              avatar={<ReceiptIcon color="primary" />}
              title="Recent Expenses"
            />
            <CardContent>
              <Typography variant="h4" component="div">
                $0.00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor your spending patterns to optimize your budget.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Coming Soon Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Coming Soon
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1">
              We're working on exciting features for Family Folio:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li">Expense tracking and categorization</Typography>
              <Typography component="li">Investment portfolio analytics</Typography>
              <Typography component="li">Goal setting and progress tracking</Typography>
              <Typography component="li">Budget planning tools</Typography>
              <Typography component="li">Weekly financial reports</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;