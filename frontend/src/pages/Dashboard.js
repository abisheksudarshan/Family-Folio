// src/pages/Dashboard.js
import React, { useState } from 'react';
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
  CardHeader,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BusinessIcon from '@mui/icons-material/Business';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [transactionTab, setTransactionTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - Family members with their portfolios
  const familyMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Parent',
      assets: 452000,
      liabilities: 215000,
      netWorth: 237000,
      portfolioPerformance: 8.3
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'Parent',
      assets: 385000,
      liabilities: 143000,
      netWorth: 242000,
      portfolioPerformance: 7.2
    },
    {
      id: 3,
      name: 'Alex Doe',
      role: 'Child',
      assets: 15000,
      liabilities: 0,
      netWorth: 15000,
      portfolioPerformance: 5.4
    }
  ];

  // Sample transaction data
  const recentTransactions = [
    { 
      id: 1, 
      date: '2025-03-21', 
      description: 'Grocery Store', 
      category: 'food', 
      amount: -120.45, 
      account: 'Chase Checking',
      icon: <RestaurantIcon fontSize="small" />
    },
    { 
      id: 2, 
      date: '2025-03-20', 
      description: 'Monthly Rent', 
      category: 'housing', 
      amount: -1500.00, 
      account: 'Bank of America Checking',
      icon: <HomeIcon fontSize="small" />
    },
    { 
      id: 3, 
      date: '2025-03-19', 
      description: 'Gas Station', 
      category: 'transportation', 
      amount: -45.75, 
      account: 'Chase Credit Card',
      icon: <DirectionsCarIcon fontSize="small" />
    },
    { 
      id: 4, 
      date: '2025-03-19', 
      description: 'Stock Purchase - AAPL', 
      category: 'investment', 
      amount: -1000.00, 
      account: 'Vanguard Brokerage',
      icon: <BusinessIcon fontSize="small" />
    },
    { 
      id: 5, 
      date: '2025-03-18', 
      description: 'Salary Deposit', 
      category: 'income', 
      amount: 3200.00, 
      account: 'Chase Checking',
      icon: <TrendingUpIcon fontSize="small" />
    },
    { 
      id: 6, 
      date: '2025-03-17', 
      description: 'Online Shopping', 
      category: 'shopping', 
      amount: -87.50, 
      account: 'Amex Credit Card',
      icon: <ShoppingCartIcon fontSize="small" />
    }
  ];

  // Filter transactions based on tab and search query
  const filteredTransactions = recentTransactions.filter(transaction => {
    // Filter by tab
    if (transactionTab === 1 && transaction.amount < 0) return true;
    if (transactionTab === 2 && transaction.amount > 0) return true;
    if (transactionTab === 0) return true;
    
    // Filter by search
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Calculate total assets, liabilities, and net worth
  const totalAssets = familyMembers.reduce((sum, member) => sum + member.assets, 0);
  const totalLiabilities = familyMembers.reduce((sum, member) => sum + member.liabilities, 0);
  const totalNetWorth = totalAssets - totalLiabilities;

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle transaction tab change
  const handleTransactionTabChange = (event, newValue) => {
    setTransactionTab(newValue);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
              Welcome to Family Folio! Track your family's finances, investments, expenses, and financial goals all in one place.
            </Typography>
          </Paper>
        </Grid>
        
        {/* Financial Overview Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              avatar={<AccountBalanceWalletIcon color="primary" />}
              title="Total Net Worth"
            />
            <CardContent>
              <Typography variant="h4" component="div">
                {formatCurrency(totalNetWorth)}
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Assets: {formatCurrency(totalAssets)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Liabilities: {formatCurrency(totalLiabilities)}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }}
                onClick={() => navigate('/net-worth')}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              avatar={<TrendingUpIcon color="primary" />}
              title="Month-to-Date"
            />
            <CardContent>
              <Typography variant="h4" component="div" color="success.main">
                +$2,450
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Income: $5,230
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expenses: $2,780
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }}
                onClick={() => navigate('/expense-analytics')}
              >
                View Analysis
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              avatar={<ReceiptIcon color="primary" />}
              title="Budget Status"
            />
            <CardContent>
              <Typography variant="h4" component="div">
                72% Used
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  $3,580 of $5,000 monthly budget
                </Typography>
                <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                  Housing category over budget
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }}
                onClick={() => navigate('/budget')}
              >
                Adjust Budget
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Family Portfolio Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Family Portfolio Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Family Member</TableCell>
                    <TableCell align="right">Assets</TableCell>
                    <TableCell align="right">Liabilities</TableCell>
                    <TableCell align="right">Net Worth</TableCell>
                    <TableCell align="right">Performance (YTD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {familyMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.9rem' }}>
                            {member.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">{member.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{member.role}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{formatCurrency(member.assets)}</TableCell>
                      <TableCell align="right">{formatCurrency(member.liabilities)}</TableCell>
                      <TableCell align="right">{formatCurrency(member.netWorth)}</TableCell>
                      <TableCell align="right">
                        <Chip 
                          icon={member.portfolioPerformance >= 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                          label={`${member.portfolioPerformance.toFixed(1)}%`}
                          color={member.portfolioPerformance >= 0 ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                size="small"
                onClick={() => navigate('/portfolio-analytics')}
              >
                View Portfolio Details
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Recent Transactions
              </Typography>
              <TextField 
                placeholder="Search transactions"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 250 }}
              />
            </Box>
            
            <Tabs value={transactionTab} onChange={handleTransactionTabChange} sx={{ mb: 2 }}>
              <Tab label="All" />
              <Tab label="Expenses" />
              <Tab label="Income" />
            </Tabs>
            
            <List>
              {filteredTransactions.map((transaction) => (
                <ListItem 
                  key={transaction.id}
                  divider
                  secondaryAction={
                    <IconButton edge="end">
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: transaction.amount >= 0 ? 'success.light' : 'error.light' }}>
                      {transaction.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={transaction.description}
                    secondary={`${formatDate(transaction.date)} • ${transaction.account}`}
                  />
                  <ListItemSecondaryAction sx={{ right: 40 }}>
                    <Typography
                      variant="body2"
                      color={transaction.amount >= 0 ? 'success.main' : 'error.main'}
                      fontWeight="medium"
                    >
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => navigate('/transactions')}
              >
                View All Transactions
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;