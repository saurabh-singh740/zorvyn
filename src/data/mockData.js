/**
 * Mock transaction data for the Finance Dashboard.
 * Each transaction has: id, date, description, amount, category, type.
 */

export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transportation', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Salary', 'Freelance',
  'Investment', 'Education', 'Travel', 'Personal Care', 'Gifts',
];

export const CATEGORY_COLORS = {
  'Housing': '#6366f1',
  'Food & Dining': '#f59e0b',
  'Transportation': '#3b82f6',
  'Entertainment': '#ec4899',
  'Healthcare': '#10b981',
  'Shopping': '#8b5cf6',
  'Utilities': '#06b6d4',
  'Salary': '#22c55e',
  'Freelance': '#84cc16',
  'Investment': '#0ea5e9',
  'Education': '#f97316',
  'Travel': '#e11d48',
  'Personal Care': '#d946ef',
  'Gifts': '#eab308',
};

// Helper to generate dates relative to today
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

const monthsAgo = (m, day = 15) => {
  const d = new Date();
  d.setMonth(d.getMonth() - m);
  d.setDate(day);
  return d.toISOString().split('T')[0];
};

export const INITIAL_TRANSACTIONS = [
  // --- This Month ---
  { id: '1', date: daysAgo(1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: '2', date: daysAgo(2), description: 'Freelance Project - Brand Design', amount: 1200, category: 'Freelance', type: 'income' },
  { id: '3', date: daysAgo(3), description: 'Apartment Rent', amount: 1400, category: 'Housing', type: 'expense' },
  { id: '4', date: daysAgo(4), description: 'Grocery Shopping', amount: 180, category: 'Food & Dining', type: 'expense' },
  { id: '5', date: daysAgo(5), description: 'Uber Ride', amount: 32, category: 'Transportation', type: 'expense' },
  { id: '6', date: daysAgo(6), description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: '7', date: daysAgo(7), description: 'Electric Bill', amount: 95, category: 'Utilities', type: 'expense' },
  { id: '8', date: daysAgo(8), description: 'Dinner with Friends', amount: 75, category: 'Food & Dining', type: 'expense' },
  { id: '9', date: daysAgo(9), description: 'Online Course - React Advanced', amount: 49, category: 'Education', type: 'expense' },
  { id: '10', date: daysAgo(10), description: 'Gym Membership', amount: 40, category: 'Personal Care', type: 'expense' },
  { id: '11', date: daysAgo(11), description: 'Investment Dividend', amount: 320, category: 'Investment', type: 'income' },
  { id: '12', date: daysAgo(12), description: 'Amazon Shopping', amount: 128, category: 'Shopping', type: 'expense' },
  { id: '13', date: daysAgo(13), description: 'Doctor Appointment', amount: 60, category: 'Healthcare', type: 'expense' },
  { id: '14', date: daysAgo(14), description: 'Coffee & Snacks', amount: 22, category: 'Food & Dining', type: 'expense' },

  // --- Last Month ---
  { id: '15', date: monthsAgo(1, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: '16', date: monthsAgo(1, 3), description: 'Apartment Rent', amount: 1400, category: 'Housing', type: 'expense' },
  { id: '17', date: monthsAgo(1, 5), description: 'Grocery Shopping', amount: 210, category: 'Food & Dining', type: 'expense' },
  { id: '18', date: monthsAgo(1, 7), description: 'Flight Ticket to NYC', amount: 380, category: 'Travel', type: 'expense' },
  { id: '19', date: monthsAgo(1, 9), description: 'Freelance - Web Dev', amount: 900, category: 'Freelance', type: 'income' },
  { id: '20', date: monthsAgo(1, 11), description: 'Spotify Premium', amount: 9.99, category: 'Entertainment', type: 'expense' },
  { id: '21', date: monthsAgo(1, 13), description: 'Internet Bill', amount: 65, category: 'Utilities', type: 'expense' },
  { id: '22', date: monthsAgo(1, 15), description: 'Birthday Gift', amount: 80, category: 'Gifts', type: 'expense' },
  { id: '23', date: monthsAgo(1, 17), description: 'Investment Returns', amount: 450, category: 'Investment', type: 'income' },
  { id: '24', date: monthsAgo(1, 20), description: 'Clothing & Accessories', amount: 195, category: 'Shopping', type: 'expense' },
  { id: '25', date: monthsAgo(1, 22), description: 'Gas Station', amount: 55, category: 'Transportation', type: 'expense' },
  { id: '26', date: monthsAgo(1, 25), description: 'Haircut', amount: 35, category: 'Personal Care', type: 'expense' },
  { id: '27', date: monthsAgo(1, 28), description: 'Restaurant Dinner', amount: 92, category: 'Food & Dining', type: 'expense' },

  // --- 2 Months Ago ---
  { id: '28', date: monthsAgo(2, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: '29', date: monthsAgo(2, 5), description: 'Rent', amount: 1400, category: 'Housing', type: 'expense' },
  { id: '30', date: monthsAgo(2, 8), description: 'Freelance Consulting', amount: 650, category: 'Freelance', type: 'income' },
  { id: '31', date: monthsAgo(2, 10), description: 'Groceries', amount: 175, category: 'Food & Dining', type: 'expense' },
  { id: '32', date: monthsAgo(2, 12), description: 'Electric & Water', amount: 110, category: 'Utilities', type: 'expense' },
  { id: '33', date: monthsAgo(2, 14), description: 'Movie Night', amount: 45, category: 'Entertainment', type: 'expense' },
  { id: '34', date: monthsAgo(2, 16), description: 'Pharmacy', amount: 38, category: 'Healthcare', type: 'expense' },
  { id: '35', date: monthsAgo(2, 18), description: 'Bus Pass', amount: 28, category: 'Transportation', type: 'expense' },
  { id: '36', date: monthsAgo(2, 22), description: 'New Laptop', amount: 1199, category: 'Shopping', type: 'expense' },
  { id: '37', date: monthsAgo(2, 25), description: 'Investment Dividend', amount: 290, category: 'Investment', type: 'income' },

  // --- 3 Months Ago ---
  { id: '38', date: monthsAgo(3, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: '39', date: monthsAgo(3, 4), description: 'Rent', amount: 1400, category: 'Housing', type: 'expense' },
  { id: '40', date: monthsAgo(3, 6), description: 'Vacation - Hotel', amount: 520, category: 'Travel', type: 'expense' },
  { id: '41', date: monthsAgo(3, 9), description: 'Groceries', amount: 165, category: 'Food & Dining', type: 'expense' },
  { id: '42', date: monthsAgo(3, 12), description: 'Freelance Logo Design', amount: 400, category: 'Freelance', type: 'income' },
  { id: '43', date: monthsAgo(3, 15), description: 'Internet & Phone', amount: 95, category: 'Utilities', type: 'expense' },
  { id: '44', date: monthsAgo(3, 18), description: 'Gym & Spa', amount: 75, category: 'Personal Care', type: 'expense' },
  { id: '45', date: monthsAgo(3, 21), description: 'Stocks Dividend', amount: 510, category: 'Investment', type: 'income' },

  // --- 4 Months Ago ---
  { id: '46', date: monthsAgo(4, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: '47', date: monthsAgo(4, 5), description: 'Rent', amount: 1400, category: 'Housing', type: 'expense' },
  { id: '48', date: monthsAgo(4, 8), description: 'Groceries', amount: 190, category: 'Food & Dining', type: 'expense' },
  { id: '49', date: monthsAgo(4, 10), description: 'Freelance UI Design', amount: 800, category: 'Freelance', type: 'income' },
  { id: '50', date: monthsAgo(4, 14), description: 'Health Insurance', amount: 250, category: 'Healthcare', type: 'expense' },
  { id: '51', date: monthsAgo(4, 17), description: 'Entertainment Subscriptions', amount: 35, category: 'Entertainment', type: 'expense' },
  { id: '52', date: monthsAgo(4, 20), description: 'Car Service', amount: 220, category: 'Transportation', type: 'expense' },
  { id: '53', date: monthsAgo(4, 23), description: 'Investment Returns', amount: 375, category: 'Investment', type: 'income' },

  // --- 5 Months Ago ---
  { id: '54', date: monthsAgo(5, 1), description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '55', date: monthsAgo(5, 5), description: 'Rent', amount: 1400, category: 'Housing', type: 'expense' },
  { id: '56', date: monthsAgo(5, 8), description: 'Groceries', amount: 160, category: 'Food & Dining', type: 'expense' },
  { id: '57', date: monthsAgo(5, 12), description: 'Summer Clothes', amount: 245, category: 'Shopping', type: 'expense' },
  { id: '58', date: monthsAgo(5, 15), description: 'Freelance Work', amount: 550, category: 'Freelance', type: 'income' },
  { id: '59', date: monthsAgo(5, 18), description: 'Utilities', amount: 88, category: 'Utilities', type: 'expense' },
  { id: '60', date: monthsAgo(5, 22), description: 'Investment Returns', amount: 310, category: 'Investment', type: 'income' },
];
