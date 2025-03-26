// src/pages/Bills.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
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
  Chip,
  Badge,
  Switch,
  FormControlLabel,
  Avatar,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import RepeatIcon from '@mui/icons-material/Repeat';
import PaymentsIcon from '@mui/icons-material/Payments';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WifiIcon from '@mui/icons-material/Wifi';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Bills = () => {
  const theme = useTheme();
  
  // Bill categories with their icons
  const billCategories = {
    housing: { name: 'Housing', icon: <HomeIcon /> },
    utilities: { name: 'Utilities', icon: <ElectricBoltIcon /> },
    phone: { name: 'Phone & Internet', icon: <WifiIcon /> },
    entertainment: { name: 'Entertainment', icon: <LiveTvIcon /> },
    insurance: { name: 'Insurance', icon: <ApartmentIcon /> },
    transportation: { name: 'Transportation', icon: <DirectionsCarIcon /> },
    subscription: { name: 'Subscriptions', icon: <RepeatIcon /> },
    other: { name: 'Other', icon: <MoreHorizIcon /> }
  };
  
  // Frequency options
  const frequencies = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'biannual', label: 'Bi-Annual' },
    { value: 'annual', label: 'Annual' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-Weekly' }
  ];
  
  // Sample data for bills and subscriptions
  const [bills, setBills] = useState([
    { 
      id: 1, 
      name: 'Mortgage', 
      category: 'housing', 
      amount: 1500, 
      frequency: 'monthly',
      dueDate: '2025-04-05',
      autopay: true,
      notifyBefore: 3,
      notes: 'Primary residence mortgage',
      paid: false
    },
    { 
      id: 2, 
      name: 'Electricity', 
      category: 'utilities', 
      amount: 120, 
      frequency: 'monthly',
      dueDate: '2025-04-10',
      autopay: true,
      notifyBefore: 2,
      notes: '',
      paid: false
    },
    { 
      id: 3, 
      name: 'Water & Sewage', 
      category: 'utilities', 
      amount: 80, 
      frequency: 'monthly',
      dueDate: '2025-04-15',
      autopay: false,
      notifyBefore: 2,
      notes: '',
      paid: false
    },
    { 
      id: 4, 
      name: 'Internet', 
      category: 'phone', 
      amount: 75, 
      frequency: 'monthly',
      dueDate: '2025-04-12',
      autopay: true,
      notifyBefore: 0,
      notes: 'Fiber connection',
      paid: false
    },
    { 
      id: 5, 
      name: 'Cell Phone', 
      category: 'phone', 
      amount: 120, 
      frequency: 'monthly',
      dueDate: '2025-04-20',
      autopay: true,
      notifyBefore: 0,
      notes: 'Family plan with 4 lines',
      paid: false
    },
    { 
      id: 6, 
      name: 'Netflix', 
      category: 'entertainment', 
      amount: 14.99, 
      frequency: 'monthly',
      dueDate: '2025-04-08',
      autopay: true,
      notifyBefore: 0,
      notes: 'Premium plan',
      paid: true
    },
    { 
      id: 7, 
      name: 'Spotify', 
      category: 'entertainment', 
      amount: 9.99, 
      frequency: 'monthly',
      dueDate: '2025-04-18',
      autopay: true,
      notifyBefore: 0,
      notes: 'Individual plan',
      paid: false
    },
    { 
      id: 8, 
      name: 'Amazon Prime', 
      category: 'subscription', 
      amount: 139, 
      frequency: 'annual',
      dueDate: '2025-10-15',
      autopay: true,
      notifyBefore: 7,
      notes: '',
      paid: false
    },
    { 
      id: 9, 
      name: 'Car Insurance', 
      category: 'insurance', 
      amount: 480, 
      frequency: 'biannual',
      dueDate: '2025-06-30',
      autopay: false,
      notifyBefore: 7,
      notes: 'Two cars, full coverage',
      paid: false
    },
    { 
      id: 10, 
      name: 'Home Insurance', 
      category: 'insurance', 
      amount: 1200, 
      frequency: 'annual',
      dueDate: '2025-05-15',
      autopay: false,
      notifyBefore: 14,
      notes: '',
      paid: false
    },
    { 
      id: 11, 
      name: 'Gym Membership', 
      category: 'subscription', 
      amount: 45, 
      frequency: 'monthly',
      dueDate: '2025-04-01',
      autopay: true,
      notifyBefore: 0,
      notes: 'Family plan',
      paid: true
    }
  ]);
  
  // State for dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentBill, setCurrentBill] = useState({
    id: null,
    name: '',
    category: 'other',
    amount: '',
    frequency: 'monthly',
    dueDate: '',
    autopay: false,
    notifyBefore: 0,
    notes: '',
    paid: false
  });
  
  // Filters
  const [showPaid, setShowPaid] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Calculate summary information
  const totalMonthlyBills = bills
    .filter(bill => bill.frequency === 'monthly')
    .reduce((sum, bill) => sum + bill.amount, 0);
  
  const totalQuarterlyBills = bills
    .filter(bill => bill.frequency === 'quarterly')
    .reduce((sum, bill) => sum + bill.amount / 3, 0);
  
  const totalBiannualBills = bills
    .filter(bill => bill.frequency === 'biannual')
    .reduce((sum, bill) => sum + bill.amount / 6, 0);
  
  const totalAnnualBills = bills
    .filter(bill => bill.frequency === 'annual')
    .reduce((sum, bill) => sum + bill.amount / 12, 0);
  
  const totalWeeklyBills = bills
    .filter(bill => bill.frequency === 'weekly')
    .reduce((sum, bill) => sum + bill.amount * 4.33, 0); // 4.33 weeks average per month
  
  const totalBiweeklyBills = bills
    .filter(bill => bill.frequency === 'biweekly')
    .reduce((sum, bill) => sum + bill.amount * 2.17, 0); // 2.17 bi-weeks average per month
  
  const totalMonthlyEstimate = totalMonthlyBills + totalQuarterlyBills + totalBiannualBills + 
    totalAnnualBills + totalWeeklyBills + totalBiweeklyBills;
  
  // Get upcoming bills (due in the next 14 days)
  const today = new Date();
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);
  
  const upcomingBills = bills.filter(bill => {
    const dueDate = new Date(bill.dueDate);
    return !bill.paid && dueDate >= today && dueDate <= twoWeeksFromNow;
  }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  // Filter bills based on criteria
  const filteredBills = bills.filter(bill => {
    // Filter by paid status
    if (!showPaid && bill.paid) return false;
    
    // Filter by category
    if (categoryFilter !== 'all' && bill.category !== categoryFilter) return false;
    
    return true;
  });
  
  // Group bills by category
  const billsByCategory = {};
  filteredBills.forEach(bill => {
    if (!billsByCategory[bill.category]) {
      billsByCategory[bill.category] = [];
    }
    billsByCategory[bill.category].push(bill);
  });
  
  // Helpers
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const calculateDaysUntilDue = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getDueDateStatus = (bill) => {
    if (bill.paid) return 'paid';
    
    const daysUntilDue = calculateDaysUntilDue(bill.dueDate);
    
    if (daysUntilDue < 0) return 'overdue';
    if (daysUntilDue <= 3) return 'due-soon';
    return 'upcoming';
  };
  
  const getFrequencyLabel = (frequencyValue) => {
    return frequencies.find(f => f.value === frequencyValue)?.label || frequencyValue;
  };
  
  // Dialog handlers
  const handleAddBill = () => {
    setDialogMode('add');
    setCurrentBill({
      id: null,
      name: '',
      category: 'other',
      amount: '',
      frequency: 'monthly',
      dueDate: '',
      autopay: false,
      notifyBefore: 0,
      notes: '',
      paid: false
    });
    setDialogOpen(true);
  };
  
  const handleEditBill = (bill) => {
    setDialogMode('edit');
    setCurrentBill({ ...bill });
    setDialogOpen(true);
  };
  
  const handleDeleteBill = (billId) => {
    setBills(bills.filter(bill => bill.id !== billId));
  };
  
  const handleTogglePaid = (billId) => {
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, paid: !bill.paid } : bill
    ));
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCurrentBill({
      ...currentBill,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSaveBill = () => {
    if (dialogMode === 'add') {
      // Add new bill
      const newBill = {
        ...currentBill,
        id: Math.max(...bills.map(b => b.id), 0) + 1,
        amount: parseFloat(currentBill.amount) || 0
      };
      setBills([...bills, newBill]);
    } else {
      // Update existing bill
      setBills(bills.map(bill => 
        bill.id === currentBill.id ? {
          ...currentBill,
          amount: parseFloat(currentBill.amount) || 0
        } : bill
      ));
    }
    setDialogOpen(false);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return theme.palette.success.main;
      case 'overdue':
        return theme.palette.error.main;
      case 'due-soon':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };
  
  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'overdue':
        return 'Overdue';
      case 'due-soon':
        return 'Due Soon';
      default:
        return 'Upcoming';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bills & Subscriptions
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleAddBill}
        >
          Add Bill
        </Button>
      </Box>
  
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Monthly Estimate
              </Typography>
              <Typography variant="h4" component="div">
                ${totalMonthlyEstimate.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total recurring expenses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Upcoming Bills
              </Typography>
              <Typography variant="h4" component="div">
                {upcomingBills.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Due in the next 14 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Automatic Payments
              </Typography>
              <Typography variant="h4" component="div">
                {bills.filter(bill => bill.autopay).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                of {bills.length} total bills
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Paid This Month
              </Typography>
              <Typography variant="h4" component="div">
                ${bills.filter(bill => bill.paid).reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bills.filter(bill => bill.paid).length} bills paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Upcoming Bills */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Upcoming Bills
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {upcomingBills.length > 0 ? (
          <List>
            {upcomingBills.map(bill => {
              const daysUntilDue = calculateDaysUntilDue(bill.dueDate);
              const status = getDueDateStatus(bill);
              
              return (
                <ListItem 
                  key={bill.id}
                  secondaryAction={
                    <Box>
                      <Chip 
                        label={`${daysUntilDue} days`}
                        size="small"
                        color={status === 'due-soon' ? 'warning' : 'primary'}
                        sx={{ mr: 1 }}
                      />
                      <IconButton edge="end" onClick={() => handleEditBill(bill)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleTogglePaid(bill.id)}>
                        <CheckCircleIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                          {billCategories[bill.category]?.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">{bill.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Due {formatDate(bill.dueDate)} • ${bill.amount.toFixed(2)} • {getFrequencyLabel(bill.frequency)}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body1">No upcoming bills in the next 14 days.</Typography>
        )}
      </Paper>
      
      {/* Filter Controls */}
      <Box sx={{ display: 'flex', mb: 3, gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch checked={showPaid} onChange={(e) => setShowPaid(e.target.checked)} />}
          label="Show Paid Bills"
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {Object.entries(billCategories).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1 }}>{value.icon}</Box>
                  {value.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Bills by Category */}
      {Object.keys(billsByCategory).length > 0 ? (
        Object.entries(billsByCategory).map(([category, categoryBills]) => (
          <Paper key={category} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                {billCategories[category]?.icon}
              </Avatar>
              <Typography variant="h6" component="h2">
                {billCategories[category]?.name || 'Other'}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {categoryBills.map(bill => {
                const status = getDueDateStatus(bill);
                
                return (
                  <ListItem 
                    key={bill.id}
                    secondaryAction={
                      <Box>
                        <Chip 
                          label={getStatusLabel(status)}
                          size="small"
                          sx={{ 
                            backgroundColor: getStatusColor(status),
                            color: '#fff',
                            mr: 1
                          }}
                        />
                        <IconButton edge="end" onClick={() => handleEditBill(bill)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDeleteBill(bill.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ mr: 2 }}>
                            {bill.name}
                          </Typography>
                          {bill.autopay && (
                            <Chip 
                              label="Autopay" 
                              size="small" 
                              color="success" 
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            ${bill.amount.toFixed(2)} • {getFrequencyLabel(bill.frequency)} • Due {formatDate(bill.dueDate)}
                          </Typography>
                          {bill.notes && (
                            <Typography variant="body2" color="text.secondary">
                              {bill.notes}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        ))
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">No bills found with the current filters.</Typography>
        </Paper>
      )}
      
      {/* Add/Edit Bill Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Bill' : 'Edit Bill'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Bill Name"
                fullWidth
                required
                value={currentBill.name}
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
                value={currentBill.amount}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={currentBill.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  {Object.entries(billCategories).map(([key, value]) => (
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
                  value={currentBill.frequency}
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
                name="dueDate"
                label="Next Due Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={currentBill.dueDate}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="autopay"
                    checked={currentBill.autopay}
                    onChange={handleInputChange}
                  />
                }
                label="Automatic Payment"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="notify-label">Reminder (days before)</InputLabel>
                <Select
                  labelId="notify-label"
                  name="notifyBefore"
                  value={currentBill.notifyBefore}
                  label="Reminder (days before)"
                  onChange={handleInputChange}
                >
                  <MenuItem value={0}>No reminder</MenuItem>
                  <MenuItem value={1}>1 day before</MenuItem>
                  <MenuItem value={2}>2 days before</MenuItem>
                  <MenuItem value={3}>3 days before</MenuItem>
                  <MenuItem value={5}>5 days before</MenuItem>
                  <MenuItem value={7}>1 week before</MenuItem>
                  <MenuItem value={14}>2 weeks before</MenuItem>
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
                value={currentBill.notes}
                onChange={handleInputChange}
              />
            </Grid>
            
            {dialogMode === 'edit' && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="paid"
                      checked={currentBill.paid}
                      onChange={handleInputChange}
                    />
                  }
                  label="Marked as Paid"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveBill}
            disabled={!currentBill.name || !currentBill.amount || !currentBill.dueDate}
          >
            {dialogMode === 'add' ? 'Add Bill' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bills;