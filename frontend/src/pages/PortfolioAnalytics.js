// src/pages/PortfolioAnalytics.js
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PortfolioAnalytics = () => {
  const theme = useTheme();
  
  // Time period options
  const periods = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];
  
  // Chart view options
  const chartViews = [
    { value: 'overview', label: 'Overview' },
    { value: 'allocation', label: 'Asset Allocation' },
    { value: 'performance', label: 'Performance' },
    { value: 'comparison', label: 'Comparison' }
  ];
  
  // State variables
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [chartView, setChartView] = useState('overview');
  const [activeTab, setActiveTab] = useState(0);
  
  // Sample portfolio data - in a real app, this would come from an API
  const portfolioValue = 385250;
  const initialInvestment = 325000;
  const gainLoss = portfolioValue - initialInvestment;
  const percentChange = (gainLoss / initialInvestment) * 100;
  
  // Asset class allocation
  const assetAllocation = [
    { name: 'Stocks', value: 215000, color: theme.palette.primary.main },
    { name: 'Bonds', value: 85000, color: theme.palette.secondary.main },
    { name: 'Real Estate', value: 45000, color: theme.palette.success.main },
    { name: 'Cash', value: 25000, color: theme.palette.warning.main },
    { name: 'Alternatives', value: 15250, color: theme.palette.info.main }
  ];
  
  // Sector allocation
  const sectorAllocation = [
    { name: 'Technology', value: 75000, color: '#3f51b5' },
    { name: 'Financial', value: 42000, color: '#f44336' },
    { name: 'Healthcare', value: 35000, color: '#4caf50' },
    { name: 'Consumer Discretionary', value: 28000, color: '#ff9800' },
    { name: 'Communication Services', value: 18000, color: '#9c27b0' },
    { name: 'Industrials', value: 15000, color: '#2196f3' },
    { name: 'Utilities', value: 10000, color: '#607d8b' },
    { name: 'Materials', value: 8000, color: '#795548' },
    { name: 'Energy', value: 7000, color: '#009688' },
    { name: 'Other', value: 7250, color: '#9e9e9e' }
  ];
  
  // Portfolio performance over time
  const performanceData = [
    { date: '2024-01', value: 330000 },
    { date: '2024-02', value: 340500 },
    { date: '2024-03', value: 335000 },
    { date: '2024-04', value: 345000 },
    { date: '2024-05', value: 355000 },
    { date: '2024-06', value: 360000 },
    { date: '2024-07', value: 370000 },
    { date: '2024-08', value: 375000 },
    { date: '2024-09', value: 368000 },
    { date: '2024-10', value: 380000 },
    { date: '2025-01', value: 375000 },
    { date: '2025-02', value: 385250 }
  ];
  
  // Portfolio comparison data (vs benchmark)
  const comparisonData = [
    { date: '2024-01', portfolio: 1.5, benchmark: 1.2 },
    { date: '2024-02', portfolio: 3.2, benchmark: 2.8 },
    { date: '2024-03', portfolio: -1.6, benchmark: -0.9 },
    { date: '2024-04', portfolio: 3.0, benchmark: 2.5 },
    { date: '2024-05', portfolio: 2.9, benchmark: 2.2 },
    { date: '2024-06', portfolio: 1.4, benchmark: 1.8 },
    { date: '2024-07', portfolio: 2.8, benchmark: 2.1 },
    { date: '2024-08', portfolio: 1.4, benchmark: 1.6 },
    { date: '2024-09', portfolio: -1.9, benchmark: -1.5 },
    { date: '2024-10', portfolio: 3.3, benchmark: 2.7 },
    { date: '2025-01', portfolio: -1.3, benchmark: -1.1 },
    { date: '2025-02', portfolio: 2.7, benchmark: 2.3 }
  ];
  
  // Top holdings
  const topHoldings = [
    { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 100, price: 185.25, value: 18525, allocation: 4.8, change: 12.5 },
    { id: 2, symbol: 'MSFT', name: 'Microsoft Corporation', shares: 75, price: 410.35, value: 30776.25, allocation: 8.0, change: 15.2 },
    { id: 3, symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 90, price: 178.15, value: 16033.5, allocation: 4.2, change: 8.7 },
    { id: 4, symbol: 'NVDA', name: 'NVIDIA Corporation', shares: 50, price: 850.50, value: 42525, allocation: 11.0, change: 35.6 },
    { id: 5, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 120, price: 148.90, value: 17868, allocation: 4.6, change: 10.3 },
    { id: 6, symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', shares: 60, price: 408.75, value: 24525, allocation: 6.4, change: 5.8 },
    { id: 7, symbol: 'JNJ', name: 'Johnson & Johnson', shares: 110, price: 158.40, value: 17424, allocation: 4.5, change: -2.1 },
    { id: 8, symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', shares: 150, price: 255.30, value: 38295, allocation: 9.9, change: 8.4 }
  ];
  
  // Format functions
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
  };
  
  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  // Handle period change
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };
  
  // Handle chart view change
  const handleChartViewChange = (view) => {
    setChartView(view);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Custom charts tooltips
  const ValueTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">{formatDate(payload[0].payload.date)}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {formatCurrency(payload[0].value)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };
  
  const ComparisonTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">{formatDate(payload[0].payload.date)}</Typography>
          <Typography variant="body1" color="primary">
            Portfolio: {formatPercent(payload[0].value)}
          </Typography>
          <Typography variant="body1" color="secondary">
            Benchmark: {formatPercent(payload[1].value)}
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
          Portfolio Analytics
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
                <AccountBalanceIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Value</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {formatCurrency(portfolioValue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current portfolio value
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {gainLoss >= 0 ? 
                  <TrendingUpIcon color="success" sx={{ mr: 1 }} /> : 
                  <TrendingDownIcon color="error" sx={{ mr: 1 }} />
                }
                <Typography color="text.secondary">Gain/Loss</Typography>
              </Box>
              <Typography 
                variant="h4" 
                component="div"
                color={gainLoss >= 0 ? 'success.main' : 'error.main'}
              >
                {formatCurrency(gainLoss)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From initial investment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShowChartIcon color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">% Change</Typography>
              </Box>
              <Typography 
                variant="h4" 
                component="div"
                color={percentChange >= 0 ? 'success.main' : 'error.main'}
              >
                {formatPercent(percentChange)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Return on investment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DonutLargeIcon color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Asset Classes</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {assetAllocation.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Diversification classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Chart Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Portfolio Analysis</Typography>
        <ButtonGroup variant="outlined" size="small">
          {chartViews.map((view) => (
            <Button 
              key={view.value}
              onClick={() => handleChartViewChange(view.value)}
              variant={chartView === view.value ? 'contained' : 'outlined'}
            >
              {view.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      
      {/* Charts */}
      <Paper sx={{ p: 3, mb: 4 }}>
        {/* Overview Chart */}
        {chartView === 'overview' && (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)} 
                />
                <Tooltip content={<ValueTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={theme.palette.primary.main} 
                  fill={theme.palette.primary.light} 
                  name="Portfolio Value" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        )}
        
        {/* Asset Allocation Chart */}
        {chartView === 'allocation' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" align="center" gutterBottom>Asset Class Allocation</Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" align="center" gutterBottom>Sector Allocation</Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sectorAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>
        )}
        
        {/* Performance Chart */}
        {chartView === 'performance' && (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)} 
                />
                <Tooltip content={<ValueTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Portfolio Value" 
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
        
        {/* Comparison Chart */}
        {chartView === 'comparison' && (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                />
                <Tooltip content={<ComparisonTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="portfolio" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Your Portfolio" 
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke={theme.palette.secondary.main}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  name="S&P 500" 
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Paper>
      
      {/* Holdings Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Portfolio Holdings</Typography>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab label="Top Holdings" />
          <Tab label="Stocks" />
          <Tab label="ETFs" />
          <Tab label="Bonds" />
          <Tab label="Other Assets" />
        </Tabs>
        
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Shares</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Allocation</TableCell>
                <TableCell align="right">Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topHoldings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell component="th" scope="row">
                    <Typography fontWeight="bold">{holding.symbol}</Typography>
                  </TableCell>
                  <TableCell>{holding.name}</TableCell>
                  <TableCell align="right">{holding.shares}</TableCell>
                  <TableCell align="right">${holding.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{formatCurrency(holding.value)}</TableCell>
                  <TableCell align="right">{holding.allocation.toFixed(1)}%</TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={formatPercent(holding.change)}
                      color={holding.change >= 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PortfolioAnalytics;