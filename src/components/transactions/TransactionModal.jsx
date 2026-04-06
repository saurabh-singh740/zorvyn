import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  TrendingUp, 
  TrendingDown,
  Tag,
  Calendar,
  AlertTriangle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

/**
 * TransactionModal - Premium modal for adding/editing transactions.
 * Restricted to Admins.
 */
export default function TransactionModal() {
  const { activeModal, closeModal, selectedTransactionId } = useUIStore();
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinanceStore();
  const { user } = useAuthStore();
  
  const isOpen = activeModal === 'add-transaction' || activeModal === 'edit-transaction';
  const isEditing = activeModal === 'edit-transaction';
  const isAdmin = user?.role === 'admin';

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Entertainment',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isEditing && selectedTransactionId) {
      const txn = transactions.find(t => t.id === selectedTransactionId);
      if (txn) {
        setFormData({
          description: txn.description,
          amount: txn.amount.toString(),
          type: txn.type,
          category: txn.category,
          date: new Date(txn.date).toISOString().split('T')[0]
        });
      }
    } else {
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: 'Entertainment',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [isEditing, selectedTransactionId, transactions, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error('Privileged operation restricted to Administrators.');
      return;
    }

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (isEditing) {
      updateTransaction({ ...payload, id: selectedTransactionId });
      toast.success('Transaction record updated.');
    } else {
      addTransaction(payload);
      toast.success('New transaction logged.');
    }
    closeModal();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this record? This action is irreversible.')) {
      deleteTransaction(selectedTransactionId);
      toast.success('Record purged.');
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-dark-1000/90 backdrop-blur-xl"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative z-10 w-full max-w-lg glass border border-white/10 rounded-3xl shadow-glow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                  <Sparkles size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-display font-extrabold text-white tracking-tight">
                    {isEditing ? 'Edit Operation' : 'Initialize Operation'}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                    Ledger ID: {isEditing ? selectedTransactionId.slice(0, 8) : 'NEW_ENTRY'}
                  </p>
               </div>
            </div>
            <button 
              onClick={closeModal}
              className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
               <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {!isAdmin && (
              <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>Read-only mode. Elevate to Administrator for mutations.</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
               <div className="float-label-group">
                  <input 
                    type="text" 
                    placeholder=" " 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="input"
                    required
                    disabled={!isAdmin}
                  />
                  <label>Transaction Description</label>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="float-label-group">
                    <input 
                      type="number" 
                      placeholder=" " 
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="input"
                      required
                      disabled={!isAdmin}
                    />
                    <label>Amount (USD)</label>
                  </div>
                  <div className="float-label-group">
                    <input 
                      type="date" 
                      placeholder=" " 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="input"
                      required
                      disabled={!isAdmin}
                    />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Operation Type & Sector</label>
                  <div className="flex gap-4">
                     <button
                        type="button"
                        onClick={() => isAdmin && setFormData({...formData, type: 'income'})}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all ${formData.type === 'income' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/5 text-slate-500 opacity-60'}`}
                     >
                        <TrendingUp size={18} />
                        <span className="font-bold text-sm">Inflow</span>
                     </button>
                     <button
                        type="button"
                        onClick={() => isAdmin && setFormData({...formData, type: 'expense'})}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all ${formData.type === 'expense' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-white/5 border-white/5 text-slate-500 opacity-60'}`}
                     >
                        <TrendingDown size={18} />
                        <span className="font-bold text-sm">Outflow</span>
                     </button>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="relative">
                     <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                     <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="input pl-11 appearance-none"
                        disabled={!isAdmin}
                     >
                        {['Entertainment', 'Food', 'Transport', 'Healthcare', 'Housing', 'Subscription', 'Salary', 'Investment'].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
              {isEditing && isAdmin && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-2xl text-rose-400 transition-all flex items-center gap-2 group"
                >
                  <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              )}
              <button
                type="submit"
                disabled={!isAdmin}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[15px] transition-all active:scale-95 shadow-glow-sm ${isAdmin ? 'bg-primary-500 hover:bg-primary-400 text-white cursor-pointer' : 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'}`}
              >
                {isEditing ? <Save size={20} /> : <Plus size={20} />}
                <span>{isEditing ? 'COMMIT UPDATES' : 'EXECUTE OPERATION'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
