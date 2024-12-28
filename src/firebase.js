// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsia4BCcGk-3R0z7LWcP5fafUwIN2bLk0",
  authDomain: "node-authentication101.firebaseapp.com",
  projectId: "node-authentication101",
  storageBucket: "node-authentication101.firebasestorage.app",
  messagingSenderId: "1068526786216",
  appId: "1:1068526786216:web:169d471468e1b41559949d",
  measurementId: "G-NMH849TCRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export the necessary instances
export { app, auth, analytics };
