// src/pages/ExpenseAnalytics.js
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  useTheme
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
  ResponsiveContainer
} from 'recharts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FlightIcon from '@mui/icons-material/Flight';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ExpenseAnalytics = () => {
  const theme = useTheme();
  
  // Time period options
  const periods = [
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];
  
  // Expense categories with their icons
  const expenseCategories = {
    housing: { name: 'Housing', icon: <HomeIcon /> },
    transportation: { name: 'Transportation', icon: <DirectionsCarIcon /> },
    food: { name: 'Food & Dining', icon: <RestaurantIcon /> },
    shopping: { name: 'Shopping', icon: <ShoppingCartIcon /> },
    healthcare: { name: 'Healthcare', icon: <LocalHospitalIcon /> },
    education: { name: 'Education', icon: <SchoolIcon /> },
    entertainment: { name: 'Entertainment', icon: <TheaterComedyIcon /> },
    travel: { name: 'Travel', icon: <FlightIcon /> },
    technology: { name: 'Technology', icon: <DevicesIcon /> },
    clothing: { name: 'Clothing', icon: <CheckroomIcon /> },
    fitness: { name: 'Health & Fitness', icon: <FitnessCenterIcon /> },
    other: { name: 'Other', icon: <MoreHorizIcon /> }
  };
  
  // State variables
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [chartType, setChartType] = useState('category');
  const [currentTab, setCurrentTab] = useState(0);
  
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
    { month: 'Jan', expenses: 3200 },
    { month: 'Feb', expenses: 3350 },
    { month: 'Mar', expenses: 3100 },
    { month: 'Apr', expenses: 3730 },
    { month: 'May', expenses: 3500 },
    { month: 'Jun', expenses: 3200 },
    { month: 'Jul', expenses: 3400 },
    { month: 'Aug', expenses: 3600 },
    { month: 'Sep', expenses: 3700 },
    { month: 'Oct', expenses: 3500 },
    { month: 'Nov', expenses: 3450 },
    { month: 'Dec', expenses: 3800 }
  ];
  
  // Weekly expense data
  const weeklyData = [
    { day: 'Mon', expenses: 120 },
    { day: 'Tue', expenses: 85 },
    { day: 'Wed', expenses: 150 },
    { day: 'Thu', expenses: 75 },
    { day: 'Fri', expenses: 200 },
    { day: 'Sat', expenses: 250 },
    { day: 'Sun', expenses: 180 }
  ];
  
  // Top expense transactions
  const topExpenses = [
    { id: 1, description: 'Rent', category: 'Housing', amount: 1500, date: '2025-03-01' },
    { id: 2, description: 'Grocery Store', category: 'Food & Dining', amount: 210, date: '2025-03-15' },
    { id: 3, description: 'Car Payment', category: 'Transportation', amount: 350, date: '2025-03-05' },
    { id: 4, description: 'Shopping Mall', category: 'Shopping', amount: 180, date: '2025-03-12' },
    { id: 5, description: 'Utilities', category: 'Housing', amount: 150, date: '2025-03-10' }
  ];
  
  // Calculate total expenses for the current period
  const totalExpenses = monthlyCategoryData.reduce((sum, item) => sum + item.value, 0);
  const avgDailyExpense = totalExpenses / 30; // Assuming 30 days in a month
  
  // Find the largest expense category
  const largestExpenseCategory = [...monthlyCategoryData].sort((a, b) => b.value - a.value)[0];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">{payload[0].name}: ${payload[0].value.toLocaleString()}</Typography>
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
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Expense Analytics
        </Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="period-label">Time Period</InputLabel>
          <Select
            labelId="period-label"
            value={selectedPeriod}
            label="Time Period"
            onChange={handlePeriodChange}
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
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingDownIcon color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Expenses</Typography>
              </Box>
              <Typography variant="h4" component="div">
                ${totalExpenses.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedPeriod === 'month' ? 'This month' : 
                 selectedPeriod === 'quarter' ? 'This quarter' :
                 selectedPeriod === 'year' ? 'This year' : 'All time'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Daily Average</Typography>
              </Box>
              <Typography variant="h4" component="div">
                ${avgDailyExpense.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Per day this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {expenseCategories[Object.keys(expenseCategories).find(
                  key => expenseCategories[key].name === largestExpenseCategory.category
                )]?.icon || <ShoppingCartIcon color="warning" sx={{ mr: 1 }} />}
                <Typography color="text.secondary">Largest Category</Typography>
              </Box>
              <Typography variant="h4" component="div">
                ${largestExpenseCategory.value.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {largestExpenseCategory.category}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceWalletIcon color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Transactions</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {topExpenses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Chart Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Expense Breakdown</Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button 
            onClick={() => handleChartTypeChange('category')}
            variant={chartType === 'category' ? 'contained' : 'outlined'}
          >
            By Category
          </Button>
          <Button 
            onClick={() => handleChartTypeChange('trend')}
            variant={chartType === 'trend' ? 'contained' : 'outlined'}
          >
            Trends
          </Button>
          <Button 
            onClick={() => handleChartTypeChange('weekly')}
            variant={chartType === 'weekly' ? 'contained' : 'outlined'}
          >
            Weekly
          </Button>
        </ButtonGroup>
      </Box>
      
      {/* Charts */}
      <Paper sx={{ p: 3, mb: 4 }}>
        {chartType === 'category' && (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={monthlyCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="category"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {monthlyCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
        
        {chartType === 'trend' && (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyTrendData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke={theme.palette.primary.main}
                  name="Monthly Expenses"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
        
        {chartType === 'weekly' && (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="expenses"
                  name="Daily Expenses"
                  fill={theme.palette.primary.main}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Paper>
      
      {/* Category Breakdown */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Category Breakdown</Typography>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
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
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.color,
                          mr: 1
                        }}
                      />
                      <Typography variant="subtitle1">{item.category}</Typography>
                    </Box>
                    <Typography variant="h5" component="div">
                      ${item.value.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {((item.value / totalExpenses) * 100).toFixed(1)}% of total
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>
      
      {/* Top Expenses */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Top Expenses</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          {topExpenses.map((expense, index) => (
            <Grid item xs={12} sm={6} md={4} key={expense.id}>
              <Card variant="outlined">
                <CardHeader
                  title={expense.description}
                  subheader={formatDate(expense.date)}
                  titleTypographyProps={{ variant: 'h6' }}
                  subheaderTypographyProps={{ variant: 'body2' }}
                />
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom>
                    ${expense.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {expense.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ExpenseAnalytics;