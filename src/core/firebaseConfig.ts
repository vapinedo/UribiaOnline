import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDDqs1hraVJRP3pkY5UAzYVtyCXCqNhYI4',
  authDomain: 'ng-arriendos-uribia.firebaseapp.com',
  databaseURL: 'https://ng-arriendos-uribia-default-rtdb.firebaseio.com',
  projectId: 'ng-arriendos-uribia',
  storageBucket: 'ng-arriendos-uribia.appspot.com',
  messagingSenderId: '689295074494',
  appId: '1:689295074494:web:e0d72794a1862072f72aef',
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default { firebaseApp, db, storage };
