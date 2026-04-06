/**
 * authStore.js — Zustand auth state with localStorage persistence.
 * Simulates Better Auth behavior (no backend required).
 * Admin role granted to admin@zorvyn.com or any user with role stored.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_EMAIL = 'admin@zorvyn.com';
const DEMO_ADMIN = { email: 'admin@zorvyn.com', password: 'admin123', name: 'Saurav Admin' };

const simulateAuth = async (email, password, name = null) => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));

  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  if (!email.includes('@')) throw new Error('Invalid email address');

  const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    email: email.toLowerCase(),
    name: name || (isAdmin ? DEMO_ADMIN.name : email.split('@')[0]),
    role: isAdmin ? 'admin' : 'viewer',
    avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
    createdAt: new Date().toISOString(),
  };
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ─── Actions ────────────────────────────────────────────
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const user = await simulateAuth(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return { success: false, error: err.message };
        }
      },

      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          if (!name || name.trim().length < 2) throw new Error('Name must be at least 2 characters');
          const user = await simulateAuth(email, password, name.trim());
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return { success: false, error: err.message };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      setRole: (role) => {
        const { user } = get();
        if (user) set({ user: { ...user, role } });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'zorvyn-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
