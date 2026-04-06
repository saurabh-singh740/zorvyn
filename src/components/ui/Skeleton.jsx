import React from 'react';
import { motion } from 'framer-motion';

/**
 * Skeleton - Shimmering loading placeholder for premium cards and list items.
 */
export default function Skeleton({ width = 'full', height = '4', className = '' }) {
  const w = width === 'full' ? 'w-full' : `w-[${width}]`;
  const h = height === 'full' ? 'h-full' : `h-${height}`;

  return (
    <div className={`relative overflow-hidden bg-white/5 rounded-xl border border-white/5 ${w} ${h} ${className}`}>
       <motion.div
         animate={{ x: ['-200%', '200%'] }}
         transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-[-15deg]"
       />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 border border-white/5 space-y-6">
       <div className="flex items-start justify-between">
          <div className="space-y-2">
             <Skeleton width="24" height="3" />
             <Skeleton width="40" height="8" />
          </div>
          <Skeleton width="12" height="12" />
       </div>
       <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <Skeleton width="32" height="3" />
          <Skeleton width="16" height="6" />
       </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-white/5">
       <td className="px-8 py-6">
          <div className="flex items-center gap-4">
             <Skeleton width="11" height="11" className="rounded-2xl shrink-0" />
             <div className="space-y-1.5 flex-1">
                <Skeleton width="48" height="4" />
                <Skeleton width="24" height="2" />
             </div>
          </div>
       </td>
       <td className="px-8 py-6">
          <Skeleton width="20" height="6" />
       </td>
       <td className="px-8 py-6">
          <div className="space-y-1.5">
             <Skeleton width="24" height="3" />
             <Skeleton width="16" height="2" />
          </div>
       </td>
       <td className="px-8 py-6 text-right">
          <div className="flex flex-col items-end space-y-1.5">
             <Skeleton width="24" height="6" />
             <Skeleton width="16" height="2" />
          </div>
       </td>
       <td className="px-8 py-6">
          <Skeleton width="8" height="8" className="mx-auto" />
       </td>
    </tr>
  );
}
