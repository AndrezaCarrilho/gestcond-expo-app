// store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number; 
  name: string;
  email: string;
  cpf: string; 
  apartment?: string; 
  block?: string;     
  role?: string;    
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isDarkMode: boolean; 
  setAuth: (token: string, userData: User) => void;
  clearAuth: () => void;
  toggleDarkMode: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false as boolean,
      user: null as User | null,
      token: null as string | null,
      isDarkMode: false as boolean, 
      setAuth: (token, userData) => set({ isAuthenticated: true, user: userData, token }),
      clearAuth: () => set({ isAuthenticated: false, user: null, token: null }),
      toggleDarkMode: () => set((state: AuthState) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);