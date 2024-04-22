import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Login from "./login";
import { auth } from "./firebase_config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  let user = auth.currentUser;
  return (
    <div>
      <Header />
      {user === null ? <Login /> : <p>Signed In</p>}
    </div>
  );
}

export default App;
