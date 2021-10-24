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

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let current_user = "";
let adres = document.getElementById("adresGit");

adres.addEventListener("click", () => {
  ipcRenderer.send("key:address");
  console.log("adresegit");
});

auth.onAuthStateChanged(function (user) {
  if (user) {
    current_user = user.uid;
    console.log(current_user);

    let dbRef = db
      .ref()
      .child("users/" + current_user)
      .child("locations");

    dbRef.on("value", function (snapshot) {
      let table = document.getElementById("table");
      let tableBody = table.children[1];
      console.log(table);
      console.log(tableBody);
      tableBody.innerHTML = "";

      snapshot.forEach(function (item) {
        let dataEnlem = document.createElement("td");
        let dataBoylam = document.createElement("td");
        let dataSendTd = document.createElement("td");
        let dataSend = document.createElement("input");
        dataSend.setAttribute("type", "checkbox");
        dataSendTd.append(dataSend);

        if (item.val().send === true) {
          dataSend.setAttribute("checked", "");
        }
        //let key = item.key;

        let deleteDataTd = document.createElement("td");
        let deleteData = document.createElement("button");
        deleteData.setAttribute("id", "deleteBtn");
        deleteData.setAttribute("data-key", item.key);
        deleteData.innerHTML = "sil";
        deleteDataTd.append(deleteData);

        dataEnlem.innerHTML = item.val().enlem;
        dataBoylam.innerHTML = item.val().boylam;
        let data = document.createElement("tr");
        data.append(dataEnlem, dataBoylam, dataSendTd, deleteDataTd);
        tableBody.append(data);
      });
    });

    /*
    document.body.on("click", "#deleteBtn", function () {
      console.log("delete basti");
    }); */
    $("#table tbody").on("click", "#deleteBtn", function () {
      let $key = $(this).data("key");
      dbRef.child($key).remove();
    });
  }
});
