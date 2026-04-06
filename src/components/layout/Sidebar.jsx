import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  User,
  Shield,
  Eye,
  Sparkles,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

const NavItem = ({ to, icon: Icon, label, collapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      relative flex items-center px-4 py-3.5 my-1 rounded-2xl transition-all duration-300 group
      ${isActive ? 'bg-primary-500/10 text-white shadow-glow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}
    `}
  >
    {({ isActive }) => (
      <>
        <div className="relative z-10 flex items-center">
          <Icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${isActive ? 'text-primary-400' : 'text-inherit'}`} />
          {!collapsed && (
            <span className="ml-4 font-medium text-[15px] whitespace-nowrap overflow-hidden">
              {label}
            </span>
          )}
        </div>
        
        {/* Active Pill Animation */}
        {isActive && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 bg-primary-500/10 border-l-[3px] border-primary-500 rounded-2xl z-0"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </>
    )}
  </NavLink>
);

export default function Sidebar() {
  const { user, logout, setRole } = useAuthStore();
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: Receipt, label: 'Transactions' },
    { to: '/insights', icon: PieChart, label: 'Insights' },
  ];

  const sidebarVariants = {
    open: { width: 280 },
    collapsed: { width: 88 },
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-[90]">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 glass rounded-xl text-primary-400 border border-primary-500/20"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop/Tablet Sidebar */}
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? "open" : "collapsed"}
        variants={sidebarVariants}
        className={`hidden lg:flex flex-col h-screen glass border-r border-white/5 relative z-50 overflow-hidden transition-all duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className={`p-6 mb-8 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-primary-500 shadow-glow-sm flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
             </div>
             {!isSidebarOpen ? null : (
               <motion.span
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="text-2xl font-display font-bold text-white tracking-tight"
               >
                 Zorvyn
               </motion.span>
             )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <div className="mb-4">
            {!isSidebarOpen ? null : (
              <span className="px-4 text-[11px] font-display font-bold uppercase tracking-widest text-slate-600">
                General
              </span>
            )}
            <div className="mt-4">
              {menuItems.map((item) => (
                <NavItem key={item.to} {...item} collapsed={!isSidebarOpen} />
              ))}
            </div>
          </div>
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
           {!isSidebarOpen ? (
              <button 
                 onClick={handleLogout}
                 className="w-full flex items-center justify-center p-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
              >
                 <LogOut size={20} />
              </button>
           ) : (
             <div className="space-y-4">
                {/* Role Switcher */}
                <div className="p-2 glass rounded-xl flex items-center justify-between border border-white/5 shadow-inner">
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user?.role === 'admin' ? 'bg-amber-400 animate-pulse' : 'bg-primary-400'}`}></div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                         {user?.role === 'admin' ? 'Premium Admin' : 'Basic Viewer'}
                      </span>
                   </div>
                   <button 
                      onClick={() => setRole(user?.role === 'admin' ? 'viewer' : 'admin')}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-primary-400 transition-all rotate-0 hover:rotate-180 transform duration-500 shadow-glow-sm"
                   >
                     <Settings size={14} />
                   </button>
                </div>

                <div className="flex items-center gap-3 px-2">
                   <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-primary-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <img 
                        src={user?.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email}`} 
                        alt="User" 
                        className="w-10 h-10 rounded-full border border-white/10 relative z-10"
                      />
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                   </div>
                   <button 
                     onClick={handleLogout}
                     className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                   >
                      <LogOut size={18} />
                   </button>
                </div>
             </div>
           )}
        </div>
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-dark-1000/80 backdrop-blur-md"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] glass border-r border-white/5 flex flex-col pt-20"
            >
               <nav className="flex-1 px-4">
                  {menuItems.map((item) => (
                    <NavItem key={item.to} {...item} collapsed={false} />
                  ))}
               </nav>
               <div className="p-6 border-t border-white/5">
                 <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20"
                 >
                   <LogOut size={20} />
                   <span className="font-medium">Logout</span>
                 </button>
               </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
