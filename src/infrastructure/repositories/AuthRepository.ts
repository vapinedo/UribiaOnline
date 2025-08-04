import {
  User,
  getAuth,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseApp } from '@infrastructure/firebase/firebaseConfig';

const auth = getAuth(firebaseApp);

const login = async (email: string, password: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

const register = async (email: string, password: string): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
  if (!auth.currentUser) throw new Error('No hay usuario autenticado');
  await updateProfile(auth.currentUser, data);
};

const sendEmailVerificationToUser = async (user: User): Promise<void> => {
  await sendEmailVerification(user);
};

const logout = async (): Promise<void> => {
  await signOut(auth);
};

const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const AuthRepository = {
  login,
  logout,
  register,
  resetPassword,
  getCurrentUser,
  updateUserProfile,
  sendEmailVerification: sendEmailVerificationToUser,
};
