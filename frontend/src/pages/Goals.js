// src/pages/Goals.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
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
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Goals = () => {
  const theme = useTheme();
  
  // Sample goals data with different types and timelines
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      name: 'Emergency Fund', 
      type: 'saving', 
      targetAmount: 10000, 
      currentAmount: 5000, 
      targetDate: '2025-12-31',
      priority: 'high',
      description: 'Build a 3-month emergency fund for unexpected expenses',
      monthlySaving: 300
    },
    { 
      id: 2, 
      name: 'Home Down Payment', 
      type: 'saving', 
      targetAmount: 60000, 
      currentAmount: 15000, 
      targetDate: '2027-05-30',
      priority: 'medium',
      description: 'Save for a 20% down payment on a home purchase',
      monthlySaving: 1000
    },
    { 
      id: 3, 
      name: 'Car Loan', 
      type: 'debt', 
      targetAmount: 25000, 
      currentAmount: 12000, 
      targetDate: '2026-03-15',
      priority: 'medium',
      description: 'Pay off car loan',
      monthlySaving: 550
    },
    { 
      id: 4, 
      name: 'Vacation Fund', 
      type: 'saving', 
      targetAmount: 5000, 
      currentAmount: 2200, 
      targetDate: '2025-06-30',
      priority: 'low',
      description: 'Save for family vacation to Europe',
      monthlySaving: 200
    },
    { 
      id: 5, 
      name: 'Student Loan', 
      type: 'debt', 
      targetAmount: 35000, 
      currentAmount: 18000, 
      targetDate: '2028-01-01',
      priority: 'high',
      description: 'Pay off student loan debt',
      monthlySaving: 450
    }
  ]);
  
  // State for goal dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentGoal, setCurrentGoal] = useState({
    id: null,
    name: '',
    type: 'saving',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    priority: 'medium',
    description: '',
    monthlySaving: ''
  });
  
  // Calculate overall progress
  const totalSavingGoalAmount = goals
    .filter(goal => goal.type === 'saving')
    .reduce((sum, goal) => sum + goal.targetAmount, 0);
  
  const totalSavingCurrentAmount = goals
    .filter(goal => goal.type === 'saving')
    .reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  const totalDebtGoalAmount = goals
    .filter(goal => goal.type === 'debt')
    .reduce((sum, goal) => sum + goal.targetAmount, 0);
  
  const totalDebtCurrentAmount = goals
    .filter(goal => goal.type === 'debt')
    .reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  const totalMonthlySaving = goals.reduce((sum, goal) => sum + goal.monthlySaving, 0);
  
  // Open dialog to add a new goal
  const handleAddGoal = () => {
    setDialogMode('add');
    setCurrentGoal({
      id: null,
      name: '',
      type: 'saving',
      targetAmount: '',
      currentAmount: '',
      targetDate: '',
      priority: 'medium',
      description: '',
      monthlySaving: ''
    });
    setDialogOpen(true);
  };
  
  // Open dialog to edit a goal
  const handleEditGoal = (goal) => {
    setDialogMode('edit');
    setCurrentGoal({ ...goal });
    setDialogOpen(true);
  };
  
  // Delete a goal
  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentGoal({
      ...currentGoal,
      [name]: ['targetAmount', 'currentAmount', 'monthlySaving'].includes(name) 
        ? parseFloat(value) || '' 
        : value
    });
  };
  
  // Save goal (add or update)
  const handleSaveGoal = () => {
    if (dialogMode === 'add') {
      // Add new goal
      const newGoal = {
        ...currentGoal,
        id: Math.max(...goals.map(g => g.id), 0) + 1
      };
      setGoals([...goals, newGoal]);
    } else {
      // Update existing goal
      setGoals(goals.map(goal => 
        goal.id === currentGoal.id ? currentGoal : goal
      ));
    }
    setDialogOpen(false);
  };
  
  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate time remaining
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
  
  // Get priority color
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
  
  // Get progress color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage < 25) return 'error';
    if (percentage < 75) return 'warning';
    return 'success';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financial Goals
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddGoal}
        >
          Add Goal
        </Button>
      </Box>
      
      {/* Summary Cards */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Goals Overview</Typography>
        <Grid container spacing={3}>
          {/* Savings Goals */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 2, 
                textAlign: 'center', 
                bgcolor: theme.palette.primary.main, 
                color: 'white' 
              }}
            >
              <Typography variant="body2">Savings Progress</Typography>
              <Typography variant="h6">${totalSavingCurrentAmount.toLocaleString()} / ${totalSavingGoalAmount.toLocaleString()}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress(totalSavingCurrentAmount, totalSavingGoalAmount)} 
                sx={{ height: 8, borderRadius: 4, mt: 1, bgcolor: 'rgba(255,255,255,0.3)' }}
                color="inherit"
              />
            </Paper>
          </Grid>
          
          {/* Debt Goals */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 2, 
                textAlign: 'center', 
                bgcolor: theme.palette.secondary.main, 
                color: 'white' 
              }}
            >
              <Typography variant="body2">Debt Payoff</Typography>
              <Typography variant="h6">${totalDebtCurrentAmount.toLocaleString()} / ${totalDebtGoalAmount.toLocaleString()}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress(totalDebtCurrentAmount, totalDebtGoalAmount)} 
                sx={{ height: 8, borderRadius: 4, mt: 1, bgcolor: 'rgba(255,255,255,0.3)' }}
                color="inherit"
              />
            </Paper>
          </Grid>
          
          {/* Total Goals */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 2, 
                textAlign: 'center', 
                bgcolor: 'success.main', 
                color: 'white' 
              }}
            >
              <Typography variant="body2">Goals Created</Typography>
              <Typography variant="h6">{goals.length}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Typography variant="body2">{goals.filter(g => g.type === 'saving').length} Savings</Typography>
                <Typography variant="body2" sx={{ mx: 1 }}>•</Typography>
                <Typography variant="body2">{goals.filter(g => g.type === 'debt').length} Debt</Typography>
              </Box>
            </Paper>
          </Grid>
          
          {/* Monthly Commitment */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 2, 
                textAlign: 'center', 
                bgcolor: 'info.main', 
                color: 'white' 
              }}
            >
              <Typography variant="body2">Monthly Commitment</Typography>
              <Typography variant="h6">${totalMonthlySaving.toLocaleString()}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Allocated to all goals
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Goals List */}
      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={6} lg={4} key={goal.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {goal.name}
                    <Chip 
                      label={goal.type === 'saving' ? 'Saving' : 'Debt'} 
                      size="small"
                      color={goal.type === 'saving' ? 'primary' : 'secondary'}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                }
                subheader={
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      icon={<FlagIcon />}
                      label={`${goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority`}
                      size="small"
                      sx={{ 
                        backgroundColor: getPriorityColor(goal.priority),
                        color: 'white',
                        mr: 1,
                        mb: 1
                      }}
                    />
                    <Chip
                      icon={<CalendarTodayIcon />}
                      label={formatDate(goal.targetDate)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                }
              />
              <CardContent sx={{ pt: 0, pb: 1, flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {goal.description}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">
                    ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(0)}%
                  </Typography>
                </Box>
                
                <LinearProgress 
                  variant="determinate" 
                  value={calculateProgress(goal.currentAmount, goal.targetAmount)} 
                  color={getProgressColor(calculateProgress(goal.currentAmount, goal.targetAmount))}
                  sx={{ height: 8, borderRadius: 4, mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tooltip title="Monthly contribution">
                    <Chip
                      icon={<AttachMoneyIcon />}
                      label={`$${goal.monthlySaving.toLocaleString()}/mo`}
                      size="small"
                      variant="outlined"
                    />
                  </Tooltip>
                  
                  <Tooltip title="Time remaining">
  <Chip
    icon={<HourglassTopIcon />}
    label={calculateTimeRemaining(goal.targetDate)}
    size="small"
    variant="outlined"
  />
</Tooltip>
              </Box>
            </CardContent>
            <CardActions sx={{ mt: 'auto', pt: 0 }}>
              <Button 
                size="small" 
                startIcon={<EditIcon />}
                onClick={() => handleEditGoal(goal)}
              >
                Edit
              </Button>
              <Button 
                size="small" 
                color="error" 
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteGoal(goal.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    
    {/* Add/Edit Goal Dialog */}
    <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dialogMode === 'add' ? 'Add Financial Goal' : 'Edit Financial Goal'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                name="name"
                label="Goal Name"
                fullWidth
                value={currentGoal.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
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
            
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={currentGoal.description}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="targetAmount"
                label="Target Amount"
                type="number"
                fullWidth
                value={currentGoal.targetAmount}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={currentGoal.priority}
                  label="Priority"
                  onChange={handleInputChange}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="monthlySaving"
                label="Monthly Contribution"
                type="number"
                fullWidth
                value={currentGoal.monthlySaving}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button 
          onClick={handleSaveGoal} 
          variant="contained"
          disabled={!currentGoal.name || !currentGoal.targetAmount || !currentGoal.currentAmount || !currentGoal.targetDate || !currentGoal.monthlySaving}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
);
};

export default Goals;