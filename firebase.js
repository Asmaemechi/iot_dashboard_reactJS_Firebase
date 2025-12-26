// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnEL3t2qOg-omGfrhJ2uMWi6V_0MwUDCo",
  authDomain: "iot-dashboard-d6f92.firebaseapp.com",
  projectId: "iot-dashboard-d6f92",
  storageBucket: "iot-dashboard-d6f92.firebasestorage.app",
  messagingSenderId: "775509159796",
  appId: "1:775509159796:web:330c9c17315c787fe08621",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnEL3t2qOg-omGfrhJ2uMWi6V_0MwUDCo",
  authDomain: "iot-dashboard-d6f92.firebaseapp.com",
  projectId: "iot-dashboard-d6f92",
  storageBucket: "iot-dashboard-d6f92.firebasestorage.app",
  messagingSenderId: "775509159796",
  appId: "1:775509159796:web:330c9c17315c787fe08621",
  measurementId: "G-R6P1L5B7E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */