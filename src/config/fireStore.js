// eslint-disable-next-line import/no-unresolved
const firebase = require('firebase');
// eslint-disable-next-line import/no-unresolved
require('firebase/firestore'); // Required for side-effects

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBapOKW9bxbDWN_ZXn_yczJX1iGr_jOkgQ',
  authDomain: 'corp-card-usage-statement.firebaseapp.com',
  databaseURL: 'https://corp-card-usage-statement.firebaseio.com',
  projectId: 'corp-card-usage-statement',
  storageBucket: 'corp-card-usage-statement.appspot.com',
  messagingSenderId: '632919687901',
  appId: '1:632919687901:web:3b7841b33c84848e29d134',
  measurementId: 'G-K4MVDKWK85',
};

// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
const firestore = firebase.default.firestore();

export default firestore;
