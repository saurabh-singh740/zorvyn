import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tooltip - Premium hover tooltip with glassmorphism.
 */
export default function Tooltip({ text, children, position = 'top' }) {
  const [show, setShow] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3'
  };

  const animations = {
    top: { initial: { opacity: 0, y: 10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 10, scale: 0.95 } },
    bottom: { initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 } },
    left: { initial: { opacity: 0, x: 10, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 10, scale: 0.95 } },
    right: { initial: { opacity: 0, x: -10, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -10, scale: 0.95 } }
  };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={animations[position].initial}
            animate={animations[position].animate}
            exit={animations[position].exit}
            className={`absolute z-[100] whitespace-nowrap pointer-events-none ${positions[position]}`}
          >
             <div className="glass px-3 py-1.5 rounded-lg border border-white/10 shadow-glow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white leading-none">
                   {text}
                </span>
                <div 
                  className={`absolute w-2 h-2 glass border-b border-r border-white/10 rotate-45 
                    ${position === 'top' ? 'top-full -translate-y-1 left-1/2 -translate-x-1/2' : ''}
                    ${position === 'bottom' ? 'bottom-full translate-y-1 left-1/2 -translate-x-1/2' : ''}
                    ${position === 'left' ? 'left-full -translate-x-1 top-1/2 -translate-y-1/2' : ''}
                    ${position === 'right' ? 'right-full translate-x-1 top-1/2 -translate-y-1/2' : ''}
                  `}
                ></div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
