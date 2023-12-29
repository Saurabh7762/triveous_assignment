import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBF1pcq7xmdwBvJ0G-PlSIFcFVufc4iw3c",
  authDomain: "newsapp-1009c.firebaseapp.com",
  databaseURL: "https://newsapp-1009c-default-rtdb.firebaseio.com",
  projectId: "newsapp-1009c",
  storageBucket: "newsapp-1009c.appspot.com",
  messagingSenderId: "125202442113",
  appId: "1:125202442113:web:60e51eb54d29e6323d2a80",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  doc,
  setDoc,
};
