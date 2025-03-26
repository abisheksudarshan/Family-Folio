// src/pages/NetWorth.js
import React, { useState, useEffect } from 'react';
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
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DiamondIcon from '@mui/icons-material/Diamond';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import SavingsIcon from '@mui/icons-material/Savings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const NetWorth = () => {
  const theme = useTheme();
  
  // Asset categories with their icons
  const assetCategories = {
    cash: { name: 'Cash & Equivalents', icon: <AccountBalanceWalletIcon /> },
    investments: { name: 'Investments', icon: <BusinessIcon /> },
    retirement: { name: 'Retirement Accounts', icon: <SavingsIcon /> },
    realEstate: { name: 'Real Estate', icon: <HomeIcon /> },
    vehicles: { name: 'Vehicles', icon: <DirectionsCarIcon /> },
    personal: { name: 'Personal Property', icon: <DiamondIcon /> },
    other: { name: 'Other Assets', icon: <AttachMoneyIcon /> }
  };
  
  // Liability categories with their icons
  const liabilityCategories = {
    mortgage: { name: 'Mortgages', icon: <HomeIcon /> },
    carLoans: { name: 'Car Loans', icon: <DirectionsCarIcon /> },
    studentLoans: { name: 'Student Loans', icon: <SchoolIcon /> },
    creditCards: { name: 'Credit Cards', icon: <CreditCardIcon /> },
    personalLoans: { name: 'Personal Loans', icon: <AccountBalanceIcon /> },
    other: { name: 'Other Liabilities', icon: <AttachMoneyIcon /> }
  };
  
  // Sample assets
  const [assets, setAssets] = useState([
    { id: 1, name: 'Checking Account', category: 'cash', value: 5000 },
    { id: 2, name: 'Savings Account', category: 'cash', value: 15000 },
    { id: 3, name: 'Emergency Fund', category: 'cash', value: 10000 },
    { id: 4, name: 'Brokerage Account', category: 'investments', value: 45000 },
    { id: 5, name: '401(k)', category: 'retirement', value: 120000 },
    { id: 6, name: 'Roth IRA', category: 'retirement', value: 65000 },
    { id: 7, name: 'Primary Residence', category: 'realEstate', value: 450000 },
    { id: 8, name: 'Car', category: 'vehicles', value: 25000 },
    { id: 9, name: 'Jewelry', category: 'personal', value: 8000 },
    { id: 10, name: 'Art Collection', category: 'personal', value: 12000 }
  ]);
  
  // Sample liabilities
  const [liabilities, setLiabilities] = useState([
    { id: 1, name: 'Home Mortgage', category: 'mortgage', value: 300000 },
    { id: 2, name: 'Car Loan', category: 'carLoans', value: 15000 },
    { id: 3, name: 'Student Loan', category: 'studentLoans', value: 35000 },
    { id: 4, name: 'Credit Card 1', category: 'creditCards', value: 2500 },
    { id: 5, name: 'Credit Card 2', category: 'creditCards', value: 1800 },
    { id: 6, name: 'Personal Loan', category: 'personalLoans', value: 10000 }
  ]);
  
  // Sample historical net worth data
  const [historicalData, setHistoricalData] = useState([
    { month: 'Jan', netWorth: 370000 },
    { month: 'Feb', netWorth: 375000 },
    { month: 'Mar', netWorth: 378000 },
    { month: 'Apr', netWorth: 382000 },
    { month: 'May', netWorth: 385000 },
    { month: 'Jun', netWorth: 390000 },
    { month: 'Jul', netWorth: 396000 },
    { month: 'Aug', netWorth: 394000 },
    { month: 'Sep', netWorth: 399000 },
    { month: 'Oct', netWorth: 405000 },
    { month: 'Nov', netWorth: 408000 },
    { month: 'Dec', netWorth: 414000 },
    { month: 'Current', netWorth: 0 }
  ]);
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [itemType, setItemType] = useState('asset'); // 'asset' or 'liability'
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    category: '',
    value: ''
  });
  
  // Calculate totals
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  
  // Update the current net worth in historical data
  useEffect(() => {
    setHistoricalData(prev => 
      prev.map(item => 
        item.month === 'Current' ? { ...item, netWorth } : item
      )
    );
  }, [netWorth]);
  
  // Calculate category totals
  const assetCategoryTotals = assets.reduce((totals, asset) => {
    if (!totals[asset.category]) {
      totals[asset.category] = 0;
    }
    totals[asset.category] += asset.value;
    return totals;
  }, {});
  
  const liabilityCategoryTotals = liabilities.reduce((totals, liability) => {
    if (!totals[liability.category]) {
      totals[liability.category] = 0;
    }
    totals[liability.category] += liability.value;
    return totals;
  }, {});
  
  // Calculate net worth change from last month
  const currentMonthNetWorth = historicalData.find(item => item.month === 'Current')?.netWorth || 0;
  const lastMonthNetWorth = historicalData.find(item => item.month === 'Dec')?.netWorth || 0;
  const netWorthChange = currentMonthNetWorth - lastMonthNetWorth;
  const netWorthChangePercentage = lastMonthNetWorth !== 0 
    ? (netWorthChange / lastMonthNetWorth) * 100 
    : 0;
  
  // Open dialog to add a new item
  const handleAddItem = (type) => {
    setDialogMode('add');
    setItemType(type);
    setCurrentItem({
      id: null,
      name: '',
      category: Object.keys(type === 'asset' ? assetCategories : liabilityCategories)[0],
      value: ''
    });
    setDialogOpen(true);
  };
  
  // Open dialog to edit an item
  const handleEditItem = (item, type) => {
    setDialogMode('edit');
    setItemType(type);
    setCurrentItem({ ...item });
    setDialogOpen(true);
  };
  
  // Delete an item
  const handleDeleteItem = (itemId, type) => {
    if (type === 'asset') {
      setAssets(assets.filter(asset => asset.id !== itemId));
    } else {
      setLiabilities(liabilities.filter(liability => liability.id !== itemId));
    }
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === 'value' ? parseFloat(value) || '' : value
    });
  };
  
  // Save item (add or update)
  const handleSaveItem = () => {
    if (dialogMode === 'add') {
      // Add new item
      const newItem = {
        ...currentItem,
        id: Math.max(
          ...(itemType === 'asset' ? assets : liabilities).map(item => item.id),
          0
        ) + 1
      };
      
      if (itemType === 'asset') {
        setAssets([...assets, newItem]);
      } else {
        setLiabilities([...liabilities, newItem]);
      }
    } else {
      // Update existing item
      if (itemType === 'asset') {
        setAssets(assets.map(asset => 
          asset.id === currentItem.id ? currentItem : asset
        ));
      } else {
        setLiabilities(liabilities.map(liability => 
          liability.id === currentItem.id ? currentItem : liability
        ));
      }
    }
    setDialogOpen(false);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Net Worth
        </Typography>
      </Box>
      
      {/* Net Worth Summary */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Net Worth</Typography>
                <Typography variant="h3" color={netWorth >= 0 ? 'success.main' : 'error.main'}>
                  ${netWorth.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                  {netWorthChange >= 0 ? (
                    <NorthIcon fontSize="small" color="success" />
                  ) : (
                    <SouthIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="body2" 
                    color={netWorthChange >= 0 ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    ${Math.abs(netWorthChange).toLocaleString()} ({netWorthChangePercentage.toFixed(1)}%)
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Since last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', bgcolor: 'primary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Total Assets</Typography>
                <Typography variant="h3">
                  ${totalAssets.toLocaleString()}
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => handleAddItem('asset')}
                  sx={{ mt: 2, bgcolor: 'white', color: 'primary.main' }}
                >
                  Add Asset
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', bgcolor: 'secondary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Total Liabilities</Typography>
                <Typography variant="h3">
                  ${totalLiabilities.toLocaleString()}
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => handleAddItem('liability')}
                  sx={{ mt: 2, bgcolor: 'white', color: 'secondary.main' }}
                >
                  Add Liability
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Net Worth Chart */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Net Worth Trend</Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={historicalData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${value.toLocaleString()}`} 
                domain={['auto', 'auto']}
              />
              <ChartTooltip 
                formatter={(value) => `$${value.toLocaleString()}`} 
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
  type="monotone" 
  dataKey="netWorth" 
  stroke={theme.palette.primary.main} 
  activeDot={{ r: 8 }}
  dot={{ r: 4 }}
  name="Net Worth"
/>
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      
      {/* Assets and Liabilities */}
      <Grid container spacing={3}>
        {/* Assets List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Assets</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => handleAddItem('asset')}
                size="small"
              >
                Add Asset
              </Button>
            </Box>
            
            {/* Asset Categories */}
            {Object.keys(assetCategories).map((category) => {
              const categoryTotal = assetCategoryTotals[category] || 0;
              const categoryAssets = assets.filter(asset => asset.category === category);
              
              return categoryAssets.length > 0 ? (
                <Box key={category} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {assetCategories[category].icon}
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {assetCategories[category].name}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${categoryTotal.toLocaleString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  
                  <List dense>
                    {categoryAssets.map((asset) => (
                      <ListItem key={asset.id}>
                        <ListItemText 
                          primary={asset.name} 
                          secondary={`$${asset.value.toLocaleString()}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            size="small" 
                            onClick={() => handleEditItem(asset, 'asset')}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            size="small" 
                            sx={{ ml: 1 }}
                            onClick={() => handleDeleteItem(asset.id, 'asset')}
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
          </Paper>
        </Grid>
        
        {/* Liabilities List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Liabilities</Typography>
              <Button 
                variant="outlined" 
                color="secondary" 
                startIcon={<AddIcon />}
                onClick={() => handleAddItem('liability')}
                size="small"
              >
                Add Liability
              </Button>
            </Box>
            
            {/* Liability Categories */}
            {Object.keys(liabilityCategories).map((category) => {
              const categoryTotal = liabilityCategoryTotals[category] || 0;
              const categoryLiabilities = liabilities.filter(liability => liability.category === category);
              
              return categoryLiabilities.length > 0 ? (
                <Box key={category} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {liabilityCategories[category].icon}
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {liabilityCategories[category].name}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${categoryTotal.toLocaleString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  
                  <List dense>
                    {categoryLiabilities.map((liability) => (
                      <ListItem key={liability.id}>
                        <ListItemText 
                          primary={liability.name} 
                          secondary={`$${liability.value.toLocaleString()}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            size="small" 
                            onClick={() => handleEditItem(liability, 'liability')}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            size="small" 
                            sx={{ ml: 1 }}
                            onClick={() => handleDeleteItem(liability.id, 'liability')}
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
          </Paper>
        </Grid>
      </Grid>
      
      {/* Add/Edit Item Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' 
            ? `Add ${itemType === 'asset' ? 'Asset' : 'Liability'}` 
            : `Edit ${itemType === 'asset' ? 'Asset' : 'Liability'}`
          }
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  value={currentItem.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={currentItem.category}
                    label="Category"
                    onChange={handleInputChange}
                  >
                    {Object.entries(itemType === 'asset' ? assetCategories : liabilityCategories)
                      .map(([key, { name }]) => (
                        <MenuItem key={key} value={key}>{name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="value"
                  label="Value"
                  type="number"
                  fullWidth
                  value={currentItem.value}
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
            onClick={handleSaveItem} 
            variant="contained"
            color={itemType === 'asset' ? 'primary' : 'secondary'}
            disabled={!currentItem.name || !currentItem.value}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NetWorth;