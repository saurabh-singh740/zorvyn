import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  Zap,
  CheckCheck,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useFinanceStore } from '../../store/financeStore';

const NOTIFICATIONS = [
  {
    id: 1,
    icon: TrendingUp,
    color: 'emerald',
    title: 'Income recorded',
    desc: 'Salary deposit of $4,500 has been logged.',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    icon: AlertCircle,
    color: 'amber',
    title: 'Budget threshold',
    desc: 'Food spending is at 85% of your monthly budget.',
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    icon: Zap,
    color: 'primary',
    title: 'Insight ready',
    desc: 'Your monthly financial analysis report is available.',
    time: '3h ago',
    unread: false,
  },
];

const colorMap = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
};

export default function Navbar({ title }) {
  const { user } = useAuthStore();
  const { darkMode, toggleDarkMode } = useFinanceStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const dismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/5 backdrop-blur-3xl h-20 flex items-center pl-16 pr-4 sm:pr-6 lg:px-10 justify-between shrink-0">

      {/* Left: Title + Search */}
      <div className="flex items-center gap-6 lg:gap-10">
        <div className="hidden lg:flex flex-col">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-1">
            <span>Zorvyn</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>Main</span>
          </div>
          <h1 className="text-xl font-display font-extrabold text-white tracking-tight">
            {title}
          </h1>
        </div>

        <div className="relative group hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-white/20 w-48 lg:w-72 transition-all hover:bg-white/[0.08]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-500 font-mono">
            <span className="opacity-60">⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 lg:gap-4">

        {/* Network Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
        </div>

        {/* Dark / Light Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/5">
          <button
            onClick={toggleDarkMode}
            title="Light mode"
            className={`p-2 rounded-xl transition-all ${!darkMode ? 'bg-primary-500 text-white shadow-glow-sm' : 'text-slate-500 hover:text-white'}`}
          >
            <Sun size={18} />
          </button>
          <button
            onClick={toggleDarkMode}
            title="Dark mode"
            className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-primary-500 text-white shadow-glow-sm' : 'text-slate-500 hover:text-white'}`}
          >
            <Moon size={18} />
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group"
          >
            <Bell size={20} className="text-slate-400 group-hover:text-white transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full border-2 border-dark-1000 flex items-center justify-center text-[9px] font-bold text-white leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 glass border border-white/10 rounded-2xl shadow-glow-lg overflow-hidden z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <span className="text-sm font-bold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="flex items-center gap-1.5 text-[11px] font-bold text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <CheckCheck size={13} />
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="divide-y divide-white/[0.04] max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-10 text-center text-sm text-slate-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors ${n.unread ? 'bg-white/[0.02]' : ''}`}
                        >
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${colorMap[n.color]}`}>
                            <Icon size={15} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-bold text-white leading-tight truncate">{n.title}</p>
                              {n.unread && <span className="w-1.5 h-1.5 bg-primary-400 rounded-full shrink-0"></span>}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                            <p className="text-[10px] text-slate-600 mt-1 font-medium">{n.time}</p>
                          </div>
                          <button
                            onClick={() => dismiss(n.id)}
                            className="text-slate-600 hover:text-slate-400 transition-colors shrink-0 mt-0.5"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar */}
        <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-white/5 rounded-2xl transition-all group border border-transparent hover:border-white/10">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary-500 to-violet-500 rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img
              src={user?.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email}`}
              alt="Profile"
              className="w-9 h-9 border border-white/20 rounded-xl relative z-10"
            />
          </div>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-xs font-bold text-white leading-none mb-0.5">{user?.name}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">{user?.role}</span>
          </div>
          <ChevronDown size={14} className="text-slate-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
}
