/**
 * uiStore.js - Zustand state for UI components like modals, sidebars, and loading states.
 */
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isSidebarOpen: true,
  isLoading: false,
  activeModal: null, // null | 'add-transaction' | 'edit-transaction' | 'delete-transaction'
  selectedTransactionId: null,

  // ─── Actions ────────────────────────────────────────────
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  openModal: (modalName, transactionId = null) => 
    set({ activeModal: modalName, selectedTransactionId: transactionId }),
    
  closeModal: () => set({ activeModal: null, selectedTransactionId: null }),
}));
