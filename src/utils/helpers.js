/** Utility helpers for the Finance Dashboard */

/**
 * Format a number as USD currency string.
 * @param {number} amount
 * @param {boolean} showSign - whether to prefix with + or -
 */
export const formatCurrency = (amount, showSign = false) => {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs);

  if (showSign) {
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  }
  return formatted;
};

/**
 * Format a date string (YYYY-MM-DD) to a readable format.
 * @param {string} dateStr
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Generate a unique ID for new transactions.
 */
export const generateId = () =>
  `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Export an array of transactions as a CSV file download.
 * @param {Array} transactions
 */
export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.type === 'expense' ? -t.amount : t.amount,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Calculate percentage change between two values.
 * Returns null if previous is 0.
 */
export const percentChange = (current, previous) => {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

/**
 * Clamp a number between min and max.
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
