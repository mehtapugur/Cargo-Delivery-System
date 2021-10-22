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
      if (enlemDOM.value !== "" && boylamDOM.value !== "") {
        db.ref()
          .child("users/" + current_user)
          .child("locations")
          .push({
            enlem: enlemDOM.value,
            boylam: boylamDOM.value,
            send: false,
          });
        console.log("ay");
        enlemDOM.value = "";
        boylamDOM.value = "";
      }
    });

    let dbRef = db
      .ref()
      .child("users/" + current_user)
      .child("locations");
    //console.log(dbRef);

    dbRef.on("value", function (snapshot) {
      let table = document.getElementById("table");
      let tableBody = table.children[1];
      console.log(table);
      console.log(tableBody);
      tableBody.innerHTML = "";

      snapshot.forEach(function (item) {
        /* let dataEnlem = document.createElement("td");
        let dataBoylam = document.createElement("td");
        dataEnlem.innerHTML = "enlemim";
        dataBoylam.innerHTML = "boylamım";
        let data = document.createElement("tr");
        data.append(dataEnlem, dataBoylam);
        tableBody.append(data); */

        let dataEnlem = document.createElement("td");
        let dataBoylam = document.createElement("td");
        let dataSendTd = document.createElement("td");
        let dataSend = document.createElement("input");
        dataSend.setAttribute("type", "checkbox");
        dataSendTd.append(dataSend);

        //let key = item.key;

        let deleteDataTd = document.createElement("td");
        let deleteData = document.createElement("button");
        deleteData.setAttribute("id", "deleteBtn");
        deleteData.setAttribute("data-key", item.key);
        deleteData.innerHTML = "sil";
        deleteDataTd.append(deleteData);

        if (item.val().send === true) {
          dataSend.setAttribute("checked", "");
        } else {
          //dataSend.setAttribute("check", "");
        }

        dataEnlem.innerHTML = item.val().enlem;
        dataBoylam.innerHTML = item.val().boylam;
        let data = document.createElement("tr");
        data.append(dataEnlem, dataBoylam, dataSendTd, deleteDataTd);
        tableBody.append(data);

        //calistiiiiiiiiiiii
        //console.log(item.val().enlem);

        /* böyle çalışmıyo td eklenmiyor vs
        let enlem = "<td>" + item.val().enlem + "<td>";
        let boylam = `<td> + ${item.val().boylam} + <td>`;
        console.log(enlem);
        console.log(boylam);
        tableBody.append("<tr>" + enlem + boylam + "<tr>"); */
      });
      console.log(table);
    });

    /*
    document.body.on("click", "#deleteBtn", function () {
      console.log("delete basti");
    }); */
    $("#table tbody").on("click", "#deleteBtn", function () {
      console.log("delete e basti");

      let $key = $(this).data("key");
      console.log($key);
      dbRef.child($key).remove();
    });
  }
});
