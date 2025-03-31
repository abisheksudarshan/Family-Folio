// src/pages/Dashboard.js
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Divider, 
  Avatar, 
  Tabs,
  Tab,
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
  alpha,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PaidIcon from '@mui/icons-material/Paid';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InvestmentIcon from '@mui/icons-material/Savings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import DiamondIcon from '@mui/icons-material/Diamond';
import PublicIcon from '@mui/icons-material/Public';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import LanguageIcon from '@mui/icons-material/Language';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CategoryIcon from '@mui/icons-material/Category';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // ============================================================
  // COMMON STYLES - Reusable style objects
  // ============================================================
  const styles = {
    // Container styles
    pageContainer: {
      p: 3, 
      backgroundColor: alpha(theme.palette.background.default, 0.7),
      maxWidth: 1200,
      mx: 'auto'
    },
    // Card styles
    cardBase: {
      p: 3, 
      borderRadius: 3,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHover: {
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
      }
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
      top: -30,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: '50%',
      backgroundColor: alpha(color, 0.15)
    }),
    // Header and content styles
    cardHeader: {
      display: 'flex', 
      alignItems: 'center', 
      mb: 3
    },
    cardContent: {
      position: 'relative', 
      zIndex: 1
    },
    // Avatar styles
    headerAvatar: (color) => ({ 
      bgcolor: alpha(color, 0.1),
      color: color,
      mr: 2
    }),
    // Chip styles
    statusChip: (positive) => ({
      bgcolor: alpha(positive ? theme.palette.success.main : theme.palette.error.main, 0.1),
      color: positive ? theme.palette.success.main : theme.palette.error.main,
      fontWeight: 'medium'
    })
  };

  // ============================================================
  // STATE DEFINITIONS - Grouped by feature
  // ============================================================
  
  // Visibility and view states
  const [hideBalances, setHideBalances] = useState(false);
  const [portfolioView, setPortfolioView] = useState('family'); // 'family' or 'asset'
  const [marketView, setMarketView] = useState('tickers'); // 'tickers' or 'news'
  
  // Transaction filtering states
  const [transactionTab, setTransactionTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Market data states
  const [stockTickers, setStockTickers] = useState([
    { symbol: 'SPY', name: 'S&P 500 ETF', price: 598.42, change: 1.24, sparkline: [590, 592, 588, 594, 598], icon: <MonetizationOnIcon /> },
    { symbol: 'NDAQ', name: 'Nasdaq Composite', price: 16483.05, change: -0.86, sparkline: [16550, 16520, 16490, 16470, 16483], icon: <LanguageIcon /> },
    { symbol: 'NIFTY50', name: 'Nifty 50', price: 24825.80, change: 0.76, sparkline: [24600, 24700, 24750, 24800, 24825], icon: <CurrencyRupeeIcon /> },
    { symbol: 'NIFTYMID150', name: 'Nifty Midcap 150', price: 18723.45, change: 1.05, sparkline: [18500, 18550, 18600, 18700, 18723], icon: <ShowChartIcon /> },
    { symbol: 'NIFTYSML250', name: 'Nifty Smallcap 250', price: 9875.32, change: -0.45, sparkline: [9900, 9890, 9870, 9860, 9875], icon: <EqualizerIcon /> }
  ]);
  const [newTickerInput, setNewTickerInput] = useState('');

  // ============================================================
  // SAMPLE DATA - All mock data grouped together
  // ============================================================
  
  // Sample data - Family members with their portfolios
  const familyMembers = [
    {
      id: 1,
      name: 'Raj',
      role: 'Parent',
      assets: 452000,
      liabilities: 215000,
      netWorth: 237000,
      portfolioPerformance: 8.3
    },
    {
      id: 2,
      name: 'Meera',
      role: 'Parent',
      assets: 385000,
      liabilities: 143000,
      netWorth: 242000,
      portfolioPerformance: 7.2
    },
    {
      id: 3,
      name: 'Arjun',
      role: 'Child',
      assets: 15000,
      liabilities: 0,
      netWorth: 15000,
      portfolioPerformance: 5.4
    },
    {
      id: 4,
      name: 'Anjali',
      role: 'Child',
      assets: 15000,
      liabilities: 0,
      netWorth: 15000,
      portfolioPerformance: 5.4
    }
  ];

  // Sample asset class data
  const assetClasses = [
    {
      id: 1,
      name: 'Bank Deposit',
      value: 245000,
      allocation: 28.4,
      performance: 3.5,
      icon: <AccountBalanceIcon />
    },
    {
      id: 2,
      name: 'Crypto',
      value: 75000,
      allocation: 8.7,
      performance: 12.8,
      icon: <CurrencyBitcoinIcon />
    },
    {
      id: 3,
      name: 'Indian Equity',
      value: 210000,
      allocation: 24.3,
      performance: 9.7,
      icon: <CurrencyRupeeIcon />
    },
    {
      id: 4,
      name: 'US Equity',
      value: 125000,
      allocation: 14.5,
      performance: 7.2,
      icon: <MonetizationOnIcon />
    },
    {
      id: 5,
      name: 'Mutual Funds',
      value: 105000,
      allocation: 12.2,
      performance: 8.5,
      icon: <BusinessIcon />
    },
    {
      id: 6,
      name: 'Jewels',
      value: 85000,
      allocation: 9.8,
      performance: 4.2,
      icon: <DiamondIcon />
    },
    {
      id: 7,
      name: 'Government Schemes',
      value: 18000,
      allocation: 2.1,
      performance: 6.8,
      icon: <AccountBalanceWalletIcon />
    }
  ];

  // Sample financial news
  const financialNews = [
    {
      id: 1,
      headline: "RBI Holds Key Interest Rates Steady for Fourth Consecutive Meeting",
      source: "Economic Times",
      time: "2 hours ago",
      summary: "The Reserve Bank of India maintained its repo rate at 6.5%, in line with market expectations. Governor highlighted inflation concerns while maintaining a positive outlook on economic growth.",
      impact: "Medium",
      category: "Central Bank"
    },
    {
      id: 2,
      headline: "US Fed Signals Possible Rate Cut in June Amid Cooling Inflation",
      source: "Bloomberg",
      time: "5 hours ago",
      summary: "Federal Reserve minutes indicate a growing consensus among officials to begin easing monetary policy, with markets pricing in a 70% probability of a June cut.",
      impact: "High",
      category: "Global Markets"
    },
    {
      id: 3,
      headline: "Tech Stocks Rally as AI Investment Boom Continues",
      source: "Financial Express",
      time: "Today, 10:45 AM",
      summary: "Major tech companies saw significant gains as quarterly results exceeded analyst expectations, primarily driven by strong AI-related revenue growth.",
      impact: "High",
      category: "Equity Markets"
    },
    {
      id: 4,
      headline: "Crude Oil Prices Drop 5% on Weakening Demand Outlook",
      source: "Reuters",
      time: "Yesterday",
      summary: "Oil futures declined sharply following reports of increased inventories and concerns about Chinese economic slowdown affecting global demand.",
      impact: "Medium",
      category: "Commodities"
    },
    {
      id: 5,
      headline: "Corporate Tax Reform Bill Passes Lower House, Aims to Simplify Structure",
      source: "Business Standard",
      time: "2 days ago",
      summary: "The proposed legislation could reduce effective tax rates for mid-sized companies by 2-3 percentage points while eliminating several exemptions.",
      impact: "Medium",
      category: "Regulation"
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
    }
  ];

  // Updated Quick Stats with dynamic calculations
  const quickStats = [
    {
      label: "YTD Income",
      value: "₹4,23,500",
      change: "+12%",
      icon: <AddCircleIcon />,
      positive: true,
      color: theme.palette.success.main,
      subLabel: "Avg. Monthly Income",
      subValue: "₹35,292",
      calculation: (value) => {
        const numericValue = 423500;
        return `₹${Math.round(numericValue/12).toLocaleString('en-IN')} (÷12)`;
      }
    },
    {
      label: "YTD Expenses",
      value: "₹2,87,800",
      change: "-5%",
      icon: <RemoveCircleIcon />,
      positive: false,
      color: theme.palette.error.main,
      subLabel: "Avg. Monthly Expense",
      subValue: "₹23,983",
      calculation: (value) => {
        const numericValue = 287800;
        return `₹${Math.round(numericValue/12).toLocaleString('en-IN')} (÷12)`;
      }
    },
    {
      label: "YTD Savings",
      value: "₹1,35,700",
      change: "+15%",
      icon: <SavingsIcon />,
      positive: true,
      color: theme.palette.info.main,
      subLabel: "Savings Rate",
      subValue: "32%",
      calculation: (value) => {
        const income = 423500;
        const expenses = 287800;
        const savingsRate = Math.round((income - expenses) / income * 100);
        return `${savingsRate}% (Income-Expenses)`;
      }
    },
    {
      label: "Portfolio Performance",
      value: "12.4%",
      change: "+1.8%",
      icon: <ShowChartIcon />,
      positive: true,
      color: theme.palette.primary.main,
      subLabel: "vs Benchmark",
      subValue: "11.2%",
      calculation: (value) => {
        const benchmarkValue = 11.2;
        return `${benchmarkValue}% (Nifty50)`;
      }
    }
  ];

  // Quick Actions
  const spendingAndBudgetActions = [
    {
      title: 'Expense Breakdown',
      description: 'Monitor monthly expenses',
      icon: <AccountBalanceWalletIcon />,
      route: '/expense-breakdown',
      color: theme.palette.info.main
    },
    {
      title: 'Bill Management',
      description: 'Track & manage recurring bills',
      icon: <ReceiptIcon />,
      route: '/bills-subscriptions',
      color: theme.palette.warning.main
    }
  ];

  const financialPlanningActions = [
    {
      title: 'Portfolio Breakdown',
      description: 'Analyze portfolio performance',
      icon: <BusinessIcon />,
      route: '/portfolio-breakdown',
      color: theme.palette.primary.main
    },
    {
      title: 'Financial Goals',
      description: 'Plan and track goals',
      icon: <SchoolIcon />,
      route: '/goals',
      color: theme.palette.success.main
    }
  ];

  // ============================================================
  // UTILITY FUNCTIONS - Helper functions for data and formatting
  // ============================================================
  
  // Calculation helpers
  const totalAssets = familyMembers.reduce((sum, member) => sum + member.assets, 0);
  const totalLiabilities = familyMembers.reduce((sum, member) => sum + member.liabilities, 0);
  const totalNetWorth = totalAssets - totalLiabilities;
  const totalAssetValue = assetClasses.reduce((sum, asset) => sum + asset.value, 0);

  // Format helpers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // ============================================================
  // EVENT HANDLERS - All event handling functions
  // ============================================================
  
  // Toggle balances visibility
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };

  // Toggle portfolio view (family vs asset class)
  const handlePortfolioViewChange = (event, newView) => {
    if (newView !== null) {
      setPortfolioView(newView);
    }
  };

  // Toggle market view (tickers vs news)
  const handleMarketViewChange = (event, newView) => {
    if (newView !== null) {
      setMarketView(newView);
    }
  };

  // Transaction and search handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTransactionTabChange = (event, newValue) => {
    setTransactionTab(newValue);
  };

  // Market ticker handlers
  const handleAddTicker = () => {
    if (newTickerInput.trim() !== '') {
      const newTicker = {
        symbol: newTickerInput.toUpperCase(),
        name: newTickerInput.toUpperCase(),
        price: (Math.random() * 1000 + 100).toFixed(2),
        change: (Math.random() * 4 - 2).toFixed(2),
        sparkline: [
          (Math.random() * 100 + 900).toFixed(2),
          (Math.random() * 100 + 900).toFixed(2),
          (Math.random() * 100 + 900).toFixed(2),
          (Math.random() * 100 + 900).toFixed(2),
          (Math.random() * 100 + 900).toFixed(2)
        ],
        icon: <ShowChartIcon />
      };
      setStockTickers([...stockTickers, newTicker]);
      setNewTickerInput('');
    }
  };

  const handleRemoveTicker = (symbolToRemove) => {
    setStockTickers(stockTickers.filter(ticker => ticker.symbol !== symbolToRemove));
  };

  // Filter transactions based on tab and search
  const filteredTransactions = recentTransactions.filter(transaction => {
    // Filter by tab
    if (transactionTab === 1 && transaction.amount > 0) return true;
    if (transactionTab === 2 && transaction.amount < 0 && transaction.category !== 'investment') return true;
    if (transactionTab === 3 && transaction.category === 'investment') return true;
    if (transactionTab === 0) return true;
      
    // Filter by search
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // ============================================================
  // COMPONENT FUNCTIONS - Break UI into logical sections
  // ============================================================

  // 1. Welcome Banner Component
  const renderWelcomeBanner = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        mb: 3, 
        background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white'
      }}
    >
      <Grid container spacing={2} alignItems="center">
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
                Financial snapshot of your family's wealth
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mr: 2 }}>
              {hideBalances ? '••••••••' : formatCurrency(totalNetWorth)}
            </Typography>
            <IconButton 
              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
              onClick={toggleBalancesVisibility}
              size="small"
            >
              {hideBalances ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.8, textAlign: 'right' }}>
            Total Net Worth
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  // 2. Quick Stats Component
  const renderQuickStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {quickStats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper 
            elevation={0}
            sx={{ 
              ...styles.cardBase,
              ...styles.cardHover,
              height: '100%'
            }}
          >
            <Box sx={styles.cardDecoration}>
              <Box sx={styles.decorationCircle(stat.color)} />
            </Box>
            
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    mr: 1.5, 
                    bgcolor: alpha(stat.color, 0.1),
                    color: stat.color
                  }}>
                    {stat.icon}
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {hideBalances && stat.label !== "Portfolio Performance" ? '••••••••' : stat.value}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" color="text.secondary">
                    {stat.subLabel}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {stat.calculation(stat.value)}
                  </Typography>
                </Box>
                
                <Chip 
                  icon={stat.positive ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  label={stat.change} 
                  size="small" 
                  sx={styles.statusChip(stat.positive)} 
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  // 3. Market Overview Component
  const renderMarketOverview = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        mb: 3,
        height: marketView === 'tickers' ? 'auto' : 500 // Fixed height for news view
      }}
    >
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={styles.headerAvatar(theme.palette.info.main)}
          >
            <PublicIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Market Overview
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ToggleButtonGroup
            value={marketView}
            exclusive
            onChange={handleMarketViewChange}
            aria-label="market view"
            size="small"
            sx={{ mr: 2 }}
          >
            <ToggleButton value="tickers" aria-label="tickers view">
              <ShowChartIcon sx={{ mr: 1 }} /> Tickers
            </ToggleButton>
            <ToggleButton value="news" aria-label="news view">
              <ArticleIcon sx={{ mr: 1 }} /> News
            </ToggleButton>
          </ToggleButtonGroup>
          
          <IconButton 
            color="primary"
            size="small"
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {marketView === 'tickers' ? renderMarketTickers() : renderMarketNews()}
    </Paper>
  );

  // 3.1 Market Tickers Component
  const renderMarketTickers = () => (
    <Box>
      {/* Ticker Search and Add */}
      <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
        <TextField
          placeholder="Add ticker symbol..."
          size="small"
          value={newTickerInput}
          onChange={(e) => setNewTickerInput(e.target.value)}
          sx={{ 
            width: 200,
            mr: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />
        <Button 
          variant="contained" 
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAddTicker}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          Add Ticker
        </Button>
      </Box>

      {/* Horizontal Scrollable Ticker Cards */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          pb: 1,
          height: 180, // Fixed height
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: 4,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
            }
          }
        }}
      >
        {stockTickers.map((ticker) => (
          <Card
            key={ticker.symbol}
            elevation={0}
            sx={{ 
              minWidth: 240,
              mr: 2,
              borderRadius: 2,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              flex: '0 0 auto',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      mr: 1.5, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1), 
                      color: theme.palette.primary.main 
                    }}
                  >
                    {ticker.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{ticker.symbol}</Typography>
                    <Typography variant="caption" color="text.secondary">{ticker.name}</Typography>
                  </Box>
                </Box>
                <IconButton 
                  size="small" 
                  onClick={() => handleRemoveTicker(ticker.symbol)}
                  sx={{ 
                    color: alpha(theme.palette.error.main, 0.8),
                    bgcolor: alpha(theme.palette.error.main, 0.05),
                    width: 24,
                    height: 24,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {ticker.price}
                </Typography>
                <Chip 
                  icon={ticker.change >= 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  label={`${ticker.change >= 0 ? '+' : ''}${ticker.change}%`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(ticker.change >= 0 ? theme.palette.success.main : theme.palette.error.main, 0.1),
                    color: ticker.change >= 0 ? theme.palette.success.main : theme.palette.error.main,
                    fontWeight: 'medium',
                    height: 24
                  }} 
                />
              </Box>
              
              {/* Enhanced line chart representation */}
              <Box sx={{ mt: 2, height: 45, position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  {/* Draw the area under the line with improved gradient */}
                  <defs>
                    <linearGradient id={`gradient-${ticker.symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop 
                        offset="0%" 
                        stopColor={ticker.change >= 0 ? theme.palette.success.main : theme.palette.error.main} 
                        stopOpacity="0.3" 
                      />
                      <stop 
                        offset="100%" 
                        stopColor={ticker.change >= 0 ? theme.palette.success.main : theme.palette.error.main} 
                        stopOpacity="0.05" 
                      />
                    </linearGradient>
                  </defs>
                  
                  {/* Enhanced grid lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke={alpha(theme.palette.divider, 0.2)} strokeWidth="0.5" strokeDasharray="1,1" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke={alpha(theme.palette.divider, 0.3)} strokeWidth="0.5" strokeDasharray="1,1" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke={alpha(theme.palette.divider, 0.2)} strokeWidth="0.5" strokeDasharray="1,1" />
                  
                  {/* Calculate smooth curve path based on data points */}
                  {(() => {
                    // Normalize data to fit the chart
                    const max = Math.max(...ticker.sparkline);
                    const min = Math.min(...ticker.sparkline) * 0.98; // Add a little padding
                    const range = max - min || 1;
                    
                    // Calculate points for the line
                    const points = ticker.sparkline.map((value, i) => {
                      const x = (i / (ticker.sparkline.length - 1)) * 100;
                      const y = 38 - ((value - min) / range) * 35;
                      return { x, y };
                    });
                    
                    // Create a smooth curve using bezier curves
                    let pathD = `M${points[0].x},${points[0].y}`;
                    
                    for (let i = 0; i < points.length - 1; i++) {
                      const x_mid = (points[i].x + points[i+1].x) / 2;
                      const y_mid = (points[i].y + points[i+1].y) / 2;
                      const cp_x1 = (x_mid + points[i].x) / 2;
                      const cp_x2 = (x_mid + points[i+1].x) / 2;
                      
                      pathD += ` Q${cp_x1},${points[i].y} ${x_mid},${y_mid}`;
                      pathD += ` Q${cp_x2},${points[i+1].y} ${points[i+1].x},${points[i+1].y}`;
                    }
                    
                    // Calculate area path (smooth curve + bottom enclosure)
                    const areaPath = `${pathD} L${points[points.length-1].x},38 L${points[0].x},38 Z`;
                    
                    // Calculate starting and ending points
                    const startY = points[0].y;
                    const endY = points[points.length-1].y;
                    
                    // Calculate line color - use a gradient if trend is inconsistent
                    const lineColor = ticker.change >= 0 ? theme.palette.success.main : theme.palette.error.main;
                    
                    return (
                      <>
                        {/* Area under the line with enhanced gradient */}
                        <path 
                          d={areaPath} 
                          fill={`url(#gradient-${ticker.symbol})`} 
                          stroke="none"
                          style={{ transition: 'all 0.3s ease' }}
                        />
                        
                        {/* The smooth curve line with enhanced styling */}
                        <path 
                          d={pathD} 
                          fill="none" 
                          stroke={lineColor} 
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ transition: 'all 0.3s ease' }}
                        />
                        
                        {/* Enhanced data points */}
                        <circle 
                          cx={points[0].x} 
                          cy={points[0].y} 
                          r="2" 
                          fill={lineColor}
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <circle 
                          cx={points[points.length-1].x} 
                          cy={points[points.length-1].y} 
                          r="2" 
                          fill={lineColor}
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        
                        {/* Visual indicator if end is higher or lower than start */}
                        {endY !== startY && (
                          <line 
                            x1={points[0].x} 
                            y1={points[0].y} 
                            x2={points[points.length-1].x} 
                            y2={points[points.length-1].y} 
                            stroke={alpha(lineColor, 0.2)} 
                            strokeWidth="0.8" 
                            strokeDasharray="1,1" 
                          />
                        )}
                      </>
                    );
                  })()}
                </svg>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  // 3.2 Market News Component
  const renderMarketNews = () => (
    <Box>
      {/* Financial News Feed */}
      <List 
        sx={{ 
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          borderRadius: 2,
          overflow: 'auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.02)',
          maxHeight: 400
        }}
      >
        {financialNews.map((news) => (
          <ListItem 
            key={news.id}
            divider
            sx={{ 
              py: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                transform: 'translateX(5px)'
              }
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{ 
                  bgcolor: news.impact === 'High' 
                    ? alpha(theme.palette.error.main, 0.1)
                    : news.impact === 'Medium'
                      ? alpha(theme.palette.warning.main, 0.1)
                      : alpha(theme.palette.info.main, 0.1),
                  color: news.impact === 'High' 
                    ? theme.palette.error.main
                    : news.impact === 'Medium'
                      ? theme.palette.warning.main
                      : theme.palette.info.main
                }}
              >
                {news.id <= 2 && <FiberNewIcon />}
                {news.id > 2 && <ArticleIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold">
                  {news.headline}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, pr: 9 }}>
                    {news.summary}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="caption" fontWeight="medium" sx={{ mr: 2 }}>
                      {news.source}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5 }} />
                      {news.time}
                    </Typography>
                    <Chip 
                      size="small" 
                      label={news.category} 
                      sx={{ 
                        height: 20,
                        fontSize: '0.65rem',
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        color: alpha(theme.palette.primary.main, 0.8)
                      }}
                    />
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction sx={{ right: 8, top: 16 }}>
              <Chip 
                label={`Impact: ${news.impact}`}
                size="small"
                sx={{ 
                  bgcolor: news.impact === 'High' 
                    ? alpha(theme.palette.error.main, 0.1)
                    : news.impact === 'Medium'
                      ? alpha(theme.palette.warning.main, 0.1)
                      : alpha(theme.palette.info.main, 0.1),
                  color: news.impact === 'High' 
                    ? theme.palette.error.main
                    : news.impact === 'Medium'
                      ? theme.palette.warning.main
                      : theme.palette.info.main,
                  fontWeight: 'medium'
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // 4. Financial Insights Row Component - contains Net Worth, Budget, and Quick Actions
  const renderFinancialInsights = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {/* Net Worth Breakdown */}
      <Grid item xs={12} md={4}>
        <Paper 
          elevation={0}
          sx={{ 
            ...styles.cardBase,
            height: '100%'
          }}
        >
          <Box sx={styles.cardDecoration}>
            <Box sx={{
              ...styles.cardDecoration,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`
            }} />
            <Box sx={styles.decorationCircle(theme.palette.primary.main)} />
          </Box>
          
          <Box sx={styles.cardContent}>
            <Box sx={styles.cardHeader}>
              <Avatar sx={styles.headerAvatar(theme.palette.primary.main)}>
                <AccountBalanceWalletIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Net Worth Breakdown
              </Typography>
            </Box>
            
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, color: theme.palette.primary.main }}>
              {hideBalances ? '••••••••' : formatCurrency(totalNetWorth)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Total Family Net Worth
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Assets
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    {hideBalances ? '••••••••' : formatCurrency(totalAssets)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.error.main, 0.1) }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Liabilities
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="error.main">
                    {hideBalances ? '••••••••' : formatCurrency(totalLiabilities)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Button 
              variant="contained" 
              fullWidth 
              onClick={() => navigate('/assets-liabilities')}
              sx={{ 
                mt: 3,
                borderRadius: 2,
                py: 1.5,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                textTransform: 'none'
              }}
            >
              View Detailed Breakdown
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Budget Status */}
      <Grid item xs={12} md={4}>
        <Paper 
          elevation={0}
          sx={{ 
            ...styles.cardBase,
            ...styles.cardHover,
            height: '100%'
          }}
        >
          <Box sx={styles.cardDecoration}>
            <Box sx={styles.decorationCircle(theme.palette.warning.main)} />
          </Box>
          
          <Box sx={styles.cardContent}>
            <Box sx={styles.cardHeader}>
              <Avatar sx={styles.headerAvatar(theme.palette.warning.main)}>
                <ReceiptIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Budget Status
              </Typography>
            </Box>

            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
              72% Used
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {hideBalances ? '••••••••' : "₹3,580"} of {hideBalances ? '••••••••' : "₹5,000"} monthly budget
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
                  mb: 2,
                  overflow: 'hidden'
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
                  mb: 2,
                  overflow: 'hidden'
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
                  mb: 2,
                  overflow: 'hidden'
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
              onClick={() => navigate('/expense-breakdown')}
              sx={{ 
                mt: 1,
                borderRadius: 2,
                py: 1.5,
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                textTransform: 'none'
              }}
            >
              Adjust Budget
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Quick Actions Container */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Spending & Budget Actions */}
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                ...styles.cardBase,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={styles.cardDecoration}>
                <Box sx={styles.decorationCircle(theme.palette.warning.main)} />
              </Box>
              
              <Box sx={styles.cardContent}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Spending & Budget
                  </Typography>
                  <LocalOfferIcon sx={{ color: alpha(theme.palette.warning.main, 0.5) }} />
                </Box>
                
                <Grid container spacing={2} sx={{ flex: 1 }}>
                  {spendingAndBudgetActions.map((action, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper 
                        elevation={0}
                        onClick={() => navigate(action.route)}
                        sx={{ 
                          p: 2, 
                          height: '100%',
                          textAlign: 'center',
                          borderRadius: 2,
                          bgcolor: alpha(action.color, 0.05),
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: `0 5px 15px ${alpha(action.color, 0.2)}`
                          }
                        }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            m: '0 auto 8px auto',
                            bgcolor: alpha(action.color, 0.1),
                            color: action.color
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Financial Planning Actions */}
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                ...styles.cardBase,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={styles.cardDecoration}>
                <Box sx={styles.decorationCircle(theme.palette.success.main)} />
              </Box>
              
              <Box sx={styles.cardContent}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Financial Planning
                  </Typography>
                  <InvestmentIcon sx={{ color: alpha(theme.palette.success.main, 0.5) }} />
                </Box>
                
                <Grid container spacing={2} sx={{ flex: 1 }}>
                  {financialPlanningActions.map((action, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper 
                        elevation={0}
                        onClick={() => navigate(action.route)}
                        sx={{ 
                          p: 2, 
                          height: '100%',
                          textAlign: 'center',
                          borderRadius: 2,
                          bgcolor: alpha(action.color, 0.05),
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: `0 5px 15px ${alpha(action.color, 0.2)}`
                          }
                        }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            m: '0 auto 8px auto',
                            bgcolor: alpha(action.color, 0.1),
                            color: action.color
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  // 5. Portfolio and Transactions Component
  const renderPortfolioAndTransactions = () => (
    <Grid container spacing={3}>
      {/* Portfolio Breakdown with Toggle */}
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={0}
          sx={{ 
            ...styles.cardBase,
            ...styles.cardHover
          }}
        >
          <Box sx={styles.cardDecoration}>
            <Box sx={styles.decorationCircle(theme.palette.primary.main)} />
          </Box>
          
          <Box sx={styles.cardContent}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={styles.headerAvatar(theme.palette.primary.main)}>
                  <AccountBalanceIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Portfolio Breakdown
                </Typography>
              </Box>
              
              <ToggleButtonGroup
                value={portfolioView}
                exclusive
                onChange={handlePortfolioViewChange}
                aria-label="portfolio view"
                size="small"
              >
                <ToggleButton value="family" aria-label="family view">
                  <FamilyRestroomIcon sx={{ mr: 1 }} /> Family
                </ToggleButton>
                <ToggleButton value="asset" aria-label="asset class view">
                  <CategoryIcon sx={{ mr: 1 }} /> Asset Class
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            
            <TableContainer>
              {portfolioView === 'family' ? (
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      '& th': { 
                        fontWeight: 'bold', 
                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                      }
                    }}>
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
                        transition: 'all 0.2s ease'
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
                        <TableCell align="right">{hideBalances ? '••••••••' : formatCurrency(member.assets)}</TableCell>
                        <TableCell align="right">{hideBalances ? '••••••••' : formatCurrency(member.liabilities)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{hideBalances ? '••••••••' : formatCurrency(member.netWorth)}</TableCell>
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
              ) : (
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      '& th': { 
                        fontWeight: 'bold', 
                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                      }
                    }}>
                      <TableCell>Asset Class</TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell align="right">Allocation</TableCell>
                      <TableCell align="right">Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assetClasses.map((asset) => (
                      <TableRow key={asset.id} sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.03) },
                        transition: 'all 0.2s ease'
                      }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                mr: 1.5, 
                                bgcolor: alpha(theme.palette.primary.main, 0.1), 
                                color: theme.palette.primary.main,
                                width: 36, 
                                height: 36
                              }}
                            >
                              {asset.icon}
                            </Avatar>
                            <Typography variant="body1" fontWeight="medium">{asset.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{hideBalances ? '••••••••' : formatCurrency(asset.value)}</TableCell>
                        <TableCell align="right">{asset.allocation.toFixed(1)}%</TableCell>
                        <TableCell align="right">
                          <Chip 
                            icon={asset.performance >= 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                            label={`${asset.performance.toFixed(1)}%`}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(asset.performance >= 0 ? theme.palette.success.main : theme.palette.error.main, 0.1),
                              color: asset.performance >= 0 ? theme.palette.success.main : theme.palette.error.main,
                              fontWeight: 'bold',
                              borderRadius: 1
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Recent Transactions */}
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={0} 
          sx={{ 
            ...styles.cardBase,
            ...styles.cardHover
          }}
        >
          <Box sx={styles.cardDecoration}>
            <Box sx={styles.decorationCircle(theme.palette.secondary.main)} />
          </Box>
          
          <Box sx={styles.cardContent}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={styles.headerAvatar(theme.palette.secondary.main)}>
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
                    borderRadius: 2,
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
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
                  mx: 0.5,
                  textTransform: 'none',
                  fontWeight: 'medium'
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
              <Tab label="Income" />
              <Tab label="Expenses" />
              <Tab label="Investments" />
            </Tabs>
            
            <List sx={{ 
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              {filteredTransactions.map((transaction) => (
                <ListItem 
                  key={transaction.id}
                  divider
                  sx={{ 
                    py: 1.5,
                    transition: 'all 0.2s ease',
                    '&:last-child': {
                      mb: 0
                    },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.03),
                      transform: 'translateX(5px)'
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
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5 }} />
                          {formatDate(transaction.date)}
                        </Typography>
                        <Chip 
                          size="small" 
                          label={transaction.account} 
                          sx={{ 
                            height: 20,
                            fontSize: '0.65rem',
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            color: alpha(theme.palette.primary.main, 0.8)
                          }} 
                        />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction sx={{ right: 16, display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color={transaction.amount >= 0 ? 'success.main' : 'error.main'}
                      sx={{ mr: 2 }}
                    >
                      {transaction.amount >= 0 ? '+' : ''}{hideBalances ? '••••••••' : `₹${Math.abs(transaction.amount).toFixed(2)}`}
                    </Typography>
                    <IconButton 
                      edge="end" 
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        color: theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1)
                        }
                      }}
                    >
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
                  px: 3,
                  py: 1,
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                  textTransform: 'none'
                }}
              >
                View All Transactions
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  // ============================================================
  // MAIN RENDER - The dashboard layout
  // ============================================================
  return (
    <Box sx={styles.pageContainer}>
      {/* 1. Welcome Banner */}
      {renderWelcomeBanner()}
      
      {/* 2. Quick Stats */}
      {renderQuickStats()}

      {/* 3. Market Overview */}
      {renderMarketOverview()}

      {/* 4. Financial Insights Row */}
      {renderFinancialInsights()}

      {/* 5. Portfolio and Transactions */}
      {renderPortfolioAndTransactions()}
    </Box>
  );
};

export default Dashboard;