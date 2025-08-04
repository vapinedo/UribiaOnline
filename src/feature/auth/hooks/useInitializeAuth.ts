import { useEffect } from 'react';
import { useAuthStore } from '@core/stores/useAuthStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@infrastructure/firebase/firebaseConfig';

export function useInitializeAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [setUser, setInitialized]);

  return isInitialized;
}
