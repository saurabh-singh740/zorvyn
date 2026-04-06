import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Loader - Highly animated premium loading indicator.
 */
export default function Loader({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-1000">
        <div className="relative">
          {/* Pulsing Outer Ring */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-primary-500 rounded-full blur-2xl"
          />
          
          {/* Animated Spinner Icon */}
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full border-4 border-primary-500/20 border-t-primary-500 rounded-full shadow-glow-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
              </div>
            </div>
            
            <motion.div
               animate={{ opacity: [0.4, 1, 0.4] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-xs font-display uppercase tracking-[0.2em] text-slate-400"
            >
              Initializing Experience
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
       <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
    </div>
  );
}
