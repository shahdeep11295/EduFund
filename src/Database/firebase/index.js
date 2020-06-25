import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD5jDlpddfHcyDoWrVq8LaMhOwIouN9epk",
    authDomain: "rnsocialapp-d9039.firebaseapp.com",
    databaseURL: "https://rnsocialapp-d9039.firebaseio.com",
    projectId: "rnsocialapp-d9039",
    storageBucket: "rnsocialapp-d9039.appspot.com",
    messagingSenderId: "712344483718",
    appId: "1:712344483718:web:227dbb74325e088a179e07",
    measurementId: "G-FZJ7DKL31Z"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;