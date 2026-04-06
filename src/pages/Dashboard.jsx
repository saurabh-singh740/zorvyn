import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Plus,
  Calendar,
  Filter,
  RefreshCw,
  Sparkles,
  Zap,
  CreditCard
} from 'lucide-react';
import { useFinanceStore } from '../store/financeStore';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { formatCurrency, percentChange } from '../utils/helpers';
import StatCard from '../components/ui/StatCard';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import ExpenseBreakdownChart from '../components/charts/ExpenseBreakdownChart';
import Navbar from '../components/layout/Navbar';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { getDerivedData, transactions, setFilter, resetTransactions } = useFinanceStore();
  const { openModal } = useUIStore();
  const derived = getDerivedData();

  const {
    totalBalance, totalIncome, totalExpenses,
    thisMonthIncome, thisMonthExpenses,
    lastMonthIncome, lastMonthExpenses,
    monthlyTrend,
  } = derived;

  const incomeChange = percentChange(thisMonthIncome, lastMonthIncome);
  const expenseChange = percentChange(thisMonthExpenses, lastMonthExpenses);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="flex-1 flex flex-col bg-dark-1000/50 page-root">
      <Navbar title="Dashboard" />

      <main className="flex-1 p-6 lg:p-10 space-y-10 overflow-y-auto max-w-[1600px] mx-auto w-full">
        
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden p-8 rounded-3xl glass border border-primary-500/10 shadow-glow-sm"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 blur-3xl bg-primary-500 w-64 h-64 rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                 <span className="text-xs font-bold uppercase tracking-widest text-primary-400">System Ready</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-white tracking-tight mb-2">
                Good morning, {user?.name.split(' ')[0]}! ✨
              </h2>
              <p className="text-slate-400 max-w-lg text-sm leading-relaxed">
                Your portfolio grew by 12.4% this month. You've reached 85% of your saving goal. Keep up the great work!
              </p>
            </div>
            <div className="flex items-center gap-3">
               <button 
                onClick={() => openModal('add-transaction')}
                className="btn-primary"
               >
                 <Plus size={18} />
                 <span>New Transaction</span>
               </button>
               <button 
                onClick={resetTransactions}
                className="btn-ghost"
               >
                 <RefreshCw size={18} />
                 <span>Reset Data</span>
               </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <StatCard
            label="Total Balance"
            numericValue={totalBalance}
            icon={Wallet}
            color="primary"
            subtitle={`Consolidated balance across assets`}
          />
          <StatCard
            label="Income"
            numericValue={totalIncome}
            icon={TrendingUp}
            color="emerald"
            trend={incomeChange}
            subtitle={incomeChange !== null ? `+${formatCurrency(thisMonthIncome)} this month` : 'Awaiting data'}
          />
          <StatCard
            label="Expenses"
            numericValue={totalExpenses}
            icon={TrendingDown}
            color="rose"
            trend={expenseChange !== null ? -expenseChange : null}
            subtitle={expenseChange !== null ? `-${formatCurrency(thisMonthExpenses)} this month` : 'Awaiting data'}
          />
        </motion.section>

        {/* Main Analytics Row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-primary-400">
                    <Calendar size={18} />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg tracking-tight">Financial Performance</h3>
               </div>
               <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary-500 rounded-lg shadow-glow-sm">1M</button>
                  <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">6M</button>
                  <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">1Y</button>
               </div>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5 shadow-card flex-1 min-h-[400px] min-w-0">
               <BalanceTrendChart />
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-violet-400">
                     <CreditCard size={18} />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg tracking-tight">Spending Breakdown</h3>
               </div>
               <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <Filter size={18} />
               </button>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5 shadow-card flex-1 min-h-[400px] min-w-0">
               <ExpenseBreakdownChart />
            </div>
          </motion.div>
        </section>

        {/* Global Footer Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-5 gap-8">
           {/* Recent Transactions */}
           <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="xl:col-span-3 card h-full min-h-[400px] flex flex-col overflow-hidden"
           >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                 <h3 className="font-display font-bold text-white tracking-tight">Active Operations</h3>
                 <button className="text-xs font-bold text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2 group">
                    View Real-time Ledger
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                 <RecentTransactionsTable />
              </div>
           </motion.div>

           {/* Quick Action / Static Promo */}
           <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="xl:col-span-2 space-y-6"
           >
              <div className="glass p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                       <Sparkles size={24} />
                    </div>
                    <h4 className="text-xl font-display font-extrabold text-white mb-2 leading-tight">Intelligent AI Insights</h4>
                    <p className="text-slate-400 text-sm mb-6 max-w-xs">Our neural network predicts your expenses will drop by 4% next week based on recurring patterns.</p>
                    <button className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold transition-all active:scale-95">
                       Unlock Analysis
                    </button>
                 </div>
              </div>

              <div className="glass p-8 rounded-3xl border border-violet-500/20 relative overflow-hidden group">
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 blur-3xl transform -translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="relative z-10">
                    <h4 className="text-xl font-display font-extrabold text-white mb-2 leading-tight">Secure Vault Status</h4>
                    <p className="text-slate-400 text-sm mb-4">Enterprise-grade encryption is active for your 12 linked accounts.</p>
                    <div className="flex items-center gap-3 p-3 bg-dark-950/50 rounded-2xl border border-white/5">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-ping"></div>
                        <span className="text-xs font-mono font-bold text-slate-300">ZOR-SEC-00412-ACTIVE</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

      </main>
    </div>
  );
}

function RecentTransactionsTable() {
  const { transactions } = useFinanceStore();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
         <thead>
            <tr className="text-left text-[11px] font-bold text-slate-600 uppercase tracking-widest border-b border-white/5">
               <th className="px-6 py-4">Transaction</th>
               <th className="px-6 py-4">Category</th>
               <th className="px-6 py-4 text-right">Amount</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-white/[0.03]">
            {recent.map((t, idx) => (
              <motion.tr 
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="group hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-5">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border border-white/5 ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                         {t.description.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-white group-hover:text-primary-400 transition-colors">{t.description}</span>
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{new Date(t.date).toLocaleDateString()}</span>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-5">
                   <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                      {t.category}
                   </span>
                </td>
                <td className="px-6 py-5 text-right">
                   <span className={`text-lg font-display font-extrabold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                   </span>
                </td>
              </motion.tr>
            ))}
         </tbody>
      </table>
    </div>
  );
}
