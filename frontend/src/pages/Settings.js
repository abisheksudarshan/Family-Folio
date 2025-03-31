// src/pages/Settings.js
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, IconButton, InputAdornment,
  List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Tooltip,
  Avatar, alpha, useTheme, Badge, ToggleButtonGroup, ToggleButton, AvatarGroup,
  Tab, Tabs, Switch, FormControlLabel, FormHelperText, FormGroup, Alert, CircularProgress,
  RadioGroup, Radio, Collapse,Checkbox
} from '@mui/material';
import { 
  Save as SaveIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  Info as InfoIcon,
  Key as KeyIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowForward as ArrowForwardIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Cake as CakeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const Settings = () => {
  const theme = useTheme();
  
  // ============================================================
  // COMMON STYLES - Reusable style objects
  // ============================================================
  const styles = {
    // Container styles
    pageContainer: { 
      p: 3 
    },
    // Card styles
    cardBase: {
      p: 3, 
      borderRadius: 3,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
    },
    cardHover: {
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
      }
    },
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
    // Avatar styles
    avatarStyle: (color) => ({
      bgcolor: alpha(color, 0.1),
      color: color,
      mr: 2
    }),
    // Background decoration styles
    headerDecoration: { 
      position: 'absolute', 
      top: -50, 
      right: -50, 
      width: '40%', 
      height: '200%', 
      opacity: 0.1, 
      background: `radial-gradient(circle, ${theme.palette.common.white} 0%, transparent 70%)` 
    },
    // List item styles
    listItem: (color) => ({ 
      borderRadius: 2,
      mb: 1,
      transition: 'all 0.2s ease',
      '&:last-child': {
        mb: 0
      },
      '&:hover': {
        bgcolor: alpha(color, 0.05),
        transform: 'translateX(5px)'
      }
    }),
    // Section header
    sectionHeader: (color) => ({ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      p: 1.5,
      borderRadius: 2,
      bgcolor: alpha(color, 0.05),
      mb: 3,
      boxShadow: `0 2px 8px ${alpha(color, 0.1)}`
    }),
    // Settings tabs
    settingsTabs: {
      mb: 3,
      borderRadius: 3,
      bgcolor: alpha(theme.palette.background.paper, 0.7),
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      '& .MuiTab-root': {
        minHeight: '60px',
        textTransform: 'none',
      }
    },
    // Dialog styles
    dialogPaper: { 
      borderRadius: 3, 
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
    },
    // Section styles
    section: {
      mb: 4
    },
    // Settings item styles
    settingsItem: {
      p: 2,
      borderRadius: 2,
      bgcolor: alpha(theme.palette.background.paper, 0.5),
      mb: 2,
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      '&:hover': {
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.03)'
      }
    }
  };

  // ============================================================
  // STATE DEFINITIONS - Grouped by feature
  // ============================================================
  // UI state
  const [currentTab, setCurrentTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Family member management
  const [familyMembers, setFamilyMembers] = useState([
    { id: 'parent1', name: 'Raj', role: 'parent', avatar: '👨', color: '#1976d2', email: 'raj@example.com', phone: '+91 98765 43210', dob: '1980-05-15', isPrimary: true },
    { id: 'parent2', name: 'Meera', role: 'parent', avatar: '👩', color: '#9c27b0', email: 'meera@example.com', phone: '+91 98765 43211', dob: '1982-07-23', isPrimary: false },
    { id: 'child1', name: 'Arjun', role: 'child', avatar: '👦', color: '#2e7d32', email: 'arjun@example.com', phone: '+91 98765 43212', dob: '2010-03-12', isPrimary: false },
    { id: 'child2', name: 'Anjali', role: 'child', avatar: '👧', color: '#d32f2f', email: 'anjali@example.com', phone: '+91 98765 43213', dob: '2012-11-05', isPrimary: false },
    { id: 'senior', name: 'Dadaji', role: 'senior', avatar: '👴', color: '#795548', email: 'dadaji@example.com', phone: '+91 98765 43214', dob: '1950-01-30', isPrimary: false }
  ]);
  
  // Member dialog state
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [memberDialogMode, setMemberDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentMember, setCurrentMember] = useState({
    id: null,
    name: '',
    role: 'parent',
    avatar: '👤',
    color: '#1976d2',
    email: '',
    phone: '',
    dob: '',
    isPrimary: false
  });
  
  // Dialog state for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  
  // App settings state
  const [appSettings, setAppSettings] = useState({
    // Theme settings
    theme: 'light',
    primaryColor: '#1976d2',
    
    // Currency & Number format
    currency: 'INR',
    locale: 'en-IN',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    reminderNotifications: true,
    
    // Security settings
    twoFactorAuth: false,
    biometricLogin: true,
    autoLockTimeout: 5,
    
    // Privacy settings
    hideBalances: false,
    shareDataForAnalytics: true,
    
    // Data management
    autoBackup: true,
    backupFrequency: 'weekly'
  });
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '+91 98765 43210',
    address: 'Apartment 502, Sunshine Towers, Mumbai 400001',
  });
  
  // Password update state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // ============================================================
  // EVENT HANDLERS - All event handling functions
  // ============================================================
  
  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // Toggle boolean settings
  const handleToggleChange = (setting) => (event) => {
    setAppSettings({
      ...appSettings,
      [setting]: event.target.checked
    });
  };
  
  // Handle dropdown settings
  const handleSelectChange = (setting) => (event) => {
    setAppSettings({
      ...appSettings,
      [setting]: event.target.value
    });
  };
  
  // Handle text input settings
  const handleInputChange = (setting, stateUpdater) => (event) => {
    stateUpdater(prev => ({
      ...prev,
      [setting]: event.target.value
    }));
  };
  
  // Handle save settings
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Handle password update input change
  const handlePasswordChange = (field) => (event) => {
    setPasswordData({
      ...passwordData,
      [field]: event.target.value
    });
    // Clear error when user starts typing
    if (passwordError) {
      setPasswordError('');
    }
  };
  
  // Handle password update
  const handleUpdatePassword = () => {
    // Reset states
    setPasswordError('');
    setPasswordSuccess(false);
    
    // Validation
    if (!passwordData.currentPassword) {
      setPasswordError('Current password is required');
      return;
    }
    
    if (!passwordData.newPassword) {
      setPasswordError('New password is required');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    // Simulate API call to update password
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setPasswordSuccess(true);
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // Family member management functions
  const handleAddMember = () => {
    setMemberDialogMode('add');
    setCurrentMember({
      id: null,
      name: '',
      role: 'parent',
      avatar: '👤',
      color: '#1976d2',
      email: '',
      phone: '',
      dob: '',
      isPrimary: false
    });
    setMemberDialogOpen(true);
  };
  
  const handleEditMember = (member) => {
    setMemberDialogMode('edit');
    setCurrentMember({ ...member });
    setMemberDialogOpen(true);
  };
  
  const handleDeleteMember = (member) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteMember = () => {
    if (memberToDelete) {
      setFamilyMembers(familyMembers.filter(member => member.id !== memberToDelete.id));
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };
  
  const handleMemberDialogClose = () => {
    setMemberDialogOpen(false);
  };
  
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setMemberToDelete(null);
  };
  
  const handleMemberInputChange = (field) => (event) => {
    setCurrentMember({
      ...currentMember,
      [field]: event.target.value
    });
  };
  
  const handleMemberCheckboxChange = (event) => {
    setCurrentMember({
      ...currentMember,
      isPrimary: event.target.checked
    });
  };
  
  const handleSaveMember = () => {
    if (memberDialogMode === 'add') {
      // Add new member
      const newMember = {
        ...currentMember,
        id: `member${Date.now()}` // Generate a unique ID
      };
      
      // If this is the primary member, update others
      if (newMember.isPrimary) {
        const updatedMembers = familyMembers.map(member => ({
          ...member,
          isPrimary: false
        }));
        setFamilyMembers([...updatedMembers, newMember]);
      } else {
        setFamilyMembers([...familyMembers, newMember]);
      }
    } else {
      // Update existing member
      const updatedMembers = familyMembers.map(member => {
        if (member.id === currentMember.id) {
          return currentMember;
        }
        
        // If current member is set as primary, remove primary from others
        if (currentMember.isPrimary && member.id !== currentMember.id) {
          return {
            ...member,
            isPrimary: false
          };
        }
        
        return member;
      });
      
      setFamilyMembers(updatedMembers);
    }
    
    setMemberDialogOpen(false);
  };

  // ============================================================
  // COMPONENT FUNCTIONS - Break UI into logical sections
  // ============================================================

  // 1. Header Component
  const renderHeader = () => (
    <Paper elevation={0} sx={styles.headerCard}>
      <Box sx={styles.headerDecoration} />
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" component="h1">
          Settings
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
          Manage your account settings, family members, and preferences
        </Typography>
      </Box>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64, 
                bgcolor: alpha('#fff', 0.2),
                color: 'white',
                fontSize: 32,
                mr: 2
              }}
            >
              {userProfile.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {userProfile.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {userProfile.email}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
          <Button 
            variant="contained" 
            color="inherit"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
            disabled={isSaving}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.9)', 
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)'
              },
              mr: 2
            }}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          
          <Button 
            variant="outlined" 
            color="inherit"
            startIcon={<LogoutIcon />}
            sx={{ 
              borderColor: 'rgba(255, 255, 255, 0.3)', 
              color: 'white',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.6)',
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      
      {saveSuccess && (
        <Alert 
          severity="success" 
          sx={{ 
            mt: 2,
            bgcolor: 'rgba(76, 175, 80, 0.2)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          Your settings have been saved successfully!
        </Alert>
      )}
    </Paper>
  );

  // 2. Settings Tabs
  const renderSettingsTabs = () => (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      variant="fullWidth"
      sx={styles.settingsTabs}
    >
      <Tab 
        icon={<PersonIcon />} 
        label="Profile" 
        iconPosition="start"
      />
      <Tab 
        icon={<SupervisorAccountIcon />} 
        label="Family Members" 
        iconPosition="start"
      />
      <Tab 
        icon={<PaletteIcon />} 
        label="Appearance" 
        iconPosition="start"
      />
      <Tab 
        icon={<SecurityIcon />} 
        label="Security & Privacy" 
        iconPosition="start"
      />
    </Tabs>
  );

  // 3. Profile Settings Tab
  const renderProfileTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.primary.main)}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Profile Settings
          </Typography>
        </Box>
      </Box>
      
      {/* Personal Information */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.primary.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Personal Information
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              fullWidth
              value={userProfile.name}
              onChange={handleInputChange('name', setUserProfile)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              fullWidth
              type="email"
              value={userProfile.email}
              onChange={handleInputChange('email', setUserProfile)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              fullWidth
              value={userProfile.phone}
              onChange={handleInputChange('phone', setUserProfile)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={styles.section}>
              <Box sx={styles.sectionHeader(theme.palette.primary.main)}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Update Password
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Current Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange('currentPassword')}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="New Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange('newPassword')}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    helperText="At least 8 characters"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Confirm New Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange('confirmPassword')}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdatePassword}
                    disabled={isSaving}
                    startIcon={isSaving ? <CircularProgress size={20} /> : null}
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </Button>
                </Grid>
                
                <Grid item xs={12}>
                  {passwordError && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      {passwordError}
                    </Alert>
                  )}
                  
                  {passwordSuccess && (
                    <Alert severity="success" sx={{ mt: 1 }}>
                      Password updated successfully!
                    </Alert>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={2}
              value={userProfile.address}
              onChange={handleInputChange('address', setUserProfile)}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      
      {/* Notification Preferences */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.primary.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Notification Preferences
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.emailNotifications} 
                onChange={handleToggleChange('emailNotifications')}
                color="primary"
              />
            }
            label="Email Notifications"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
            Receive important updates and reminders via email
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.pushNotifications} 
                onChange={handleToggleChange('pushNotifications')}
                color="primary"
              />
            }
            label="Push Notifications"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
            Receive alerts and reminders on your device
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.reminderNotifications} 
                onChange={handleToggleChange('reminderNotifications')}
                color="primary"
              />
            }
            label="Reminders"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
            Get reminded about upcoming bills and financial events
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
  
  // 4. Family Members Tab
  const renderFamilyMembersTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.secondary.main)}>
            <SupervisorAccountIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Family Members
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<PersonAddIcon />}
          onClick={handleAddMember}
          size="small"
          sx={{ textTransform: 'none' }}
        >
          Add Member
        </Button>
      </Box>
      
      {/* Family Members List */}
      <List sx={{ 
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        borderRadius: 2,
        p: 0
      }}>
        {familyMembers.map((member) => (
          <ListItem 
            key={member.id}
            sx={{
              ...styles.listItem(theme.palette.secondary.main),
              p: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Avatar 
                sx={{ 
                  bgcolor: alpha(member.color, 0.1),
                  color: member.color,
                  mr: 2,
                  fontSize: 24
                }}
              >
                {member.avatar}
              </Avatar>
              
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" fontWeight="medium">
                    {member.name}
                  </Typography>
                  {member.isPrimary && (
                    <Chip 
                      size="small" 
                      label="Primary" 
                      color="primary"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Chip 
                    size="small" 
                    label={member.role.charAt(0).toUpperCase() + member.role.slice(1)} 
                    sx={{ 
                      mr: 1, 
                      bgcolor: alpha(member.color, 0.1),
                      color: member.color,
                      fontWeight: 'medium',
                      height: 20,
                      fontSize: '0.7rem'
                    }} 
                  />
                  <Typography variant="caption" color="text.secondary">
                    {member.email}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <IconButton 
                  size="small"
                  onClick={() => handleEditMember(member)}
                  sx={{ 
                    mr: 1,
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                
                <IconButton 
                  size="small"
                  onClick={() => handleDeleteMember(member)}
                  disabled={member.isPrimary}
                  sx={{ 
                    color: theme.palette.error.main,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    opacity: member.isPrimary ? 0.5 : 1,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        ))}
        
        {familyMembers.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No family members added yet. Click "Add Member" to get started.
            </Typography>
          </Box>
        )}
      </List>
      
      <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.light, 0.1) }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <InfoIcon color="info" sx={{ mr: 1, mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle2" color="info.main" gutterBottom>
              About Family Members
            </Typography>
            <Typography variant="body2">
              Family members can be assigned to different assets, liabilities, and expenses for better tracking. The primary member is the main account holder.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
  
  // 5. Appearance Settings Tab
  const renderAppearanceTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.info.main)}>
            <PaletteIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Appearance Settings
          </Typography>
        </Box>
      </Box>
      
      {/* Theme Settings */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.info.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Theme Settings
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <Typography variant="subtitle2" gutterBottom>
            Theme Mode
          </Typography>
          
          <RadioGroup
            row
            value={appSettings.theme}
            onChange={handleSelectChange('theme')}
          >
            <FormControlLabel 
              value="light" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LightModeIcon sx={{ mr: 1 }} />
                  Light Mode
                </Box>
              } 
            />
            <FormControlLabel 
              value="dark" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DarkModeIcon sx={{ mr: 1 }} />
                  Dark Mode
                </Box>
              } 
            />
            <FormControlLabel 
              value="system" 
              control={<Radio />} 
              label="System Default" 
            />
          </RadioGroup>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <Typography variant="subtitle2" gutterBottom>
            Primary Color
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['#1976d2', '#9c27b0', '#2e7d32', '#d32f2f', '#ed6c02', '#0288d1', '#9e9e9e'].map((color) => (
              <Box
                key={color}
                onClick={() => setAppSettings({...appSettings, primaryColor: color})}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: color,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: appSettings.primaryColor === color ? '2px solid white' : 'none',
                  boxShadow: appSettings.primaryColor === color ? '0 0 0 2px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                {appSettings.primaryColor === color && <CheckCircleIcon sx={{ color: 'white' }} />}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      
      {/* Currency & Number Format */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.info.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Currency & Number Format
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Currency</InputLabel>
              <Select
                value={appSettings.currency}
                onChange={handleSelectChange('currency')}
                label="Currency"
                startAdornment={
                  <InputAdornment position="start">
                    <CurrencyExchangeIcon color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="INR">Indian Rupee (₹)</MenuItem>
                <MenuItem value="USD">US Dollar ($)</MenuItem>
                <MenuItem value="EUR">Euro (€)</MenuItem>
                <MenuItem value="GBP">British Pound (£)</MenuItem>
                <MenuItem value="JPY">Japanese Yen (¥)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Region Format</InputLabel>
              <Select
                value={appSettings.locale}
                onChange={handleSelectChange('locale')}
                label="Region Format"
                startAdornment={
                  <InputAdornment position="start">
                    <LanguageIcon color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="en-IN">India (en-IN)</MenuItem>
                <MenuItem value="en-US">United States (en-US)</MenuItem>
                <MenuItem value="en-GB">United Kingdom (en-GB)</MenuItem>
                <MenuItem value="ja-JP">Japan (ja-JP)</MenuItem>
                <MenuItem value="de-DE">Germany (de-DE)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      {/* Preview */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.info.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Preview
          </Typography>
        </Box>
        
        <Box sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: appSettings.theme === 'dark' ? '#121212' : '#ffffff',
          color: appSettings.theme === 'dark' ? '#ffffff' : '#121212',
          border: '1px solid ' + alpha(theme.palette.divider, 0.1),
        }}>
          <Typography variant="h6" gutterBottom sx={{ color: appSettings.primaryColor }}>
            Sample Heading
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            This is how your content will look with the selected theme settings.
          </Typography>
          
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              sx={{ bgcolor: appSettings.primaryColor, mr: 2 }}
            >
              Primary Button
            </Button>
            
            <Button 
              variant="outlined" 
              sx={{ color: appSettings.primaryColor, borderColor: appSettings.primaryColor }}
            >
              Secondary Button
            </Button>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Currency Format Example:
            </Typography>
            <Typography variant="h6">
              {new Intl.NumberFormat(appSettings.locale, {
                style: 'currency',
                currency: appSettings.currency,
                minimumFractionDigits: 0
              }).format(1234567)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
  
  // 6. Security and Privacy Tab
  const renderSecurityPrivacyTab = () => (
    <Paper 
      elevation={0}
      sx={{ 
        ...styles.cardBase,
        ...styles.cardHover,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={styles.avatarStyle(theme.palette.warning.main)}>
            <SecurityIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Security & Privacy
          </Typography>
        </Box>
      </Box>
      
      {/* Security Settings */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.warning.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Security Settings
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.twoFactorAuth} 
                onChange={handleToggleChange('twoFactorAuth')}
                color="primary"
              />
            }
            label="Two-Factor Authentication (2FA)"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
            Add an extra layer of security to your account
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.biometricLogin} 
                onChange={handleToggleChange('biometricLogin')}
                color="primary"
              />
            }
            label="Biometric Login"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
            Use fingerprint or face recognition to log in (on supported devices)
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <Typography variant="subtitle2" gutterBottom>
            Auto-Lock Timeout
          </Typography>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <Select
              value={appSettings.autoLockTimeout}
              onChange={handleSelectChange('autoLockTimeout')}
              size="small"
            >
              <MenuItem value={1}>1 minute</MenuItem>
              <MenuItem value={5}>5 minutes</MenuItem>
              <MenuItem value={15}>15 minutes</MenuItem>
              <MenuItem value={30}>30 minutes</MenuItem>
              <MenuItem value={0}>Never</MenuItem>
            </Select>
            <FormHelperText>
              Automatically lock the app after period of inactivity
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
      
      {/* Privacy Settings */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.warning.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Privacy Settings
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.hideBalances} 
                onChange={handleToggleChange('hideBalances')}
                color="primary"
              />
            }
            label="Hide Balances by Default"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
            Mask financial information until explicitly revealed
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.shareDataForAnalytics} 
                onChange={handleToggleChange('shareDataForAnalytics')}
                color="primary"
              />
            }
            label="Share Anonymous Data for Analytics"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
            Help us improve the app by sharing anonymous usage data
          </Typography>
        </Box>
      </Box>
      
      {/* Data Management */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader(theme.palette.warning.main)}>
          <Typography variant="subtitle1" fontWeight="medium">
            Data Management
          </Typography>
        </Box>
        
        <Box sx={styles.settingsItem}>
          <FormControlLabel
            control={
              <Switch 
                checked={appSettings.autoBackup} 
                onChange={handleToggleChange('autoBackup')}
                color="primary"
              />
            }
            label="Automatic Backup"
          />
          
          <Collapse in={appSettings.autoBackup}>
            <Box sx={{ ml: 6.5, mt: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Backup Frequency</InputLabel>
                <Select
                  value={appSettings.backupFrequency}
                  onChange={handleSelectChange('backupFrequency')}
                  label="Backup Frequency"
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Collapse>
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              sx={{ textTransform: 'none' }}
            >
              Export Data
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<CloudUploadIcon />}
              sx={{ textTransform: 'none' }}
            >
              Import Data
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
  
  // 7. Family Member Dialog
  const renderMemberDialog = () => (
    <Dialog
      open={memberDialogOpen}
      onClose={handleMemberDialogClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle>
        {memberDialogMode === 'add' ? 'Add Family Member' : 'Edit Family Member'}
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={currentMember.name}
              onChange={handleMemberInputChange('name')}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={currentMember.role}
                onChange={handleMemberInputChange('role')}
                label="Role"
              >
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="child">Child</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={currentMember.email}
              onChange={handleMemberInputChange('email')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              fullWidth
              value={currentMember.phone}
              onChange={handleMemberInputChange('phone')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={currentMember.dob}
              onChange={handleMemberInputChange('dob')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Avatar</InputLabel>
              <Select
                value={currentMember.avatar}
                onChange={handleMemberInputChange('avatar')}
                label="Avatar"
              >
                <MenuItem value="👤">👤 Default</MenuItem>
                <MenuItem value="👨">👨 Man</MenuItem>
                <MenuItem value="👩">👩 Woman</MenuItem>
                <MenuItem value="👦">👦 Boy</MenuItem>
                <MenuItem value="👧">👧 Girl</MenuItem>
                <MenuItem value="👴">👴 Elderly Man</MenuItem>
                <MenuItem value="👵">👵 Elderly Woman</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                value={currentMember.color}
                onChange={handleMemberInputChange('color')}
                label="Color"
                renderValue={(value) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: '50%', 
                        bgcolor: value,
                        mr: 1
                      }}
                    />
                    {value}
                  </Box>
                )}
              >
                <MenuItem value="#1976d2">Blue</MenuItem>
                <MenuItem value="#9c27b0">Purple</MenuItem>
                <MenuItem value="#2e7d32">Green</MenuItem>
                <MenuItem value="#d32f2f">Red</MenuItem>
                <MenuItem value="#ed6c02">Orange</MenuItem>
                <MenuItem value="#0288d1">Light Blue</MenuItem>
                <MenuItem value="#795548">Brown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentMember.isPrimary}
                  onChange={handleMemberCheckboxChange}
                  name="isPrimary"
                />
              }
              label="Set as primary member"
            />
            <FormHelperText>
              The primary member is the main account holder. Setting a new primary member will unset the current one.
            </FormHelperText>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleMemberDialogClose} color="inherit">
          Cancel
        </Button>
        
        <Button 
          onClick={handleSaveMember}
          variant="contained" 
          color="primary"
          disabled={!currentMember.name}
        >
          {memberDialogMode === 'add' ? 'Add Member' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  // 8. Delete Confirmation Dialog
  const renderDeleteConfirmationDialog = () => (
    <Dialog
      open={deleteDialogOpen}
      onClose={handleDeleteDialogClose}
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle>
        Confirm Delete
      </DialogTitle>
      
      <DialogContent>
        <Typography>
          Are you sure you want to delete {memberToDelete?.name}? This action cannot be undone.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleDeleteDialogClose} color="inherit">
          Cancel
        </Button>
        
        <Button 
          onClick={confirmDeleteMember}
          variant="contained" 
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  // ============================================================
  // MAIN RENDER - The settings layout
  // ============================================================
  return (
    <Box sx={styles.pageContainer}>
      {/* Header */}
      {renderHeader()}

      {/* Tabs */}
      {renderSettingsTabs()}
      
      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && renderProfileTab()}
        {currentTab === 1 && renderFamilyMembersTab()}
        {currentTab === 2 && renderAppearanceTab()}
        {currentTab === 3 && renderSecurityPrivacyTab()}
      </Box>
      
      {/* Dialogs */}
      {renderMemberDialog()}
      {renderDeleteConfirmationDialog()}
    </Box>
  );
};

export default Settings;