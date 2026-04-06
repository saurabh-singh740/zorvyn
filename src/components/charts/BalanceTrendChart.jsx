import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useFinanceStore } from '../../store/financeStore';
import { formatCurrency } from '../../utils/helpers';

// Defined outside component to avoid recharts losing reference on re-render
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length < 2) return null;
  const income   = payload[0]?.value ?? 0;
  const expenses = payload[1]?.value ?? 0;
  return (
    <div className="glass p-4 rounded-2xl border border-white/10 shadow-glow-sm backdrop-blur-3xl">
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
        {label}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-400"></div>
            <span className="text-xs text-slate-300 font-medium whitespace-nowrap">Monthly Income</span>
          </div>
          <span className="text-sm font-display font-extrabold text-white">{formatCurrency(income)}</span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-400"></div>
            <span className="text-xs text-slate-300 font-medium whitespace-nowrap">Monthly Expenses</span>
          </div>
          <span className="text-sm font-display font-extrabold text-white">{formatCurrency(expenses)}</span>
        </div>
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between gap-6">
          <span className="text-xs text-slate-500 font-medium">Net Savings</span>
          <span className={`text-sm font-display font-extrabold ${income - expenses >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(income - expenses)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function BalanceTrendChart() {
  const { getDerivedData } = useFinanceStore();
  const { monthlyTrend } = getDerivedData();

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height={350} minWidth={0} debounce={50}>
        <AreaChart
          data={monthlyTrend}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(255,255,255,0.03)"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
            dy={15}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickFormatter={(v) => `$${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#0ea5e9"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncome)"
            animationDuration={1500}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#0ea5e9' }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#f43f5e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorExpense)"
            animationDuration={1500}
            strokeDasharray="5 5"
            activeDot={{ r: 4, strokeWidth: 0, fill: '#f43f5e' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
