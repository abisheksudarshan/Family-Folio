// src/components/Navigation.js
import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider, 
  Avatar,
  Badge,
  Tooltip,
  Button,
  useMediaQuery,
  alpha
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PieChartIcon from '@mui/icons-material/PieChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const drawerWidth = 280;

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // State to track opened submenu items
  const [openSubMenus, setOpenSubMenus] = useState({
    assetsLiabilities: false,
    spending: false,
    planning: false
  });

  // Check which menu item is active based on current path
  useEffect(() => {
    // Automatically open submenu of the active route
    const currentPath = location.pathname;
    
    if (['/assets-liabilities', '/portfolio-breakdown'].includes(currentPath)) {
      setOpenSubMenus(prev => ({ ...prev, assetsLiabilities: true }));
    } else if (['/expense-breakdown', '/bills-subscriptions', '/credit-card-strategy'].includes(currentPath)) {
      setOpenSubMenus(prev => ({ ...prev, spending: true }));
    } else if (['/goals', '/income', '/tax-planning'].includes(currentPath)) {
      setOpenSubMenus(prev => ({ ...prev, planning: true }));
    }
  }, [location.pathname]);

  // Toggle submenu open state
  const handleToggleSubMenu = (menu) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Check if a route is active
  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  // Check if a route belongs to a submenu
  const isInSubMenu = (submenu, path) => {
    if (submenu === 'assetsLiabilities') {
      return ['/assets-liabilities', '/portfolio-breakdown'].includes(path);
    } else if (submenu === 'spending') {
      return ['/expense-breakdown', '/bills-subscriptions','/credit-card-strategy'].includes(path);
    } else if (submenu === 'planning') {
      return ['/goals', '/income', '/tax-planning'].includes(path);
    }
    return false;
  };

  // Navigation structure
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      hasSubmenu: false
    },
    {
      id: 'assetsLiabilities',
      label: 'Net Worth',
      icon: <TrendingUpIcon />,
      hasSubmenu: true,
      submenuItems: [
        { label: 'Assets & Liabilities', path: '/assets-liabilities', icon: <AccountBalanceIcon /> },
        { label: 'Portfolio Breakdown', path: '/portfolio-breakdown', icon: <PieChartIcon /> }
      ]
    },
    {
      id: 'spending',
      label: 'Spending & Budget',
      icon: <AccountBalanceWalletIcon />,
      hasSubmenu: true,
      submenuItems: [
        { label: 'Expense Breakdown', path: '/expense-breakdown', icon: <CalculateIcon /> },
        { label: 'Bills & Subscriptions', path: '/bills-subscriptions', icon: <ReceiptIcon /> },
        { label: 'Credit Card Strategy', path: '/credit-card-strategy', icon: <CreditCardIcon /> }
      ]
    },
    {
      id: 'planning',
      label: 'Financial Planning',
      icon: <SavingsIcon />,
      hasSubmenu: true,
      submenuItems: [
        { label: 'Goals', path: '/goals', icon: <CalendarTodayIcon /> },
        { label: 'Income', path: '/income', icon: <PaymentsIcon /> },
        { label: 'Tax Planning', path: '/tax-planning', icon: <CalculateIcon /> }
      ]
    }
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box 
          onClick={() => handleNavigation('/dashboard')}
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: alpha('#fff', 0.2), 
              width: 40, 
              height: 40,
              mr: 1.5
            }}
          >
            <PaymentsIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" noWrap>
            Family Folio
          </Typography>
        </Box>
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -20, 
            right: -20, 
            width: '40%', 
            height: '200%', 
            opacity: 0.1, 
            background: `radial-gradient(circle, white 0%, transparent 70%)` 
          }}
        />
        {isMobile && (
          <IconButton 
            onClick={handleDrawerToggle} 
            size="small"
            sx={{ color: 'white', position: 'relative', zIndex: 2 }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      
      {/* User profile section */}
      <Box 
        sx={{ 
          px: 3, 
          py: 2, 
          display: 'flex', 
          alignItems: 'center',
          bgcolor: alpha(theme.palette.primary.main, 0.04)
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.1), 
            color: theme.palette.primary.main,
            width: 48, 
            height: 48,
            mr: 2
          }}
        >
          {user?.firstName?.charAt(0) || 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="medium" noWrap>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <Divider />
      
      {/* Navigation Links */}
      <List sx={{ flexGrow: 1, px: 2, py: 1 }}>
        {navigationItems.map((item) => (
          <React.Fragment key={item.id}>
            {item.hasSubmenu ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleToggleSubMenu(item.id)}
                    sx={{ 
                      borderRadius: 2,
                      mb: 0.5,
                      backgroundColor: isInSubMenu(item.id, location.pathname) 
                        ? alpha(theme.palette.primary.main, 0.08) 
                        : 'transparent',
                      color: isInSubMenu(item.id, location.pathname) 
                        ? theme.palette.primary.main 
                        : 'inherit',
                      '&:hover': {
                        backgroundColor: isInSubMenu(item.id, location.pathname) 
                          ? alpha(theme.palette.primary.main, 0.15) 
                          : alpha(theme.palette.action.hover, 0.3)
                      }
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        color: isInSubMenu(item.id, location.pathname) 
                          ? theme.palette.primary.main 
                          : 'inherit' 
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography fontWeight={isInSubMenu(item.id, location.pathname) ? 'medium' : 'normal'}>
                          {item.label}
                        </Typography>
                      } 
                    />
                    {openSubMenus[item.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openSubMenus[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenuItems.map((subItem) => (
                      <ListItem key={subItem.path} disablePadding>
                        <ListItemButton
                          onClick={() => handleNavigation(subItem.path)}
                          sx={{ 
                            pl: 4,
                            borderRadius: 2,
                            mb: 0.5,
                            backgroundColor: isRouteActive(subItem.path) 
                              ? alpha(theme.palette.primary.main, 0.08) 
                              : 'transparent',
                            color: isRouteActive(subItem.path) 
                              ? theme.palette.primary.main 
                              : 'inherit'
                          }}
                        >
                          <ListItemIcon 
                            sx={{ 
                              color: isRouteActive(subItem.path) 
                                ? theme.palette.primary.main 
                                : 'inherit',
                              minWidth: 40
                            }}
                          >
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography 
                                variant="body2" 
                                fontWeight={isRouteActive(subItem.path) ? 'medium' : 'normal'}
                              >
                                {subItem.label}
                              </Typography>
                            } 
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{ 
                    borderRadius: 2,
                    mb: 0.5,
                    backgroundColor: isRouteActive(item.path) 
                      ? alpha(theme.palette.primary.main, 0.08) 
                      : 'transparent',
                    color: isRouteActive(item.path) 
                      ? theme.palette.primary.main 
                      : 'inherit',
                    '&:hover': {
                      backgroundColor: isRouteActive(item.path) 
                        ? alpha(theme.palette.primary.main, 0.15) 
                        : alpha(theme.palette.action.hover, 0.3)
                    }
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: isRouteActive(item.path) 
                        ? theme.palette.primary.main 
                        : 'inherit' 
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography fontWeight={isRouteActive(item.path) ? 'medium' : 'normal'}>
                        {item.label}
                      </Typography>
                    } 
                  />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
      
      {/* Bottom links */}
      <Box sx={{ mt: 'auto' }}>
        <Divider />
        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation('/settings')}
              sx={{ 
                borderRadius: 2,
                backgroundColor: isRouteActive('/settings') 
                  ? alpha(theme.palette.primary.main, 0.08) 
                  : 'transparent',
                color: isRouteActive('/settings') 
                  ? theme.palette.primary.main 
                  : 'inherit',
              }}
            >
              <ListItemIcon
                sx={{ 
                  color: isRouteActive('/settings') 
                    ? theme.palette.primary.main 
                    : 'inherit' 
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        sx: {
          mt: 1,
          width: 200,
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        elevation={2}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#fff',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              color: 'text.primary'
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box 
            onClick={() => handleNavigation('/dashboard')}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1), 
                color: theme.palette.primary.main,
                width: 36, 
                height: 36,
                mr: 1.5
              }}
            >
              <PaymentsIcon />
            </Avatar>
            <Typography 
              variant="h5" 
              noWrap 
              component="div" 
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                letterSpacing: '-0.5px'
              }}
            >
              Family Folio
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Search button */}
          <Tooltip title="Search">
            <IconButton 
              size="large" 
              color="inherit"
              sx={{ mr: 1 }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          
          {/* Help button */}
          <Tooltip title="Help">
            <IconButton 
              size="large" 
              color="inherit"
              sx={{ mr: 1 }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          
          {/* Notifications button */}
          <Tooltip title="Notifications">
            <IconButton 
              size="large" 
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Profile button */}
          <Tooltip title="Account">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main 
                }}
              >
                {user?.firstName?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {renderMenu}
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: isMobile ? '0 8px 24px rgba(0,0,0,0.12)' : '2px 0 20px rgba(0,0,0,0.04)'
          },
        }}
      >
        {drawer}
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px', // AppBar height
          backgroundColor: alpha(theme.palette.primary.main, 0.02),
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {/* Page content will be rendered here */}
      </Box>
    </Box>
  );
};

export default Navigation;