import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { useFinanceStore } from '../../store/financeStore';
import { useAuthStore } from '../../store/authStore';
import { formatCurrency } from '../../utils/helpers';

const COLORS = [
  '#0ea5e9', // primary-500
  '#8b5cf6', // violet-500
  '#22d3ee', // cyan-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#f43f5e', // rose-500
  '#6366f1', // indigo-500
];

const GRADIENTS = [
  { id: 'grad-0', color: '#0ea5e9' },
  { id: 'grad-1', color: '#8b5cf6' },
  { id: 'grad-2', color: '#22d3ee' },
  { id: 'grad-3', color: '#10b981' },
  { id: 'grad-4', color: '#f59e0b' },
  { id: 'grad-5', color: '#f43f5e' },
  { id: 'grad-6', color: '#6366f1' },
];

/**
 * ExpenseBreakdownChart - Premium donut chart with custom legends and tooltips.
 */
export default function ExpenseBreakdownChart() {
  const { getDerivedData } = useFinanceStore();
  const { expenseByCategory } = getDerivedData();

  const data = Object.entries(expenseByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    value
  })).sort((a, b) => b.value - a.value);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = (data.value / total * 100).toFixed(1);
      return (
        <div className="glass p-4 rounded-2xl border border-white/10 shadow-glow-sm backdrop-blur-3xl animate-scale-in">
           <div className="flex items-center gap-2 mb-2">
              <div 
                 className="w-3 h-3 rounded-full border border-white/20 shadow-glow-sm" 
                 style={{ backgroundColor: payload[0].color }}
              ></div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                 {data.name}
              </p>
           </div>
           <p className="text-xl font-display font-extrabold text-white mb-0.5">
              {formatCurrency(data.value)}
           </p>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              {percent}% of total expenses
           </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div 
                 className="w-2.5 h-2.5 rounded-full border border-white/10 shadow-glow-sm group-hover:scale-125 transition-transform" 
                 style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-white uppercase tracking-wider transition-colors">
                {entry.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[350px] p-8 text-center space-y-4">
         <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <PieChart className="w-10 h-10 text-slate-600" />
         </div>
         <p className="text-sm font-medium text-slate-500">No expense data for this period.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 400, position: 'relative' }}>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-9 pointer-events-none">
         <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-slate-500 mb-1">
            Total Burn
         </span>
         <span className="text-2xl font-display font-extrabold text-white tracking-tight">
            {formatCurrency(total)}
         </span>
      </div>

      <ResponsiveContainer width="100%" height={400} minWidth={0} debounce={50}>
        <PieChart>
          <defs>
             {GRADIENTS.map((g, idx) => (
                <linearGradient key={idx} id={`pie-${idx}`} x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor={g.color} />
                   <stop offset="100%" stopColor={g.color} stopOpacity={0.6} />
                </linearGradient>
             ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            innerRadius={85}
            outerRadius={115}
            paddingAngle={5}
            dataKey="value"
            animationBegin={0}
            animationDuration={2500}
            stroke="rgba(0,0,0,0)"
          >
            {data.map((entry, index) => (
              <Cell 
                 key={`cell-${index}`} 
                 fill={`url(#pie-${index % GRADIENTS.length})`}
                 className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} layout="vertical" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
