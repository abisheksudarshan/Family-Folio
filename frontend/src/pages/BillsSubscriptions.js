// src/pages/BillsSubscriptions.js
// This component displays a comprehensive dashboard for managing family bills and subscriptions
// It includes summary cards, visualization charts, data tables, and a calendar view

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  CircularProgress,
  useTheme,
  alpha,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Menu
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FlightIcon from '@mui/icons-material/Flight';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const BillsSubscriptions = () => {
  const theme = useTheme();
  
  //===================================
  // DATA CONFIGURATION
  //===================================
  
  // Family members data
  const familyMembers = [
    { id: 'family', name: 'All Family', avatar: <GroupsIcon />, color: theme.palette.primary.main },
    { id: 'parent1', name: 'Raj', avatar: '👨', color: '#1976d2' },
    { id: 'parent2', name: 'Meera', avatar: '👩', color: '#9c27b0' },
    { id: 'child1', name: 'Arjun', avatar: '👦', color: '#2e7d32' },
    { id: 'child2', name: 'Anjali', avatar: '👧', color: '#d32f2f' }
  ];
  
  // Categories with their icons and colors
  const billCategories = {
    utilities: { name: 'Utilities', icon: <ElectricBoltIcon />, color: '#9c27b0' },
    entertainment: { name: 'Entertainment', icon: <TheaterComedyIcon />, color: theme.palette.info.main },
    housing: { name: 'Housing', icon: <HomeIcon />, color: theme.palette.primary.main },
    transportation: { name: 'Transportation', icon: <DirectionsCarIcon />, color: theme.palette.secondary.main },
    insurance: { name: 'Insurance', icon: <ReceiptIcon />, color: theme.palette.error.main },
    health: { name: 'Health', icon: <LocalHospitalIcon />, color: theme.palette.warning.main },
    education: { name: 'Education', icon: <DescriptionIcon />, color: '#607d8b' },
    shopping: { name: 'Shopping', icon: <ShoppingCartIcon />, color: theme.palette.error.main },
    food: { name: 'Food', icon: <RestaurantIcon />, color: theme.palette.success.main },
    travel: { name: 'Travel', icon: <FlightIcon />, color: '#ff9800' },
    other: { name: 'Other', icon: <ReceiptIcon />, color: '#607d8b' }
  };
  
  // Payment methods with their icons and colors
  const paymentMethods = {
    'UPI': { icon: <PaymentIcon />, color: '#4caf50' },
    'Amex Platinum': { icon: <CreditCardIcon />, color: '#212121' },
    'HDFC Infinia': { icon: <CreditCardIcon />, color: '#1976d2' },
    'Axis Select': { icon: <CreditCardIcon />, color: '#7b1fa2' },
    'Axis Neo': { icon: <CreditCardIcon />, color: '#ffc107' },
    'Amex MRCC': { icon: <CreditCardIcon />, color: '#d32f2f' },
    'HDFC Swiggy': { icon: <CreditCardIcon />, color: '#ff9800' }
  };

  // Month options for date selection
  const months = [
    { long: 'January', short: 'Jan' },
    { long: 'February', short: 'Feb' },
    { long: 'March', short: 'Mar' },
    { long: 'April', short: 'Apr' },
    { long: 'May', short: 'May' },
    { long: 'June', short: 'Jun' },
    { long: 'July', short: 'Jul' },
    { long: 'August', short: 'Aug' },
    { long: 'September', short: 'Sep' },
    { long: 'October', short: 'Oct' },
    { long: 'November', short: 'Nov' },
    { long: 'December', short: 'Dec' }
  ];

  //===================================
  // STATE MANAGEMENT
  //===================================
  
  // Data state
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // UI state
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedMember, setSelectedMember] = useState('family');
  const [activeTab, setActiveTab] = useState(0);
  
  // Dialog state for adding/editing bills
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  
  // Time period selection state
  const [selectedPeriod, setSelectedPeriod] = useState({
    type: 'month',
    month: 'Mar',
    year: 2025
  });
  const [periodMenuAnchor, setPeriodMenuAnchor] = useState(null);
  const [showFullYear, setShowFullYear] = useState(false);
  
  // New bill item state
  const [newBillItem, setNewBillItem] = useState({
    name: '',
    amount: '',
    dueDate: '',
    frequency: 'monthly',
    category: '',
    fundingInstrument: '',
    notes: '',
    owner: 'family'
  });

  //===================================
  // DATE CALCULATIONS
  //===================================
  
  // Current date information
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const currentDay = currentDate.getDate();
  
  //===================================
  // DATA INITIALIZATION & EFFECTS
  //===================================
  
  // Generate dummy bills data for the application
  const generateDummyData = () => {
    // Helper function to generate a random date within next 60 days
    const getRandomDueDate = (maxDaysAhead = 60) => {
      const today = new Date();
      const daysToAdd = Math.floor(Math.random() * maxDaysAhead) + 1;
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + daysToAdd);
      return dueDate.toISOString().split('T')[0];
    };
    
    // Helper function to generate a random date in current month
    const getRandomDateInCurrentMonth = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const randomDate = new Date(year, month, day);
      return randomDate.toISOString().split('T')[0];
    };
    
    // Function to get a random element from an array
    const getRandomElement = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };
    
    // Sample bills data - 30 different bills with various categories and properties
    const sampleBills = [
      {
        id: 1,
        name: 'Netflix',
        amount: 649,
        dueDate: '2025-04-15',
        frequency: 'monthly',
        category: 'entertainment',
        fundingInstrument: 'HDFC Infinia',
        notes: 'Premium plan',
        owner: 'family'
      },
      // More sample bills are defined here
      // For brevity, the full list isn't included in this snippet
      {
        id: 30,
        name: 'Dental Insurance',
        amount: 6400,
        dueDate: getRandomDateInCurrentMonth(),
        frequency: 'annual',
        category: 'health',
        fundingInstrument: 'Amex Platinum',
        notes: 'Family Coverage',
        owner: 'parent2'
      }
    ];
    
    return sampleBills;
  };

  // Initialize bills data on component mount
  useEffect(() => {
    // Generate and use dummy data
    const dummyBills = generateDummyData();
    setBills(dummyBills);
    localStorage.setItem('bills', JSON.stringify(dummyBills));
  }, []);

  // Save bills to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
  }, [bills]);
  
  // Simulate data loading when member or period changes
  useEffect(() => {
    if (selectedMember || selectedPeriod) {
      setLoading(true);
      // Simulate API call with a timeout
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedMember, selectedPeriod]);

  //===================================
  // DATA FILTERING FUNCTIONS
  //===================================
  
  // Get bills filtered by selected member and time period
  const getFilteredBills = () => {
    // First filter by member
    let filteredByMember = selectedMember === 'family' 
      ? bills 
      : bills.filter(bill => bill.owner === selectedMember || bill.owner === 'family');

    // Then filter by period
    if (!showFullYear) {
      // Get month index (0-11) from selected month short name
      const monthIndex = months.findIndex(m => m.short === selectedPeriod.month);
      
      // Filter by month and year
      filteredByMember = filteredByMember.filter(bill => {
        const dueDate = new Date(bill.dueDate);
        return dueDate.getMonth() === monthIndex && dueDate.getFullYear() === selectedPeriod.year;
      });
    } else {
      // When showing full year, filter by year only
      filteredByMember = filteredByMember.filter(bill => {
        const dueDate = new Date(bill.dueDate);
        return dueDate.getFullYear() === selectedPeriod.year;
      });
    }
    
    return filteredByMember;
  };

  // Calculate filtered bills based on current filters
  const filteredBills = getFilteredBills();

  // Get upcoming bills (due after current date) based on filters
  const getUpcomingBills = () => {
    const today = new Date();
    
    // Return bills that are due after today within the selected period
    return filteredBills.filter(bill => {
      const dueDate = new Date(bill.dueDate);
      return dueDate >= today;
    });
  };

  // Get upcoming bills
  const upcomingBills = getUpcomingBills();

  // Filter bills based on category tab selection
  const getTabFilteredBills = () => {
    // Filter by tab category
    switch (activeTab) {
      case 0: // All
        return filteredBills;
      case 1: // Monthly
        return filteredBills.filter(b => b.frequency === 'monthly');
      case 2: // Annual
        return filteredBills.filter(b => b.frequency === 'annual');
      case 3: // Quarterly
        return filteredBills.filter(b => b.frequency === 'quarterly' || b.frequency === 'biannual');
      case 4: // Utilities
        return filteredBills.filter(b => b.category === 'utilities');
      case 5: // Entertainment
        return filteredBills.filter(b => b.category === 'entertainment');
      default:
        return filteredBills;
    }
  };

  //===================================
  // DATA CALCULATIONS
  //===================================
  
  // Calculate monthly equivalent amount based on bill frequency
  const calculateMonthlyEquivalent = (bill) => {
    switch (bill.frequency) {
      case 'weekly':
        return bill.amount * 4.33; // Average weeks in a month
      case 'biweekly':
        return bill.amount * 2.17; // Average bi-weeks in a month
      case 'monthly':
        return bill.amount;
      case 'quarterly':
        return bill.amount / 3;
      case 'biannual':
        return bill.amount / 6;
      case 'annual':
        return bill.amount / 12;
      default:
        return bill.amount;
    }
  };

  // Calculate total monthly expense for filtered bills
  const totalMonthlyBills = filteredBills.reduce((sum, bill) => sum + calculateMonthlyEquivalent(bill), 0);

  // Calculate bills by category for charts
  const billsByCategory = Object.keys(billCategories).map(category => {
    const categoryBills = filteredBills.filter(bill => bill.category === category);
    const totalAmount = categoryBills.reduce((sum, bill) => sum + calculateMonthlyEquivalent(bill), 0);
    return {
      name: billCategories[category].name,
      value: totalAmount,
      color: billCategories[category].color,
      count: categoryBills.length
    };
  }).filter(category => category.value > 0).sort((a, b) => b.value - a.value);

  // Calculate bills by payment method
  const billsByPaymentMethod = Object.keys(paymentMethods).map(method => ({
    name: method,
    count: filteredBills.filter(bill => bill.fundingInstrument === method).length,
    total: filteredBills.filter(bill => bill.fundingInstrument === method)
      .reduce((sum, bill) => sum + calculateMonthlyEquivalent(bill), 0)
  })).filter(item => item.count > 0);

  // Calculate bills by family member
  const billsByFamilyMember = familyMembers.map(member => {
    const memberBills = bills.filter(bill => bill.owner === member.id);
    const totalAmount = memberBills.reduce((sum, bill) => sum + calculateMonthlyEquivalent(bill), 0);
    return {
      name: member.name,
      id: member.id,
      value: totalAmount,
      color: member.color,
      count: memberBills.length,
      avatar: member.avatar
    };
  }).filter(member => member.count > 0 || member.id === 'family');

  //===================================
  // FORMATTING FUNCTIONS
  //===================================
  
  // Get display text for selected period
  const getSelectedPeriodText = () => {
    if (showFullYear) {
      return `Full Year ${selectedPeriod.year}`;
    } else {
      return `${selectedPeriod.month}-${selectedPeriod.year.toString().slice(-2)}`;
    }
  };

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format date strings
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format percentage values
  const formatPercentage = (value, plusSign = false) => {
    return `${plusSign && value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  //===================================
  // EVENT HANDLERS
  //===================================
  
  // Period selection handlers
  const handleOpenPeriodMenu = (event) => {
    setPeriodMenuAnchor(event.currentTarget);
  };
  
  const handleClosePeriodMenu = () => {
    setPeriodMenuAnchor(null);
  };
  
  const handlePeriodSelect = (month, year) => {
    setSelectedPeriod({
      type: 'month',
      month,
      year
    });
    setShowFullYear(false);
    handleClosePeriodMenu();
  };
  
  const handleFullYearSelect = () => {
    setShowFullYear(true);
    handleClosePeriodMenu();
  };
  
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
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handlers for bill item CRUD operations
  const handleAddItem = () => {
    setNewBillItem({
      name: '',
      amount: '',
      dueDate: '',
      frequency: 'monthly',
      category: '',
      fundingInstrument: '',
      notes: '',
      owner: selectedMember === 'family' ? 'family' : selectedMember
    });
    setOpenAddDialog(true);
  };
  
  const handleEditItem = (id) => {
    const item = bills.find(item => item.id === id);
    if (item) {
      setNewBillItem({
        name: item.name,
        amount: item.amount.toString(),
        dueDate: item.dueDate,
        frequency: item.frequency,
        category: item.category,
        fundingInstrument: item.fundingInstrument,
        notes: item.notes || '',
        owner: item.owner || 'family'
      });
      setEditItemId(id);
      setOpenEditDialog(true);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBillItem({
      ...newBillItem,
      [name]: value
    });
  };
  
  const handleSaveItem = () => {
    if (openAddDialog) {
      // Add new bill
      const newBill = {
        id: Date.now(),
        ...newBillItem,
        amount: parseFloat(newBillItem.amount)
      };
      setBills([...bills, newBill]);
    } else if (openEditDialog) {
      // Update existing bill
      const updatedBills = bills.map(bill => {
        if (bill.id === editItemId) {
          return {
            ...bill,
            ...newBillItem,
            amount: parseFloat(newBillItem.amount)
          };
        }
        return bill;
      });
      setBills(updatedBills);
    }
    
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setEditItemId(null);
  };
  
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setBills(bills.filter(bill => bill.id !== id));
    }
  };

  //===================================
  // CUSTOM COMPONENTS
  //===================================
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{label || payload[0].name}</Typography>
          {payload.map((entry, index) => (
            <Box key={`tooltip-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color || entry.fill,
                  marginRight: 1,
                  borderRadius: '50%'
                }}
              />
              <Typography variant="body2" sx={{ mr: 2 }}>
                {entry.name}:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {typeof entry.value === 'number' ? formatCurrency(entry.value) : entry.value}
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  //===================================
  // RENDER COMPONENT
  //===================================
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Banner with title and period/member selection */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
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
        
        {/* Title and Period Filter Bar */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 5 }}>
          <Typography variant="h4" fontWeight="bold" component="h1">
            Bills & Subscriptions
          </Typography>

          {/* Period Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<CalendarTodayIcon />}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleOpenPeriodMenu}
              sx={{ 
                color: 'white', 
                bgcolor: 'rgba(255,255,255,0.15)',
                borderColor: 'rgba(255,255,255,0.3)',
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.25)',
                }
              }}
            >
              {getSelectedPeriodText()}
            </Button>
            
            <IconButton 
              sx={{ ml: 2, color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
              onClick={toggleBalancesVisibility}
              size="small"
            >
              {hideBalances ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            
            <Menu
              anchorEl={periodMenuAnchor}
              open={Boolean(periodMenuAnchor)}
              onClose={handleClosePeriodMenu}
              PaperProps={{
                sx: {
                  mt: 1,
                  maxHeight: 400,
                  width: 200,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <MenuItem onClick={handleFullYearSelect}>
                <DateRangeIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography>Full Year {currentYear}</Typography>
              </MenuItem>
              <Divider />
              {months.map(month => (
                <MenuItem 
                  key={month.short} 
                  onClick={() => handlePeriodSelect(month.short, currentYear)}
                  sx={{ 
                    bgcolor: month.short === selectedPeriod.month && !showFullYear ? alpha(theme.palette.primary.light, 0.1) : 'inherit',
                    '&:hover': {
                      bgcolor: month.short === selectedPeriod.month && !showFullYear ? alpha(theme.palette.primary.light, 0.2) : alpha(theme.palette.action.hover, 0.1)
                    }
                  }}
                >
                  <CalendarTodayIcon sx={{ mr: 1, fontSize: 18, opacity: 0.7 }} />
                  <Typography>{month.short}-{currentYear.toString().slice(-2)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        
        {/* Member Selection */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
          <Tabs
            value={selectedMember}
            onChange={handleMemberChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{
              style: { background: 'rgba(255, 255, 255, 0.8)' }
            }}
            sx={{
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
            }}
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
              <Typography variant="h5" fontWeight="bold" component="div">
                {selectedMember === 'family' ? 'Family Bills & Subscriptions' : `${familyMembers.find(m => m.id === selectedMember)?.name}'s Bills`}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
                {hideBalances ? '••••••••' : formatCurrency(totalMonthlyBills)}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                per month
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
                <EventIcon fontSize="small" sx={{ color: '#2e7d32' }} />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    ml: 0.5,
                    fontWeight: 'medium',
                    color: '#2e7d32'
                  }}
                >
                  {upcomingBills.length > 0 
                    ? `Next due: ${formatDate(upcomingBills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0].dueDate)}` 
                    : 'No upcoming bills'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
              {!showFullYear && (
                <Typography variant="h6" fontWeight="medium" sx={{ mr: 2 }}>
                  Day {currentDay} of {daysInMonth}
                </Typography>
              )}
              <Chip 
                size="medium"
                label={showFullYear 
                  ? `${currentMonth} ${currentYear}`
                  : `${Math.floor(daysInMonth - currentDay)} days left`
                }
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
              />
            </Box>
            
            <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 1, textAlign: 'right' }}>
              Upcoming Bills
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ flex: 1, height: 10, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 5, mr: 2 }}>
                <Box 
                  sx={{
                    height: '100%',
                    width: `${Math.min((upcomingBills.length / filteredBills.length) * 100, 100)}%`,
                    bgcolor: upcomingBills.length > 3 ? '#ff9800' : '#4caf50',
                    borderRadius: 5
                  }}
                />
              </Box>
              <Typography variant="body1" fontWeight="bold">
                {upcomingBills.length} / {filteredBills.length}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'medium' }}>
                {currentMonth} {currentYear}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Summary Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Bills/Subscriptions Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
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
                    <ReceiptIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    {showFullYear ? 'Yearly Bills' : 'Monthly Bills'}
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {hideBalances ? '••••••••' : formatCurrency(totalMonthlyBills)}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                {filteredBills.length} Bills for {getSelectedPeriodText()}
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label={`${filteredBills.length} Bills`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 'medium'
                  }} 
                />
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
                  {formatPercentage(2.2, true)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Due Bills Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
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
                backgroundColor: alpha(theme.palette.warning.main, 0.15)
              }} 
            />
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
                    Due This {showFullYear ? 'Year' : 'Month'}
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {upcomingBills.length}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                After {formatDate(new Date())}
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label={upcomingBills.length > 0 ? `Next: ${formatDate(upcomingBills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0].dueDate)}` : 'No upcoming bills'} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    fontWeight: 'medium',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Categories Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
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
                    <CategoryIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Categories
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {billsByCategory.length}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Active Categories
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label={`Top: ${billsByCategory[0]?.name || 'None'}`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    fontWeight: 'medium'
                  }} 
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontWeight: 'medium'
                  }}
                >
                  {billsByCategory[0]?.count || 0} Bills
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Payment Methods Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
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
                    <PaymentIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Payment Methods
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {billsByPaymentMethod.length}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Active Methods
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label={`Most Used: ${billsByPaymentMethod.sort((a, b) => b.count - a.count)[0]?.name || 'None'}`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    fontWeight: 'medium',
                    maxWidth: '70%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }} 
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontWeight: 'medium'
                  }}
                >
                  {billsByPaymentMethod.sort((a, b) => b.count - a.count)[0]?.count || 0} Bills
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Bills Dashboard & Chart */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Left Panel - Bar Chart View */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="medium">Bills Analysis</Typography>
              {/* Note: Timeline view and chart type toggle buttons have been removed */}
            </Box>
            
            <Box sx={{ height: 350, width: '100%' }}>
              {/* Distribution Bar Chart - Only chart view now */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={billsByCategory}
                  margin={{ top: 10, right: 10, left: 10, bottom: 60 }} // Increased bottom margin for labels
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={50} // Increased height for labels
                    tickMargin={10} // Added margin between labels and axis
                  />
                  <YAxis 
                    tickFormatter={(value) => value === 0 ? '0' : `₹${Math.floor(value / 1000)}k`}
                  />
                  <RechartsTooltip 
                    formatter={(value) => [formatCurrency(value), 'Amount']}
                    labelFormatter={(value) => `Category: ${value}`}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar 
                    dataKey="value" 
                    name="Monthly Amount" 
                    radius={[4, 4, 0, 0]}
                  >
                    {billsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Right Panel - Bills Summary */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="medium">Bills Summary</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                onClick={handleAddItem}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Add Bill
              </Button>
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
                  mx: 0.5,
                  textTransform: 'none'
                },
                '& .Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
              TabIndicatorProps={{
                style: { display: 'none' }
              }}
            >
              <Tab label="All Bills" />
              <Tab label="Monthly" />
              <Tab label="Annual" />
              <Tab label="Quarterly" />
              <Tab label="Utilities" />
              <Tab label="Entertainment" />
            </Tabs>
            
            <List sx={{ 
              maxHeight: 310, 
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: alpha(theme.palette.primary.main, 0.05),
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: alpha(theme.palette.primary.main, 0.2),
                borderRadius: '10px',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.3),
                },
              },
            }}>
              {getTabFilteredBills().length > 0 ? (
                getTabFilteredBills().map((bill) => (
                  <ListItem
                    key={bill.id}
                    secondaryAction={
                      <Box>
                        <IconButton 
                          edge="end" 
                          size="small"
                          onClick={() => handleEditItem(bill.id)}
                          sx={{ mr: 0.5 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          size="small"
                          onClick={() => handleDeleteItem(bill.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                    sx={{ 
                      mb: 1, 
                      p: 1.5, 
                      bgcolor: alpha(theme.palette.background.paper, 0.7),
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.divider, 0.1),
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 45 }}>
                      <Avatar sx={{ 
                        bgcolor: alpha(billCategories[bill.category]?.color || theme.palette.grey[500], 0.1),
                        color: billCategories[bill.category]?.color || theme.palette.grey[700]
                      }}>
                        {billCategories[bill.category]?.icon || <ReceiptIcon />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="medium">
                            {bill.name}
                          </Typography>
                          {bill.owner !== selectedMember && bill.owner !== 'family' && selectedMember === 'family' && (
                            <Tooltip title={`Owned by ${familyMembers.find(m => m.id === bill.owner)?.name || 'Family'}`}>
                              <Avatar 
                                sx={{ 
                                  width: 20, 
                                  height: 20, 
                                  fontSize: '0.75rem', 
                                  ml: 1,
                                  bgcolor: alpha(familyMembers.find(m => m.id === bill.owner)?.color || theme.palette.grey[500], 0.2),
                                  color: familyMembers.find(m => m.id === bill.owner)?.color || theme.palette.grey[700]
                                }}
                              >
                                {familyMembers.find(m => m.id === bill.owner)?.name.charAt(0) || 'F'}
                              </Avatar>
                            </Tooltip>
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography 
                              variant="body2" 
                              color={hideBalances ? 'text.secondary' : 'text.primary'}
                              fontWeight="medium"
                              sx={{ mr: 1 }}
                            >
                              {hideBalances ? '••••••••' : formatCurrency(bill.amount)}
                            </Typography>
                            <Chip 
                              label={bill.frequency.charAt(0).toUpperCase() + bill.frequency.slice(1)} 
                              size="small"
                              sx={{ 
                                height: 20,
                                fontSize: '0.7rem',
                                bgcolor: alpha(theme.palette.info.main, 0.1),
                                color: theme.palette.info.main,
                                mr: 1
                              }}
                            />
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              py: 0.25,
                              px: 0.75, 
                              borderRadius: 1,
                              bgcolor: alpha(paymentMethods[bill.fundingInstrument]?.color || theme.palette.grey[500], 0.1),
                              fontSize: '0.75rem',
                              color: paymentMethods[bill.fundingInstrument]?.color || theme.palette.grey[700],
                            }}>
                              {paymentMethods[bill.fundingInstrument]?.icon || <PaymentIcon fontSize="small" />}
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  ml: 0.5,
                                  fontWeight: 'medium'
                                }}
                              >
                                {bill.fundingInstrument}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <EventIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5, fontSize: '0.9rem' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                              Due: {formatDate(bill.dueDate)}
                            </Typography>
                            
                            {/* Show warning icon if due within 3 days */}
                            {(() => {
                              const dueDate = new Date(bill.dueDate);
                              const today = new Date();
                              const diffTime = dueDate - today;
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              
                              if (diffDays >= 0 && diffDays <= 3) {
                                return (
                                  <Tooltip title="Due soon">
                                    <WarningIcon fontSize="small" sx={{ color: theme.palette.warning.main, fontSize: '0.9rem' }} />
                                  </Tooltip>
                                );
                              } else if (diffDays < 0) {
                                return (
                                  <Tooltip title="Overdue">
                                    <WarningIcon fontSize="small" sx={{ color: theme.palette.error.main, fontSize: '0.9rem' }} />
                                  </Tooltip>
                                );
                              } else {
                                return (
                                  <Tooltip title="On track">
                                    <CheckCircleIcon fontSize="small" sx={{ color: theme.palette.success.main, fontSize: '0.9rem' }} />
                                  </Tooltip>
                                );
                              }
                            })()}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No bills found in this category.
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Bills By Categories Table Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="medium">Bills by Category</Typography>
          <Box>
            <ButtonGroup variant="outlined" size="small">
              <Button
                startIcon={<CalendarViewMonthIcon />}
                sx={{ borderRadius: '8px 0 0 8px' }}
              >
                Month
              </Button>
              <Button
                startIcon={<BarChartIcon />}
                sx={{ borderRadius: '0 8px 8px 0' }}
              >
                Year
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                '& th': { 
                  fontWeight: 'bold', 
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                }
              }}>
                <TableCell>Category</TableCell>
                <TableCell align="right">Bills Count</TableCell>
                <TableCell align="right">Monthly Amount</TableCell>
                <TableCell align="right">% of Total</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billsByCategory.map((category) => (
                <TableRow 
                  key={category.name}
                  sx={{ 
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(category.color, 0.1),
                          color: category.color,
                          width: 32,
                          height: 32,
                          mr: 1.5
                        }}
                      >
                        {billCategories[Object.keys(billCategories).find(key => billCategories[key].name === category.name)]?.icon}
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {category.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      {category.count}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      {hideBalances ? '••••••••' : formatCurrency(category.value)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Box 
                        sx={{ 
                          width: 40, 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: alpha(category.color, 0.2),
                          mr: 1.5,
                          position: 'relative'
                        }}
                      >
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${(category.value / totalMonthlyBills) * 100}%`,
                            bgcolor: category.color,
                            borderRadius: 4
                          }}
                        />
                      </Box>
                      <Typography variant="body2">
                        {((category.value / totalMonthlyBills) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={
                        category.count === 0 
                          ? "Inactive" 
                          : category.value > 5000 
                            ? "High Spend" 
                            : "Active"
                      } 
                      size="small"
                      color={
                        category.count === 0 
                          ? "default" 
                          : category.value > 5000 
                            ? "warning" 
                            : "success"
                      }
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Total Row */}
              <TableRow sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '& td': { fontWeight: 'bold' }
              }}>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {filteredBills.length}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {hideBalances ? '••••••••' : formatCurrency(totalMonthlyBills)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    100%
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  -
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Bills By Payment Method Table */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="medium">Bills by Payment Method</Typography>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            size="small"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Manage Methods
          </Button>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                '& th': { 
                  fontWeight: 'bold', 
                  bgcolor: alpha(theme.palette.secondary.main, 0.05)
                }
              }}>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Bills Count</TableCell>
                <TableCell align="right">Monthly Amount</TableCell>
                <TableCell align="right">% of Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billsByPaymentMethod.map((method) => (
                <TableRow 
                  key={method.name}
                  sx={{ 
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(paymentMethods[method.name]?.color || theme.palette.grey[500], 0.1),
                          color: paymentMethods[method.name]?.color || theme.palette.grey[700],
                          width: 32,
                          height: 32,
                          mr: 1.5
                        }}
                      >
                        {paymentMethods[method.name]?.icon || <PaymentIcon />}
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {method.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      {method.count}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      {hideBalances ? '••••••••' : formatCurrency(method.total)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Box 
                        sx={{ 
                          width: 40, 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: alpha(paymentMethods[method.name]?.color || theme.palette.grey[500], 0.2),
                          mr: 1.5,
                          position: 'relative'
                        }}
                      >
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${(method.total / totalMonthlyBills) * 100}%`,
                            bgcolor: paymentMethods[method.name]?.color || theme.palette.grey[500],
                            borderRadius: 4
                          }}
                        />
                      </Box>
                      <Typography variant="body2">
                        {((method.total / totalMonthlyBills) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Total Row */}
              <TableRow sx={{ 
                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                '& td': { fontWeight: 'bold' }
              }}>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {filteredBills.length}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {hideBalances ? '••••••••' : formatCurrency(totalMonthlyBills)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    100%
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Bills Calendar View Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="medium">
            Due Dates Calendar - {showFullYear ? currentMonth : months.find(m => m.short === selectedPeriod.month)?.long} {selectedPeriod.year}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<NotificationsIcon />}
            size="small"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Set Reminders
          </Button>
        </Box>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Grid item xs={12/7} key={day}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 1, 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 1,
                fontWeight: 'bold'
              }}>
                {day}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Grid container spacing={1}>
          {(() => {
            const days = [];
            
            // Get the selected month index and year
            const selectedMonthIndex = months.findIndex(m => m.short === selectedPeriod.month);
            const calendarYear = selectedPeriod.year;
            
            // Calculate days in the selected month
            const selectedMonthDaysInMonth = new Date(calendarYear, selectedMonthIndex + 1, 0).getDate();
            
            // Get the first day of the selected month
            const firstDay = new Date(calendarYear, selectedMonthIndex, 1).getDay();
            
            // Add empty cells for days before the first day of month
            for (let i = 0; i < firstDay; i++) {
              days.push(
                <Grid item xs={12/7} key={`empty-${i}`}>
                  <Box sx={{ 
                    height: 80,
                    p: 1, 
                    bgcolor: alpha(theme.palette.divider, 0.05),
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}></Box>
                </Grid>
              );
            }
            
            // Add cells for each day of the month
            for (let i = 1; i <= selectedMonthDaysInMonth; i++) {
              const date = new Date(calendarYear, selectedMonthIndex, i);
              const dayOfWeek = date.getDay();
              
              // Check if this date is today
              const isToday = i === currentDay && 
                             selectedMonthIndex === currentDate.getMonth() && 
                             calendarYear === currentYear;
              
              // Get bills due on this day (based on selected month/year)
              const dueBills = filteredBills.filter(bill => {
                const dueDate = new Date(bill.dueDate);
                return dueDate.getDate() === i && 
                       dueDate.getMonth() === selectedMonthIndex && 
                       dueDate.getFullYear() === calendarYear;
              });
              
              days.push(
                <Grid item xs={12/7} key={`day-${i}`}>
                  <Box sx={{ 
                    height: 80,
                    p: 1, 
                    bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : 'white',
                    border: isToday ? `2px solid ${theme.palette.primary.main}` : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: isToday ? `0 0 10px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
                    transition: 'transform 0.2s',
                    '&:hover': dueBills.length > 0 ? {
                      transform: 'scale(1.05)',
                      zIndex: 1,
                      boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`
                    } : {}
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: isToday ? 'bold' : dueBills.length > 0 ? 'medium' : 'normal',
                        color: isToday ? theme.palette.primary.main : 
                               dayOfWeek === 0 || dayOfWeek === 6 ? theme.palette.error.main : 'inherit'
                      }}
                    >
                      {i}
                    </Typography>
                    
                    {dueBills.length > 0 && (
                      <Box sx={{ mt: 'auto' }}>
                        {dueBills.length <= 2 ? (
                          dueBills.map((bill, index) => (
                            <Tooltip key={bill.id} title={`${bill.name} - ${hideBalances ? 'Hidden' : formatCurrency(bill.amount)}`}>
                              <Box 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  mt: index > 0 ? 0.5 : 0,
                                  p: 0.5,
                                  borderRadius: 1,
                                  bgcolor: alpha(billCategories[bill.category]?.color || theme.palette.grey[500], 0.1),
                                  overflow: 'hidden'
                                }}
                              >
                                <Box 
                                  sx={{ 
                                    width: 8, 
                                    height: 8, 
                                    borderRadius: '50%', 
                                    bgcolor: billCategories[bill.category]?.color || theme.palette.grey[500],
                                    mr: 0.5,
                                    flexShrink: 0
                                  }}
                                />
                                <Typography 
                                  variant="caption" 
                                  noWrap 
                                  sx={{ 
                                    fontWeight: 'medium',
                                    fontSize: '0.65rem'
                                  }}
                                >
                                  {bill.name}
                                </Typography>
                              </Box>
                            </Tooltip>
                          ))
                        ) : (
                          <Tooltip title={dueBills.map(bill => `${bill.name} - ${hideBalances ? 'Hidden' : formatCurrency(bill.amount)}`).join('\n')}>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 0.5,
                                p: 0.5,
                                borderRadius: 1,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                              }}
                            >
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  fontSize: '0.65rem'
                                }}
                              >
                                {dueBills.length} bills
                              </Typography>
                            </Box>
                          </Tooltip>
                        )}
                      </Box>
                    )}
                  </Box>
                </Grid>
              );
            }
            
            return days;
          })()}
        </Grid>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: theme.palette.primary.main,
                mr: 1
              }}
            />
            <Typography variant="body2">Today</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: theme.palette.error.main,
                mr: 1
              }}
            />
            <Typography variant="body2">Weekend</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: theme.palette.success.main,
                mr: 1
              }}
            />
            <Typography variant="body2">Bills Due</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Add/Edit Bill Dialog */}
      <Dialog 
        open={openAddDialog || openEditDialog} 
        onClose={() => {
          setOpenAddDialog(false);
          setOpenEditDialog(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {openAddDialog ? 'Add New Bill' : 'Edit Bill'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="name"
                label="Bill Name"
                fullWidth
                variant="outlined"
                value={newBillItem.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="amount"
                label="Amount"
                fullWidth
                variant="outlined"
                type="number"
                value={newBillItem.amount}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dueDate"
                label="Due Date"
                fullWidth
                variant="outlined"
                type="date"
                value={newBillItem.dueDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Frequency</InputLabel>
                <Select
                  name="frequency"
                  value={newBillItem.frequency}
                  onChange={handleInputChange}
                  label="Frequency"
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="biweekly">Bi-Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="biannual">Bi-Annual</MenuItem>
                  <MenuItem value="annual">Annual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newBillItem.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {Object.keys(billCategories).map((category) => (
                    <MenuItem key={category} value={category}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {billCategories[category].icon}
                        <Typography sx={{ ml: 1 }}>
                          {billCategories[category].name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="fundingInstrument"
                  value={newBillItem.fundingInstrument}
                  onChange={handleInputChange}
                  label="Payment Method"
                >
                  {Object.keys(paymentMethods).map((method) => (
                    <MenuItem key={method} value={method}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {paymentMethods[method].icon}
                        <Typography sx={{ ml: 1 }}>
                          {method}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Owner</InputLabel>
                <Select
                  name="owner"
                  value={newBillItem.owner}
                  onChange={handleInputChange}
                  label="Owner"
                >
                  {familyMembers.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            mr: 1,
                            bgcolor: alpha(member.color, 0.2),
                            color: member.color,
                            fontSize: typeof member.avatar === 'string' ? 14 : 'inherit'
                          }}
                        >
                          {member.avatar}
                        </Avatar>
                        <Typography>
                          {member.name}
                        </Typography>
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
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                value={newBillItem.notes}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setOpenAddDialog(false);
              setOpenEditDialog(false);
            }}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveItem} 
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!newBillItem.name || !newBillItem.amount || !newBillItem.dueDate || !newBillItem.category || !newBillItem.fundingInstrument}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BillsSubscriptions;