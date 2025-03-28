// src/pages/ExpenseAnalytics.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Chip,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { CircularProgress } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';

const ExpenseAnalytics = () => {
  const theme = useTheme();
  
  // Time period options
  const periods = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last 12 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];
  
  // Expense categories with their icons
  const expenseCategories = {
    housing: { name: 'Housing', icon: <HomeIcon />, color: theme.palette.primary.main },
    transportation: { name: 'Transportation', icon: <DirectionsCarIcon />, color: theme.palette.secondary.main },
    food: { name: 'Food & Dining', icon: <RestaurantIcon />, color: theme.palette.success.main },
    shopping: { name: 'Shopping', icon: <ShoppingCartIcon />, color: theme.palette.error.main },
    healthcare: { name: 'Healthcare', icon: <LocalHospitalIcon />, color: theme.palette.warning.main }
  };
  
  // State variables
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [chartType, setChartType] = useState('category');
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Sample expense data - in a real app, this would come from an API
  // Monthly expenses by category
  const monthlyCategoryData = [
    { category: 'Housing', value: 1500, color: theme.palette.primary.main },
    { category: 'Transportation', value: 400, color: theme.palette.secondary.main },
    { category: 'Food & Dining', value: 650, color: theme.palette.success.main },
    { category: 'Healthcare', value: 200, color: theme.palette.error.main },
    { category: 'Shopping', value: 350, color: theme.palette.warning.main },
    { category: 'Entertainment', value: 180, color: theme.palette.info.main },
    { category: 'Education', value: 100, color: '#9c27b0' },
    { category: 'Travel', value: 200, color: '#795548' },
    { category: 'Other', value: 150, color: '#607d8b' }
  ];
  
  // Trend data - expenses over time
  const monthlyTrendData = [
    { month: 'Jan', expenses: 3200, budget: 3500 },
    { month: 'Feb', expenses: 3350, budget: 3500 },
    { month: 'Mar', expenses: 3100, budget: 3500 },
    { month: 'Apr', expenses: 3730, budget: 3500 },
    { month: 'May', expenses: 3500, budget: 3500 },
    { month: 'Jun', expenses: 3200, budget: 3500 },
    { month: 'Jul', expenses: 3400, budget: 3500 },
    { month: 'Aug', expenses: 3600, budget: 3500 },
    { month: 'Sep', expenses: 3700, budget: 3500 },
    { month: 'Oct', expenses: 3500, budget: 3500 },
    { month: 'Nov', expenses: 3450, budget: 3500 },
    { month: 'Dec', expenses: 3800, budget: 3500 }
  ];
  
  // Weekly expense data
  const weeklyData = [
    { day: 'Mon', expenses: 120, avg: 150 },
    { day: 'Tue', expenses: 85, avg: 150 },
    { day: 'Wed', expenses: 150, avg: 150 },
    { day: 'Thu', expenses: 75, avg: 150 },
    { day: 'Fri', expenses: 200, avg: 150 },
    { day: 'Sat', expenses: 250, avg: 150 },
    { day: 'Sun', expenses: 180, avg: 150 }
  ];
  
  // Expense comparison data (current vs previous period)
  const comparisonData = [
    { category: 'Housing', current: 1500, previous: 1450 },
    { category: 'Transportation', current: 400, previous: 380 },
    { category: 'Food', current: 650, previous: 680 },
    { category: 'Healthcare', current: 200, previous: 180 },
    { category: 'Shopping', current: 350, previous: 420 },
    { category: 'Entertainment', current: 180, previous: 210 }
  ];
  
  // Calculate total expenses for the current period
  const totalExpenses = monthlyCategoryData.reduce((sum, item) => sum + item.value, 0);
  const avgDailyExpense = totalExpenses / 30; // Assuming 30 days in a month
  
  // Calculate budget comparison
  const monthlyBudget = 3500;
  const budgetDifference = monthlyBudget - totalExpenses;
  const budgetPercentage = (totalExpenses / monthlyBudget) * 100;
  
  // Calculate month-over-month change
  const previousMonthExpenses = 3520; // Example value
  const monthlyChange = totalExpenses - previousMonthExpenses;
  const monthlyChangePercentage = (monthlyChange / previousMonthExpenses) * 100;
  
  // Find the largest expense category
  const largestExpenseCategory = [...monthlyCategoryData].sort((a, b) => b.value - a.value)[0];
  
  // Simulate data loading when period changes
  useEffect(() => {
    if (selectedPeriod) {
      setLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedPeriod]);
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography variant="body2">{payload[0].name}: ${payload[0].value.toLocaleString()}</Typography>
        </Paper>
      );
    }
    return null;
  };
  
  // Multi-data tooltip for trend charts
  const TrendTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{label}</Typography>
          {payload.map((entry, index) => (
            <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  marginRight: 1,
                  borderRadius: '50%'
                }}
              />
              <Typography variant="body2" sx={{ mr: 2 }}>
                {entry.name}:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                ${entry.value.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };
  
  // Handle period change
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };
  
  // Handle chart type change
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'medium' }}>
          Expense Analytics
        </Typography>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="period-label">Time Period</InputLabel>
          <Select
            labelId="period-label"
            value={selectedPeriod}
            label="Time Period"
            onChange={handlePeriodChange}
            startAdornment={<DateRangeIcon sx={{ ml: 1, mr: 0.5, color: 'text.secondary' }} />}
          >
            {periods.map((period) => (
              <MenuItem key={period.value} value={period.value}>
                {period.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.error.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  mr: 1.5, 
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main
                }}>
                  <TrendingDownIcon />
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  Total Expenses
                </Typography>
              </Box>
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                {formatCurrency(totalExpenses)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  size="small"
                  icon={monthlyChange >= 0 ? <TrendingDownIcon fontSize="small" /> : null}
                  label={`${monthlyChangePercentage >= 0 ? '+' : ''}${monthlyChangePercentage.toFixed(1)}% vs. last month`}
                  color={monthlyChangePercentage <= 0 ? "success" : "error"}
                  sx={{ height: 24 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.info.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  mr: 1.5, 
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.main
                }}>
                  <CalendarTodayIcon />
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  Daily Average
                </Typography>
              </Box>
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                ${avgDailyExpense.toFixed(0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on {selectedPeriod === 'month' ? '30 days' : selectedPeriod === 'week' ? '7 days' : 'current period'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.primary.main, 0.15)
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  mr: 1.5, 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main
                }}>
                  {Object.keys(expenseCategories).find(
                    key => expenseCategories[key].name === largestExpenseCategory.category
                  ) ? expenseCategories[Object.keys(expenseCategories).find(
                    key => expenseCategories[key].name === largestExpenseCategory.category
                  )].icon : <ShoppingCartIcon />}
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  Largest Category
                </Typography>
              </Box>
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                {formatCurrency(largestExpenseCategory.value)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {largestExpenseCategory.category} ({((largestExpenseCategory.value / totalExpenses) * 100).toFixed(1)}% of total)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
            }
          }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 0,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(
                  budgetDifference >= 0 ? theme.palette.success.main : theme.palette.error.main, 
                  0.15
                )
              }} />
            </Box>
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  mr: 1.5, 
                  bgcolor: alpha(
                    budgetDifference >= 0 ? theme.palette.success.main : theme.palette.error.main, 
                    0.1
                  ),
                  color: budgetDifference >= 0 ? theme.palette.success.main : theme.palette.error.main
                }}>
                  <AccountBalanceWalletIcon />
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                  Budget Status
                </Typography>
              </Box>
              <Typography 
                variant="h4" 
                component="div" 
                fontWeight="bold" 
                sx={{ mb: 1 }}
                color={budgetDifference >= 0 ? 'success.main' : 'error.main'}
              >
                {budgetPercentage.toFixed(0)}%
              </Typography>
              <Typography 
                variant="body2" 
                color={budgetDifference >= 0 ? 'success.main' : 'error.main'}
              >
                {budgetDifference >= 0 
                  ? `${formatCurrency(budgetDifference)} under budget` 
                  : `${formatCurrency(Math.abs(budgetDifference))} over budget`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Chart Controls */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h6" fontWeight="medium">Expense Breakdown</Typography>
        <ButtonGroup 
          variant="outlined" 
          size="small"
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            '& .MuiButton-root': {
              borderRadius: 0,
              textTransform: 'none'
            }
          }}
        >
          <Button 
            onClick={() => handleChartTypeChange('category')}
            variant={chartType === 'category' ? 'contained' : 'outlined'}
            startIcon={<PieChartIcon />}
          >
            By Category
          </Button>
          <Button 
            onClick={() => handleChartTypeChange('trend')}
            variant={chartType === 'trend' ? 'contained' : 'outlined'}
            startIcon={<TrendingDownIcon />}
          >
            Trends
          </Button>
          <Button 
            onClick={() => handleChartTypeChange('weekly')}
            variant={chartType === 'weekly' ? 'contained' : 'outlined'}
            startIcon={<DateRangeIcon />}
          >
            Weekly
          </Button>
          <Button 
            onClick={() => handleChartTypeChange('comparison')}
            variant={chartType === 'comparison' ? 'contained' : 'outlined'}
            startIcon={<CompareArrowsIcon />}
          >
            vs Previous
          </Button>
        </ButtonGroup>
      </Box>
      
      {/* Charts */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3, 
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
        height: '100%'
      }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Category Breakdown Chart */}
            {chartType === 'category' && (
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthlyCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={140}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="category"
                      paddingAngle={2}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {monthlyCategoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke={theme.palette.background.paper}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            )}
            
            {/* Expense Trend Chart */}
            {chartType === 'trend' && (
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: theme.palette.text.secondary }} 
                      axisLine={{ stroke: theme.palette.divider }} 
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${value.toLocaleString()}`} 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip content={<TrendTooltip />} />
                    <Legend />
                    <defs>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stroke={theme.palette.success.main}
                      strokeDasharray="5 5"
                      fill="none"
                      strokeWidth={2}
                      name="Budget"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke={theme.palette.error.main}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorExpenses)"
                      name="Expenses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            )}
            
            {/* Weekly Expense Chart */}
            {chartType === 'weekly' && (
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: theme.palette.text.secondary }} 
                      axisLine={{ stroke: theme.palette.divider }} 
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${value.toLocaleString()}`} 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip content={<TrendTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="expenses"
                      name="Daily Expenses"
                      fill={theme.palette.error.main}
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      name="Daily Average"
                      stroke={theme.palette.info.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
            
            {/* Comparison Chart */}
            {chartType === 'comparison' && (
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={alpha(theme.palette.divider, 0.5)} />
                    <XAxis 
                      type="number" 
                      tickFormatter={(value) => `$${value.toLocaleString()}`} 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="category" 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip content={<TrendTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="previous" 
                      name="Previous Period" 
                      fill={theme.palette.info.main} 
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar 
                      dataKey="current" 
                      name="Current Period" 
                      fill={theme.palette.error.main} 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </>
        )}
      </Paper>
      
      {/* Category Breakdown */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3, 
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
      }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>Category Breakdown</Typography>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 120
            }
          }}
        >
          <Tab label="All Categories" />
          <Tab label="Housing" />
          <Tab label="Food & Dining" />
          <Tab label="Transportation" />
          <Tab label="Shopping" />
          <Tab label="Healthcare" />
        </Tabs>
        
        <Grid container spacing={2}>
          {monthlyCategoryData
            .filter(item => currentTab === 0 || item.category === ['All Categories', 'Housing', 'Food & Dining', 'Transportation', 'Shopping', 'Healthcare'][currentTab])
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={0} sx={{ 
                  p: 2,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(item.color, 0.1), 
                      color: item.color,
                      width: 40,
                      height: 40,
                      mr: 2
                    }}>
                      {Object.values(expenseCategories).find(cat => cat.name === item.category)?.icon || <ReceiptIcon />}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 0.5, fontSize: '1rem' }}>
                        {item.category}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                        ${item.value.toLocaleString()}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          {((item.value / totalExpenses) * 100).toFixed(1)}% of total
                        </Typography>
                        <Chip 
                          size="small" 
                          label="+5.2%" 
                          color="error" 
                          sx={{ height: 20, fontSize: '0.65rem' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>
      
      {/* Insights and Recommendations */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: 3, 
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
      }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>Insights & Recommendations</Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Spending Trends
              </Typography>
              <Typography variant="body2" paragraph>
                Your spending in <strong>Housing</strong> and <strong>Shopping</strong> categories 
                has increased by 5% compared to last month. Consider reviewing your shopping expenses 
                to identify areas for potential savings.
              </Typography>
              <Box sx={{ 
                bgcolor: alpha(theme.palette.info.main, 0.1), 
                p: 2, 
                borderRadius: 2,
                mb: 2
              }}>
                <Typography variant="body2" color="info.main">
                  <strong>Tip:</strong> Setting category-specific budgets can help you control 
                  spending in areas where you tend to overspend.
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Seasonal Patterns
            </Typography>
            <Typography variant="body2">
              Your expenses typically increase during summer months. Planning ahead for 
              seasonal fluctuations can help maintain your budget throughout the year.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Optimization Opportunities
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                p: 2,
                mb: 2,
                bgcolor: alpha(theme.palette.success.main, 0.1),
                borderRadius: 2
              }}>
                <AccountBalanceWalletIcon 
                  sx={{ color: theme.palette.success.main, mr: 2 }} 
                />
                <Box>
                  <Typography variant="body1" fontWeight="medium" gutterBottom>
                    Reduce Food & Dining expenses
                  </Typography>
                  <Typography variant="body2">
                    Your food expenses are 15% higher than similar households. 
                    Consider meal planning to reduce costs.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                p: 2,
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                borderRadius: 2
              }}>
                <TrendingDownIcon 
                  sx={{ color: theme.palette.warning.main, mr: 2 }} 
                />
                <Box>
                  <Typography variant="body1" fontWeight="medium" gutterBottom>
                    Subscription audit recommended
                  </Typography>
                  <Typography variant="body2">
                    Review your subscriptions in Entertainment category. 
                    You might be paying for services you rarely use.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ExpenseAnalytics;