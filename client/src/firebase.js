// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5d30a.firebaseapp.com",
  projectId: "mern-estate-5d30a",
  storageBucket: "mern-estate-5d30a.appspot.com",
  messagingSenderId: "277884305149",
  appId: "1:277884305149:web:5a439ddc78626ebb2c4894"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);