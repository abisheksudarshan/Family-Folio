// src/pages/TaxPlanning.js
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, IconButton, InputAdornment,
  List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Tooltip,
  Avatar, alpha, useTheme, Badge, ToggleButtonGroup, ToggleButton, AvatarGroup,
  Tab, Tabs, Switch, FormControlLabel, FormHelperText, FormGroup, Alert, Checkbox
} from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, 
  Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import CalculateOutlined from '@mui/icons-material/CalculateOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import FamilyRestroomOutlined from '@mui/icons-material/FamilyRestroomOutlined';
import BusinessOutlined from '@mui/icons-material/BusinessOutlined';
import LocalHospitalOutlined from '@mui/icons-material/LocalHospitalOutlined';
import VolunteerActivismOutlined from '@mui/icons-material/VolunteerActivismOutlined';
import SavingsIcon from '@mui/icons-material/Savings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import RefreshIcon from '@mui/icons-material/Refresh';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArticleIcon from '@mui/icons-material/Article';
import PieChartIcon from '@mui/icons-material/PieChart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TaxPlanning = () => {
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
    // Tax item list container
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
    },
    // Income form section
    formSection: {
      p: 2, 
      mb: 2,
      borderRadius: 2,
      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      bgcolor: alpha(theme.palette.background.paper, 0.5)
    },
    // Tax tabs
    taxTabs: {
      mb: 3,
      borderRadius: 3,
      bgcolor: alpha(theme.palette.background.paper, 0.7),
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      '& .MuiTab-root': {
        minHeight: '60px',
        textTransform: 'none',
      }
    }
  };

  // ============================================================
  // STATE DEFINITIONS - Grouped by feature
  // ============================================================
  // UI state
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedMember, setSelectedMember] = useState('family');
  const [currentTab, setCurrentTab] = useState(0);
  const [comparing, setComparing] = useState(false);
  const [calculating, setCalculating] = useState(false);
  
  // Tax regime selection
  const [taxRegime, setTaxRegime] = useState('new');
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentDeduction, setCurrentDeduction] = useState({
    id: null,
    name: '',
    category: '',
    amount: '',
    section: '',
    proofAvailable: true,
    notes: '',
    owner: 'family'
  });

  // Income details
  const [incomeDetails, setIncomeDetails] = useState({
    salary: {
      basic: 850000,
      hra: 425000,
      lta: 60000,
      specialAllowance: 550000,
      bonus: 150000,
      otherAllowances: 75000
    },
    houseProp: {
      type: 'rented', // rented, self-occupied, deemed-let-out
      rentReceived: 0,
      municipalTaxes: 0,
      interestPaid: 200000,
      rentPaid: 360000,
      isHraExempt: true,
      cityType: 'metro' // metro or non-metro
    },
    capitalGains: {
      shortTerm: 0,
      longTermEquity: 0,
      longTermProperty: 0
    },
    otherSources: {
      interest: 65000,
      dividends: 15000,
      gifts: 0,
      lottery: 0
    }
  });

  // ============================================================
  // SAMPLE DATA - All mock data grouped together
  // ============================================================
  
  // Family members data
  const familyMembers = [
    { id: 'family', name: 'All Family', avatar: <GroupsIcon />, color: theme.palette.primary.main, ageGroup: 'general', income: 2035000 },
    { id: 'parent1', name: 'Raj', avatar: '👨', color: '#1976d2', ageGroup: 'general', income: 1800000 },
    { id: 'parent2', name: 'Meera', avatar: '👩', color: '#9c27b0', ageGroup: 'general', income: 120000 },
    { id: 'child1', name: 'Arjun', avatar: '👦', color: '#2e7d32', ageGroup: 'general', income: 80000 },
    { id: 'child2', name: 'Anjali', avatar: '👧', color: '#d32f2f', ageGroup: 'general', income: 35000 },
    { id: 'senior', name: 'Dadaji', avatar: '👴', color: '#795548', ageGroup: 'senior', income: 0 }
  ];
  
  // Deduction categories with their icons and sections
  const deductionCategories = {
    investments: { 
      name: 'Investments', 
      icon: <SavingsIcon />, 
      sections: ['80C', '80CCC', '80CCD'] 
    },
    medical: { 
      name: 'Medical & Insurance', 
      icon: <LocalHospitalOutlined />, 
      sections: ['80D', '80DD', '80DDB', '80U'] 
    },
    education: { 
      name: 'Education', 
      icon: <SchoolIcon />, 
      sections: ['80E'] 
    },
    housing: { 
      name: 'Housing & Property', 
      icon: <HomeIcon />, 
      sections: ['80EE', '80EEA', '24(b)'] 
    },
    donations: { 
      name: 'Donations', 
      icon: <VolunteerActivismOutlined />, 
      sections: ['80G', '80GGA', '80GGC'] 
    },
    other: { 
      name: 'Other Deductions', 
      icon: <ArticleIcon />, 
      sections: ['80GG', '80GGB', '80TTA', '80TTB'] 
    }
  };
  
  // Sample deductions with owner field
  const [deductions, setDeductions] = useState([
    // 80C Investments
    { id: 1, name: 'EPF Contribution', category: 'investments', amount: 96000, section: '80C', proofAvailable: true, notes: '8% of basic salary', owner: 'parent1' },
    { id: 2, name: 'PPF Investment', category: 'investments', amount: 150000, section: '80C', proofAvailable: true, notes: 'Annual contribution', owner: 'parent1' },
    { id: 3, name: 'ELSS Mutual Funds', category: 'investments', amount: 50000, section: '80C', proofAvailable: true, notes: 'Tax-saving equity fund', owner: 'parent1' },
    { id: 4, name: 'Child Tuition Fees', category: 'investments', amount: 42000, section: '80C', proofAvailable: true, notes: 'For Anjali', owner: 'parent2' },
    { id: 5, name: 'Life Insurance Premium', category: 'investments', amount: 25000, section: '80C', proofAvailable: true, notes: 'Term insurance', owner: 'parent1' },
    
    // 80D Health Insurance
    { id: 6, name: 'Health Insurance - Self & Family', category: 'medical', amount: 25000, section: '80D', proofAvailable: true, notes: 'Family floater plan', owner: 'parent1' },
    { id: 7, name: 'Health Insurance - Parents', category: 'medical', amount: 35000, section: '80D', proofAvailable: true, notes: 'For senior citizen parents', owner: 'parent1' },
    { id: 8, name: 'Preventive Health Checkup', category: 'medical', amount: 5000, section: '80D', proofAvailable: true, notes: 'Annual checkup', owner: 'parent2' },
    
    // Housing Loan Interest
    { id: 9, name: 'Home Loan Interest', category: 'housing', amount: 200000, section: '24(b)', proofAvailable: true, notes: 'Self-occupied property', owner: 'family' },
    
    // Education Loan
    { id: 10, name: 'Education Loan Interest', category: 'education', amount: 25000, section: '80E', proofAvailable: true, notes: 'For higher education', owner: 'child1' },
    
    // Donations
    { id: 11, name: 'PM Relief Fund Donation', category: 'donations', amount: 10000, section: '80G', proofAvailable: true, notes: '100% deduction', owner: 'parent1' },
    { id: 12, name: 'Charitable Trust Donation', category: 'donations', amount: 5000, section: '80G', proofAvailable: true, notes: '50% deduction', owner: 'parent1' },
    
    // Additional NPS
    { id: 13, name: 'Additional NPS Contribution', category: 'investments', amount: 50000, section: '80CCD(1B)', proofAvailable: true, notes: 'Voluntary contribution', owner: 'parent1' },
    
    // Interest on Savings
    { id: 14, name: 'Savings Account Interest', category: 'other', amount: 10000, section: '80TTA', proofAvailable: true, notes: 'Interest earned on savings', owner: 'parent1' }
  ]);

  // Tax brackets for old regime (FY 2023-24)
  const oldRegimeTaxBrackets = [
    { range: "₹0-₹2.5L", rate: 0, amount: 0 },
    { range: "₹2.5L-₹5L", rate: 5, amount: 12500 },
    { range: "₹5L-₹10L", rate: 20, amount: 100000 },
    { range: "₹10L+", rate: 30, amount: 0 }
  ];
  
  // Tax brackets for new regime (FY 2023-24)
  const newRegimeTaxBrackets = [
    { range: "₹0-₹3L", rate: 0, amount: 0 },
    { range: "₹3L-₹6L", rate: 5, amount: 15000 },
    { range: "₹6L-₹9L", rate: 10, amount: 30000 },
    { range: "₹9L-₹12L", rate: 15, amount: 45000 },
    { range: "₹12L-₹15L", rate: 20, amount: 60000 },
    { range: "₹15L+", rate: 30, amount: 0 }
  ];
  
  // Tax optimization strategies
  const [optimizationStrategies, setOptimizationStrategies] = useState([
    {
      id: 1,
      name: 'Maximize 80C deductions',
      description: 'Invest in ELSS, PPF, or other 80C eligible investments to reach the ₹1.5 lakh limit.',
      potentialSavings: 45000,
      implemented: false
    },
    {
      id: 2,
      name: 'Health Insurance Premium',
      description: 'Get a comprehensive health insurance for yourself and family for additional 80D deduction.',
      potentialSavings: 7500,
      implemented: false
    },
    {
      id: 3,
      name: 'Additional NPS contribution',
      description: 'Contribute to National Pension Scheme for an additional deduction of up to ₹50,000.',
      potentialSavings: 15000,
      implemented: false
    },
    {
      id: 4,
      name: 'Open a Home Savings Account',
      description: 'Save in Home Savings Account to claim deduction under 80C for future home purchase.',
      potentialSavings: 12500,
      implemented: false
    },
    {
      id: 5,
      name: 'Optimize HRA exemption',
      description: 'Ensure you have proper rent receipts and agreements to maximize HRA tax exemption.',
      potentialSavings: 35000,
      implemented: false
    }
  ]);
  
  // Sample historical tax paid data
  const historicalTaxData = [
    { 
      year: 'FY 2022-23', 
      oldRegime: 138000, 
      newRegime: 150000, 
      memberData: {
        parent1: { oldRegime: 120000, newRegime: 135000 },
        parent2: { oldRegime: 0, newRegime: 0 },
        child1: { oldRegime: 0, newRegime: 0 },
        child2: { oldRegime: 0, newRegime: 0 },
        senior: { oldRegime: 0, newRegime: 0 },
        family: { oldRegime: 18000, newRegime: 15000 }
      }
    },
    { 
      year: 'FY 2023-24', 
      oldRegime: 145000, 
      newRegime: 156000, 
      memberData: {
        parent1: { oldRegime: 125000, newRegime: 140000 },
        parent2: { oldRegime: 0, newRegime: 0 },
        child1: { oldRegime: 0, newRegime: 0 },
        child2: { oldRegime: 0, newRegime: 0 },
        senior: { oldRegime: 0, newRegime: 0 },
        family: { oldRegime: 20000, newRegime: 16000 }
      }
    },
    { 
      year: 'FY 2024-25 (Est.)', 
      oldRegime: 152000, 
      newRegime: 161000, 
      memberData: {
        parent1: { oldRegime: 130000, newRegime: 144000 },
        parent2: { oldRegime: 2000, newRegime: 1500 },
        child1: { oldRegime: 0, newRegime: 0 },
        child2: { oldRegime: 0, newRegime: 0 },
        senior: { oldRegime: 0, newRegime: 0 },
        family: { oldRegime: 20000, newRegime: 15500 }
      }
    }
  ];
  
  // ============================================================
  // UTILITY FUNCTIONS - Helper functions for data and formatting
  // ============================================================
  
  // Function to filter deductions based on selected member
  const filterByMember = (items) => {
    if (selectedMember === 'family') {
      return items; // Return all items when "All Family" is selected
    }
    return items.filter(item => item.owner === selectedMember);
  };
  
  // Get filtered data
  const filteredDeductions = filterByMember(deductions);
  
  // Calculate total deductions for filtered items
  const totalDeductions = filteredDeductions.reduce((sum, deduction) => sum + deduction.amount, 0);
  
  // Calculate category totals for filtered items
  const deductionCategoryTotals = filteredDeductions.reduce((totals, deduction) => {
    if (!totals[deduction.category]) {
      totals[deduction.category] = 0;
    }
    totals[deduction.category] += deduction.amount;
    return totals;
  }, {});
  
  // Get current member's income total
  const getCurrentMemberIncome = () => {
    const member = familyMembers.find(m => m.id === selectedMember);
    return member ? member.income : 0;
  };
  
  // Calculate tax for the selected member
  const calculateTax = (income, regime, deductionsTotal) => {
    // Implement Indian tax calculation based on regime
    let taxableIncome = income;
    
    // Apply deductions if old regime
    if (regime === 'old') {
      taxableIncome = Math.max(0, income - deductionsTotal);
    }
    
    // Use appropriate tax brackets
    const brackets = regime === 'old' ? oldRegimeTaxBrackets : newRegimeTaxBrackets;
    
    let tax = 0;
    
    // Simple tax calculation for illustration
    if (regime === 'old') {
      if (taxableIncome <= 250000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.3;
      }
    } else { // new regime
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.1;
      } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
      } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.3;
      }
    }
    
    // Apply rebate if applicable (Section 87A)
    if (taxableIncome <= 500000) {
      tax = Math.max(0, tax - 12500);
    }
    
    // Add 4% cess
    tax = tax * 1.04;
    
    return Math.round(tax);
  };
  
  // Get tax data for the selected member
  const getTaxData = () => {
    const income = getCurrentMemberIncome();
    const oldRegimeTax = calculateTax(income, 'old', totalDeductions);
    const newRegimeTax = calculateTax(income, 'new', 0); // No deductions in new regime
    
    return {
      income,
      oldRegimeTax,
      newRegimeTax,
      saving: Math.max(0, newRegimeTax - oldRegimeTax),
      betterRegime: oldRegimeTax <= newRegimeTax ? 'old' : 'new'
    };
  };
  
  // Get historical tax data for the selected member
  const getMemberTaxHistory = () => {
    return historicalTaxData.map(item => {
      if (selectedMember === 'family') {
        return item;
      } else {
        return {
          year: item.year,
          oldRegime: item.memberData[selectedMember]?.oldRegime || 0,
          newRegime: item.memberData[selectedMember]?.newRegime || 0
        };
      }
    });
  };
  
  const taxData = getTaxData();
  
  // Format currency
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
  
  // Handle tax regime change
  const handleTaxRegimeChange = (event) => {
    setTaxRegime(event.target.value);
  };
  
  // Toggle comparison view
  const toggleComparison = () => {
    setComparing(!comparing);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // Dialog related handlers
  const handleAddDeduction = () => {
    setDialogMode('add');
    setCurrentDeduction({
      id: null,
      name: '',
      category: Object.keys(deductionCategories)[0],
      amount: '',
      section: '',
      proofAvailable: true,
      notes: '',
      owner: selectedMember === 'family' ? 'family' : selectedMember
    });
    setDialogOpen(true);
  };
  
  const handleEditDeduction = (deduction) => {
    setDialogMode('edit');
    setCurrentDeduction({ ...deduction });
    setDialogOpen(true);
  };
  
  const handleDeleteDeduction = (deductionId) => {
    setDeductions(deductions.filter(deduction => deduction.id !== deductionId));
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDeduction({
      ...currentDeduction,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCurrentDeduction({
      ...currentDeduction,
      [name]: checked
    });
  };
  
  const handleSaveDeduction = () => {
    if (dialogMode === 'add') {
      // Add new deduction
      const newDeduction = {
        ...currentDeduction,
        id: Math.max(...deductions.map(item => item.id), 0) + 1
      };
      
      setDeductions([...deductions, newDeduction]);
    } else {
      // Update existing deduction
      setDeductions(deductions.map(deduction => 
        deduction.id === currentDeduction.id ? currentDeduction : deduction
      ));
    }
    setDialogOpen(false);
  };
  
  // Handle optimization toggle
  const handleOptimizationToggle = (id) => {
    setOptimizationStrategies(optimizationStrategies.map(strategy => 
      strategy.id === id ? { ...strategy, implemented: !strategy.implemented } : strategy
    ));
  };
  
  // Handle income detail changes
  const handleIncomeChange = (category, field, value) => {
    setIncomeDetails({
      ...incomeDetails,
      [category]: {
        ...incomeDetails[category],
        [field]: value
      }
    });
  };
  
  // Calculate taxes
  const calculateTaxes = () => {
    setCalculating(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setCalculating(false);
    }, 1000);
  };

  // ============================================================
  // COMPONENT FUNCTIONS - Break UI into logical sections
  // ============================================================

  // 1. Summary Header Component 
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
              {selectedMember === 'family' ? 'Family Tax Planning' : `${familyMembers.find(m => m.id === selectedMember)?.name}'s Tax Planning`}
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
              {hideBalances ? '••••••••' : formatCurrency(taxData.oldRegimeTax)}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Old Regime Tax
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={styles.changeIndicator(taxData.betterRegime === 'old')}>
              {taxData.betterRegime === 'old' ? 
                <NorthIcon fontSize="small" sx={{ color: '#2e7d32' }} /> : 
                <SouthIcon fontSize="small" sx={{ color: '#d32f2f' }} />
              }
              <Typography 
                variant="body1" 
                sx={{ 
                  ml: 0.5,
                  fontWeight: 'medium',
                  color: taxData.betterRegime === 'old' ? '#2e7d32' : '#d32f2f'
                }}
              >
                {hideBalances ? '••••' : formatCurrency(taxData.saving)}
                <span style={{ 
                  display: 'inline-block', 
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  color: 'inherit'
                }}>
                  Tax {taxData.betterRegime === 'old' ? 'Saving' : 'Increase'}
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={comparing ? null : <CompareArrowsIcon />}
              endIcon={comparing ? <CompareArrowsIcon /> : null}
              onClick={toggleComparison}
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.5)',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              {comparing ? 'Hide Comparison' : 'Compare Regimes'}
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(76, 175, 80, 0.2)' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Income
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#4caf50">
                  {hideBalances ? '••••••••' : formatCurrency(taxData.income)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(33, 150, 243, 0.2)' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Deductions
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#2196f3">
                  {hideBalances ? '••••••••' : formatCurrency(totalDeductions)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        
        {comparing && (
          <Grid item xs={12}>
            <Box sx={{ mt: 3, height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[{
                    name: 'Old Regime',
                    value: taxData.oldRegimeTax,
                    fill: '#8884d8'
                  }, {
                    name: 'New Regime',
                    value: taxData.newRegimeTax,
                    fill: '#82ca9d'
                  }]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    tickFormatter={(value) => {
                      if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                      if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
                      return `₹${value}`;
                    }}
                  />
                  <ChartTooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      padding: '10px 14px'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {[{
                      name: 'Old Regime',
                      value: taxData.oldRegimeTax,
                      fill: '#8884d8'
                    }, {
                      name: 'New Regime',
                      value: taxData.newRegimeTax,
                      fill: '#82ca9d'
                    }].map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.fill}
                        stroke="none"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );

  // 2. Tax Planning Tabs
  const renderTaxPlanningTabs = () => (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      variant="fullWidth"
      sx={styles.taxTabs}
    >
      <Tab 
        icon={<ArticleIcon />} 
        label="Income Details" 
        iconPosition="start"
      />
      <Tab 
        icon={<ReceiptLongOutlined />} 
        label="Deductions" 
        iconPosition="start"
      />
      <Tab 
        icon={<PieChartIcon />} 
        label="Tax Breakdown" 
        iconPosition="start"
      />
      <Tab 
        icon={<LightbulbIcon />} 
        label="Optimizations" 
        iconPosition="start"
      />
    </Tabs>
  );

  // 3. Income Details Tab
  const renderIncomeDetailsTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.primary.main)}>
            <BusinessOutlined />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Income Details
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Select
                value={taxRegime}
                onChange={handleTaxRegimeChange}
                variant="outlined"
                size="small"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="old">Old Regime</MenuItem>
                <MenuItem value="new">New Regime</MenuItem>
              </Select>
            }
            label="Tax Regime:"
            labelPlacement="start"
          />
        </Box>
      </Box>
      
      {/* Income from Salary */}
      <Box sx={styles.formSection}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Income from Salary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Basic Salary"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.salary.basic}
              onChange={(e) => handleIncomeChange('salary', 'basic', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="HRA"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.salary.hra}
              onChange={(e) => handleIncomeChange('salary', 'hra', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="LTA"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.salary.lta}
              onChange={(e) => handleIncomeChange('salary', 'lta', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Special Allowance"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.salary.specialAllowance}
              onChange={(e) => handleIncomeChange('salary', 'specialAllowance', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Bonus/Performance Pay"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.salary.bonus}
              onChange={(e) => handleIncomeChange('salary', 'bonus', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Other Allowances"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.salary.otherAllowances}
              onChange={(e) => handleIncomeChange('salary', 'otherAllowances', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Total Salary Income</Typography>
          <Typography variant="body1" fontWeight="medium">
            {formatCurrency(
              incomeDetails.salary.basic + 
              incomeDetails.salary.hra + 
              incomeDetails.salary.lta + 
              incomeDetails.salary.specialAllowance + 
              incomeDetails.salary.bonus + 
              incomeDetails.salary.otherAllowances
            )}
          </Typography>
        </Box>
      </Box>
      
      {/* Income from House Property */}
      <Box sx={styles.formSection}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Income from House Property
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Property Type</InputLabel>
              <Select
                value={incomeDetails.houseProp.type}
                label="Property Type"
                onChange={(e) => handleIncomeChange('houseProp', 'type', e.target.value)}
              >
                <MenuItem value="self-occupied">Self-Occupied</MenuItem>
                <MenuItem value="rented">Rented Out</MenuItem>
                <MenuItem value="deemed-let-out">Deemed Let Out</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {incomeDetails.houseProp.type === 'rented' && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Annual Rent Received"
                fullWidth
                size="small"
                type="number"
                value={incomeDetails.houseProp.rentReceived}
                onChange={(e) => handleIncomeChange('houseProp', 'rentReceived', parseFloat(e.target.value) || 0)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>
                }}
              />
            </Grid>
          )}
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Interest Paid on Housing Loan"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.houseProp.interestPaid}
              onChange={(e) => handleIncomeChange('houseProp', 'interestPaid', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Municipal Taxes Paid"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.houseProp.municipalTaxes}
              onChange={(e) => handleIncomeChange('houseProp', 'municipalTaxes', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          
          {taxRegime === 'old' && (
            <Grid item xs={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={incomeDetails.houseProp.isHraExempt}
                      onChange={(e) => handleIncomeChange('houseProp', 'isHraExempt', e.target.checked)}
                    />
                  }
                  label="Apply HRA Exemption"
                />
                {incomeDetails.houseProp.isHraExempt && (
                  <FormControl size="small" sx={{ ml: 2, minWidth: 120 }}>
                    <Select
                      value={incomeDetails.houseProp.cityType}
                      onChange={(e) => handleIncomeChange('houseProp', 'cityType', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="metro">Metro City</MenuItem>
                      <MenuItem value="non-metro">Non-Metro City</MenuItem>
                    </Select>
                    <FormHelperText>City Type</FormHelperText>
                  </FormControl>
                )}
              </FormGroup>
            </Grid>
          )}
          
          {incomeDetails.houseProp.isHraExempt && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Annual Rent Paid"
                fullWidth
                size="small"
                type="number"
                value={incomeDetails.houseProp.rentPaid}
                onChange={(e) => handleIncomeChange('houseProp', 'rentPaid', parseFloat(e.target.value) || 0)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>
                }}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      
      {/* Capital Gains */}
      <Box sx={styles.formSection}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Capital Gains
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Short Term Capital Gains"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.capitalGains.shortTerm}
              onChange={(e) => handleIncomeChange('capitalGains', 'shortTerm', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Long Term (Equity)"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.capitalGains.longTermEquity}
              onChange={(e) => handleIncomeChange('capitalGains', 'longTermEquity', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Long Term (Property/Others)"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.capitalGains.longTermProperty}
              onChange={(e) => handleIncomeChange('capitalGains', 'longTermProperty', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </Box>
      
      {/* Income from Other Sources */}
      <Box sx={styles.formSection}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Income from Other Sources
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Interest Income"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.otherSources.interest}
              onChange={(e) => handleIncomeChange('otherSources', 'interest', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dividend Income"
              fullWidth
              size="small"
              type="number"
              value={incomeDetails.otherSources.dividends}
              onChange={(e) => handleIncomeChange('otherSources', 'dividends', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </Box>
      
      {/* Calculate Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={calculating ? <RefreshIcon /> : <CalculateOutlined />}
          onClick={calculateTaxes}
          disabled={calculating}
          sx={styles.actionButton}
        >
          {calculating ? 'Calculating...' : 'Calculate Tax'}
        </Button>
      </Box>
      
      {/* Regime comparison summary */}
      <Box sx={{ mt: 3 }}>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Tax Regime Comparison
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                <Typography variant="subtitle2">Old Regime</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">Tax Amount:</Typography>
                  <Typography variant="body2" fontWeight="medium">{formatCurrency(taxData.oldRegimeTax)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Effective Rate:</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {taxData.income > 0 ? ((taxData.oldRegimeTax / taxData.income) * 100).toFixed(1) : 0}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.secondary.main, 0.1) }}>
                <Typography variant="subtitle2">New Regime</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">Tax Amount:</Typography>
                  <Typography variant="body2" fontWeight="medium">{formatCurrency(taxData.newRegimeTax)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Effective Rate:</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {taxData.income > 0 ? ((taxData.newRegimeTax / taxData.income) * 100).toFixed(1) : 0}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            borderRadius: 2, 
            bgcolor: alpha(
              taxData.betterRegime === 'old' ? theme.palette.success.main : theme.palette.error.main, 
              0.1
            ),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {taxData.betterRegime === 'old' ? (
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              ) : (
                <CheckCircleIcon color="error" sx={{ mr: 1 }} />
              )}
              <Typography fontWeight="medium">
                {taxData.betterRegime === 'old' ? 'Old Regime' : 'New Regime'} is better for you
              </Typography>
            </Box>
            <Typography fontWeight="bold">
              {formatCurrency(taxData.saving)} {taxData.betterRegime === 'old' ? 'Savings' : 'Extra'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );

  // 4. Deductions Tab
  const renderDeductionsTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.info.main)}>
            <ReceiptLongOutlined />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Tax Deductions
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="info.main">
            {hideBalances ? '••••••••' : formatCurrency(totalDeductions)}
          </Typography>
        </Box>
      </Box>
      
      <Button 
        variant="outlined" 
        color="primary" 
        startIcon={<AddIcon />}
        onClick={handleAddDeduction}
        size="small"
        sx={{ ...styles.actionButton, mb: 3 }}
      >
        Add Deduction
      </Button>
      
      {/* Deduction Categories */}
      {Object.keys(deductionCategories).map((category) => {
        const categoryTotal = deductionCategoryTotals[category] || 0;
        const categoryDeductions = filteredDeductions.filter(deduction => deduction.category === category);
        
        return categoryDeductions.length > 0 ? (
          <Box key={category} sx={{ mb: 3 }}>
            <Box sx={styles.categoryHeader(theme.palette.info.main)}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  width: 36, 
                  height: 36, 
                  mr: 1.5, 
                  bgcolor: alpha(theme.palette.info.main, 0.1), 
                  color: theme.palette.info.main 
                }}>
                  {deductionCategories[category].icon}
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium">
                  {deductionCategories[category].name}
                </Typography>
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" color="info.main">
                {hideBalances ? '••••••••' : formatCurrency(categoryTotal)}
              </Typography>
            </Box>
            
            <List sx={styles.listContainer}>
              {categoryDeductions.map((deduction) => (
                <ListItem 
                  key={deduction.id}
                  sx={styles.listItem(theme.palette.info.main)}
                >
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" fontWeight="medium">
                          {deduction.name}
                        </Typography>
                        {selectedMember === 'family' && (
                          <Tooltip title={`Claimed by ${familyMembers.find(m => m.id === deduction.owner)?.name || 'Family'}`}>
                            <Avatar 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                fontSize: '0.75rem', 
                                ml: 1,
                                bgcolor: deduction.owner === 'family' 
                                  ? alpha(theme.palette.primary.main, 0.1) 
                                  : alpha(familyMembers.find(m => m.id === deduction.owner)?.color || theme.palette.grey[500], 0.2),
                                color: deduction.owner === 'family' 
                                  ? theme.palette.primary.main 
                                  : familyMembers.find(m => m.id === deduction.owner)?.color || theme.palette.grey[700]
                              }}
                            >
                              {deduction.owner === 'family' ? 'F' : familyMembers.find(m => m.id === deduction.owner)?.name.charAt(0) || '?'}
                            </Avatar>
                          </Tooltip>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Chip 
                          size="small" 
                          label={`Section ${deduction.section}`} 
                          sx={{ 
                            mr: 1, 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontWeight: 'medium'
                          }} 
                        />
                        {deduction.proofAvailable ? (
                          <Chip 
                            size="small" 
                            label="Proof Available" 
                            color="success"
                            sx={{ 
                              height: 20,
                              fontSize: '0.7rem'
                            }} 
                          />
                        ) : (
                          <Chip 
                            size="small" 
                            label="No Proof" 
                            color="warning"
                            sx={{ 
                              height: 20,
                              fontSize: '0.7rem'
                            }} 
                          />
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="bold" color="info.main" sx={{ mr: 2 }}>
                      {hideBalances ? '••••••••' : formatCurrency(deduction.amount)}
                    </Typography>
                    <IconButton 
                      edge="end" 
                      size="small" 
                      onClick={() => handleEditDeduction(deduction)}
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
                      onClick={() => handleDeleteDeduction(deduction.id)}
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
      
      {filteredDeductions.length === 0 && (
        <Box sx={{ 
          p: 3, 
          textAlign: 'center', 
          borderRadius: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          border: `1px dashed ${theme.palette.divider}`
        }}>
          <Typography color="text.secondary">
            No deductions added yet. Click "Add Deduction" to get started.
          </Typography>
        </Box>
      )}
      
      {taxRegime === 'new' && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            Under the new tax regime, most deductions are not available. These deductions will apply only if you opt for the old tax regime.
          </Typography>
        </Alert>
      )}
    </Paper>
  );
  
  // 5. Tax Breakdown Tab
  const renderTaxBreakdownTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.warning.main)}>
            <PieChartIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Tax Breakdown
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Select
              value={taxRegime}
              onChange={handleTaxRegimeChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="old">Old Regime</MenuItem>
              <MenuItem value="new">New Regime</MenuItem>
            </Select>
          }
          label="Tax Regime:"
          labelPlacement="start"
        />
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Income Breakdown Pie Chart */}
          <Box sx={{ p: 2, mb: 3, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Income Breakdown
            </Typography>
            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Salary', value: incomeDetails.salary.basic + incomeDetails.salary.hra + incomeDetails.salary.lta + incomeDetails.salary.specialAllowance + incomeDetails.salary.bonus + incomeDetails.salary.otherAllowances, color: theme.palette.primary.main },
                      { name: 'House Property', value: incomeDetails.houseProp.type === 'rented' ? incomeDetails.houseProp.rentReceived : 0, color: theme.palette.secondary.main },
                      { name: 'Capital Gains', value: incomeDetails.capitalGains.shortTerm + incomeDetails.capitalGains.longTermEquity + incomeDetails.capitalGains.longTermProperty, color: theme.palette.success.main },
                      { name: 'Other Sources', value: incomeDetails.otherSources.interest + incomeDetails.otherSources.dividends, color: theme.palette.warning.main }
                    ].filter(item => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {
                      [
                        { name: 'Salary', value: incomeDetails.salary.basic + incomeDetails.salary.hra + incomeDetails.salary.lta + incomeDetails.salary.specialAllowance + incomeDetails.salary.bonus + incomeDetails.salary.otherAllowances, color: theme.palette.primary.main },
                        { name: 'House Property', value: incomeDetails.houseProp.type === 'rented' ? incomeDetails.houseProp.rentReceived : 0, color: theme.palette.secondary.main },
                        { name: 'Capital Gains', value: incomeDetails.capitalGains.shortTerm + incomeDetails.capitalGains.longTermEquity + incomeDetails.capitalGains.longTermProperty, color: theme.palette.success.main },
                        { name: 'Other Sources', value: incomeDetails.otherSources.interest + incomeDetails.otherSources.dividends, color: theme.palette.warning.main }
                      ].filter(item => item.value > 0).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))
                    }
                  </Pie>
                  <ChartTooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {/* Tax Rate Breakdown Bar Chart */}
          <Box sx={{ p: 2, mb: 3, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Tax Rate Breakdown
            </Typography>
            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={taxRegime === 'old' ? oldRegimeTaxBrackets : newRegimeTaxBrackets}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                  <YAxis dataKey="range" type="category" scale="band" />
                  <ChartTooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar 
                    dataKey="amount" 
                    name="Tax Amount" 
                    fill={theme.palette.primary.main}
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          {/* Tax Calculation Breakdown */}
          <Box sx={{ p: 3, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Tax Calculation Steps
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Gross Income</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
                    <Typography variant="body2">Salary Income:</Typography>
                    <Typography variant="body2">
                      {formatCurrency(
                        incomeDetails.salary.basic + 
                        incomeDetails.salary.hra + 
                        incomeDetails.salary.lta + 
                        incomeDetails.salary.specialAllowance + 
                        incomeDetails.salary.bonus + 
                        incomeDetails.salary.otherAllowances
                      )}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
                    <Typography variant="body2">House Property:</Typography>
                    <Typography variant="body2">
                      {formatCurrency(incomeDetails.houseProp.type === 'rented' ? incomeDetails.houseProp.rentReceived : 0)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
                    <Typography variant="body2">Capital Gains:</Typography>
                    <Typography variant="body2">
                      {formatCurrency(
                        incomeDetails.capitalGains.shortTerm + 
                        incomeDetails.capitalGains.longTermEquity + 
                        incomeDetails.capitalGains.longTermProperty
                      )}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
                    <Typography variant="body2">Other Sources:</Typography>
                    <Typography variant="body2">
                      {formatCurrency(
                        incomeDetails.otherSources.interest + 
                        incomeDetails.otherSources.dividends
                      )}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="medium">Total Gross Income:</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {formatCurrency(taxData.income)}
                    </Typography>
                  </Box>
                </Box>
                
                {taxRegime === 'old' && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Deductions & Exemptions</Typography>
                    
                    {Object.keys(deductionCategories).map(category => {
                      const categoryTotal = deductionCategoryTotals[category] || 0;
                      return categoryTotal > 0 ? (
                        <Box key={category} sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
                          <Typography variant="body2">{deductionCategories[category].name}:</Typography>
                          <Typography variant="body2">
                            -{formatCurrency(categoryTotal)}
                          </Typography>
                        </Box>
                      ) : null;
                    })}
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">Total Deductions:</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        -{formatCurrency(totalDeductions)}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Taxable Income & Tax Calculation</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="medium">Taxable Income:</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {formatCurrency(taxRegime === 'old' ? taxData.income - totalDeductions : taxData.income)}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  {/* Tax Slabs */}
                  <Typography variant="body2" gutterBottom>Tax Calculation:</Typography>
                  
                  {(taxRegime === 'old' ? oldRegimeTaxBrackets : newRegimeTaxBrackets)
                    .filter(bracket => bracket.amount > 0)
                    .map((bracket, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
                        <Typography variant="body2">
                          {bracket.range} @ {bracket.rate}%:
                        </Typography>
                        <Typography variant="body2">
                          {formatCurrency(bracket.amount)}
                        </Typography>
                      </Box>
                    ))
                  }
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 2, mt: 1 }}>
                    <Typography variant="body2">Cess @ 4%:</Typography>
                    <Typography variant="body2">
                      {formatCurrency(
                        (taxRegime === 'old' ? taxData.oldRegimeTax : taxData.newRegimeTax) * 0.04 / 1.04
                      )}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="bold">Total Tax Liability:</Typography>
                    <Typography variant="body2" fontWeight="bold" color={taxRegime === 'old' ? 'primary.main' : 'secondary.main'}>
                      {formatCurrency(taxRegime === 'old' ? taxData.oldRegimeTax : taxData.newRegimeTax)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2">Effective Tax Rate:</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {((taxRegime === 'old' ? taxData.oldRegimeTax : taxData.newRegimeTax) / taxData.income * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
  
  // 6. Optimizations Tab
  const renderOptimizationsTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.success.main)}>
            <LightbulbIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Tax Optimization Strategies
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            color="success" 
            startIcon={<CalculateOutlined />}
            size="small"
            sx={styles.actionButton}
            onClick={calculateTaxes}
          >
            Recalculate
          </Button>
        </Box>
      </Box>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Below are personalized tax saving recommendations based on your income and tax profile. Implementing these strategies could help reduce your tax burden.
        </Typography>
      </Alert>
      
      {/* Recommended optimizations */}
      <Typography variant="subtitle1" gutterBottom>
        Recommended Strategies
      </Typography>
      
      <Grid container spacing={2}>
        {optimizationStrategies.map((strategy) => (
          <Grid item xs={12} key={strategy.id}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2,
                borderColor: strategy.implemented ? alpha(theme.palette.success.main, 0.3) : undefined,
                bgcolor: strategy.implemented ? alpha(theme.palette.success.main, 0.05) : undefined
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={strategy.implemented}
                      onChange={() => handleOptimizationToggle(strategy.id)}
                      color="success"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="subtitle1">{strategy.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {strategy.description}
                      </Typography>
                    </Box>
                  }
                  sx={{ flexGrow: 1 }}
                />
                <Box sx={{ ml: 2, textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">Potential Savings</Typography>
                  <Typography variant="subtitle1" color="success.main">
                    {formatCurrency(strategy.potentialSavings)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Potential Savings Summary */}
      <Box sx={{ mt: 3, p: 3, borderRadius: 2, bgcolor: alpha(theme.palette.success.light, 0.1) }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Typography variant="h6" gutterBottom color="success.main">
              Total Potential Tax Savings
            </Typography>
            <Typography variant="body2">
              Implementing the unchecked strategies above can help you save up to:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {formatCurrency(optimizationStrategies.filter(s => !s.implemented).reduce((sum, s) => sum + s.potentialSavings, 0))}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      
      {/* Optimization tips */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Additional Tax Planning Tips
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <HomeIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle2" gutterBottom>Home Loan Benefits</Typography>
                <Typography variant="body2">
                  Principal repayment qualifies for deduction under Section 80C, while interest is deductible under Section 24(b).
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <LocalHospitalOutlined color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle2" gutterBottom>Health Insurance</Typography>
                <Typography variant="body2">
                  Premium paid for self, family, and parents qualifies for deduction under Section 80D.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <SchoolIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle2" gutterBottom>Education Loan</Typography>
                <Typography variant="body2">
                  Interest paid on education loan is deductible under Section 80E with no upper limit.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <SavingsIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle2" gutterBottom>NPS Investment</Typography>
                <Typography variant="body2">
                  Additional deduction of ₹50,000 under Section 80CCD(1B) beyond the 80C limit of ₹1.5 lakhs.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
  
  // 7. Add/Edit Deduction Dialog
  const renderDeductionDialog = () => (
    <Dialog 
      open={dialogOpen} 
      onClose={handleDialogClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        {dialogMode === 'add' 
          ? 'Add Tax Deduction' 
          : 'Edit Tax Deduction'
        }
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Deduction Name"
                fullWidth
                value={currentDeduction.name}
                onChange={handleInputChange}
                required
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
                value={currentDeduction.amount}
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
                  value={currentDeduction.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  {Object.entries(deductionCategories)
                    .map(([key, { name }]) => (
                      <MenuItem key={key} value={key}>{name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="section"
                label="Section"
                fullWidth
                value={currentDeduction.section}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel id="owner-label">Owner</InputLabel>
                <Select
                  labelId="owner-label"
                  name="owner"
                  value={currentDeduction.owner}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currentDeduction.proofAvailable}
                    onChange={(e) => handleCheckboxChange(e)}
                    name="proofAvailable"
                  />
                }
                label="Proof Available"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="notes"
                label="Notes"
                multiline
                rows={2}
                fullWidth
                value={currentDeduction.notes}
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
          onClick={handleSaveDeduction} 
          variant="contained"
          color="primary"
          disabled={!currentDeduction.name || !currentDeduction.amount || !currentDeduction.section}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  // ============================================================
  // MAIN RENDER - The tax planning layout
  // ============================================================
  return (
    <Box sx={styles.pageContainer}>
      {/* Summary Header */}
      {renderSummaryHeader()}

      {/* Tabs */}
      {renderTaxPlanningTabs()}
      
      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && renderIncomeDetailsTab()}
        {currentTab === 1 && renderDeductionsTab()}
        {currentTab === 2 && renderTaxBreakdownTab()}
        {currentTab === 3 && renderOptimizationsTab()}
      </Box>
      
      {/* Add/Edit Deduction Dialog */}
      {renderDeductionDialog()}
    </Box>
  );
};

export default TaxPlanning;