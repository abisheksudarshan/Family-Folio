// src/pages/Budget.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Budget = () => {
  const theme = useTheme();
  
  // Sample budget data
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Housing', budgeted: 1500, spent: 1450, color: '#1976d2' },
    { id: 2, category: 'Food', budgeted: 600, spent: 580, color: '#2196f3' },
    { id: 3, category: 'Transportation', budgeted: 400, spent: 380, color: '#03a9f4' },
    { id: 4, category: 'Utilities', budgeted: 300, spent: 285, color: '#00bcd4' },
    { id: 5, category: 'Entertainment', budgeted: 200, spent: 250, color: '#009688' },
    { id: 6, category: 'Healthcare', budgeted: 250, spent: 150, color: '#4caf50' },
    { id: 7, category: 'Personal', budgeted: 150, spent: 145, color: '#8bc34a' },
    { id: 8, category: 'Debt Payments', budgeted: 500, spent: 500, color: '#cddc39' },
  ]);
  
  // Current month
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // State for budget dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentBudget, setCurrentBudget] = useState({
    id: null,
    category: '',
    budgeted: '',
    spent: 0,
    color: '#1976d2'
  });
  
  // State for category menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  
  // Calculate totals
  const totalBudgeted = budgets.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
  
  // Calculate progress percentage for the budget period
  // Assuming we're halfway through the month for this example
  const currentDay = new Date().getDate();
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const budgetPeriodProgress = Math.round((currentDay / daysInMonth) * 100);
  
  // Open the menu for a budget category
  const handleMenuOpen = (event, budgetId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedBudgetId(budgetId);
  };
  
  // Close the menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedBudgetId(null);
  };
  
  // Open dialog to add a new budget
  const handleAddBudget = () => {
    setDialogMode('add');
    setCurrentBudget({
      id: null,
      category: '',
      budgeted: '',
      spent: 0,
      color: '#1976d2'
    });
    setDialogOpen(true);
  };
  
  // Open dialog to edit a budget
  const handleEditBudget = () => {
    const budgetToEdit = budgets.find(budget => budget.id === selectedBudgetId);
    if (budgetToEdit) {
      setDialogMode('edit');
      setCurrentBudget({ ...budgetToEdit });
      setDialogOpen(true);
    }
    handleMenuClose();
  };
  
  // Delete a budget
  const handleDeleteBudget = () => {
    setBudgets(budgets.filter(budget => budget.id !== selectedBudgetId));
    handleMenuClose();
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBudget({
      ...currentBudget,
      [name]: name === 'budgeted' ? parseFloat(value) || '' : value
    });
  };
  
  // Save budget (add or update)
  const handleSaveBudget = () => {
    if (dialogMode === 'add') {
      // Add new budget
      const newBudget = {
        ...currentBudget,
        id: Math.max(...budgets.map(b => b.id), 0) + 1,
        spent: 0
      };
      setBudgets([...budgets, newBudget]);
    } else {
      // Update existing budget
      setBudgets(budgets.map(budget => 
        budget.id === currentBudget.id ? currentBudget : budget
      ));
    }
    setDialogOpen(false);
  };
  
  // Calculate the progress percentage for each budget item
  const calculateProgress = (spent, budgeted) => {
    return (spent / budgeted) * 100;
  };
  
  // Determine color based on spending vs budget
  const getProgressColor = (spent, budgeted) => {
    const ratio = spent / budgeted;
    if (ratio < 0.7) return 'success';
    if (ratio < 0.9) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Budget
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddBudget}
        >
          Add Category
        </Button>
      </Box>
      
      {/* Summary Card */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Budget Overview: {currentMonth}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Month Progress</Typography>
                <Typography variant="body1">{budgetPeriodProgress}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={budgetPeriodProgress} 
                sx={{ height: 10, borderRadius: 5 }} 
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Budget Spent</Typography>
                <Typography variant="body1">{((totalSpent / totalBudgeted) * 100).toFixed(1)}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(totalSpent / totalBudgeted) * 100} 
                color={getProgressColor(totalSpent, totalBudgeted)}
                sx={{ height: 10, borderRadius: 5 }} 
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: theme.palette.primary.main, color: 'white' }}>
                  <Typography variant="h6">${totalBudgeted.toLocaleString()}</Typography>
                  <Typography variant="body2">Total Budgeted</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: theme.palette.secondary.main, color: 'white' }}>
                  <Typography variant="h6">${totalSpent.toLocaleString()}</Typography>
                  <Typography variant="body2">Total Spent</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="h6">${(totalBudgeted - totalSpent).toLocaleString()}</Typography>
                  <Typography variant="body2">Remaining</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
                  <Typography variant="h6">${(totalBudgeted / 30).toFixed(2)}</Typography>
                  <Typography variant="body2">Daily Budget</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Budget Categories */}
      <Typography variant="h6" gutterBottom>Budget Categories</Typography>
      <Grid container spacing={3}>
        {budgets.map((budget) => (
          <Grid item xs={12} sm={6} md={4} key={budget.id}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                action={
                  <IconButton 
                    aria-label="settings" 
                    onClick={(e) => handleMenuOpen(e, budget.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={budget.category}
                subheader={`$${budget.spent.toLocaleString()} of $${budget.budgeted.toLocaleString()}`}
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ 
                  pb: 1, 
                  '& .MuiCardHeader-action': { marginRight: 0 }
                }}
              />
              <CardContent sx={{ pt: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <LinearProgress 
                    variant="determinate"
                    value={calculateProgress(budget.spent, budget.budgeted)}
                    color={getProgressColor(budget.spent, budget.budgeted)}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {calculateProgress(budget.spent, budget.budgeted).toFixed(1)}% used
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${(budget.budgeted - budget.spent).toLocaleString()} left
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Category Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditBudget}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteBudget}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      
      {/* Add/Edit Budget Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add Budget Category' : 'Edit Budget Category'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              name="category"
              label="Category Name"
              type="text"
              fullWidth
              value={currentBudget.category}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              name="budgeted"
              label="Budget Amount"
              type="number"
              fullWidth
              value={currentBudget.budgeted}
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              name="color"
              label="Color"
              type="color"
              fullWidth
              value={currentBudget.color}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSaveBudget} 
            variant="contained"
            disabled={!currentBudget.category || !currentBudget.budgeted}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Budget;