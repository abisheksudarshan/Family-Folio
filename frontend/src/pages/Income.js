// src/pages/Income.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
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
  Divider,
  Chip,
  useTheme,
  Avatar,
  alpha,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  ButtonGroup
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Work as WorkIcon,
  AccountBalance as BankIcon,
  Apartment as BusinessIcon,
  LocalAtm as CashIcon,
  CardGiftcard as GiftIcon,
  MonetizationOn as MoneyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  North as NorthIcon,
  South as SouthIcon,
  CalendarToday as CalendarTodayIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  AttachMoney as AttachMoneyIcon,
  Repeat as RepeatIcon,
  Event as EventIcon,
  Person as PersonIcon,
  People as PeopleIcon,
  Groups as GroupsIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

/**
 * Income Management Component
 * 
 * This component provides a comprehensive interface for managing 
 * family income sources, with support for different income types, 
 * frequencies, and family member ownership.
 * 
 * Features:
 * - View and filter income by family member
 * - Track recurring and one-time income sources
 * - Visualize income distribution by category and frequency
 * - Add, edit, and delete income sources
 * - Calculate monthly equivalent income across different frequencies
 */
const Income = () => {
  const theme = useTheme();
  
  // ============================================================
  // COMMON STYLES - Reusable style objects
  // ============================================================
  const styles = {
    // Container styles
    pageContainer: { 
      p: 3, // Increased padding for better spacing
      maxWidth: 1400,
      mx: 'auto'
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
        transform: 'translateY(-5px)', // Increased for more noticeable effect
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
      }
    },
    headerCard: {
      p: 2.5, // Reduced padding
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
    // Income list container
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
      height: 160, 
      width: '100%', 
      mt: 2 
    }
  };

  // ============================================================
  // STATE DEFINITIONS - Grouped by feature
  // ============================================================
  
  // UI state
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedMember, setSelectedMember] = useState('family');
  const [timePeriod, setTimePeriod] = useState('1Y');
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentIncome, setCurrentIncome] = useState({
    id: null,
    name: '',
    category: 'salary',
    amount: '',
    frequency: 'monthly',
    nextDate: '',
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
  
  // Income categories with their icons and colors
  const incomeCategories = {
    salary: { name: 'Salary', icon: <WorkIcon />, color: theme.palette.success.main },
    investment: { name: 'Investment', icon: <BankIcon />, color: theme.palette.info.main },
    business: { name: 'Business', icon: <BusinessIcon />, color: theme.palette.warning.main },
    freelance: { name: 'Freelance', icon: <CashIcon />, color: theme.palette.secondary.main },
    gifts: { name: 'Gifts', icon: <GiftIcon />, color: theme.palette.error.main },
    other: { name: 'Other', icon: <MoneyIcon />, color: theme.palette.grey[700] }
  };
  
  // Frequency options
  const frequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' },
    { value: 'oneTime', label: 'One-Time' }
  ];
  
  // Historical income data (for growth tracking)
  const [historicalIncome] = useState([
    { month: 'Jan', income: 7200 },
    { month: 'Feb', income: 7350 },
    { month: 'Mar', income: 7250 },
    { month: 'Apr', income: 8000 },
    { month: 'May', income: 8100 },
    { month: 'Jun', income: 8050 },
    { month: 'Jul', income: 8500 },
    { month: 'Aug', income: 8600 },
    { month: 'Sep', income: 8700 },
    { month: 'Oct', income: 8900 },
    { month: 'Nov', income: 9000 },
    { month: 'Dec', income: 9500 },
  ]);
  
  // Sample income data with owner field
  const [incomes, setIncomes] = useState([
    { 
      id: 1, 
      name: 'Primary Job', 
      category: 'salary', 
      amount: 85000, 
      frequency: 'monthly',
      nextDate: '2025-04-15',
      notes: 'After taxes',
      owner: 'parent1'
    },
    { 
      id: 2, 
      name: 'Stock Dividends', 
      category: 'investment', 
      amount: 12500, 
      frequency: 'quarterly',
      nextDate: '2025-06-30',
      notes: 'ETF portfolio',
      owner: 'parent1'
    },
    { 
      id: 3, 
      name: 'Rental Property', 
      category: 'investment', 
      amount: 32000, 
      frequency: 'monthly',
      nextDate: '2025-04-01',
      notes: 'Condo downtown',
      owner: 'family'
    },
    { 
      id: 4, 
      name: 'Freelance Project', 
      category: 'freelance', 
      amount: 75000, 
      frequency: 'oneTime',
      nextDate: '2025-04-20',
      notes: 'Web development project',
      owner: 'parent2'
    },
    { 
      id: 5, 
      name: 'Side Business', 
      category: 'business', 
      amount: 25000, 
      frequency: 'monthly',
      nextDate: '2025-04-28',
      notes: 'Online store',
      owner: 'parent2'
    },
    { 
      id: 6, 
      name: 'Part-time Teaching', 
      category: 'freelance', 
      amount: 15000, 
      frequency: 'monthly',
      nextDate: '2025-04-15',
      notes: 'Weekend classes',
      owner: 'parent1'
    },
    { 
      id: 7, 
      name: 'Interest Income', 
      category: 'investment', 
      amount: 8000, 
      frequency: 'quarterly',
      nextDate: '2025-05-10',
      notes: 'Fixed deposits',
      owner: 'family'
    },
    { 
      id: 8, 
      name: 'Birthday Gift', 
      category: 'gifts', 
      amount: 10000, 
      frequency: 'oneTime',
      nextDate: '2025-07-15',
      notes: 'From grandparents',
      owner: 'child1'
    },
    { 
      id: 9, 
      name: 'YouTube Channel', 
      category: 'business', 
      amount: 5000, 
      frequency: 'monthly',
      nextDate: '2025-04-22',
      notes: 'Ad revenue',
      owner: 'child2'
    },
    { 
      id: 10, 
      name: 'Scholarship', 
      category: 'other', 
      amount: 50000, 
      frequency: 'annually',
      nextDate: '2025-08-10',
      notes: 'Merit scholarship',
      owner: 'child1'
    },
  ]);

  // ============================================================
  // UTILITY FUNCTIONS - Helper functions for data and formatting
  // ============================================================
  
  /**
   * Filters income sources based on selected family member
   * If 'family' is selected, returns all income sources
   * Otherwise, returns only the income sources owned by the selected member or by the entire family
   * 
   * @param {Array} items - Array of income sources to filter
   * @returns {Array} Filtered array of income sources
   */
  const filterByMember = (items) => {
    if (selectedMember === 'family') {
      return items; // Return all items when "All Family" is selected
    }
    return items.filter(item => item.owner === selectedMember || item.owner === 'family');
  };
  
  // Get filtered incomes
  const filteredIncomes = filterByMember(incomes);
  
  /**
   * Calculates the monthly equivalent value of an income based on its frequency
   * This allows for standardized comparison of income sources with different payment frequencies
   * 
   * @param {number} amount - The income amount
   * @param {string} frequency - The frequency of the income (weekly, monthly, etc.)
   * @returns {number} The monthly equivalent value
   */
  const calculateMonthlyEquivalent = (amount, frequency) => {
    switch (frequency) {
      case 'weekly':
        return amount * 4.33; // average weeks in a month
      case 'biweekly':
        return amount * 2.17; // average bi-weeks in a month
      case 'monthly':
        return amount;
      case 'quarterly':
        return amount / 3;
      case 'annually':
        return amount / 12;
      case 'oneTime':
        return 0; // one-time incomes don't contribute to monthly recurring income
      default:
        return 0;
    }
  };
  
  // Calculate total monthly income ensuring family total matches sum of individual members
  const calculateTotalIncome = () => {
    if (selectedMember !== 'family') {
      return filteredIncomes.reduce((sum, income) => {
        return sum + calculateMonthlyEquivalent(income.amount, income.frequency);
      }, 0);
    } else {
      // For family view, sum all individual members plus family-owned items
      let total = 0;
      
      // Add income from individual members
      familyMembers.forEach(member => {
        if (member.id !== 'family') {
          const memberIncome = incomes
            .filter(income => income.owner === member.id)
            .reduce((sum, income) => sum + calculateMonthlyEquivalent(income.amount, income.frequency), 0);
          total += memberIncome;
        }
      });
      
      // Add family-owned income
      const familyOwnedIncome = incomes
        .filter(income => income.owner === 'family')
        .reduce((sum, income) => sum + calculateMonthlyEquivalent(income.amount, income.frequency), 0);
      
      return total + familyOwnedIncome;
    }
  };
  
  const totalMonthlyIncome = calculateTotalIncome();
  
  const oneTimeIncomeTotal = filteredIncomes
    .filter(income => income.frequency === 'oneTime')
    .reduce((sum, income) => sum + income.amount, 0);
  
  const totalAnnualIncome = (totalMonthlyIncome * 12) + oneTimeIncomeTotal;
  
  // Calculate total income by frequency
  const incomeByFrequency = frequencies.map(freq => {
    const totalForFrequency = filteredIncomes
      .filter(income => income.frequency === freq.value)
      .reduce((sum, income) => sum + income.amount, 0);
    
    const monthlyEquivalent = filteredIncomes
      .filter(income => income.frequency === freq.value)
      .reduce((sum, income) => sum + calculateMonthlyEquivalent(income.amount, income.frequency), 0);
    
    return {
      frequency: freq.label,
      total: totalForFrequency,
      monthlyEquivalent: monthlyEquivalent
    };
  }).filter(item => item.total > 0);
  
  // Group incomes by category for chart
  const incomeByCategoryData = Object.keys(incomeCategories).map(category => {
    const totalForCategory = filteredIncomes
      .filter(income => income.category === category)
      .reduce((sum, income) => sum + calculateMonthlyEquivalent(income.amount, income.frequency), 0);
    
    const color = incomeCategories[category].color;
    
    return {
      category: incomeCategories[category].name,
      amount: totalForCategory,
      color: color
    };
  }).filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);
  
  // Calculate category totals for filtered items
  const incomeCategoryTotals = filteredIncomes.reduce((totals, income) => {
    if (!totals[income.category]) {
      totals[income.category] = {
        total: 0,
        monthlyEquivalent: 0,
        count: 0
      };
    }
    totals[income.category].total += income.amount;
    totals[income.category].monthlyEquivalent += calculateMonthlyEquivalent(income.amount, income.frequency);
    totals[income.category].count += 1;
    return totals;
  }, {});
  
  // Comparison with previous month (assuming 3% monthly growth)
  const prevMonthIncome = totalMonthlyIncome / 1.03;
  const incomeGrowth = totalMonthlyIncome - prevMonthIncome;
  const incomeGrowthPercentage = (incomeGrowth / prevMonthIncome) * 100;
  
  /**
   * Formats a number as INR currency with proper thousands separators
   * 
   * @param {number} value - The number to format as currency
   * @returns {string} Formatted currency string (e.g., "₹10,000")
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
   * Formats a number with proper thousands separators using Indian numeral system
   * 
   * @param {number} value - The number to format
   * @returns {string} Formatted number string (e.g., "10,000")
   */
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };
  
  /**
   * Formats a percentage value with a "+" or "-" prefix
   * 
   * @param {number} value - The percentage value to format
   * @returns {string} Formatted percentage string (e.g., "+3.5%" or "-2.1%")
   */
  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };
  
  /**
   * Formats a date string to a readable format (e.g., "Apr 15, 2025")
   * 
   * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  /**
   * Gets the display label for a frequency value
   * 
   * @param {string} frequencyValue - The frequency value (e.g., "monthly")
   * @returns {string} The display label (e.g., "Monthly")
   */
  const getFrequencyLabel = (frequencyValue) => {
    return frequencies.find(f => f.value === frequencyValue)?.label || frequencyValue;
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
            <Typography variant="body2" color="primary.main" display="flex" alignItems="center">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.primary.main, mr: 1 }} />
              Income: {formatCurrency(payload[0].payload.income)}
            </Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };

  // ============================================================
  // EVENT HANDLERS - All event handling functions
  // ============================================================
  
  /**
   * Toggles the visibility of balance amounts throughout the UI
   * Used for privacy when viewing financial information in public
   */
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };
  
  /**
   * Handles changing the selected family member for filtering
   * 
   * @param {Event} event - The event object
   * @param {string} newMember - The ID of the newly selected family member
   */
  const handleMemberChange = (event, newMember) => {
    if (newMember) {
      setSelectedMember(newMember);
    }
  };
  
  /**
   * Changes the time period for income trend visualization
   * 
   * @param {string} period - The time period to display ('3M', '6M', '1Y', '3Y', 'ALL')
   */
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };
  
  /**
   * Opens the dialog to add a new income source
   * Initializes the form with default values
   */
  const handleAddIncome = () => {
    setDialogMode('add');
    setCurrentIncome({
      id: null,
      name: '',
      category: 'salary',
      amount: '',
      frequency: 'monthly',
      nextDate: new Date().toISOString().split('T')[0],
      notes: '',
      owner: selectedMember === 'family' ? 'family' : selectedMember
    });
    setDialogOpen(true);
  };
  
  /**
   * Opens the dialog to edit an existing income source
   * Populates the form with the income's current values
   * 
   * @param {Object} income - The income source to edit
   */
  const handleEditIncome = (income) => {
    setDialogMode('edit');
    setCurrentIncome({ ...income });
    setDialogOpen(true);
  };
  
  /**
   * Deletes an income source after confirmation
   * 
   * @param {number} incomeId - The ID of the income source to delete
   */
  const handleDeleteIncome = (incomeId) => {
    if (window.confirm('Are you sure you want to delete this income source?')) {
      setIncomes(incomes.filter(income => income.id !== incomeId));
    }
  };
  
  /**
   * Closes the income dialog without saving changes
   */
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  /**
   * Handles input changes in the income dialog form
   * 
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentIncome({
      ...currentIncome,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };
  
  /**
   * Saves the current income form data
   * Either adds a new income source or updates an existing one
   */
  const handleSaveIncome = () => {
    if (dialogMode === 'add') {
      // Add new income
      const newIncome = {
        ...currentIncome,
        id: Math.max(...incomes.map(i => i.id), 0) + 1,
        amount: parseFloat(currentIncome.amount) || 0
      };
      setIncomes([...incomes, newIncome]);
    } else {
      // Update existing income
      setIncomes(incomes.map(income => 
        income.id === currentIncome.id ? {
          ...currentIncome,
          amount: parseFloat(currentIncome.amount) || 0
        } : income
      ));
    }
    setDialogOpen(false);
  };

  // ============================================================
  // COMPONENT FUNCTIONS - Break UI into logical sections
  // ============================================================

  // 1. Summary Header Component with Chart and Member Selection
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
              {selectedMember === 'family' ? 'Family Income' : `${familyMembers.find(m => m.id === selectedMember)?.name}'s Income`}
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
              {hideBalances ? '••••••••' : formatCurrency(totalMonthlyIncome)}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              monthly income
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={styles.changeIndicator(incomeGrowth >= 0)}>
              {incomeGrowth >= 0 ? 
                <NorthIcon fontSize="small" sx={{ color: '#2e7d32' }} /> : 
                <SouthIcon fontSize="small" sx={{ color: '#d32f2f' }} />
              }
              <Typography 
                variant="body1" 
                sx={{ 
                  ml: 0.5,
                  fontWeight: 'medium',
                  color: incomeGrowth >= 0 ? '#2e7d32' : '#d32f2f'
                }}
              >
                {hideBalances ? '••••' : formatCurrency(incomeGrowth)}
                <span style={{ 
                  display: 'inline-block', 
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  color: 'inherit'
                }}>
                  ({formatPercentage(incomeGrowthPercentage)})
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
                  Annual Income YTD
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#4caf50">
                  {hideBalances ? '••••••••' : formatCurrency(totalAnnualIncome)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255, 152, 0, 0.2)' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  One-Time Income
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#ff9800">
                  {hideBalances ? '••••••••' : formatCurrency(oneTimeIncomeTotal)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalIncome.slice(-parseInt(timePeriod === '3M' ? 3 : timePeriod === '6M' ? 6 : timePeriod === '1Y' ? 12 : historicalIncome.length))}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  tickFormatter={(value) => {
                    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
                    return `₹${value}`;
                  }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#FFFFFF" 
                  strokeWidth={2}
                  dot={{ fill: '#FFFFFF', stroke: 'rgba(255,255,255,0.5)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#FFFFFF', stroke: 'rgba(255,255,255,0.5)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  // 2. Summary Cards - Key income metrics
  const renderSummaryCards = () => (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Income Sources Count */}
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={0} sx={{ 
          ...styles.cardHover,
          height: '100%', 
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden'
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
                  <AttachMoneyIcon />
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  Income Sources
                </Typography>
              </Box>
              
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                {filteredIncomes.length}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Active income streams
            </Typography>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  icon={<WorkIcon fontSize="small" />}
                  label={`${filteredIncomes.filter(i => i.category === 'salary').length} Salary`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(incomeCategories.salary.color, 0.1),
                    color: incomeCategories.salary.color,
                    fontWeight: 'medium'
                  }} 
                />
                <Chip 
                  icon={<BankIcon fontSize="small" />}
                  label={`${filteredIncomes.filter(i => i.category === 'investment').length} Inv.`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(incomeCategories.investment.color, 0.1),
                    color: incomeCategories.investment.color,
                    fontWeight: 'medium'
                  }} 
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Recurring Income */}
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={0} sx={{ 
          ...styles.cardHover,
          height: '100%', 
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden'
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
                  <RepeatIcon />
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  Recurring Income
                </Typography>
              </Box>
              
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                {hideBalances ? '••••••••' : formatCurrency(totalMonthlyIncome)}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Monthly equivalent
            </Typography>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 'medium'
                }}
              >
                <TrendingUpIcon 
                  fontSize="small" 
                  sx={{ 
                    mr: 0.5,
                    color: theme.palette.success.main
                  }} 
                />
                +3.2% vs last month
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredIncomes.filter(i => i.frequency !== 'oneTime').length} sources
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      {/* One-Time Income */}
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={0} sx={{ 
          ...styles.cardHover,
          height: '100%', 
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden'
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
              backgroundColor: alpha(theme.palette.warning.main, 0.15)
            }} />
          </Box>
          <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  mr: 1.5, 
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main
                }}>
                  <EventIcon />
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  One-Time Income
                </Typography>
              </Box>
              
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                {hideBalances ? '••••••••' : formatCurrency(oneTimeIncomeTotal)}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Non-recurring income
            </Typography>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip 
                icon={<CalendarTodayIcon fontSize="small" />}
                label="Upcoming Income" 
                size="small" 
                sx={{ 
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main,
                  fontWeight: 'medium'
                }} 
              />
              <Typography variant="body2" color="text.secondary">
                {filteredIncomes.filter(i => i.frequency === 'oneTime').length} sources
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Annual Income */}
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={0} sx={{ 
          ...styles.cardHover,
          height: '100%', 
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden'
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
                  <MoneyIcon />
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  Annual Income
                </Typography>
              </Box>
              
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                {hideBalances ? '••••••••' : formatCurrency(totalAnnualIncome)}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Total projected income
            </Typography>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Including one-time income
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // 3. Income List by Categories
  const renderIncomeList = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        mb: 3,
        borderRadius: 3
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Income Sources
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleAddIncome}
          sx={{
            ...styles.actionButton
          }}
        >
          Add Income
        </Button>
      </Box>
      
      {/* Income Categories - Group income sources by category */}
      {Object.keys(incomeCategories).map((category) => {
        const categoryIncomes = filteredIncomes.filter(income => income.category === category);
        if (categoryIncomes.length === 0) return null;
        
        const categoryInfo = incomeCategories[category];
        const categoryTotal = incomeCategoryTotals[category]?.total || 0;
        const categoryMonthly = incomeCategoryTotals[category]?.monthlyEquivalent || 0;
        
        return (
          <Box key={category} sx={{ mb: 3 }}>
            <Box sx={styles.categoryHeader(categoryInfo.color)}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  width: 36, 
                  height: 36, 
                  mr: 1.5, 
                  bgcolor: alpha(categoryInfo.color, 0.1), 
                  color: categoryInfo.color 
                }}>
                  {categoryInfo.icon}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {categoryInfo.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {categoryIncomes.length} {categoryIncomes.length === 1 ? 'source' : 'sources'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: categoryInfo.color }}>
                  {hideBalances ? '••••••••' : formatCurrency(categoryMonthly)}/mo
                </Typography>
                {categoryTotal !== categoryMonthly && (
                  <Typography variant="caption" color="text.secondary">
                    {hideBalances ? '••••••••' : formatCurrency(categoryTotal)} total
                  </Typography>
                )}
              </Box>
            </Box>
            
            <List sx={styles.listContainer}>
              {categoryIncomes.map((income) => (
                <ListItem 
                  key={income.id}
                  sx={styles.listItem(categoryInfo.color)}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" fontWeight="medium">
                          {income.name}
                        </Typography>
                        {selectedMember === 'family' && (
                          <Tooltip title={`Owned by ${familyMembers.find(m => m.id === income.owner)?.name || 'Family'}`}>
                            <Avatar 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                fontSize: '0.75rem', 
                                ml: 1,
                                bgcolor: income.owner === 'family' 
                                  ? alpha(theme.palette.primary.main, 0.1) 
                                  : alpha(familyMembers.find(m => m.id === income.owner)?.color || theme.palette.grey[500], 0.2),
                                color: income.owner === 'family' 
                                  ? theme.palette.primary.main 
                                  : familyMembers.find(m => m.id === income.owner)?.color || theme.palette.grey[700]
                              }}
                            >
                              {income.owner === 'family' ? 'F' : familyMembers.find(m => m.id === income.owner)?.name.charAt(0) || '?'}
                            </Avatar>
                          </Tooltip>
                        )}
                        <Chip 
                          label={getFrequencyLabel(income.frequency)}
                          size="small"
                          sx={{ 
                            ml: 2,
                            bgcolor: alpha(theme.palette.grey[500], 0.1),
                            color: theme.palette.grey[700]
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5 }} />
                          Next: {formatDate(income.nextDate)}
                        </Typography>
                        {income.notes && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            sx={{ ml: 2 }}
                          >
                            {income.notes}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'right', mr: 2 }}>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: categoryInfo.color }}>
                        {hideBalances ? '••••••••' : formatCurrency(income.amount)}
                      </Typography>
                      {income.frequency !== 'oneTime' && (
                        <Typography variant="caption" color="text.secondary">
                          {hideBalances ? '••••••••' : formatCurrency(calculateMonthlyEquivalent(income.amount, income.frequency))}/mo
                        </Typography>
                      )}
                    </Box>
                    <IconButton 
                      edge="end" 
                      size="small" 
                      onClick={() => handleEditIncome(income)}
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
                      onClick={() => handleDeleteIncome(income.id)}
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
        );
      })}
      
      {/* Empty state when no income sources are found */}
      {filteredIncomes.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No income sources found.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleAddIncome}
            sx={{ mt: 2 }}
          >
            Add Your First Income Source
          </Button>
        </Box>
      )}
    </Paper>
  );

  // 4. Add/Edit Income Dialog
  const renderIncomeDialog = () => (
    <Dialog 
      open={dialogOpen} 
      onClose={handleDialogClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{dialogMode === 'add' ? 'Add Income Source' : 'Edit Income Source'}</Typography>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Income Name"
                fullWidth
                required
                value={currentIncome.name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                fullWidth
                required
                value={currentIncome.amount}
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
                  value={currentIncome.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  {Object.entries(incomeCategories).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            mr: 1,
                            bgcolor: alpha(value.color, 0.1),
                            color: value.color
                          }}
                        >
                          {value.icon}
                        </Avatar>
                        <Typography>{value.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel id="frequency-label">Frequency</InputLabel>
                <Select
                  labelId="frequency-label"
                  name="frequency"
                  value={currentIncome.frequency}
                  label="Frequency"
                  onChange={handleInputChange}
                >
                  {frequencies.map((freq) => (
                    <MenuItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="nextDate"
                label="Next Payment Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={currentIncome.nextDate}
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
                  value={currentIncome.owner}
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
                value={currentIncome.notes}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            
            {/* Monthly Equivalent Display - Shows calculated monthly income based on frequency */}
            {currentIncome.amount && currentIncome.frequency && currentIncome.frequency !== 'oneTime' && (
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Monthly Equivalent
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight="medium">
                    {formatCurrency(calculateMonthlyEquivalent(parseFloat(currentIncome.amount) || 0, currentIncome.frequency))}/month
                  </Typography>
                </Box>
              </Grid>
            )}
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
          onClick={handleSaveIncome}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!currentIncome.name || !currentIncome.amount || !currentIncome.nextDate}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          {dialogMode === 'add' ? 'Add Income' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  // ============================================================
  // MAIN RENDER - The income management layout
  // ============================================================
  return (
    <Box sx={styles.pageContainer}>
      {/* Summary Header with Family Selector and Charts */}
      {renderSummaryHeader()}
      
      {/* Summary Cards */}
      {renderSummaryCards()}
      
      {/* Income List */}
      {renderIncomeList()}
      
      {/* Add/Edit Income Dialog */}
      {renderIncomeDialog()}
    </Box>
  );
};

export default Income;