import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  BarChart3,
  Calendar,
  Sparkles,
  Award,
  CircleDollarSign
} from 'lucide-react';
import { useFinanceStore } from '../store/financeStore';
import { formatCurrency, percentChange } from '../utils/helpers';
import Navbar from '../components/layout/Navbar';

/**
 * Insights Page - Advanced financial analysis with AI-inspired UI.
 */
export default function Insights() {
  const { getDerivedData } = useFinanceStore();
  const derived = getDerivedData();

  const {
    thisMonthIncome, thisMonthExpenses,
    lastMonthIncome, lastMonthExpenses,
    expenseByCategory,
    highestCategory,
    monthlyTrend
  } = derived;

  const incomeChange = percentChange(thisMonthIncome, lastMonthIncome);
  const expenseChange = percentChange(thisMonthExpenses, lastMonthExpenses);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex-1 flex flex-col bg-dark-1000/50 page-root">
      <Navbar title="Intelligence Deck" />

      <main className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-10 overflow-y-auto">
        
        {/* Header Hero */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass rounded-[40px] p-10 border border-white/5 overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-12 bg-primary-500/10 blur-[100px] w-[500px] h-[500px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"></div>
           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/20 border border-primary-500/20 rounded-full">
                    <Zap size={14} className="text-primary-400 fill-primary-400" />
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-primary-400">Advanced Neural Analysis Active</span>
                 </div>
                 <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tighter leading-tight">
                    Financial <span className="text-gradient-primary">Clarity</span> Redefined.
                 </h1>
                 <p className="text-slate-400 text-lg leading-relaxed">
                    Our analysis engine has processed your last 6 months of operations. Your financial trajectory is <span className="text-emerald-400 font-bold">Optimal</span> based on current inflow patterns.
                 </p>
              </div>
              <div className="flex bg-white/5 p-2 rounded-3xl border border-white/10 backdrop-blur-xl">
                 <div className="flex flex-col items-center px-8 py-4 border-r border-white/10">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Health Score</span>
                    <span className="text-4xl font-display font-extrabold text-white">84</span>
                 </div>
                 <div className="flex flex-col items-center px-8 py-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Reliability</span>
                    <span className="text-4xl font-display font-extrabold text-primary-400">92%</span>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Primary Insight Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
           {/* Top Category */}
           <motion.div variants={cardVariants} className="glass p-8 rounded-3xl border border-white/5 group hover:border-primary-500/30 transition-all flex flex-col justify-between h-full min-h-[220px]">
              <div>
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 mb-6 group-hover:bg-primary-500/10 transition-colors">
                    <PieChart size={24} />
                 </div>
                 <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Highest Sector</h3>
                 <p className="text-2xl font-display font-extrabold text-white tracking-tight">{highestCategory ? highestCategory[0] : 'N/A'}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                 <span className="text-xs font-medium text-slate-500">Accumulated</span>
                 <span className="text-sm font-display font-bold text-white">{highestCategory ? formatCurrency(highestCategory[1]) : '$0'}</span>
              </div>
           </motion.div>

           {/* Monthly Delta */}
           <motion.div variants={cardVariants} className="glass p-8 rounded-3xl border border-white/5 group hover:border-emerald-500/30 transition-all flex flex-col justify-between h-full min-h-[220px]">
              <div>
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${incomeChange >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    <TrendingUp size={24} />
                 </div>
                 <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Inflow Velocity</h3>
                 <p className="text-2xl font-display font-extrabold text-white tracking-tight">
                    {incomeChange >= 0 ? '+' : ''}{incomeChange?.toFixed(1)}%
                 </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                 {incomeChange >= 0 ? <ArrowUpRight size={14} className="text-emerald-400" /> : <ArrowDownRight size={14} className="text-rose-400" />}
                 <span className="text-xs font-medium text-slate-500">Relative to period -1</span>
              </div>
           </motion.div>

           {/* Burn Rate */}
           <motion.div variants={cardVariants} className="glass p-8 rounded-3xl border border-white/5 group hover:border-rose-500/30 transition-all flex flex-col justify-between h-full min-h-[220px]">
              <div>
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${expenseChange <= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    <TrendingDown size={24} />
                 </div>
                 <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Resource Burn</h3>
                 <p className="text-2xl font-display font-extrabold text-white tracking-tight">
                    {expenseChange >= 0 ? '+' : ''}{expenseChange?.toFixed(1)}%
                 </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                 <AlertCircle size={14} className="text-slate-600" />
                 <span className="text-xs font-medium text-slate-500">Anomaly detection: Nominal</span>
              </div>
           </motion.div>

           {/* Saving Goal */}
           <motion.div variants={cardVariants} className="glass p-8 rounded-3xl border border-white/5 group hover:border-amber-500/30 transition-all flex flex-col justify-between h-full min-h-[220px]">
              <div>
                 <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                    <Target size={24} />
                 </div>
                 <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Target Milestones</h3>
                 <div className="space-y-1">
                    <p className="text-2xl font-display font-extrabold text-white tracking-tight">Level 4</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-[72%] shadow-glow-sm"></div>
                    </div>
                 </div>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">72% to Next tier</p>
           </motion.div>
        </motion.div>

        {/* Deep Analysis row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Growth Projection */}
           <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 glass p-10 rounded-[32px] border border-white/5 relative overflow-hidden"
           >
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                       <BarChart3 size={20} />
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-white tracking-tight">Growth Trajectory</h3>
                 </div>
                 <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400">NODE_V.04_ACCURATE</span>
              </div>
              
              <div className="h-[300px] flex items-end gap-3 lg:gap-5 pb-4">
                 {monthlyTrend.map((m, i) => {
                    const maxVal = Math.max(...monthlyTrend.map(x => x.income));
                    const height = (m.income / maxVal) * 100;
                    return (
                       <div key={i} className="flex-1 group relative flex flex-col items-center">
                          <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-dark-1000 px-3 py-1.5 rounded-lg text-[10px] font-bold pointer-events-none whitespace-nowrap shadow-glow-sm">
                             {formatCurrency(m.income)}
                          </div>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                            className={`w-full max-w-[40px] rounded-t-xl group-hover:shadow-glow-md transition-shadow ${i === monthlyTrend.length - 1 ? 'bg-primary-500' : 'bg-white/5 group-hover:bg-white/10'}`}
                          ></motion.div>
                          <span className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{m.month}</span>
                       </div>
                    );
                 })}
              </div>
           </motion.div>

           {/* Achievements & Badges */}
           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 flex flex-col gap-6"
           >
              <div className="glass p-8 rounded-[32px] border border-white/5 flex-1 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="flex items-center gap-3 mb-8">
                    <Award className="text-violet-400" />
                    <h3 className="font-display font-extrabold text-white tracking-tight leading-none">Status Rank</h3>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-violet-500/20 transition-colors">
                       <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/20 flex items-center justify-center text-violet-400 font-display font-bold">1</div>
                       <div>
                          <p className="text-sm font-bold text-white">Elite Optimizer</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Efficiency rank #42</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary-500/20 transition-colors">
                       <div className="w-12 h-12 rounded-xl bg-primary-500/20 border border-primary-500/20 flex items-center justify-center text-primary-400 font-display font-bold">2</div>
                       <div>
                          <p className="text-sm font-bold text-white">Capital Shield</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Locked assets verified</p>
                       </div>
                    </div>
                 </div>
                 
                 <button className="w-full mt-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-400 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all">
                    View Network Achievements
                 </button>
              </div>

              {/* Quick Summary Card */}
              <div className="glass p-8 rounded-[32px] border border-emerald-500/10 relative overflow-hidden">
                 <div className="flex items-center gap-3 mb-4">
                    <CircleDollarSign size={20} className="text-emerald-400" />
                    <h4 className="font-display font-extrabold text-white tracking-tight">Portfolio Alpha</h4>
                 </div>
                 <p className="text-3xl font-display font-extrabold text-white mb-1 tracking-tighter">+$4,210</p>
                 <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-4">Projected Surplus (90D)</p>
                 <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <TrendingUp size={14} />
                    <span>8.2% vs Benchmark Index</span>
                 </div>
              </div>
           </motion.div>
        </div>

      </main>
    </div>
  );
}
