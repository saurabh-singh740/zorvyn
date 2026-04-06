import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowUpNarrowWide,
  X,
  CreditCard,
  TrendingDown,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';
import useDebounce from '../../hooks/useDebounce';

/**
 * TransactionFilters - Premium filter bar with glassmorphism and debounced search.
 */
export default function TransactionFilters() {
  const { filters, setFilter } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    setFilter({ search: debouncedSearch });
  }, [debouncedSearch, setFilter]);

  const toggleSortDir = () => {
    setFilter({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });
  };

  const types = [
    { value: 'all', label: 'All Operations', icon: LayoutGrid },
    { value: 'income', label: 'Inflow', icon: TrendingUp },
    { value: 'expense', label: 'Outflow', icon: TrendingDown },
  ];

  const categories = ['Entertainment', 'Food', 'Transport', 'Healthcare', 'Housing', 'Subscription', 'Salary', 'Investment'];

  return (
    <div className="flex flex-col gap-6 mb-8">
      
      {/* Top Row: Search & Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative group flex-1 max-w-xl">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
           <input
             type="text"
             placeholder="Search ledger by description or vendor..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-[15px] font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-white/20 transition-all shadow-glow-sm hover:bg-white/[0.08]"
           />
           {searchTerm && (
             <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
             >
               <X size={16} />
             </button>
           )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
             <button 
               onClick={() => setFilter({ sortBy: 'date' })}
               className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${filters.sortBy === 'date' ? 'bg-primary-500 text-white shadow-glow-sm' : 'text-slate-500 hover:text-white'}`}
             >
               By Date
             </button>
             <button 
               onClick={() => setFilter({ sortBy: 'amount' })}
               className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${filters.sortBy === 'amount' ? 'bg-primary-500 text-white shadow-glow-sm' : 'text-slate-500 hover:text-white'}`}
             >
               By Value
             </button>
          </div>

          <button 
            onClick={toggleSortDir}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all active:scale-95 shadow-glow-sm"
          >
            <ArrowUpNarrowWide 
              size={18} 
              className={`transition-transform duration-300 ${filters.sortDir === 'desc' ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
      </div>

      {/* Bottom Row: Tab Filters */}
      <div className="flex flex-wrap items-center gap-3">
         {types.map((type) => {
            const Icon = type.icon;
            const isActive = filters.type === type.value;
            return (
              <button
                key={type.value}
                onClick={() => setFilter({ type: type.value })}
                className={`
                  flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-bold tracking-tight transition-all border
                  ${isActive 
                    ? 'bg-primary-500 text-white border-primary-500 shadow-glow-md scale-105' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }
                `}
              >
                <Icon size={16} />
                <span>{type.label}</span>
              </button>
            );
         })}
         
         <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block"></div>

         <div className="flex items-center gap-3 overflow-x-auto pb-1 invisible-scrollbar">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest whitespace-nowrap">Categories:</span>
            {categories.slice(0, 5).map(cat => (
              <button 
                key={cat}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-slate-400 hover:text-white transition-all whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
            <button className="p-1.5 rounded-lg bg-white/5 text-slate-500">
               <ChevronDown size={14} />
            </button>
         </div>
      </div>
    </div>
  );
}
