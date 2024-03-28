import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Login from "./Login";
import { auth } from "./firebase_config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  let user = auth.currentUser;
  return (
    <div>
      <Header />
      {user ? <Login /> : <p>Signed In</p>}
    </div>
  );
}

export default App;
