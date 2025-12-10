// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWd6hTagZEi0ahkR4eHSlu50AkSHnwGhI",
  authDomain: "chat--firebase-3f84a.firebaseapp.com",
  projectId: "chat--firebase-3f84a",
  storageBucket: "chat--firebase-3f84a.firebasestorage.app",
  messagingSenderId: "767060361383",
  appId: "1:767060361383:web:d675050ecfb72cdb8f1b82"
};

// Initialize Firebase

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };

