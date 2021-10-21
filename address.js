import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

const electron = require("electron");
const { ipcRenderer } = require("electron");

let openMapDOM = document.getElementById("openMap");

openMapDOM.addEventListener("click", () => {
  ipcRenderer.send("key:openMap");
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALVsn7nR8-UKOHO9r7ZedcIouYfW8cceE",
  authDomain: "cargo-27f95.firebaseapp.com",
  projectId: "cargo-27f95",
  storageBucket: "cargo-27f95.appspot.com",
  messagingSenderId: "402656272095",
  appId: "1:402656272095:web:a8e050e3c4d871cbe3136a",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

console.log("nem");

let current_user = "";

firebase.auth().onAuthStateChanged(function (user) {
  let konumDom = document.getElementById("konum");

  if (user) {
    //firebase.database().ref().child("users").child();
    current_user = user.uid;
    console.log(current_user);
    console.log("ne");
  }
});
