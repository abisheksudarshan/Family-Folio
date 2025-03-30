// src/pages/AssetsLiabilities.js
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, IconButton, InputAdornment,
  List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Tooltip,
  Avatar, alpha, useTheme, Badge, ToggleButtonGroup, ToggleButton, AvatarGroup,
  Tab, Tabs
} from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, 
  Legend, ResponsiveContainer, AreaChart, Area
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
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AssetsLiabilities = () => {
  const theme = useTheme();
  
  // ============================================================
  // COMMON STYLES - Reusable style objects
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
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
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
    // Avatar styles
    avatarStyle: (color) => ({
      bgcolor: alpha(color, 0.1),
      color: color,
      mr: 2
    }),
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
    // List item styles
    listItem: (color) => ({ 
      borderRadius: 2,
      mb: 1,
      transition: 'all 0.2s ease',
      '&:last-child': {
        mb: 0
      },
      '&:hover': {
        bgcolor: alpha(color, 0.05),
        transform: 'translateX(5px)'
      }
    }),
    // Category header
    categoryHeader: (color) => ({ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      p: 1.5,
      borderRadius: 2,
      bgcolor: alpha(color, 0.05),
      mb: 1,
      boxShadow: `0 2px 8px ${alpha(color, 0.1)}`
    }),
    // Member Tabs
    memberTabs: {
      mb: 3, 
      display: 'flex', 
      justifyContent: 'center', 
      position: 'relative', 
      zIndex: 5
    },
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
    // Dialog styles
    dialogPaper: { 
      borderRadius: 3, 
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
    },
    // Asset/liability list container
    listContainer: { 
      bgcolor: alpha(theme.palette.background.paper, 0.5),
      borderRadius: 2
    },
    // Button styles
    actionButton: {
      borderRadius: 2,
      textTransform: 'none',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
    },
    // Change indicator
    changeIndicator: (isPositive) => ({
      display: 'flex', 
      alignItems: 'center',
      py: 0.75,
      px: 1.5, 
      borderRadius: 2,
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', 
      border: `1px solid ${isPositive ? 'rgba(46, 125, 50, 0.3)' : 'rgba(211, 47, 47, 0.3)'}`,
    }),
    // Chart container
    chartContainer: { 
      height: 180, 
      width: '100%', 
      mt: 2 
    }
  };

  // ============================================================
  // STATE DEFINITIONS - Grouped by feature
  // ============================================================
  
  // UI state
  const [hideBalances, setHideBalances] = useState(false);
  const [timePeriod, setTimePeriod] = useState('1Y');
  const [selectedMember, setSelectedMember] = useState('family');
  
  // Dialog state
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
    notes: '',
    owner: 'family'
  });

  // ============================================================
  // SAMPLE DATA - All mock data grouped together
  // ============================================================
  
  // Family members data
  const familyMembers = [
    { id: 'family', name: 'All Family', avatar: <GroupsIcon />, color: theme.palette.primary.main },
    { id: 'parent1', name: 'Raj', avatar: '👨', color: '#1976d2' },
    { id: 'parent2', name: 'Meera', avatar: '👩', color: '#9c27b0' },
    { id: 'child1', name: 'Arjun', avatar: '👦', color: '#2e7d32' },
    { id: 'child2', name: 'Anjali', avatar: '👧', color: '#d32f2f' }
  ];
  
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
  
  // Sample assets with owner field
  const [assets, setAssets] = useState([
    // Mutual Funds
    { id: 1, name: 'HDFC Midcap Opportunities', category: 'mutualFunds', value: 850000, institution: 'HDFC AMC', lastUpdated: '2025-03-15', notes: 'Equity - Midcap fund', owner: 'parent1' },
    { id: 2, name: 'Axis Bluechip Fund', category: 'mutualFunds', value: 950000, institution: 'Axis AMC', lastUpdated: '2025-03-15', notes: 'Equity - Large Cap fund', owner: 'parent1' },
    { id: 3, name: 'SBI Small Cap Fund', category: 'mutualFunds', value: 750000, institution: 'SBI AMC', lastUpdated: '2025-03-20', notes: 'Equity - Small Cap fund', owner: 'parent2' },
    { id: 4, name: 'Mirae Asset Emerging Bluechip', category: 'mutualFunds', value: 800000, institution: 'Mirae Asset', lastUpdated: '2025-03-18', notes: 'Equity - Large & Mid Cap fund', owner: 'parent2' },
    { id: 5, name: 'Parag Parikh Flexi Cap Fund', category: 'mutualFunds', value: 500000, institution: 'PPFAS', lastUpdated: '2025-03-19', notes: 'Equity - Flexi Cap fund', owner: 'family' },
    
    // Fixed Deposits
    { id: 6, name: 'HDFC Bank FD', category: 'fixedDeposits', value: 1200000, institution: 'HDFC Bank', lastUpdated: '2025-03-01', notes: 'Matures in 2 years', owner: 'parent1' },
    { id: 7, name: 'SBI Bank RD', category: 'fixedDeposits', value: 1000000, institution: 'SBI Bank', lastUpdated: '2025-03-05', notes: 'Monthly deposit scheme', owner: 'parent2' },
    
    // Government Schemes
    { id: 8, name: 'Public Provident Fund', category: 'govtSchemes', value: 850000, institution: 'SBI Bank', lastUpdated: '2025-02-28', notes: 'Tax saving investment', owner: 'parent1' },
    { id: 9, name: 'National Pension Scheme', category: 'govtSchemes', value: 650000, institution: 'NSDL', lastUpdated: '2025-03-10', notes: 'Retirement fund', owner: 'parent2' },
    { id: 10, name: 'Sukanya Samriddhi Yojana', category: 'govtSchemes', value: 300000, institution: 'Post Office', lastUpdated: '2025-02-25', notes: 'Child education scheme', owner: 'child2' },
    
    // Stocks
    { id: 11, name: 'Reliance Industries', category: 'stocks', value: 350000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'Direct equity', owner: 'parent1' },
    { id: 12, name: 'HDFC Bank', category: 'stocks', value: 320000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'Banking sector', owner: 'parent1' },
    { id: 13, name: 'Infosys', category: 'stocks', value: 280000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'IT sector', owner: 'parent2' },
    { id: 14, name: 'TCS', category: 'stocks', value: 250000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'IT sector', owner: 'parent2' },
    { id: 15, name: 'Tata Motors', category: 'stocks', value: 300000, institution: 'Zerodha', lastUpdated: '2025-03-20', notes: 'Auto sector', owner: 'parent1' },
    
    // Gold & Jewelry
    { id: 16, name: 'Gold Jewelry', category: 'goldJewelry', value: 750000, institution: '', lastUpdated: '2025-01-15', notes: 'Physical gold', owner: 'parent2' },
    { id: 17, name: 'Silver Coins', category: 'goldJewelry', value: 250000, institution: '', lastUpdated: '2025-01-15', notes: 'Precious metals', owner: 'family' },
    { id: 18, name: 'Diamond Jewelry', category: 'goldJewelry', value: 200000, institution: '', lastUpdated: '2025-01-15', notes: 'Precious stones', owner: 'parent2' },
    
    // US Equity
    { id: 19, name: 'Vanguard S&P 500 ETF', category: 'usEquity', value: 550000, institution: 'Vested', lastUpdated: '2025-03-18', notes: 'International ETF', owner: 'parent1' },
    { id: 20, name: 'Invesco QQQ ETF', category: 'usEquity', value: 300000, institution: 'Vested', lastUpdated: '2025-03-18', notes: 'NASDAQ tracking ETF', owner: 'parent1' },
    
    // Cash
    { id: 21, name: 'Savings Account', category: 'cash', value: 450000, institution: 'HDFC Bank', lastUpdated: '2025-03-21', notes: 'Emergency fund', owner: 'family' },
    
    // Crypto
    { id: 22, name: 'Bitcoin', category: 'crypto', value: 150000, institution: 'WazirX', lastUpdated: '2025-03-19', notes: 'Cryptocurrency', owner: 'child1' },
    { id: 23, name: 'Ethereum', category: 'crypto', value: 100000, institution: 'WazirX', lastUpdated: '2025-03-19', notes: 'Cryptocurrency', owner: 'child1' }
  ]);
  
  // Sample liabilities with owner field
  const [liabilities, setLiabilities] = useState([
    { id: 1, name: 'Home Loan', category: 'mortgage', value: 7500000, institution: 'HDFC Bank', lastUpdated: '2025-03-01', notes: 'Primary residence mortgage', owner: 'family' },
    { id: 2, name: 'Car Loan', category: 'carLoans', value: 420000, institution: 'SBI Bank', lastUpdated: '2025-03-05', notes: 'Honda City loan', owner: 'parent1' },
    { id: 3, name: 'Education Loan', category: 'studentLoans', value: 950000, institution: 'ICICI Bank', lastUpdated: '2025-02-28', notes: 'MBA education loan', owner: 'child1' },
    { id: 4, name: 'HDFC Credit Card', category: 'creditCards', value: 85000, institution: 'HDFC Bank', lastUpdated: '2025-03-18', notes: '', owner: 'parent1' },
    { id: 5, name: 'SBI Credit Card', category: 'creditCards', value: 45000, institution: 'SBI Bank', lastUpdated: '2025-03-15', notes: '', owner: 'parent2' },
    { id: 6, name: 'Personal Loan', category: 'personalLoans', value: 250000, institution: 'Bajaj Finserv', lastUpdated: '2025-02-25', notes: '', owner: 'parent2' }
  ]);

  // Sample historical net worth data
  const [historicalData, setHistoricalData] = useState([
    { month: 'Mar 2023', assets: 23500000, liabilities: 9250000, netWorth: 14250000, 
      memberData: {
        parent1: { assets: 10000000, liabilities: 4000000, netWorth: 6000000 },
        parent2: { assets: 9000000, liabilities: 3000000, netWorth: 6000000 },
        child1: { assets: 2000000, liabilities: 1000000, netWorth: 1000000 },
        child2: { assets: 1500000, liabilities: 250000, netWorth: 1250000 },
        family: { assets: 1000000, liabilities: 1000000, netWorth: 0 }
      }
    },
    { month: 'Mar 2024', assets: 23500000, liabilities: 9250000, netWorth: 14250000, 
      memberData: {
        parent1: { assets: 10000000, liabilities: 4000000, netWorth: 6000000 },
        parent2: { assets: 9000000, liabilities: 3000000, netWorth: 6000000 },
        child1: { assets: 2000000, liabilities: 1000000, netWorth: 1000000 },
        child2: { assets: 1500000, liabilities: 250000, netWorth: 1250000 },
        family: { assets: 1000000, liabilities: 1000000, netWorth: 0 }
      }
    },
    { month: 'Apr 2024', assets: 23750000, liabilities: 9180000, netWorth: 14570000,
      memberData: {
        parent1: { assets: 10100000, liabilities: 3950000, netWorth: 6150000 },
        parent2: { assets: 9100000, liabilities: 2980000, netWorth: 6120000 },
        child1: { assets: 2050000, liabilities: 990000, netWorth: 1060000 },
        child2: { assets: 1500000, liabilities: 250000, netWorth: 1250000 },
        family: { assets: 1000000, liabilities: 1010000, netWorth: -10000 }
      }
    },
    { month: 'May 2024', assets: 24100000, liabilities: 9120000, netWorth: 14980000,
      memberData: {
        parent1: { assets: 10200000, liabilities: 3900000, netWorth: 6300000 },
        parent2: { assets: 9300000, liabilities: 2950000, netWorth: 6350000 },
        child1: { assets: 2100000, liabilities: 980000, netWorth: 1120000 },
        child2: { assets: 1500000, liabilities: 250000, netWorth: 1250000 },
        family: { assets: 1000000, liabilities: 1040000, netWorth: -40000 }
      }
    },
    { month: 'Jun 2024', assets: 24250000, liabilities: 9050000, netWorth: 15200000,
      memberData: {
        parent1: { assets: 10300000, liabilities: 3850000, netWorth: 6450000 },
        parent2: { assets: 9400000, liabilities: 2930000, netWorth: 6470000 },
        child1: { assets: 2150000, liabilities: 970000, netWorth: 1180000 },
        child2: { assets: 1400000, liabilities: 250000, netWorth: 1150000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Jul 2024', assets: 24500000, liabilities: 8980000, netWorth: 15520000,
      memberData: {
        parent1: { assets: 10500000, liabilities: 3800000, netWorth: 6700000 },
        parent2: { assets: 9500000, liabilities: 2910000, netWorth: 6590000 },
        child1: { assets: 2200000, liabilities: 960000, netWorth: 1240000 },
        child2: { assets: 1300000, liabilities: 260000, netWorth: 1040000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Aug 2024', assets: 24150000, liabilities: 8920000, netWorth: 15230000,
      memberData: {
        parent1: { assets: 10400000, liabilities: 3750000, netWorth: 6650000 },
        parent2: { assets: 9300000, liabilities: 2900000, netWorth: 6400000 },
        child1: { assets: 2150000, liabilities: 950000, netWorth: 1200000 },
        child2: { assets: 1300000, liabilities: 270000, netWorth: 1030000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Sep 2024', assets: 24750000, liabilities: 8850000, netWorth: 15900000,
      memberData: {
        parent1: { assets: 10600000, liabilities: 3700000, netWorth: 6900000 },
        parent2: { assets: 9500000, liabilities: 2880000, netWorth: 6620000 },
        child1: { assets: 2250000, liabilities: 940000, netWorth: 1310000 },
        child2: { assets: 1400000, liabilities: 280000, netWorth: 1120000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Oct 2024', assets: 25100000, liabilities: 8780000, netWorth: 16320000,
      memberData: {
        parent1: { assets: 10800000, liabilities: 3650000, netWorth: 7150000 },
        parent2: { assets: 9700000, liabilities: 2860000, netWorth: 6840000 },
        child1: { assets: 2300000, liabilities: 930000, netWorth: 1370000 },
        child2: { assets: 1300000, liabilities: 290000, netWorth: 1010000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Nov 2024', assets: 25350000, liabilities: 8710000, netWorth: 16640000,
      memberData: {
        parent1: { assets: 10900000, liabilities: 3600000, netWorth: 7300000 },
        parent2: { assets: 9800000, liabilities: 2840000, netWorth: 6960000 },
        child1: { assets: 2350000, liabilities: 920000, netWorth: 1430000 },
        child2: { assets: 1300000, liabilities: 300000, netWorth: 1000000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Dec 2024', assets: 25750000, liabilities: 8640000, netWorth: 17110000,
      memberData: {
        parent1: { assets: 11100000, liabilities: 3550000, netWorth: 7550000 },
        parent2: { assets: 10000000, liabilities: 2820000, netWorth: 7180000 },
        child1: { assets: 2450000, liabilities: 910000, netWorth: 1540000 },
        child2: { assets: 1200000, liabilities: 310000, netWorth: 890000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Jan 2025', assets: 26100000, liabilities: 8570000, netWorth: 17530000,
      memberData: {
        parent1: { assets: 11300000, liabilities: 3500000, netWorth: 7800000 },
        parent2: { assets: 10200000, liabilities: 2800000, netWorth: 7400000 },
        child1: { assets: 2500000, liabilities: 900000, netWorth: 1600000 },
        child2: { assets: 1100000, liabilities: 320000, netWorth: 780000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Feb 2025', assets: 26450000, liabilities: 8500000, netWorth: 17950000,
      memberData: {
        parent1: { assets: 11500000, liabilities: 3450000, netWorth: 8050000 },
        parent2: { assets: 10300000, liabilities: 2780000, netWorth: 7520000 },
        child1: { assets: 2550000, liabilities: 890000, netWorth: 1660000 },
        child2: { assets: 1100000, liabilities: 330000, netWorth: 770000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Mar 2025', assets: 26750000, liabilities: 8430000, netWorth: 18320000,
      memberData: {
        parent1: { assets: 11700000, liabilities: 3400000, netWorth: 8300000 },
        parent2: { assets: 10400000, liabilities: 2760000, netWorth: 7640000 },
        child1: { assets: 2600000, liabilities: 880000, netWorth: 1720000 },
        child2: { assets: 1050000, liabilities: 340000, netWorth: 710000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
    { month: 'Apr 2025', assets: 27000000, liabilities: 8350000, netWorth: 18650000,
      memberData: {
        parent1: { assets: 11800000, liabilities: 3350000, netWorth: 8450000 },
        parent2: { assets: 10500000, liabilities: 2730000, netWorth: 7770000 },
        child1: { assets: 2650000, liabilities: 870000, netWorth: 1780000 },
        child2: { assets: 1050000, liabilities: 350000, netWorth: 700000 },
        family: { assets: 1000000, liabilities: 1050000, netWorth: -50000 }
      }
    },
  ]);

  // ============================================================
  // UTILITY FUNCTIONS - Helper functions for data and formatting
  // ============================================================
  
  // Function to filter assets/liabilities based on selected member
  const filterByMember = (items) => {
    if (selectedMember === 'family') {
      return items; // Return all items when "All Family" is selected
    }
    return items.filter(item => item.owner === selectedMember);
  };
  
  // Get filtered data
  const filteredAssets = filterByMember(assets);
  const filteredLiabilities = filterByMember(liabilities);
  
  // Calculate totals for filtered items
  const totalAssets = filteredAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = filteredLiabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  
  // Calculate category totals for filtered items
  const assetCategoryTotals = filteredAssets.reduce((totals, asset) => {
    if (!totals[asset.category]) {
      totals[asset.category] = 0;
    }
    totals[asset.category] += asset.value;
    return totals;
  }, {});
  
  const liabilityCategoryTotals = filteredLiabilities.reduce((totals, liability) => {
    if (!totals[liability.category]) {
      totals[liability.category] = 0;
    }
    totals[liability.category] += liability.value;
    return totals;
  }, {});
  
  // Get net worth data for the selected member
  const getMemberNetWorthData = () => {
    return historicalData.map(item => {
      if (selectedMember === 'family') {
        return item;
      } else {
        return {
          month: item.month,
          assets: item.memberData[selectedMember].assets,
          liabilities: item.memberData[selectedMember].liabilities,
          netWorth: item.memberData[selectedMember].netWorth
        };
      }
    });
  };
  
  // Calculate net worth change from last month for selected member
  const currentMonthData = historicalData[historicalData.length - 1];
  const lastMonthData = historicalData[historicalData.length - 2];
  
  const currentMonthNetWorth = selectedMember === 'family' ? 
    currentMonthData?.netWorth : 
    currentMonthData?.memberData[selectedMember]?.netWorth || 0;
    
  const lastMonthNetWorth = selectedMember === 'family' ? 
    lastMonthData?.netWorth : 
    lastMonthData?.memberData[selectedMember]?.netWorth || 0;
    
  const netWorthChange = currentMonthNetWorth - lastMonthNetWorth;
  const netWorthChangePercentage = lastMonthNetWorth !== 0 
    ? (netWorthChange / lastMonthNetWorth) * 100 
    : 0;
  
  // Filter historical data based on selected time period
  const getFilteredHistoricalData = () => {
    const data = getMemberNetWorthData();
    
    switch (timePeriod) {
      case '3M':
        return data.slice(-3);
      case '6M':
        return data.slice(-6);
      case '1Y':
        return data.slice(-12);
      case '3Y':
        return data.slice(-36);
      case 'ALL':
        return data;
      default:
        return data.slice(-12);
    }
  };
  
  // Formatter functions
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // ============================================================
  // EVENT HANDLERS - All event handling functions
  // ============================================================
  
  // Toggle balances visibility
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };
  
  // Handle member change
  const handleMemberChange = (event, newMember) => {
    if (newMember) {
      setSelectedMember(newMember);
    }
  };
  
  // Handle time period change
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };
  
  // Dialog related handlers
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
      notes: '',
      owner: selectedMember === 'family' ? 'family' : selectedMember
    });
    setDialogOpen(true);
  };
  
  const handleEditItem = (item, type) => {
    setDialogMode('edit');
    setItemType(type);
    setCurrentItem({ ...item });
    setDialogOpen(true);
  };
  
  const handleDeleteItem = (itemId, type) => {
    if (type === 'asset') {
      setAssets(assets.filter(asset => asset.id !== itemId));
    } else {
      setLiabilities(liabilities.filter(liability => liability.id !== itemId));
    }
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === 'value' ? parseFloat(value) || '' : value
    });
  };
  
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

  // ============================================================
  // COMPONENT FUNCTIONS - Break UI into logical sections
  // ============================================================

  // 1. Summary Header Component with Chart
  const renderSummaryHeader = () => (
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
              {selectedMember === 'family' ? 'Family Net Worth' : `${familyMembers.find(m => m.id === selectedMember)?.name}'s Net Worth`}
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
              {hideBalances ? '••••••••' : formatCurrency(netWorth)}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Total Net Worth
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={styles.changeIndicator(netWorthChange >= 0)}>
              {netWorthChange >= 0 ? 
                <NorthIcon fontSize="small" sx={{ color: '#2e7d32' }} /> : 
                <SouthIcon fontSize="small" sx={{ color: '#d32f2f' }} />
              }
              <Typography 
                variant="body1" 
                sx={{ 
                  ml: 0.5,
                  fontWeight: 'medium',
                  color: netWorthChange >= 0 ? '#2e7d32' : '#d32f2f'
                }}
              >
                {hideBalances ? '••••' : formatCurrency(netWorthChange)}
                <span style={{ 
                  display: 'inline-block', 
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  color: 'inherit'
                }}>
                  ({formatPercentage(netWorthChangePercentage)})
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
            {['3M', '6M', '1Y', '3Y', 'ALL'].map(period => (
              <Button 
                key={period}
                size="small"
                variant={timePeriod === period ? "contained" : "outlined"}
                onClick={() => handleTimePeriodChange(period)}
                sx={{ 
                  bgcolor: timePeriod === period ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: timePeriod === period ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {period}
              </Button>
            ))}
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(76, 175, 80, 0.2)' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Assets
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#4caf50">
                  {hideBalances ? '••••••••' : formatCurrency(totalAssets)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(244, 67, 54, 0.2)' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Liabilities
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#f44336">
                  {hideBalances ? '••••••••' : formatCurrency(totalLiabilities)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getFilteredHistoricalData()}
                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
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
  );

  // 2. Assets Section
  const renderAssetsList = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.success.main)}>
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
        sx={styles.actionButton}
      >
        Add Asset
      </Button>
      
      {/* Asset Categories */}
      {Object.keys(assetCategories).map((category) => {
        const categoryTotal = assetCategoryTotals[category] || 0;
        const categoryAssets = filteredAssets.filter(asset => asset.category === category);
        
        return categoryAssets.length > 0 ? (
          <Box key={category} sx={{ mb: 3, mt: 3 }}>
            <Box sx={styles.categoryHeader(theme.palette.success.main)}>
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
            
            <List sx={styles.listContainer}>
              {categoryAssets.map((asset) => (
                <ListItem 
                  key={asset.id}
                  sx={styles.listItem(theme.palette.success.main)}
                >
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" fontWeight="medium">
                          {asset.name}
                        </Typography>
                        {selectedMember === 'family' && (
                          <Tooltip title={`Owned by ${familyMembers.find(m => m.id === asset.owner)?.name || 'Family'}`}>
                            <Avatar 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                fontSize: '0.75rem', 
                                ml: 1,
                                bgcolor: asset.owner === 'family' 
                                  ? alpha(theme.palette.primary.main, 0.1) 
                                  : alpha(familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[500], 0.2),
                                color: asset.owner === 'family' 
                                  ? theme.palette.primary.main 
                                  : familyMembers.find(m => m.id === asset.owner)?.color || theme.palette.grey[700]
                              }}
                            >
                              {asset.owner === 'family' ? 'F' : familyMembers.find(m => m.id === asset.owner)?.name.charAt(0) || '?'}
                            </Avatar>
                          </Tooltip>
                        )}
                      </Box>
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
                              color: theme.palette.primary.main,
                              fontWeight: 'medium'
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
                      sx={{ 
                        mr: 1, 
                        color: theme.palette.primary.main, 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                        }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={() => handleDeleteItem(asset.id, 'asset')}
                      sx={{ 
                        color: theme.palette.error.main, 
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.error.main, 0.2),
                        }
                      }}
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
  );
  
  // 3. Liabilities Section
  const renderLiabilitiesList = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.error.main)}>
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
        color="error" 
        startIcon={<AddIcon />}
        onClick={() => handleAddItem('liability')}
        size="small"
        sx={styles.actionButton}
      >
        Add Liability
      </Button>
      
      {/* Liability Categories */}
      {Object.keys(liabilityCategories).map((category) => {
        const categoryTotal = liabilityCategoryTotals[category] || 0;
        const categoryLiabilities = filteredLiabilities.filter(liability => liability.category === category);
        
        return categoryLiabilities.length > 0 ? (
          <Box key={category} sx={{ mb: 3, mt: 3 }}>
            <Box sx={styles.categoryHeader(theme.palette.error.main)}>
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
            
            <List sx={styles.listContainer}>
              {categoryLiabilities.map((liability) => (
                <ListItem 
                  key={liability.id}
                  sx={styles.listItem(theme.palette.error.main)}
                >
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" fontWeight="medium">
                          {liability.name}
                        </Typography>
                        {selectedMember === 'family' && (
                          <Tooltip title={`Owned by ${familyMembers.find(m => m.id === liability.owner)?.name || 'Family'}`}>
                            <Avatar 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                fontSize: '0.75rem', 
                                ml: 1,
                                bgcolor: liability.owner === 'family' 
                                  ? alpha(theme.palette.primary.main, 0.1) 
                                  : alpha(familyMembers.find(m => m.id === liability.owner)?.color || theme.palette.grey[500], 0.2),
                                color: liability.owner === 'family' 
                                  ? theme.palette.primary.main 
                                  : familyMembers.find(m => m.id === liability.owner)?.color || theme.palette.grey[700]
                              }}
                            >
                              {liability.owner === 'family' ? 'F' : familyMembers.find(m => m.id === liability.owner)?.name.charAt(0) || '?'}
                            </Avatar>
                          </Tooltip>
                        )}
                      </Box>
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
                              color: theme.palette.primary.main,
                              fontWeight: 'medium'
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
                      sx={{ 
                        mr: 1, 
                        color: theme.palette.primary.main, 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                        }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={() => handleDeleteItem(liability.id, 'liability')}
                      sx={{ 
                        color: theme.palette.error.main, 
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.error.main, 0.2),
                        }
                      }}
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
  );
  
  // 4. Add/Edit Item Dialog
  const renderItemDialog = () => (
    <Dialog 
      open={dialogOpen} 
      onClose={handleDialogClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle sx={{ pb: 2 }}>
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
                variant="outlined"
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
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined">
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
                variant="outlined"
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
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel id="owner-label">Owner</InputLabel>
                <Select
                  labelId="owner-label"
                  name="owner"
                  value={currentItem.owner}
                  label="Owner"
                  onChange={handleInputChange}
                >
                  {familyMembers.map(member => (
                    <MenuItem key={member.id} value={member.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            mr: 1,
                            bgcolor: alpha(member.color, 0.1), 
                            color: member.color,
                            fontSize: typeof member.avatar === 'string' ? 14 : 'inherit'
                          }}
                        >
                          {member.avatar}
                        </Avatar>
                        <Typography>{member.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={handleDialogClose} 
          color="inherit"
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSaveItem} 
          variant="contained"
          color={itemType === 'asset' ? "primary" : "error"}
          disabled={!currentItem.name || !currentItem.value}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
  
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

  // ============================================================
  // MAIN RENDER - The assets and liabilities layout
  // ============================================================
  return (
    <Box sx={styles.pageContainer}>
      {/* Summary Header with Chart */}
      {renderSummaryHeader()}

      {/* Assets and Liabilities Grid */}
      <Grid container spacing={3}>
        {/* Assets List */}
        <Grid item xs={12} md={6}>
          {renderAssetsList()}
        </Grid>
        
        {/* Liabilities List */}
        <Grid item xs={12} md={6}>
          {renderLiabilitiesList()}
        </Grid>
      </Grid>
      
      {/* Add/Edit Item Dialog */}
      {renderItemDialog()}
    </Box>
  );
};

export default AssetsLiabilities;