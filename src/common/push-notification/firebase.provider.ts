import { envs } from '@/config';
import * as admin from 'firebase-admin';

export const FirebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: envs.firebaseProjectId,
          clientEmail: envs.firebaseClientEmail,
          privateKey: envs.firebasePrivateKey.replace(/\\n/g, '\n'),
        }),
      });
    }

    return admin;
  },
};
