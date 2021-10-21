const electron = require("electron");
const { ipcRenderer } = require("electron");
//const functions = require("firebase-functions");
//const admin = require("firebase-admin");

// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALVsn7nR8-UKOHO9r7ZedcIouYfW8cceE",
  authDomain: "cargo-27f95.firebaseapp.com",
  databaseURL: "https://cargo-27f95-default-rtdb.firebaseio.com",
  projectId: "cargo-27f95",
  storageBucket: "cargo-27f95.appspot.com",
  messagingSenderId: "402656272095",
  appId: "1:402656272095:web:a8e050e3c4d871cbe3136a",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
//admin.initializeApp();
const auth = firebase.auth();
//const db = firebase.database();

let userNameDOM = document.getElementById("userName");
let passwordDOM = document.getElementById("password");
let enterDOM = document.getElementById("enter");
enterDOM.addEventListener("click", () => {
  ipcRenderer.send("key:enter");
});

let signup = document.getElementById("signup");
signup.addEventListener("click", () => {
  console.log("heyomeho<3");
  /* firebase.auth().createUserWithEmailAndPassword(userNameDOM.value, passwordDOM.value).then(() => console.log("oldu be")).catch(function(e){
        console.log(e);
      })*/
  const promise = auth
    .createUserWithEmailAndPassword(userNameDOM.value, passwordDOM.value)
    .then(() => {
      ipcRenderer.send("key:access");
      console.log("sign e geldi");
    })
    .catch((e) => console.log(e));
});

let login = document.getElementById("login");
login.addEventListener("click", () => {
  console.log("logmeho<3");
  /* firebase.auth().createUserWithEmailAndPassword(userNameDOM.value, passwordDOM.value).then(() => console.log("oldu be")).catch(function(e){
        console.log(e);
      })*/
  const prom = auth
    .signInWithEmailAndPassword(userNameDOM.value, passwordDOM.value)
    .then(() => {
      ipcRenderer.send("key:access");
      console.log("login e geldi");
    })
    .catch((e) => console.log(e));
});

//export { app, auth, db };
