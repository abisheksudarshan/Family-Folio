// src/pages/Goals.js
// ============================================================================
// IMPORTS
// ============================================================================

// React core
import React, { useState, useEffect } from 'react';

// Material UI components
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  useTheme,
  alpha,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  FormControlLabel,
  Switch,
  Autocomplete,
  FormHelperText
} from '@mui/material';

// Material UI icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightIcon from '@mui/icons-material/Flight';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SaveIcon from '@mui/icons-material/Save';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SavingsIcon from '@mui/icons-material/Savings';
import WalletIcon from '@mui/icons-material/Wallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

const Goals = () => {
  const theme = useTheme();
  
  // ============================================================================
  // CONSTANTS AND STATIC DATA
  // ============================================================================
  
  /**
   * Goal categories with their icons and colors
   */
  const goalCategories = {
    retirement: { name: 'Retirement', icon: <BusinessCenterIcon />, color: theme.palette.primary.main },
    education: { name: 'Education', icon: <SchoolIcon />, color: theme.palette.success.main },
    home: { name: 'Home', icon: <HomeIcon />, color: theme.palette.warning.main },
    vehicle: { name: 'Vehicle', icon: <DirectionsCarIcon />, color: '#ff9800' },
    travel: { name: 'Travel', icon: <FlightIcon />, color: '#03a9f4' },
    emergency: { name: 'Emergency', icon: <WarningIcon />, color: theme.palette.error.main },
    health: { name: 'Health', icon: <LocalHospitalIcon />, color: '#e91e63' },
    life: { name: 'Life Insurance', icon: <HealthAndSafetyIcon />, color: theme.palette.secondary.main },
    child: { name: 'Child', icon: <ChildFriendlyIcon />, color: '#9c27b0' },
    other: { name: 'Other', icon: <CategoryIcon />, color: '#607d8b' }
  };
  
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  /**
   * Available assets that can be linked to goals
   */
  const [assets, setAssets] = useState([
    { id: 1, name: 'Mutual Fund - NIFTY Index', type: 'equity', value: 150000, xirr: 12.5 },
    { id: 2, name: 'EPF', type: 'fixed_income', value: 250000, xirr: 8.2 },
    { id: 3, name: 'PPF', type: 'fixed_income', value: 180000, xirr: 7.1 },
    { id: 4, name: 'ELSS Fund', type: 'equity', value: 95000, xirr: 14.3 },
    { id: 5, name: 'Mid Cap Fund', type: 'equity', value: 120000, xirr: 15.5 },
    { id: 6, name: 'Real Estate', type: 'property', value: 4500000, xirr: 8.0 },
    { id: 7, name: 'Fixed Deposit', type: 'fixed_income', value: 300000, xirr: 6.5 },
    { id: 8, name: 'Gold ETF', type: 'gold', value: 75000, xirr: 9.2 },
    { id: 9, name: 'NPS Tier 1', type: 'hybrid', value: 210000, xirr: 9.8 },
    { id: 10, name: 'Corporate Bonds', type: 'fixed_income', value: 150000, xirr: 7.8 }
  ]);
  
  /**
   * Financial goals with their details
   */
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      name: 'Emergency Fund', 
      type: 'saving', 
      category: 'emergency',
      targetAmount: 600000, 
      currentAmount: 300000, 
      targetDate: '2025-12-31',
      priority: 'high',
      description: 'Build a 6-month emergency fund for unexpected expenses',
      monthlySaving: 15000,
      linkedAssets: [7], // Fixed Deposit
      expectedXirr: 6.5,
      actualXirr: 6.5,
      status: 'on-track',
      expanded: false
    },
    { 
      id: 2, 
      name: 'Home Down Payment', 
      type: 'saving', 
      category: 'home',
      targetAmount: 2000000, 
      currentAmount: 500000, 
      targetDate: '2027-05-30',
      priority: 'medium',
      description: 'Save for a 20% down payment on a home purchase',
      monthlySaving: 45000,
      linkedAssets: [3, 7], // PPF and Fixed Deposit
      expectedXirr: 7.0,
      actualXirr: 6.8,
      status: 'on-track',
      expanded: false
    },
    { 
      id: 3, 
      name: 'Car Loan', 
      type: 'debt', 
      category: 'vehicle',
      targetAmount: 1200000, 
      currentAmount: 600000, 
      targetDate: '2026-03-15',
      priority: 'medium',
      description: 'Pay off car loan',
      monthlySaving: 25000,
      linkedAssets: [],
      expectedXirr: 0,
      actualXirr: 0,
      status: 'on-track',
      expanded: false
    },
    { 
      id: 4, 
      name: 'Europe Vacation', 
      type: 'saving', 
      category: 'travel',
      targetAmount: 500000, 
      currentAmount: 220000, 
      targetDate: '2025-06-30',
      priority: 'low',
      description: 'Save for family vacation to Europe',
      monthlySaving: 20000,
      linkedAssets: [7], // Fixed Deposit
      expectedXirr: 6.5,
      actualXirr: 6.5,
      status: 'on-track',
      expanded: false
    },
    { 
      id: 5, 
      name: 'Student Loan', 
      type: 'debt', 
      category: 'education',
      targetAmount: 1800000, 
      currentAmount: 900000, 
      targetDate: '2028-01-01',
      priority: 'high',
      description: 'Pay off student loan debt',
      monthlySaving: 30000,
      linkedAssets: [],
      expectedXirr: 0,
      actualXirr: 0,
      status: 'on-track',
      expanded: false
    },
    { 
      id: 6, 
      name: 'Retirement', 
      type: 'saving', 
      category: 'retirement',
      targetAmount: 30000000, 
      currentAmount: 5000000, 
      targetDate: '2045-03-31',
      priority: 'high',
      description: 'Build retirement corpus for financial independence',
      monthlySaving: 60000,
      linkedAssets: [1, 2, 5, 9], // Equity, EPF, Mid Cap, NPS
      expectedXirr: 10.0,
      actualXirr: 11.5,
      status: 'ahead',
      expanded: false
    },
    { 
      id: 7, 
      name: 'Health Insurance', 
      type: 'saving', 
      category: 'health',
      targetAmount: 50000, 
      currentAmount: 50000, 
      targetDate: '2025-02-28',
      priority: 'high',
      description: 'Annual premium for family health insurance of 20 lakhs',
      monthlySaving: 4200,
      linkedAssets: [],
      expectedXirr: 0,
      actualXirr: 0,
      status: 'on-track',
      expanded: false,
      insuranceDetails: {
        provider: 'Star Health',
        coverageAmount: 2000000,
        coverageType: 'Family Floater',
        renewalDate: '2025-02-28'
      }
    },
    { 
      id: 8, 
      name: 'Life Insurance', 
      type: 'saving', 
      category: 'life',
      targetAmount: 120000, 
      currentAmount: 120000, 
      targetDate: '2025-04-15',
      priority: 'high',
      description: 'Annual premium for term life insurance of 2 crores',
      monthlySaving: 10000,
      linkedAssets: [],
      expectedXirr: 0,
      actualXirr: 0,
      status: 'on-track',
      expanded: false,
      insuranceDetails: {
        provider: 'HDFC Life',
        coverageAmount: 20000000,
        coverageType: 'Term Plan',
        renewalDate: '2025-04-15'
      }
    },
    { 
      id: 9, 
      name: 'Vehicle Insurance', 
      type: 'saving', 
      category: 'vehicle',
      targetAmount: 25000, 
      currentAmount: 25000, 
      targetDate: '2025-07-10',
      priority: 'medium',
      description: 'Annual premium for comprehensive car insurance',
      monthlySaving: 2100,
      linkedAssets: [],
      expectedXirr: 0,
      actualXirr: 0,
      status: 'on-track',
      expanded: false,
      insuranceDetails: {
        provider: 'ICICI Lombard',
        coverageAmount: 1000000,
        coverageType: 'Comprehensive',
        renewalDate: '2025-07-10'
      }
    },
    { 
      id: 10, 
      name: 'Child Education', 
      type: 'saving', 
      category: 'child',
      targetAmount: 5000000, 
      currentAmount: 800000, 
      targetDate: '2035-06-30',
      priority: 'high',
      description: 'Save for child\'s higher education abroad',
      monthlySaving: 22000,
      linkedAssets: [4, 5], // ELSS and Mid Cap Fund
      expectedXirr: 12.0,
      actualXirr: 14.9,
      status: 'ahead',
      expanded: false
    }
  ]);
  
  /**
   * UI state management
   */
  const [activeTab, setActiveTab] = useState('all'); // Category filter tab
  const [dialogOpen, setDialogOpen] = useState(false); // Add/Edit dialog state
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  
  /**
   * Current goal being edited or added
   */
  const [currentGoal, setCurrentGoal] = useState({
    id: null,
    name: '',
    type: 'saving',
    category: 'other',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    priority: 'medium',
    description: '',
    monthlySaving: '',
    linkedAssets: [],
    expectedXirr: '',
    actualXirr: 0,
    status: 'on-track',
    expanded: false,
    insuranceDetails: {
      provider: '',
      coverageAmount: '',
      coverageType: '',
      renewalDate: ''
    }
  });

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  
  /**
   * Filter goals based on active tab
   */
  const getFilteredGoals = () => {
    if (activeTab === 'all') {
      return goals;
    } else if (activeTab === 'saving' || activeTab === 'debt') {
      return goals.filter(goal => goal.type === activeTab);
    } else {
      return goals.filter(goal => goal.category === activeTab);
    }
  };
  
  /**
   * Get filtered goals based on current tab selection
   */
  const filteredGoals = getFilteredGoals();
  
  /**
   * Calculate total savings goal amount
   */
  const totalSavingGoalAmount = goals
    .filter(goal => goal.type === 'saving')
    .reduce((sum, goal) => sum + goal.targetAmount, 0);
  
  /**
   * Calculate total current savings amount
   */
  const totalSavingCurrentAmount = goals
    .filter(goal => goal.type === 'saving')
    .reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  /**
   * Calculate total debt goal amount
   */
  const totalDebtGoalAmount = goals
    .filter(goal => goal.type === 'debt')
    .reduce((sum, goal) => sum + goal.targetAmount, 0);
  
  /**
   * Calculate total current debt amount
   */
  const totalDebtCurrentAmount = goals
    .filter(goal => goal.type === 'debt')
    .reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  /**
   * Calculate total monthly saving across all goals
   */
  const totalMonthlySaving = goals.reduce((sum, goal) => sum + goal.monthlySaving, 0);
  
  /**
   * Count goals by status for summary statistics
   */
  const statusCounts = goals.reduce((counts, goal) => {
    counts[goal.status] = (counts[goal.status] || 0) + 1;
    return counts;
  }, {});
  
  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================
  
  /**
   * Safely get insurance details from a goal
   */
  const getInsuranceDetails = (goal) => {
    return goal.insuranceDetails || {
      provider: '',
      coverageAmount: '',
      coverageType: '',
      renewalDate: ''
    };
  };
  
  /**
   * Calculate progress percentage for a goal
   */
  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };
  
  /**
   * Format currency values for display
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
   * Format date for display
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  /**
   * Calculate time remaining until target date
   */
  const calculateTimeRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = Math.abs(target - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };
  
  /**
   * Get color based on priority
   */
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.info.main;
    }
  };
  
  /**
   * Get progress color based on percentage
   */
  const getProgressColor = (percentage) => {
    if (percentage < 25) return 'error';
    if (percentage < 75) return 'warning';
    return 'success';
  };
  
  /**
   * Get icon and color for goal status
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case 'ahead':
        return { icon: <TrendingUpIcon />, color: theme.palette.success.main };
      case 'on-track':
        return { icon: <TrendingFlatIcon />, color: theme.palette.info.main };
      case 'behind':
        return { icon: <TrendingDownIcon />, color: theme.palette.warning.main };
      case 'at-risk':
        return { icon: <ErrorIcon />, color: theme.palette.error.main };
      default:
        return { icon: <CheckCircleIcon />, color: theme.palette.info.main };
    }
  };
  
  /**
   * Calculate actual XIRR based on linked assets
   */
  const calculateActualXirr = (linkedAssetIds) => {
    if (!linkedAssetIds || linkedAssetIds.length === 0) return 0;
    
    const linkedAssets = assets.filter(asset => linkedAssetIds.includes(asset.id));
    if (linkedAssets.length === 0) return 0;
    
    const totalValue = linkedAssets.reduce((sum, asset) => sum + asset.value, 0);
    const weightedXirr = linkedAssets.reduce((sum, asset) => sum + (asset.value / totalValue) * asset.xirr, 0);
    
    return weightedXirr;
  };
  
  /**
   * Determine goal status based on actual vs expected XIRR
   */
  const determineGoalStatus = (actual, expected) => {
    if (actual === 0 || expected === 0) return 'on-track';
    
    const difference = actual - expected;
    if (difference >= 1.5) return 'ahead';
    if (difference <= -1.5) return 'at-risk';
    return 'on-track';
  };
  
  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  /**
   * Toggle expanded state of a goal card
   */
  const toggleGoalExpanded = (goalId) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, expanded: !goal.expanded } : goal
    ));
  };
  
  /**
   * Open dialog to add a new goal
   */
  const handleAddGoal = () => {
    setDialogMode('add');
    setCurrentGoal({
      id: null,
      name: '',
      type: 'saving',
      category: 'other',
      targetAmount: '',
      currentAmount: '',
      targetDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      description: '',
      monthlySaving: '',
      linkedAssets: [],
      expectedXirr: '',
      actualXirr: 0,
      status: 'on-track',
      expanded: false,
      insuranceDetails: {
        provider: '',
        coverageAmount: '',
        coverageType: '',
        renewalDate: ''
      }
    });
    setDialogOpen(true);
  };
  
  /**
   * Open dialog to edit an existing goal
   */
  const handleEditGoal = (goal) => {
    setDialogMode('edit');
    setCurrentGoal({ ...goal });
    setDialogOpen(true);
  };
  
  /**
   * Delete a goal after confirmation
   */
  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== goalId));
    }
  };
  
  /**
   * Close the goal dialog
   */
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  /**
   * Handle form input changes in the goal dialog
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('insurance.')) {
      // Handle insurance details fields
      const insuranceField = name.split('.')[1];
      setCurrentGoal({
        ...currentGoal,
        insuranceDetails: {
          ...getInsuranceDetails(currentGoal),
          [insuranceField]: value
        }
      });
    } else {
      // Handle regular fields
      setCurrentGoal({
        ...currentGoal,
        [name]: ['targetAmount', 'currentAmount', 'monthlySaving', 'expectedXirr'].includes(name) 
          ? parseFloat(value) || '' 
          : value
      });
    }
  };
  
  /**
   * Handle changes to linked assets selection
   */
  const handleLinkedAssetsChange = (event, newValue) => {
    setCurrentGoal({
      ...currentGoal,
      linkedAssets: newValue.map(asset => asset.id)
    });
  };
  
  /**
   * Save the current goal (add new or update existing)
   */
  const handleSaveGoal = () => {
    // Make sure insuranceDetails is properly initialized
    let insuranceDetails = getInsuranceDetails(currentGoal);
    
    // Calculate actual XIRR and status
    const actualXirr = calculateActualXirr(currentGoal.linkedAssets);
    const status = determineGoalStatus(actualXirr, currentGoal.expectedXirr);
    
    const updatedGoal = {
      ...currentGoal,
      actualXirr,
      status,
      insuranceDetails
    };
    
    if (dialogMode === 'add') {
      // Add new goal
      const newGoal = {
        ...updatedGoal,
        id: Math.max(...goals.map(g => g.id), 0) + 1
      };
      setGoals([...goals, newGoal]);
    } else {
      // Update existing goal
      setGoals(goals.map(goal => 
        goal.id === currentGoal.id ? updatedGoal : goal
      ));
    }
    setDialogOpen(false);
  };
  
  /**
   * Handle tab changes for category filtering
   */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // ============================================================================
  // RENDER COMPONENT
  // ============================================================================
  
  return (
    <Box sx={{ p: 2, maxWidth: 1400, mx: 'auto' }}>
      {/* Banner with title */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2.5, 
          mb: 2, 
          borderRadius: 3,
          background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
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
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, position: 'relative', zIndex: 5 }}>
          <Typography variant="h4" fontWeight="bold" component="h1">
            Financial Goals
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddGoal}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.9)', 
              color: theme.palette.primary.dark,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.95)' },
              textTransform: 'none',
              borderRadius: 2
            }}
          >
            Add Goal
          </Button>
        </Box>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
                {formatCurrency(totalMonthlySaving)}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                monthly contributions
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                py: 0.75,
                px: 1.5, 
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', 
                border: `1px solid rgba(46, 125, 50, 0.3)`,
              }}>
                <SavingsIcon fontSize="small" sx={{ color: '#2e7d32' }} />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    ml: 0.5,
                    fontWeight: 'medium',
                    color: '#2e7d32'
                  }}
                >
                  {goals.length} active financial goals
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
              <Chip 
                size="medium"
                label={`${statusCounts.ahead || 0} ahead • ${statusCounts['on-track'] || 0} on-track • ${(statusCounts.behind || 0) + (statusCounts['at-risk'] || 0)} at risk`}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
              />
            </Box>
            
            <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 1, textAlign: 'right' }}>
              Goals Distribution
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 2,
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                bgcolor: alpha('#2e7d32', 0.2)
              }}>
                <WalletIcon fontSize="small" sx={{ color: 'white', mr: 1 }} />
                <Typography variant="body2" color="white">
                  {goals.filter(g => g.type === 'saving').length} Savings
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.error.main, 0.2)
              }}>
                <CreditCardIcon fontSize="small" sx={{ color: 'white', mr: 1 }} />
                <Typography variant="body2" color="white">
                  {goals.filter(g => g.type === 'debt').length} Debts
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Cards - key metrics */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Savings Goals */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.primary.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    mr: 1.5, 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main
                  }}>
                    <SavingsIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Savings Progress
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {formatCurrency(totalSavingCurrentAmount)}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                of {formatCurrency(totalSavingGoalAmount)} target
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Overall Progress
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="medium"
                  >
                    {Math.round(calculateProgress(totalSavingCurrentAmount, totalSavingGoalAmount))}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={calculateProgress(totalSavingCurrentAmount, totalSavingGoalAmount)} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.divider, 0.1),
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Debt Goals */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.secondary.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    mr: 1.5, 
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main
                  }}>
                    <CreditCardIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Debt Payoff
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {formatCurrency(totalDebtCurrentAmount)}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                of {formatCurrency(totalDebtGoalAmount)} target
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Overall Progress
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="medium"
                  >
                    {Math.round(calculateProgress(totalDebtCurrentAmount, totalDebtGoalAmount))}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={calculateProgress(totalDebtCurrentAmount, totalDebtGoalAmount)} 
                  color="secondary"
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.divider, 0.1),
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Goal Counts by Status */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.success.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    mr: 1.5, 
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main
                  }}>
                    <AssignmentIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Goals Status
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {goals.length}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Total financial goals created
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  icon={<TrendingUpIcon />}
                  label={`${statusCounts.ahead || 0} Ahead`}
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main
                  }}
                />
                <Chip 
                  icon={<TrendingFlatIcon />}
                  label={`${statusCounts['on-track'] || 0} On Track`}
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main
                  }}
                />
                <Chip 
                  icon={<WarningIcon />}
                  label={`${(statusCounts.behind || 0) + (statusCounts['at-risk'] || 0)} At Risk`}
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.error.main
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Monthly Commitment */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.info.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    mr: 1.5, 
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main
                  }}>
                    <AttachMoneyIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Monthly Commitment
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {formatCurrency(totalMonthlySaving)}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Monthly contribution to all goals
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(
                      goals.filter(g => g.type === 'saving').reduce((sum, g) => sum + g.monthlySaving, 0)
                    )} to savings
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(
                      goals.filter(g => g.type === 'debt').reduce((sum, g) => sum + g.monthlySaving, 0)
                    )} to debts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Category Tabs - for filtering goals */}
      <Paper elevation={0} sx={{ borderRadius: 3, mb: 2, boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            p: 1,
            '& .MuiTab-root': {
              minWidth: 'auto',
              borderRadius: '16px',
              mx: 0.5,
              py: 1,
              px: 2
            },
            '& .Mui-selected': {
              bgcolor: alpha(theme.palette.primary.main, 0.1)
            }
          }}
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <Tab 
            label="All Goals" 
            value="all" 
            icon={<CategoryIcon />} 
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            label="Savings" 
            value="saving" 
            icon={<SavingsIcon />} 
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            label="Debts" 
            value="debt" 
            icon={<CreditCardIcon />} 
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          
          {/* Category Specific Tabs */}
          {Object.entries(goalCategories).map(([category, data]) => (
            <Tab 
              key={category}
              label={data.name} 
              value={category} 
              icon={data.icon} 
              iconPosition="start"
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Paper>
      
      {/* Goals List - displays all filtered goals */}
      <Grid container spacing={2}>
        {filteredGoals.map((goal) => {
          const progressPercent = calculateProgress(goal.currentAmount, goal.targetAmount);
          const progressColor = getProgressColor(progressPercent);
          const statusInfo = getStatusIcon(goal.status);
          const categoryInfo = goalCategories[goal.category];
          
          return (
            <Grid item xs={12} md={6} lg={4} key={goal.id}>
              <Card elevation={0} sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
                }
              }}>
                {/* Colored edge based on priority */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    bottom: 0, 
                    width: 6, 
                    bgcolor: getPriorityColor(goal.priority) 
                  }} 
                />
                
                <CardContent sx={{ p: 2, pb: 1, flexGrow: 1 }}>
                  <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          mr: 1, 
                          bgcolor: alpha(categoryInfo.color, 0.1),
                          color: categoryInfo.color,
                          width: 35,
                          height: 35
                        }}
                      >
                        {categoryInfo.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {goal.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          <Chip 
                            label={goal.type === 'saving' ? 'Saving' : 'Debt'} 
                            size="small"
                            color={goal.type === 'saving' ? 'primary' : 'secondary'}
                          />
                          <Chip
                            label={categoryInfo.name}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(categoryInfo.color, 0.1),
                              color: categoryInfo.color
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex' }}>
                      <Tooltip title="Edit Goal">
                        <IconButton size="small" onClick={() => handleEditGoal(goal)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Goal">
                        <IconButton size="small" onClick={() => handleDeleteGoal(goal.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, minHeight: 32, fontSize: '0.85rem' }}>
                    {goal.description}
                  </Typography>
                  
                  <Box sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ color: statusInfo.color, mr: 0.5, display: 'flex', alignItems: 'center' }}>
                          {statusInfo.icon}
                        </Box>
                        <Box component="span" sx={{ color: statusInfo.color, fontWeight: 'medium', textTransform: 'capitalize' }}>
                          {goal.status.replace('-', ' ')}
                        </Box>
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {formatCurrency(goal.currentAmount)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>
                          of
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {formatCurrency(goal.targetAmount)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={progressPercent} 
                      color={progressColor}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {progressPercent.toFixed(0)}%
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Grid container spacing={1} sx={{ mb: 0.5 }}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachMoneyIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary, fontSize: 16 }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(goal.monthlySaving)}/mo
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary, fontSize: 16 }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(goal.targetDate)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HourglassTopIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary, fontSize: 16 }} />
                        <Typography variant="body2" color="text.secondary">
                          {calculateTimeRemaining(goal.targetDate)} remaining
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlagIcon fontSize="small" sx={{ mr: 0.5, color: getPriorityColor(goal.priority), fontSize: 16 }} />
                        <Typography variant="body2" sx={{ color: getPriorityColor(goal.priority), textTransform: 'capitalize' }}>
                          {goal.priority} Priority
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  {/* Expandable section button */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      mt: 0.5, 
                      cursor: 'pointer',
                      color: theme.palette.primary.main
                    }}
                    onClick={() => toggleGoalExpanded(goal.id)}
                  >
                    <Typography variant="caption" color="inherit" sx={{ fontWeight: 'medium' }}>
                      {goal.expanded ? 'Hide Details' : 'Show Details'}
                    </Typography>
                    {goal.expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </Box>
                  
                  {/* Expandable content - additional details */}
                  <Collapse in={goal.expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 1 }}>
                      <Divider sx={{ mb: 1 }} />
                      
                      {/* Linked Assets Section */}
                      <Typography variant="subtitle2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
                        Linked Assets
                      </Typography>
                      {goal.linkedAssets.length > 0 ? (
                        <List dense disablePadding>
                          {goal.linkedAssets.slice(0, 2).map(assetId => {
                            const asset = assets.find(a => a.id === assetId);
                            if (!asset) return null;
                            
                            return (
                              <ListItem key={asset.id} sx={{ px: 1, py: 0.25 }}>
                                <ListItemIcon sx={{ minWidth: 30 }}>
                                  <LinkIcon fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={asset.name} 
                                  secondary={`${formatCurrency(asset.value)} • ${asset.xirr.toFixed(1)}% XIRR`} 
                                  primaryTypographyProps={{ variant: 'body2', fontSize: '0.8rem' }}
                                  secondaryTypographyProps={{ variant: 'caption', fontSize: '0.7rem' }}
                                  sx={{ my: 0 }}
                                />
                              </ListItem>
                            );
                          })}
                          {goal.linkedAssets.length > 2 && (
                            <Typography variant="caption" sx={{ pl: 1, pt: 0.5, display: 'block', color: 'text.secondary' }}>
                              +{goal.linkedAssets.length - 2} more assets
                            </Typography>
                          )}
                        </List>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          No assets linked to this goal.
                        </Typography>
                      )}
                      
                      {/* XIRR Information */}
                      {goal.type === 'saving' && goal.linkedAssets.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
                            Return Rates
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Box sx={{ 
                                p: 1, 
                                borderRadius: 1, 
                                bgcolor: alpha(theme.palette.warning.main, 0.1) 
                              }}>
                                <Typography variant="caption" color="text.secondary">
                                  Expected XIRR
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                  {goal.expectedXirr.toFixed(1)}%
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ 
                                p: 1, 
                                borderRadius: 1, 
                                bgcolor: alpha(statusInfo.color, 0.1) 
                              }}>
                                <Typography variant="caption" color="text.secondary">
                                  Actual XIRR
                                </Typography>
                                <Typography variant="body2" fontWeight="medium" sx={{ color: statusInfo.color }}>
                                  {goal.actualXirr.toFixed(1)}%
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                      
                      {/* Insurance Details */}
                      {['health', 'life', 'vehicle'].includes(goal.category) && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
                            Insurance Details
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Box sx={{ px: 1 }}>
                                <Typography variant="caption" color="text.secondary">Provider</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'medium' }}>
                                  {getInsuranceDetails(goal).provider || 'Not specified'}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ px: 1 }}>
                                <Typography variant="caption" color="text.secondary">Coverage</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'medium' }}>
                                  {getInsuranceDetails(goal).coverageAmount ? formatCurrency(getInsuranceDetails(goal).coverageAmount) : 'Not specified'}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ px: 1 }}>
                                <Typography variant="caption" color="text.secondary">Type</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'medium' }}>
                                  {getInsuranceDetails(goal).coverageType || 'Not specified'}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ px: 1 }}>
                                <Typography variant="caption" color="text.secondary">Renewal</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'medium' }}>
                                  {getInsuranceDetails(goal).renewalDate ? formatDate(getInsuranceDetails(goal).renewalDate) : 'Not specified'}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        
        {/* Empty state when no goals match the filter */}
        {filteredGoals.length === 0 && (
          <Grid item xs={12}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Typography variant="h6" gutterBottom>
                No goals found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {activeTab === 'all' 
                  ? 'You don\'t have any financial goals yet' 
                  : activeTab === 'saving' 
                    ? 'You don\'t have any savings goals yet'
                    : activeTab === 'debt'
                      ? 'You don\'t have any debt goals yet'
                      : `You don't have any ${goalCategories[activeTab]?.name.toLowerCase()} goals yet`}
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleAddGoal}
              >
                Add New Goal
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {/* Add/Edit Goal Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 3, 
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
          } 
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">{dialogMode === 'add' ? 'Add New Financial Goal' : 'Edit Financial Goal'}</Typography>
            <IconButton onClick={handleDialogClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Basic goal details */}
              <Grid item xs={12} sm={8}>
                <TextField
                  name="name"
                  label="Goal Name"
                  fullWidth
                  value={currentGoal.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={currentGoal.type}
                    label="Type"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="saving">Saving</MenuItem>
                    <MenuItem value="debt">Debt</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={currentGoal.category}
                    label="Category"
                    onChange={handleInputChange}
                  >
                    {Object.entries(goalCategories).map(([category, data]) => (
                      <MenuItem key={category} value={category}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              mr: 1,
                              bgcolor: alpha(data.color, 0.1),
                              color: data.color
                            }}
                          >
                            {data.icon}
                          </Avatar>
                          {data.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={currentGoal.priority}
                    label="Priority"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="high" sx={{ color: getPriorityColor('high') }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlagIcon sx={{ mr: 1 }} />
                        High Priority
                      </Box>
                    </MenuItem>
                    <MenuItem value="medium" sx={{ color: getPriorityColor('medium') }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlagIcon sx={{ mr: 1 }} />
                        Medium Priority
                      </Box>
                    </MenuItem>
                    <MenuItem value="low" sx={{ color: getPriorityColor('low') }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlagIcon sx={{ mr: 1 }} />
                        Low Priority
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={currentGoal.description}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              
              {/* Financial details */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="targetAmount"
                  label="Target Amount"
                  type="number"
                  fullWidth
                  value={currentGoal.targetAmount}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="currentAmount"
                  label="Current Amount"
                  type="number"
                  fullWidth
                  value={currentGoal.currentAmount}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="targetDate"
                  label="Target Date"
                  type="date"
                  fullWidth
                  value={currentGoal.targetDate}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="monthlySaving"
                  label="Monthly Contribution"
                  type="number"
                  fullWidth
                  value={currentGoal.monthlySaving}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              {/* Asset allocation section */}
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }}>
                  <Chip label="Asset Allocation" />
                </Divider>
              </Grid>
              
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="linked-assets"
                  options={assets}
                  getOptionLabel={(option) => `${option.name} (${option.xirr}% XIRR)`}
                  value={assets.filter(asset => currentGoal.linkedAssets.includes(asset.id))}
                  onChange={handleLinkedAssetsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Linked Assets"
                      placeholder="Select assets"
                    />
                  )}
                  disabled={currentGoal.type === 'debt'}
                />
                {currentGoal.type === 'debt' && (
                  <FormHelperText>Asset linking is only available for savings goals</FormHelperText>
                )}
              </Grid>
              
              {currentGoal.type === 'saving' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="expectedXirr"
                    label="Expected XIRR (%)"
                    type="number"
                    fullWidth
                    value={currentGoal.expectedXirr}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={currentGoal.linkedAssets.length === 0}
                    helperText={currentGoal.linkedAssets.length === 0 ? "Link assets to set expected XIRR" : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}
              
              {/* Insurance-specific fields */}
              {['health', 'life', 'vehicle'].includes(currentGoal.category) && (
                <>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }}>
                      <Chip label="Insurance Details" />
                    </Divider>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="insurance.provider"
                      label="Insurance Provider"
                      fullWidth
                      value={getInsuranceDetails(currentGoal).provider}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="insurance.coverageAmount"
                      label="Coverage Amount"
                      type="number"
                      fullWidth
                      value={getInsuranceDetails(currentGoal).coverageAmount}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="insurance.coverageType"
                      label="Coverage Type"
                      fullWidth
                      value={getInsuranceDetails(currentGoal).coverageType}
                      onChange={handleInputChange}
                      variant="outlined"
                      placeholder={
                        currentGoal.category === 'health' ? "e.g., Family Floater, Individual" :
                        currentGoal.category === 'life' ? "e.g., Term Plan, Whole Life" :
                        "e.g., Comprehensive, Third Party"
                      }
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="insurance.renewalDate"
                      label="Renewal Date"
                      type="date"
                      fullWidth
                      value={getInsuranceDetails(currentGoal).renewalDate}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={handleDialogClose}
            variant="outlined"
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveGoal} 
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!currentGoal.name || !currentGoal.targetAmount || !currentGoal.currentAmount || !currentGoal.targetDate || !currentGoal.monthlySaving}
          >
            {dialogMode === 'add' ? 'Add Goal' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Goals;