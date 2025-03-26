// src/pages/Profile.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  InputAdornment,
  Switch,
  FormControlLabel,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const theme = useTheme();
  const { user, updateUser } = useAuth();
  
  // States for profile editing
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    occupation: user?.occupation || '',
  });
  
  // States for password change dialog
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // States for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    billReminders: true,
    budgetAlerts: true,
    investmentAlerts: true
  });
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Toggle edit mode
  const handleToggleEdit = () => {
    setEditing(!editing);
    
    // If canceling edit, reset form data
    if (editing) {
      setProfileData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        zipCode: user?.zipCode || '',
        occupation: user?.occupation || ''
      });
    }
  };
  
  // Handle profile save
  const handleSaveProfile = () => {
    // In a real app, you would call API here
    updateUser(profileData);
    
    setEditing(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully',
      severity: 'success'
    });
  };
  
  // Handle password change dialog
  const handlePasswordDialog = () => {
    setPasswordDialog(true);
  };
  
  // Handle password dialog close
  const handlePasswordDialogClose = () => {
    setPasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowCurrentPassword(false);
    setShowNewPassword(false);
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  // Handle password change submit
  const handlePasswordSubmit = () => {
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match',
        severity: 'error'
      });
      return;
    }
    
    // In a real app, you would call API here to change password
    
    handlePasswordDialogClose();
    setSnackbar({
      open: true,
      message: 'Password updated successfully',
      severity: 'success'
    });
  };
  
  // Handle notification setting changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
    
    // In a real app, you would call API here to update settings
    
    setSnackbar({
      open: true,
      message: 'Notification settings updated',
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
  
  // Get user initials for avatar
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    return 'U';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Button 
          variant={editing ? "outlined" : "contained"}
          startIcon={editing ? <SaveIcon /> : <EditIcon />}
          onClick={editing ? handleSaveProfile : handleToggleEdit}
          color={editing ? "primary" : "primary"}
        >
          {editing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Profile Information Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2rem',
                  mb: 2
                }}
              >
                {getInitials()}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
              {user?.occupation && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {user.occupation}
                </Typography>
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LockIcon />}
              onClick={handlePasswordDialog}
              sx={{ mb: 2 }}
            >
              Change Password
            </Button>
          </Paper>
        </Grid>
        
        {/* Profile Details Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  value={profileData.email}
                  onChange={handleProfileChange}
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  fullWidth
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  value={profileData.address}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="City"
                  name="city"
                  fullWidth
                  value={profileData.city}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="State"
                  name="state"
                  fullWidth
                  value={profileData.state}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Zip Code"
                  name="zipCode"
                  fullWidth
                  value={profileData.zipCode}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Occupation"
                  name="occupation"
                  fullWidth
                  value={profileData.occupation}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Notification Settings Card */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Notification Settings</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      name="emailNotifications"
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onChange={handleNotificationChange}
                      name="pushNotifications"
                      color="primary"
                    />
                  }
                  label="Push Notifications"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onChange={handleNotificationChange}
                      name="weeklyReports"
                      color="primary"
                    />
                  }
                  label="Weekly Financial Reports"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.billReminders}
                      onChange={handleNotificationChange}
                      name="billReminders"
                      color="primary"
                    />
                  }
                  label="Bill & Subscription Reminders"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.budgetAlerts}
                      onChange={handleNotificationChange}
                      name="budgetAlerts"
                      color="primary"
                    />
                  }
                  label="Budget Alerts"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.investmentAlerts}
                      onChange={handleNotificationChange}
                      name="investmentAlerts"
                      color="primary"
                    />
                  }
                  label="Investment Alerts"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Security & Privacy Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Security & Privacy</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Two-Factor Authentication
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Add an extra layer of security to your account.
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Enable 2FA
              </Button>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Login Sessions
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Manage your active sessions across devices.
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Manage Sessions
              </Button>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Privacy Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Control how your data is used and stored.
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Review Settings
              </Button>
              </Box>
          </Paper>
        </Grid>
        
        {/* Data & Storage Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StorageIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Data & Storage</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Account Data
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Download all your financial data in CSV format.
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Export Data
              </Button>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Data Connections
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Manage integrations with your financial institutions.
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Manage Connections
              </Button>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Delete Account
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Permanently delete your account and all associated data.
              </Typography>
              <Button variant="outlined" color="error" sx={{ mt: 1 }}>
                Delete Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onClose={handlePasswordDialogClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              label="Current Password"
              type={showCurrentPassword ? 'text' : 'password'}
              fullWidth
              required
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              fullWidth
              required
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Confirm New Password"
              type={showNewPassword ? 'text' : 'password'}
              fullWidth
              required
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              error={passwordData.confirmPassword !== '' && passwordData.newPassword !== passwordData.confirmPassword}
              helperText={
                passwordData.confirmPassword !== '' && 
                passwordData.newPassword !== passwordData.confirmPassword ? 
                'Passwords do not match' : ''
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose}>Cancel</Button>
          <Button 
            onClick={handlePasswordSubmit}
            variant="contained"
            disabled={
              !passwordData.currentPassword || 
              !passwordData.newPassword || 
              !passwordData.confirmPassword ||
              passwordData.newPassword !== passwordData.confirmPassword
            }
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;