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
