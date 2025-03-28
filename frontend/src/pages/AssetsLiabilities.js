// src/pages/AssetsLiabilities.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Tooltip,
  Avatar,
  alpha,
  useTheme
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DiamondIcon from '@mui/icons-material/Diamond';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import SavingsIcon from '@mui/icons-material/Savings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PublicIcon from '@mui/icons-material/Public';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

const AssetsLiabilities = () => {
  const theme = useTheme();
  
  // Asset categories with their icons
  // Asset categories with their icons
const assetCategories = {
  mutualFunds: { name: 'Mutual Funds', icon: <AccountBalanceIcon /> },
  fixedDeposits: { name: 'Fixed Deposits', icon: <SavingsIcon /> },
  govtSchemes: { name: 'Govt. Schemes', icon: <AccountBalanceWalletIcon /> },
  stocks: { name: 'Stocks', icon: <TrendingUpIcon /> },
  goldJewelry: { name: 'Gold & Jewelry', icon: <DiamondIcon /> },
  usEquity: { name: 'US Equity', icon: <PublicIcon /> },
  cash: { name: 'Cash', icon: <AccountBalanceWalletIcon /> },
  crypto: { name: 'Crypto', icon: <CurrencyBitcoinIcon /> }
};
  
  // Liability categories with their icons
const liabilityCategories = {
  mortgage: { name: 'Mortgages', icon: <HomeIcon /> },
  carLoans: { name: 'Car Loans', icon: <DirectionsCarIcon /> },
  studentLoans: { name: 'Student Loans', icon: <SchoolIcon /> },
  creditCards: { name: 'Credit Cards', icon: <CreditCardIcon /> },
  personalLoans: { name: 'Personal Loans', icon: <AccountBalanceIcon /> },
  other: { name: 'Other Liabilities', icon: <AttachMoneyIcon /> }
};

  // State for balance visibility
  const [hideBalances, setHideBalances] = useState(false);

  // State for time period
  const [timePeriod, setTimePeriod] = useState('1Y');
  
  // Sample assets
  // Sample assets
  const [assets, setAssets] = useState([
    // Mutual Funds
    { id: 1, name: 'HDFC Midcap Opportunities', category: 'mutualFunds', value: 850000, institution: 'HDFC AMC', lastUpdated: '2025-03-15', notes: 'Equity - Midcap fund' },
    { id: 2, name: 'Axis Bluechip Fund', category: 'mutualFunds', value: 950000, institution: 'Axis AMC', lastUpdated: '2025-03-15', notes: 'Equity - Large Cap fund' },
    { id: 3, name: 'SBI Small Cap Fund', category: 'mutualFunds', value: 750000, institution: 'SBI AMC', lastUpdated: '2025-03-20', notes: 'Equity - Small Cap fund' },
    { id: 4, name: 'Mirae Asset Emerging Bluechip', category: 'mutualFunds', value: 800000, institution: 'Mirae Asset', lastUpdated: '2025-03-18', notes: 'Equity - Large & Mid Cap fund' },
    { id: 5, name: 'Parag Parikh Flexi Cap Fund', category: 'mutualFunds', value: 500000, institution: 'PPFAS', lastUpdated: '2025-03-19', notes: 'Equity - Flexi Cap fund' },
    
    // Fixed Deposits
    { id: 6, name: 'HDFC Bank FD', category: 'fixedDeposits', value: 1200000, institution: 'HDFC Bank', lastUpdated: '2025-03-01', notes: 'Matures in 2 years' },
    { id: 7, name: 'SBI Bank RD', category: 'fixedDeposits', value: 1000000, institution: 'SBI Bank', lastUpdated: '2025-03-05', notes: 'Monthly deposit scheme' },
    
    // Government Schemes
    { id: 8, name: 'Public Provident Fund', category: 'govtSchemes', value: 850000, institution: 'SBI Bank', lastUpdated: '2025-02-28', notes: 'Tax saving investment' },
    { id: 9, name: 'National Pension Scheme', category: 'govtSchemes', value: 650000, institution: 'NSDL', lastUpdated: '2025-03-10', notes: 'Retirement fund' },
    { id: 10, name: 'Sukanya Samriddhi Yojana', category: 'govtSchemes', value: 300000, institution: 'Post Office', lastUpdated: '2025-02-25', notes: 'Child education scheme' },
    
    // Stocks
    { id: 11, name: 'Reliance Industries', category: 'stocks', value: 350000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'Direct equity' },
    { id: 12, name: 'HDFC Bank', category: 'stocks', value: 320000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'Banking sector' },
    { id: 13, name: 'Infosys', category: 'stocks', value: 280000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'IT sector' },
    { id: 14, name: 'TCS', category: 'stocks', value: 250000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'IT sector' },
    { id: 15, name: 'Tata Motors', category: 'stocks', value: 300000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'Auto sector' },
    
    // Gold & Jewelry
    { id: 16, name: 'Gold Jewelry', category: 'goldJewelry', value: 750000, institution: '', lastUpdated: '2025-01-15', notes: 'Physical gold' },
    { id: 17, name: 'Silver Coins', category: 'goldJewelry', value: 250000, institution: '', lastUpdated: '2025-01-15', notes: 'Precious metals' },
    { id: 18, name: 'Diamond Jewelry', category: 'goldJewelry', value: 200000, institution: '', lastUpdated: '2025-01-15', notes: 'Precious stones' },
    
    // US Equity
    { id: 19, name: 'Vanguard S&P 500 ETF', category: 'usEquity', value: 550000, institution: 'Vested', lastUpdated: '2025-03-18', notes: 'International ETF' },
    { id: 20, name: 'Invesco QQQ ETF', category: 'usEquity', value: 300000, institution: 'Vested', lastUpdated: '2025-03-18', notes: 'NASDAQ tracking ETF' },
    
    // Cash
    { id: 21, name: 'Savings Account', category: 'cash', value: 450000, institution: 'HDFC Bank', lastUpdated: '2025-03-21', notes: 'Emergency fund' },
    
    // Crypto
    { id: 22, name: 'Bitcoin', category: 'crypto', value: 150000, institution: 'WazirX', lastUpdated: '2025-03-19', notes: 'Cryptocurrency' },
    { id: 23, name: 'Ethereum', category: 'crypto', value: 100000, institution: 'WazirX', lastUpdated: '2025-03-19', notes: 'Cryptocurrency' }
  ]);
  
  // Sample liabilities
  const [liabilities, setLiabilities] = useState([
    { id: 1, name: 'Home Loan', category: 'mortgage', value: 7500000, institution: 'HDFC Bank', lastUpdated: '2025-03-01', notes: 'Primary residence mortgage' },
    { id: 2, name: 'Car Loan', category: 'carLoans', value: 420000, institution: 'SBI Bank', lastUpdated: '2025-03-05', notes: 'Honda City loan' },
    { id: 3, name: 'Education Loan', category: 'studentLoans', value: 950000, institution: 'ICICI Bank', lastUpdated: '2025-02-28', notes: 'MBA education loan' },
    { id: 4, name: 'HDFC Credit Card', category: 'creditCards', value: 85000, institution: 'HDFC Bank', lastUpdated: '2025-03-18', notes: '' },
    { id: 5, name: 'SBI Credit Card', category: 'creditCards', value: 45000, institution: 'SBI Bank', lastUpdated: '2025-03-15', notes: '' },
    { id: 6, name: 'Personal Loan', category: 'personalLoans', value: 250000, institution: 'Bajaj Finserv', lastUpdated: '2025-02-25', notes: '' }
  ]);


  // Sample historical net worth data
  const [historicalData, setHistoricalData] = useState([
    { month: 'Mar 2024', assets: 23500000, liabilities: 9250000, netWorth: 14250000 },
    { month: 'Apr 2024', assets: 23750000, liabilities: 9180000, netWorth: 14570000 },
    { month: 'May 2024', assets: 24100000, liabilities: 9120000, netWorth: 14980000 },
    { month: 'Jun 2024', assets: 24250000, liabilities: 9050000, netWorth: 15200000 },
    { month: 'Jul 2024', assets: 24500000, liabilities: 8980000, netWorth: 15520000 },
    { month: 'Aug 2024', assets: 24150000, liabilities: 8920000, netWorth: 15230000 },
    { month: 'Sep 2024', assets: 24750000, liabilities: 8850000, netWorth: 15900000 },
    { month: 'Oct 2024', assets: 25100000, liabilities: 8780000, netWorth: 16320000 },
    { month: 'Nov 2024', assets: 25350000, liabilities: 8710000, netWorth: 16640000 },
    { month: 'Dec 2024', assets: 25750000, liabilities: 8640000, netWorth: 17110000 },
    { month: 'Jan 2025', assets: 26100000, liabilities: 8570000, netWorth: 17530000 },
    { month: 'Feb 2025', assets: 26450000, liabilities: 8500000, netWorth: 17950000 },
    { month: 'Mar 2025', assets: 26750000, liabilities: 8430000, netWorth: 18320000 },
    { month: 'Apr 2025', assets: 27000000, liabilities: 8350000, netWorth: 18650000 },
  ]);
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [itemType, setItemType] = useState('asset'); // 'asset' or 'liability'
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    category: '',
    value: '',
    institution: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  // Calculate totals
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  
  // Update the current net worth in historical data
  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });
    const updatedHistoricalData = historicalData.map(item => 
      item.month === currentMonth ? 
      { ...item, assets: totalAssets, liabilities: totalLiabilities, netWorth } : 
      item
    );
    
    // Only update if the current month exists in the data
    if (updatedHistoricalData.some(item => item.month === currentMonth)) {
      setHistoricalData(updatedHistoricalData);
    } else {
      // Add current month if it doesn't exist
      setHistoricalData([
        ...historicalData,
        { month: currentMonth, assets: totalAssets, liabilities: totalLiabilities, netWorth }
      ]);
    }
  }, [totalAssets, totalLiabilities, netWorth]);
  
  // Calculate category totals
  const assetCategoryTotals = assets.reduce((totals, asset) => {
    if (!totals[asset.category]) {
      totals[asset.category] = 0;
    }
    totals[asset.category] += asset.value;
    return totals;
  }, {});
  
  const liabilityCategoryTotals = liabilities.reduce((totals, liability) => {
    if (!totals[liability.category]) {
      totals[liability.category] = 0;
    }
    totals[liability.category] += liability.value;
    return totals;
  }, {});
  
  // Calculate net worth change from last month
  const currentMonthNetWorth = historicalData[historicalData.length - 1]?.netWorth || 0;
  const lastMonthNetWorth = historicalData[historicalData.length - 2]?.netWorth || 0;
  const netWorthChange = currentMonthNetWorth - lastMonthNetWorth;
  const netWorthChangePercentage = lastMonthNetWorth !== 0 
    ? (netWorthChange / lastMonthNetWorth) * 100 
    : 0;
  
  // Open dialog to add a new item
  const handleAddItem = (type) => {
    setDialogMode('add');
    setItemType(type);
    setCurrentItem({
      id: null,
      name: '',
      category: Object.keys(type === 'asset' ? assetCategories : liabilityCategories)[0],
      value: '',
      institution: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setDialogOpen(true);
  };
  
  // Open dialog to edit an item
  const handleEditItem = (item, type) => {
    setDialogMode('edit');
    setItemType(type);
    setCurrentItem({ ...item });
    setDialogOpen(true);
  };
  
  // Delete an item
  const handleDeleteItem = (itemId, type) => {
    if (type === 'asset') {
      setAssets(assets.filter(asset => asset.id !== itemId));
    } else {
      setLiabilities(liabilities.filter(liability => liability.id !== itemId));
    }
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === 'value' ? parseFloat(value) || '' : value
    });
  };
  
  // Save item (add or update)
  const handleSaveItem = () => {
    if (dialogMode === 'add') {
      // Add new item
      const newItem = {
        ...currentItem,
        id: Math.max(
          ...(itemType === 'asset' ? assets : liabilities).map(item => item.id),
          0
        ) + 1
      };
      
      if (itemType === 'asset') {
        setAssets([...assets, newItem]);
      } else {
        setLiabilities([...liabilities, newItem]);
      }
    } else {
      // Update existing item
      if (itemType === 'asset') {
        setAssets(assets.map(asset => 
          asset.id === currentItem.id ? currentItem : asset
        ));
      } else {
        setLiabilities(liabilities.map(liability => 
          liability.id === currentItem.id ? currentItem : liability
        ));
      }
    }
    setDialogOpen(false);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format number with commas (Indian format)
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  // Filter historical data based on selected time period
  const getFilteredHistoricalData = () => {
    const data = [...historicalData];
    
    switch (timePeriod) {
      case '3M':
        return data.slice(-3);
      case '6M':
        return data.slice(-6);
      case '1Y':
        return data.slice(-12);
      case 'ALL':
        return data;
      default:
        return data.slice(-12);
    }
  };

  // Format date from ISO to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Custom chart tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography fontWeight="medium" mb={1}>
            {payload[0].payload.month}
          </Typography>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" color="success.main" display="flex" alignItems="center">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.success.main, mr: 1 }} />
              Assets: {formatCurrency(payload[0].payload.assets)}
            </Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" color="error.main" display="flex" alignItems="center">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.error.main, mr: 1 }} />
              Liabilities: {formatCurrency(payload[0].payload.liabilities)}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" fontWeight="bold" color="primary.main" display="flex" alignItems="center">
            <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.primary.main, mr: 1 }} />
            Net Worth: {formatCurrency(payload[0].payload.netWorth)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  // Toggle balances visibility
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };
  
  return (
    <Box>
      {/* Header with overall summary */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: -50, 
          right: -50, 
          width: '40%', 
          height: '200%', 
          opacity: 0.1, 
          background: `radial-gradient(circle, ${theme.palette.common.white} 0%, transparent 70%)` 
        }} />
        
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold" component="h1">
                Net Worth Overview
              </Typography>
              <IconButton 
                sx={{ ml: 2, color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
                onClick={toggleBalancesVisibility}
                size="small"
              >
                {hideBalances ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
              <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                {['3M', '6M', '1Y', 'ALL'].map(period => (
                  <Button 
                    key={period}
                    size="small"
                    variant={timePeriod === period ? "contained" : "text"}
                    onClick={() => setTimePeriod(period)}
                    sx={{ 
                      color: 'white', 
                      minWidth: 40,
                      bgcolor: timePeriod === period ? 'rgba(255,255,255,0.2)' : 'transparent',
                      '&:hover': {
                        bgcolor: timePeriod === period ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    {period}
                  </Button>
                ))}
              </Box>
            </Box>
            
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
              {hideBalances ? '••••••••' : formatCurrency(netWorth)}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ opacity: 0.85 }}>
                Total Net Worth
              </Typography>
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                {netWorthChange >= 0 ? 
                  <NorthIcon fontSize="small" sx={{ color: '#4caf50' }} /> : 
                  <SouthIcon fontSize="small" sx={{ color: '#f44336' }} />
                }
                <Typography 
                  variant="body2" 
                  sx={{ 
                    ml: 0.5,
                    color: netWorthChange >= 0 ? '#4caf50' : '#f44336'
                  }}
                >
                  {hideBalances ? '••••' : formatCurrency(netWorthChange)} ({formatPercentage(netWorthChangePercentage)})
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>
                    Total Assets
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {hideBalances ? '••••••••' : formatCurrency(totalAssets)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>
                    Total Liabilities
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {hideBalances ? '••••••••' : formatCurrency(totalLiabilities)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 200, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getFilteredHistoricalData()}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    tickFormatter={(value) => {
                      if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                      if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
                      return `₹${value/1000}K`;
                    }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <ChartTooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="netWorth" 
                    stroke="#FFFFFF" 
                    strokeWidth={2}
                    fill="url(#netWorthGradient)" 
                    activeDot={{ r: 6, fill: '#FFFFFF', stroke: 'rgba(255,255,255,0.5)', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Assets and Liabilities */}
      <Grid container spacing={3}>
        {/* Assets List */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1)
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main, mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Assets
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  {hideBalances ? '••••••••' : formatCurrency(totalAssets)}
                </Typography>
              </Box>
            </Box>
            
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={() => handleAddItem('asset')}
              size="small"
              sx={{ mb: 3, borderRadius: 2 }}
            >
              Add Asset
            </Button>
            
            {/* Asset Categories */}
            {Object.keys(assetCategories).map((category) => {
              const categoryTotal = assetCategoryTotals[category] || 0;
              const categoryAssets = assets.filter(asset => asset.category === category);
              
              return categoryAssets.length > 0 ? (
                <Box key={category} sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    mb: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        width: 36, 
                        height: 36, 
                        mr: 1.5, 
                        bgcolor: alpha(theme.palette.success.main, 0.1), 
                        color: theme.palette.success.main 
                      }}>
                        {assetCategories[category].icon}
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {assetCategories[category].name}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                      {hideBalances ? '••••••••' : formatCurrency(categoryTotal)}
                    </Typography>
                  </Box>
                  
                  <List sx={{ 
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    borderRadius: 2
                  }}>
                    {categoryAssets.map((asset) => (
                      <ListItem 
                        key={asset.id}
                        sx={{ 
                          borderRadius: 2,
                          mb: 1,
                          '&:last-child': {
                            mb: 0
                          },
                          '&:hover': {
                            bgcolor: alpha(theme.palette.success.main, 0.03)
                          }
                        }}
                      >
                        <ListItemText 
                          primary={
                            <Typography variant="body1" fontWeight="medium">
                              {asset.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              {asset.institution && (
                                <Chip 
                                  size="small" 
                                  label={asset.institution} 
                                  sx={{ 
                                    mr: 1, 
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main
                                  }} 
                                />
                              )}
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5 }} />
                                {formatDate(asset.lastUpdated)}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="bold" color="success.main" sx={{ mr: 2 }}>
                            {hideBalances ? '••••••••' : formatCurrency(asset.value)}
                          </Typography>
                          <IconButton 
                            edge="end" 
                            size="small" 
                            onClick={() => handleEditItem(asset, 'asset')}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            size="small"
                            onClick={() => handleDeleteItem(asset.id, 'asset')}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : null;
            })}
          </Paper>
        </Grid>
        
        {/* Liabilities List */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1)
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main, mr: 2 }}>
                  <AccountBalanceIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Liabilities
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" color="error.main">
                  {hideBalances ? '••••••••' : formatCurrency(totalLiabilities)}
                </Typography>
              </Box>
            </Box>

            <Button 
              variant="outlined" 
              color="secondary" 
              startIcon={<AddIcon />}
              onClick={() => handleAddItem('liability')}
              size="small"
              sx={{ mb: 3, borderRadius: 2 }}
            >
              Add Liability
            </Button>
            
            {/* Liability Categories */}
            {Object.keys(liabilityCategories).map((category) => {
              const categoryTotal = liabilityCategoryTotals[category] || 0;
              const categoryLiabilities = liabilities.filter(liability => liability.category === category);
              
              return categoryLiabilities.length > 0 ? (
                <Box key={category} sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.05),
                    mb: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        width: 36, 
                        height: 36, 
                        mr: 1.5, 
                        bgcolor: alpha(theme.palette.error.main, 0.1), 
                        color: theme.palette.error.main 
                      }}>
                        {liabilityCategories[category].icon}
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {liabilityCategories[category].name}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" color="error.main">
                      {hideBalances ? '••••••••' : formatCurrency(categoryTotal)}
                    </Typography>
                  </Box>
                  
                  <List sx={{ 
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    borderRadius: 2
                  }}>
                    {categoryLiabilities.map((liability) => (
                      <ListItem 
                        key={liability.id}
                        sx={{ 
                          borderRadius: 2,
                          mb: 1,
                          '&:last-child': {
                            mb: 0
                          },
                          '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.03)
                          }
                        }}
                      >
                        <ListItemText 
                          primary={
                            <Typography variant="body1" fontWeight="medium">
                              {liability.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              {liability.institution && (
                                <Chip 
                                  size="small" 
                                  label={liability.institution} 
                                  sx={{ 
                                    mr: 1, 
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main
                                  }} 
                                />
                              )}
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5 }} />
                                {formatDate(liability.lastUpdated)}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="bold" color="error.main" sx={{ mr: 2 }}>
                            {hideBalances ? '••••••••' : formatCurrency(liability.value)}
                          </Typography>
                          <IconButton 
                            edge="end" 
                            size="small" 
                            onClick={() => handleEditItem(liability, 'liability')}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            size="small"
                            onClick={() => handleDeleteItem(liability.id, 'liability')}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : null;
            })}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Add/Edit Item Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' 
            ? `Add ${itemType === 'asset' ? 'Asset' : 'Liability'}` 
            : `Edit ${itemType === 'asset' ? 'Asset' : 'Liability'}`
          }
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  value={currentItem.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="value"
                  label="Value"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  fullWidth
                  required
                  value={currentItem.value}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={currentItem.category}
                    label="Category"
                    onChange={handleInputChange}
                  >
                    {Object.entries(itemType === 'asset' ? assetCategories : liabilityCategories)
                      .map(([key, { name }]) => (
                        <MenuItem key={key} value={key}>{name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="institution"
                  label="Institution/Holder"
                  fullWidth
                  value={currentItem.institution}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastUpdated"
                  label="Last Updated"
                  type="date"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={currentItem.lastUpdated}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Notes"
                  multiline
                  rows={2}
                  fullWidth
                  value={currentItem.notes}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSaveItem} 
            variant="contained"
            color={itemType === 'asset' ? "primary" : "secondary"}
            disabled={!currentItem.name || !currentItem.value}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssetsLiabilities;