// src/pages/PortfolioAnalytics.js
import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider,
  FormControl, InputLabel, Select, MenuItem, Button, ButtonGroup, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Avatar, IconButton, Tooltip, alpha, useTheme
} from '@mui/material';
import {
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
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
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

/**
 * PortfolioAnalytics Component
 * 
 * A comprehensive dashboard for analyzing family investment portfolios
 * Features include:
 * - Portfolio overview with performance metrics
 * - Asset allocation visualization
 * - Performance tracking over time
 * - Risk analysis metrics
 * - Detailed holdings breakdown
 * - Individual family member portfolio views
 */
const PortfolioAnalytics = () => {
  const theme = useTheme();
  
  // ============================================================
  // COMMON STYLES - Reusable style objects for consistent UI
  // ============================================================
  const styles = {
    // Container styles
    pageContainer: { 
      p: 3 
    },
    // Card styles
    cardBase: {
      p: 3, 
      borderRadius: 3,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
    },
    cardHover: {
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
      }
    },
    headerCard: {
      p: 3, 
      mb: 3, 
      borderRadius: 3,
      background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
    },
    // Background decoration styles
    headerDecoration: { 
      position: 'absolute', 
      top: -50, 
      right: -50, 
      width: '40%', 
      height: '200%', 
      opacity: 0.1, 
      background: `radial-gradient(circle, ${theme.palette.common.white} 0%, transparent 70%)` 
    },
    // Insights card styles
    insightCard: (color) => ({
      borderRadius: 2, 
      borderColor: alpha(color, 0.3),
      bgcolor: alpha(color, 0.05),
      height: '100%',
      p: 2,
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.03)'
    }),
    // Performer card styles
    performerCard: (color, index, items) => ({
      mb: index < items.length - 1 ? 2 : 0,
      p: 2, 
      borderRadius: 2,
      bgcolor: alpha(color, 0.05),
      border: '1px solid',
      borderColor: alpha(color, 0.1),
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'translateX(5px)',
        boxShadow: `0 4px 8px ${alpha(color, 0.1)}`
      }
    }),
    // Member Tabs
    memberTabs: {
      mb: 3, 
      display: 'flex', 
      justifyContent: 'center', 
      position: 'relative', 
      zIndex: 5
    },
    // Chip styles
    memberChip: (owner, familyMembers) => ({
      fontWeight: 'medium',
      bgcolor: 'transparent',
      border: '1px solid',
      borderColor: alpha(owner === 'family' 
        ? theme.palette.primary.main 
        : familyMembers.find(m => m.id === owner)?.color || theme.palette.grey[500], 0.3)
    }),
    statusChip: (positive) => ({
      bgcolor: alpha(positive ? theme.palette.success.main : theme.palette.error.main, 0.1),
      color: positive ? theme.palette.success.main : theme.palette.error.main,
      fontWeight: 'medium'
    }),
    // Tab styles
    tabsStyle: {
      '& .MuiTab-root': {
        color: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '16px',
        minHeight: '64px',
        p: 1,
        mx: 0.5,
        textTransform: 'none',
        fontWeight: 'medium',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.9)',
          bgcolor: 'rgba(255, 255, 255, 0.1)'
        },
        '&.Mui-selected': {
          color: 'white',
          fontWeight: 'bold',
          bgcolor: 'rgba(255, 255, 255, 0.15)'
        }
      }
    },
    categoryTabs: {
      mb: 3,
      '& .MuiTab-root': {
        minWidth: 100,
        borderRadius: 2,
        mx: 0.5,
        textTransform: 'none'
      },
      '& .Mui-selected': {
        bgcolor: alpha(theme.palette.primary.main, 0.1)
      }
    },
    // Chart containers
    chartContainer: { 
      height: 180, 
      width: '100%', 
      mt: 2 
    },
    allocChartContainer: {
      height: 400, 
      width: '100%'
    },
    riskChartContainer: {
      height: 350, 
      width: '100%'
    },
    // Button group
    viewToggle: {
      borderRadius: '12px',
      '& .MuiButton-root': {
        borderRadius: 0,
        textTransform: 'none',
        px: 2
      },
      '& .MuiButton-root:first-of-type': {
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px'
      },
      '& .MuiButton-root:last-of-type': {
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px'
      },
      overflow: 'hidden'
    },
    // Time period buttons
    timePeriodButton: (active) => ({
      bgcolor: active ? 'rgba(255,255,255,0.2)' : 'transparent',
      border: '1px solid rgba(255,255,255,0.3)',
      color: 'white',
      '&:hover': {
        bgcolor: active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'
      }
    }),
    // Visual indicator for change (increase/decrease)
    changeIndicator: (isPositive) => ({
      display: 'flex', 
      alignItems: 'center',
      py: 0.75,
      px: 1.5, 
      borderRadius: 2,
      bgcolor: 'rgba(255, 255, 255, 0.95)',  // White background
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', 
      border: `1px solid ${isPositive ? 'rgba(46, 125, 50, 0.3)' : 'rgba(211, 47, 47, 0.3)'}`
    }),
    // Tooltip
    tooltipPaper: {
      p: 2, 
      boxShadow: theme.shadows[3]
    }
  };

  // ============================================================
  // STATE DEFINITIONS - Application state management
  // ============================================================
  
  // UI state - Controls visibility and display options
  const [hideBalances, setHideBalances] = useState(false);
  const [timePeriod, setTimePeriod] = useState('1Y');
  const [selectedMember, setSelectedMember] = useState('family');
  
  // View state - Controls which data visualizations are shown
  const [chartView, setChartView] = useState('allocation');
  const [activeTab, setActiveTab] = useState(0);
  
  // ============================================================
  // SAMPLE DATA - Mock data for demonstration
  // ============================================================
  
  // Family members data - Basic info about each family member
  const familyMembers = [
    { id: 'family', name: 'All Family', avatar: <GroupsIcon />, color: theme.palette.primary.main },
    { id: 'parent1', name: 'Raj', avatar: '👨', color: '#1976d2' },
    { id: 'parent2', name: 'Meera', avatar: '👩', color: '#9c27b0' },
    { id: 'child1', name: 'Arjun', avatar: '👦', color: '#2e7d32' },
    { id: 'child2', name: 'Anjali', avatar: '👧', color: '#d32f2f' }
  ];
  
  // Asset class allocation with owner data - Shows how investment is distributed
  const assetAllocation = [
    { name: 'Mutual Funds', value: 3850000, color: theme.palette.primary.main, xirr: 14.2, benchmark: 12.5, owner: 'parent1' },
    { name: 'Fixed Deposits', value: 2200000, color: theme.palette.secondary.main, xirr: 7.1, benchmark: 6.5, owner: 'parent2' },
    { name: 'Govt. Schemes', value: 1800000, color: theme.palette.success.main, xirr: 8.0, benchmark: 7.5, owner: 'parent1' },
    { name: 'Stocks', value: 1500000, color: theme.palette.error.main, xirr: 18.5, benchmark: 15.2, owner: 'parent2' },
    { name: 'Gold & Jewelry', value: 1200000, color: theme.palette.warning.main, xirr: 9.5, benchmark: 10.2, owner: 'parent2' },
    { name: 'US Equity', value: 850000, color: theme.palette.info.main, xirr: 16.8, benchmark: 15.0, owner: 'parent1' },
    { name: 'Cash', value: 450000, color: '#607d8b', xirr: 3.5, benchmark: 3.5, owner: 'family' },
    { name: 'Crypto', value: 250000, color: '#9c27b0', xirr: 22.0, benchmark: 25.0, owner: 'child1' }
  ];
  
  // Family member's individual asset allocation
  const memberAssetAllocation = {
    'parent1': [
      { name: 'Mutual Funds', value: 3200000, color: theme.palette.primary.main, xirr: 15.1, benchmark: 12.5 },
      { name: 'Govt. Schemes', value: 1800000, color: theme.palette.success.main, xirr: 8.0, benchmark: 7.5 },
      { name: 'US Equity', value: 850000, color: theme.palette.info.main, xirr: 16.8, benchmark: 15.0 },
      { name: 'Cash', value: 250000, color: '#607d8b', xirr: 3.5, benchmark: 3.5 }
    ],
    'parent2': [
      { name: 'Fixed Deposits', value: 2200000, color: theme.palette.secondary.main, xirr: 7.1, benchmark: 6.5 },
      { name: 'Stocks', value: 1500000, color: theme.palette.error.main, xirr: 18.5, benchmark: 15.2 },
      { name: 'Gold & Jewelry', value: 1200000, color: theme.palette.warning.main, xirr: 9.5, benchmark: 10.2 },
      { name: 'Cash', value: 100000, color: '#607d8b', xirr: 3.5, benchmark: 3.5 }
    ],
    'child1': [
      { name: 'Mutual Funds', value: 650000, color: theme.palette.primary.main, xirr: 12.5, benchmark: 12.5 },
      { name: 'Crypto', value: 250000, color: '#9c27b0', xirr: 22.0, benchmark: 25.0 },
      { name: 'Cash', value: 50000, color: '#607d8b', xirr: 3.5, benchmark: 3.5 }
    ],
    'child2': [
      { name: 'Fixed Deposits', value: 300000, color: theme.palette.secondary.main, xirr: 6.8, benchmark: 6.5 },
      { name: 'Cash', value: 50000, color: '#607d8b', xirr: 3.5, benchmark: 3.5 }
    ],
    'family': [
      { name: 'Cash', value: 450000, color: '#607d8b', xirr: 3.5, benchmark: 3.5 }
    ]
  };
  
  // Performance history over time for each family member - Monthly returns data
  const performanceHistoryByMember = {
    'family': [
      { date: '2023-04', portfolio: 4.2, benchmark: 3.8 },
      { date: '2023-05', portfolio: 4.8, benchmark: 4.2 },
      { date: '2023-06', portfolio: 5.5, benchmark: 4.8 },
      { date: '2023-07', portfolio: 5.8, benchmark: 5.2 },
      { date: '2023-08', portfolio: 6.2, benchmark: 5.5 },
      { date: '2023-09', portfolio: 6.8, benchmark: 6.0 },
      { date: '2023-10', portfolio: 7.2, benchmark: 6.5 },
      { date: '2023-11', portfolio: 7.5, benchmark: 6.8 },
      { date: '2023-12', portfolio: 7.8, benchmark: 7.0 },
      { date: '2024-01', portfolio: 8.1, benchmark: 7.3 },
      { date: '2024-02', portfolio: 8.5, benchmark: 7.5 },
      { date: '2024-03', portfolio: 8.8, benchmark: 7.8 },
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
    ],
    'parent1': [
      { date: '2023-04', portfolio: 4.8, benchmark: 4.2 },
      { date: '2023-05', portfolio: 5.5, benchmark: 4.8 },
      { date: '2023-06', portfolio: 6.2, benchmark: 5.5 },
      { date: '2023-07', portfolio: 6.5, benchmark: 5.8 },
      { date: '2023-08', portfolio: 7.0, benchmark: 6.2 },
      { date: '2023-09', portfolio: 7.5, benchmark: 6.8 },
      { date: '2023-10', portfolio: 8.0, benchmark: 7.2 },
      { date: '2023-11', portfolio: 8.3, benchmark: 7.5 },
      { date: '2023-12', portfolio: 8.6, benchmark: 7.8 },
      { date: '2024-01', portfolio: 8.9, benchmark: 8.0 },
      { date: '2024-02', portfolio: 9.2, benchmark: 8.2 },
      { date: '2024-03', portfolio: 9.5, benchmark: 8.5 },
      { date: '2024-04', portfolio: 9.2, benchmark: 8.1 },
      { date: '2024-05', portfolio: 8.0, benchmark: 7.2 },
      { date: '2024-06', portfolio: 10.0, benchmark: 8.8 },
      { date: '2024-07', portfolio: 11.5, benchmark: 9.8 },
      { date: '2024-08', portfolio: 12.2, benchmark: 10.5 },
      { date: '2024-09', portfolio: 13.0, benchmark: 11.8 },
      { date: '2024-10', portfolio: 12.5, benchmark: 11.4 },
      { date: '2024-11', portfolio: 13.5, benchmark: 12.0 },
      { date: '2024-12', portfolio: 14.0, benchmark: 12.8 },
      { date: '2025-01', portfolio: 14.8, benchmark: 13.2 },
      { date: '2025-02', portfolio: 15.5, benchmark: 13.8 },
      { date: '2025-03', portfolio: 16.2, benchmark: 14.3 }
    ],
    'parent2': [
      { date: '2023-04', portfolio: 3.8, benchmark: 3.5 },
      { date: '2023-05', portfolio: 4.2, benchmark: 3.8 },
      { date: '2023-06', portfolio: 4.8, benchmark: 4.2 },
      { date: '2023-07', portfolio: 5.2, benchmark: 4.8 },
      { date: '2023-08', portfolio: 5.8, benchmark: 5.2 },
      { date: '2023-09', portfolio: 6.2, benchmark: 5.8 },
      { date: '2023-10', portfolio: 6.5, benchmark: 6.0 },
      { date: '2023-11', portfolio: 6.8, benchmark: 6.2 },
      { date: '2023-12', portfolio: 7.0, benchmark: 6.5 },
      { date: '2024-01', portfolio: 7.2, benchmark: 6.8 },
      { date: '2024-02', portfolio: 7.5, benchmark: 7.0 },
      { date: '2024-03', portfolio: 7.8, benchmark: 7.2 },
      { date: '2024-04', portfolio: 7.8, benchmark: 7.5 },
      { date: '2024-05', portfolio: 6.5, benchmark: 6.2 },
      { date: '2024-06', portfolio: 8.4, benchmark: 8.0 },
      { date: '2024-07', portfolio: 9.5, benchmark: 9.2 },
      { date: '2024-08', portfolio: 10.8, benchmark: 9.9 },
      { date: '2024-09', portfolio: 11.2, benchmark: 11.0 },
      { date: '2024-10', portfolio: 10.8, benchmark: 10.5 },
      { date: '2024-11', portfolio: 11.5, benchmark: 11.5 },
      { date: '2024-12', portfolio: 12.5, benchmark: 12.0 },
      { date: '2025-01', portfolio: 13.0, benchmark: 12.8 },
      { date: '2025-02', portfolio: 13.8, benchmark: 13.2 },
      { date: '2025-03', portfolio: 14.5, benchmark: 13.8 }
    ],
    'child1': [
      { date: '2023-04', portfolio: 6.5, benchmark: 4.5 },
      { date: '2023-05', portfolio: 7.5, benchmark: 5.2 },
      { date: '2023-06', portfolio: 8.5, benchmark: 5.8 },
      { date: '2023-07', portfolio: 9.2, benchmark: 6.5 },
      { date: '2023-08', portfolio: 10.0, benchmark: 7.0 },
      { date: '2023-09', portfolio: 10.8, benchmark: 7.5 },
      { date: '2023-10', portfolio: 11.2, benchmark: 8.0 },
      { date: '2023-11', portfolio: 11.8, benchmark: 8.5 },
      { date: '2023-12', portfolio: 12.5, benchmark: 9.0 },
      { date: '2024-01', portfolio: 13.2, benchmark: 9.5 },
      { date: '2024-02', portfolio: 14.0, benchmark: 10.0 },
      { date: '2024-03', portfolio: 14.8, benchmark: 10.5 },
      { date: '2024-04', portfolio: 11.5, benchmark: 8.5 },
      { date: '2024-05', portfolio: 9.8, benchmark: 7.5 },
      { date: '2024-06', portfolio: 12.5, benchmark: 9.0 },
      { date: '2024-07', portfolio: 14.0, benchmark: 10.0 },
      { date: '2024-08', portfolio: 15.5, benchmark: 11.0 },
      { date: '2024-09', portfolio: 16.2, benchmark: 12.0 },
      { date: '2024-10', portfolio: 15.5, benchmark: 11.5 },
      { date: '2024-11', portfolio: 16.8, benchmark: 12.5 },
      { date: '2024-12', portfolio: 17.5, benchmark: 13.0 },
      { date: '2025-01', portfolio: 18.2, benchmark: 13.5 },
      { date: '2025-02', portfolio: 19.0, benchmark: 14.0 },
      { date: '2025-03', portfolio: 19.8, benchmark: 14.5 }
    ],
    'child2': [
      { date: '2023-04', portfolio: 3.2, benchmark: 3.5 },
      { date: '2023-05', portfolio: 3.5, benchmark: 3.8 },
      { date: '2023-06', portfolio: 3.8, benchmark: 4.0 },
      { date: '2023-07', portfolio: 4.0, benchmark: 4.2 },
      { date: '2023-08', portfolio: 4.2, benchmark: 4.5 },
      { date: '2023-09', portfolio: 4.5, benchmark: 4.8 },
      { date: '2023-10', portfolio: 4.8, benchmark: 5.0 },
      { date: '2023-11', portfolio: 5.0, benchmark: 5.2 },
      { date: '2023-12', portfolio: 5.2, benchmark: 5.5 },
      { date: '2024-01', portfolio: 5.5, benchmark: 5.8 },
      { date: '2024-02', portfolio: 5.8, benchmark: 6.0 },
      { date: '2024-03', portfolio: 6.0, benchmark: 6.2 },
      { date: '2024-04', portfolio: 6.2, benchmark: 6.5 },
      { date: '2024-05', portfolio: 5.8, benchmark: 6.0 },
      { date: '2024-06', portfolio: 6.5, benchmark: 6.8 },
      { date: '2024-07', portfolio: 6.8, benchmark: 7.0 },
      { date: '2024-08', portfolio: 7.0, benchmark: 7.2 },
      { date: '2024-09', portfolio: 7.2, benchmark: 7.5 },
      { date: '2024-10', portfolio: 7.0, benchmark: 7.3 },
      { date: '2024-11', portfolio: 7.3, benchmark: 7.5 },
      { date: '2024-12', portfolio: 7.5, benchmark: 7.8 },
      { date: '2025-01', portfolio: 7.8, benchmark: 8.0 },
      { date: '2025-02', portfolio: 8.0, benchmark: 8.2 },
      { date: '2025-03', portfolio: 8.2, benchmark: 8.5 }
    ]
  };
  
  // Risk metrics compared to benchmark for each family member
  const riskMetricsByMember = {
    'family': [
      { name: 'Volatility', value: 12.2, benchmark: 14.5 },
      { name: 'Sharpe Ratio', value: 1.8, benchmark: 1.5 },
      { name: 'Sortino Ratio', value: 2.2, benchmark: 1.8 },
      { name: 'Max Drawdown', value: 15.5, benchmark: 18.2 },
      { name: 'Beta', value: 0.85, benchmark: 1.0 }
    ],
    'parent1': [
      { name: 'Volatility', value: 11.5, benchmark: 13.8 },
      { name: 'Sharpe Ratio', value: 2.0, benchmark: 1.6 },
      { name: 'Sortino Ratio', value: 2.4, benchmark: 1.9 },
      { name: 'Max Drawdown', value: 14.8, benchmark: 17.5 },
      { name: 'Beta', value: 0.82, benchmark: 1.0 }
    ],
    'parent2': [
      { name: 'Volatility', value: 12.8, benchmark: 14.2 },
      { name: 'Sharpe Ratio', value: 1.7, benchmark: 1.5 },
      { name: 'Sortino Ratio', value: 2.1, benchmark: 1.8 },
      { name: 'Max Drawdown', value: 16.2, benchmark: 18.0 },
      { name: 'Beta', value: 0.88, benchmark: 1.0 }
    ],
    'child1': [
      { name: 'Volatility', value: 18.5, benchmark: 20.2 },
      { name: 'Sharpe Ratio', value: 1.5, benchmark: 1.3 },
      { name: 'Sortino Ratio', value: 1.8, benchmark: 1.5 },
      { name: 'Max Drawdown', value: 22.5, benchmark: 24.8 },
      { name: 'Beta', value: 1.1, benchmark: 1.0 }
    ],
    'child2': [
      { name: 'Volatility', value: 8.5, benchmark: 9.2 },
      { name: 'Sharpe Ratio', value: 1.2, benchmark: 1.3 },
      { name: 'Sortino Ratio', value: 1.5, benchmark: 1.6 },
      { name: 'Max Drawdown', value: 10.5, benchmark: 12.2 },
      { name: 'Beta', value: 0.75, benchmark: 1.0 }
    ]
  };
  
  // Detailed holdings data with owner information
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
      outperforming: true,
      owner: 'parent1'
    },
    // Rest of the holdings data...
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
      outperforming: false,
      owner: 'family'
    }
  ];
  
  // ============================================================
  // UTILITY FUNCTIONS - Data processing and calculations
  // ============================================================
  
  /**
   * Gets filtered asset allocation based on selected family member
   * @returns {Array} Filtered asset allocation data
   */
  const getFilteredAssetAllocation = () => {
    if (selectedMember === 'family') {
      return assetAllocation;
    }
    
    // Get member assets (without including family assets)
    return memberAssetAllocation[selectedMember];
  };
  
  /**
   * Gets performance history for the selected member with time period filter applied
   * @returns {Array} Filtered performance history data
   */
  const getFilteredPerformanceHistory = () => {
    const memberHistory = performanceHistoryByMember[selectedMember];
    
    // Apply time period filter - slice the appropriate number of months from the end
    switch (timePeriod) {
      case '3M':
        return memberHistory.slice(-3);
      case '6M':
        return memberHistory.slice(-6);
      case '1Y':
        return memberHistory.slice(-12);
      case '3Y':
        // Note: Using all available data since our mock data has 24 months
        return memberHistory;
      case 'ALL':
        return memberHistory;
      default:
        return memberHistory.slice(-12);
    }
  };
  
  /**
   * Gets risk metrics for the selected family member
   * @returns {Array} Risk metrics data
   */
  const getRiskMetrics = () => {
    return riskMetricsByMember[selectedMember];
  };
  
  /**
   * Filters holdings based on selected tab and family member
   * @returns {Array} Filtered holdings data
   */
  const getFilteredHoldings = () => {
    // First filter by owner - only show holdings owned directly by the member (not family holdings)
    const memberHoldings = selectedMember === 'family' 
      ? holdings 
      : holdings.filter(h => h.owner === selectedMember);
    
    // Then filter by category tab
    switch (activeTab) {
      case 0:  // All
        return memberHoldings;
      case 1:  // Mutual Funds
        return memberHoldings.filter(h => h.category === 'Mutual Funds');
      case 2:  // Fixed Deposits
        return memberHoldings.filter(h => h.category === 'Fixed Deposits');
      case 3:  // Govt. Schemes
        return memberHoldings.filter(h => h.category === 'Govt. Schemes');
      case 4:  // Stocks
        return memberHoldings.filter(h => h.category === 'Stocks');
      case 5:  // US Equity
        return memberHoldings.filter(h => h.category === 'US Equity');
      case 6:  // Gold & Jewelry
        return memberHoldings.filter(h => h.category === 'Gold & Jewelry');
      case 7:  // Crypto
        return memberHoldings.filter(h => h.category === 'Crypto');
      default:
        return memberHoldings;
    }
  };
  
  // ============================================================
  // DERIVED DATA - Calculations based on filtered data
  // ============================================================
  
  // Portfolio calculations based on filtered data
  const filteredAssetAllocation = getFilteredAssetAllocation();
  const portfolioValue = filteredAssetAllocation.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate weighted average returns
  const portfolioXIRR = filteredAssetAllocation.reduce((sum, item) => sum + (item.xirr * item.value), 0) / portfolioValue;
  const benchmarkXIRR = filteredAssetAllocation.reduce((sum, item) => sum + (item.benchmark * item.value), 0) / portfolioValue;
  
  // Sort assets by XIRR for top and bottom performers
  const sortedByXIRR = [...filteredAssetAllocation].sort((a, b) => b.xirr - a.xirr);
  const topPerformers = sortedByXIRR.slice(0, 3);
  const bottomPerformers = [...sortedByXIRR].reverse().slice(0, 3);
  
  // ============================================================
  // FORMATTER FUNCTIONS - For consistent data display
  // ============================================================
  
  /**
   * Formats currency values with INR symbol
   * @param {number} value - The value to format
   * @returns {string} Formatted currency string
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  /**
   * Formats percentage values with % symbol and optional plus sign
   * @param {number} value - The value to format
   * @param {boolean} plusSign - Whether to include a plus sign for positive values
   * @returns {string} Formatted percentage string
   */
  const formatPercentage = (value, plusSign = false) => {
    return `${plusSign && value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  /**
   * Formats date strings into readable month-year format
   * @param {string} dateString - Date in YYYY-MM format
   * @returns {string} Formatted date string (e.g. "Mar 2025")
   */
  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };

  // ============================================================
  // EVENT HANDLERS - UI interaction handlers
  // ============================================================
  
  /**
   * Handles tab change in holdings section
   * @param {object} event - The event object
   * @param {number} newValue - The new tab index
   */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  /**
   * Handles chart view change between allocation, performance, and risk
   * @param {string} view - The new view to display
   */
  const handleChartViewChange = (view) => {
    setChartView(view);
  };
  
  /**
   * Handles time period change for performance charts
   * Triggers re-filtering of performance data
   * @param {string} period - The time period to display (3M, 6M, 1Y, 3Y, ALL)
   */
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    // Data filtering happens in getFilteredPerformanceHistory()
  };
  
  /**
   * Toggles visibility of balance amounts for privacy
   */
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };
  
  /**
   * Handles family member selection change
   * @param {object} event - The event object
   * @param {string} newMember - The ID of the newly selected member
   */
  const handleMemberChange = (event, newMember) => {
    if (newMember) {
      setSelectedMember(newMember);
    }
  };
  
  // ============================================================
  // COMPONENT FUNCTIONS - UI section rendering
  // ============================================================
  
  /**
   * Custom tooltip component for allocation charts
   * Shows detailed information on hover
   */
  const AllocationTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={styles.tooltipPaper}>
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
          {selectedMember === 'family' && data.owner && data.owner !== 'family' && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, pt: 1, borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
              <Typography variant="body2" color="text.secondary">Owner:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {familyMembers.find(m => m.id === data.owner)?.name || 'Family'}
              </Typography>
            </Box>
          )}
        </Paper>
      );
    }
    return null;
  };
  
  /**
   * Custom tooltip component for performance charts
   * Shows portfolio vs benchmark data on hover
   */
  const PerformanceTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={styles.tooltipPaper}>
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
  
  /**
   * Renders the portfolio header with performance chart and controls
   * @returns {JSX.Element} Portfolio header component
   */
  const renderPortfolioHeader = () => (
    <Paper elevation={0} sx={styles.headerCard}>
      <Box sx={styles.headerDecoration} />
      
      {/* Member Selection */}
      <Box sx={styles.memberTabs}>
        <Tabs
          value={selectedMember}
          onChange={handleMemberChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: { background: 'rgba(255, 255, 255, 0.8)' }
          }}
          sx={styles.tabsStyle}
        >
          {familyMembers.map(member => (
            <Tab 
              key={member.id}
              value={member.id}
              icon={
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(member.color, 0.2),
                    color: 'white',
                    width: 36,
                    height: 36,
                    mb: 0.5,
                    fontSize: typeof member.avatar === 'string' ? 20 : 'inherit'
                  }}
                >
                  {member.avatar}
                </Avatar>
              }
              label={member.name}
              iconPosition="top"
            />
          ))}
        </Tabs>
      </Box>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
            <Typography variant="h4" fontWeight="bold" component="h1">
              {selectedMember === 'family' ? 'Family Portfolio' : `${familyMembers.find(m => m.id === selectedMember)?.name}'s Portfolio`}
            </Typography>
            <IconButton 
              sx={{ ml: 2, color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
              onClick={toggleBalancesVisibility}
              size="small"
            >
              {hideBalances ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
              {hideBalances ? '••••••••' : formatCurrency(portfolioValue)}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Total Portfolio Value
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={styles.changeIndicator(portfolioXIRR >= benchmarkXIRR)}>
              {portfolioXIRR >= benchmarkXIRR ? 
                <TrendingUpIcon fontSize="small" sx={{ color: '#2e7d32' }} /> : 
                <TrendingDownIcon fontSize="small" sx={{ color: '#d32f2f' }} />
              }
              <Typography 
                variant="body1" 
                sx={{ 
                  ml: 0.5,
                  fontWeight: 'medium',
                  color: portfolioXIRR >= benchmarkXIRR ? '#2e7d32' : '#d32f2f'
                }}
              >
                {formatPercentage(portfolioXIRR, true)}
                <span style={{ 
                  display: 'inline-block', 
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  color: 'inherit'
                }}>
                  XIRR
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {/* Time Period Selector - Fixed in this implementation */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
            {['3M', '6M', '1Y', '3Y', 'ALL'].map(period => (
              <Button 
                key={period}
                size="small"
                variant={timePeriod === period ? "contained" : "outlined"}
                onClick={() => handleTimePeriodChange(period)}
                sx={styles.timePeriodButton(timePeriod === period)}
              >
                {period}
              </Button>
            ))}
          </Box>
          
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 1, textAlign: 'right' }}>
            Performance vs Benchmark
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flex: 1, height: 10, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 5, mr: 2 }}>
              <Box 
                sx={{
                  height: '100%',
                  width: `${(portfolioXIRR / Math.max(portfolioXIRR, benchmarkXIRR)) * 100}%`,
                  bgcolor: portfolioXIRR >= benchmarkXIRR ? '#4caf50' : '#f44336',
                  borderRadius: 5
                }}
              />
            </Box>
            <Typography variant="body1" fontWeight="bold">
              {((portfolioXIRR / benchmarkXIRR) * 100).toFixed(0)}%
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, opacity: 0.75 }} />
            <Typography variant="body2" sx={{ mr: 1 }}>
              Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </Typography>
            <IconButton size="small" sx={{ color: 'white', p: 0.5 }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          {/* Performance Chart */}
          <Box sx={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getFilteredPerformanceHistory()}
                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
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
  );
  
  /**
   * Renders the portfolio insights section
   * @returns {JSX.Element} Portfolio insights component
   */
  const renderPortfolioInsights = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12}>
        <Paper elevation={0} sx={styles.cardBase}>
          <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
            Portfolio Insights
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card 
                variant="outlined" 
                sx={styles.insightCard(theme.palette.success.main)}
              >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Strongest Asset Class
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', mb: 1 }}>
                  {selectedMember === 'family' ? 'Crypto' : 
                  selectedMember === 'parent1' ? 'US Equity' : 
                  selectedMember === 'parent2' ? 'Stocks' : 
                  selectedMember === 'child1' ? 'Crypto' : 'Fixed Deposits'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {selectedMember === 'family' ? 'Returned ': 
                  selectedMember === 'parent1' ? 'Returned ' : 
                  selectedMember === 'parent2' ? 'Returned ' : 
                  selectedMember === 'child1' ? 'Returned ' : 'Returned '}
                  <strong style={{ color: theme.palette.success.main }}>
                    {selectedMember === 'family' ? '+22.0%' : 
                    selectedMember === 'parent1' ? '+16.8%' : 
                    selectedMember === 'parent2' ? '+18.5%' : 
                    selectedMember === 'child1' ? '+32.5%' : '+6.8%'}
                  </strong> this year
                </Typography>
                <Chip 
                  icon={<ArrowUpwardIcon fontSize="small" />} 
                  label={selectedMember === 'family' ? '7.8% over benchmark' : 
                          selectedMember === 'parent1' ? '1.8% over benchmark' : 
                          selectedMember === 'parent2' ? '3.3% over benchmark' : 
                          selectedMember === 'child1' ? 'Double-digit growth' : '0.3% over benchmark'} 
                  size="small"
                  sx={styles.statusChip(true)}
                />
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Card 
                variant="outlined" 
                sx={styles.insightCard(theme.palette.warning.main)}
              >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Allocation Alert
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', mb: 1 }}>
                  {selectedMember === 'family' ? 'Cash Position' : 
                  selectedMember === 'parent1' ? 'Mutual Funds' : 
                  selectedMember === 'parent2' ? 'Fixed Deposits' : 
                  selectedMember === 'child1' ? 'Crypto Exposure' : 'Diversification'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong style={{ color: theme.palette.warning.main }}>
                    {selectedMember === 'family' ? '3.8%' : 
                    selectedMember === 'parent1' ? '52.5%' : 
                    selectedMember === 'parent2' ? '44.0%' : 
                    selectedMember === 'child1' ? '26.3%' : '85.7%'}
                  </strong> {selectedMember === 'family' ? 'cash may be underperforming inflation' : 
                            selectedMember === 'parent1' ? 'in single asset class' : 
                            selectedMember === 'parent2' ? 'in fixed income' : 
                            selectedMember === 'child1' ? 'in high volatility assets' : 'in fixed deposits'}
                </Typography>
                <Chip 
                  icon={<InfoOutlinedIcon fontSize="small" />} 
                  label={selectedMember === 'family' ? 'Consider reallocation' : 
                        selectedMember === 'parent1' ? 'Reduce concentration' : 
                        selectedMember === 'parent2' ? 'Diversify for growth' : 
                        selectedMember === 'child1' ? 'High risk exposure' : 'Add growth assets'} 
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    fontWeight: 'medium'
                  }}
                />
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Card 
                variant="outlined" 
                sx={styles.insightCard(theme.palette.info.main)}
              >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Action Recommended
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', mb: 1 }}>
                  {selectedMember === 'family' ? 'Gold & Jewelry' : 
                  selectedMember === 'parent1' ? 'Govt. Schemes' : 
                  selectedMember === 'parent2' ? 'Gold & Jewelry' : 
                  selectedMember === 'child1' ? 'Portfolio Balance' : 'Risk Exposure'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {selectedMember === 'family' ? 'Underperforming benchmark by ' : 
                  selectedMember === 'parent1' ? 'PPF rate unchanged at ' : 
                  selectedMember === 'parent2' ? 'Gold underperforming by ' : 
                  selectedMember === 'child1' ? 'Consider adding ' : 'Consider adding '}
                  <strong style={{ color: theme.palette.info.main }}>
                    {selectedMember === 'family' ? '0.7%' : 
                    selectedMember === 'parent1' ? '7.1%' : 
                    selectedMember === 'parent2' ? '1.3%' : 
                    selectedMember === 'child1' ? 'lower risk' : 'equity exposure'}
                  </strong> {selectedMember === 'child1' ? 'assets for balance' : ''}
                </Typography>
                <Chip 
                  icon={<CompareArrowsIcon fontSize="small" />} 
                  label={selectedMember === 'family' ? 'Rebalance recommended' : 
                        selectedMember === 'parent1' ? 'Explore alternatives' : 
                        selectedMember === 'parent2' ? 'Review allocation' : 
                        selectedMember === 'child1' ? 'Reduce volatility' : 'Increase returns'} 
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    fontWeight: 'medium'
                  }}
                />
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
            <Typography variant="subtitle2" fontWeight="medium" color="info.main" gutterBottom>
              Portfolio Insights
            </Typography>
            <Typography variant="body2">
              {selectedMember === 'family' ? 
                "Your family's portfolio is performing well with a XIRR of 15.2%, outpacing the benchmark by 1.2%. Consider reallocating some of your cash position (3.8%) to inflation-beating assets. Your portfolio diversification score is good at 78/100, but Gold & Jewelry assets are underperforming their benchmark. SBI Small Cap Fund and Tata Motors are your best performers, while Cash and Bitcoin (vs benchmark) are lagging." :
                
                selectedMember === 'parent1' ? 
                "Raj's portfolio shows strong performance with a 16.2% XIRR, exceeding the benchmark by 1.9%. Your US Equity investments are performing exceptionally well. However, 52.5% allocation to Mutual Funds suggests high concentration risk. Consider diversifying some Mutual Fund holdings into other asset classes. PPF remains steady at 7.1% but exploring alternatives like corporate bonds could enhance yields while maintaining safety." :
                
                selectedMember === 'parent2' ? 
                "Meera's portfolio has a 14.5% XIRR, outperforming benchmark by 0.7%. Direct equity investments are your strongest performers, particularly Tata Motors with 24.5% returns. With 44% in Fixed Deposits, your portfolio is tilted towards safety over growth. Consider reallocating some FD holdings to growth assets to improve long-term returns. Gold investments are underperforming their benchmark by 1.3% and may need review." :
                
                selectedMember === 'child1' ? 
                "Arjun's aggressive portfolio has delivered impressive 19.8% returns, with Bitcoin leading at 32.5% XIRR. However, with 26.3% in cryptocurrency, your portfolio has high volatility (risk metrics show 18.5 vs benchmark 20.2). Consider balancing with some stable income-generating assets to reduce portfolio volatility while maintaining growth potential." :
                
                "Anjali's conservative portfolio has delivered 8.2% returns with Fixed Deposits as the primary asset (85.7%). While this provides stability, your returns are barely keeping pace with inflation. Consider adding some growth-oriented mutual funds to improve long-term returns. Your risk level is very low, indicating capacity to take on slightly higher risk for better returns."
              }
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
  
  /**
   * Renders the top and bottom performers sections
   * @returns {JSX.Element} Top and bottom performers component
   */
  const renderTopBottomPerformers = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {/* Top Performers */}
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={0}
          sx={{ 
            ...styles.cardBase,
            ...styles.cardHover,
            height: '100%'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ 
              bgcolor: alpha(theme.palette.success.main, 0.1), 
              color: theme.palette.success.main, 
              mr: 2 
            }}>
              <TrendingUpIcon />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Top Performers
            </Typography>
          </Box>
          
          {topPerformers.map((asset, index) => (
            <Box 
              key={asset.name}
              sx={styles.performerCard(theme.palette.success.main, index, topPerformers)}
            >
              <Grid container alignItems="center">
                <Grid item xs={7}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {asset.name}
                    </Typography>
                    {selectedMember === 'family' && asset.owner && asset.owner !== 'family' && (
                      <Tooltip title={`Owned by ${familyMembers.find(m => m.id === asset.owner)?.name || 'Family'}`}>
                        <Avatar 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            fontSize: '0.75rem', 
                            ml: 1,
                            bgcolor: alpha(familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[500], 0.2),
                            color: familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[700]
                          }}
                        >
                          {familyMembers.find(m => m.id === asset.owner)?.name.charAt(0) || 'F'}
                        </Avatar>
                      </Tooltip>
                    )}
                  </Box>
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
            ...styles.cardBase,
            ...styles.cardHover,
            height: '100%'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ 
              bgcolor: alpha(theme.palette.error.main, 0.1), 
              color: theme.palette.error.main, 
              mr: 2 
            }}>
              <TrendingDownIcon />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Bottom Performers
            </Typography>
          </Box>
          
          {bottomPerformers.map((asset, index) => (
            <Box 
              key={asset.name}
              sx={styles.performerCard(theme.palette.error.main, index, bottomPerformers)}
            >
              <Grid container alignItems="center">
                <Grid item xs={7}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {asset.name}
                    </Typography>
                    {selectedMember === 'family' && asset.owner && asset.owner !== 'family' && (
                      <Tooltip title={`Owned by ${familyMembers.find(m => m.id === asset.owner)?.name || 'Family'}`}>
                        <Avatar 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            fontSize: '0.75rem', 
                            ml: 1,
                            bgcolor: alpha(familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[500], 0.2),
                            color: familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[700]
                          }}
                        >
                          {familyMembers.find(m => m.id === asset.owner)?.name.charAt(0) || 'F'}
                        </Avatar>
                      </Tooltip>
                    )}
                  </Box>
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
  );
  
  /**
   * Renders the portfolio analysis section with tabs for different views
   * @returns {JSX.Element} Portfolio analysis component
   */
  const renderPortfolioAnalysis = () => (
    <Paper elevation={0} sx={{ ...styles.cardBase, mb: 3 }}>
      {/* Chart View Controls */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h6" fontWeight="medium">Portfolio Analysis</Typography>
        <ButtonGroup 
          variant="outlined" 
          size="small"
          sx={styles.viewToggle}
        >
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
      
      {/* Render charts based on selected view */}
      {chartView === 'allocation' && renderAllocationView()}
      {chartView === 'performance' && renderPerformanceView()}
      {chartView === 'risk' && renderRiskView()}
    </Paper>
  );
  
  /**
   * Renders the allocation view with pie chart and breakdown
   * @returns {JSX.Element} Allocation view component
   */
  const renderAllocationView = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={7}>
        <Box sx={styles.allocChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredAssetAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={140}
                paddingAngle={1}
                dataKey="value"
              >
                {filteredAssetAllocation.map((entry, index) => (
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
          {filteredAssetAllocation.map((asset) => (
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
                  {selectedMember === 'family' && asset.owner && asset.owner !== 'family' && (
                    <Tooltip title={`Owned by ${familyMembers.find(m => m.id === asset.owner)?.name || 'Family'}`}>
                      <Avatar 
                        sx={{ 
                          width: 16, 
                          height: 16, 
                          fontSize: '0.6rem', 
                          ml: 0.5,
                          bgcolor: alpha(familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[500], 0.2),
                          color: familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[700]
                        }}
                      >
                        {familyMembers.find(m => m.id === asset.owner)?.name.charAt(0) || 'F'}
                      </Avatar>
                    </Tooltip>
                  )}
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
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  {selectedMember === 'family' ? '78/100' : 
                    selectedMember === 'parent1' ? '72/100' : 
                    selectedMember === 'parent2' ? '68/100' : 
                    selectedMember === 'child1' ? '45/100' : '30/100'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.05) }}>
                <Typography variant="body2" color="text.secondary">Risk Level</Typography>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  {selectedMember === 'family' ? 'Moderate' : 
                    selectedMember === 'parent1' ? 'Moderate' : 
                    selectedMember === 'parent2' ? 'Moderate-Low' : 
                    selectedMember === 'child1' ? 'High' : 'Low'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
  
  /**
   * Renders the performance view with area chart and metrics
   * @returns {JSX.Element} Performance view component
   */
  const renderPerformanceView = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Box sx={styles.allocChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getFilteredPerformanceHistory()}
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha(theme.palette.divider, 0.5)} />
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
                    {selectedMember === 'family' ? formatPercentage(15.2, true) :
                      selectedMember === 'parent1' ? formatPercentage(16.2, true) :
                      selectedMember === 'parent2' ? formatPercentage(14.5, true) :
                      selectedMember === 'child1' ? formatPercentage(19.8, true) :
                      formatPercentage(8.2, true)
                    }
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
                  <Typography variant="caption" color="text.secondary">3-Year Return</Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary.main">
                    {selectedMember === 'family' ? formatPercentage(42.5, true) :
                      selectedMember === 'parent1' ? formatPercentage(48.5, true) :
                      selectedMember === 'parent2' ? formatPercentage(40.2, true) :
                      selectedMember === 'child1' ? formatPercentage(58.8, true) :
                      formatPercentage(22.2, true)
                    }
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
                  <Typography variant="caption" color="text.secondary">5-Year Return</Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary.main">
                    {selectedMember === 'family' ? formatPercentage(65.8, true) :
                      selectedMember === 'parent1' ? formatPercentage(70.5, true) :
                      selectedMember === 'parent2' ? formatPercentage(62.5, true) :
                      selectedMember === 'child1' ? formatPercentage(85.5, true) :
                      formatPercentage(32.5, true)
                    }
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
                  <Typography variant="caption" color="text.secondary">Since Inception</Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary.main">
                    {selectedMember === 'family' ? formatPercentage(85.4, true) :
                      selectedMember === 'parent1' ? formatPercentage(92.8, true) :
                      selectedMember === 'parent2' ? formatPercentage(78.5, true) :
                      selectedMember === 'child1' ? formatPercentage(105.2, true) :
                      formatPercentage(42.8, true)
                    }
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
  
  /**
   * Renders the risk view with radar chart and metrics
   * @returns {JSX.Element} Risk view component
   */
  const renderRiskView = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box sx={styles.riskChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={150} width={500} height={350} data={getRiskMetrics()}>
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
        
        {getRiskMetrics().map((metric) => (
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
            {selectedMember === 'family' ? 
              "Your family's portfolio shows a lower volatility (12.2 vs 14.5) and higher Sharpe ratio (1.8 vs 1.5) than the benchmark, indicating better risk-adjusted returns. The lower beta of 0.85 suggests your portfolio is less volatile than the market." :
              
              selectedMember === 'parent1' ? 
              "Raj's portfolio shows excellent risk-adjusted returns with a Sharpe ratio of 2.0 and lower volatility than the benchmark. The conservative beta of 0.82 indicates reduced market sensitivity while maintaining strong performance." :
              
              selectedMember === 'parent2' ? 
              "Meera's portfolio has a good balance of risk and return with a Sharpe ratio of 1.7. The volatility is slightly lower than the benchmark, and the beta of 0.88 suggests a relatively market-neutral approach." :
              
              selectedMember === 'child1' ? 
              "Arjun's portfolio shows higher volatility (18.5 vs 20.2) consistent with aggressive growth investments like cryptocurrency. The higher beta of 1.1 indicates above-market sensitivity, but this is balanced with strong returns." :
              
              "Anjali's portfolio is very conservative with low volatility (8.5) and beta (0.75), which explains the lower returns. Consider adding some growth assets to improve the Sharpe ratio which is currently below benchmark."
            }
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
  
  /**
   * Renders the portfolio holdings section with filterable list
   * @returns {JSX.Element} Portfolio holdings component
   */
  const renderPortfolioHoldings = () => (
    <Paper elevation={0} sx={styles.cardBase}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="medium">Portfolio Holdings</Typography>
        <Box>
          {/* Removed the "Compare Benchmarks" button as requested */}
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            size="small"
            sx={{ borderRadius: 2, textTransform: 'none' }}
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
        sx={styles.categoryTabs}
        TabIndicatorProps={{
          style: { display: 'none' }
        }}
      >
        <Tab label="All" />
        <Tab label="Mutual Funds" />
        <Tab label="Fixed Deposits" />
        <Tab label="Govt. Schemes" />
        <Tab label="Stocks" />
        <Tab label="US Equity" />
        <Tab label="Gold & Jewelry" />
        <Tab label="Crypto" />
      </Tabs>
      
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="portfolio holdings table">
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Value</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Allocation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">XIRR</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Benchmark</TableCell>
              {selectedMember === 'family' && <TableCell sx={{ fontWeight: 'bold' }}>Owner</TableCell>}
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredHoldings().map((holding) => (
              <TableRow
                key={holding.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) }
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      variant="rounded"
                      sx={{ 
                        width: 22, 
                        height: 22, 
                        fontSize: '0.75rem',
                        mr: 1,
                        bgcolor: alpha(
                          assetAllocation.find(a => a.name === holding.category)?.color || theme.palette.grey[500],
                          0.2
                        ),
                        color: assetAllocation.find(a => a.name === holding.category)?.color || theme.palette.grey[700]
                      }}
                    >
                      {holding.category.charAt(0)}
                    </Avatar>
                    {holding.name}
                  </Box>
                </TableCell>
                <TableCell>{holding.type}</TableCell>
                <TableCell align="right">{hideBalances ? '••••••••' : formatCurrency(holding.value)}</TableCell>
                <TableCell align="right">{holding.allocation}%</TableCell>
                <TableCell align="right">
                  <Typography 
                    sx={{ 
                      color: holding.xirr >= holding.benchmarkReturn ? 'success.main' : 'error.main',
                      fontWeight: 'medium'
                    }}
                  >
                    {formatPercentage(holding.xirr, true)}
                  </Typography>
                </TableCell>
                <TableCell align="right">{formatPercentage(holding.benchmarkReturn)}</TableCell>
                {selectedMember === 'family' && (
                  <TableCell>
                    <Chip 
                      size="small" 
                      label={familyMembers.find(m => m.id === holding.owner)?.name || 'Family'}
                      avatar={
                        <Avatar sx={{ bgcolor: 'transparent !important' }}>
                          {typeof familyMembers.find(m => m.id === holding.owner)?.avatar === 'string' ? 
                            familyMembers.find(m => m.id === holding.owner)?.avatar : 
                            <PersonIcon fontSize="small" />}
                        </Avatar>
                      }
                      sx={styles.memberChip(holding.owner, familyMembers)}
                    />
                  </TableCell>
                )}
                <TableCell align="center">
                  <Chip 
                    size="small" 
                    icon={holding.outperforming ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                    label={holding.outperforming ? "Outperforming" : "Underperforming"}
                    sx={styles.statusChip(holding.outperforming)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {getFilteredHoldings().length} of {holdings.length} holdings
        </Typography>
      </Box>
    </Paper>
  );
  
  // ============================================================
  // MAIN RENDER - Combines all sections into the complete UI
  // ============================================================
  return (
    <Box sx={styles.pageContainer}>
      {/* Portfolio Header */}
      {renderPortfolioHeader()}
      
      {/* Main Content Sections */}
      {renderPortfolioInsights()}
      {renderTopBottomPerformers()}
      {renderPortfolioAnalysis()}
      {renderPortfolioHoldings()}
    </Box>
  );
};

export default PortfolioAnalytics;