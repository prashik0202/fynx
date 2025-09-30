import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type AuthState = {
  userId: string | null;
  isAuthenticated: boolean;
  setUserId: (id: string | null) => void;
  setAuthState: () => void;
  logout: () => void;
}

export const useAuthMiddleware = create<AuthState>()(
  persist(
    (set) => ({
      userId: null as string | null,
      isAuthenticated: false,

      setUserId: (id: string | null) => set({ userId : id }),

      setAuthState: () => set({
        isAuthenticated: true,
        userId: null, // this set to null to kill otp flow
      }),

      logout: () => set({
        isAuthenticated: false,
        userId: null
      })
    }),
    {
      name: 'auth-storage'
    }
  )
)