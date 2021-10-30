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
//let myLocations = [[]];
//let myLocations[] = [2];
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
        if (item.val().send === true) {
          //dataSend.setAttribute("checked", "");
        }
        let en = Number(item.val().enlem);
        let boy = Number(item.val().boylam);
        //console.log(typeof en);
        /* myLocations[sayi][0] = en;
        myLocations[sayi][1] = boy;
        console.log(sayi, myLocations[sayi][0], myLocations[sayi][1]);
        */
        myLocations[sayi] = new Array(en, boy);
        //myLocations[sayi][0] = en;
        //myLocations[sayi][1] = boy;
        //console.log(sayi, myLocations[sayi][0], myLocations[sayi][1]);
        sayi++;
        //db den alınan konumlara marker yerleştir
        let marker = new google.maps.Marker({
          // ncity örnek: lat: 40.76041822993424, lng: 29.934315627096588
          position: { lat: en, lng: boy },
          map: map,
          //icon: "https://img.icons8.com/nolan/2x/marker.png",
        });
      });

      yazdir(sayi, myLocations);
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
function calcRoute() {
  let request = {
    origin: { lat: 40.77274575422096, lng: 29.9484283486487 },
    destination: { lat: 40.77368824865346, lng: 29.944823459732685 },
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      //get distance and time
      let sonuc1 = result.routes[0].legs[0].distance.text;
      let sonuc2 = result.routes[0].legs[0].duration.text;
      console.log(sonuc1);
      console.log(sonuc2);
      directionsDisplay.setDirections(result);
    } else {
      //directionsDisplay.setDirections({routes: []});
    }
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

function yazdir(num, arr) {
  console.log(num);
  for (let i = 0; i < num; i++) {
    console.log(arr[i][0], arr[i][1]);
  }
  console.log("***************");
  calcRoute();
}

// djfskldf
// sdkjfs
// sdfksldmf
// sdfksldmf
// ctrl k , ctrl c ile oldu
// geri almak için de ctrl k ve ctrl u ile u yani uncomment

//******************************

let cities = [];
let totalCities = 3;
let recordDistance;
let bestEver;

function setup() {
  createCanvas(400, 300);
  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height));
    cities[i] = v;
  }
  let d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
}

function draw() {
  background(0);
  fill(255);
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 4, 4);
  }
  swap(cities, i, j);
  let d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice(); //diziyi kopyalıyor
    console.log(recordDistance);
  }
}

//konumların sırasını karıştırıyor
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

//her bir kombinasyonun uzunluğunu buluyor
function calcDistance(points) {
  let sum = 0;
  for (let i = 0; points.length - 1; i++) {
    let d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}

//permütasyon fonksiyonu
function permute(arr) {
  var permArr = [],
    usedChars = [];
  return (function main() {
    for (var i = 0; i < arr.length; i++) {
      var ch = arr.splice(i, 1)[0];
      usedChars.push(ch);
      if (arr.length == 0) {
        permArr.push(usedChars.slice());
      }
      main();
      arr.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  })();
}
