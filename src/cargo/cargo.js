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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let address = document.getElementById("address");
let status = document.getElementById("status");
let logout = document.getElementById("logout");

address.addEventListener("click", () => {
  ipcRenderer.send("key:address");
});

status.addEventListener("click", () => {
  ipcRenderer.send("key:status");
});

//çıkış yapmayınca en son giren kullanıcıda kalmaya devam ediyor
auth.onAuthStateChanged(function (user) {
  if (user) {
    logout.addEventListener("click", () => {
      auth.signOut().then(function () {
        ipcRenderer.send("key:logout");
      });
    });
  }
});
