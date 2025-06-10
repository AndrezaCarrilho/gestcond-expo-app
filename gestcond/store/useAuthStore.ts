import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  // Adicione outras propriedades do seu objeto de usuário aqui
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setAuth: (token: string, userData: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({ // Tipo para 'set' é inferido por create<AuthState>()
      isAuthenticated: false,
      user: null,
      token: null,
      setAuth: (token, userData) => set({ isAuthenticated: true, user: userData, token }),
      clearAuth: () => set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);