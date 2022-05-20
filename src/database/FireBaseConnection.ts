import admin from 'firebase-admin';
import serviceAccount from './keys/blazeKey.json'
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
})
const db = admin.firestore();
export const usersRef = db.collection('robots');
