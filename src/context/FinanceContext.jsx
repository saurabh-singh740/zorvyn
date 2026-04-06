/**
 * FinanceContext - Central state management for the Finance Dashboard.
 * Manages: transactions, filters, role, dark mode, and derived insights.
 * Persists data to localStorage automatically.
 */
import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

// ─── Initial State ────────────────────────────────────────────────────────────
const STORAGE_KEY = 'finance_dashboard_v1';

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const defaultState = {
  transactions: INITIAL_TRANSACTIONS,
  role: 'viewer',          // 'viewer' | 'admin'
  darkMode: false,
  filters: {
    search: '',
    type: 'all',           // 'all' | 'income' | 'expense'
    sortBy: 'date',        // 'date' | 'amount'
    sortDir: 'desc',       // 'asc' | 'desc'
  },
};

const getInitialState = () => {
  const stored = loadFromStorage();
  if (!stored) return defaultState;
  return {
    ...defaultState,
    ...stored,
    // Always reset filters on load
    filters: defaultState.filters,
  };
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
const financeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case 'RESET_TRANSACTIONS':
      return { ...state, transactions: INITIAL_TRANSACTIONS };

    default:
      return state;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────
const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, null, getInitialState);

  // Persist to localStorage on state change
  useEffect(() => {
    const toStore = {
      transactions: state.transactions,
      role: state.role,
      darkMode: state.darkMode,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [state.transactions, state.role, state.darkMode]);

  // Apply dark mode class to document root
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // ─── Derived / Computed Values ─────────────────────────────────────────────
  const derived = useMemo(() => {
    const { transactions } = state;
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    // This month summary
    const thisMonthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });
    const thisMonthIncome = thisMonthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const thisMonthExpenses = thisMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    // Last month summary
    const lastMonthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    });
    const lastMonthIncome = lastMonthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const lastMonthExpenses = lastMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    // Expense by category
    const expenseByCategory = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
    });

    const highestCategory = Object.entries(expenseByCategory)
      .sort(([, a], [, b]) => b - a)[0];

    // Monthly trend data (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth();
      const y = d.getFullYear();
      const label = d.toLocaleString('default', { month: 'short', year: '2-digit' });

      const monthTxns = transactions.filter(t => {
        const td = new Date(t.date);
        return td.getMonth() === m && td.getFullYear() === y;
      });

      const income = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const expenses = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
      monthlyTrend.push({ month: label, income, expenses, net: income - expenses });
    }

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      thisMonthIncome,
      thisMonthExpenses,
      lastMonthIncome,
      lastMonthExpenses,
      expenseByCategory,
      highestCategory,
      monthlyTrend,
    };
  }, [state.transactions]);

  // ─── Filtered + Sorted Transactions ───────────────────────────────────────
  const filteredTransactions = useMemo(() => {
    const { search, type, sortBy, sortDir } = state.filters;
    let txns = [...state.transactions];

    if (search) {
      const q = search.toLowerCase();
      txns = txns.filter(
        t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }
    if (type !== 'all') {
      txns = txns.filter(t => t.type === type);
    }
    txns.sort((a, b) => {
      const multiplier = sortDir === 'asc' ? 1 : -1;
      if (sortBy === 'date') return (new Date(a.date) - new Date(b.date)) * multiplier;
      if (sortBy === 'amount') return (a.amount - b.amount) * multiplier;
      return 0;
    });

    return txns;
  }, [state.transactions, state.filters]);

  const value = {
    state,
    dispatch,
    derived,
    filteredTransactions,
    isAdmin: state.role === 'admin',
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
};
