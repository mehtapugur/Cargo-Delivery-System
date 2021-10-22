//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
//import { app, auth, db } from "";
const electron = require("electron");
const { ipcRenderer } = require("electron");

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
const db = firebase.database();

let openMapDOM = document.getElementById("openMap");

openMapDOM.addEventListener("click", () => {
  ipcRenderer.send("key:openMap");
});

console.log("nem");

let current_user = "";

auth.onAuthStateChanged(function (user) {
  let enlemDOM = document.getElementById("enlem");
  let boylamDOM = document.getElementById("boylam");
  let saveBtn = document.getElementById("kaydet");

  if (user) {
    //firebase.database().ref().child("users").child();
    current_user = user.uid;
    console.log(current_user);
    console.log("ne");

    saveBtn.addEventListener("click", (e) => {
      db.ref()
        .child("users/" + current_user)
        .child("locations")
        .push({
          enlem: enlemDOM.value,
          boylam: boylamDOM.value,
        });
      console.log("ay");
      enlemDOM.value = "";
      boylamDOM.value = "";
    });
  }
});
