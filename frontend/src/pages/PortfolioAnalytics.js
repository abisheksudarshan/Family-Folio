// src/pages/PortfolioAnalytics.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SavingsIcon from '@mui/icons-material/Savings';
import DiamondIcon from '@mui/icons-material/Diamond';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PublicIcon from '@mui/icons-material/Public';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RefreshIcon from '@mui/icons-material/Refresh';

const PortfolioAnalytics = () => {
  const theme = useTheme();
  
  // State for time period selection
  const [timePeriod, setTimePeriod] = useState('1Y');
  
  // State for chart view selection
  const [chartView, setChartView] = useState('allocation');
  
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  
  // State for balance visibility
  const [hideBalances, setHideBalances] = useState(false);
  
  // Asset class allocation
  const assetAllocation = [
    { name: 'Mutual Funds', value: 3850000, color: theme.palette.primary.main, xirr: 14.2, benchmark: 12.5 },
    { name: 'Fixed Deposits', value: 2200000, color: theme.palette.secondary.main, xirr: 7.1, benchmark: 6.5 },
    { name: 'Govt. Schemes', value: 1800000, color: theme.palette.success.main, xirr: 8.0, benchmark: 7.5 },
    { name: 'Stocks', value: 1500000, color: theme.palette.error.main, xirr: 18.5, benchmark: 15.2 },
    { name: 'Gold & Jewelry', value: 1200000, color: theme.palette.warning.main, xirr: 9.5, benchmark: 10.2 },
    { name: 'US Equity', value: 850000, color: theme.palette.info.main, xirr: 16.8, benchmark: 15.0 },
    { name: 'Cash', value: 450000, color: '#607d8b', xirr: 3.5, benchmark: 3.5 },
    { name: 'Crypto', value: 250000, color: '#9c27b0', xirr: 22.0, benchmark: 25.0 }
  ];
  
  // Total portfolio value
  const portfolioValue = assetAllocation.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate portfolio XIRR (weighted average)
  const portfolioXIRR = assetAllocation.reduce((sum, item) => sum + (item.xirr * item.value), 0) / portfolioValue;
  
  // Calculate benchmark XIRR (weighted average)
  const benchmarkXIRR = assetAllocation.reduce((sum, item) => sum + (item.benchmark * item.value), 0) / portfolioValue;
  
  // Sort assets by XIRR for top and bottom performers
  const sortedByXIRR = [...assetAllocation].sort((a, b) => b.xirr - a.xirr);
  const topPerformers = sortedByXIRR.slice(0, 3);
  const bottomPerformers = [...sortedByXIRR].reverse().slice(0, 3);
  
  // Detailed holdings data
  const holdings = [
    { 
      id: 1, 
      name: 'HDFC Midcap Opportunities', 
      category: 'Mutual Funds',
      type: 'Equity - Midcap',
      value: 850000, 
      allocation: 7.1,
      xirr: 18.5, 
      benchmark: 'Nifty Midcap 150 TRI',
      benchmarkReturn: 16.2,
      outperforming: true
    },
    { 
      id: 2, 
      name: 'Axis Bluechip Fund', 
      category: 'Mutual Funds',
      type: 'Equity - Large Cap',
      value: 950000, 
      allocation: 7.9,
      xirr: 14.8, 
      benchmark: 'Nifty 50 TRI',
      benchmarkReturn: 15.2,
      outperforming: false
    },
    { 
      id: 3, 
      name: 'SBI Small Cap Fund', 
      category: 'Mutual Funds',
      type: 'Equity - Small Cap',
      value: 750000, 
      allocation: 6.3,
      xirr: 22.5, 
      benchmark: 'Nifty Smallcap 100 TRI',
      benchmarkReturn: 20.1,
      outperforming: true
    },
    { 
      id: 4, 
      name: 'Mirae Asset Emerging Bluechip', 
      category: 'Mutual Funds',
      type: 'Equity - Large & Mid Cap',
      value: 800000, 
      allocation: 6.7,
      xirr: 17.2, 
      benchmark: 'Nifty Large Midcap 250 TRI',
      benchmarkReturn: 16.8,
      outperforming: true
    },
    { 
      id: 5, 
      name: 'Parag Parikh Flexi Cap Fund', 
      category: 'Mutual Funds',
      type: 'Equity - Flexi Cap',
      value: 500000, 
      allocation: 4.2,
      xirr: 16.5, 
      benchmark: 'Nifty 500 TRI',
      benchmarkReturn: 15.5,
      outperforming: true
    },
    { 
      id: 6, 
      name: 'HDFC Bank FD', 
      category: 'Fixed Deposits',
      type: 'Bank Deposits',
      value: 1200000, 
      allocation: 10.0,
      xirr: 7.3, 
      benchmark: 'Avg. Bank FD Rate',
      benchmarkReturn: 6.5,
      outperforming: true
    },
    { 
      id: 7, 
      name: 'SBI Bank RD', 
      category: 'Fixed Deposits',
      type: 'Bank Deposits',
      value: 1000000, 
      allocation: 8.4,
      xirr: 6.8, 
      benchmark: 'Avg. Bank RD Rate',
      benchmarkReturn: 6.5,
      outperforming: true
    },
    { 
      id: 8, 
      name: 'Public Provident Fund', 
      category: 'Govt. Schemes',
      type: 'Tax Saving',
      value: 850000, 
      allocation: 7.1,
      xirr: 7.1, 
      benchmark: 'PPF Rate',
      benchmarkReturn: 7.1,
      outperforming: false
    },
    { 
      id: 9, 
      name: 'National Pension Scheme', 
      category: 'Govt. Schemes',
      type: 'Retirement',
      value: 650000, 
      allocation: 5.4,
      xirr: 10.2, 
      benchmark: 'NPS Avg. Return',
      benchmarkReturn: 9.5,
      outperforming: true
    },
    { 
      id: 10, 
      name: 'Sukanya Samriddhi Yojana', 
      category: 'Govt. Schemes',
      type: 'Child Investment',
      value: 300000, 
      allocation: 2.5,
      xirr: 7.6, 
      benchmark: 'SSY Rate',
      benchmarkReturn: 7.6,
      outperforming: false
    },
    { 
      id: 11, 
      name: 'Gold Jewelry', 
      category: 'Gold & Jewelry',
      type: 'Physical Gold',
      value: 750000, 
      allocation: 6.3,
      xirr: 10.2, 
      benchmark: 'Gold Price Return',
      benchmarkReturn: 11.5,
      outperforming: false
    },
    { 
      id: 12, 
      name: 'Silver Coins', 
      category: 'Gold & Jewelry',
      type: 'Precious Metals',
      value: 250000, 
      allocation: 2.1,
      xirr: 8.5, 
      benchmark: 'Silver Price Return',
      benchmarkReturn: 9.2,
      outperforming: false
    },
    { 
      id: 13, 
      name: 'Diamond Jewelry', 
      category: 'Gold & Jewelry',
      type: 'Precious Stones',
      value: 200000, 
      allocation: 1.7,
      xirr: 7.5, 
      benchmark: 'Jewelry Price Index',
      benchmarkReturn: 7.2,
      outperforming: true
    },
    { 
      id: 14, 
      name: 'Reliance Industries', 
      category: 'Stocks',
      type: 'Direct Equity',
      value: 350000, 
      allocation: 2.9,
      xirr: 21.5, 
      benchmark: 'Nifty 50 TRI',
      benchmarkReturn: 15.2,
      outperforming: true
    },
    { 
      id: 15, 
      name: 'HDFC Bank', 
      category: 'Stocks',
      type: 'Direct Equity',
      value: 320000, 
      allocation: 2.7,
      xirr: 16.8, 
      benchmark: 'Bank Nifty TRI',
      benchmarkReturn: 14.5,
      outperforming: true
    },
    { 
      id: 16, 
      name: 'Infosys', 
      category: 'Stocks',
      type: 'Direct Equity',
      value: 280000, 
      allocation: 2.3,
      xirr: 18.2, 
      benchmark: 'Nifty IT TRI',
      benchmarkReturn: 17.5,
      outperforming: true
    },
    { 
      id: 17, 
      name: 'TCS', 
      category: 'Stocks',
      type: 'Direct Equity',
      value: 250000, 
      allocation: 2.1,
      xirr: 15.5, 
      benchmark: 'Nifty IT TRI',
      benchmarkReturn: 17.5,
      outperforming: false
    },
    { 
      id: 18, 
      name: 'Tata Motors', 
      category: 'Stocks',
      type: 'Direct Equity',
      value: 300000, 
      allocation: 2.5,
      xirr: 24.5, 
      benchmark: 'Nifty Auto TRI',
      benchmarkReturn: 18.2,
      outperforming: true
    },
    { 
      id: 19, 
      name: 'Vanguard S&P 500 ETF', 
      category: 'US Equity',
      type: 'International ETF',
      value: 550000, 
      allocation: 4.6,
      xirr: 18.2, 
      benchmark: 'S&P 500 TRI',
      benchmarkReturn: 17.5,
      outperforming: true
    },
    { 
      id: 20, 
      name: 'Invesco QQQ ETF', 
      category: 'US Equity',
      type: 'International ETF',
      value: 300000, 
      allocation: 2.5,
      xirr: 22.5, 
      benchmark: 'Nasdaq 100 TRI',
      benchmarkReturn: 20.5,
      outperforming: true
    },
    { 
      id: 21, 
      name: 'Bitcoin', 
      category: 'Crypto',
      type: 'Cryptocurrency',
      value: 150000, 
      allocation: 1.3,
      xirr: 32.5, 
      benchmark: 'Crypto Index',
      benchmarkReturn: 35.0,
      outperforming: false
    },
    { 
      id: 22, 
      name: 'Ethereum', 
      category: 'Crypto',
      type: 'Cryptocurrency',
      value: 100000, 
      allocation: 0.8,
      xirr: 28.0, 
      benchmark: 'Crypto Index',
      benchmarkReturn: 35.0,
      outperforming: false
    },
    { 
      id: 23, 
      name: 'Savings Account', 
      category: 'Cash',
      type: 'Bank Account',
      value: 450000, 
      allocation: 3.8,
      xirr: 3.5, 
      benchmark: 'Avg. Savings Rate',
      benchmarkReturn: 3.5,
      outperforming: false
    }
  ];
  
  // Performance history over time (monthly for the past year)
  const performanceHistory = [
    { date: '2024-04', portfolio: 8.5, benchmark: 7.8 },
    { date: '2024-05', portfolio: 7.2, benchmark: 6.9 },
    { date: '2024-06', portfolio: 9.1, benchmark: 8.5 },
    { date: '2024-07', portfolio: 10.2, benchmark: 9.5 },
    { date: '2024-08', portfolio: 11.5, benchmark: 10.2 },
    { date: '2024-09', portfolio: 12.1, benchmark: 11.5 },
    { date: '2024-10', portfolio: 11.8, benchmark: 11.1 },
    { date: '2024-11', portfolio: 12.5, benchmark: 11.8 },
    { date: '2024-12', portfolio: 13.2, benchmark: 12.5 },
    { date: '2025-01', portfolio: 13.8, benchmark: 13.0 },
    { date: '2025-02', portfolio: 14.5, benchmark: 13.5 },
    { date: '2025-03', portfolio: 15.2, benchmark: 14.0 }
  ];
  
  // Sector exposure data
  const sectorExposure = [
    { sector: 'Financial Services', exposure: 22.5 },
    { sector: 'Information Technology', exposure: 18.2 },
    { sector: 'Consumer Goods', exposure: 12.5 },
    { sector: 'Healthcare', exposure: 10.8 },
    { sector: 'Automotive', exposure: 8.5 },
    { sector: 'Energy', exposure: 7.2 },
    { sector: 'Real Estate', exposure: 5.5 },
    { sector: 'Telecom', exposure: 4.8 },
    { sector: 'Materials', exposure: 3.2 },
    { sector: 'Others', exposure: 6.8 }
  ];
  
  // Risk metrics compared to benchmark
  const riskMetrics = [
    { name: 'Volatility', value: 12.2, benchmark: 14.5 },
    { name: 'Sharpe Ratio', value: 1.8, benchmark: 1.5 },
    { name: 'Sortino Ratio', value: 2.2, benchmark: 1.8 },
    { name: 'Max Drawdown', value: 15.5, benchmark: 18.2 },
    { name: 'Beta', value: 0.85, benchmark: 1.0 }
  ];
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format percentage
  const formatPercentage = (value, plusSign = false) => {
    return `${plusSign && value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  // Format date 
  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle chart view change
  const handleChartViewChange = (view) => {
    setChartView(view);
  };
  
  // Handle time period change
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };
  
  // Toggle balances visibility
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };
  
  // Custom tooltip for allocation chart
  const AllocationTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{data.name}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Value:</Typography>
            <Typography variant="body2" fontWeight="medium">
              {hideBalances ? '••••••••' : formatCurrency(data.value)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Allocation:</Typography>
            <Typography variant="body2" fontWeight="medium">
              {((data.value / portfolioValue) * 100).toFixed(1)}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">XIRR:</Typography>
            <Typography 
              variant="body2" 
              fontWeight="bold"
              color={data.xirr >= data.benchmark ? 'success.main' : 'error.main'}
            >
              {formatPercentage(data.xirr, true)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Benchmark:</Typography>
            <Typography variant="body2" fontWeight="medium">
              {formatPercentage(data.benchmark, true)}
            </Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };
  
  // Custom tooltip for performance charts
  const PerformanceTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            {formatDate(payload[0].payload.date)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box component="span" sx={{ 
              display: 'inline-block', 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              bgcolor: theme.palette.primary.main, 
              mr: 1 
            }} />
            <Typography variant="body2" sx={{ mr: 1 }}>Portfolio:</Typography>
            <Typography variant="body2" fontWeight="bold" color="primary.main">
              {formatPercentage(payload[0].value, true)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ 
              display: 'inline-block', 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              bgcolor: theme.palette.secondary.main, 
              mr: 1 
            }} />
            <Typography variant="body2" sx={{ mr: 1 }}>Benchmark:</Typography>
            <Typography variant="body2" fontWeight="bold" color="secondary.main">
              {formatPercentage(payload[1].value, true)}
            </Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };
  
  // Filter holdings based on selected tab
  const getFilteredHoldings = () => {
    switch (activeTab) {
      case 0:  // All
        return holdings;
      case 1:  // Mutual Funds
        return holdings.filter(h => h.category === 'Mutual Funds');
      case 2:  // Fixed Deposits
        return holdings.filter(h => h.category === 'Fixed Deposits');
      case 3:  // Govt. Schemes
        return holdings.filter(h => h.category === 'Govt. Schemes');
      case 4:  // Stocks
        return holdings.filter(h => h.category === 'Stocks');
      case 5:  // US Equity
        return holdings.filter(h => h.category === 'US Equity');
      case 6:  // Gold & Jewelry
        return holdings.filter(h => h.category === 'Gold & Jewelry');
      case 7:  // Crypto
        return holdings.filter(h => h.category === 'Crypto');
      default:
        return holdings;
    }
  };

  return (
    <Box>
      {/* Portfolio Header with Summary */}
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
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold" component="h1">
                Portfolio Performance
              </Typography>
              <IconButton 
                sx={{ ml: 2, color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
                onClick={toggleBalancesVisibility}
                size="small"
              >
                {hideBalances ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
              <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                {['3M', '6M', '1Y', '3Y', 'ALL'].map(period => (
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
              {hideBalances ? '••••••••' : formatCurrency(portfolioValue)}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ opacity: 0.85, mr: 2 }}>
                Total Portfolio Value
              </Typography>
              <Chip 
                label={`${portfolioXIRR.toFixed(1)}% XIRR`}
                size="small"
                color={portfolioXIRR >= benchmarkXIRR ? "success" : "error"}
                sx={{ 
                  fontWeight: 'bold',
                  bgcolor: portfolioXIRR >= benchmarkXIRR ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                  color: portfolioXIRR >= benchmarkXIRR ? '#4caf50' : '#f44336',
                }}
              />
            </Box>
            
            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  Portfolio vs Benchmark
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mr: 1 }}>
                    {formatPercentage(portfolioXIRR, true)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    vs {formatPercentage(benchmarkXIRR, true)}
                  </Typography>
                  {portfolioXIRR >= benchmarkXIRR ? (
                    <ArrowUpwardIcon sx={{ ml: 1, color: '#4caf50' }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ ml: 1, color: '#f44336' }} />
                  )}
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  Last Updated
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, opacity: 0.75 }} />
                  <Typography variant="body2">
                    {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Typography>
                  <IconButton size="small" sx={{ ml: 1, color: 'white', p: 0.5 }}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 200, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceHistory}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    tickFormatter={formatDate}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <ChartTooltip content={<PerformanceTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#FFFFFF', stroke: theme.palette.primary.main, strokeWidth: 2 }}
                    name="Portfolio"
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, fill: 'rgba(255,255,255,0.8)', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                    name="Benchmark"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Top & Bottom Performers */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Top Performers */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main, mr: 2 }}>
                <TrendingUpIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Top Performers
              </Typography>
            </Box>
            
            {topPerformers.map((asset, index) => (
              <Box 
                key={asset.name}
                sx={{ 
                  mb: index < topPerformers.length - 1 ? 2 : 0,
                  p: 2, 
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.success.main, 0.1)
                }}
              >
                <Grid container alignItems="center">
                  <Grid item xs={7}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {asset.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hideBalances ? '••••••••' : formatCurrency(asset.value)}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="h6" 
                      color="success.main" 
                      fontWeight="bold"
                    >
                      {formatPercentage(asset.xirr, true)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" color="text.secondary">
                        vs {formatPercentage(asset.benchmark)}
                      </Typography>
                      {asset.xirr >= asset.benchmark ? (
                        <ArrowUpwardIcon sx={{ ml: 0.5, fontSize: 16, color: theme.palette.success.main }} />
                      ) : (
                        <ArrowDownwardIcon sx={{ ml: 0.5, fontSize: 16, color: theme.palette.error.main }} />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        {/* Bottom Performers */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main, mr: 2 }}>
                <TrendingDownIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Bottom Performers
              </Typography>
            </Box>
            
            {bottomPerformers.map((asset, index) => (
              <Box 
                key={asset.name}
                sx={{ 
                  mb: index < bottomPerformers.length - 1 ? 2 : 0,
                  p: 2, 
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.error.main, 0.1)
                }}
              >
                <Grid container alignItems="center">
                  <Grid item xs={7}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {asset.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hideBalances ? '••••••••' : formatCurrency(asset.value)}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="h6" 
                      color="error.main" 
                      fontWeight="bold"
                    >
                      {formatPercentage(asset.xirr, true)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" color="text.secondary">
                        vs {formatPercentage(asset.benchmark)}
                      </Typography>
                      {asset.xirr >= asset.benchmark ? (
                        <ArrowUpwardIcon sx={{ ml: 0.5, fontSize: 16, color: theme.palette.success.main }} />
                      ) : (
                        <ArrowDownwardIcon sx={{ ml: 0.5, fontSize: 16, color: theme.palette.error.main }} />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
      {/* Asset Allocation & Performance */}
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
        {/* Chart View Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">Portfolio Analysis</Typography>
          <ButtonGroup size="small">
            <Button 
              variant={chartView === 'allocation' ? 'contained' : 'outlined'}
              onClick={() => handleChartViewChange('allocation')}
              startIcon={<DonutLargeIcon />}
            >
              Allocation
            </Button>
            <Button 
              variant={chartView === 'performance' ? 'contained' : 'outlined'}
              onClick={() => handleChartViewChange('performance')}
              startIcon={<ShowChartIcon />}
            >
              Performance
            </Button>
            <Button 
              variant={chartView === 'risk' ? 'contained' : 'outlined'}
              onClick={() => handleChartViewChange('risk')}
              startIcon={<EqualizerIcon />}
            >
              Risk
            </Button>
          </ButtonGroup>
        </Box>
        
        {/* Asset Allocation Chart */}
        {chartView === 'allocation' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Box sx={{ height: 400, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={140}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<AllocationTooltip />} />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ paddingLeft: 20 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Asset Class Allocation
              </Typography>
              <Box sx={{ mb: 3 }}>
                {assetAllocation.map((asset) => (
                  <Box key={asset.name} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            display: 'inline-block', 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: asset.color, 
                            mr: 1 
                          }} 
                        />
                        <Typography variant="body2">{asset.name}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {((asset.value / portfolioValue) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: 6, 
                        bgcolor: alpha(asset.color, 0.2),
                        borderRadius: 3
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: `${(asset.value / portfolioValue) * 100}%`, 
                          height: '100%', 
                          bgcolor: asset.color,
                          borderRadius: 3
                        }} 
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Summary Statistics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                      <Typography variant="body2" color="text.secondary">Diversification Score</Typography>
                      <Typography variant="h6" fontWeight="bold" color="primary.main">78/100</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.05) }}>
                      <Typography variant="body2" color="text.secondary">Risk Level</Typography>
                      <Typography variant="h6" fontWeight="bold" color="success.main">Moderate</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
        
        {/* Performance Chart */}
        {chartView === 'performance' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 400, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceHistory}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate}
                    />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <ChartTooltip content={<PerformanceTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="portfolio" 
                      stroke={theme.palette.primary.main} 
                      fillOpacity={1} 
                      fill="url(#colorPortfolio)" 
                      name="Portfolio"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke={theme.palette.secondary.main} 
                      fillOpacity={1} 
                      fill="url(#colorBenchmark)"
                      name="Benchmark" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Performance Metrics
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                  <Typography variant="body2" color="text.secondary">XIRR (Annualized)</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 0.5 }}>
                    <Typography variant="h5" fontWeight="bold" color="primary.main">
                      {formatPercentage(portfolioXIRR, true)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5, ml: 1, color: portfolioXIRR >= benchmarkXIRR ? 'success.main' : 'error.main' }}>
                      {portfolioXIRR >= benchmarkXIRR ? '+' : ''}{(portfolioXIRR - benchmarkXIRR).toFixed(1)}% vs benchmark
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Historical Returns
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
                        <Typography variant="caption" color="text.secondary">1-Year Return</Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary.main">
                          {formatPercentage(15.2, true)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
                        <Typography variant="caption" color="text.secondary">3-Year Return</Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary.main">
                          {formatPercentage(42.5, true)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
                        <Typography variant="caption" color="text.secondary">5-Year Return</Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary.main">
                          {formatPercentage(65.8, true)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
                        <Typography variant="caption" color="text.secondary">Since Inception</Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary.main">
                          {formatPercentage(85.4, true)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
        
        {/* Risk Metrics */}
        {chartView === 'risk' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 350, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} width={500} height={350} data={riskMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
                    <Radar name="Portfolio" dataKey="value" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
                    <Radar name="Benchmark" dataKey="benchmark" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Risk Analysis
              </Typography>
              
              {riskMetrics.map((metric) => (
                <Box key={metric.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2">{metric.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium"
                        color={(metric.name === 'Max Drawdown' || metric.name === 'Beta') 
                          ? (metric.value < metric.benchmark ? 'success.main' : 'error.main')
                          : (metric.value > metric.benchmark ? 'success.main' : 'error.main')}
                      >
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>vs</Typography>
                      <Typography variant="body2" color="text.secondary">{metric.benchmark}</Typography>
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: 8, 
                      bgcolor: alpha(theme.palette.divider, 0.2),
                      borderRadius: 4,
                      display: 'flex'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: `${(metric.value / Math.max(metric.value, metric.benchmark)) * 100}%`, 
                        height: '100%', 
                        bgcolor: theme.palette.primary.main,
                        borderRadius: 4
                      }} 
                    />
                  </Box>
                </Box>
              ))}
              
              <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
                <Typography variant="subtitle2" fontWeight="medium" color="info.main" gutterBottom>
                  Risk Assessment
                </Typography>
                <Typography variant="body2">
                  Your portfolio shows a lower volatility (12.2 vs 14.5) and higher Sharpe ratio (1.8 vs 1.5) than the benchmark, indicating better risk-adjusted returns. The lower beta of 0.85 suggests your portfolio is less volatile than the market.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
      {/* Portfolio Holdings Details */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1)
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">Portfolio Holdings</Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<CompareArrowsIcon />}
              size="small"
              sx={{ mr: 1 }}
            >
              Compare Benchmarks
            </Button>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              size="small"
            >
              Refresh Data
            </Button>
          </Box>
        </Box>
        
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 3,
            '& .MuiTab-root': {
              minWidth: 100,
              borderRadius: 2,
              mx: 0.5
            },
            '& .Mui-selected': {
              bgcolor: alpha(theme.palette.primary.main, 0.1)
            }
          }}
          TabIndicatorProps={{
            style: { display: 'none' }
          }}
        >
          <Tab label="All Holdings" />
          <Tab label="Mutual Funds" />
          <Tab label="Fixed Deposits" />
          <Tab label="Govt. Schemes" />
          <Tab label="Stocks" />
          <Tab label="US Equity" />
          <Tab label="Gold & Jewelry" />
          <Tab label="Crypto" />
        </Tabs>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Allocation</TableCell>
                <TableCell align="right">XIRR</TableCell>
                <TableCell align="right">Benchmark</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredHoldings().map((holding) => (
                <TableRow 
                  key={holding.id}
                  sx={{ 
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {holding.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={holding.type} 
                      size="small" 
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      {hideBalances ? '••••••••' : formatCurrency(holding.value)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {holding.allocation.toFixed(1)}%
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      fontWeight="bold"
                      color={holding.outperforming ? 'success.main' : 'error.main'}
                    >
                      {formatPercentage(holding.xirr, true)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="caption" color="text.secondary">
                        {holding.benchmark}
                      </Typography>
                      <Typography variant="body2">
                        {formatPercentage(holding.benchmarkReturn, true)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      icon={holding.outperforming ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      label={holding.outperforming ? "Outperforming" : "Underperforming"} 
                      size="small"
                      color={holding.outperforming ? "success" : "error"}
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {getFilteredHoldings().length === 0 && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No holdings found in this category.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PortfolioAnalytics;