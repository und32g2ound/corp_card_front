import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDiPaKutiy1s8198qO6Jd2pUTUeRY5fQnI',
  authDomain: 'openonbject.firebaseapp.com',
  databaseURL: 'https://openonbject.firebaseio.com',
  projectId: 'openonbject',
  storageBucket: 'openonbject.appspot.com',
  messagingSenderId: '558300107270',
  appId: '1:558300107270:web:2c7f6e249c902cd799a987',
};

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const authService = {
  firebase,
  user: null,

  authenticated() {
    if (this.user == null) {
      return false;
    }
    return !this.user.isAnonymous;
  },

  setUser(user) {
    this.user = user;
  },

  login(email, password) {
    return new Promise((resolve) => {
      this.firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err);
        });
    });
  },

  logout() {
    return new Promise((resolve) => {
      this.firebase.auth().signOut()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err);
        });
    });
  },

  setStateCallback(callback) {
    return authService.firebase.auth().onAuthStateChanged(callback);
  },
};

export default authService;
