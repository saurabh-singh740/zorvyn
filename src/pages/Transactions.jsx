import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreVertical, 
  Edit3, 
  Search,
  Plus,
  Info,
  ShieldCheck,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import { useFinanceStore } from '../store/financeStore';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { formatCurrency, exportToCSV } from '../utils/helpers';
import Navbar from '../components/layout/Navbar';
import TransactionFilters from '../components/transactions/TransactionFilters';

/**
 * Transactions Page - Premium ledger view with real-time filtering and Admin CRUD.
 */
export default function Transactions() {
  const { getFilteredTransactions } = useFinanceStore();
  const { openModal } = useUIStore();
  const { user } = useAuthStore();
  
  const filteredTransactions = getFilteredTransactions();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex-1 flex flex-col bg-dark-1000/50 page-root">
      <Navbar title="Electronic Ledger" />

      <main className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-8 overflow-y-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 shadow-glow-sm">
                 <Receipt size={28} />
              </div>
              <div>
                 <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">Ledger Operations</h1>
                 <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Record Count:</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-bold text-primary-400">
                       {filteredTransactions.length}
                    </span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <button className="btn-ghost" onClick={() => exportToCSV(filteredTransactions)}>
                 <Download size={18} />
                 <span>Export CSV</span>
              </button>
              {isAdmin && (
                <button 
                  onClick={() => openModal('add-transaction')}
                  className="btn-primary"
                >
                  <Plus size={18} />
                  <span>Execute Operation</span>
                </button>
              )}
           </div>
        </div>

        {/* Filters */}
        <TransactionFilters />

        {/* Table/List View */}
        <div className="glass rounded-3xl border border-white/5 shadow-card overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                 <thead>
                    <tr className="text-left text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                       <th className="px-8 py-5">Record Description</th>
                       <th className="px-8 py-5">Sector</th>
                       <th className="px-8 py-5">Timestamp</th>
                       <th className="px-8 py-5 text-right">Magnitude</th>
                       <th className="px-8 py-5 text-center">Protocol</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/[0.03]">
                    <AnimatePresence mode="popLayout">
                       {filteredTransactions.length === 0 ? (
                          <motion.tr 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                             <td colSpan="5" className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-4">
                                   <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 mb-2">
                                      <Search size={32} />
                                   </div>
                                   <div>
                                      <h3 className="text-white font-bold text-lg leading-none">No records match your query</h3>
                                      <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search criteria.</p>
                                   </div>
                                </div>
                             </td>
                          </motion.tr>
                       ) : (
                          filteredTransactions.map((t, idx) => (
                             <TransactionRow key={t.id} transaction={t} index={idx} isAdmin={isAdmin} onEdit={() => openModal('edit-transaction', t.id)} />
                          ))
                       )}
                    </AnimatePresence>
                 </tbody>
              </table>
           </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl">
           <Info className="w-4 h-4 text-slate-500" />
           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Data synchronized with Zorvyn Cloud Node-041 (Region: US-East)
           </p>
        </div>
      </main>

    </div>
  );
}

function TransactionRow({ transaction: t, index, isAdmin, onEdit }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group hover:bg-white/[0.02] transition-colors cursor-default"
    >
       <td className="px-8 py-6">
          <div className="flex items-center gap-4">
             <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border border-white/5 shadow-glow-sm relative ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-inherit opacity-40"></div>
             </div>
             <div className="flex flex-col">
                <span className="text-[16px] font-bold text-white group-hover:text-primary-400 transition-colors leading-tight">{t.description}</span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest font-mono mt-0.5">{t.id.slice(0, 12)}</span>
             </div>
          </div>
       </td>
       <td className="px-8 py-6">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest group-hover:border-white/20 transition-colors">
             {t.category}
          </span>
       </td>
       <td className="px-8 py-6">
          <div className="flex flex-col">
             <span className="text-sm font-bold text-slate-300">{new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
             <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">{new Date(t.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
       </td>
       <td className="px-8 py-6 text-right">
          <div className="flex flex-col items-end">
             <span className={`text-xl font-display font-extrabold tracking-tight ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
             </span>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">USD Magnitude</span>
          </div>
       </td>
       <td className="px-8 py-6 text-center">
          {isAdmin ? (
            <button 
              onClick={onEdit}
              className="p-3 hover:bg-primary-500/10 rounded-2xl text-slate-500 hover:text-primary-400 transition-all active:scale-95 group/btn"
            >
               <Edit3 size={18} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          ) : (
            <div className="w-9 h-9 mx-auto flex items-center justify-center text-slate-800">
               <ShieldCheck size={20} className="opacity-20" />
            </div>
          )}
       </td>
    </motion.tr>
  );
}
