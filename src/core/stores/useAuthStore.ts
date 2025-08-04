import { create } from 'zustand';
import type { User } from 'firebase/auth';
import { AuthRepository } from '@infrastructure/repositories/AuthRepository';
import { toastError } from '@infrastructure/notifications/notificationAdapter';

interface AuthState {
  loading: boolean;
  user: User | null;
  isInitialized: boolean;

  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setInitialized: (value: boolean) => void;
  resetPassword: (email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  isInitialized: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const user = await AuthRepository.login(email, password);
      set({ user });
    } catch (error) {
      toastError(error, 'Error al iniciar sesión');
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password, name) => {
    set({ loading: true });
    try {
      const user = await AuthRepository.register(email, password);

      if (user) {
        // Establecer displayName
        await AuthRepository.updateUserProfile({ displayName: name });

        // Enviar correo de verificación
        await AuthRepository.sendEmailVerification(user);

        set({ user });
      }
    } catch (error) {
      toastError(error, 'Error al registrar el usuario');
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await AuthRepository.logout();
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (email) => {
    await AuthRepository.resetPassword(email);
  },

  setUser: (user) => set({ user }),
  setInitialized: (value) => set({ isInitialized: value }),
}));
