import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard - Highly animated premium stat card with count-up.
 */
export default function StatCard({ 
  label, 
  value, 
  numericValue, // Pure number for CountUp
  icon: Icon, 
  color = 'primary', 
  trend = null, 
  subtitle = '' 
}) {
  
  const colors = {
    primary: 'from-primary-500/20 to-primary-600/5 text-primary-400 border-primary-500/20',
    violet:  'from-violet-500/20 to-violet-600/5 text-violet-400 border-violet-500/20',
    emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    rose:    'from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/20',
    cyan:    'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/20',
    amber:   'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
  };

  const glowColors = {
    primary: 'rgba(14, 157, 232, 0.4)',
    violet:  'rgba(139, 92, 246, 0.4)',
    emerald: 'rgba(52, 211, 153, 0.4)',
    rose:    'rgba(251, 113, 133, 0.4)',
    cyan:    'rgba(34, 211, 238, 0.4)',
    amber:   'rgba(251, 191, 36, 0.4)',
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative group h-full"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: glowColors[color] }}
      ></div>

      <div className="glass h-full rounded-2xl p-6 border border-white/5 group-hover:border-white/10 transition-colors backdrop-blur-xl flex flex-col justify-between overflow-hidden relative">
        
        {/* Animated Beam Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-beam" />

        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-primary-500 rounded-full animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {label}
                </span>
             </div>
             <h3 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-baseline">
                {typeof numericValue === 'number' ? (
                  <>
                    <span className="text-lg text-slate-500 mr-0.5">$</span>
                    <CountUp 
                      end={numericValue} 
                      duration={2.5} 
                      separator="," 
                      decimals={2}
                      useEasing={true}
                    />
                  </>
                ) : (
                  value
                )}
             </h3>
          </div>

          <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} border shadow-glow-sm relative`}>
             <div className="absolute inset-0 rounded-inherit bg-white/10 animate-pulse opacity-50"></div>
             <Icon className="w-6 h-6 relative z-10" />
          </div>
        </div>

        <div className="flex items-center justify-between relative z-10 mt-2 pt-4 border-t border-white/5">
           <div className="flex-1">
              <p className="text-[11px] text-slate-500 font-medium truncate">
                {subtitle}
              </p>
           </div>
           
           {trend !== null && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                 {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                 <span>{Math.abs(trend).toFixed(1)}%</span>
              </div>
           )}
        </div>
      </div>
    </motion.div>
  );
}
