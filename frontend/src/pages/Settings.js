// src/pages/Settings.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Button,
  TextField,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  AccountBalance as AccountBalanceIcon,
  Language as LanguageIcon,
  Payments as PaymentsIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  DeleteForever as DeleteForeverIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Settings = () => {
  const theme = useTheme();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  
  // State for settings
  const [settings, setSettings] = useState({
    // Appearance settings
    theme: 'light',
    primaryColor: 'blue',
    fontSize: 'medium',
    compactView: false,
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    budgetAlerts: true,
    billReminders: true,
    
    // Regional settings
    language: 'en',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    startOfWeek: 'sunday',
    
    // Security settings
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: 30,
    
    // Integration settings
    bankConnections: [
      { id: 1, name: 'Chase Bank', connected: true, lastSync: '2025-03-15T14:30:00' },
      { id: 2, name: 'Bank of America', connected: true, lastSync: '2025-03-20T10:15:00' },
      { id: 3, name: 'Vanguard', connected: false, lastSync: null }
    ]
  });
  
  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // State for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });
  
  // State for custom category management
  const [categories, setCategories] = useState([
    { id: 1, name: 'Groceries', type: 'expense', icon: 'ShoppingCart' },
    { id: 2, name: 'Restaurants', type: 'expense', icon: 'Restaurant' },
    { id: 3, name: 'Mortgage', type: 'expense', icon: 'Home' },
    { id: 4, name: 'Utilities', type: 'expense', icon: 'ElectricBolt' },
    { id: 5, name: 'Entertainment', type: 'expense', icon: 'TheaterComedy' },
    { id: 6, name: 'Salary', type: 'income', icon: 'WorkOutline' },
    { id: 7, name: 'Dividends', type: 'income', icon: 'TrendingUp' }
  ]);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle settings change
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    // Show success notification
    setSnackbar({
      open: true,
      message: 'Setting updated successfully',
      severity: 'success'
    });
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  // Handle confirmation dialog
  const openConfirmDialog = (title, message, onConfirm) => {
    setConfirmDialog({
      open: true,
      title,
      message,
      onConfirm
    });
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false
    });
  };
  
  // Handle bank connection toggle
  const toggleBankConnection = (id) => {
    const updatedConnections = settings.bankConnections.map(connection => {
      if (connection.id === id) {
        return {
          ...connection,
          connected: !connection.connected,
          lastSync: connection.connected ? null : new Date().toISOString()
        };
      }
      return connection;
    });
    
    setSettings({
      ...settings,
      bankConnections: updatedConnections
    });
    
    // Show success notification
    setSnackbar({
      open: true,
      message: 'Bank connection updated',
      severity: 'success'
    });
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ mb: { xs: 2, md: 0 } }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={handleTabChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab icon={<PaletteIcon />} label="Appearance" />
              <Tab icon={<NotificationsIcon />} label="Notifications" />
              <Tab icon={<LanguageIcon />} label="Regional" />
              <Tab icon={<SecurityIcon />} label="Security" />
              <Tab icon={<AccountBalanceIcon />} label="Integrations" />
              <Tab icon={<CategoryIcon />} label="Categories" />
              <Tab icon={<SettingsIcon />} label="Advanced" />
            </Tabs>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            {/* Appearance Settings */}
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>Appearance Settings</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Customize how Family Folio looks and behaves.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="theme-label">Theme</InputLabel>
                      <Select
                        labelId="theme-label"
                        value={settings.theme}
                        label="Theme"
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                      >
                        <MenuItem value="light">Light Mode</MenuItem>
                        <MenuItem value="dark">Dark Mode</MenuItem>
                        <MenuItem value="system">System Default</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="primary-color-label">Primary Color</InputLabel>
                      <Select
                        labelId="primary-color-label"
                        value={settings.primaryColor}
                        label="Primary Color"
                        onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                      >
                        <MenuItem value="blue">Blue</MenuItem>
                        <MenuItem value="purple">Purple</MenuItem>
                        <MenuItem value="green">Green</MenuItem>
                        <MenuItem value="teal">Teal</MenuItem>
                        <MenuItem value="orange">Orange</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="font-size-label">Font Size</InputLabel>
                      <Select
                        labelId="font-size-label"
                        value={settings.fontSize}
                        label="Font Size"
                        onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                      >
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.compactView}
                          onChange={(e) => handleSettingChange('compactView', e.target.checked)}
                        />
                      }
                      label="Use compact view (show more content with less spacing)"
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained">Save Appearance Settings</Button>
                  <Button sx={{ ml: 2 }} variant="outlined">Reset to Defaults</Button>
                </Box>
              </Box>
            )}
            
            {/* Notification Settings */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>Notification Settings</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage how and when you receive notifications and alerts.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive important updates and reports via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Push Notifications" 
                      secondary="Receive alerts in your browser"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.pushNotifications}
                        onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Weekly Financial Reports" 
                      secondary="Get a summary of your finances every week"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.weeklyReports}
                        onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <PaymentsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Budget Alerts" 
                      secondary="Get notified when you approach or exceed budget limits"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.budgetAlerts}
                        onChange={(e) => handleSettingChange('budgetAlerts', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Bill & Subscription Reminders" 
                      secondary="Get reminders before bills and subscriptions are due"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.billReminders}
                        onChange={(e) => handleSettingChange('billReminders', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained">Save Notification Settings</Button>
                </Box>
              </Box>
            )}
            
            {/* Regional Settings */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>Regional Settings</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Configure language, currency, and date formats.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="language-label">Language</InputLabel>
                      <Select
                        labelId="language-label"
                        value={settings.language}
                        label="Language"
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                        <MenuItem value="zh">Chinese</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="currency-label">Currency</InputLabel>
                      <Select
                        labelId="currency-label"
                        value={settings.currency}
                        label="Currency"
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                      >
                        <MenuItem value="USD">US Dollar ($)</MenuItem>
                        <MenuItem value="EUR">Euro (€)</MenuItem>
                        <MenuItem value="GBP">British Pound (£)</MenuItem>
                        <MenuItem value="JPY">Japanese Yen (¥)</MenuItem>
                        <MenuItem value="CAD">Canadian Dollar (C$)</MenuItem>
                        <MenuItem value="AUD">Australian Dollar (A$)</MenuItem>
                        <MenuItem value="INR">Indian Rupee (₹)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="date-format-label">Date Format</InputLabel>
                      <Select
                        labelId="date-format-label"
                        value={settings.dateFormat}
                        label="Date Format"
                        onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                      >
                        <MenuItem value="MM/DD/YYYY">MM/DD/YYYY (US)</MenuItem>
                        <MenuItem value="DD/MM/YYYY">DD/MM/YYYY (Europe)</MenuItem>
                        <MenuItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</MenuItem>
                        <MenuItem value="MMM DD, YYYY">MMM DD, YYYY (Jan 01, 2025)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="week-start-label">Start of Week</InputLabel>
                      <Select
                        labelId="week-start-label"
                        value={settings.startOfWeek}
                        label="Start of Week"
                        onChange={(e) => handleSettingChange('startOfWeek', e.target.value)}
                      >
                        <MenuItem value="sunday">Sunday</MenuItem>
                        <MenuItem value="monday">Monday</MenuItem>
                        <MenuItem value="saturday">Saturday</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained">Save Regional Settings</Button>
                </Box>
              </Box>
            )}
            
            {/* Security Settings */}
            {activeTab === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>Security Settings</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage security options and privacy preferences.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Two-Factor Authentication" 
                      secondary="Add an extra layer of security to your account"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Login Notifications" 
                      secondary="Get notified when someone logs into your account"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.loginNotifications}
                        onChange={(e) => handleSettingChange('loginNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="session-timeout-label">Session Timeout</InputLabel>
                        <Select
                          labelId="session-timeout-label"
                          value={settings.sessionTimeout}
                          label="Session Timeout"
                          onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                        >
                          <MenuItem value={15}>15 minutes</MenuItem>
                          <MenuItem value={30}>30 minutes</MenuItem>
                          <MenuItem value={60}>1 hour</MenuItem>
                          <MenuItem value={120}>2 hours</MenuItem>
                          <MenuItem value={240}>4 hours</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained">Change Password</Button>
                  <Button 
                    sx={{ ml: 2 }} 
                    variant="outlined" 
                    color="error"
                    onClick={() => openConfirmDialog(
                      'Delete Account',
                      'Are you sure you want to delete your account? This action cannot be undone.',
                      () => console.log('Account deletion confirmed')
                    )}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Box>
            )}
            
            {/* Integrations Settings */}
            {activeTab === 4 && (
              <Box>
                <Typography variant="h6" gutterBottom>Integrations & Connections</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Connect your financial accounts and manage external integrations.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Connect New Account
                  </Button>
                </Box>
                
                <List>
                  {settings.bankConnections.map((connection) => (
                    <ListItem key={connection.id}>
                      <ListItemIcon>
                        <AccountBalanceIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={connection.name} 
                        secondary={connection.connected 
                          ? `Last synced: ${formatDate(connection.lastSync)}`
                          : 'Not connected'
                        }
                      />
                      <ListItemSecondaryAction>
                        <Button 
                          variant={connection.connected ? "outlined" : "contained"}
                          size="small"
                          onClick={() => toggleBankConnection(connection.id)}
                          sx={{ mr: 1 }}
                        >
                          {connection.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                        {connection.connected && (
                          <Button 
                            variant="outlined" 
                            size="small"
                          >
                            Sync Now
                          </Button>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>API Access</Typography>
                <Typography variant="body2" paragraph>
                  Manage API keys and authorized applications.
                </Typography>
                
                <Button variant="outlined">
                  Generate API Key
                </Button>
              </Box>
            )}
            
            {/* Categories Settings */}
            {activeTab === 5 && (
              <Box>
                <Typography variant="h6" gutterBottom>Custom Categories</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Customize transaction categories to better organize your finances.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Add New Category
                  </Button>
                </Box>
                
                <List>
                  {categories.map((category) => (
                    <ListItem key={category.id}>
                      <ListItemIcon>
                        <CategoryIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={category.name} 
                        secondary={`Type: ${category.type.charAt(0).toUpperCase() + category.type.slice(1)}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => openConfirmDialog(
                            'Delete Category',
                            `Are you sure you want to delete the "${category.name}" category?`,
                            () => console.log(`Delete category ${category.id}`)
                          )}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ mt: 3 }}>
                  <Button variant="outlined" startIcon={<DownloadIcon />}>
                    Export Categories
                  </Button>
                </Box>
              </Box>
            )}
            
            {/* Advanced Settings */}
            {activeTab === 6 && (
              <Box>
                <Typography variant="h6" gutterBottom>Advanced Settings</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Configure advanced options and manage your data.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="subtitle1" gutterBottom>Data Management</Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item>
                    <Button variant="outlined" startIcon={<DownloadIcon />}>
                      Export All Data
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => openConfirmDialog(
                        'Clear All Data',
                        'Are you sure you want to delete all your financial data? This action cannot be undone.',
                        () => console.log('Clear all data confirmed')
                      )}
                    >
                      Clear All Data
                    </Button>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle1" gutterBottom>Developer Options</Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Enable beta features"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Show developer tools"
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3 }}>
                  <Button variant="outlined">
                    View Application Logs
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleDialogClose}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <Typography>{confirmDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={() => {
              if (confirmDialog.onConfirm) {
                confirmDialog.onConfirm();
              }
              handleDialogClose();
            }} 
            color="error"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;