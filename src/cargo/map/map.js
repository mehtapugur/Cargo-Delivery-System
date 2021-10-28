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

let sayi = 0;
//let myLocations = [[]];
//let myLocations[] = [2];
let myLocations = new Array();
console.log(myLocations);

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
        let en = Number(item.val().enlem);
        let boy = Number(item.val().boylam);
        console.log(typeof en);
        /* myLocations[sayi][0] = en;
        myLocations[sayi][1] = boy;
        console.log(sayi, myLocations[sayi][0], myLocations[sayi][1]);
        */
        myLocations[sayi] = new Array(2);
        myLocations[sayi][0] = en;
        myLocations[sayi][1] = boy;
        console.log(sayi, myLocations[sayi][0], myLocations[sayi][1]);
        sayi++;
        //db den alınan konumlara marker yerleştir
        let marker = new google.maps.Marker({
          // ncity örnek: lat: 40.76041822993424, lng: 29.934315627096588
          position: { lat: en, lng: boy },
          map: map,
          //icon: "https://img.icons8.com/nolan/2x/marker.png",
        });
      });

      yazdir(sayi);
    });
  }
});

function initMap() {
  //harita merkezi ve yakınlık ölçüsü
  let options = {
    center: { lat: 40.775, lng: 29.948 }, //TODO: centeri otomatik olacak şekilde yap
    zoom: 16,
    mapTypeID: google.maps.MapTypeId.ROADMAP,
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

function yazdir(arg) {
  console.log(arg);
}

// djfskldf
// sdkjfs
// sdfksldmf
// sdfksldmf
// ctrl k , ctrl c ile oldu
// geri almak için de ctrl k ve ctrl u ile u yani uncomment
