/**
 * TransactionRow - Single row in the transactions table.
 * Supports view + admin (edit/delete) actions.
 */
import { Pencil, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function TransactionRow({ transaction, isAdmin, onEdit, onDelete }) {
  const { date, description, amount, category, type } = transaction;

  return (
    <tr className="group border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors duration-150">
      {/* Date */}
      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {formatDate(date)}
      </td>

      {/* Description */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`shrink-0 ${type === 'income' ? 'text-success-500' : 'text-danger-500'}`}>
            {type === 'income'
              ? <ArrowUpCircle size={14} />
              : <ArrowDownCircle size={14} />
            }
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[200px]">
            {description}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
          {category}
        </span>
      </td>

      {/* Type */}
      <td className="px-4 py-3 hidden md:table-cell">
        <span className={type === 'income' ? 'badge-income' : 'badge-expense'}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </td>

      {/* Amount */}
      <td className={`px-4 py-3 text-sm font-bold text-right whitespace-nowrap
        ${type === 'income'
          ? 'text-success-600 dark:text-success-400'
          : 'text-danger-600 dark:text-danger-400'
        }`}>
        {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
      </td>

      {/* Actions (Admin only) */}
      <td className="px-4 py-3 text-right">
        {isAdmin && (
          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={() => onEdit(transaction)}
              title="Edit"
              className="p-1.5 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 
                         text-primary-600 dark:text-primary-400 transition-colors"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              title="Delete"
              className="p-1.5 rounded-lg hover:bg-danger-100 dark:hover:bg-danger-900/30 
                         text-danger-600 dark:text-danger-400 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
