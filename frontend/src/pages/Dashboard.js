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
  InputAdornment,
  useTheme,
  alpha
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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Dashboard = () => {
  const theme = useTheme();
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
      amount: -8250.45, 
      account: 'HDFC Checking',
      icon: <RestaurantIcon fontSize="small" />
    },
    { 
      id: 2, 
      date: '2025-03-20', 
      description: 'Monthly Rent', 
      category: 'housing', 
      amount: -35000.00, 
      account: 'ICICI Checking',
      icon: <HomeIcon fontSize="small" />
    },
    { 
      id: 3, 
      date: '2025-03-19', 
      description: 'Fuel Station', 
      category: 'transportation', 
      amount: -3875.75, 
      account: 'HDFC Credit Card',
      icon: <DirectionsCarIcon fontSize="small" />
    },
    { 
      id: 4, 
      date: '2025-03-19', 
      description: 'NIFTY ETF Purchase', 
      category: 'investment', 
      amount: -25000.00, 
      account: 'Zerodha Demat',
      icon: <BusinessIcon fontSize="small" />
    },
    { 
      id: 5, 
      date: '2025-03-18', 
      description: 'Salary Deposit', 
      category: 'income', 
      amount: 125000.00, 
      account: 'HDFC Salary',
      icon: <TrendingUpIcon fontSize="small" />
    },
    { 
      id: 6, 
      date: '2025-03-17', 
      description: 'Amazon Shopping', 
      category: 'shopping', 
      amount: -4580.50, 
      account: 'SBI Credit Card',
      icon: <ShoppingCartIcon fontSize="small" />
    },
    { 
      id: 7, 
      date: '2025-03-15', 
      description: 'Reliance Shares', 
      category: 'investment', 
      amount: -18500.00, 
      account: 'Zerodha Demat',
      icon: <BusinessIcon fontSize="small" />
    },
    { 
      id: 8, 
      date: '2025-03-14', 
      description: 'Dividend - HDFC Bank', 
      category: 'investment', 
      amount: 3250.00, 
      account: 'Zerodha Demat',
      icon: <BusinessIcon fontSize="small" />
    }
  ];

  // Sample quick stats
  const quickStats = [
    {
      label: "YTD Income",
      value: "₹42,350",
      change: "+12%",
      icon: <AddCircleIcon />,
      positive: true,
      color: theme.palette.success.main
    },
    {
      label: "YTD Expenses",
      value: "₹28,780",
      change: "-5%",
      icon: <RemoveCircleIcon />,
      positive: true,
      color: theme.palette.error.main
    },
    {
      label: "YTD Savings Rate",
      value: "32%",
      change: "+3%",
      icon: <SavingsIcon />,
      positive: true,
      color: theme.palette.info.main
    },
    {
      label: "Portfolio XIRR",
      value: "12.4%",
      change: "+1.8%",
      icon: <TrendingUpIcon />,
      positive: true,
      color: theme.palette.primary.main
    }
  ];

  // Filter transactions based on tab and search query
  const filteredTransactions = recentTransactions.filter(transaction => {
    // Filter by tab
    if (transactionTab === 1 && transaction.amount < 0 && transaction.category !== 'investment') return true;
    if (transactionTab === 2 && transaction.amount > 0) return true;
    if (transactionTab === 3 && transaction.category === 'investment') return true;
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
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
  
  // Filter transactions based on type (for tab display)
  const getFilteredTransactions = (type) => {
    if (type === "expenses") {
      return recentTransactions.filter(t => t.amount < 0 && t.category !== 'investment');
    } else if (type === "income") {
      return recentTransactions.filter(t => t.amount > 0);
    } else if (type === "investments") {
      return recentTransactions.filter(t => t.category === 'investment');
    }
    return recentTransactions;
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ 
      backgroundColor: alpha(theme.palette.background.default, 0.7),
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        {/* Welcome Banner */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '50%', 
            height: '100%', 
            opacity: 0.1, 
            background: `radial-gradient(circle, ${theme.palette.common.white} 0%, transparent 70%)` 
          }} />
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'white', 
                    color: theme.palette.primary.main,
                    width: 64, 
                    height: 64, 
                    mr: 2,
                    fontSize: '1.75rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                    Welcome back, {user?.firstName || 'User'}!
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Here's a summary of your family finances
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
              <Typography variant="h5" fontWeight="bold">
                {formatCurrency(totalNetWorth)}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Total Net Worth
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Quick Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2.5, 
                  height: '100%', 
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.1),
                  backgroundColor: alpha(stat.color, 0.05),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${alpha(stat.color, 0.15)}`
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(stat.color, 0.1),
                      color: stat.color,
                      width: 40,
                      height: 40
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ ml: 'auto' }}>
                    <Chip
                      label={stat.change}
                      size="small"
                      icon={stat.positive ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                      sx={{
                        bgcolor: alpha(stat.positive ? theme.palette.success.main : theme.palette.error.main, 0.1),
                        color: stat.positive ? theme.palette.success.main : theme.palette.error.main,
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Grid container spacing={4}>
          {/* Left Column - Financial Overview */}
          <Grid item xs={12} md={8}>
            {/* Family Portfolio Summary */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1), 
                      color: theme.palette.primary.main,
                      mr: 2
                    }}
                  >
                    <AccountBalanceIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Family Portfolio
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  startIcon={<AssessmentIcon />}
                  onClick={() => navigate('/portfolio-analytics')}
                  sx={{ 
                    borderRadius: 2,
                    px: 2
                  }}
                >
                  Analytics
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell align="right">Assets</TableCell>
                      <TableCell align="right">Liabilities</TableCell>
                      <TableCell align="right">Net Worth</TableCell>
                      <TableCell align="right">Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {familyMembers.map((member) => (
                      <TableRow key={member.id} sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.03) },
                        transition: 'background-color 0.2s'
                      }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                mr: 1.5, 
                                bgcolor: alpha(theme.palette.primary.main, 0.1), 
                                color: theme.palette.primary.main,
                                width: 36, 
                                height: 36, 
                                fontSize: '1rem' 
                              }}
                            >
                              {member.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body1" fontWeight="medium">{member.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{member.role}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{formatCurrency(member.assets)}</TableCell>
                        <TableCell align="right">{formatCurrency(member.liabilities)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrency(member.netWorth)}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            icon={member.portfolioPerformance >= 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                            label={`${member.portfolioPerformance.toFixed(1)}%`}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(member.portfolioPerformance >= 0 ? theme.palette.success.main : theme.palette.error.main, 0.1),
                              color: member.portfolioPerformance >= 0 ? theme.palette.success.main : theme.palette.error.main,
                              fontWeight: 'bold',
                              borderRadius: 1
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            
            {/* Recent Transactions */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.secondary.main, 0.1), 
                      color: theme.palette.secondary.main,
                      mr: 2
                    }}
                  >
                    <PaymentsIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Transactions
                  </Typography>
                </Box>
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
                  sx={{ 
                    width: 200,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Box>
              
              <Tabs 
                value={transactionTab} 
                onChange={handleTransactionTabChange} 
                sx={{ 
                  mb: 2,
                  '& .MuiTab-root': {
                    minWidth: 80,
                    borderRadius: 2,
                    mx: 0.5
                  },
                  '& .Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main
                  }
                }}
                TabIndicatorProps={{
                  style: { display: 'none' }
                }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="All" />
                <Tab label="Expenses" />
                <Tab label="Income" />
                <Tab label="Investments" />
              </Tabs>
              
              <List sx={{ 
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                borderRadius: 2
              }}>
                {filteredTransactions.map((transaction) => (
                  <ListItem 
                    key={transaction.id}
                    divider
                    sx={{ 
                      borderRadius: 2,
                      mb: 1,
                      '&:last-child': {
                        mb: 0
                      },
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.03)
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(transaction.amount >= 0 ? theme.palette.success.main : theme.palette.error.main, 0.1),
                          color: transaction.amount >= 0 ? theme.palette.success.main : theme.palette.error.main
                        }}
                      >
                        {transaction.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {transaction.description}
                        </Typography>
                      }
                      secondary={`${formatDate(transaction.date)} • ${transaction.account}`}
                    />
                    <ListItemSecondaryAction sx={{ right: 16, display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color={transaction.amount >= 0 ? 'success.main' : 'error.main'}
                        sx={{ mr: 2 }}
                      >
                        {transaction.amount >= 0 ? '+' : ''}₹{Math.abs(transaction.amount).toFixed(2)}
                      </Typography>
                      <IconButton edge="end" size="small">
                        <MoreHorizIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/transactions')}
                  endIcon={<MoreHorizIcon />}
                  sx={{ 
                    borderRadius: 2,
                    px: 3
                  }}
                >
                  View All Transactions
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Right Column - Financial Details */}
          <Grid item xs={12} md={4}>
            {/* Net Worth Overview */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1), 
                      color: theme.palette.primary.main,
                      mr: 2
                    }}
                  >
                    <AccountBalanceWalletIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Net Worth
                  </Typography>
                </Box>
                <IconButton 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main
                  }}
                  onClick={() => navigate('/net-worth')}
                >
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, color: theme.palette.primary.main }}>
                {formatCurrency(totalNetWorth)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Total Family Net Worth
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" color="text.secondary">
                    Assets
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    {formatCurrency(totalAssets)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="text.secondary">
                    Liabilities
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="error.main">
                    {formatCurrency(totalLiabilities)}
                  </Typography>
                </Grid>
              </Grid>
              
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => navigate('/net-worth')}
                sx={{ 
                  mt: 3,
                  borderRadius: 2,
                  py: 1.5
                }}
              >
                View Detailed Breakdown
              </Button>
            </Paper>
            
            {/* Budget Status */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1)
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.warning.main, 0.1), 
                      color: theme.palette.warning.main,
                      mr: 2
                    }}
                  >
                    <ReceiptIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Budget Status
                  </Typography>
                </Box>
                <IconButton 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main
                  }}
                  onClick={() => navigate('/budget')}
                >
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                72% Used
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                $3,580 of $5,000 monthly budget
              </Typography>
              
              {/* Budget categories status */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" fontWeight="medium">Housing</Typography>
                  <Typography variant="body2" color="error.main" fontWeight="bold">105%</Typography>
                </Box>
                <Box 
                  sx={{ 
                    height: 8, 
                    bgcolor: alpha(theme.palette.error.main, 0.1), 
                    borderRadius: 4,
                    mb: 2
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: '105%', 
                      bgcolor: theme.palette.error.main, 
                      borderRadius: 4 
                    }} 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" fontWeight="medium">Food & Dining</Typography>
                  <Typography variant="body2" color="warning.main" fontWeight="bold">85%</Typography>
                </Box>
                <Box 
                  sx={{ 
                    height: 8, 
                    bgcolor: alpha(theme.palette.warning.main, 0.1), 
                    borderRadius: 4,
                    mb: 2
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: '85%', 
                      bgcolor: theme.palette.warning.main, 
                      borderRadius: 4 
                    }} 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" fontWeight="medium">Transportation</Typography>
                  <Typography variant="body2" color="success.main" fontWeight="bold">60%</Typography>
                </Box>
                <Box 
                  sx={{ 
                    height: 8, 
                    bgcolor: alpha(theme.palette.success.main, 0.1), 
                    borderRadius: 4,
                    mb: 2
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: '60%', 
                      bgcolor: theme.palette.success.main, 
                      borderRadius: 4 
                    }} 
                  />
                </Box>
              </Box>
              
              <Button 
                variant="outlined" 
                fullWidth 
                color="warning"
                onClick={() => navigate('/budget')}
                sx={{ 
                  mt: 1,
                  borderRadius: 2,
                  py: 1.5
                }}
              >
                Adjust Budget
              </Button>
            </Paper>
            
            {/* Quick Actions */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1)
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper 
                    elevation={0}
                    onClick={() => navigate('/transactions')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-2px)'
                      }
                    }}
                    >
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        m: '0 auto 8px auto',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main
                      }}
                    >
                      <PaymentsIcon />
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                      Add Transaction
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper 
                    elevation={0}
                    onClick={() => navigate('/goals')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.success.main, 0.05),
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        m: '0 auto 8px auto',
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main
                      }}
                    >
                      <TrendingUpIcon />
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                      Track Goals
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper 
                    elevation={0}
                    onClick={() => navigate('/bills')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.warning.main, 0.05),
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        m: '0 auto 8px auto',
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main
                      }}
                    >
                      <ReceiptIcon />
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                      Manage Bills
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper 
                    elevation={0}
                    onClick={() => navigate('/reports')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.info.main, 0.05),
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        m: '0 auto 8px auto',
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        color: theme.palette.info.main
                      }}
                    >
                      <AssessmentIcon />
                    </Avatar>
                    <Typography variant="body2" fontWeight="medium">
                      View Reports
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;