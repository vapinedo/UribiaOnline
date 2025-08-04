import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'react-cursos-187dc',
  messagingSenderId: '791208906607',
  storageBucket: 'react-cursos-187dc.appspot.com',
  authDomain: 'react-cursos-187dc.firebaseapp.com',
  apiKey: 'AIzaSyD1SKumwaNQB8RaZUftyyz1l4duS8nPQPU',
  appId: '1:791208906607:web:e642a487ddf1b4b4f1a29a',

  apiKey: 'AIzaSyA5esaL0PlvRgv_jDbYWomwMWKisJIsyo4',
  authDomain: 'portafolioangular-135a6.firebaseapp.com',
  databaseURL: 'https://portafolioangular-135a6.firebaseio.com',
  projectId: 'portafolioangular-135a6',
  storageBucket: 'portafolioangular-135a6.appspot.com',
  messagingSenderId: '553099220584',
  appId: '1:553099220584:web:4a71e5d67769bcf3024ddd',
  measurementId: 'G-1TF14XE18L',
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default { firebaseApp, db, storage };
