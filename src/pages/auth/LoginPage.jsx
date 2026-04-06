import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import ParticleField from '../../components/three/ParticleField';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success('Successfully logged in!', {
        icon: '🚀',
        style: {
          borderRadius: '12px',
          background: '#0d1424',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        }
      });
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-dark-1000 overflow-hidden">
      {/* 3D Background */}
      <ParticleField />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="absolute -inset-0.5 auth-glow-ring opacity-20 blur-xl"></div>
        <div className="glass rounded-3xl p-8 shadow-glass relative overflow-hidden backdrop-blur-3xl border border-white/10">
          
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-400 mb-6 border border-primary-500/20"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm">
              The future of finance is here.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="float-label-group">
                <div className="relative flex items-center group">
                  <Mail className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    className="input pl-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>
              </div>

              <div className="float-label-group">
                <div className="relative flex items-center group">
                  <Lock className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className="input pl-12 pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 border-2 border-slate-600 rounded-lg peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all flex items-center justify-center">
                     <span className="text-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity">✓</span>
                  </div>
                  <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                </div>
              </label>
              <button type="button" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 overflow-hidden relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
              />
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white font-medium hover:text-primary-400 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-slate-500 text-[10px]"
        >
          Demo: admin@zorvyn.com / admin123
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
