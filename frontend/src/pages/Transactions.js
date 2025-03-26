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
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  useTheme
} from '@mui/material';
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
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';

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
    finance: { name: 'Finance', icon: <AccountBalanceIcon fontSize="small" />, color: '#607d8b' }
  };
  
  // Sample dummy transactions
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      date: '2025-03-21', 
      description: 'Grocery Store', 
      category: 'food', 
      amount: -120.45, 
      account: 'Chase Checking' 
    },
    { 
      id: 2, 
      date: '2025-03-20', 
      description: 'Monthly Rent', 
      category: 'housing', 
      amount: -1500.00, 
      account: 'Bank of America Checking' 
    },
    { 
      id: 3, 
      date: '2025-03-19', 
      description: 'Gas Station', 
      category: 'transportation', 
      amount: -45.75, 
      account: 'Chase Credit Card' 
    },
    { 
      id: 4, 
      date: '2025-03-19', 
      description: 'Netflix Subscription', 
      category: 'entertainment', 
      amount: -15.99, 
      account: 'Amex Credit Card' 
    },
    { 
      id: 5, 
      date: '2025-03-18', 
      description: 'Salary Deposit', 
      category: 'income', 
      amount: 3200.00, 
      account: 'Chase Checking' 
    },
    { 
      id: 6, 
      date: '2025-03-17', 
      description: 'Restaurant', 
      category: 'food', 
      amount: -65.30, 
      account: 'Chase Credit Card' 
    },
    { 
      id: 7, 
      date: '2025-03-16', 
      description: 'Electric Bill', 
      category: 'utilities', 
      amount: -85.42, 
      account: 'Bank of America Checking' 
    },
    { 
      id: 8, 
      date: '2025-03-15', 
      description: 'Online Shopping', 
      category: 'shopping', 
      amount: -125.99, 
      account: 'Amex Credit Card' 
    },
    { 
      id: 9, 
      date: '2025-03-15', 
      description: 'Pharmacy', 
      category: 'healthcare', 
      amount: -32.50, 
      account: 'Chase Debit Card' 
    },
    { 
      id: 10, 
      date: '2025-03-14', 
      description: 'Investment Dividend', 
      category: 'income', 
      amount: 45.20, 
      account: 'Vanguard Brokerage' 
    },
    { 
      id: 11, 
      date: '2025-03-13', 
      description: 'Uber Ride', 
      category: 'transportation', 
      amount: -24.99, 
      account: 'Chase Credit Card' 
    },
    { 
      id: 12, 
      date: '2025-03-12', 
      description: 'Coffee Shop', 
      category: 'food', 
      amount: -6.75, 
      account: 'Chase Debit Card' 
    },
    { 
      id: 13, 
      date: '2025-03-10', 
      description: 'Flight Tickets', 
      category: 'travel', 
      amount: -450.00, 
      account: 'Amex Credit Card' 
    },
    { 
      id: 14, 
      date: '2025-03-09', 
      description: 'Bank Fee', 
      category: 'finance', 
      amount: -35.00, 
      account: 'Chase Checking' 
    },
    { 
      id: 15, 
      date: '2025-03-08', 
      description: 'Internet Bill', 
      category: 'utilities', 
      amount: -75.00, 
      account: 'Bank of America Checking' 
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
    transactionType: 'all'
  });
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
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
  
  // Apply filters and sorting to transactions
  const filteredTransactions = transactions.filter(transaction => {
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
    
    // Date range filter can be implemented here based on filters.dateRange
    
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transactions
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<ImportExportIcon />}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
          >
            Add Transaction
          </Button>
        </Box>
      </Box>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
            <CardContent>
              <Typography color="white" gutterBottom>
                Total Income
              </Typography>
              <Typography variant="h4" component="div">
                ${totalIncome.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: theme.palette.error.main, color: 'white' }}>
            <CardContent>
              <Typography color="white" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h4" component="div">
                ${totalExpenses.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: netAmount >= 0 ? theme.palette.success.main : theme.palette.warning.main, color: 'white' }}>
            <CardContent>
              <Typography color="white" gutterBottom>
                Net Amount
              </Typography>
              <Typography variant="h4" component="div">
                ${netAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Search"
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
              placeholder="Search transactions..."
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
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
          
          <Grid item xs={12} sm={2}>
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
          
          <Grid item xs={12} sm={2}>
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
          
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-filter-label">Type</InputLabel>
              <Select
                labelId="type-filter-label"
                name="transactionType"
                value={filters.transactionType}
                label="Type"
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Transactions</MenuItem>
                <MenuItem value="income">Income Only</MenuItem>
                <MenuItem value="expense">Expenses Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Transactions Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="transactions table">
            <TableHead>
              <TableRow>
                <TableCell 
                  onClick={() => handleSort('date')}
                  sx={{ cursor: 'pointer' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Date
                    {sortConfig.key === 'date' && (
                      sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell 
                  onClick={() => handleSort('description')}
                  sx={{ cursor: 'pointer' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Description
                    {sortConfig.key === 'description' && (
                      sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>Category</TableCell>
                <TableCell 
                  onClick={() => handleSort('amount')}
                  sx={{ cursor: 'pointer' }}
                  align="right"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    Amount
                    {sortConfig.key === 'amount' && (
                      sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
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
                        fontWeight: 500
                      }}
                    >
                      {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.account}</TableCell>
                </TableRow>
              ))}
              
              {paginatedTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No transactions found matching your filters.
                    </Typography>
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
      
      {/* More features can be added here, such as:
          - Transaction details modal
          - Edit transaction functionality
          - Category/account management
          - Data export options
          - Transaction splitting
          - Batch operations
      */}
    </Box>
  );
};

export default Transactions;