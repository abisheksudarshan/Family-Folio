// ExpenseBreakdown.js - Family Budget Tracking Dashboard Component
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
  Chip,
  Avatar,
  IconButton,
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
  Tooltip,
  Tabs,
  Tab,
  Menu,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Snackbar,
  Alert
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Import Material UI Icons
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
import BarChartIcon from '@mui/icons-material/BarChart';
import SaveIcon from '@mui/icons-material/Save';
import SavingsIcon from '@mui/icons-material/Savings';
import GroupsIcon from '@mui/icons-material/Groups';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import SchoolIcon from '@mui/icons-material/School';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShowChartIcon from '@mui/icons-material/ShowChart';

/**
 * ExpenseBreakdown Component
 * 
 * A comprehensive family budget tracking dashboard that allows users to:
 * - View and manage budget items for different family members
 * - Track spending across various categories
 * - Visualize budget distribution and historical trends
 * - Add, edit, and delete budget items
 */
const ExpenseBreakdown = () => {
  const theme = useTheme();
  
  //---------------------------------------------------
  // DATA DEFINITIONS
  //---------------------------------------------------
  
  // Family members data with their avatars and colors
  const familyMembers = [
    { id: 'family', name: 'All Family', avatar: <GroupsIcon />, color: theme.palette.primary.main },
    { id: 'parent1', name: 'Raj', avatar: '👨', color: '#1976d2' },
    { id: 'parent2', name: 'Meera', avatar: '👩', color: '#9c27b0' },
    { id: 'child1', name: 'Arjun', avatar: '👦', color: '#2e7d32' },
    { id: 'child2', name: 'Anjali', avatar: '👧', color: '#d32f2f' }
  ];
  
  // Expense categories with their icons and colors
  const expenseCategories = {
    housing: { name: 'Housing', icon: <HomeIcon />, color: theme.palette.primary.main },
    transportation: { name: 'Transportation', icon: <DirectionsCarIcon />, color: theme.palette.secondary.main },
    food: { name: 'Food & Dining', icon: <RestaurantIcon />, color: theme.palette.success.main },
    shopping: { name: 'Shopping', icon: <ShoppingCartIcon />, color: theme.palette.error.main },
    healthcare: { name: 'Healthcare', icon: <LocalHospitalIcon />, color: theme.palette.warning.main },
    entertainment: { name: 'Entertainment', icon: <TheaterComedyIcon />, color: theme.palette.info.main },
    utilities: { name: 'Utilities', icon: <ElectricBoltIcon />, color: '#9c27b0' },
    travel: { name: 'Travel', icon: <FlightIcon />, color: '#ff9800' },
    education: { name: 'Education', icon: <SchoolIcon />, color: '#9c27b0' },
    other: { name: 'Other', icon: <ReceiptIcon />, color: '#607d8b' }
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
  
  //---------------------------------------------------
  // STATE MANAGEMENT
  //---------------------------------------------------
  
  // UI state variables
  const [loading, setLoading] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [selectedMember, setSelectedMember] = useState('family');
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState({
    type: 'month',
    month: 'Mar',
    year: 2025
  });
  const [periodMenuAnchor, setPeriodMenuAnchor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryFilterAnchor, setCategoryFilterAnchor] = useState(null);
  const [showFullYear, setShowFullYear] = useState(false);
  
  // New budget item state
  const [newBudgetItem, setNewBudgetItem] = useState({
    category: '',
    amount: '',
    description: '',
    owner: 'family'
  });
  
  // Feedback notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Budget data state (in a real app, this would be fetched from a database)
  const [familyBudgetsData, setFamilyBudgetsData] = useState({
    'family': {
      yearlyBudget: 42000,
      monthlyBudgets: {
        'Jan': { budget: 3300, spent: 3250 },
        'Feb': { budget: 3400, spent: 3380 },
        'Mar': { budget: 3500, spent: 3430 },
        'Apr': { budget: 3500, spent: 0 }, // Future month
        'May': { budget: 3600, spent: 0 }, // Future month
        'Jun': { budget: 3700, spent: 0 }, // Future month
        'Jul': { budget: 3800, spent: 0 }, // Future month
        'Aug': { budget: 3700, spent: 0 }, // Future month
        'Sep': { budget: 3600, spent: 0 }, // Future month
        'Oct': { budget: 3500, spent: 0 }, // Future month
        'Nov': { budget: 3700, spent: 0 }, // Future month
        'Dec': { budget: 4000, spent: 0 } // Future month
      },
      budgetItems: {
        'Jan': [
          { id: 1, category: 'housing', description: 'Rent/Mortgage', amount: 1400, spent: 1400, owner: 'parent1' },
          { id: 2, category: 'transportation', description: 'Fuel & Transportation', amount: 380, spent: 370, owner: 'parent2' },
          { id: 3, category: 'food', description: 'Groceries & Dining Out', amount: 680, spent: 710, owner: 'family' },
          { id: 4, category: 'shopping', description: 'Personal Shopping', amount: 250, spent: 280, owner: 'parent1' },
          { id: 5, category: 'healthcare', description: 'Medical Expenses', amount: 150, spent: 120, owner: 'parent2' },
          { id: 6, category: 'entertainment', description: 'Entertainment & Subscriptions', amount: 200, spent: 190, owner: 'child1' },
          { id: 7, category: 'utilities', description: 'Utilities', amount: 140, spent: 130, owner: 'parent2' },
          { id: 8, category: 'education', description: 'School & Courses', amount: 100, spent: 50, owner: 'child2' }
        ],
        'Feb': [
          { id: 1, category: 'housing', description: 'Rent/Mortgage', amount: 1450, spent: 1450, owner: 'parent1' },
          { id: 2, category: 'transportation', description: 'Fuel & Transportation', amount: 390, spent: 380, owner: 'parent2' },
          { id: 3, category: 'food', description: 'Groceries & Dining Out', amount: 690, spent: 680, owner: 'family' },
          { id: 4, category: 'shopping', description: 'Personal Shopping', amount: 270, spent: 310, owner: 'parent1' },
          { id: 5, category: 'healthcare', description: 'Medical Expenses', amount: 170, spent: 140, owner: 'parent2' },
          { id: 6, category: 'entertainment', description: 'Entertainment & Subscriptions', amount: 200, spent: 230, owner: 'child1' },
          { id: 7, category: 'utilities', description: 'Utilities', amount: 140, spent: 140, owner: 'parent2' },
          { id: 8, category: 'education', description: 'School & Courses', amount: 100, spent: 60, owner: 'child2' }
        ],
        'Mar': [
          { id: 1, category: 'housing', description: 'Rent/Mortgage', amount: 1500, spent: 1500, owner: 'parent1' },
          { id: 2, category: 'transportation', description: 'Fuel & Transportation', amount: 400, spent: 385, owner: 'parent2' },
          { id: 3, category: 'food', description: 'Groceries & Dining Out', amount: 700, spent: 650, owner: 'family' },
          { id: 4, category: 'shopping', description: 'Personal Shopping', amount: 300, spent: 350, owner: 'parent1' },
          { id: 5, category: 'healthcare', description: 'Medical Expenses', amount: 200, spent: 120, owner: 'parent2' },
          { id: 6, category: 'entertainment', description: 'Entertainment & Subscriptions', amount: 200, spent: 180, owner: 'child1' },
          { id: 7, category: 'utilities', description: 'Utilities', amount: 150, spent: 165, owner: 'parent2' },
          { id: 8, category: 'education', description: 'School & Courses', amount: 100, spent: 80, owner: 'child2' }
        ],
        'Apr': [
          { id: 1, category: 'housing', description: 'Rent/Mortgage', amount: 1500, spent: 0, owner: 'parent1' },
          { id: 2, category: 'transportation', description: 'Fuel & Transportation', amount: 400, spent: 0, owner: 'parent2' },
          { id: 3, category: 'food', description: 'Groceries & Dining Out', amount: 700, spent: 0, owner: 'family' },
          { id: 4, category: 'shopping', description: 'Personal Shopping', amount: 300, spent: 0, owner: 'parent1' },
          { id: 5, category: 'healthcare', description: 'Medical Expenses', amount: 200, spent: 0, owner: 'parent2' },
          { id: 6, category: 'entertainment', description: 'Entertainment & Subscriptions', amount: 200, spent: 0, owner: 'child1' },
          { id: 7, category: 'utilities', description: 'Utilities', amount: 150, spent: 0, owner: 'parent2' },
          { id: 8, category: 'education', description: 'School & Courses', amount: 100, spent: 0, owner: 'child2' }
        ]
      },
      categoryHistory: {
        'housing': [
          { month: 'Jan', budget: 1400, spent: 1400 },
          { month: 'Feb', budget: 1450, spent: 1450 },
          { month: 'Mar', budget: 1500, spent: 1500 }
        ],
        'transportation': [
          { month: 'Jan', budget: 380, spent: 370 },
          { month: 'Feb', budget: 390, spent: 380 },
          { month: 'Mar', budget: 400, spent: 385 }
        ],
        'food': [
          { month: 'Jan', budget: 680, spent: 710 },
          { month: 'Feb', budget: 690, spent: 680 },
          { month: 'Mar', budget: 700, spent: 650 }
        ],
        'shopping': [
          { month: 'Jan', budget: 250, spent: 280 },
          { month: 'Feb', budget: 270, spent: 310 },
          { month: 'Mar', budget: 300, spent: 350 }
        ],
        'healthcare': [
          { month: 'Jan', budget: 150, spent: 120 },
          { month: 'Feb', budget: 170, spent: 140 },
          { month: 'Mar', budget: 200, spent: 120 }
        ],
        'entertainment': [
          { month: 'Jan', budget: 200, spent: 190 },
          { month: 'Feb', budget: 200, spent: 230 },
          { month: 'Mar', budget: 200, spent: 180 }
        ],
        'utilities': [
          { month: 'Jan', budget: 140, spent: 130 },
          { month: 'Feb', budget: 140, spent: 140 },
          { month: 'Mar', budget: 150, spent: 165 }
        ],
        'education': [
          { month: 'Jan', budget: 100, spent: 50 },
          { month: 'Feb', budget: 100, spent: 60 },
          { month: 'Mar', budget: 100, spent: 80 }
        ]
      },
      monthlyHistory: [
        { month: 'Jan', budget: 3300, spent: 3250 },
        { month: 'Feb', budget: 3400, spent: 3380 },
        { month: 'Mar', budget: 3500, spent: 3430 },
        { month: 'Apr', budget: 3500, spent: 0 },
        { month: 'May', budget: 3600, spent: 0 },
        { month: 'Jun', budget: 3700, spent: 0 },
        { month: 'Jul', budget: 3800, spent: 0 },
        { month: 'Aug', budget: 3700, spent: 0 },
        { month: 'Sep', budget: 3600, spent: 0 },
        { month: 'Oct', budget: 3500, spent: 0 },
        { month: 'Nov', budget: 3700, spent: 0 },
        { month: 'Dec', budget: 4000, spent: 0 }
      ],
      recentExpenses: [
        { id: 1, category: 'food', description: 'Grocery Store', amount: 125.45, date: '2025-03-21', icon: <RestaurantIcon fontSize="small" />, owner: 'parent1' },
        { id: 2, category: 'housing', description: 'Electricity Bill', amount: 85.30, date: '2025-03-20', icon: <HomeIcon fontSize="small" />, owner: 'parent2' },
        { id: 3, category: 'transportation', description: 'Gas Station', amount: 45.75, date: '2025-03-19', icon: <DirectionsCarIcon fontSize="small" />, owner: 'parent1' },
        { id: 4, category: 'entertainment', description: 'Netflix Subscription', amount: 15.99, date: '2025-03-18', icon: <TheaterComedyIcon fontSize="small" />, owner: 'family' },
        { id: 5, category: 'shopping', description: 'Online Shopping', amount: 78.50, date: '2025-03-17', icon: <ShoppingCartIcon fontSize="small" />, owner: 'child1' }
      ]
    },
    'parent1': {
      // ... existing data for parent1
    },
    'parent2': {
      // ... existing data for parent2
    },
    'child1': {
      // ... existing data for child1
    },
    'child2': {
      // ... existing data for child2
    }
  });
  
  // Current date information
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  //---------------------------------------------------
  // DATA PROCESSING HELPERS
  //---------------------------------------------------
  
  /**
   * Get selected member's data
   * @returns {Object} The budget data for the selected family member
   */
  const getMemberData = () => {
    return familyBudgetsData[selectedMember];
  };
  
  const memberData = getMemberData();
  const yearlyBudget = memberData.yearlyBudget;
  const monthlyBudgets = memberData.monthlyBudgets;
  const monthlyHistory = memberData.monthlyHistory;
  const recentExpenses = memberData.recentExpenses;
  const categoryHistory = memberData.categoryHistory;
  
  /**
   * Get the selected month's budget items or aggregated yearly items
   * @returns {Array} Budget items for the selected period
   */
  const getBudgetItems = () => {
    if (showFullYear) {
      // Aggregate all budget items for the year
      const allItems = [];
      const aggregatedItems = {};
      
      Object.keys(memberData.budgetItems).forEach(month => {
        memberData.budgetItems[month].forEach(item => {
          if (!aggregatedItems[item.category]) {
            aggregatedItems[item.category] = {
              id: item.id,
              category: item.category,
              description: item.description,
              amount: 0,
              spent: 0,
              owner: item.owner
            };
          }
          aggregatedItems[item.category].amount += item.amount;
          aggregatedItems[item.category].spent += item.spent;
        });
      });
      
      return Object.values(aggregatedItems);
    } else {
      return memberData.budgetItems[selectedPeriod.month] || [];
    }
  };
  
  const budgetItems = getBudgetItems();
  
  // Calculate totals for current month/period
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = (totalSpent / totalBudget) * 100;
  
  /**
   * Get combined display text for selected period
   * @returns {string} Formatted text representation of the selected period
   */
  const getSelectedPeriodText = () => {
    if (showFullYear) {
      return `Full Year ${selectedPeriod.year}`;
    } else {
      return `${selectedPeriod.month}-${selectedPeriod.year.toString().slice(-2)}`;
    }
  };
  
  // Calculate categories that are over budget
  const overBudgetCategories = budgetItems.filter(item => item.spent > item.amount);
  
  /**
   * Calculate the number of days in a month
   * @param {string} month - Month abbreviation (e.g., 'Jan')
   * @param {number} year - Four-digit year
   * @returns {number} Number of days in the month
   */
  const getDaysInMonth = (month, year) => {
    const monthIndex = months.findIndex(m => m.short === month);
    return new Date(year, monthIndex + 1, 0).getDate();
  };
  
  const daysInMonth = getDaysInMonth(selectedPeriod.month, selectedPeriod.year);
  const dailyBudget = totalBudget / daysInMonth;
  const currentDay = currentDate.getDate();
  const expectedSpendToDate = dailyBudget * currentDay;
  const spendingStatus = totalSpent > expectedSpendToDate ? 'over' : 'under';
  
  /**
   * Filter chart data based on selected category
   * @returns {Array} Filtered chart data for visualization
   */
  const getFilteredChartData = () => {
    if (!selectedCategory) {
      return monthlyHistory;
    }
    
    // Create a dataset for the selected category
    const filteredData = [];
    
    monthlyHistory.forEach(monthData => {
      const filteredItem = {
        month: monthData.month,
      };
      
      const categoryData = categoryHistory[selectedCategory];
      const monthCategoryData = categoryData?.find(item => item.month === monthData.month);
      
      if (monthCategoryData) {
        filteredItem[`${selectedCategory}_budget`] = monthCategoryData.budget;
        filteredItem[`${selectedCategory}_spent`] = monthCategoryData.spent;
      }
      
      filteredData.push(filteredItem);
    });
    
    return filteredData;
  };
  
  //---------------------------------------------------
  // EVENT HANDLERS
  //---------------------------------------------------
  
  /**
   * Handle member selection change
   * @param {Event} event - The event object
   * @param {string} newMember - The ID of the newly selected member
   */
  const handleMemberChange = (event, newMember) => {
    if (newMember) {
      setSelectedMember(newMember);
    }
  };
  
  /**
   * Toggle visibility of balance amounts
   */
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };
  
  /**
   * Open the period selection menu
   * @param {Event} event - The event object
   */
  const handleOpenPeriodMenu = (event) => {
    setPeriodMenuAnchor(event.currentTarget);
  };
  
  /**
   * Close the period selection menu
   */
  const handleClosePeriodMenu = () => {
    setPeriodMenuAnchor(null);
  };
  
  /**
   * Handle month period selection
   * @param {string} month - Selected month abbreviation
   * @param {number} year - Selected year
   */
  const handlePeriodSelect = (month, year) => {
    setSelectedPeriod({
      type: 'month',
      month,
      year
    });
    setShowFullYear(false);
    handleClosePeriodMenu();
    
    // Reset category filter when period changes
    setSelectedCategory('');
  };
  
  /**
   * Handle full year view selection
   */
  const handleFullYearSelect = () => {
    setShowFullYear(true);
    handleClosePeriodMenu();
    
    // Reset category filter when period changes
    setSelectedCategory('');
  };
  
  /**
   * Open the category filter menu
   * @param {Event} event - The event object
   */
  const handleOpenCategoryFilter = (event) => {
    setCategoryFilterAnchor(event.currentTarget);
  };
  
  /**
   * Close the category filter menu
   */
  const handleCloseCategoryFilter = () => {
    setCategoryFilterAnchor(null);
  };
  
  /**
   * Handle category selection for filtering
   * @param {string} category - The selected category
   */
  const handleCategorySelect = (category) => {
    // If the same category is selected, clear the selection
    setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
    handleCloseCategoryFilter();
  };
  
  /**
   * Initialize the Add Budget Item dialog
   */
  const handleAddItem = () => {
    setNewBudgetItem({
      category: '',
      amount: '',
      description: '',
      owner: 'family'
    });
    setOpenAddDialog(true);
  };
  
  /**
   * Initialize the Edit Budget Item dialog
   * @param {number} id - ID of the budget item to edit
   */
  const handleEditItem = (id) => {
    const item = budgetItems.find(item => item.id === id);
    if (item) {
      setNewBudgetItem({
        category: item.category,
        amount: item.amount.toString(),
        description: item.description,
        owner: item.owner || 'family'
      });
      setEditItemId(id);
      setOpenEditDialog(true);
    }
  };
  
  /**
   * Validate form input for budget item
   * @returns {boolean} True if input is valid, false otherwise
   */
  const validateBudgetItemInput = () => {
    // Check if required fields are filled
    if (!newBudgetItem.category || !newBudgetItem.description || !newBudgetItem.amount) {
      setNotification({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return false;
    }
    
    // Check if amount is a valid number
    const amount = parseFloat(newBudgetItem.amount);
    if (isNaN(amount) || amount <= 0) {
      setNotification({
        open: true,
        message: 'Please enter a valid amount greater than zero',
        severity: 'error'
      });
      return false;
    }
    
    return true;
  };
  
  /**
   * Generate a unique ID for a new budget item
   * @returns {number} A new unique ID
   */
  const generateUniqueId = () => {
    // Find the highest ID in the current budget items and add 1
    const currentIds = [];
    Object.keys(memberData.budgetItems).forEach(month => {
      memberData.budgetItems[month].forEach(item => {
        currentIds.push(item.id);
      });
    });
    
    return Math.max(0, ...currentIds) + 1;
  };
  
  /**
   * Update category history with a new budget item
   * @param {Object} item - The budget item
   * @param {string} month - The month to update
   */
  const updateCategoryHistory = (item, month) => {
    const newFamilyBudgetsData = { ...familyBudgetsData };
    const categoryData = newFamilyBudgetsData[selectedMember].categoryHistory;
    
    // If category doesn't exist in history, create it
    if (!categoryData[item.category]) {
      categoryData[item.category] = [];
    }
    
    // Find the month entry for this category
    const monthEntry = categoryData[item.category].find(entry => entry.month === month);
    
    if (monthEntry) {
      // Update the existing month entry
      monthEntry.budget += parseFloat(item.amount);
    } else {
      // Add a new month entry
      categoryData[item.category].push({
        month,
        budget: parseFloat(item.amount),
        spent: 0
      });
    }
    
    return newFamilyBudgetsData;
  };
  
  /**
   * Update monthly totals for a new budget item
   * @param {Object} item - The budget item
   * @param {string} month - The month to update
   */
  const updateMonthlyTotals = (item, month) => {
    const newFamilyBudgetsData = { ...familyBudgetsData };
    
    // Update monthly budget total
    newFamilyBudgetsData[selectedMember].monthlyBudgets[month].budget += parseFloat(item.amount);
    
    // Update monthly history
    const monthHistoryEntry = newFamilyBudgetsData[selectedMember].monthlyHistory.find(
      entry => entry.month === month
    );
    
    if (monthHistoryEntry) {
      monthHistoryEntry.budget += parseFloat(item.amount);
    }
    
    return newFamilyBudgetsData;
  };
  
  /**
   * Save a new budget item
   */
  const handleSaveItem = () => {
    // Validate the input
    if (!validateBudgetItemInput()) {
      return;
    }
    
    // Create a deep copy of the current state
    let newFamilyBudgetsData = { ...familyBudgetsData };
    
    // Get the month to update
    const month = selectedPeriod.month;
    
    if (openAddDialog) {
      // Creating a new budget item
      const newItem = {
        id: generateUniqueId(),
        category: newBudgetItem.category,
        description: newBudgetItem.description,
        amount: parseFloat(newBudgetItem.amount),
        spent: 0,
        owner: newBudgetItem.owner || 'family'
      };
      
      // Add the new item to the budget items for the selected month
      if (!newFamilyBudgetsData[selectedMember].budgetItems[month]) {
        newFamilyBudgetsData[selectedMember].budgetItems[month] = [];
      }
      
      newFamilyBudgetsData[selectedMember].budgetItems[month].push(newItem);
      
      // Update category history
      newFamilyBudgetsData = updateCategoryHistory(newItem, month);
      
      // Update monthly totals
      newFamilyBudgetsData = updateMonthlyTotals(newItem, month);
      
      // Show success notification
      setNotification({
        open: true,
        message: 'Budget item successfully added',
        severity: 'success'
      });
    } else if (openEditDialog) {
      // Editing an existing budget item
      const existingItem = newFamilyBudgetsData[selectedMember].budgetItems[month].find(
        item => item.id === editItemId
      );
      
      if (existingItem) {
        // Calculate the difference in amount
        const amountDifference = parseFloat(newBudgetItem.amount) - existingItem.amount;
        
        // Update the item
        existingItem.category = newBudgetItem.category;
        existingItem.description = newBudgetItem.description;
        existingItem.amount = parseFloat(newBudgetItem.amount);
        existingItem.owner = newBudgetItem.owner || 'family';
        
        // Update category history if amount changed
        if (amountDifference !== 0) {
          // Update the budget in category history
          const categoryData = newFamilyBudgetsData[selectedMember].categoryHistory;
          const monthCategoryData = categoryData[existingItem.category]?.find(entry => entry.month === month);
          
          if (monthCategoryData) {
            monthCategoryData.budget += amountDifference;
          }
          
          // Update monthly totals
          newFamilyBudgetsData[selectedMember].monthlyBudgets[month].budget += amountDifference;
          
          // Update monthly history
          const monthHistoryEntry = newFamilyBudgetsData[selectedMember].monthlyHistory.find(
            entry => entry.month === month
          );
          
          if (monthHistoryEntry) {
            monthHistoryEntry.budget += amountDifference;
          }
        }
        
        // Show success notification
        setNotification({
          open: true,
          message: 'Budget item successfully updated',
          severity: 'success'
        });
      }
    }
    
    // Update the state with the new data
    setFamilyBudgetsData(newFamilyBudgetsData);
    
    // Close the dialogs
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setEditItemId(null);
  };
  
  /**
   * Delete a budget item
   * @param {number} id - ID of the budget item to delete
   */
  const handleDeleteItem = (id) => {
    // Create a deep copy of the current state
    const newFamilyBudgetsData = { ...familyBudgetsData };
    const month = selectedPeriod.month;
    
    // Find the item to delete
    const itemIndex = newFamilyBudgetsData[selectedMember].budgetItems[month].findIndex(
      item => item.id === id
    );
    
    if (itemIndex !== -1) {
      const item = newFamilyBudgetsData[selectedMember].budgetItems[month][itemIndex];
      
      // Remove the item from budget items
      newFamilyBudgetsData[selectedMember].budgetItems[month].splice(itemIndex, 1);
      
      // Update category history
      const categoryData = newFamilyBudgetsData[selectedMember].categoryHistory;
      const monthCategoryData = categoryData[item.category]?.find(entry => entry.month === month);
      
      if (monthCategoryData) {
        monthCategoryData.budget -= item.amount;
        monthCategoryData.spent -= item.spent;
      }
      
      // Update monthly totals
      newFamilyBudgetsData[selectedMember].monthlyBudgets[month].budget -= item.amount;
      newFamilyBudgetsData[selectedMember].monthlyBudgets[month].spent -= item.spent;
      
      // Update monthly history
      const monthHistoryEntry = newFamilyBudgetsData[selectedMember].monthlyHistory.find(
        entry => entry.month === month
      );
      
      if (monthHistoryEntry) {
        monthHistoryEntry.budget -= item.amount;
        monthHistoryEntry.spent -= item.spent;
      }
      
      // Update the state
      setFamilyBudgetsData(newFamilyBudgetsData);
      
      // Show success notification
      setNotification({
        open: true,
        message: 'Budget item successfully deleted',
        severity: 'success'
      });
    }
  };
  
  /**
   * Close the notification snackbar
   */
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  //---------------------------------------------------
  // EFFECTS
  //---------------------------------------------------
  
  /**
   * Effect to simulate data loading when member or period changes
   */
  useEffect(() => {
    if (selectedMember || selectedPeriod) {
      setLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedMember, selectedPeriod]);
  
  //---------------------------------------------------
  // FORMATTING HELPERS
  //---------------------------------------------------
  
  /**
   * Format a number as currency
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
   * Format a date string
   * @param {string} dateString - Date string in ISO format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  //---------------------------------------------------
  // CHART COMPONENTS
  //---------------------------------------------------
  
  /**
   * Custom tooltip component for charts
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{label}</Typography>
          {payload.map((entry, index) => {
            // Handle category-specific entries
            const isCategoryKey = entry.dataKey.includes('_');
            
            let displayName = entry.name;
            let color = entry.color;
            
            if (isCategoryKey) {
              const [category, type] = entry.dataKey.split('_');
              displayName = `${expenseCategories[category]?.name || category} (${type === 'budget' ? 'Budget' : 'Spent'})`;
              color = expenseCategories[category]?.color || entry.color;
            }
            
            return (
              <Box key={`tooltip-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: color,
                    marginRight: 1,
                    borderRadius: '50%'
                  }}
                />
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {displayName}:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(entry.value)}
                </Typography>
              </Box>
            );
          })}
          
          {selectedMember === 'family' && payload[0]?.payload?.owner && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 1, 
              pt: 1, 
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}` 
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>Owner:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {familyMembers.find(m => m.id === payload[0].payload.owner)?.name || 'Family'}
              </Typography>
            </Box>
          )}
        </Paper>
      );
    }
    return null;
  };
  
  /**
   * Generate chart bars for selected category
   * @returns {Array} Array of Bar components for the chart
   */
  const generateCategoryChartElements = () => {
    if (!selectedCategory) {
      return [
        <Bar 
          key="budget"
          dataKey="budget" 
          name="Budget" 
          fill={alpha(theme.palette.primary.main, 0.3)}
          radius={[4, 4, 0, 0]}
          strokeWidth={0}
        />,
        <Bar 
          key="spent"
          dataKey="spent" 
          name="Actual Spent" 
          fill={theme.palette.primary.main}
          radius={[4, 4, 0, 0]}
        />
      ];
    }
    
    const elements = [];
    const categoryColor = expenseCategories[selectedCategory]?.color || theme.palette.primary.main;
    
    elements.push(
      <Bar 
        key={`${selectedCategory}_budget`}
        dataKey={`${selectedCategory}_budget`}
        name={`${expenseCategories[selectedCategory]?.name || selectedCategory} Budget`}
        fill={alpha(categoryColor, 0.3)}
        radius={[4, 4, 0, 0]}
        strokeWidth={0}
      />
    );
    
    elements.push(
      <Bar 
        key={`${selectedCategory}_spent`}
        dataKey={`${selectedCategory}_spent`}
        name={`${expenseCategories[selectedCategory]?.name || selectedCategory} Spent`}
        fill={categoryColor}
        radius={[4, 4, 0, 0]}
      />
    );
    
    return elements;
  };
  
  //---------------------------------------------------
  // RENDER UI
  //---------------------------------------------------
  return (
    <Box sx={{ p: 3 }}>
      {/* Banner with title */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, // Exact match with BillsSubscriptions
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
            Expense Breakdown
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
                py: 1, // Exact match with BillsSubscriptions
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.25)',
                }
              }}
            >
              {getSelectedPeriodText()}
            </Button>
            
            <IconButton 
              sx={{ ml: 2, color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }} // ml: 2 to match BillsSubscriptions
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
        
        {/* Member Selection Tabs */}
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
                minHeight: '64px', // Match with BillsSubscriptions
                p: 1, // Match with BillsSubscriptions
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
        
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold" component="div">
                {selectedMember === 'family' ? 'Family Budget' : `${familyMembers.find(m => m.id === selectedMember)?.name}'s Budget`}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
                {hideBalances ? '••••••••' : formatCurrency(totalSpent)}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                of {hideBalances ? '••••••••' : formatCurrency(totalBudget)}
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
                border: `1px solid ${spendingStatus === 'under' ? 'rgba(46, 125, 50, 0.3)' : 'rgba(211, 47, 47, 0.3)'}`,
              }}>
                {spendingStatus === 'under' ? 
                  <TrendingDownIcon fontSize="small" sx={{ color: '#2e7d32' }} /> : 
                  <TrendingUpIcon fontSize="small" sx={{ color: '#d32f2f' }} />
                }
                <Typography 
                  variant="body1" 
                  sx={{ 
                    ml: 0.5,
                    fontWeight: 'medium',
                    color: spendingStatus === 'under' ? '#2e7d32' : '#d32f2f'
                  }}
                >
                  {hideBalances ? '••••••••' : spendingStatus === 'under' ? 
                    `${formatCurrency(expectedSpendToDate - totalSpent)} under` : 
                    `${formatCurrency(totalSpent - expectedSpendToDate)} over`
                  }
                  <span style={{ 
                    display: 'inline-block', 
                    marginLeft: '8px',
                    fontWeight: 'bold',
                    color: 'inherit'
                  }}>
                    projected spending
                  </span>
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
              Budget Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ flex: 1, height: 10, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 5, mr: 2 }}>
                <Box 
                  sx={{
                    height: '100%',
                    width: `${Math.min(budgetProgress, 100)}%`,
                    bgcolor: budgetProgress > 100 ? '#f44336' : budgetProgress > 85 ? '#ff9800' : '#4caf50',
                    borderRadius: 5
                  }}
                />
              </Box>
              <Typography variant="body1" fontWeight="bold">
                {budgetProgress.toFixed(0)}%
              </Typography>
            </Box>
            
            <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'medium', mt: 2 }}>
              {hideBalances ? '••••••••' : formatCurrency(remainingBudget)} remaining
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1 }}>
              <RefreshIcon sx={{ fontSize: 16, mr: 0.5, opacity: 0.75 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Spending Insights - Moved below the main banner */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 3, 
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
          Spending Insights
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card 
              variant="outlined" 
              sx={{ 
                borderRadius: 2, 
                borderColor: alpha(theme.palette.success.main, 0.3),
                bgcolor: alpha(theme.palette.success.main, 0.05),
                height: '100%',
                p: 2,
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.03)'
              }}
            >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Positive Change
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', mb: 1 }}>
                Food & Dining
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Spent <strong style={{ color: theme.palette.success.main }}>4.4% less</strong> than previous period
              </Typography>
              <Chip 
                icon={<TrendingDownIcon fontSize="small" />} 
                label="₹30 less" 
                size="small"
                sx={{ 
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  fontWeight: 'medium'
                }}
              />
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card 
              variant="outlined" 
              sx={{ 
                borderRadius: 2, 
                borderColor: alpha(theme.palette.warning.main, 0.3),
                bgcolor: alpha(theme.palette.warning.main, 0.05),
                height: '100%',
                p: 2,
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.03)'
              }}
            >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Budget Alert
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', mb: 1 }}>
                Entertainment
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong style={{ color: theme.palette.warning.main }}>92.3%</strong> of monthly budget used
              </Typography>
              <Chip 
                icon={<WarningIcon fontSize="small" />} 
                label="₹15 remaining" 
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
              sx={{ 
                borderRadius: 2, 
                borderColor: alpha(theme.palette.error.main, 0.3),
                bgcolor: alpha(theme.palette.error.main, 0.05),
                height: '100%',
                p: 2,
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.03)'
              }}
            >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Unusual Activity
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', mb: 1 }}>
                Shopping
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong style={{ color: theme.palette.error.main }}>58%</strong> increase from average
              </Typography>
              <Chip 
                icon={<TrendingUpIcon fontSize="small" />} 
                label="₹125 more" 
                size="small"
                sx={{ 
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  fontWeight: 'medium'
                }}
              />
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
          <Typography variant="subtitle2" fontWeight="medium" color="info.main" gutterBottom>
            Spending Insights
          </Typography>
          <Typography variant="body2">
            {showFullYear ? 
              "Your yearly budget overview shows Housing (₹18,000) and Food (₹8,400) are your largest expenses. You've spent 38% of your yearly budget so far, which is in line with the current month. Consider adjusting your Shopping budget which is trending 15% higher than planned." :
              
              selectedMember === 'family' ? 
              "Your family's spending patterns show that Housing (₹1,500) and Food (₹650) are your top expenses this month. You're currently at 88% of your monthly budget with ₹420 remaining. Consider reducing Shopping expenses which have increased by 5.2% compared to last month." :
              
              selectedMember === 'parent1' ? 
              "Raj's major expenses are in Housing (₹1,500) which accounts for 64% of total spending. Overall spending is 5.3% lower than last month which is a positive trend. You're currently at 105% of your Housing budget, but have savings in Transportation." :
              
              selectedMember === 'parent2' ? 
              "Meera's highest expense categories are Transportation (₹250) and Food (₹200). Overall spending has increased by 5.2% compared to last month. You're currently at 95% of your monthly budget with ₹50 remaining to spend." :
              
              selectedMember === 'child1' ? 
              "Arjun's spending is mainly on Entertainment (₹180) and Food (₹150). Entertainment spending has increased by 20% over the last month. You're currently at 92% of your monthly allowance with ₹40 remaining." :
              
              "Anjali's main expenses are in Education (₹100) and Food (₹50). You're currently at 88% of your monthly allowance with ₹30 remaining. Your spending has been consistent with last month's pattern."
            }
          </Typography>
        </Box>
      </Paper>
      
      {/* Summary Cards Row - Redesigned for selected month */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Budget Card */}
        <Grid item xs={12} sm={6} lg={3}>
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
                    <AccountBalanceWalletIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    {showFullYear ? 'Total Budget' : 'Monthly Budget'}
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {hideBalances ? '••••' : formatCurrency(totalBudget)}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                {showFullYear ? 
                  `Monthly Average: ${hideBalances ? '••••' : formatCurrency(totalBudget / 12)}` :
                  `Daily: ${hideBalances ? '••••' : formatCurrency(dailyBudget.toFixed(0))}`
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Spent Card */}
        <Grid item xs={12} sm={6} lg={3}>
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
                backgroundColor: alpha(theme.palette.error.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    mr: 1.5, 
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.error.main
                  }}>
                    <ShowChartIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Spent So Far
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {hideBalances ? '••••' : formatCurrency(totalSpent)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  size="small"
                  label={`${budgetProgress.toFixed(0)}% of budget`}
                  sx={{ 
                    bgcolor: budgetProgress > 100 ? alpha(theme.palette.error.main, 0.1) : 
                           budgetProgress > 85 ? alpha(theme.palette.warning.main, 0.1) : 
                           alpha(theme.palette.success.main, 0.1),
                    color: budgetProgress > 100 ? theme.palette.error.main : 
                           budgetProgress > 85 ? theme.palette.warning.main : 
                           theme.palette.success.main,
                    fontWeight: 'medium'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Remaining Budget Card */}
        <Grid item xs={12} sm={6} lg={3}>
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
                    <SavingsIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Remaining Budget
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ 
                  mb: 1, 
                  color: remainingBudget < 0 ? theme.palette.error.main : 'inherit' 
                }}>
                  {hideBalances ? '••••' : formatCurrency(remainingBudget)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {!showFullYear && (
                  <Chip 
                    size="small"
                    icon={<DateRangeIcon fontSize="small" />}
                    label={`${Math.floor(daysInMonth - currentDay)} days left`}
                    sx={{ 
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                      fontWeight: 'medium'
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Budget Status Card */}
        <Grid item xs={12} sm={6} lg={3}>
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
                    <AssessmentIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                    Budget Status
                  </Typography>
                </Box>
                
                <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                  {spendingStatus === 'under' ? 
                    <Chip 
                      label="Under Budget" 
                      color="success"
                      sx={{ fontWeight: 'bold', fontSize: '1rem', height: 36, px: 1 }}
                    /> :
                    <Chip 
                      label="Over Budget" 
                      color="error"
                      sx={{ fontWeight: 'bold', fontSize: '1rem', height: 36, px: 1 }}
                    />
                  }
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                {spendingStatus === 'under' ? 
                  `${hideBalances ? '••••' : formatCurrency((expectedSpendToDate - totalSpent).toFixed(0))} less than projected` :
                  `${hideBalances ? '••••' : formatCurrency((totalSpent - expectedSpendToDate).toFixed(0))} over projected`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
          
      {/* Budget Distribution and Category Spending */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Budget Distribution */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
              Budget Distribution
            </Typography>
            
            <Box sx={{ height: 230, flex: '0 0 auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetItems}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    innerRadius={60}
                    paddingAngle={1}
                    dataKey="amount"
                    nameKey="category"
                  >
                    {budgetItems.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={expenseCategories[entry.category].color} 
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value, name) => [
                      `₹${value.toLocaleString()}`, 
                      expenseCategories[name].name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            
            <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
              <List>
                {budgetItems
                  .sort((a, b) => b.amount - a.amount)
                  .map((item) => {
                    const category = expenseCategories[item.category];
                    return (
                      <ListItem 
                        key={item.id}
                        sx={{ 
                          py: 0.75, 
                          px: 1, 
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.05)
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: alpha(category.color, 0.1), 
                              color: category.color 
                            }}
                          >
                            {React.cloneElement(category.icon, { fontSize: 'small' })}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography fontWeight="medium" variant="body2">
                                {category.name}
                              </Typography>
                              {selectedMember === 'family' && item.owner && item.owner !== 'family' && (
                                <Tooltip title={`Owned by ${familyMembers.find(m => m.id === item.owner)?.name}`}>
                                  <Avatar 
                                    sx={{ 
                                      width: 16, 
                                      height: 16, 
                                      fontSize: '0.6rem', 
                                      ml: 0.5,
                                      bgcolor: alpha(familyMembers.find(m => m.id === item.owner)?.color || theme.palette.grey[500], 0.2),
                                      color: familyMembers.find(m => m.id === item.owner)?.color || theme.palette.grey[700]
                                    }}
                                  >
                                    {familyMembers.find(m => m.id === item.owner)?.name.charAt(0) || 'F'}
                                  </Avatar>
                                </Tooltip>
                              )}
                            </Box>
                          }
                          secondary={`${((item.amount / totalBudget) * 100).toFixed(1)}% of total`}
                          primaryTypographyProps={{ fontWeight: 'medium', variant: 'body2' }}
                          secondaryTypographyProps={{ fontSize: '0.75rem' }}
                        />
                        <Typography variant="body2" fontWeight="medium">
                          {hideBalances ? '••••' : formatCurrency(item.amount)}
                        </Typography>
                      </ListItem>
                    );
                  })}
              </List>
            </Box>
          </Paper>
        </Grid>
        
        {/* Category Spending */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="medium">
                Category Spending
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddItem}
                sx={{ 
                  borderRadius: 2, 
                  textTransform: 'none',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
                }}
              >
                Add Budget Item
              </Button>
            </Box>
            
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <List>
                {budgetItems.map((item) => {
                  const category = expenseCategories[item.category];
                  const spentPercentage = (item.spent / item.amount) * 100;
                  const statusColor = spentPercentage > 100 ? theme.palette.error.main : 
                                    spentPercentage > 90 ? theme.palette.warning.main : 
                                    theme.palette.success.main;
                  
                  return (
                    <ListItem
                      key={item.id}
                      sx={{
                        px: 1,
                        py: 1.5,
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: alpha(theme.palette.background.default, 0.5),
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
                          bgcolor: alpha(theme.palette.background.paper, 0.9)
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 45 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: alpha(category.color, 0.1), 
                            color: category.color,
                            width: 35,
                            height: 35
                          }}
                        >
                          {React.cloneElement(category.icon, { fontSize: 'small' })}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle2" fontWeight="medium">
                                {category.name}
                              </Typography>
                              {selectedMember === 'family' && item.owner && item.owner !== 'family' && (
                                <Tooltip title={`Owned by ${familyMembers.find(m => m.id === item.owner)?.name}`}>
                                  <Avatar 
                                    sx={{ 
                                      width: 16, 
                                      height: 16, 
                                      fontSize: '0.6rem', 
                                      ml: 0.5,
                                      bgcolor: alpha(familyMembers.find(m => m.id === item.owner)?.color || theme.palette.grey[500], 0.2),
                                      color: familyMembers.find(m => m.id === item.owner)?.color || theme.palette.grey[700]
                                    }}
                                  >
                                    {familyMembers.find(m => m.id === item.owner)?.name.charAt(0) || 'F'}
                                  </Avatar>
                                </Tooltip>
                              )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography 
                                variant="body2" 
                                fontWeight="medium"
                                sx={{ color: statusColor, mr: 1 }}
                              >
                                {spentPercentage.toFixed(0)}%
                              </Typography>
                              <IconButton 
                                size="small" 
                                sx={{ color: theme.palette.primary.main, p: 0.5 }}
                                onClick={() => handleEditItem(item.id)}
                              >
                                <EditIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                sx={{ color: alpha(theme.palette.error.main, 0.8), p: 0.5 }}
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <DeleteIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                {hideBalances ? '••••' : formatCurrency(item.spent)} of {hideBalances ? '••••' : formatCurrency(item.amount)}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: item.spent <= item.amount ? theme.palette.success.main : theme.palette.error.main,
                                  fontWeight: 'medium'
                                }}
                              >
                                {item.spent <= item.amount 
                                  ? `${hideBalances ? '••••' : formatCurrency(item.amount - item.spent)} left` 
                                  : `${hideBalances ? '••••' : formatCurrency(item.spent - item.amount)} over`}
                              </Typography>
                            </Box>
                            <Box sx={{ width: '100%', height: 6, bgcolor: alpha(theme.palette.divider, 0.2), borderRadius: 3 }}>
                              <Box 
                                sx={{
                                  height: '100%',
                                  width: `${Math.min(spentPercentage, 100)}%`,
                                  bgcolor: statusColor,
                                  borderRadius: 3
                                }}
                              />
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Monthly Budget History with Category Filter */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 3, 
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2 
            }}>
              <Typography variant="h6" fontWeight="medium">Monthly Budget History</Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Category Filter */}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FilterListIcon />}
                  endIcon={<ArrowDropDownIcon />}
                  onClick={handleOpenCategoryFilter}
                  sx={{ 
                    borderRadius: '12px',
                    textTransform: 'none',
                    mr: 2
                  }}
                >
                  {!selectedCategory ? 'All Categories' : expenseCategories[selectedCategory]?.name}
                </Button>
                
                <Menu
                  anchorEl={categoryFilterAnchor}
                  open={Boolean(categoryFilterAnchor)}
                  onClose={handleCloseCategoryFilter}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      maxHeight: 300,
                      width: 250,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 'medium' }}>
                    Filter by Category
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <MenuItem 
                    dense
                    onClick={() => handleCategorySelect('')}
                    sx={{ 
                      bgcolor: !selectedCategory ? alpha(theme.palette.primary.light, 0.1) : 'inherit'
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        mr: 1,
                        bgcolor: alpha(theme.palette.grey[500], 0.1),
                        color: theme.palette.grey[700],
                      }}
                    >
                      <FilterListIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body2">All Categories</Typography>
                  </MenuItem>
                  
                  {Object.keys(expenseCategories).map(category => (
                    <MenuItem 
                      key={category}
                      dense
                      onClick={() => handleCategorySelect(category)}
                      sx={{ 
                        bgcolor: selectedCategory === category ? alpha(theme.palette.primary.light, 0.1) : 'inherit'
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          mr: 1,
                          bgcolor: alpha(expenseCategories[category].color, 0.1),
                          color: expenseCategories[category].color,
                        }}
                      >
                        {React.cloneElement(expenseCategories[category].icon, { fontSize: 'small' })}
                      </Avatar>
                      <Typography variant="body2">{expenseCategories[category].name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getFilteredChartData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    barSize={24}
                    barGap={8}
                    barCategoryGap={16}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha(theme.palette.divider, 0.5)} />
                    <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary }} />
                    <YAxis 
                      tick={{ fill: theme.palette.text.secondary }}
                      tickFormatter={(value) => hideBalances ? '••••' : `₹${value}`}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    
                    {/* Render category-specific bars or default bars */}
                    {generateCategoryChartElements()}
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Add Budget Item Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={() => setOpenAddDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 3, 
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
          } 
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>Add Budget Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!newBudgetItem.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={newBudgetItem.category}
                  label="Category *"
                  onChange={(e) => setNewBudgetItem({...newBudgetItem, category: e.target.value})}
                >
                  {Object.keys(expenseCategories).map((key) => (
                    <MenuItem value={key} key={key}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            mr: 1,
                            bgcolor: alpha(expenseCategories[key].color, 0.1), 
                            color: expenseCategories[key].color
                          }}
                        >
                          {React.cloneElement(expenseCategories[key].icon, { fontSize: 'small' })}
                        </Avatar>
                        <Typography>{expenseCategories[key].name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Description"
                value={newBudgetItem.description}
                onChange={(e) => setNewBudgetItem({...newBudgetItem, description: e.target.value})}
                variant="outlined"
                error={!newBudgetItem.description}
                helperText={!newBudgetItem.description && "Description is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Budget Amount"
                value={newBudgetItem.amount}
                onChange={(e) => setNewBudgetItem({...newBudgetItem, amount: e.target.value})}
                variant="outlined"
                error={!newBudgetItem.amount || isNaN(parseFloat(newBudgetItem.amount)) || parseFloat(newBudgetItem.amount) <= 0}
                helperText={(!newBudgetItem.amount || isNaN(parseFloat(newBudgetItem.amount)) || parseFloat(newBudgetItem.amount) <= 0) && "Please enter a valid amount"}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            {selectedMember === 'family' && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="owner-label">Owner</InputLabel>
                  <Select
                    labelId="owner-label"
                    id="owner-select"
                    value={newBudgetItem.owner || 'family'}
                    label="Owner"
                    onChange={(e) => setNewBudgetItem({...newBudgetItem, owner: e.target.value})}
                  >
                    {familyMembers.map((member) => (
                      <MenuItem value={member.id} key={member.id}>
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
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenAddDialog(false)} color="inherit">Cancel</Button>
          <Button 
            onClick={handleSaveItem} 
            variant="contained" 
            startIcon={<SaveIcon />}
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none'
            }}
            disabled={!newBudgetItem.category || !newBudgetItem.description || !newBudgetItem.amount || isNaN(parseFloat(newBudgetItem.amount)) || parseFloat(newBudgetItem.amount) <= 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Budget Item Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 3, 
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
          } 
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>Edit Budget Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!newBudgetItem.category}>
                <InputLabel id="edit-category-label">Category</InputLabel>
                <Select
                  labelId="edit-category-label"
                  id="edit-category-select"
                  value={newBudgetItem.category}
                  label="Category *"
                  onChange={(e) => setNewBudgetItem({...newBudgetItem, category: e.target.value})}
                >
                  {Object.keys(expenseCategories).map((key) => (
                    <MenuItem value={key} key={key}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            mr: 1,
                            bgcolor: alpha(expenseCategories[key].color, 0.1), 
                            color: expenseCategories[key].color
                          }}
                        >
                          {React.cloneElement(expenseCategories[key].icon, { fontSize: 'small' })}
                        </Avatar>
                        <Typography>{expenseCategories[key].name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Description"
                value={newBudgetItem.description}
                onChange={(e) => setNewBudgetItem({...newBudgetItem, description: e.target.value})}
                variant="outlined"
                error={!newBudgetItem.description}
                helperText={!newBudgetItem.description && "Description is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Budget Amount"
                value={newBudgetItem.amount}
                onChange={(e) => setNewBudgetItem({...newBudgetItem, amount: e.target.value})}
                variant="outlined"
                error={!newBudgetItem.amount || isNaN(parseFloat(newBudgetItem.amount)) || parseFloat(newBudgetItem.amount) <= 0}
                helperText={(!newBudgetItem.amount || isNaN(parseFloat(newBudgetItem.amount)) || parseFloat(newBudgetItem.amount) <= 0) && "Please enter a valid amount"}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            {selectedMember === 'family' && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="edit-owner-label">Owner</InputLabel>
                  <Select
                    labelId="edit-owner-label"
                    id="edit-owner-select"
                    value={newBudgetItem.owner || 'family'}
                    label="Owner"
                    onChange={(e) => setNewBudgetItem({...newBudgetItem, owner: e.target.value})}
                  >
                    {familyMembers.map((member) => (
                      <MenuItem value={member.id} key={member.id}>
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
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenEditDialog(false)} color="inherit">Cancel</Button>
          <Button 
            onClick={handleSaveItem} 
            variant="contained" 
            startIcon={<SaveIcon />}
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none'
            }}
            disabled={!newBudgetItem.category || !newBudgetItem.description || !newBudgetItem.amount || isNaN(parseFloat(newBudgetItem.amount)) || parseFloat(newBudgetItem.amount) <= 0}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExpenseBreakdown;