import { auth } from './firebase';
export { auth };

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getUserProfile } from './firestore';
import { UserProfile } from '@/types';


export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const profile = await getUserProfile(user.uid);
    
    if (profile) {
      // Set session cookie via API
      const idToken = await user.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
    }
    
    return { user, profile, error: null };

  } catch (error: any) {
    let message = 'Invalid Credentials!';
    switch (error.code) {
      case 'auth/invalid-credentials': message = 'Invalid email or password'; break;
      case 'auth/user-not-found': message = 'User not found'; break;
    }
    return { user: null, profile: null, error: message };
  }
}


export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    // Clear session cookie via API
    await fetch('/api/auth/session', { method: 'DELETE' });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const getCurrentUserWithRole = async (): Promise<{ user: User; profile: UserProfile } | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  
  const profile = await getUserProfile(user.uid);
  if (!profile) return null;
  
  return { user, profile };
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};