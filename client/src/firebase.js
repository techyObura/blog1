// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "manblog-f8b09.firebaseapp.com",
  projectId: "manblog-f8b09",
  storageBucket: "manblog-f8b09.appspot.com",
  messagingSenderId: "386864757256",
  appId: "1:386864757256:web:dfd91bbc4d172cafa72fbd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
