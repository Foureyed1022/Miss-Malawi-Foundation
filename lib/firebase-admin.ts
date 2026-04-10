import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Handle newlines in the private key
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export function initAdmin() {
  if (!admin.apps.length) {
    const { projectId, clientEmail, privateKey } = firebaseAdminConfig;

    if (!projectId || !clientEmail || !privateKey) {
      const missing = [];
      if (!projectId) missing.push('FIREBASE_PROJECT_ID');
      if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
      if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY');

      console.error(`Firebase Admin SDK Error: Missing ${missing.join(', ')} in environment variables.`);
      return null;
    }


    try {
      return admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminConfig),
        databaseURL: `https://${firebaseAdminConfig.projectId}.firebaseio.com` // Optional
      });
    } catch (error) {
      console.error('Firebase Admin initialization error', error);
      return null;
    }
  }
  return admin.app();
}

export const adminAuth = admin.apps.length ? admin.auth() : initAdmin()?.auth();
export const adminDb = admin.apps.length ? admin.firestore() : initAdmin()?.firestore();
