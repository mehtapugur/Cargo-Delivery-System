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

let current_user = "";

auth.onAuthStateChanged(function (user) {
  if (user) {
    current_user = user.uid;
    console.log(current_user);

    let dbRef = db
      .ref()
      .child("users/" + current_user)
      .child("locations");

    dbRef.on("value", function (snapshot) {
      initMap(); //haritayı başlat

      snapshot.forEach(function (item) {
        //let key = item.key;
        if (item.val().send === true) {
          //dataSend.setAttribute("checked", "");
        }

        let en = item.val().enlem;
        let boy = item.val().boylam;

        //db den alınan konumlara marker yerleştir
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
  //harita merkezi ve yakınlık ölçüsü
  let options = {
    center: { lat: 40.775, lng: 29.948 },
    zoom: 16,
  };

  // Map oluşturma
  map = new google.maps.Map(document.getElementById("map"), options);

  //haritada tıklanan yere marker yerleştirme
  google.maps.event.addListener(map, "click", (event) => {
    addMarker({ location: event.latLng });
  });
}

//tıklanan yere marker ekleyip konumu db ye gönderme
function addMarker(property) {
  const marker = new google.maps.Marker({
    position: property.location,
    map: map,
  });

  //console.log(JSON.stringify(property.location.toJSON().lat));
  let en = JSON.stringify(property.location.toJSON().lat);
  let boy = JSON.stringify(property.location.toJSON().lng);

  db.ref()
    .child("users/" + current_user)
    .child("locations")
    .push({
      enlem: en,
      boylam: boy,
      send: false,
    });
}
