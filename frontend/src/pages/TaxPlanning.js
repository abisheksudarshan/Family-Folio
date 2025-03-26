// src/pages/TaxPlanning.js
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  Divider,
  CircularProgress,
  InputAdornment,
  Alert,
  useTheme
} from '@mui/material';
import {
  CalculateOutlined as CalculateIcon,
  TrendingUpOutlined as TrendingUpIcon,
  ReceiptLongOutlined as ReceiptIcon,
  AccountBalanceOutlined as AccountBalanceIcon,
  FamilyRestroomOutlined as FamilyIcon,
  BusinessOutlined as BusinessIcon,
  HomeOutlined as HomeIcon,
  SchoolOutlined as SchoolIcon,
  LocalHospitalOutlined as HealthcareIcon,
  VolunteerActivismOutlined as CharityIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie
} from 'recharts';

const TaxPlanning = () => {
  const theme = useTheme();
  
  // State for current tab
  const [currentTab, setCurrentTab] = useState(0);
  
  // State for tax info
  const [taxInfo, setTaxInfo] = useState({
    filingStatus: 'single',
    income: 85000,
    taxYear: 2024,
    dependents: 0,
    agi: 82500,
    federalTax: 14605,
    stateTax: 4675,
    ficaTax: 6502,
    totalTax: 25782,
    effectiveRate: 30.33
  });
  
  // State for deductions
  const [deductions, setDeductions] = useState({
    useStandard: true,
    standardDeduction: 13850,
    itemizedDeductions: {
      mortgageInterest: 0,
      stateTaxes: 0,
      propertyTaxes: 0,
      charitableDonations: 0,
      medicalExpenses: 0,
      otherDeductions: 0
    },
    totalItemized: 0
  });
  
  // State for tax credits
  const [credits, setCredits] = useState({
    childTaxCredit: 0,
    childCareTaxCredit: 0,
    educationCredits: 0,
    retirementSaversCredit: 0,
    energyCredits: 0,
    otherCredits: 0,
    totalCredits: 0
  });
  
  // State for retirement accounts
  const [retirement, setRetirement] = useState({
    traditional401k: 5000,
    traditionalIRA: 0,
    rothIRA: 3000,
    rothUnavailable: false
  });
  
  // State for tax optimization strategies
  const [optimizations, setOptimizations] = useState([
    {
      id: 1,
      name: 'Increase 401(k) Contributions',
      description: 'Increase your 401(k) contributions to reduce taxable income.',
      potentialSavings: 2200,
      implemented: false
    },
    {
      id: 2,
      name: 'Contribute to Traditional IRA',
      description: 'Make deductible contributions to a Traditional IRA.',
      potentialSavings: 1320,
      implemented: false
    },
    {
      id: 3,
      name: 'Health Savings Account (HSA)',
      description: 'Contribute to an HSA if you have a high-deductible health plan.',
      potentialSavings: 787,
      implemented: false
    },
    {
      id: 4,
      name: 'Charitable Donations',
      description: 'Make charitable donations to increase itemized deductions.',
      potentialSavings: 660,
      implemented: false
    },
    {
      id: 5,
      name: 'Harvest Capital Losses',
      description: 'Sell investments with losses to offset capital gains.',
      potentialSavings: 450,
      implemented: false
    }
  ]);
  
  // State for calculations in progress
  const [calculating, setCalculating] = useState(false);
  
  // Sample tax bracket data for visualization
  const taxBrackets = [
    { range: "$0-$11,000", rate: 10, amount: 1100 },
    { range: "$11,001-$44,725", rate: 12, amount: 4047 },
    { range: "$44,726-$95,375", rate: 22, amount: 9458 },
    { range: "$95,376-$182,100", rate: 24, amount: 0 },
    { range: "$182,101-$231,250", rate: 32, amount: 0 },
    { range: "$231,251-$578,125", rate: 35, amount: 0 },
    { range: "Over $578,125", rate: 37, amount: 0 }
  ];
  
  // Tax breakdown data for pie chart
  const taxBreakdown = [
    { name: 'Federal Income Tax', value: taxInfo.federalTax, color: theme.palette.primary.main },
    { name: 'State Income Tax', value: taxInfo.stateTax, color: theme.palette.secondary.main },
    { name: 'Social Security', value: taxInfo.ficaTax * 0.62, color: theme.palette.success.main },
    { name: 'Medicare', value: taxInfo.ficaTax * 0.38, color: theme.palette.error.main }
  ];
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // Handle input change for tax info
  const handleTaxInfoChange = (field, value) => {
    setTaxInfo({
      ...taxInfo,
      [field]: value
    });
  };
  
  // Handle deduction method change
  const handleDeductionMethodChange = (useStandard) => {
    setDeductions({
      ...deductions,
      useStandard
    });
  };
  
  // Handle itemized deduction change
  const handleItemizedChange = (field, value) => {
    const newItemized = {
      ...deductions.itemizedDeductions,
      [field]: value
    };
    
    // Calculate new total
    const total = Object.values(newItemized).reduce((sum, val) => sum + val, 0);
    
    setDeductions({
      ...deductions,
      itemizedDeductions: newItemized,
      totalItemized: total
    });
  };
  
  // Handle retirement contribution change
  const handleRetirementChange = (account, value) => {
    setRetirement({
      ...retirement,
      [account]: value
    });
  };
  
  // Handle optimization toggle
  const handleOptimizationToggle = (id) => {
    setOptimizations(optimizations.map(opt => 
      opt.id === id ? { ...opt, implemented: !opt.implemented } : opt
    ));
  };
  
  // Calculate taxes
  const calculateTaxes = () => {
    setCalculating(true);
    
    // In a real app, this would make an API call to perform tax calculations
    // For this example, we'll simulate a delay and then update the state
    
    setTimeout(() => {
      // Simple tax calculation (this is not accurate for real taxes)
      const deduction = deductions.useStandard ? 
        deductions.standardDeduction : 
        deductions.totalItemized;
      
      const taxableIncome = Math.max(0, taxInfo.income - deduction - retirement.traditional401k - retirement.traditionalIRA);
      
      let federalTax = 0;
      if (taxableIncome > 0) {
        // Very simplified tax calculation for example purposes
        if (taxableIncome <= 11000) {
          federalTax = taxableIncome * 0.1;
        } else if (taxableIncome <= 44725) {
          federalTax = 1100 + (taxableIncome - 11000) * 0.12;
        } else if (taxableIncome <= 95375) {
          federalTax = 5147 + (taxableIncome - 44725) * 0.22;
        } else if (taxableIncome <= 182100) {
          federalTax = 16290 + (taxableIncome - 95375) * 0.24;
        } else if (taxableIncome <= 231250) {
          federalTax = 37104 + (taxableIncome - 182100) * 0.32;
        } else if (taxableIncome <= 578125) {
          federalTax = 52832 + (taxableIncome - 231250) * 0.35;
        } else {
          federalTax = 174238 + (taxableIncome - 578125) * 0.37;
        }
      }
      
      // Apply tax credits
      federalTax = Math.max(0, federalTax - credits.totalCredits);
      
      // Calculate FICA taxes (Social Security and Medicare)
      const ficaTax = taxInfo.income * 0.0765; // 7.65% for employee portion
      
      // Simple state tax calculation (varies by state)
      const stateTax = taxableIncome * 0.055; // 5.5% state tax rate
      
      // Total tax
      const totalTax = federalTax + stateTax + ficaTax;
      
      // Effective tax rate
      const effectiveRate = (totalTax / taxInfo.income) * 100;
      
      setTaxInfo({
        ...taxInfo,
        agi: taxableIncome,
        federalTax,
        stateTax,
        ficaTax,
        totalTax,
        effectiveRate
      });
      
      setCalculating(false);
    }, 1500);
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
  
  // Calculate potential tax savings from optimizations
  const potentialSavings = optimizations
    .filter(opt => !opt.implemented)
    .reduce((sum, opt) => sum + opt.potentialSavings, 0);
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tax Planning
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<CalculateIcon />}
          onClick={calculateTaxes}
          disabled={calculating}
        >
          {calculating ? <CircularProgress size={24} /> : 'Calculate Taxes'}
        </Button>
      </Box>
      
      {/* Tax Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Federal Tax</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {formatCurrency(taxInfo.federalTax)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                For {taxInfo.taxYear}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptIcon color="secondary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Tax</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {formatCurrency(taxInfo.totalTax)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inc. Federal, State, FICA
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Effective Rate</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {taxInfo.effectiveRate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall tax rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalculateIcon color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Potential Savings</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {formatCurrency(potentialSavings)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From optimizations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main content tabs */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* Tax Input Form */}
          <Paper sx={{ p: 3, mb: { xs: 3, md: 0 }, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Tax Information</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="filing-status-label">Filing Status</InputLabel>
                  <Select
                    labelId="filing-status-label"
                    value={taxInfo.filingStatus}
                    label="Filing Status"
                    onChange={(e) => handleTaxInfoChange('filingStatus', e.target.value)}
                  >
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married_joint">Married Filing Jointly</MenuItem>
                    <MenuItem value="married_separate">Married Filing Separately</MenuItem>
                    <MenuItem value="head_household">Head of Household</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tax Year"
                  type="number"
                  fullWidth
                  value={taxInfo.taxYear}
                  onChange={(e) => handleTaxInfoChange('taxYear', parseInt(e.target.value))}
                  InputProps={{
                    inputProps: { min: 2023, max: 2025 }
                  }}
                />
                </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Dependents"
                  type="number"
                  fullWidth
                  value={taxInfo.dependents}
                  onChange={(e) => handleTaxInfoChange('dependents', parseInt(e.target.value))}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Annual Income"
                  type="number"
                  fullWidth
                  value={taxInfo.income}
                  onChange={(e) => handleTaxInfoChange('income', parseFloat(e.target.value))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
            </Grid>
            
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Deductions</Typography>
            
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={deductions.useStandard}
                    onChange={(e) => handleDeductionMethodChange(e.target.checked)}
                  />
                }
                label={`Standard Deduction (${formatCurrency(deductions.standardDeduction)})`}
              />
            </FormGroup>
            
            {!deductions.useStandard && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>Itemized Deductions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Mortgage Interest"
                      type="number"
                      fullWidth
                      size="small"
                      value={deductions.itemizedDeductions.mortgageInterest}
                      onChange={(e) => handleItemizedChange('mortgageInterest', parseFloat(e.target.value) || 0)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="State & Local Taxes"
                      type="number"
                      fullWidth
                      size="small"
                      value={deductions.itemizedDeductions.stateTaxes}
                      onChange={(e) => handleItemizedChange('stateTaxes', parseFloat(e.target.value) || 0)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Charitable Donations"
                      type="number"
                      fullWidth
                      size="small"
                      value={deductions.itemizedDeductions.charitableDonations}
                      onChange={(e) => handleItemizedChange('charitableDonations', parseFloat(e.target.value) || 0)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Medical Expenses"
                      type="number"
                      fullWidth
                      size="small"
                      value={deductions.itemizedDeductions.medicalExpenses}
                      onChange={(e) => handleItemizedChange('medicalExpenses', parseFloat(e.target.value) || 0)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Total Itemized:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(deductions.totalItemized)}
                  </Typography>
                </Box>
                
                {deductions.totalItemized < deductions.standardDeduction && (
                  <Alert severity="info" sx={{ mt: 2, fontSize: '0.75rem' }}>
                    Your itemized deductions are less than the standard deduction. Consider using the standard deduction for maximum tax benefit.
                  </Alert>
                )}
              </Box>
            )}
            
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Pre-Tax Retirement Contributions</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="401(k) Contribution"
                  type="number"
                  fullWidth
                  size="small"
                  value={retirement.traditional401k}
                  onChange={(e) => handleRetirementChange('traditional401k', parseFloat(e.target.value) || 0)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Traditional IRA Contribution"
                  type="number"
                  fullWidth
                  size="small"
                  value={retirement.traditionalIRA}
                  onChange={(e) => handleRetirementChange('traditionalIRA', parseFloat(e.target.value) || 0)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              <Tab label="Tax Breakdown" />
              <Tab label="Tax Optimizations" />
              <Tab label="Estimated Taxes" />
            </Tabs>
            
            {/* Tax Breakdown Tab */}
            {currentTab === 0 && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Tax Breakdown</Typography>
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={taxBreakdown}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {taxBreakdown.map((entry, index) => (
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
                    <Typography variant="h6" gutterBottom>Tax Brackets</Typography>
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={taxBrackets}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                          <YAxis dataKey="range" type="category" scale="band" />
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="amount" fill={theme.palette.primary.main} name="Tax Amount" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" gutterBottom>Summary</Typography>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Total Income:</Typography>
                        <Typography variant="body2">{formatCurrency(taxInfo.income)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Deductions:</Typography>
                        <Typography variant="body2">-{formatCurrency(deductions.useStandard ? deductions.standardDeduction : deductions.totalItemized)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Pre-Tax Contributions:</Typography>
                        <Typography variant="body2">-{formatCurrency(retirement.traditional401k + retirement.traditionalIRA)}</Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight="bold">Adjusted Gross Income:</Typography>
                        <Typography variant="body2" fontWeight="bold">{formatCurrency(taxInfo.agi)}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" gutterBottom>Taxes</Typography>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Federal Income Tax:</Typography>
                        <Typography variant="body2">{formatCurrency(taxInfo.federalTax)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">State Income Tax:</Typography>
                        <Typography variant="body2">{formatCurrency(taxInfo.stateTax)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">FICA Taxes:</Typography>
                        <Typography variant="body2">{formatCurrency(taxInfo.ficaTax)}</Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight="bold">Total Tax:</Typography>
                        <Typography variant="body2" fontWeight="bold">{formatCurrency(taxInfo.totalTax)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="body2">After-Tax Income:</Typography>
                        <Typography variant="body2">{formatCurrency(taxInfo.income - taxInfo.totalTax)}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Tax Optimizations Tab */}
            {currentTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>Tax Optimization Strategies</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Implementing these strategies could help reduce your tax burden. Check the ones you've already implemented.
                </Typography>
                
                <Grid container spacing={2}>
                  {optimizations.map((strategy) => (
                    <Grid item xs={12} key={strategy.id}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={strategy.implemented}
                                onChange={() => handleOptimizationToggle(strategy.id)}
                              />
                            }
                            label={
                              <Box>
                                <Typography variant="subtitle1">{strategy.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {strategy.description}
                                </Typography>
                              </Box>
                            }
                            sx={{ flexGrow: 1 }}
                          />
                          <Box sx={{ ml: 2, textAlign: 'right' }}>
                            <Typography variant="body2" color="text.secondary">Potential Savings</Typography>
                            <Typography variant="subtitle1" color="success.main">
                              {formatCurrency(strategy.potentialSavings)}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    Total Potential Savings:
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {formatCurrency(potentialSavings)}
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* Estimated Taxes Tab */}
            {currentTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>Estimated Tax Payments</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  If you have income not subject to withholding, you may need to make estimated tax payments to avoid penalties.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>Quarterly Payment Schedule</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="medium">Q1 Payment (Due Apr 15):</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{formatCurrency(taxInfo.federalTax / 4)}</Typography>
                        </Grid>
                        
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="medium">Q2 Payment (Due Jun 15):</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{formatCurrency(taxInfo.federalTax / 4)}</Typography>
                        </Grid>
                        
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="medium">Q3 Payment (Due Sep 15):</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{formatCurrency(taxInfo.federalTax / 4)}</Typography>
                        </Grid>
                        
                        <Grid item xs={6}>
                        <Typography variant="body2" fontWeight="medium">Q4 Payment (Due Jan 15):</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{formatCurrency(taxInfo.federalTax / 4)}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Estimated tax payments are generally required if you expect to owe $1,000 or more in taxes when you file your return.
                    </Alert>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>Safe Harbor Rules</Typography>
                    <Typography variant="body2" paragraph>
                      To avoid underpayment penalties, you should pay at least:
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <Typography variant="body2" fontWeight="medium">90% of current year tax:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">{formatCurrency(taxInfo.federalTax * 0.9)}</Typography>
                        </Grid>
                        
                        <Grid item xs={8}>
                          <Typography variant="body2" fontWeight="medium">100% of prior year tax:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">Varies</Typography>
                        </Grid>
                        
                        <Grid item xs={8}>
                          <Typography variant="body2" fontWeight="medium">110% of prior year tax (if AGI > $150,000):</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">Varies</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      Download Payment Vouchers
                    </Button>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" gutterBottom>Withholding Calculator</Typography>
                <Typography variant="body2" paragraph>
                  Alternatively, you can adjust your W-4 withholding to account for additional income.
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Current Withholding (per paycheck)"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Pay Frequency"
                      fullWidth
                      size="small"
                      select
                      defaultValue="biweekly"
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="biweekly">Bi-Weekly</MenuItem>
                      <MenuItem value="semimonthly">Semi-Monthly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                
                <Button variant="contained" sx={{ mt: 2 }}>
                  Calculate Ideal Withholding
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Tax Planning Tips</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex' }}>
              <HomeIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>Homeownership Benefits</Typography>
                <Typography variant="body2">
                  Consider itemizing if you have mortgage interest, property taxes, and other deductions that exceed the standard deduction.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex' }}>
              <SchoolIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>Education Credits</Typography>
                <Typography variant="body2">
                  Look into the American Opportunity Credit or Lifetime Learning Credit for education expenses.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex' }}>
              <FamilyIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>Family Tax Benefits</Typography>
                <Typography variant="body2">
                  Child Tax Credit, Child and Dependent Care Credit, and Earned Income Credit can significantly reduce your tax liability.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex' }}>
              <BusinessIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>Self-Employment</Typography>
                <Typography variant="body2">
                  Self-employed individuals can deduct business expenses and consider a SEP-IRA or Solo 401(k) for retirement savings.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex' }}>
              <HealthcareIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>Healthcare Deductions</Typography>
                <Typography variant="body2">
                  Consider contributing to an HSA if eligible. Medical expenses exceeding 7.5% of AGI may be deductible if itemizing.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex' }}>
              <CharityIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>Charitable Giving</Typography>
                <Typography variant="body2">
                  Donations to qualified organizations can be deducted if you itemize. Consider bunching donations in alternate years.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3 }}>
          <Alert severity="warning">
            <Typography variant="body2">
              Tax laws change frequently. This is for informational purposes only. Consult with a qualified tax professional for personalized tax advice.
            </Typography>
          </Alert>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaxPlanning;