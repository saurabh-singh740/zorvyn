# FinanceIQ – Personal Finance Dashboard

A clean, modern, and fully responsive **React** finance dashboard with dark mode, role-based UI, analytics charts, and CSV export.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or navigate to the project folder
cd zorvyn

# Install dependencies (already done if scaffolded)
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Features

### 1. Dashboard Overview
- **Summary Cards**: Total Balance, Total Income, Total Expenses with trend indicators (% vs last month)
- **Monthly Overview Chart**: Income + expenses bar/line combo chart across 6 months (Recharts)
- **Expense Breakdown**: Donut chart showing spending by category
- **Recent Activity**: Quick view of the 5 latest transactions

### 2. Transactions
- Full sortable, filterable transaction table
- **Search** by description or category
- **Filter** by type (All / Income / Expense)
- **Sort** by Date or Amount (ascending / descending)
- Shows: Date, Description, Category, Type badge, Amount

### 3. Role-Based UI
> Switch via the dropdown in the navbar (no auth required)

| Role | Capability |
|------|-----------|
| **Viewer** | Read-only — browse all data |
| **Admin** | Full CRUD — Add, Edit, Delete transactions |

### 4. Insights
- Highest spending category
- Savings rate calculation
- Month-over-month comparison chart (this month vs last)
- Top 6 spending categories with progress bars
- Smart observations (auto-generated based on data)

### 5. Extras
- 🌙 **Dark mode** toggle (persistent)
- 💾 **localStorage** persistence — data survives page refresh
- 📤 **CSV Export** — downloads filtered transactions as a `.csv` file
- 📱 **Responsive** — mobile sidebar drawer + desktop sticky sidebar

---

## 🗂️ Folder Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx    # Line/bar combo chart
│   │   └── ExpenseBreakdownChart.jsx # Donut chart
│   ├── layout/
│   │   ├── Sidebar.jsx              # Nav sidebar + mobile drawer
│   │   └── Navbar.jsx               # Top bar with role switcher
│   ├── transactions/
│   │   ├── TransactionFilters.jsx   # Search/filter/sort controls
│   │   ├── TransactionRow.jsx       # Single table row
│   │   └── TransactionModal.jsx     # Add/Edit modal form
│   └── ui/
│       └── StatCard.jsx             # Reusable summary card
├── context/
│   └── FinanceContext.jsx           # Central Context API + reducer
├── data/
│   └── mockData.js                  # 60 mock transactions (6 months)
├── pages/
│   ├── Dashboard.jsx                # Overview page
│   ├── Transactions.jsx             # Full transactions list
│   └── Insights.jsx                 # Analytics & insights
├── utils/
│   └── helpers.js                   # formatCurrency, exportToCSV, etc.
├── App.jsx                          # Router + layout shell
├── main.jsx                         # React entry point
└── index.css                        # Tailwind + global styles
```

---

## 🛠️ Tech Stack

| Library | Purpose |
|---------|---------|
| React 18 | UI framework |
| Vite | Build tool / dev server |
| Tailwind CSS v3 | Styling |
| Recharts | Charts / visualizations |
| React Router v6 | Client-side routing |
| lucide-react | Icons |

---

## 🧠 Approach

- **Context API + useReducer** for clean, predictable state management
- **useMemo** for derived analytics (no redundant computation)
- **localStorage** auto-persistence on every state change
- **Role simulation** — no backend needed, role stored in context
- **Responsive design** — mobile-first with Tailwind breakpoints
- **Reusable components** — `StatCard`, `TransactionRow`, `InsightCard` etc.
