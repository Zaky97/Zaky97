import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiA-CPBjHgdNMSkECYJ3D55S-OJWeRpNM",
  authDomain: "noir-b0cf8.firebaseapp.com",
  databaseURL:
    "https://noir-b0cf8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "noir-b0cf8",
  storageBucket: "noir-b0cf8.appspot.com",
  messagingSenderId: "265741421264",
  appId: "1:265741421264:web:5d6af087a996b58a9cecd5",
  measurementId: "G-CDZKCSXS56",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Initialize Firebase Auth

export {
  app,
  database,
  auth,
  ref,
  push,
  onValue,
  remove,
  update,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
};
