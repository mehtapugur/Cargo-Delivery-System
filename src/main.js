const electron = require("electron");
const { ipcRenderer } = require("electron");

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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//const db = firebase.database();

//DOM'daki input ve butonların tanımlanması
let userNameDOM = document.getElementById("userName");
let passwordDOM = document.getElementById("password");
let enterDOM = document.getElementById("enter");
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let changePassword = document.getElementById("changePassword");

//kaydet butonuna tıklandığında
enterDOM.addEventListener("click", () => {
  ipcRenderer.send("key:enter");
});

changePassword.addEventListener("click", () => {
  ipcRenderer.send("key:changePassword");
  console.log("passsssword");
});

//signup butonuna tıklandığında kullanıcı kaydı yapılır
signup.addEventListener("click", () => {
  const promise = auth
    .createUserWithEmailAndPassword(userNameDOM.value, passwordDOM.value)
    .then(() => {
      ipcRenderer.send("key:access"); //kayıt yapılınca anasayfanın değişmesi için event gönderildi
    })
    .catch((e) => console.log(e));
});

login.addEventListener("click", () => {
  const prom = auth
    .signInWithEmailAndPassword(userNameDOM.value, passwordDOM.value)
    .then(() => {
      ipcRenderer.send("key:access"); //giriş yapılınca anasayfanın değişmesi için event gönderildi
    })
    .catch((e) => console.log(e));
});

//export { app, auth, db };
