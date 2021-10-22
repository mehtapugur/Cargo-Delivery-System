//önce geldi
console.log("hi mehoo");

let mapDOM = document.getElementById("mapBtn");
mapDOM.addEventListener("click", () => {
  console.log("map a basti");
});

//sonra geldi
setTimeout(function () {
  console.log("2 sn hi mehoo");
}, 2000);

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

let current_user = "";

auth.onAuthStateChanged(function (user) {
  if (user) {
    //firebase.database().ref().child("users").child();
    current_user = user.uid;
    console.log(current_user);

    let dbRef = db
      .ref()
      .child("users/" + current_user)
      .child("locations");
    //console.log(dbRef);

    dbRef.on("value", function (snapshot) {
      snapshot.forEach(function (item) {
        //let key = item.key;

        if (item.val().send === true) {
          //dataSend.setAttribute("checked", "");
        } else {
          //dataSend.setAttribute("check", "");
        }

        let en = item.val().enlem;
        let boy = item.val().boylam;
        console.log("sayim ne");
        let marker = new google.maps.Marker({
          // ncity örnek: lat: 40.76041822993424, lng: 29.934315627096588
          position: { lat: Number(en), lng: Number(boy) },
          map: map,
          //icon: "https://img.icons8.com/nolan/2x/marker.png",
        });
      });
    });
  }
});

function initMap() {
  let options = {
    center: { lat: 40.775, lng: 29.948 },
    zoom: 12,
  };
  console.log("hatam ne");
  // New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  // Marker oluşturulması
  /* let marker = new google.maps.Marker({
    // ncity örnek: lat: 40.76041822993424, lng: 29.934315627096588
    position: { lat: Number(en), lng: Number(boy) },
    map: map,
    //icon: "https://img.icons8.com/nolan/2x/marker.png",
  }); */
}
