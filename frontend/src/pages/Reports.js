// src/pages/Reports.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Reports = () => {
  const theme = useTheme();
  
  // State for current tab
  const [currentTab, setCurrentTab] = useState(0);
  
  // State for time period
  const [timePeriod, setTimePeriod] = useState('month');
  
  // Sample data - income vs expenses by month
  const monthlyData = [
    { month: 'Jan', income: 5200, expenses: 4100 },
    { month: 'Feb', income: 5300, expenses: 4300 },
    { month: 'Mar', income: 5500, expenses: 4200 },
    { month: 'Apr', income: 5400, expenses: 4600 },
    { month: 'May', income: 5600, expenses: 4400 },
    { month: 'Jun', income: 5800, expenses: 4500 },
    { month: 'Jul', income: 5700, expenses: 4800 },
    { month: 'Aug', income: 5900, expenses: 4700 },
    { month: 'Sep', income: 6000, expenses: 4900 },
    { month: 'Oct', income: 6100, expenses: 4800 },
    { month: 'Nov', income: 6200, expenses: 5000 },
    { month: 'Dec', income: 6400, expenses: 5200 }
  ];
  
  // Sample data - expense breakdown by category
  const expenseCategories = [
    { name: 'Housing', value: 1500, color: theme.palette.primary.main },
    { name: 'Transportation', value: 400, color: theme.palette.secondary.main },
    { name: 'Food', value: 600, color: theme.palette.success.main },
    { name: 'Utilities', value: 300, color: theme.palette.error.main },
    { name: 'Entertainment', value: 200, color: theme.palette.warning.main },
    { name: 'Healthcare', value: 250, color: theme.palette.info.main },
    { name: 'Other', value: 300, color: '#9c27b0' }
  ];
  
  // Sample data - net worth over time
  const netWorthData = [
    { month: 'Jan', assets: 180000, liabilities: 120000, netWorth: 60000 },
    { month: 'Feb', assets: 185000, liabilities: 119000, netWorth: 66000 },
    { month: 'Mar', assets: 190000, liabilities: 118000, netWorth: 72000 },
    { month: 'Apr', assets: 195000, liabilities: 117000, netWorth: 78000 },
    { month: 'May', assets: 200000, liabilities: 116000, netWorth: 84000 },
    { month: 'Jun', assets: 205000, liabilities: 115000, netWorth: 90000 },
    { month: 'Jul', assets: 210000, liabilities: 114000, netWorth: 96000 },
    { month: 'Aug', assets: 215000, liabilities: 113000, netWorth: 102000 },
    { month: 'Sep', assets: 220000, liabilities: 112000, netWorth: 108000 },
    { month: 'Oct', assets: 225000, liabilities: 111000, netWorth: 114000 },
    { month: 'Nov', assets: 230000, liabilities: 110000, netWorth: 120000 },
    { month: 'Dec', assets: 235000, liabilities: 109000, netWorth: 126000 }
  ];
  
  // Sample data - savings rate over time
  const savingsRateData = [
    { month: 'Jan', rate: 18 },
    { month: 'Feb', rate: 19 },
    { month: 'Mar', rate: 20 },
    { month: 'Apr', rate: 18 },
    { month: 'May', rate: 21 },
    { month: 'Jun', rate: 22 },
    { month: 'Jul', rate: 20 },
    { month: 'Aug', rate: 23 },
    { month: 'Sep', rate: 22 },
    { month: 'Oct', rate: 24 },
    { month: 'Nov', rate: 23 },
    { month: 'Dec', rate: 25 }
  ];
  
  // Calculate summary data
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const monthIndex = new Date().getMonth();
  const currentMonthData = monthlyData[monthIndex];
  
  const totalIncome = currentMonthData.income;
  const totalExpenses = currentMonthData.expenses;
  const netIncome = totalIncome - totalExpenses;
  const savingsRate = (netIncome / totalIncome) * 100;
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // Handle time period change
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financial Reports
        </Typography>
        <Box>
          <FormControl sx={{ minWidth: 150, mr: 2 }}>
            <InputLabel id="time-period-label">Time Period</InputLabel>
            <Select
              labelId="time-period-label"
              value={timePeriod}
              label="Time Period"
              onChange={handleTimePeriodChange}
              size="small"
            >
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="quarter">Quarterly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button 
            variant="outlined"
            startIcon={<PrintIcon />}
          >
            Print
          </Button>
        </Box>
      </Box>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Income</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {formatCurrency(totalIncome)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingDownIcon color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Expenses</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {formatCurrency(totalExpenses)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceWalletIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Net Income</Typography>
              </Box>
              <Typography variant="h4" component="div" color={netIncome >= 0 ? 'success.main' : 'error.main'}>
                {formatCurrency(netIncome)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarTodayIcon color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Savings Rate</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {savingsRate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Report Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Income vs Expenses" />
          <Tab label="Expense Breakdown" />
          <Tab label="Net Worth" />
          <Tab label="Savings Rate" />
        </Tabs>
      </Paper>
      
      {/* Tab Content */}
      <Paper sx={{ p: 3 }}>
        {/* Income vs Expenses Report */}
        {currentTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>Income vs Expenses Trend</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Comparison of monthly income and expenses for the past year.
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill={theme.palette.success.main} />
                  <Bar dataKey="expenses" name="Expenses" fill={theme.palette.error.main} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Monthly Summary</Typography>
                <Typography variant="body2" paragraph>
                  Your income exceeds your expenses by {formatCurrency(netIncome)} in {currentMonth}, giving you a savings rate of {savingsRate.toFixed(1)}%. This is {savingsRate > 20 ? 'above' : 'below'} the recommended savings rate of 20%.
                </Typography>
                
                <Typography variant="body2" fontWeight="medium">
                  Year-to-Date Totals:
                </Typography>
                <Typography variant="body2">
                  - Total Income: {formatCurrency(monthlyData.reduce((sum, month, index) => index <= monthIndex ? sum + month.income : sum, 0))}
                </Typography>
                <Typography variant="body2">
                  - Total Expenses: {formatCurrency(monthlyData.reduce((sum, month, index) => index <= monthIndex ? sum + month.expenses : sum, 0))}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  - Net Income: {formatCurrency(monthlyData.reduce((sum, month, index) => index <= monthIndex ? sum + (month.income - month.expenses) : sum, 0))}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Insights</Typography>
                <Typography variant="body2" paragraph>
                  Your income has been {
                    monthlyData[monthIndex].income > monthlyData[monthIndex - 1].income ? 'increasing' : 'decreasing'
                  } compared to last month. Your expenses have {
                    monthlyData[monthIndex].expenses > monthlyData[monthIndex - 1].expenses ? 'increased' : 'decreased'
                  } by {formatCurrency(Math.abs(monthlyData[monthIndex].expenses - monthlyData[monthIndex - 1].expenses))}.
                </Typography>
                
                <Typography variant="body2" paragraph>
                  If you maintain your current saving rate, you will save {formatCurrency(netIncome * 12)} over the next 12 months.
                </Typography>
                
                <Typography variant="body2">
                  Consider setting a goal to increase your savings rate to at least 20% for financial security.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* Expense Breakdown Report */}
        {currentTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Expense Breakdown</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Distribution of expenses by category for {currentMonth}.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Top Expense Categories</Typography>
                <Box sx={{ mt: 2 }}>
                  {[...expenseCategories]
                    .sort((a, b) => b.value - a.value)
                    .map((category, index) => (
                      <Box key={category.name} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body1">
                            {index + 1}. {category.name}
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {formatCurrency(category.value)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              bgcolor: category.color,
                              borderRadius: 5
                            }}
                          />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {((category.value / totalExpenses) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                </Box>
                
                <Typography variant="body2" sx={{ mt: 3 }}>
                  Your largest expense category is {[...expenseCategories].sort((a, b) => b.value - a.value)[0].name}, accounting for {(([...expenseCategories].sort((a, b) => b.value - a.value)[0].value / totalExpenses) * 100).toFixed(1)}% of your total expenses. Focus on reducing this category to improve your savings rate.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* Net Worth Report */}
        {currentTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Net Worth Trend</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your net worth over time, showing the difference between assets and liabilities.
            </Typography>
            
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={netWorthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="assets" name="Assets" stroke={theme.palette.success.main} strokeWidth={2} />
                  <Line type="monotone" dataKey="liabilities" name="Liabilities" stroke={theme.palette.error.main} strokeWidth={2} />
                  <Line type="monotone" dataKey="netWorth" name="Net Worth" stroke={theme.palette.primary.main} strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Net Worth Summary</Typography>
                <Typography variant="body2" paragraph>
                  Your current net worth is {formatCurrency(netWorthData[netWorthData.length - 1].netWorth)}, with total assets of {formatCurrency(netWorthData[netWorthData.length - 1].assets)} and total liabilities of {formatCurrency(netWorthData[netWorthData.length - 1].liabilities)}.
                </Typography>
                
                <Typography variant="body2" paragraph>
                  Your net worth has {
                    netWorthData[netWorthData.length - 1].netWorth > netWorthData[0].netWorth ? 'increased' : 'decreased'
                  } by {formatCurrency(Math.abs(netWorthData[netWorthData.length - 1].netWorth - netWorthData[0].netWorth))} over the past year, representing a {
                    ((Math.abs(netWorthData[netWorthData.length - 1].netWorth - netWorthData[0].netWorth) / netWorthData[0].netWorth) * 100).toFixed(1)
                  }% change.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Net Worth Ratio</Typography>
                <Typography variant="body2" paragraph>
                  Your asset-to-liability ratio is {(netWorthData[netWorthData.length - 1].assets / netWorthData[netWorthData.length - 1].liabilities).toFixed(2)}. A higher ratio indicates a stronger financial position.
                </Typography>
                
                <Typography variant="body2" paragraph>
                  At your current trend, you can expect to reach {formatCurrency(netWorthData[netWorthData.length - 1].netWorth + (netWorthData[netWorthData.length - 1].netWorth - netWorthData[0].netWorth))} in net worth by this time next year.
                </Typography>
                
                <Typography variant="body2">
                  Consider increasing your investment contributions to accelerate your net worth growth.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* Savings Rate Report */}
        {currentTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>Savings Rate Trend</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your monthly savings rate (percentage of income saved) over the past year.
            </Typography>
            
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={savingsRateData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="rate" name="Savings Rate" stroke={theme.palette.primary.main} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Savings Rate Summary</Typography>
                <Typography variant="body2" paragraph>
                  Your current savings rate is {savingsRateData[savingsRateData.length - 1].rate}%, which means you're saving ${(totalIncome * (savingsRateData[savingsRateData.length - 1].rate / 100)).toFixed(0)} each month.
                </Typography>
                
                <Typography variant="body2" paragraph>
                  Your average savings rate over the past year is {
                    (savingsRateData.reduce((sum, month) => sum + month.rate, 0) / savingsRateData.length).toFixed(1)
                  }%. Financial experts recommend a savings rate of at least 20% of your income.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Savings Projections</Typography>
                <Typography variant="body2" paragraph>
                  If you maintain your current savings rate of {savingsRateData[savingsRateData.length - 1].rate}%, you will save approximately {formatCurrency(totalIncome * (savingsRateData[savingsRateData.length - 1].rate / 100) * 12)} over the next year.
                </Typography>
                
                <Typography variant="body2" paragraph>
                  Increasing your savings rate to 25% would allow you to save an additional {formatCurrency((totalIncome * 0.25 * 12) - (totalIncome * (savingsRateData[savingsRateData.length - 1].rate / 100) * 12))} per year.
                </Typography>
                
                <Typography variant="body2">
                  Consider reviewing your budget to identify areas where you can reduce expenses and increase your savings rate.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      
      {/* Additional reports can be added as needed */}
    </Box>
  );
};

export default Reports;