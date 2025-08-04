import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  measurementId: 'G-1TF14XE18L',
  messagingSenderId: '553099220584',
  projectId: 'portafolioangular-135a6',
  apiKey: 'AIzaSyA5esaL0PlvRgv_jDbYWomwMWKisJIsyo4',
  appId: '1:553099220584:web:4a71e5d67769bcf3024ddd',
  storageBucket: 'portafolioangular-135a6.appspot.com',
  authDomain: 'portafolioangular-135a6.firebaseapp.com',
  databaseURL: 'https://portafolioangular-135a6.firebaseio.com',
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default { firebaseApp, db, storage };
