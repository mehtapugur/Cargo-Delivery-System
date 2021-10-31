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
let myLocations = new Array();
console.log(myLocations);

let directionsService;
let directionsDisplay;

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
      let sayi = 0;
      snapshot.forEach(function (item) {
        //let key = item.key;
        if (item.val().send === false) {
          //dataSend.setAttribute("checked", "");
          console.log(item.val().send);
          let en = Number(item.val().enlem);
          let boy = Number(item.val().boylam);
          myLocations[sayi] = new Array(en, boy);
          sayi++;
          //db den alınan konumlara marker yerleştir
          let marker = new google.maps.Marker({
            // ncity örnek: lat: 40.76041822993424, lng: 29.934315627096588
            position: { lat: en, lng: boy },
            map: map,
          });
        }
      });
      yazdir(sayi, myLocations);
      calcRoute(myLocations);
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

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
}

//mesafeyi bulma
function calcRoute(arr) {
  if (arr.length >= 2) {
    for (let i = 0; i < 2; i++) {
      let request = {
        origin: { lat: arr[i][0], lng: arr[i][1] },
        destination: { lat: arr[i + 1][0], lng: arr[i + 1][1] },
        //travelMode: google.maps.TravelMode.DRIVING,
        travelMode: google.maps.TravelMode.WALKING, //trafiğe göre en kısa yolu vermesin diye yürüyerek yapıldı
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      };

      directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
    }
  }
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

function yazdir(num, arr) {
  console.log(num);
  for (let i = 0; i < num; i++) {
    console.log(arr[i][0], arr[i][1]);
  }
}
