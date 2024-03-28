import { useState } from 'react';
import './App.css'
import Header from './Header';
import Content from './Content';
import Login from './login';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function App() {
  // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  return (
    
    <div>
      <Header />
      <Content />
      <Login />
    </div>
  )
}

export default App
