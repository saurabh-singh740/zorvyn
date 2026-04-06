/**
 * financeStore.js - Zustand state management for transactions, filters, and derived insights.
 * Persists data to localStorage automatically.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: INITIAL_TRANSACTIONS,
      darkMode: true,
      filters: {
        search: '',
        type: 'all',           // 'all' | 'income' | 'expense'
        sortBy: 'date',        // 'date' | 'amount'
        sortDir: 'desc',       // 'asc' | 'desc'
      },

      // ─── Actions ────────────────────────────────────────────
      setDarkMode: (darkMode) => {
        set({ darkMode });
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        get().setDarkMode(newMode);
      },

      setFilter: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      addTransaction: (transaction) => {
        set((state) => ({
          transactions: [
            { id: crypto.randomUUID(), date: new Date().toISOString(), ...transaction },
            ...state.transactions
          ],
        }));
      },

      updateTransaction: (updated) => {
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === updated.id ? updated : t)),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      resetTransactions: () => {
        set({ transactions: INITIAL_TRANSACTIONS });
      },

      // ─── Computed Selectors ──────────────────────────────────
      getDerivedData: () => {
        const { transactions } = get();
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

        // This month
        const thisMonthTxns = transactions.filter(t => {
          const d = new Date(t.date);
          return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
        });
        const thisMonthIncome = thisMonthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const thisMonthExpenses = thisMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

        // Last month
        const lastMonthTxns = transactions.filter(t => {
          const d = new Date(t.date);
          return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
        });
        const lastMonthIncome = lastMonthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const lastMonthExpenses = lastMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

        const expenseByCategory = {};
        transactions.filter(t => t.type === 'expense').forEach(t => {
          expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
        });

        const highestCategory = Object.entries(expenseByCategory)
          .sort(([, a], [, b]) => b - a)[0];

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

          const inc = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
          const exp = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
          monthlyTrend.push({ month: label, income: inc, expenses: exp, net: inc - exp });
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
      },

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        const { search, type, sortBy, sortDir } = filters;
        
        let txns = [...transactions];

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
      },
    }),
    {
      name: 'zorvyn-finance',
      partialize: (state) => ({
        transactions: state.transactions,
        darkMode: state.darkMode,
      }),
    }
  )
);
