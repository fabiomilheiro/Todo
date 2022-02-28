import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO0Gre3EQpinMVsCwqmu7IZczRzq7KWGk",
  authDomain: "todo-27cb8.firebaseapp.com",
  projectId: "todo-27cb8",
  storageBucket: "todo-27cb8.appspot.com",
  messagingSenderId: "716121129983",
  appId: "1:716121129983:web:e807a59b3850ab9c90ddca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app", app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
