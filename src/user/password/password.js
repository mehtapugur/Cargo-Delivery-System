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

let emailDOM = document.getElementById("email");
let resetBtnDOM = document.getElementById("resetBtn");

function resetPassword() {
  const email = emailDOM.value;
  console.log(email);
  console.log("hiii");

  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("password reset email send succesfully");
    })
    .catch((e) => console.log(e));
}

resetBtnDOM.addEventListener("click", resetPassword());
