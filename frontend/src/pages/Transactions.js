// src/pages/Transactions.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  alpha,
  Alert,
  FormHelperText,
  Tooltip,
  Snackbar,
  Card,
  CardContent,
  Tabs,
  Tab,
  CircularProgress,
  Switch,
  Collapse
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FlightIcon from '@mui/icons-material/Flight';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderIcon from '@mui/icons-material/Folder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Transactions = () => {
  const theme = useTheme();
  
  // Transaction categories with their icons
  const categories = {
    food: { name: 'Food & Dining', icon: <RestaurantIcon fontSize="small" />, color: theme.palette.primary.main },
    shopping: { name: 'Shopping', icon: <ShoppingCartIcon fontSize="small" />, color: theme.palette.secondary.main },
    housing: { name: 'Housing', icon: <HomeIcon fontSize="small" />, color: theme.palette.success.main },
    transportation: { name: 'Transportation', icon: <DirectionsCarIcon fontSize="small" />, color: theme.palette.error.main },
    healthcare: { name: 'Healthcare', icon: <LocalHospitalIcon fontSize="small" />, color: theme.palette.warning.main },
    entertainment: { name: 'Entertainment', icon: <TheaterComedyIcon fontSize="small" />, color: theme.palette.info.main },
    utilities: { name: 'Utilities', icon: <ElectricBoltIcon fontSize="small" />, color: '#9c27b0' },
    income: { name: 'Income', icon: <LocalAtmIcon fontSize="small" />, color: '#4caf50' },
    travel: { name: 'Travel', icon: <FlightIcon fontSize="small" />, color: '#ff9800' },
    finance: { name: 'Finance', icon: <AccountBalanceIcon fontSize="small" />, color: '#607d8b' },
    investment: { name: 'Investment', icon: <TrendingUpIcon fontSize="small" />, color: '#3f51b5' }
  };

  // Asset types
  const assetTypes = [
    { id: 'indianEquity', name: 'Indian Equity', icon: <CurrencyRupeeIcon /> },
    { id: 'usEquity', name: 'US Equity', icon: <AttachMoneyIcon /> },
    { id: 'mutualFunds', name: 'Mutual Funds', icon: <AccountBalanceIcon /> },
    { id: 'fixedIncome', name: 'Fixed Income', icon: <SavingsIcon /> },
    { id: 'crypto', name: 'Cryptocurrency', icon: <CurrencyExchangeIcon /> }
  ];
  
  // Sample dummy transactions
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      date: '2025-03-21', 
      description: 'Grocery Store', 
      category: 'food', 
      amount: -120.45, 
      account: 'Chase Checking',
      assetType: null
    },
    { 
      id: 2, 
      date: '2025-03-20', 
      description: 'Monthly Rent', 
      category: 'housing', 
      amount: -1500.00, 
      account: 'Bank of America Checking',
      assetType: null
    },
    { 
      id: 3, 
      date: '2025-03-19', 
      description: 'Gas Station', 
      category: 'transportation', 
      amount: -45.75, 
      account: 'Chase Credit Card',
      assetType: null
    },
    { 
      id: 4, 
      date: '2025-03-19', 
      description: 'Netflix Subscription', 
      category: 'entertainment', 
      amount: -15.99, 
      account: 'Amex Credit Card',
      assetType: null
    },
    { 
      id: 5, 
      date: '2025-03-18', 
      description: 'Salary Deposit', 
      category: 'income', 
      amount: 3200.00, 
      account: 'Chase Checking',
      assetType: null
    },
    { 
      id: 6, 
      date: '2025-03-17', 
      description: 'Restaurant', 
      category: 'food', 
      amount: -65.30, 
      account: 'Chase Credit Card',
      assetType: null
    },
    { 
      id: 7, 
      date: '2025-03-16', 
      description: 'Electric Bill', 
      category: 'utilities', 
      amount: -85.42, 
      account: 'Bank of America Checking',
      assetType: null
    },
    { 
      id: 8, 
      date: '2025-03-15', 
      description: 'Online Shopping', 
      category: 'shopping', 
      amount: -125.99, 
      account: 'Amex Credit Card',
      assetType: null
    },
    { 
      id: 9, 
      date: '2025-03-15', 
      description: 'Pharmacy', 
      category: 'healthcare', 
      amount: -32.50, 
      account: 'Chase Debit Card',
      assetType: null
    },
    { 
      id: 10, 
      date: '2025-03-14', 
      description: 'Investment Dividend', 
      category: 'income', 
      amount: 45.20, 
      account: 'Vanguard Brokerage',
      assetType: null
    },
    { 
      id: 11, 
      date: '2025-03-13', 
      description: 'Uber Ride', 
      category: 'transportation', 
      amount: -24.99, 
      account: 'Chase Credit Card',
      assetType: null
    },
    { 
      id: 12, 
      date: '2025-03-12', 
      description: 'Coffee Shop', 
      category: 'food', 
      amount: -6.75, 
      account: 'Chase Debit Card',
      assetType: null
    },
    { 
      id: 13, 
      date: '2025-03-10', 
      description: 'Flight Tickets', 
      category: 'travel', 
      amount: -450.00, 
      account: 'Amex Credit Card',
      assetType: null
    },
    { 
      id: 14, 
      date: '2025-03-09', 
      description: 'Bank Fee', 
      category: 'finance', 
      amount: -35.00, 
      account: 'Chase Checking',
      assetType: null
    },
    { 
      id: 15, 
      date: '2025-03-08', 
      description: 'Internet Bill', 
      category: 'utilities', 
      amount: -75.00, 
      account: 'Bank of America Checking',
      assetType: null
    },
    { 
      id: 16, 
      date: '2025-03-07', 
      description: 'Reliance Industries Purchase', 
      category: 'investment', 
      amount: -1200.00, 
      account: 'Zerodha',
      assetType: 'indianEquity'
    },
    { 
      id: 17, 
      date: '2025-03-05', 
      description: 'Apple Stock Purchase', 
      category: 'investment', 
      amount: -950.00, 
      account: 'Vanguard Brokerage',
      assetType: 'usEquity'
    },
    { 
      id: 18, 
      date: '2025-03-02', 
      description: 'SBI Mutual Fund Investment', 
      category: 'investment', 
      amount: -500.00, 
      account: 'HDFC Bank',
      assetType: 'mutualFunds'
    }
  ]);
  
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    account: 'all',
    dateRange: 'month',
    transactionType: 'all',
    assetType: 'all'
  });

  // State for advanced filters panel
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });

  // State for tabs
  const [tabValue, setTabValue] = useState(0);

  // Transaction dialog state
  const [transactionDialog, setTransactionDialog] = useState({
    open: false,
    mode: 'add', // 'add', 'edit', 'view'
    data: {
      id: null,
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: 'food',
      amount: '',
      account: '',
      assetType: null,
      notes: ''
    },
    error: ''
  });

  // File upload dialog state
  const [uploadDialog, setUploadDialog] = useState({
    open: false,
    assetType: '',
    file: null,
    uploading: false,
    error: '',
    success: false
  });

  // Snackbar notification state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    transactionId: null
  });
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setPage(0); // Reset to first page when filtering
  };
  
  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle transaction dialog
  const openTransactionDialog = (mode, transaction = null) => {
    if (mode === 'add') {
      setTransactionDialog({
        open: true,
        mode: 'add',
        data: {
          id: null,
          date: new Date().toISOString().split('T')[0],
          description: '',
          category: 'food',
          amount: '',
          account: '',
          assetType: null,
          notes: ''
        },
        error: ''
      });
    } else if (mode === 'edit' || mode === 'view') {
      setTransactionDialog({
        open: true,
        mode: mode,
        data: { ...transaction },
        error: ''
      });
    }
  };

  const closeTransactionDialog = () => {
    setTransactionDialog(prev => ({
      ...prev,
      open: false
    }));
  };

  const handleTransactionInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionDialog(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: name === 'amount' ? value : value  // Keep as string for now
      }
    }));
  };

  const handleAmountTypeChange = (e) => {
    const type = e.target.value;
    setTransactionDialog(prev => ({
      ...prev,
      data: {
        ...prev.data,
        amount: prev.data.amount ? 
          (type === 'expense' ? -Math.abs(parseFloat(prev.data.amount)) : Math.abs(parseFloat(prev.data.amount))) :
          prev.data.amount
      }
    }));
  };

  const handleSaveTransaction = () => {
    // Validate
    if (!transactionDialog.data.description || !transactionDialog.data.amount || !transactionDialog.data.account) {
      setTransactionDialog(prev => ({
        ...prev,
        error: 'Please fill in all required fields.'
      }));
      return;
    }

    // Format amount to number
    const amount = parseFloat(transactionDialog.data.amount);
    
    if (transactionDialog.mode === 'add') {
      // Add new transaction
      const newTransaction = {
        ...transactionDialog.data,
        id: Math.max(...transactions.map(t => t.id), 0) + 1,
        amount: amount
      };
      
      setTransactions([...transactions, newTransaction]);
      
      setSnackbar({
        open: true,
        message: 'Transaction added successfully!',
        severity: 'success'
      });
    } else if (transactionDialog.mode === 'edit') {
      // Update existing transaction
      setTransactions(transactions.map(t => 
        t.id === transactionDialog.data.id ? 
        { ...transactionDialog.data, amount: amount } : 
        t
      ));
      
      setSnackbar({
        open: true,
        message: 'Transaction updated successfully!',
        severity: 'success'
      });
    }
    
    closeTransactionDialog();
  };

  // Handle delete transaction
  const openDeleteDialog = (transactionId) => {
    setDeleteDialog({
      open: true,
      transactionId: transactionId
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      transactionId: null
    });
  };

  const handleDeleteTransaction = () => {
    setTransactions(transactions.filter(t => t.id !== deleteDialog.transactionId));
    
    setSnackbar({
      open: true,
      message: 'Transaction deleted successfully!',
      severity: 'success'
    });
    
    closeDeleteDialog();
  };

  // Handle file upload dialog
  const openUploadDialog = () => {
    setUploadDialog({
      open: true,
      assetType: '',
      file: null,
      uploading: false,
      error: '',
      success: false
    });
  };

  const closeUploadDialog = () => {
    setUploadDialog({
      open: false,
      assetType: '',
      file: null,
      uploading: false,
      error: '',
      success: false
    });
  };

  const handleAssetTypeChange = (e) => {
    setUploadDialog(prev => ({
      ...prev,
      assetType: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setUploadDialog(prev => ({
        ...prev,
        file: e.target.files[0],
        error: ''
      }));
    }
  };

  const handleFileUpload = () => {
    // Validate
    if (!uploadDialog.assetType) {
      setUploadDialog(prev => ({
        ...prev,
        error: 'Please select an asset type.'
      }));
      return;
    }

    if (!uploadDialog.file) {
      setUploadDialog(prev => ({
        ...prev,
        error: 'Please select a file to upload.'
      }));
      return;
    }
    
    // Simulate file upload
    setUploadDialog(prev => ({
      ...prev,
      uploading: true,
      error: ''
    }));
    
    setTimeout(() => {
      setUploadDialog(prev => ({
        ...prev,
        uploading: false,
        success: true
      }));
      
      // Wait a moment then close the dialog
      setTimeout(() => {
        closeUploadDialog();
        
        setSnackbar({
          open: true,
          message: 'File uploaded successfully!',
          severity: 'success'
        });
      }, 1500);
    }, 2000);
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Toggle advanced filters
  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };
  
  // Apply filters and sorting to transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Apply tab filter first
    if (tabValue === 1 && transaction.amount <= 0) {
      return false; // Income tab - show only positive amounts
    } else if (tabValue === 2 && transaction.amount >= 0) {
      return false; // Expense tab - show only negative amounts
    } else if (tabValue === 3 && transaction.category !== 'investment') {
      return false; // Investment tab - show only investment category
    }
    
    // Search filter
    if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }
    
    // Account filter
    if (filters.account !== 'all' && transaction.account !== filters.account) {
      return false;
    }
    
    // Transaction type filter
    if (filters.transactionType === 'income' && transaction.amount < 0) {
      return false;
    }
    if (filters.transactionType === 'expense' && transaction.amount > 0) {
      return false;
    }
    if (filters.transactionType === 'investment' && transaction.category !== 'investment') {
      return false;
    }

    // Asset type filter
    if (filters.assetType !== 'all' && transaction.assetType !== filters.assetType) {
      return false;
    }
    
    // Date range filter can be implemented here based on filters.dateRange
    const today = new Date();
    const transactionDate = new Date(transaction.date);
    
    if (filters.dateRange === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (transactionDate < weekAgo) {
        return false;
      }
    } else if (filters.dateRange === 'month') {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      if (transactionDate < monthAgo) {
        return false;
      }
    } else if (filters.dateRange === 'quarter') {
      const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
      if (transactionDate < quarterAgo) {
        return false;
      }
    } else if (filters.dateRange === 'year') {
      const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
      if (transactionDate < yearAgo) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort filtered transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Get transactions for current page
  const paginatedTransactions = sortedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Calculate summary data
  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netAmount = totalIncome - totalExpenses;
  
  // Get unique accounts
  const uniqueAccounts = [...new Set(transactions.map(t => t.account))];
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Common styles
  const styles = {
    // Card styles
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
    summaryCard: {
      borderRadius: 3,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
      height: '100%',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
      }
    },
    cardHover: {
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
      }
    },
    // Background decoration
    headerDecoration: { 
      position: 'absolute', 
      top: -50, 
      right: -50, 
      width: '40%', 
      height: '200%', 
      opacity: 0.1, 
      background: `radial-gradient(circle, ${theme.palette.common.white} 0%, transparent 70%)` 
    },
    // Avatar styles
    avatarStyle: (color) => ({
      bgcolor: alpha(color, 0.1),
      color: color,
      mr: 2
    }),
    // Dialog styles
    dialogPaper: { 
      borderRadius: 3, 
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
    },
    // Tabs styles
    tabsContainer: {
      borderBottom: 1,
      borderColor: 'divider',
      mb: 3
    },
    // Upload area
    uploadArea: {
      border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
      borderRadius: 2,
      padding: 3,
      textAlign: 'center',
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderColor: alpha(theme.palette.primary.main, 0.5)
      }
    },
    // Table styles
    tableContainer: {
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden'
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper elevation={0} sx={styles.headerCard}>
        <Box sx={styles.headerDecoration} />
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" component="h1">
            Transactions
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
            Manage your financial transactions and upload investment data
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(33, 150, 243, 0.2)' }}>
              <Typography color="white" variant="body2" sx={{ opacity: 0.9 }}>
                All
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="white">
                {transactions.length}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(76, 175, 80, 0.2)' }}>
              <Typography color="white" variant="body2" sx={{ opacity: 0.9 }}>
                Income
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="white">
                {transactions.filter(t => t.amount > 0).length}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(211, 47, 47, 0.2)' }}>
              <Typography color="white" variant="body2" sx={{ opacity: 0.9 }}>
                Expense
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="white">
                {transactions.filter(t => t.amount < 0).length}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(156, 39, 176, 0.2)' }}>
              <Typography color="white" variant="body2" sx={{ opacity: 0.9 }}>
                Investment
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="white">
                {transactions.filter(t => t.category === 'investment').length}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<CloudUploadIcon />}
            onClick={openUploadDialog}
            sx={{ 
              mr: 1,
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Upload Investment Data
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => openTransactionDialog('add')}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.9)', 
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)'
              }
            }}
          >
            Add Transaction
          </Button>
        </Box>
      </Paper>
      
      {/* Tabs */}
      <Box sx={styles.tabsContainer}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="transaction tabs" variant="scrollable" scrollButtons="auto">
          <Tab 
            label="All" 
            icon={<LocalAtmIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Income" 
            icon={<ArrowUpwardIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Expense" 
            icon={<ArrowDownwardIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Investment" 
            icon={<TrendingUpIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>
      
      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search transactions..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
          />
          
          <Box>
            <Button 
              startIcon={showAdvancedFilters ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              endIcon={<TuneIcon />}
              onClick={toggleAdvancedFilters}
              variant="outlined"
              size="small"
            >
              {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>
        </Box>
        
        <Collapse in={showAdvancedFilters}>
          <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="date-range-filter-label">Date Range</InputLabel>
                <Select
                  labelId="date-range-filter-label"
                  name="dateRange"
                  value={filters.dateRange}
                  label="Date Range"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="week">Last 7 Days</MenuItem>
                  <MenuItem value="month">Last 30 Days</MenuItem>
                  <MenuItem value="quarter">Last 90 Days</MenuItem>
                  <MenuItem value="year">Last Year</MenuItem>
                  <MenuItem value="all">All Time</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="category-filter-label">Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  name="category"
                  value={filters.category}
                  label="Category"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {Object.entries(categories).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1, color: value.color }}>{value.icon}</Box>
                        {value.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="account-filter-label">Account</InputLabel>
                <Select
                  labelId="account-filter-label"
                  name="account"
                  value={filters.account}
                  label="Account"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="all">All Accounts</MenuItem>
                  {uniqueAccounts.map((account) => (
                    <MenuItem key={account} value={account}>{account}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="type-filter-label">Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  name="transactionType"
                  value={filters.transactionType}
                  label="Type"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="investment">Investment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {tabValue === 1 && (
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="asset-type-filter-label">Asset Type</InputLabel>
                  <Select
                    labelId="asset-type-filter-label"
                    name="assetType"
                    value={filters.assetType}
                    label="Asset Type"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="all">All Assets</MenuItem>
                    {assetTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 1 }}>{type.icon}</Box>
                          {type.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Paper>
      
      {/* Transactions Table */}
      <Paper sx={styles.tableContainer}>
        <TableContainer>
          <Table stickyHeader aria-label="transactions table">
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
                <TableCell 
                  onClick={() => handleSort('date')}
                  sx={{ cursor: 'pointer', fontWeight: 'medium' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Date
                    {sortConfig.key === 'date' && (
                      sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                    )}
                  </Box>
                </TableCell>
                <TableCell 
                  onClick={() => handleSort('description')}
                  sx={{ cursor: 'pointer', fontWeight: 'medium' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Description
                    {sortConfig.key === 'description' && (
                      sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>Category</TableCell>
                <TableCell 
                  onClick={() => handleSort('amount')}
                  sx={{ cursor: 'pointer', fontWeight: 'medium' }}
                  align="right"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    Amount
                    {sortConfig.key === 'amount' && (
                      sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>Account</TableCell>
                {tabValue === 1 && (
                  <TableCell sx={{ fontWeight: 'medium' }}>Asset Type</TableCell>
                )}
                <TableCell align="center" sx={{ fontWeight: 'medium' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="medium">
                      {transaction.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={categories[transaction.category]?.icon}
                      label={categories[transaction.category]?.name}
                      size="small"
                      sx={{ 
                        bgcolor: `${categories[transaction.category]?.color}20`,
                        color: categories[transaction.category]?.color,
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{
                        color: transaction.amount >= 0 ? 'success.main' : 'error.main',
                        fontWeight: 600
                      }}
                    >
                      {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  {tabValue === 1 && (
                    <TableCell>
                      {transaction.assetType && (
                        <Chip
                          icon={assetTypes.find(type => type.id === transaction.assetType)?.icon}
                          label={assetTypes.find(type => type.id === transaction.assetType)?.name}
                          size="small"
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontWeight: 500
                          }}
                        />
                      )}
                    </TableCell>
                  )}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="Edit">
                        <IconButton 
                          size="small"
                          onClick={() => openTransactionDialog('edit', transaction)}
                          sx={{ 
                            mr: 1,
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          size="small"
                          onClick={() => openDeleteDialog(transaction.id)}
                          sx={{ 
                            color: theme.palette.error.main,
                            bgcolor: alpha(theme.palette.error.main, 0.1),
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              
              {paginatedTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={tabValue === 1 ? 7 : 6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No transactions found matching your filters.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<AddIcon />} 
                      sx={{ mt: 2 }}
                      onClick={() => openTransactionDialog('add')}
                    >
                      Add Transaction
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={sortedTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Transaction Dialog */}
      <Dialog 
        open={transactionDialog.open} 
        onClose={closeTransactionDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: styles.dialogPaper }}
      >
        <DialogTitle>
          {transactionDialog.mode === 'add' && 'Add New'}
          {transactionDialog.mode === 'edit' && 'Edit'}
          {transactionDialog.mode === 'view' && 'Details'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                name="date"
                value={transactionDialog.data.date}
                onChange={handleTransactionInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                disabled={transactionDialog.mode === 'view'}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                name="description"
                value={transactionDialog.data.description}
                onChange={handleTransactionInputChange}
                fullWidth
                margin="normal"
                disabled={transactionDialog.mode === 'view'}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={transactionDialog.data.category}
                  onChange={handleTransactionInputChange}
                  label="Category"
                  disabled={transactionDialog.mode === 'view'}
                  required
                >
                  {Object.entries(categories).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1, color: value.color }}>{value.icon}</Box>
                        {value.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account"
                name="account"
                value={transactionDialog.data.account}
                onChange={handleTransactionInputChange}
                fullWidth
                margin="normal"
                disabled={transactionDialog.mode === 'view'}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={typeof transactionDialog.data.amount === 'number' ? 
                  Math.abs(transactionDialog.data.amount) : 
                  transactionDialog.data.amount}
                onChange={handleTransactionInputChange}
                fullWidth
                margin="normal"
                disabled={transactionDialog.mode === 'view'}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth margin="normal">
                <RadioGroup
                  row
                  name="amountType"
                  value={transactionDialog.data.amount < 0 ? 'expense' : 'income'}
                  onChange={handleAmountTypeChange}
                >
                  <FormControlLabel 
                    value="expense" 
                    control={<Radio disabled={transactionDialog.mode === 'view'} />} 
                    label="Expense" 
                  />
                  <FormControlLabel 
                    value="income" 
                    control={<Radio disabled={transactionDialog.mode === 'view'} />} 
                    label="Income" 
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            {transactionDialog.data.category === 'investment' && (
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Asset Type</InputLabel>
                  <Select
                    name="assetType"
                    value={transactionDialog.data.assetType || ''}
                    onChange={handleTransactionInputChange}
                    label="Asset Type"
                    disabled={transactionDialog.mode === 'view'}
                  >
                    <MenuItem value="">None</MenuItem>
                    {assetTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 1 }}>{type.icon}</Box>
                          {type.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                value={transactionDialog.data.notes || ''}
                onChange={handleTransactionInputChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                disabled={transactionDialog.mode === 'view'}
              />
            </Grid>
            
            {transactionDialog.error && (
              <Grid item xs={12}>
                <Alert severity="error">{transactionDialog.error}</Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeTransactionDialog} color="inherit">
            {transactionDialog.mode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {transactionDialog.mode !== 'view' && (
            <Button 
              onClick={handleSaveTransaction} 
              variant="contained" 
              color="primary"
            >
              {transactionDialog.mode === 'add' ? 'Add' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* File Upload Dialog */}
      <Dialog 
        open={uploadDialog.open} 
        onClose={closeUploadDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: styles.dialogPaper }}
      >
        <DialogTitle>Upload Investment Data</DialogTitle>
        <DialogContent dividers>
          {!uploadDialog.success && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Asset Type</InputLabel>
                  <Select
                    value={uploadDialog.assetType}
                    onChange={handleAssetTypeChange}
                    label="Asset Type"
                    required
                    disabled={uploadDialog.uploading}
                  >
                    <MenuItem value="">Select Asset Type</MenuItem>
                    {assetTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 1 }}>{type.icon}</Box>
                          {type.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    Choose the type of investment data you are uploading
                  </FormHelperText>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  style={{ display: 'none' }}
                  id="file-upload"
                  onChange={handleFileChange}
                  disabled={uploadDialog.uploading}
                />
                <label htmlFor="file-upload">
                  <Box sx={styles.uploadArea}>
                    {uploadDialog.file ? (
                      <Box>
                        <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body1" gutterBottom fontWeight="medium">
                          {uploadDialog.file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {(uploadDialog.file.size / 1024).toFixed(2)} KB
                        </Typography>
                        <Button
                          onClick={() => document.getElementById('file-upload').click()}
                          variant="outlined"
                          sx={{ mt: 2 }}
                          disabled={uploadDialog.uploading}
                        >
                          Change File
                        </Button>
                      </Box>
                    ) : (
                      <Box>
                        <CloudUploadIcon sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.7), mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Drag & Drop or Click to Upload
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Supports CSV, Excel files
                        </Typography>
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{ mt: 2 }}
                          disabled={uploadDialog.uploading}
                        >
                          Browse Files
                        </Button>
                      </Box>
                    )}
                  </Box>
                </label>
              </Grid>
              
              {uploadDialog.error && (
                <Grid item xs={12}>
                  <Alert severity="error">{uploadDialog.error}</Alert>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  File Format Guidelines:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • The file should include columns for transaction date, description, amount, and account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • For Indian Equity: Include scrip name, transaction type, quantity, and price
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • For US Equity: Include ticker symbol, transaction type, quantity, and price
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • For Mutual Funds: Include scheme name, NAV, units, and transaction type
                </Typography>
              </Grid>
            </Grid>
          )}
          
          {uploadDialog.success && (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Upload Successful!
              </Typography>
              <Typography variant="body1">
                Your investment data has been processed and imported successfully.
              </Typography>
            </Box>
          )}
          
          {uploadDialog.uploading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          {!uploadDialog.success ? (
            <>
              <Button 
                onClick={closeUploadDialog} 
                color="inherit"
                disabled={uploadDialog.uploading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleFileUpload} 
                variant="contained" 
                color="primary"
                disabled={!uploadDialog.file || !uploadDialog.assetType || uploadDialog.uploading}
              >
                {uploadDialog.uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </>
          ) : (
            <Button 
              onClick={closeUploadDialog} 
              variant="contained" 
              color="primary"
            >
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
        PaperProps={{ sx: styles.dialogPaper }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this record? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeDeleteDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteTransaction} 
            variant="contained" 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Transactions;