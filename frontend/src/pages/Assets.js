// src/pages/Assets.js
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
  Tabs,
  Tab,
  Avatar,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DiamondIcon from '@mui/icons-material/Diamond';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SchoolIcon from '@mui/icons-material/School';
import SavingsIcon from '@mui/icons-material/Savings';
import BusinessIcon from '@mui/icons-material/Business';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const Assets = () => {
  const theme = useTheme();
  
  // Asset categories with their icons
  const assetCategories = {
    cash: { name: 'Cash & Equivalents', icon: <AccountBalanceWalletIcon /> },
    investments: { name: 'Investments', icon: <BusinessIcon /> },
    retirement: { name: 'Retirement Accounts', icon: <SavingsIcon /> },
    realEstate: { name: 'Real Estate', icon: <HomeIcon /> },
    vehicles: { name: 'Vehicles', icon: <DirectionsCarIcon /> },
    personal: { name: 'Personal Property', icon: <DiamondIcon /> },
    other: { name: 'Other Assets', icon: <TrendingUpIcon /> }
  };
  
  // Sample assets data
  const [assets, setAssets] = useState([
    { id: 1, name: 'Checking Account', category: 'cash', value: 5000, institution: 'Chase Bank', lastUpdated: '2025-03-15', notes: 'Main checking account' },
    { id: 2, name: 'Savings Account', category: 'cash', value: 15000, institution: 'Ally Bank', lastUpdated: '2025-03-15', notes: 'Emergency fund' },
    { id: 3, name: 'Brokerage Account', category: 'investments', value: 45000, institution: 'Vanguard', lastUpdated: '2025-03-20', notes: 'Long-term investments' },
    { id: 4, name: '401(k)', category: 'retirement', value: 120000, institution: 'Fidelity', lastUpdated: '2025-03-10', notes: 'Employer-sponsored retirement' },
    { id: 5, name: 'Roth IRA', category: 'retirement', value: 65000, institution: 'Charles Schwab', lastUpdated: '2025-03-12', notes: 'Tax-advantaged retirement' },
    { id: 6, name: 'Primary Residence', category: 'realEstate', value: 450000, institution: '', lastUpdated: '2025-01-15', notes: 'Current market value estimate' },
    { id: 7, name: 'Car 1', category: 'vehicles', value: 25000, institution: '', lastUpdated: '2025-02-01', notes: '2021 Toyota RAV4' },
    { id: 8, name: 'Car 2', category: 'vehicles', value: 18000, institution: '', lastUpdated: '2025-02-01', notes: '2019 Honda Civic' },
    { id: 9, name: 'Jewelry', category: 'personal', value: 8000, institution: '', lastUpdated: '2024-12-10', notes: 'Appraised value' },
    { id: 10, name: 'Art Collection', category: 'personal', value: 12000, institution: '', lastUpdated: '2024-11-05', notes: 'Various pieces' }
  ]);
  
  // Tabs state
  const [currentTab, setCurrentTab] = useState(0);
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentAsset, setCurrentAsset] = useState({
    id: null,
    name: '',
    category: 'cash',
    value: '',
    institution: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  // Calculate summary information
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Group assets by category
  const assetsByCategory = {};
  let assetCategoryTotals = {};
  
  assets.forEach(asset => {
    // Group assets
    if (!assetsByCategory[asset.category]) {
      assetsByCategory[asset.category] = [];
    }
    assetsByCategory[asset.category].push(asset);
    
    // Sum category totals
    if (!assetCategoryTotals[asset.category]) {
      assetCategoryTotals[asset.category] = 0;
    }
    assetCategoryTotals[asset.category] += asset.value;
  });
  
  // Prepare data for pie chart
  const pieChartData = Object.keys(assetCategoryTotals).map(category => ({
    name: assetCategories[category].name,
    value: assetCategoryTotals[category]
  }));
  
  // Colors for pie chart
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    '#9c27b0',
    '#795548'
  ];
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // Dialog handlers
  const handleAddAsset = () => {
    setDialogMode('add');
    setCurrentAsset({
      id: null,
      name: '',
      category: 'cash',
      value: '',
      institution: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setDialogOpen(true);
  };
  
  const handleEditAsset = (asset) => {
    setDialogMode('edit');
    setCurrentAsset({ ...asset });
    setDialogOpen(true);
  };
  
  const handleDeleteAsset = (assetId) => {
    setAssets(assets.filter(asset => asset.id !== assetId));
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAsset({
      ...currentAsset,
      [name]: name === 'value' ? (parseFloat(value) || '') : value
    });
  };
  
  const handleSaveAsset = () => {
    if (dialogMode === 'add') {
      // Add new asset
      const newAsset = {
        ...currentAsset,
        id: Math.max(...assets.map(a => a.id), 0) + 1,
        value: parseFloat(currentAsset.value) || 0
      };
      setAssets([...assets, newAsset]);
    } else {
      // Update existing asset
      setAssets(assets.map(asset => 
        asset.id === currentAsset.id ? {
          ...currentAsset,
          value: parseFloat(currentAsset.value) || 0
        } : asset
      ));
    }
    setDialogOpen(false);
  };
  
  // Helpers
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">{payload[0].name}: ${payload[0].value.toLocaleString()}</Typography>
          <Typography variant="body2" color="text.secondary">
            {((payload[0].value / totalAssets) * 100).toFixed(1)}% of total
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Assets
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleAddAsset}
        >
          Add Asset
        </Button>
      </Box>
      
      {/* Total Assets Card */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h6" gutterBottom>Total Assets</Typography>
        <Typography variant="h3">${totalAssets.toLocaleString()}</Typography>
        <Typography variant="body2">Across {assets.length} assets</Typography>
      </Paper>
      
      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Assets" />
          {Object.entries(assetCategories).map(([key, { name }]) => (
            <Tab key={key} label={name} />
          ))}
        </Tabs>
      </Paper>
      
      {/* Asset Distribution Chart */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Asset Distribution</Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      
      {/* Assets List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {currentTab === 0 ? 'All Assets' : assetCategories[Object.keys(assetCategories)[currentTab - 1]].name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3}>
          {assets
            .filter(asset => currentTab === 0 || asset.category === Object.keys(assetCategories)[currentTab - 1])
            .map(asset => (
              <Grid item xs={12} sm={6} md={4} key={asset.id}>
                <Card sx={{ height: '100%' }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {assetCategories[asset.category].icon}
                      </Avatar>
                    }
                    action={
                      <Box>
                        <IconButton onClick={() => handleEditAsset(asset)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteAsset(asset.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    title={asset.name}
                    subheader={assetCategories[asset.category].name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" color="primary" gutterBottom>
                      ${asset.value.toLocaleString()}
                    </Typography>
                    
                    {asset.institution && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Institution: {asset.institution}
                      </Typography>
                    )}
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Last Updated: {formatDate(asset.lastUpdated)}
                    </Typography>
                    
                    {asset.notes && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {asset.notes}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        
        {assets.filter(asset => currentTab === 0 || asset.category === Object.keys(assetCategories)[currentTab - 1]).length === 0 && (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
            No assets found in this category. Click "Add Asset" to add one.
          </Typography>
        )}
      </Paper>
      
      {/* Add/Edit Asset Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Asset' : 'Edit Asset'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Asset Name"
                fullWidth
                required
                value={currentAsset.name}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="value"
                label="Value"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                required
                value={currentAsset.value}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={currentAsset.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  {Object.entries(assetCategories).map(([key, value]) => (
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
              <TextField
                name="institution"
                label="Institution/Holder"
                fullWidth
                value={currentAsset.institution}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastUpdated"
                label="Last Updated"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={currentAsset.lastUpdated}
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
                value={currentAsset.notes}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveAsset}
            disabled={!currentAsset.name || !currentAsset.value || !currentAsset.lastUpdated}
          >
            {dialogMode === 'add' ? 'Add Asset' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Assets;