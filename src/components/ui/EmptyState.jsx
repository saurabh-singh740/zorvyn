import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, SearchX, Inbox, ZapOff } from 'lucide-react';

/**
 * EmptyState - Premium empty state placeholder with animated icons.
 */
export default function EmptyState({ 
  title = "No records found", 
  message = "Try adjusting your filters or initializing a new operation.",
  icon: Icon = Inbox
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 mb-8 relative"
      >
         <div className="absolute inset-0 bg-primary-500/5 blur-2xl rounded-full opacity-50 animate-pulse"></div>
         <Icon size={40} className="relative z-10" />
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-display font-extrabold text-white tracking-tight leading-none mb-3"
      >
        {title}
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-medium text-slate-500 leading-relaxed"
      >
        {message}
      </motion.p>
    </div>
  );
}
