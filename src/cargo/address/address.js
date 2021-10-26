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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Değişken tanımlamaları
let durum = document.getElementById("durumGit");
let openMapDOM = document.getElementById("openMap");
let current_user = "";

//durum butonuna tıklanınca durum sayfasına gitmesi için event gönderildi
durum.addEventListener("click", () => {
  ipcRenderer.send("key:status");
});

//Harita açılması
openMapDOM.addEventListener("click", () => {
  ipcRenderer.send("key:openMap");
});

//Kullanıcı giriş yaptıktan sonra
auth.onAuthStateChanged(function (user) {
  let enlemDOM = document.getElementById("enlem");
  let boylamDOM = document.getElementById("boylam");
  let saveBtn = document.getElementById("kaydet");

  //Doğrulanmış bir kullanıcı varsa
  if (user) {
    current_user = user.uid;
    //console.log(current_user);

    //kaydet butonuna basılınca
    saveBtn.addEventListener("click", (e) => {
      //inputlar boş değilse
      if (enlemDOM.value !== "" && boylamDOM.value !== "") {
        //alınan bilgiler db ye kaydedildi
        db.ref()
          .child("users/" + current_user)
          .child("locations")
          .push({
            enlem: enlemDOM.value,
            boylam: boylamDOM.value,
            send: false,
          });

        //input değerleri sıfırlandı
        enlemDOM.value = "";
        boylamDOM.value = "";
      }
    });

    //konum bilgilerinin db de kaydedildiği path
    let dbRef = db
      .ref()
      .child("users/" + current_user)
      .child("locations");

    //bu pathte herhangi bir değişiklik olduğunda çalışacak kod
    dbRef.on("value", function (snapshot) {
      let table = document.getElementById("table");
      let tableBody = table.children[1];
      tableBody.innerHTML = "";

      //db deki tüm bilgileri dizi şeklinde alır
      snapshot.forEach(function (item) {
        //html de gösterilecek tablonun ve elemanlarının oluşturulması
        let dataEnlem = document.createElement("td");
        let dataBoylam = document.createElement("td");
        let dataSendTd = document.createElement("td");
        let dataSend = document.createElement("input");
        dataSend.setAttribute("type", "checkbox");
        dataSendTd.append(dataSend);

        if (item.val().send === true) {
          dataSend.setAttribute("checked", "");
        } else {
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

        //verilerin tabloya yazdırılması
        data.append(dataEnlem, dataBoylam, dataSendTd, deleteDataTd);
        tableBody.append(data);

        /* böyle çalışmıyo td eklenmiyor vs
        let enlem = "<td>" + item.val().enlem + "<td>";
        let boylam = `<td> + ${item.val().boylam} + <td>`;
        console.log(enlem);
        console.log(boylam);
        tableBody.append("<tr>" + enlem + boylam + "<tr>"); */
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

/* OTOMATİK TAMAMLAMAYI  DENEDİM OLMADI
//Search

//Autocomplete

let options = {
  types: ["(cities)"],
};

let inputSearch = document.getElementById("searchBtn");
let autocomplete = new google.maps.places.Autocomplete(inputSearch, options);

function initMap() {
  //harita merkezi ve yakınlık ölçüsü
  let options = {
    center: { lat: 40.775, lng: 29.948 },
    zoom: 16,
    mapTypeID: google.maps.MapTypeId.ROADMAP,
  };

  // Map oluşturma
  map = new google.maps.Map();
}

initMap();

*/
