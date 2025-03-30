// src/pages/CreditCardStrategy.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Chip,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  useTheme,
  alpha,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Tooltip,
  LinearProgress,
  FormControlLabel,
  Switch,
  Menu,
  FormHelperText,
  DialogContentText,
  Checkbox
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LabelList,
  Cell
} from 'recharts';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HotelIcon from '@mui/icons-material/Hotel';
import MovieIcon from '@mui/icons-material/Movie';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WifiIcon from '@mui/icons-material/Wifi';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PercentIcon from '@mui/icons-material/Percent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Main Component
const CreditCardStrategy = () => {
  const theme = useTheme();
  
  //-----------------------------------------------------
  // STATIC DATA AND CONSTANTS
  //-----------------------------------------------------
  
  // Family members data
  const familyMembers = [
    { id: 'family', name: 'All Family', avatar: <GroupsIcon />, color: theme.palette.primary.main },
    { id: 'parent1', name: 'Raj', avatar: '👨', color: '#1976d2' },
    { id: 'parent2', name: 'Meera', avatar: '👩', color: '#9c27b0' },
    { id: 'child1', name: 'Arjun', avatar: '👦', color: '#2e7d32' },
    { id: 'child2', name: 'Anjali', avatar: '👧', color: '#d32f2f' }
  ];
  
  // Categories with their icons
  const spendCategories = {
    dining: { name: 'Dining', icon: <RestaurantIcon />, color: theme.palette.error.main },
    grocery: { name: 'Grocery', icon: <ShoppingCartIcon />, color: theme.palette.success.main },
    shopping: { name: 'Shopping', icon: <ShoppingBagIcon />, color: theme.palette.warning.main },
    fuel: { name: 'Fuel', icon: <LocalGasStationIcon />, color: '#ff9800' },
    travel: { name: 'Travel', icon: <FlightIcon />, color: '#03a9f4' },
    transport: { name: 'Transport', icon: <DirectionsBusIcon />, color: '#9c27b0' },
    accommodation: { name: 'Accommodation', icon: <HotelIcon />, color: '#e91e63' },
    entertainment: { name: 'Entertainment', icon: <MovieIcon />, color: theme.palette.info.main },
    telecom: { name: 'Telecom', icon: <PhoneIphoneIcon />, color: '#00bcd4' },
    internet: { name: 'Internet', icon: <WifiIcon />, color: '#3f51b5' },
    education: { name: 'Education', icon: <SchoolIcon />, color: '#607d8b' },
    healthcare: { name: 'Healthcare', icon: <LocalHospitalIcon />, color: theme.palette.warning.main },
    utilities: { name: 'Utilities', icon: <ElectricBoltIcon />, color: '#9c27b0' },
    housing: { name: 'Housing', icon: <HomeIcon />, color: theme.palette.primary.main },
    insurance: { name: 'Insurance', icon: <ReceiptIcon />, color: theme.palette.error.main },
    others: { name: 'Others', icon: <ReceiptIcon />, color: '#607d8b' }
  };

  // Credit card companies with their colors
  const cardIssuers = {
    'HDFC Bank': '#d32f2f',
    'ICICI Bank': '#f57c00',
    'SBI Card': '#0288d1',
    'Axis Bank': '#7b1fa2',
    'Amex': '#212121',
    'Citi': '#0097a7',
    'Standard Chartered': '#388e3c',
    'Yes Bank': '#d32f2f',
    'HSBC': '#d32f2f',
    'RBL': '#d32f2f',
    'IDFC First': '#00897b'
  };

  // Month options for period selection
  const months = [
    { long: 'January', short: 'Jan' },
    { long: 'February', short: 'Feb' },
    { long: 'March', short: 'Mar' },
    { long: 'April', short: 'Apr' },
    { long: 'May', short: 'May' },
    { long: 'June', short: 'Jun' },
    { long: 'July', short: 'Jul' },
    { long: 'August', short: 'Aug' },
    { long: 'September', short: 'Sep' },
    { long: 'October', short: 'Oct' },
    { long: 'November', short: 'Nov' },
    { long: 'December', short: 'Dec' }
  ];
  
  // Array of merchants for realistic data
  const merchants = {
    dining: ['Starbucks', 'McDonald\'s', 'Domino\'s Pizza', 'Café Coffee Day', 'Burger King', 'KFC', 'Subway', 'Pizza Hut', 'Taco Bell'],
    grocery: ['Big Basket', 'Blinkit', 'DMart', 'Reliance Fresh', 'Nature\'s Basket', 'Spencer\'s', 'More Supermarket'],
    shopping: ['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Nykaa', 'Croma', 'Reliance Digital', 'H&M', 'Zara', 'Lifestyle'],
    fuel: ['HP Petrol Pump', 'Indian Oil', 'Bharat Petroleum', 'Shell Petrol Pump', 'Reliance Petroleum'],
    travel: ['MakeMyTrip', 'Yatra', 'Cleartrip', 'IRCTC', 'Indigo Airlines', 'Vistara', 'Air India', 'Ola', 'Uber'],
    accommodation: ['Taj Hotels', 'Marriott', 'OYO Rooms', 'Airbnb', 'Hyatt', 'Leela Palace', 'ITC Hotels'],
    entertainment: ['BookMyShow', 'Netflix', 'Amazon Prime', 'Disney+ Hotstar', 'Spotify', 'PVR Cinemas', 'INOX'],
    telecom: ['Jio', 'Airtel', 'Vi', 'BSNL', 'Tata Teleservices'],
    internet: ['ACT Fibernet', 'Airtel Xstream', 'Jio Fiber', 'BSNL Broadband', 'Excitel'],
    education: ['BYJU\'S', 'Unacademy', 'Vedantu', 'Coursera', 'Udemy', 'upGrad'],
    healthcare: ['Apollo Pharmacy', 'MedPlus', 'Practo', 'NetMeds', 'PharmEasy', 'Max Healthcare', 'Fortis Hospital'],
    utilities: ['BESCOM', 'BWSSB', 'Tata Power', 'Adani Electricity', 'BSES', 'Indraprastha Gas'],
    housing: ['Housing.com', 'HDFC Home Loan', 'SBI Home Loan', 'LIC Housing Finance', 'Bajaj Housing Finance'],
    insurance: ['LIC', 'HDFC Life', 'ICICI Lombard', 'Bajaj Allianz', 'New India Assurance', 'Star Health Insurance'],
    others: ['PayTM', 'PhonePe', 'Google Pay', 'CRED', 'MobiKwik', 'FreeCharge']
  };
  
  // Current date info
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const currentDay = currentDate.getDate();
  
  //-----------------------------------------------------
  // STATE VARIABLES
  //-----------------------------------------------------
  
  // Main state variables
  const [creditCards, setCreditCards] = useState([]);
  const [plannedTransactions, setPlannedTransactions] = useState([]);
  const [openCreditCardDialog, setOpenCreditCardDialog] = useState(false);
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [optimizeRewards, setOptimizeRewards] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  const [chartView, setChartView] = useState('distribution');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMember, setSelectedMember] = useState('family');
  
  // Form data states
  const [cardFormData, setCardFormData] = useState({
    name: '',
    issuer: '',
    variant: '',
    annualFee: '',
    feeWaiverSpend: '',
    spendPeriodMonths: 12,
    rewardRates: {},
    currentSpend: '',
    creditLimit: '',
    expiryDate: '',
    lastBillDate: '',
    lastBillAmount: '',
    minPayment: '',
    cardNumber: '',
    owner: 'family'
  });
  
  const [transactionFormData, setTransactionFormData] = useState({
    description: '',
    category: '',
    amount: '',
    frequency: 'monthly',
    creditCardId: '',
    transactionDate: '',
    merchant: '',
    isRecurring: false,
    owner: 'family'
  });
  
  // Period selection
  const [selectedPeriod, setSelectedPeriod] = useState({
    type: 'month',
    month: 'Mar',
    year: 2025
  });
  const [periodMenuAnchor, setPeriodMenuAnchor] = useState(null);
  const [showFullYear, setShowFullYear] = useState(false);
  
  //-----------------------------------------------------
  // DATA GENERATION FUNCTIONS
  //-----------------------------------------------------
  
  // Generate sample credit cards
  const generateSampleCards = () => {
    return [
      {
        id: 1,
        name: 'Infinia',
        issuer: 'HDFC Bank',
        variant: 'Visa Infinite',
        annualFee: 10000,
        feeWaiverSpend: 800000,
        spendPeriodMonths: 12,
        currentSpend: 250000,
        creditLimit: 1000000,
        expiryDate: '2028-05-31',
        lastBillDate: '2025-03-15',
        lastBillAmount: 78500,
        minPayment: 3925,
        cardNumber: '4567 XXXX XXXX 7890',
        owner: 'parent1',
        rewardRates: {
          dining: 5, // rewards per 100 rupees
          travel: 10,
          shopping: 3,
          fuel: 5,
          others: 3
        }
      },
      {
        id: 2,
        name: 'Platinum',
        issuer: 'Amex',
        variant: 'Charge Card',
        annualFee: 60000,
        feeWaiverSpend: 0, // No fee waiver
        spendPeriodMonths: 12,
        currentSpend: 420000,
        creditLimit: 'No Preset Limit',
        expiryDate: '2027-08-31',
        lastBillDate: '2025-03-22',
        lastBillAmount: 135000,
        minPayment: 135000, // Full payment required for charge card
        cardNumber: '3782 XXXXXX X1000',
        owner: 'parent2',
        rewardRates: {
          dining: 7,
          travel: 7,
          shopping: 3,
          accommodation: 7,
          others: 3
        }
      },
      {
        id: 3,
        name: 'Select',
        issuer: 'Axis Bank',
        variant: 'Visa Signature',
        annualFee: 3000,
        feeWaiverSpend: 500000,
        spendPeriodMonths: 12,
        currentSpend: 150000,
        creditLimit: 700000,
        expiryDate: '2027-12-31',
        lastBillDate: '2025-03-18',
        lastBillAmount: 42500,
        minPayment: 2125,
        cardNumber: '4123 XXXX XXXX 5678',
        owner: 'parent2',
        rewardRates: {
          dining: 5,
          fuel: 5,
          shopping: 2,
          others: 1.5
        }
      },
      {
        id: 4,
        name: 'Neo',
        issuer: 'Axis Bank',
        variant: 'Visa Platinum',
        annualFee: 250,
        feeWaiverSpend: 50000,
        spendPeriodMonths: 3,
        currentSpend: 25000,
        creditLimit: 150000,
        expiryDate: '2026-09-30',
        lastBillDate: '2025-03-10',
        lastBillAmount: 12750,
        minPayment: 637.5,
        cardNumber: '4321 XXXX XXXX 9876',
        owner: 'child1',
        rewardRates: {
          dining: 2,
          fuel: 2,
          shopping: 2,
          others: 1
        }
      },
      {
        id: 5,
        name: 'Millenia',
        issuer: 'ICICI Bank',
        variant: 'Visa Signature',
        annualFee: 2500,
        feeWaiverSpend: 300000,
        spendPeriodMonths: 12,
        currentSpend: 95000,
        creditLimit: 450000,
        expiryDate: '2026-11-30',
        lastBillDate: '2025-03-01',
        lastBillAmount: 38000,
        minPayment: 1900,
        cardNumber: '4565 XXXX XXXX 3210',
        owner: 'family',
        rewardRates: {
          dining: 4,
          shopping: 4,
          entertainment: 3,
          others: 2
        }
      },
      {
        id: 6,
        name: 'Regalia',
        issuer: 'HDFC Bank',
        variant: 'Visa Signature',
        annualFee: 2500,
        feeWaiverSpend: 300000,
        spendPeriodMonths: 12,
        currentSpend: 145000,
        creditLimit: 550000,
        expiryDate: '2027-04-30',
        lastBillDate: '2025-03-20',
        lastBillAmount: 52000,
        minPayment: 2600,
        cardNumber: '4789 XXXX XXXX 5642',
        owner: 'parent1',
        rewardRates: {
          dining: 4,
          travel: 5,
          shopping: 2,
          others: 2
        }
      },
      {
        id: 7,
        name: 'Altitude',
        issuer: 'RBL',
        variant: 'Mastercard World',
        annualFee: 5000,
        feeWaiverSpend: 400000,
        spendPeriodMonths: 12,
        currentSpend: 180000,
        creditLimit: 600000,
        expiryDate: '2026-07-31',
        lastBillDate: '2025-03-05',
        lastBillAmount: 63500,
        minPayment: 3175,
        cardNumber: '5412 XXXX XXXX 7896',
        owner: 'family',
        rewardRates: {
          dining: 5,
          travel: 8,
          shopping: 3,
          others: 2
        }
      },
      {
        id: 8,
        name: 'SmartSpend',
        issuer: 'IDFC First',
        variant: 'Visa Platinum',
        annualFee: 500,
        feeWaiverSpend: 60000,
        spendPeriodMonths: 6,
        currentSpend: 33000,
        creditLimit: 250000,
        expiryDate: '2026-10-31',
        lastBillDate: '2025-03-12',
        lastBillAmount: 18500,
        minPayment: 925,
        cardNumber: '4111 XXXX XXXX 4444',
        owner: 'child2',
        rewardRates: {
          dining: 3,
          fuel: 3,
          telecom: 3,
          others: 1.5
        }
      }
    ];
  };

  // Generate sample transactions
  const generateSampleTransactions = () => {
    // Function to generate a date within the next 90 days
    const getUpcomingTransactionDate = () => {
      const today = new Date();
      const daysToAdd = Math.floor(Math.random() * 90) + 1;
      const transactionDate = new Date(today);
      transactionDate.setDate(today.getDate() + daysToAdd);
      return transactionDate.toISOString().split('T')[0];
    };
    
    // Basic transactions
    const basicTransactions = [
      {
        id: 1,
        description: 'Monthly Groceries',
        category: 'grocery',
        amount: 12000,
        frequency: 'monthly',
        creditCardId: 1, // HDFC Infinia
        transactionDate: '2025-04-20',
        merchant: 'Big Basket',
        isRecurring: true,
        owner: 'family'
      },
      {
        id: 2,
        description: 'Fine Dining',
        category: 'dining',
        amount: 8000,
        frequency: 'monthly',
        creditCardId: 2, // Amex Platinum
        transactionDate: '2025-04-18',
        merchant: 'Taj Hotels',
        isRecurring: false,
        owner: 'parent2'
      },
      {
        id: 3,
        description: 'Petrol',
        category: 'fuel',
        amount: 5000,
        frequency: 'monthly',
        creditCardId: 3, // Axis Select
        transactionDate: '2025-04-15',
        merchant: 'HP Petrol Pump',
        isRecurring: true,
        owner: 'parent2'
      },
      {
        id: 4,
        description: 'Netflix Subscription',
        category: 'entertainment',
        amount: 649,
        frequency: 'monthly',
        creditCardId: 1, // HDFC Infinia
        transactionDate: '2025-04-10',
        merchant: 'Netflix',
        isRecurring: true,
        owner: 'family'
      },
      {
        id: 5,
        description: 'Electricity Bill',
        category: 'utilities',
        amount: 3500,
        frequency: 'monthly',
        creditCardId: 4, // Axis Neo
        transactionDate: '2025-04-05',
        merchant: 'BESCOM',
        isRecurring: true,
        owner: 'parent1'
      },
      {
        id: 6,
        description: 'Shopping Spree',
        category: 'shopping',
        amount: 15000,
        frequency: 'quarterly',
        creditCardId: 5, // ICICI Millenia
        transactionDate: '2025-04-22',
        merchant: 'Amazon',
        isRecurring: false,
        owner: 'parent1'
      },
      {
        id: 7,
        description: 'Internet Bill',
        category: 'internet',
        amount: 1499,
        frequency: 'monthly',
        creditCardId: 6, // HDFC Regalia
        transactionDate: '2025-04-08',
        merchant: 'ACT Fibernet',
        isRecurring: true,
        owner: 'family'
      },
      {
        id: 8,
        description: 'Weekend Getaway',
        category: 'travel',
        amount: 25000,
        frequency: 'quarterly',
        creditCardId: 7, // RBL Altitude
        transactionDate: '2025-04-17',
        merchant: 'MakeMyTrip',
        isRecurring: false,
        owner: 'parent2'
      },
      {
        id: 9,
        description: 'Mobile Recharge',
        category: 'telecom',
        amount: 999,
        frequency: 'monthly',
        creditCardId: 8, // IDFC First SmartSpend
        transactionDate: '2025-04-12',
        merchant: 'Jio',
        isRecurring: true,
        owner: 'child2'
      },
      {
        id: 10,
        description: 'Health Insurance',
        category: 'insurance',
        amount: 20000,
        frequency: 'annually',
        creditCardId: 2, // Amex Platinum
        transactionDate: '2025-04-25',
        merchant: 'HDFC Life',
        isRecurring: true,
        owner: 'family'
      }
    ];
    
    // Add more explicitly upcoming transactions with future dates
    const upcomingTransactions = [
      {
        id: 11,
        description: 'Anniversary Dinner',
        category: 'dining',
        amount: 12000,
        frequency: 'annually',
        creditCardId: 2, // Amex Platinum
        transactionDate: '2025-05-15',
        merchant: 'Taj Hotels',
        isRecurring: false,
        owner: 'parent1'
      },
      {
        id: 12,
        description: 'Summer Vacation',
        category: 'travel',
        amount: 150000,
        frequency: 'annually',
        creditCardId: 7, // RBL Altitude
        transactionDate: '2025-05-25',
        merchant: 'MakeMyTrip',
        isRecurring: false,
        owner: 'family'
      },
      {
        id: 13,
        description: 'New Laptop',
        category: 'shopping',
        amount: 85000,
        frequency: 'once',
        creditCardId: 1, // HDFC Infinia
        transactionDate: '2025-04-30',
        merchant: 'Amazon',
        isRecurring: false,
        owner: 'parent1'
      },
      {
        id: 14,
        description: 'Medical Checkup',
        category: 'healthcare',
        amount: 7500,
        frequency: 'annually',
        creditCardId: 2, // Amex Platinum
        transactionDate: '2025-05-10',
        merchant: 'Apollo Pharmacy',
        isRecurring: true,
        owner: 'parent2'
      },
      {
        id: 15,
        description: 'Phone Bill',
        category: 'telecom',
        amount: 1499,
        frequency: 'monthly',
        creditCardId: 3, // Axis Select
        transactionDate: '2025-04-28',
        merchant: 'Airtel',
        isRecurring: true,
        owner: 'parent1'
      },
      {
        id: 16,
        description: 'Online Course',
        category: 'education',
        amount: 12999,
        frequency: 'once',
        creditCardId: 5, // ICICI Millenia
        transactionDate: '2025-05-05',
        merchant: 'Coursera',
        isRecurring: false,
        owner: 'parent2'
      },
      {
        id: 17,
        description: 'New Smartphone',
        category: 'shopping',
        amount: 79999,
        frequency: 'once',
        creditCardId: 1, // HDFC Infinia
        transactionDate: '2025-06-10',
        merchant: 'Croma',
        isRecurring: false,
        owner: 'child1'
      },
      {
        id: 18,
        description: 'Birthday Gift',
        category: 'shopping',
        amount: 5000,
        frequency: 'once',
        creditCardId: 6, // HDFC Regalia
        transactionDate: '2025-05-18',
        merchant: 'Myntra',
        isRecurring: false,
        owner: 'parent2'
      },
      {
        id: 19,
        description: 'Gym Membership',
        category: 'others',
        amount: 20000,
        frequency: 'annually',
        creditCardId: 8, // IDFC First SmartSpend
        transactionDate: '2025-06-01',
        merchant: 'Cult.fit',
        isRecurring: true,
        owner: 'parent1'
      },
      {
        id: 20,
        description: 'Weekend Movie',
        category: 'entertainment',
        amount: 1500,
        frequency: 'monthly',
        creditCardId: 4, // Axis Neo
        transactionDate: '2025-04-29',
        merchant: 'PVR Cinemas',
        isRecurring: true,
        owner: 'family'
      }
    ];
    
    // Generate additional random transactions
    const additionalTransactions = [];
    let idCounter = 21;
    
    // Create some transactions for each card
    for (let i = 1; i <= 8; i++) {
      // Generate 2-4 transactions per card
      const transactionsCount = Math.floor(Math.random() * 3) + 2;
      
      for (let j = 0; j < transactionsCount; j++) {
        // Pick a random category
        const categories = Object.keys(spendCategories);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        // Generate random amount based on category
        let randomAmount;
        switch (randomCategory) {
          case 'dining':
            randomAmount = Math.floor(Math.random() * 3000) + 500;
            break;
          case 'shopping':
            randomAmount = Math.floor(Math.random() * 10000) + 1000;
            break;
          case 'travel':
            randomAmount = Math.floor(Math.random() * 30000) + 5000;
            break;
          case 'accommodation':
            randomAmount = Math.floor(Math.random() * 20000) + 3000;
            break;
          case 'fuel':
            randomAmount = Math.floor(Math.random() * 3000) + 1000;
            break;
          default:
            randomAmount = Math.floor(Math.random() * 5000) + 500;
        }
        
        // Select random merchant from category or use "Others" if no specific merchants
        const merchantList = merchants[randomCategory] || merchants.others;
        const randomMerchant = merchantList[Math.floor(Math.random() * merchantList.length)];
        
        // Generate random frequency
        const frequencies = ['monthly', 'quarterly', 'annually', 'once'];
        const frequencyWeights = [0.6, 0.2, 0.1, 0.1]; // 60% monthly, 20% quarterly, 10% annually, 10% once
        
        let randomFrequency;
        const rand = Math.random();
        if (rand < frequencyWeights[0]) {
          randomFrequency = frequencies[0];
        } else if (rand < frequencyWeights[0] + frequencyWeights[1]) {
          randomFrequency = frequencies[1];
        } else if (rand < frequencyWeights[0] + frequencyWeights[1] + frequencyWeights[2]) {
          randomFrequency = frequencies[2];
        } else {
          randomFrequency = frequencies[3];
        }
        
        // Determine if recurring based on category and frequency
        const isRecurring = randomFrequency !== 'once' && Math.random() < 0.6; // 60% chance of being recurring for recurring frequencies
        
        // Generate future date for planned transactions
        const transactionDate = getUpcomingTransactionDate();
        
        // Assign random family member
        const familyMemberIds = ['family', 'parent1', 'parent2', 'child1', 'child2'];
        const randomOwner = familyMemberIds[Math.floor(Math.random() * familyMemberIds.length)];
        
        additionalTransactions.push({
          id: idCounter++,
          description: `${randomMerchant} ${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)}`,
          category: randomCategory,
          amount: randomAmount,
          frequency: randomFrequency,
          creditCardId: i,
          transactionDate: transactionDate,
          merchant: randomMerchant,
          isRecurring: isRecurring,
          owner: randomOwner
        });
      }
    }
    
    return [...basicTransactions, ...upcomingTransactions, ...additionalTransactions];
  };

  //-----------------------------------------------------
  // LIFECYCLE HOOKS
  //-----------------------------------------------------
  
  // Load data on component mount
  useEffect(() => {
    // Sample credit cards for demonstration
    const sampleCards = generateSampleCards();
    setCreditCards(sampleCards);
    localStorage.setItem('creditCards', JSON.stringify(sampleCards));
        
    // Sample planned transactions for demonstration
    const sampleTransactions = generateSampleTransactions();
    setPlannedTransactions(sampleTransactions);
    localStorage.setItem('plannedTransactions', JSON.stringify(sampleTransactions));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('creditCards', JSON.stringify(creditCards));
  }, [creditCards]);

  useEffect(() => {
    localStorage.setItem('plannedTransactions', JSON.stringify(plannedTransactions));
  }, [plannedTransactions]);

  //-----------------------------------------------------
  // DATA FILTERING AND CALCULATION FUNCTIONS
  //-----------------------------------------------------
  
  // Filter data based on selected member
  const getFilteredCards = () => {
    if (selectedMember === 'family') {
      return creditCards;
    }
    
    return creditCards.filter(card => card.owner === selectedMember || card.owner === 'family');
  };

  // Function to get filtered transactions based on selected member and period
  const getFilteredTransactions = () => {
    // First filter by member
    const memberFiltered = selectedMember === 'family' 
      ? plannedTransactions 
      : plannedTransactions.filter(transaction => 
          transaction.owner === selectedMember || 
          transaction.owner === 'family' ||
          getFilteredCards().some(card => card.id === transaction.creditCardId)
        );
    
    // Then filter by period if not showing full year
    if (!showFullYear) {
      // Get month index (0-11) from selected month short name
      const monthIndex = months.findIndex(m => m.short === selectedPeriod.month);
      
      // Filter by month and year
      return memberFiltered.filter(transaction => {
        const transactionDate = new Date(transaction.transactionDate);
        return transactionDate.getMonth() === monthIndex && 
               transactionDate.getFullYear() === selectedPeriod.year;
      });
    }
    
    return memberFiltered;
  };

  // Get only upcoming (future) transactions
  const getUpcomingTransactions = () => {
    const today = new Date();
    return getFilteredTransactions().filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate >= today;
    }).sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate));
  };

  // Calculate total spend across all cards
  const getTotalAnnualSpend = () => {
    return filteredCards.reduce((total, card) => total + card.currentSpend, 0);
  };

  // Filter transactions based on category tab
  const getTabFilteredTransactions = () => {
    // First filter by owner
    const filteredTxs = upcomingTransactions;
    
    // Then filter by category tab
    switch (activeTab) {
      case 0: // All
        return filteredTxs;
      case 1: // Monthly
        return filteredTxs.filter(t => t.frequency === 'monthly');
      case 2: // Recurring
        return filteredTxs.filter(t => t.isRecurring);
      case 3: // High Value
        return filteredTxs.filter(t => t.amount > 5000);
      case 4: // Dining
        return filteredTxs.filter(t => t.category === 'dining');
      case 5: // Travel
        return filteredTxs.filter(t => t.category === 'travel');
      default:
        return filteredTxs;
    }
  };

  // Get filtered elements based on current selections
  const filteredTransactions = getFilteredTransactions();
  const upcomingTransactions = getUpcomingTransactions();
  const filteredCards = getFilteredCards();
  const tabFilteredTransactions = getTabFilteredTransactions();
  
  // Calculate total planned monthly spend for filtered transactions
  const totalMonthlyPlannedSpend = filteredTransactions.reduce((sum, transaction) => {
    if (transaction.frequency === 'monthly') {
      return sum + transaction.amount;
    } else if (transaction.frequency === 'annually') {
      return sum + (transaction.amount / 12);
    } else if (transaction.frequency === 'quarterly') {
      return sum + (transaction.amount / 3);
    } else if (transaction.frequency === 'biannually') {
      return sum + (transaction.amount / 6);
    } else if (transaction.frequency === 'weekly') {
      return sum + (transaction.amount * 4.33);
    } else if (transaction.frequency === 'daily') {
      return sum + (transaction.amount * 30);
    }
    return sum;
  }, 0);

  // Calculate reward points earned from planned transactions
  const calculateRewardPoints = () => {
    let totalRewards = 0;
    let rewardsByCard = {};

    filteredTransactions.forEach(transaction => {
      const card = creditCards.find(c => c.id === transaction.creditCardId);
      if (!card) return;

      let monthlyAmount = transaction.amount;
      if (transaction.frequency === 'annually') monthlyAmount /= 12;
      else if (transaction.frequency === 'quarterly') monthlyAmount /= 3;
      else if (transaction.frequency === 'biannually') monthlyAmount /= 6;
      else if (transaction.frequency === 'weekly') monthlyAmount *= 4.33;
      else if (transaction.frequency === 'daily') monthlyAmount *= 30;

      let annualAmount = monthlyAmount * 12;

      // Get reward rate, prioritize category-specific rate or use "others" as fallback
      const rewardRate = card.rewardRates[transaction.category] || card.rewardRates.others || 0;
      
      // Calculate rewards (amount / 100 * rewardRate)
      const rewardAmount = (annualAmount / 100) * rewardRate;
      totalRewards += rewardAmount;
      
      if (!rewardsByCard[card.id]) {
        rewardsByCard[card.id] = rewardAmount;
      } else {
        rewardsByCard[card.id] += rewardAmount;
      }
    });

    return { totalRewards, rewardsByCard };
  };

  // Get optimal card assignments for maximum rewards
  const getOptimalCardAssignments = () => {
    if (!optimizeRewards) return {};
    
    let optimalAssignments = {};
    
    upcomingTransactions.forEach(transaction => {
      // Find card with highest reward rate for this category
      let bestCardId = null;
      let bestRewardRate = -1;
      
      filteredCards.forEach(card => {
        const categoryRate = card.rewardRates[transaction.category] || card.rewardRates.others || 0;
        if (categoryRate > bestRewardRate) {
          bestRewardRate = categoryRate;
          bestCardId = card.id;
        }
      });
      
      if (bestCardId && bestCardId !== transaction.creditCardId) {
        optimalAssignments[transaction.id] = bestCardId;
      }
    });

    return optimalAssignments;
  };

  // Calculate potential additional rewards from optimal assignments
  const calculateOptimalRewardsGain = (optimalAssignments) => {
    let additionalRewards = 0;
    
    Object.entries(optimalAssignments).forEach(([transactionId, cardId]) => {
      const transaction = upcomingTransactions.find(t => t.id === parseInt(transactionId));
      if (!transaction) return;
      
      const currentCard = creditCards.find(c => c.id === transaction.creditCardId);
      const optimalCard = creditCards.find(c => c.id === cardId);
      if (!currentCard || !optimalCard) return;
      
      let monthlyAmount = transaction.amount;
      if (transaction.frequency === 'annually') monthlyAmount /= 12;
      else if (transaction.frequency === 'quarterly') monthlyAmount /= 3;
      else if (transaction.frequency === 'biannually') monthlyAmount /= 6;
      else if (transaction.frequency === 'weekly') monthlyAmount *= 4.33;
      else if (transaction.frequency === 'daily') monthlyAmount *= 30;
      
      let annualAmount = monthlyAmount * 12;
      
      const currentRate = currentCard.rewardRates[transaction.category] || currentCard.rewardRates.others || 0;
      const optimalRate = optimalCard.rewardRates[transaction.category] || optimalCard.rewardRates.others || 0;
      
      const currentRewards = (annualAmount / 100) * currentRate;
      const optimalRewards = (annualAmount / 100) * optimalRate;
      
      additionalRewards += (optimalRewards - currentRewards);
    });
    
    return additionalRewards;
  };

  // Calculate spending progress for fee waiver
  const calculateFeeWaiverProgress = (card) => {
    if (!card.feeWaiverSpend || card.feeWaiverSpend === 0) return 100; // No fee waiver target
    return Math.min(100, (card.currentSpend / card.feeWaiverSpend) * 100);
  };

  // Calculate days until payment due for cards
  const calculateDaysUntilPayment = (card) => {
    if (!card.lastBillDate) return null;
    
    // Assume payment due is typically 18-21 days after bill generation
    const billDate = new Date(card.lastBillDate);
    const dueDate = new Date(billDate);
    dueDate.setDate(billDate.getDate() + 20); // Assuming 20 days payment period
    
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Calculate cards with upcoming payment due dates
  const getUpcomingPayments = () => {
    return filteredCards
      .map(card => ({
        ...card,
        daysUntilPayment: calculateDaysUntilPayment(card)
      }))
      .filter(card => card.daysUntilPayment !== null && card.daysUntilPayment >= 0 && card.daysUntilPayment <= 7)
      .sort((a, b) => a.daysUntilPayment - b.daysUntilPayment);
  };

  // Calculate total annual fee and waived annual fee
  const calculateAnnualFees = () => {
    const totalAnnualFee = filteredCards.reduce((sum, card) => sum + card.annualFee, 0);
    
    // Calculate waived fees based on spending progress
    const waived = filteredCards.reduce((sum, card) => {
      if (card.currentSpend >= card.feeWaiverSpend && card.feeWaiverSpend > 0) {
        return sum + card.annualFee;
      }
      return sum;
    }, 0);
    
    return { totalAnnualFee, waived };
  };

  // Calculate average reward rate across all cards
  const calculateAverageRewardRate = () => {
    const { totalRewards } = calculateRewardPoints();
    const totalSpend = getTotalAnnualSpend();
    
    if (totalSpend === 0) return 0;
    
    return (totalRewards / totalSpend) * 100;
  };

  // Calculate reward points
  const { totalRewards, rewardsByCard } = calculateRewardPoints();
  const optimalAssignments = getOptimalCardAssignments();
  const potentialRewardsGain = calculateOptimalRewardsGain(optimalAssignments);
  
  // Calculate annual fees
  const { totalAnnualFee, waived } = calculateAnnualFees();
  const annualFeeDue = totalAnnualFee - waived;
  
  // Calculate average reward rate
  const averageRewardRate = calculateAverageRewardRate();

  // Calculate upcoming payments
  const upcomingPayments = getUpcomingPayments();

  //-----------------------------------------------------
  // FORMATTER FUNCTIONS
  //-----------------------------------------------------
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format number with commas
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(value));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format percentage
  const formatPercentage = (value, plusSign = false) => {
    if (value === null || value === undefined) return 'N/A';
    return `${plusSign && value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  //-----------------------------------------------------
  // EVENT HANDLERS
  //-----------------------------------------------------
  
  // Get combined display text for selected period
  const getSelectedPeriodText = () => {
    if (showFullYear) {
      return `Full Year ${selectedPeriod.year}`;
    } else {
      return `${selectedPeriod.month}-${selectedPeriod.year.toString().slice(-2)}`;
    }
  };

  // Handle period menu
  const handleOpenPeriodMenu = (event) => {
    setPeriodMenuAnchor(event.currentTarget);
  };
  
  const handleClosePeriodMenu = () => {
    setPeriodMenuAnchor(null);
  };
  
  const handlePeriodSelect = (month, year) => {
    setSelectedPeriod({
      type: 'month',
      month,
      year
    });
    setShowFullYear(false);
    handleClosePeriodMenu();
  };
  
  const handleFullYearSelect = () => {
    setShowFullYear(true);
    handleClosePeriodMenu();
  };

  // Handle member change
  const handleMemberChange = (event, newMember) => {
    if (newMember) {
      setSelectedMember(newMember);
    }
  };

  // Handle card and transaction form inputs
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('rewardRate_')) {
      const category = name.split('_')[1];
      setCardFormData({
        ...cardFormData,
        rewardRates: {
          ...cardFormData.rewardRates,
          [category]: parseFloat(value) || 0
        }
      });
    } else {
      setCardFormData({
        ...cardFormData,
        [name]: value
      });
    }
  };

  const handleTransactionInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setTransactionFormData({
        ...transactionFormData,
        [name]: checked
      });
    } else {
      setTransactionFormData({
        ...transactionFormData,
        [name]: value
      });
    }
  };

  // Handler for opening/closing dialogs
  const handleAddCreditCard = () => {
    setCardFormData({
      name: '',
      issuer: '',
      variant: '',
      annualFee: '',
      feeWaiverSpend: '',
      spendPeriodMonths: 12,
      rewardRates: {},
      currentSpend: '',
      creditLimit: '',
      expiryDate: '',
      lastBillDate: '',
      lastBillAmount: '',
      minPayment: '',
      cardNumber: '',
      owner: selectedMember === 'family' ? 'family' : selectedMember
    });
    setEditItemId(null);
    setOpenCreditCardDialog(true);
  };

  const handleEditCreditCard = (id) => {
    const card = creditCards.find(c => c.id === id);
    if (card) {
      setCardFormData({
        name: card.name,
        issuer: card.issuer,
        variant: card.variant,
        annualFee: card.annualFee.toString(),
        feeWaiverSpend: card.feeWaiverSpend.toString(),
        spendPeriodMonths: card.spendPeriodMonths,
        rewardRates: { ...card.rewardRates },
        currentSpend: card.currentSpend.toString(),
        creditLimit: card.creditLimit.toString(),
        expiryDate: card.expiryDate || '',
        lastBillDate: card.lastBillDate || '',
        lastBillAmount: card.lastBillAmount ? card.lastBillAmount.toString() : '',
        minPayment: card.minPayment ? card.minPayment.toString() : '',
        cardNumber: card.cardNumber || '',
        owner: card.owner || 'family'
      });
      setEditItemId(id);
      setOpenCreditCardDialog(true);
    }
  };

  const handleAddTransaction = () => {
    setTransactionFormData({
      description: '',
      category: '',
      amount: '',
      frequency: 'monthly',
      creditCardId: '',
      transactionDate: new Date().toISOString().split('T')[0],
      merchant: '',
      isRecurring: false,
      owner: selectedMember === 'family' ? 'family' : selectedMember
    });
    setEditItemId(null);
    setOpenTransactionDialog(true);
  };

  const handleEditTransaction = (id) => {
    const transaction = plannedTransactions.find(t => t.id === id);
    if (transaction) {
      setTransactionFormData({
        description: transaction.description,
        category: transaction.category,
        amount: transaction.amount.toString(),
        frequency: transaction.frequency,
        creditCardId: transaction.creditCardId.toString(),
        transactionDate: transaction.transactionDate || new Date().toISOString().split('T')[0],
        merchant: transaction.merchant || '',
        isRecurring: transaction.isRecurring || false,
        owner: transaction.owner || 'family'
      });
      setEditItemId(id);
      setOpenTransactionDialog(true);
    }
  };

  // Handler for saving card and transaction data
  const handleSaveCreditCard = () => {
    const newCard = {
      name: cardFormData.name,
      issuer: cardFormData.issuer,
      variant: cardFormData.variant,
      annualFee: parseFloat(cardFormData.annualFee),
      feeWaiverSpend: parseFloat(cardFormData.feeWaiverSpend) || 0,
      spendPeriodMonths: parseInt(cardFormData.spendPeriodMonths),
      rewardRates: cardFormData.rewardRates,
      currentSpend: parseFloat(cardFormData.currentSpend) || 0,
      creditLimit: cardFormData.creditLimit,
      expiryDate: cardFormData.expiryDate,
      lastBillDate: cardFormData.lastBillDate,
      lastBillAmount: parseFloat(cardFormData.lastBillAmount) || 0,
      minPayment: parseFloat(cardFormData.minPayment) || 0,
      cardNumber: cardFormData.cardNumber,
      owner: cardFormData.owner
    };
    
    if (editItemId) {
      // Update existing card
      setCreditCards(creditCards.map(card => 
        card.id === editItemId ? { ...newCard, id: editItemId } : card
      ));
    } else {
      // Add new card
      newCard.id = Date.now();
      setCreditCards([...creditCards, newCard]);
    }
    
    setOpenCreditCardDialog(false);
    setEditItemId(null);
  };

  const handleSaveTransaction = () => {
    const newTransaction = {
      description: transactionFormData.description,
      category: transactionFormData.category,
      amount: parseFloat(transactionFormData.amount),
      frequency: transactionFormData.frequency,
      creditCardId: parseInt(transactionFormData.creditCardId),
      transactionDate: transactionFormData.transactionDate,
      merchant: transactionFormData.merchant,
      isRecurring: transactionFormData.isRecurring,
      owner: transactionFormData.owner
    };
    
    if (editItemId) {
      // Update existing transaction
      setPlannedTransactions(plannedTransactions.map(transaction => 
        transaction.id === editItemId ? { ...newTransaction, id: editItemId } : transaction
      ));
    } else {
      // Add new transaction
      newTransaction.id = Date.now();
      setPlannedTransactions([...plannedTransactions, newTransaction]);
    }
    
    setOpenTransactionDialog(false);
    setEditItemId(null);
  };

  // Handler for deleting items
  const handleDeleteCreditCard = (id) => {
    if (window.confirm('Are you sure you want to delete this credit card? This will also remove any associated planned transactions.')) {
      setCreditCards(creditCards.filter(card => card.id !== id));
      // Remove any transactions associated with this card
      setPlannedTransactions(plannedTransactions.filter(transaction => transaction.creditCardId !== id));
    }
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this planned transaction?')) {
      setPlannedTransactions(plannedTransactions.filter(transaction => transaction.id !== id));
    }
  };

  // Apply optimal card assignments
  const handleApplyOptimalAssignments = () => {
    const optimalAssignments = getOptimalCardAssignments();
    
    if (Object.keys(optimalAssignments).length === 0) {
      alert('Your transactions are already optimally assigned!');
      return;
    }
    
    // Update transactions with optimal card assignments
    const updatedTransactions = plannedTransactions.map(transaction => {
      if (optimalAssignments[transaction.id]) {
        return {
          ...transaction,
          creditCardId: optimalAssignments[transaction.id]
        };
      }
      return transaction;
    });
    
    setPlannedTransactions(updatedTransactions);
  };

  // Reassign transaction to different card
  const handleReassignTransaction = (transactionId, newCardId) => {
    setPlannedTransactions(plannedTransactions.map(transaction => 
      transaction.id === transactionId ? { ...transaction, creditCardId: newCardId } : transaction
    ));
  };

  // Toggle balances visibility
  const toggleBalancesVisibility = () => {
    setHideBalances(!hideBalances);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle chart view change
  const handleChartViewChange = (view) => {
    setChartView(view);
  };
  
  //-----------------------------------------------------
  // DATA FOR CHARTS
  //-----------------------------------------------------
  
  // Data for rewards analysis chart
  const rewardsData = filteredCards.map(card => {
    return {
      name: `${card.issuer} ${card.name}`,
      rewards: rewardsByCard[card.id] || 0,
      rewardRate: Object.values(card.rewardRates).reduce((sum, rate) => sum + rate, 0) / Object.keys(card.rewardRates).length,
      color: cardIssuers[card.issuer] || theme.palette.grey[500]
    };
  }).sort((a, b) => b.rewards - a.rewards);

  // Monthly history data for charts
  const monthlyRewardsHistory = [
    { month: 'Oct', rewards: 7500 },
    { month: 'Nov', rewards: 8200 },
    { month: 'Dec', rewards: 9300 },
    { month: 'Jan', rewards: 7800 },
    { month: 'Feb', rewards: 8000 },
    { month: 'Mar', rewards: 8500 },
    { month: 'Apr', rewards: totalRewards / 12 },
  ];

  // Custom tooltips for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: theme.shadows[3] }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{label || payload[0].name}</Typography>
          {payload.map((entry, index) => (
            <Box key={`tooltip-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color || entry.fill,
                  marginRight: 1,
                  borderRadius: '50%'
                }}
              />
              <Typography variant="body2" sx={{ mr: 2 }}>
                {entry.name}:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {entry.dataKey === 'rewards' 
                  ? `${formatNumber(entry.value)} points`
                  : entry.dataKey === 'rewardRate'
                  ? `${entry.value.toFixed(1)}X avg`
                  : formatCurrency(entry.value)
                }
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  //-----------------------------------------------------
  // RENDER COMPONENT
  //-----------------------------------------------------
  
  return (
    <Box sx={{ p: 3 }}>
      <>
        {/* Banner with title */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 3,
            background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: -50, 
            right: -50, 
            width: '40%', 
            height: '200%', 
            opacity: 0.1, 
            background: `radial-gradient(circle, ${theme.palette.common.white} 0%, transparent 70%)` 
          }} />
          
          {/* Title and Period Filter Bar */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 5 }}>
            <Typography variant="h4" fontWeight="bold" component="h1">
              Credit Card Strategy
            </Typography>

            {/* Period Dropdown */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                startIcon={<CalendarTodayIcon />}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleOpenPeriodMenu}
                sx={{ 
                  color: 'white', 
                  bgcolor: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)',
                  }
                }}
              >
                {getSelectedPeriodText()}
              </Button>
              
              <IconButton 
                sx={{ ml: 2, color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
                onClick={toggleBalancesVisibility}
                size="small"
              >
                {hideBalances ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
              
              <Menu
                anchorEl={periodMenuAnchor}
                open={Boolean(periodMenuAnchor)}
                onClose={handleClosePeriodMenu}
                PaperProps={{
                  sx: {
                    mt: 1,
                    maxHeight: 400,
                    width: 200,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <MenuItem onClick={handleFullYearSelect}>
                  <DateRangeIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography>Full Year {currentYear}</Typography>
                </MenuItem>
                <Divider />
                {months.map(month => (
                  <MenuItem 
                    key={month.short} 
                    onClick={() => handlePeriodSelect(month.short, currentYear)}
                    sx={{ 
                      bgcolor: month.short === selectedPeriod.month && !showFullYear ? alpha(theme.palette.primary.light, 0.1) : 'inherit',
                      '&:hover': {
                        bgcolor: month.short === selectedPeriod.month && !showFullYear ? alpha(theme.palette.primary.light, 0.2) : alpha(theme.palette.action.hover, 0.1)
                      }
                    }}
                  >
                    <CalendarTodayIcon sx={{ mr: 1, fontSize: 18, opacity: 0.7 }} />
                    <Typography>{month.short}-{currentYear.toString().slice(-2)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          
          {/* Member Selection */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
            <Tabs
              value={selectedMember}
              onChange={handleMemberChange}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{
                style: { background: 'rgba(255, 255, 255, 0.8)' }
              }}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px',
                  minHeight: '64px',
                  p: 1,
                  mx: 0.5,
                  textTransform: 'none',
                  fontWeight: 'medium',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&.Mui-selected': {
                    color: 'white',
                    fontWeight: 'bold',
                    bgcolor: 'rgba(255, 255, 255, 0.15)'
                  }
                }
              }}
            >
              {familyMembers.map(member => (
                <Tab 
                  key={member.id}
                  value={member.id}
                  icon={
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha(member.color, 0.2),
                        color: 'white',
                        width: 36,
                        height: 36,
                        mb: 0.5,
                        fontSize: typeof member.avatar === 'string' ? 20 : 'inherit'
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                  }
                  label={member.name}
                  iconPosition="top"
                />
              ))}
            </Tabs>
          </Box>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h5" fontWeight="bold" component="div">
                  {selectedMember === 'family' ? 'Family Credit Card Strategy' : `${familyMembers.find(m => m.id === selectedMember)?.name}'s Credit Cards`}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
                  {hideBalances ? '••••••••' : formatCurrency(totalMonthlyPlannedSpend)}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  monthly planned spend
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  py: 0.75,
                  px: 1.5, 
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', 
                  border: `1px solid rgba(46, 125, 50, 0.3)`,
                }}>
                  <CardGiftcardIcon fontSize="small" sx={{ color: '#2e7d32' }} />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      ml: 0.5,
                      fontWeight: 'medium',
                      color: '#2e7d32'
                    }}
                  >
                    {hideBalances ? '••••••••' : `${formatNumber(totalRewards)} reward points annually`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                {!showFullYear && (
                  <Typography variant="h6" fontWeight="medium" sx={{ mr: 2 }}>
                    Day {currentDay} of {daysInMonth}
                  </Typography>
                )}
                <Chip 
                  size="medium"
                  label={showFullYear 
                    ? `${currentMonth} ${currentYear}`
                    : `${Math.floor(daysInMonth - currentDay)} days left`
                  }
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                />
              </Box>
              
              <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 1, textAlign: 'right' }}>
                Optimization Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 5, mr: 2, p: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={optimizeRewards} 
                        onChange={(e) => setOptimizeRewards(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'white',
                            '&:hover': {
                              backgroundColor: alpha('#ffffff', 0.1),
                            },
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography color="white" variant="body2">
                        Auto-optimize for maximum rewards
                      </Typography>
                    }
                    sx={{ margin: 0 }}
                  />
                </Box>
                
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleApplyOptimalAssignments}
                  disabled={!optimizeRewards || Object.keys(optimalAssignments).length === 0}
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.9)', 
                    color: theme.palette.primary.dark,
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.95)' },
                    textTransform: 'none',
                    borderRadius: 2
                  }}
                >
                  Apply Optimal
                </Button>
              </Box>
              
              <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'medium', mt: 2 }}>
                {Object.keys(optimalAssignments).length > 0 ? (
                  <span>Potential gain: +{hideBalances ? '••••' : formatNumber(potentialRewardsGain)} points</span>
                ) : (
                  <span>Your strategy is optimized! 👍</span>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Summary Cards Row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
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
              <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      mr: 1.5, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main
                    }}>
                      <AccountBalanceWalletIcon />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                      Annual Spend
                    </Typography>
                  </Box>
                  
                  <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                    {hideBalances ? '••••••••' : formatCurrency(getTotalAnnualSpend())}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  Across {filteredCards.length} cards
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={`${filteredCards.filter(card => card.feeWaiverSpend > 0 && card.currentSpend >= card.feeWaiverSpend).length} Fee Waivers`} 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 'medium'
                    }} 
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontWeight: 'medium'
                    }}
                  >
                    <TrendingUpIcon 
                      fontSize="small" 
                      sx={{ 
                        mr: 0.5,
                        color: theme.palette.success.main
                      }} 
                    />
                    +3.2%
                  </Typography>
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
              <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      mr: 1.5, 
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main
                    }}>
                      <CardGiftcardIcon />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                      Rewards Earned
                    </Typography>
                  </Box>
                  
                  <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                    {hideBalances ? '••••••••' : `${formatNumber(totalRewards)}`}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  Value: Approx. {hideBalances ? '••••••••' : formatCurrency(totalRewards * 0.25)} (@ 0.25₹/point)
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={`${filteredCards.length} Active Cards`} 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                      fontWeight: 'medium'
                    }} 
                  />
                  {potentialRewardsGain > 0 && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontWeight: 'medium'
                      }}
                    >
                      <TrendingUpIcon 
                        fontSize="small" 
                        sx={{ 
                          mr: 0.5,
                          color: theme.palette.warning.main
                        }} 
                      />
                      +{(potentialRewardsGain / totalRewards * 100).toFixed(1)}%
                    </Typography>
                  )}
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
                  backgroundColor: alpha(theme.palette.success.main, 0.15)
                }} />
              </Box>
              <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      mr: 1.5, 
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main
                    }}>
                      <AttachMoneyIcon />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                      Annual Fee Due
                    </Typography>
                  </Box>
                  
                  <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                    {hideBalances ? '••••••••' : formatCurrency(annualFeeDue)}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {waived > 0 ? `${formatCurrency(waived)} waived via spend` : 'No fees waived yet'}
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={`${filteredCards.filter(card => card.feeWaiverSpend > 0).length} Eligible Cards`} 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      fontWeight: 'medium'
                    }} 
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontWeight: 'medium'
                    }}
                  >
                    {waived > 0 ? `${(waived / totalAnnualFee * 100).toFixed(0)}% saved` : 'No savings yet'}
                  </Typography>
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
                  backgroundColor: alpha(theme.palette.warning.main, 0.15)
                }} />
              </Box>
              <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      mr: 1.5, 
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.main
                    }}>
                      <PercentIcon />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
                      Reward Rate
                    </Typography>
                  </Box>
                  
                  <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                    {formatPercentage(averageRewardRate)}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {potentialRewardsGain > 0 ? `Potential: ${formatPercentage((averageRewardRate + (potentialRewardsGain / getTotalAnnualSpend() * 100)))}` : 'Optimized rate'}
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={`${Object.keys(optimalAssignments).length} can improve`} 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.main,
                      fontWeight: 'medium'
                    }} 
                  />
                  <Button
                    variant="text"
                    size="small"
                    disabled={Object.keys(optimalAssignments).length === 0}
                    onClick={handleApplyOptimalAssignments}
                    sx={{ 
                      color: theme.palette.warning.main,
                      p: 0,
                      minWidth: 'auto',
                      fontWeight: 'medium',
                      fontSize: '0.75rem'
                    }}
                  >
                    Optimize
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Rewards Analysis Chart */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%', 
                borderRadius: 3,
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="medium">Rewards Analysis</Typography>
                <ButtonGroup 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderRadius: '12px',
                    '& .MuiButton-root': {
                      borderRadius: 0,
                      textTransform: 'none',
                      px: 2
                    },
                    '& .MuiButton-root:first-of-type': {
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px'
                    },
                    '& .MuiButton-root:last-of-type': {
                      borderTopRightRadius: '12px',
                      borderBottomRightRadius: '12px'
                    },
                    overflow: 'hidden'
                  }}
                >
                  <Button 
                    variant={chartView === 'distribution' ? 'contained' : 'outlined'}
                    onClick={() => handleChartViewChange('distribution')}
                    startIcon={<BarChartIcon />}
                  >
                    Distribution
                  </Button>
                  <Button 
                    variant={chartView === 'timeline' ? 'contained' : 'outlined'}
                    onClick={() => handleChartViewChange('timeline')}
                    startIcon={<TimelineIcon />}
                  >
                    Timeline
                  </Button>
                </ButtonGroup>
              </Box>
              
              <Box sx={{ height: 350, width: '100%' }}>
               {chartView === 'distribution' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={rewardsData}
                      margin={{ top: 20, right: 20, left: 20, bottom: 70 }} // Reduced top margin since we don't need space for labels
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        type="number"
                        tickFormatter={(value) => value === 0 ? '0' : `${Math.floor(value / 1000)}k`} 
                      />
                      <YAxis 
                        type="category"
                        dataKey="name"
                        width={140}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ bottom: 0 }} />
                      <Bar 
                        dataKey="rewards" 
                        name="Reward Points"
                        fill={theme.palette.primary.main}
                        radius={[0, 4, 4, 0]}
                      >
                        {rewardsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
                
                {chartView === 'timeline' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyRewardsHistory}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => value === 0 ? '0' : `${Math.floor(value / 1000)}k`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${formatNumber(value)} points`, 'Monthly Rewards']}
                          labelFormatter={(value) => `Month: ${value}`}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="rewards" 
                          name="Monthly Rewards" 
                          stroke={theme.palette.primary.main}
                          fill={alpha(theme.palette.primary.main, 0.2)}
                          strokeWidth={2}
                          activeDot={{ r: 6, fill: theme.palette.primary.main, stroke: theme.palette.primary.light, strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Main Content Grid - Credit Cards and Transactions */}
          <Grid container spacing={3}>
            {/* Left Column - Fee Waiver Progress */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  minHeight: 400
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3
                }}>
                  <Typography variant="h6" fontWeight="medium">Credit Cards Fee Waiver Progress</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddCreditCard}
                    sx={{ 
                      borderRadius: 2, 
                      textTransform: 'none',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    Add Card
                  </Button>
                </Box>
                
                <Box sx={{ mb: 2, maxHeight: 500, overflowY: 'auto' }}>
                  {filteredCards.map((card) => {
                    const progress = calculateFeeWaiverProgress(card);
                    const daysUntilPayment = calculateDaysUntilPayment(card);
                    
                    return (
                      <Card 
                        key={card.id} 
                        elevation={0}
                        sx={{ 
                          mb: 2, 
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          borderRadius: 2,
                          position: 'relative',
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateX(5px)'
                          }
                        }}
                      >
                        <CardContent sx={{ pb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ 
                                  mr: 1.5, 
                                  bgcolor: alpha(cardIssuers[card.issuer] || theme.palette.grey[500], 0.1), 
                                  color: cardIssuers[card.issuer] || theme.palette.grey[700]
                                }}
                              >
                                <CreditCardIcon />
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {card.issuer} {card.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {card.variant} • {card.cardNumber || 'XXXX XXXX XXXX XXXX'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {selectedMember === 'family' && card.owner !== 'family' && (
                                <Tooltip title={`Owned by ${familyMembers.find(m => m.id === card.owner)?.name}`}>
                                  <Avatar 
                                    sx={{ 
                                      width: 24, 
                                      height: 24, 
                                      mr: 1,
                                      bgcolor: alpha(familyMembers.find(m => m.id === card.owner)?.color || theme.palette.grey[500], 0.2),
                                      color: familyMembers.find(m => m.id === card.owner)?.color || theme.palette.grey[700],
                                      fontSize: '0.75rem'
                                    }}
                                  >
                                    {familyMembers.find(m => m.id === card.owner)?.name?.charAt(0) || 'F'}
                                  </Avatar>
                                </Tooltip>
                              )}
                              <IconButton size="small" onClick={() => handleEditCreditCard(card.id)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleDeleteCreditCard(card.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
  
                          <Grid container spacing={1} sx={{ mt: 0.5 }}>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Annual Fee: {hideBalances ? '••••••••' : formatCurrency(card.annualFee)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Current Spend: {hideBalances ? '••••••••' : formatCurrency(card.currentSpend)}
                              </Typography>
                            </Grid>
                            
                            {card.lastBillDate && (
                              <>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="text.secondary">
                                    Last Bill: {hideBalances ? '••••••••' : formatCurrency(card.lastBillAmount)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                    Due: {formatDate(card.lastBillDate)}
                                    {daysUntilPayment !== null && daysUntilPayment >= 0 && daysUntilPayment <= 7 && (
                                      <Chip
                                        size="small"
                                        label={`${daysUntilPayment} days`}
                                        color="warning"
                                        sx={{ ml: 1, height: 20, fontSize: '0.6rem' }}
                                      />
                                    )}
                                  </Typography>
                                </Grid>
                              </>
                            )}
                          </Grid>
  
                          {card.feeWaiverSpend > 0 ? (
                            <>
                              <Box sx={{ mt: 2, mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="body2" fontWeight="medium">
                                    Fee Waiver Progress
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    fontWeight="medium"
                                    color={progress >= 100 ? 'success.main' : progress >= 75 ? 'warning.main' : 'text.primary'}
                                  >
                                    {Math.round(progress)}%
                                  </Typography>
                                </Box>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={progress}
                                  sx={{ 
                                    height: 8, 
                                    borderRadius: 1,
                                    bgcolor: alpha(theme.palette.divider, 0.1),
                                    '& .MuiLinearProgress-bar': {
                                      bgcolor: progress >= 100 
                                        ? theme.palette.success.main 
                                        : progress >= 75 
                                          ? theme.palette.warning.main 
                                          : theme.palette.primary.main
                                    }
                                  }}
                                />
                              </Box>
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    Target: {hideBalances ? '••••••••' : formatCurrency(card.feeWaiverSpend)}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Period: {card.spendPeriodMonths} months
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="body2" color="text.secondary">
                                    {progress >= 100 ? 'Fee will be waived! 🎉' : `${hideBalances ? '••••••••' : formatCurrency(card.feeWaiverSpend - card.currentSpend)} more needed`}
                                  </Typography>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Typography variant="body2" fontStyle="italic" color="text.secondary">
                                No fee waiver available for this card
                              </Typography>
                            </Box>
                          )}
                          <Divider sx={{ my: 2 }} />
                          
                          <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
                            Reward Rates
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {Object.entries(card.rewardRates).map(([category, rate]) => (
                              <Chip 
                                key={category}
                                size="small"
                                label={
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="caption">
                                      {spendCategories[category]?.name || category}: {rate}X
                                    </Typography>
                                  </Box>
                                }
                                icon={
                                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
                                    {spendCategories[category]?.icon || <ReceiptIcon sx={{ fontSize: 16 }} />}
                                  </Box>
                                }
                                sx={{ 
                                  bgcolor: alpha(spendCategories[category]?.color || theme.palette.grey[500], 0.1),
                                  color: spendCategories[category]?.color || theme.palette.grey[700],
                                  '& .MuiChip-icon': { 
                                    color: spendCategories[category]?.color || theme.palette.grey[700],
                                    ml: 0.5,
                                    mr: -0.5
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                        
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            right: 0, 
                            bottom: 0, 
                            width: 10, 
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                            bgcolor: cardIssuers[card.issuer] || theme.palette.grey[500],
                            opacity: 0.7
                          }} 
                        />
                      </Card>
                    );
                  })}
                </Box>
              </Paper>
            </Grid>
            
            {/* Right Column - Upcoming Transactions */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
                  minHeight: 400
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3
                }}>
                  <Typography variant="h6" fontWeight="medium">Upcoming Transactions</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddTransaction}
                    sx={{ 
                      borderRadius: 2, 
                      textTransform: 'none'
                    }}
                  >
                    Add Transaction
                  </Button>
                </Box>
                
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ 
                    mb: 3,
                    '& .MuiTab-root': {
                      minWidth: 100,
                      borderRadius: 2,
                      mx: 0.5,
                      textTransform: 'none'
                    },
                    '& .Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                  TabIndicatorProps={{
                    style: { display: 'none' }
                  }}
                >
                  <Tab label="All Transactions" />
                  <Tab label="Monthly" />
                  <Tab label="Recurring" />
                  <Tab label="High Value" />
                  <Tab label="Dining" />
                  <Tab label="Travel" />
                </Tabs>
                
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Card</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tabFilteredTransactions.map((transaction) => {
                        const card = creditCards.find(c => c.id === transaction.creditCardId);
                        const category = spendCategories[transaction.category];
                        const optimalCardId = optimalAssignments[transaction.id];
                        const isOptimal = !optimalCardId;
                        
                        return (
                          <TableRow 
                            key={transaction.id}
                            sx={{
                              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                              bgcolor: isOptimal ? 'inherit' : alpha(theme.palette.warning.light, 0.15)
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="body2" fontWeight="medium">
                                  {transaction.description}
                                </Typography>
                                {transaction.merchant && (
                                  <Typography variant="caption" color="text.secondary">
                                    {transaction.merchant}
                                  </Typography>
                                )}
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(transaction.transactionDate)}
                                </Typography>
                                {selectedMember === 'family' && transaction.owner !== 'family' && (
                                  <Tooltip title={`Owned by ${familyMembers.find(m => m.id === transaction.owner)?.name}`}>
                                    <Avatar 
                                      sx={{ 
                                        width: 16, 
                                        height: 16, 
                                        fontSize: '0.6rem',
                                        bgcolor: alpha(familyMembers.find(m => m.id === transaction.owner)?.color || theme.palette.grey[500], 0.2),
                                        color: familyMembers.find(m => m.id === transaction.owner)?.color || theme.palette.grey[700],
                                        mt: 0.5
                                      }}
                                    >
                                      {familyMembers.find(m => m.id === transaction.owner)?.name?.charAt(0) || 'F'}
                                    </Avatar>
                                  </Tooltip>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                  sx={{ 
                                    width: 24, 
                                    height: 24, 
                                    mr: 1,
                                    bgcolor: alpha(category?.color || theme.palette.grey[500], 0.1), 
                                    color: category?.color || theme.palette.grey[700]
                                  }}
                                >
                                  {category?.icon || <ReceiptIcon sx={{ fontSize: 14 }} />}
                                </Avatar>
                                <Typography variant="body2">
                                  {category?.name || transaction.category}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {hideBalances ? '••••••••' : formatCurrency(transaction.amount)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                                <Chip
                                  size="small"
                                  label={transaction.frequency}
                                  sx={{ 
                                    height: 24,
                                    fontSize: '0.75rem',
                                    textTransform: 'capitalize',
                                    bgcolor: alpha(theme.palette.info.main, 0.1),
                                    color: theme.palette.info.main
                                  }}
                                />
                                {transaction.isRecurring && (
                                  <Chip
                                    size="small"
                                    label="Recurring"
                                    sx={{ 
                                      height: 24,
                                      fontSize: '0.75rem',
                                      bgcolor: alpha(theme.palette.success.main, 0.1),
                                      color: theme.palette.success.main
                                    }}
                                  />
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {isOptimal ? (
                                  <ThumbUpIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                                ) : (
                                  <ThumbDownIcon fontSize="small" sx={{ color: theme.palette.warning.main, mr: 0.5 }} />
                                )}
                                <Tooltip 
                                  title={
                                    !isOptimal ? (
                                      <Box>
                                        <Typography variant="caption">
                                          Not optimal! Switch to {creditCards.find(c => c.id === optimalCardId)?.name} for higher rewards
                                        </Typography>
                                      </Box>
                                    ) : "Optimal card for this category"
                                  }
                                >
                                  <Chip
                                    size="small"
                                    label={card?.name || 'Unknown'}
                                    avatar={
                                      <Avatar 
                                        sx={{ 
                                          bgcolor: alpha(cardIssuers[card?.issuer] || theme.palette.grey[500], 0.2),
                                          '.MuiAvatar-img': { objectFit: 'contain' }
                                        }}
                                      >
                                        <CreditCardIcon fontSize="small" sx={{ color: cardIssuers[card?.issuer] || theme.palette.grey[700] }} />
                                      </Avatar>
                                    }
                                    sx={{ 
                                      height: 24,
                                      fontSize: '0.75rem',
                                      bgcolor: alpha(cardIssuers[card?.issuer] || theme.palette.grey[500], 0.05),
                                      color: cardIssuers[card?.issuer] || theme.palette.grey[700],
                                      border: !isOptimal ? `1px dashed ${theme.palette.warning.main}` : 'none'
                                    }}
                                  />
                                </Tooltip>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <IconButton 
                                size="small" 
                                onClick={() => handleEditTransaction(transaction.id)}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={() => handleDeleteTransaction(transaction.id)}
                                sx={{ color: theme.palette.error.main }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                              {!isOptimal && (
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleReassignTransaction(transaction.id, optimalCardId)}
                                  sx={{ color: theme.palette.warning.main }}
                                >
                                  <SwapHorizIcon fontSize="small" />
                                </IconButton>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {tabFilteredTransactions.length === 0 && (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    py: 5
                  }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      No transactions found in this category.
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddTransaction}
                      sx={{ textTransform: 'none' }}
                    >
                      Add Transaction
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
          
          {/* Calendar View for Due Dates (moved to end) */}
          
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mt: 3,
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="medium">
              Credit Card Due Dates - {showFullYear ? currentMonth : months.find(m => m.short === selectedPeriod.month)?.long} {selectedPeriod.year}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<NotificationsIcon />}
              size="small"
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Set Reminders
            </Button>
          </Box>
          
          <Grid container spacing={1} sx={{ mb: 2 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Grid item xs={12/7} key={day}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 1, 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 1,
                  fontWeight: 'bold'
                }}>
                  {day}
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Grid container spacing={1}>
            {(() => {
              const days = [];
              // Get month index from selected period
              const monthIndex = showFullYear 
                ? currentDate.getMonth() 
                : months.findIndex(m => m.short === selectedPeriod.month);
              
              // Get the selected year
              const year = selectedPeriod.year;
              
              // Calculate days in selected month
              const selectedMonthDays = new Date(year, monthIndex + 1, 0).getDate();
              
              // Get the first day of the selected month
              const firstDay = new Date(year, monthIndex, 1).getDay();
              
              // Add empty cells for days before the first day of month
              for (let i = 0; i < firstDay; i++) {
                days.push(
                  <Grid item xs={12/7} key={`empty-${i}`}>
                    <Box sx={{ 
                      height: 80,
                      p: 1, 
                      bgcolor: alpha(theme.palette.divider, 0.05),
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column'
                    }}></Box>
                  </Grid>
                );
              }
              
              // Get current date info for today highlighting
              const todayDate = currentDate.getDate();
              const todayMonth = currentDate.getMonth();
              const todayYear = currentDate.getFullYear();
              
              // Add cells for each day of the month
              for (let i = 1; i <= selectedMonthDays; i++) {
                const date = new Date(year, monthIndex, i);
                const dayOfWeek = date.getDay();
                const isToday = i === todayDate && monthIndex === todayMonth && year === todayYear;
                
                // Get credit cards with payment due on this day
                const cardsDueToday = filteredCards.filter(card => {
                  if (!card.lastBillDate) return false;
                  const billDate = new Date(card.lastBillDate);
                  const dueDate = new Date(billDate);
                  dueDate.setDate(billDate.getDate() + 20); // Assuming 20 days payment period
                  
                  return dueDate.getDate() === i && 
                        dueDate.getMonth() === monthIndex && 
                        dueDate.getFullYear() === year;
                });
                
                days.push(
                  <Grid item xs={12/7} key={`day-${i}`}>
                    <Box sx={{ 
                      height: 80,
                      p: 1, 
                      bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : 'white',
                      border: isToday ? `2px solid ${theme.palette.primary.main}` : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: isToday ? `0 0 10px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
                      transition: 'transform 0.2s',
                      '&:hover': cardsDueToday.length > 0 ? {
                        transform: 'scale(1.05)',
                        zIndex: 1,
                        boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`
                      } : {}
                    }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: isToday ? 'bold' : cardsDueToday.length > 0 ? 'medium' : 'normal',
                          color: isToday ? theme.palette.primary.main : 
                                dayOfWeek === 0 || dayOfWeek === 6 ? theme.palette.error.main : 'inherit'
                        }}
                      >
                        {i}
                      </Typography>
                      
                      {cardsDueToday.length > 0 && (
                        <Box sx={{ mt: 'auto' }}>
                          {cardsDueToday.length <= 2 ? (
                            cardsDueToday.map((card, index) => (
                              <Tooltip key={card.id} title={`${card.issuer} ${card.name} - ${hideBalances ? 'Hidden' : formatCurrency(card.lastBillAmount)}`}>
                                <Box 
                                  sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    mt: index > 0 ? 0.5 : 0,
                                    p: 0.5,
                                    borderRadius: 1,
                                    bgcolor: alpha(cardIssuers[card.issuer] || theme.palette.grey[500], 0.1),
                                    overflow: 'hidden'
                                  }}
                                >
                                  <CreditCardIcon 
                                    fontSize="small" 
                                    sx={{ 
                                      color: cardIssuers[card.issuer] || theme.palette.grey[700],
                                      mr: 0.5,
                                      fontSize: '0.9rem'
                                    }}
                                  />
                                  <Typography 
                                    variant="caption" 
                                    noWrap 
                                    sx={{ 
                                      fontWeight: 'medium',
                                      fontSize: '0.65rem'
                                    }}
                                  >
                                    {card.name}
                                  </Typography>
                                </Box>
                              </Tooltip>
                            ))
                          ) : (
                            <Tooltip title={cardsDueToday.map(card => `${card.issuer} ${card.name} - ${hideBalances ? 'Hidden' : formatCurrency(card.lastBillAmount)}`).join('\n')}>
                              <Box 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mt: 0.5,
                                  p: 0.5,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                }}
                              >
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    fontWeight: 'bold',
                                    fontSize: '0.65rem',
                                    color: theme.palette.error.main
                                  }}
                                >
                                  {cardsDueToday.length} cards due
                                </Typography>
                              </Box>
                            </Tooltip>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                );
              }
              
              return days;
            })()}
          </Grid>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Box 
                sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: theme.palette.primary.main,
                  mr: 1
                }}
              />
              <Typography variant="body2">Today</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Box 
                sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: theme.palette.error.main,
                  mr: 1
                }}
              />
              <Typography variant="body2">Weekend</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CreditCardIcon 
                fontSize="small" 
                sx={{ 
                  color: theme.palette.warning.main,
                  mr: 1,
                  width: 12,
                  height: 12
                }}
              />
              <Typography variant="body2">Payment Due</Typography>
            </Box>
          </Box>
        </Paper>
          
          {/* Add/Edit Credit Card Dialog */}
          <Dialog 
            open={openCreditCardDialog} 
            onClose={() => setOpenCreditCardDialog(false)}
            maxWidth="md"
            fullWidth
            PaperProps={{ 
              sx: { 
                borderRadius: 3, 
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
              } 
            }}
          >
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{editItemId ? 'Edit Credit Card' : 'Add New Credit Card'}</Typography>
                <IconButton onClick={() => setOpenCreditCardDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Card Name"
                    name="name"
                    value={cardFormData.name}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., Infinia, Regalia, Platinum"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" variant="outlined" required>
                    <InputLabel>Card Issuer</InputLabel>
                    <Select
                      name="issuer"
                      value={cardFormData.issuer}
                      onChange={handleCardInputChange}
                      label="Card Issuer"
                    >
                      {Object.keys(cardIssuers).map(issuer => (
                        <MenuItem key={issuer} value={issuer}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box 
                              sx={{ 
                                width: 12, 
                                height: 12, 
                                borderRadius: '50%', 
                                bgcolor: cardIssuers[issuer], 
                                mr: 1 
                              }} 
                            />
                            {issuer}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Card Variant"
                    name="variant"
                    value={cardFormData.variant}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., Visa Signature, Mastercard World"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Card Number (Last 4 digits shown)"
                    name="cardNumber"
                    value={cardFormData.cardNumber}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="XXXX XXXX XXXX 1234"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Annual Fee"
                    name="annualFee"
                    value={cardFormData.annualFee}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 5000"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fee Waiver Spend Target"
                    name="feeWaiverSpend"
                    value={cardFormData.feeWaiverSpend}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 300000"
                    type="number"
                    helperText="Enter 0 if no fee waiver is available"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Current Spend"
                    name="currentSpend"
                    value={cardFormData.currentSpend}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 150000"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Credit Limit"
                    name="creditLimit"
                    value={cardFormData.creditLimit}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 500000 or 'No Preset Limit'"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Expiry Date"
                    name="expiryDate"
                    value={cardFormData.expiryDate}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Card Owner</InputLabel>
                    <Select
                      name="owner"
                      value={cardFormData.owner}
                      onChange={handleCardInputChange}
                      label="Card Owner"
                    >
                      {familyMembers.map(member => (
                        <MenuItem key={member.id} value={member.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                width: 24, 
                                height: 24, 
                                mr: 1,
                                bgcolor: alpha(member.color, 0.2),
                                color: member.color,
                                fontSize: typeof member.avatar === 'string' ? 14 : 'inherit'
                              }}
                            >
                              {member.avatar}
                            </Avatar>
                            {member.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Reward Rates" />
                  </Divider>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Enter reward points earned per ₹100 spent in each category
                  </Typography>
                </Grid>
                
                {/* Reward rates for popular categories */}
                {Object.entries(spendCategories).filter(([key]) => 
                  ['dining', 'shopping', 'travel', 'fuel', 'entertainment', 'others'].includes(key)
                ).map(([category, info]) => (
                  <Grid item xs={6} sm={4} md={3} key={category}>
                    <TextField
                      label={info.name}
                      name={`rewardRate_${category}`}
                      value={cardFormData.rewardRates[category] || ''}
                      onChange={handleCardInputChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box sx={{ color: info.color }}>
                              {info.icon}
                            </Box>
                          </InputAdornment>
                        ),
                        endAdornment: <InputAdornment position="end">X</InputAdornment>,
                      }}
                    />
                  </Grid>
                ))}
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Bill Details (Optional)" />
                  </Divider>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Bill Date"
                    name="lastBillDate"
                    value={cardFormData.lastBillDate}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Bill Amount"
                    name="lastBillAmount"
                    value={cardFormData.lastBillAmount}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 45000"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Minimum Payment Due"
                    name="minPayment"
                    value={cardFormData.minPayment}
                    onChange={handleCardInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 2500"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Fee Waiver Period</InputLabel>
                    <Select
                      name="spendPeriodMonths"
                      value={cardFormData.spendPeriodMonths}
                      onChange={handleCardInputChange}
                      label="Fee Waiver Period"
                    >
                      <MenuItem value={3}>3 months</MenuItem>
                      <MenuItem value={6}>6 months</MenuItem>
                      <MenuItem value={12}>12 months</MenuItem>
                    </Select>
                    <FormHelperText>Period to meet the fee waiver spend target</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button 
                onClick={() => setOpenCreditCardDialog(false)}
                variant="outlined"
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveCreditCard}
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                disabled={!cardFormData.name || !cardFormData.issuer}
              >
                {editItemId ? 'Update Card' : 'Add Card'}
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Add/Edit Transaction Dialog */}
          <Dialog 
            open={openTransactionDialog} 
            onClose={() => setOpenTransactionDialog(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{ 
              sx: { 
                borderRadius: 3, 
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' 
              } 
            }}
          >
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{editItemId ? 'Edit Planned Transaction' : 'Add New Transaction'}</Typography>
                <IconButton onClick={() => setOpenTransactionDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={transactionFormData.description}
                    onChange={handleTransactionInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., Monthly Groceries, Phone Bill"
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" variant="outlined" required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={transactionFormData.category}
                      onChange={handleTransactionInputChange}
                      label="Category"
                    >
                      {Object.entries(spendCategories).map(([category, info]) => (
                        <MenuItem key={category} value={category}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                width: 24, 
                                height: 24, 
                                mr: 1,
                                bgcolor: alpha(info.color, 0.1),
                                color: info.color
                              }}
                            >
                              {info.icon}
                            </Avatar>
                            {info.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Merchant (Optional)"
                    name="merchant"
                    value={transactionFormData.merchant}
                    onChange={handleTransactionInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., Amazon, Starbucks"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Amount"
                    name="amount"
                    value={transactionFormData.amount}
                    onChange={handleTransactionInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 5000"
                    type="number"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" variant="outlined" required>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      name="frequency"
                      value={transactionFormData.frequency}
                      onChange={handleTransactionInputChange}
                      label="Frequency"
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="quarterly">Quarterly</MenuItem>
                      <MenuItem value="biannually">Biannually</MenuItem>
                      <MenuItem value="annually">Annually</MenuItem>
                      <MenuItem value="once">One-time</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Transaction Date"
                    name="transactionDate"
                    value={transactionFormData.transactionDate}
                    onChange={handleTransactionInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="date"
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" variant="outlined" required>
                    <InputLabel>Credit Card</InputLabel>
                    <Select
                      name="creditCardId"
                      value={transactionFormData.creditCardId}
                      onChange={handleTransactionInputChange}
                      label="Credit Card"
                    >
                      {filteredCards.map(card => (
                        <MenuItem key={card.id} value={card.id.toString()}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                width: 24, 
                                height: 24, 
                                mr: 1,
                                bgcolor: alpha(cardIssuers[card.issuer] || theme.palette.grey[500], 0.1),
                                color: cardIssuers[card.issuer] || theme.palette.grey[700]
                              }}
                            >
                              <CreditCardIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                            {card.issuer} {card.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isRecurring"
                        checked={transactionFormData.isRecurring}
                        onChange={handleTransactionInputChange}
                        color="primary"
                      />
                    }
                    label="Recurring Transaction"
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Owner</InputLabel>
                    <Select
                      name="owner"
                      value={transactionFormData.owner}
                      onChange={handleTransactionInputChange}
                      label="Owner"
                    >
                      {familyMembers.map(member => (
                        <MenuItem key={member.id} value={member.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                width: 24, 
                                height: 24, 
                                mr: 1,
                                bgcolor: alpha(member.color, 0.2),
                                color: member.color,
                                fontSize: typeof member.avatar === 'string' ? 14 : 'inherit'
                              }}
                            >
                              {member.avatar}
                            </Avatar>
                            {member.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                {transactionFormData.category && transactionFormData.creditCardId && (
                  <Grid item xs={12}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: alpha(theme.palette.info.light, 0.1), 
                      borderRadius: 2,
                      mt: 1
                    }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Reward Points Information
                      </Typography>
                      {(() => {
                        const card = creditCards.find(c => c.id === parseInt(transactionFormData.creditCardId));
                        if (!card) return null;
                        
                        const rewardRate = card.rewardRates[transactionFormData.category] || card.rewardRates.others || 0;
                        const amount = parseFloat(transactionFormData.amount) || 0;
                        
                        // Calculate rewards based on frequency
                        let annualAmount = amount;
                        if (transactionFormData.frequency === 'monthly') annualAmount *= 12;
                        else if (transactionFormData.frequency === 'quarterly') annualAmount *= 4;
                        else if (transactionFormData.frequency === 'biannually') annualAmount *= 2;
                        else if (transactionFormData.frequency === 'weekly') annualAmount *= 52;
                        else if (transactionFormData.frequency === 'daily') annualAmount *= 365;
                        // For 'once' frequency, keep as is
                        
                        const rewardPoints = (annualAmount / 100) * rewardRate;
                        
                        return (
                          <Box>
                            <Typography variant="body2">
                              Selected card: <b>{card.issuer} {card.name}</b>
                            </Typography>
                            <Typography variant="body2">
                              Reward rate for {spendCategories[transactionFormData.category]?.name || transactionFormData.category}: <b>{rewardRate}X</b>
                            </Typography>
                            <Typography variant="body2">
                              Estimated annual reward points: <b>{formatNumber(rewardPoints)}</b>
                            </Typography>
                          </Box>
                        );
                      })()}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button 
                onClick={() => setOpenTransactionDialog(false)}
                variant="outlined"
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveTransaction}
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                disabled={!transactionFormData.description || !transactionFormData.category || !transactionFormData.amount || !transactionFormData.creditCardId}
              >
                {editItemId ? 'Update Transaction' : 'Add Transaction'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </Box>
    );
  };
  
  export default CreditCardStrategy;