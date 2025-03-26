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
  useTheme
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WorkOutline as WorkIcon,
  AccountBalance as BankIcon,
  Apartment as BusinessIcon,
  LocalAtm as CashIcon,
  CardGiftcard as GiftIcon,
  MonetizationOn as MoneyIcon
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const Income = () => {
  const theme = useTheme();
  
  // Income sources with their icons
  const incomeCategories = {
    salary: { name: 'Salary', icon: <WorkIcon /> },
    investment: { name: 'Investment', icon: <BankIcon /> },
    business: { name: 'Business', icon: <BusinessIcon /> },
    freelance: { name: 'Freelance', icon: <CashIcon /> },
    gifts: { name: 'Gifts', icon: <GiftIcon /> },
    other: { name: 'Other', icon: <MoneyIcon /> }
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
  
  // Sample income data
  const [incomes, setIncomes] = useState([
    { 
      id: 1, 
      name: 'Primary Job', 
      category: 'salary', 
      amount: 5000, 
      frequency: 'monthly',
      nextDate: '2025-04-15',
      notes: 'After taxes',
    },
    { 
      id: 2, 
      name: 'Stock Dividends', 
      category: 'investment', 
      amount: 250, 
      frequency: 'quarterly',
      nextDate: '2025-06-30',
      notes: 'ETF portfolio',
    },
    { 
      id: 3, 
      name: 'Rental Property', 
      category: 'investment', 
      amount: 1200, 
      frequency: 'monthly',
      nextDate: '2025-04-01',
      notes: 'Condo downtown',
    },
    { 
      id: 4, 
      name: 'Freelance Project', 
      category: 'freelance', 
      amount: 1500, 
      frequency: 'oneTime',
      nextDate: '2025-04-20',
      notes: 'Web development project',
    },
    { 
      id: 5, 
      name: 'Side Business', 
      category: 'business', 
      amount: 800, 
      frequency: 'monthly',
      nextDate: '2025-04-28',
      notes: 'Online store',
    }
  ]);
  
  // State for dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentIncome, setCurrentIncome] = useState({
    id: null,
    name: '',
    category: 'salary',
    amount: '',
    frequency: 'monthly',
    nextDate: '',
    notes: ''
  });
  
  // Calculate summary information
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
  
  const totalMonthlyIncome = incomes.reduce((sum, income) => {
    return sum + calculateMonthlyEquivalent(income.amount, income.frequency);
  }, 0);
  
  const oneTimeIncomeTotal = incomes
    .filter(income => income.frequency === 'oneTime')
    .reduce((sum, income) => sum + income.amount, 0);
  
  // Group incomes by category for chart
  const incomeByCategoryData = Object.keys(incomeCategories).map(category => {
    const totalForCategory = incomes
      .filter(income => income.category === category)
      .reduce((sum, income) => sum + calculateMonthlyEquivalent(income.amount, income.frequency), 0);
    
    return {
      category: incomeCategories[category].name,
      amount: totalForCategory
    };
  }).filter(item => item.amount > 0);
  
  // Dialog handlers
  const handleAddIncome = () => {
    setDialogMode('add');
    setCurrentIncome({
      id: null,
      name: '',
      category: 'salary',
      amount: '',
      frequency: 'monthly',
      nextDate: '',
      notes: ''
    });
    setDialogOpen(true);
  };
  
  const handleEditIncome = (income) => {
    setDialogMode('edit');
    setCurrentIncome({ ...income });
    setDialogOpen(true);
  };
  
  const handleDeleteIncome = (incomeId) => {
    setIncomes(incomes.filter(income => income.id !== incomeId));
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentIncome({
      ...currentIncome,
      [name]: value
    });
  };
  
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
  
  // Helpers
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getFrequencyLabel = (frequencyValue) => {
    return frequencies.find(f => f.value === frequencyValue)?.label || frequencyValue;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Income Sources
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleAddIncome}
        >
          Add Income
        </Button>
      </Box>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Monthly Income
              </Typography>
              <Typography variant="h4" component="div">
                ${totalMonthlyIncome.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recurring monthly equivalent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                One-Time Income
              </Typography>
              <Typography variant="h4" component="div">
                ${oneTimeIncomeTotal.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total non-recurring income
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Income Sources
              </Typography>
              <Typography variant="h4" component="div">
                {incomes.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active income streams
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Income Distribution Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Income Distribution</Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={incomeByCategoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis 
                label={{ value: 'Monthly Equivalent ($)', angle: -90, position: 'insideLeft' }} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip formatter={(value) => [`$${value}`, 'Monthly Amount']} />
              <Legend />
              <Bar dataKey="amount" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      
      {/* Income List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Income Sources</Typography>
        <Divider sx={{ mb: 2 }} />
        
        {incomes.length > 0 ? (
          <List>
            {incomes.map(income => (
              <ListItem 
                key={income.id}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => handleEditIncome(income)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteIncome(income.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        sx={{ 
                          mr: 2, 
                          bgcolor: theme.palette.primary.main, 
                          color: 'white',
                          '&:hover': {
                            bgcolor: theme.palette.primary.dark
                          }
                        }}
                        size="small"
                      >
                        {incomeCategories[income.category]?.icon}
                      </IconButton>
                      <Typography variant="subtitle1">{income.name}</Typography>
                      <Chip 
                        label={getFrequencyLabel(income.frequency)}
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ ml: 7 }}>
                      <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                        ${income.amount.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                        • Next: {formatDate(income.nextDate)}
                      </Typography>
                      {income.notes && (
                        <Typography variant="body2" color="text.secondary">
                          {income.notes}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No income sources added yet.</Typography>
        )}
      </Paper>
      
      {/* Add/Edit Income Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add Income Source' : 'Edit Income Source'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Income Name"
                fullWidth
                required
                value={currentIncome.name}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                required
                value={currentIncome.amount}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
                        <Box sx={{ mr: 1 }}>{value.icon}</Box>
                        {value.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              />
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
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveIncome}
            disabled={!currentIncome.name || !currentIncome.amount || !currentIncome.nextDate}
          >
            {dialogMode === 'add' ? 'Add Income' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Income;