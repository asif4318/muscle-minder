// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoSp7zRhS2gFPIwneM0JxhGd5LgpQAK9M",
  authDomain: "muscle-minder.firebaseapp.com",
  projectId: "muscle-minder",
  storageBucket: "muscle-minder.appspot.com",
  messagingSenderId: "202662413725",
  appId: "1:202662413725:web:2ff739759701fb15fe5b74",
  measurementId: "G-G4J3F6M9XL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
