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



/* ///////////////////////// BULDUĞUM COMBİNASYON ÇÖZÜMÜ
<script>

// Javascript program to print all
// combination of size r in an array of size n
	
	/* arr[] ---> Input Array
	data[] ---> Temporary array to
	store current combination
	start & end ---> Staring and
	Ending indexes in arr[]
	index ---> Current index in data[]
	r ---> Size of a combination to be printed */
	function combinationUtil(arr,n,r,index,data,i)
	{
		// Current combination is ready
		// to be printed, print it
		if (index == r)
		{
			for (let j=0; j<r; j++)
			{
				document.write(data[j]+" ");
			}
			document.write("<br>");
		
			return;
		}
		
		// When no more elements are there
		// to put in data[]
		if (i >= n)
		{
			return;
		}
		
		// current is included, put
		// next at next location
		data[index] = arr[i];
		combinationUtil(arr, n, r, index+1, data, i+1);

		// current is excluded, replace
		// it with next (Note that
		// i+1 is passed, but index is not changed)
		combinationUtil(arr, n, r, index, data, i+1);
		
	}
	
	// The main function that prints
	// all combinations of size r
	// in arr[] of size n. This function
	// mainly uses combinationUtil()
	function printCombination(arr,n,r)
	{
		// A temporary array to store
		// all combination one by one
		let data=new Array(r);
		
		// Print all combination using
		// temporary array 'data[]'
		combinationUtil(arr, n, r, 0, data, 0);
	}
	
	/*Driver function to check for above function*/
	let arr=[1, 2, 3, 4, 5];
	let r = 3;
	let n = arr.length;
	printCombination(arr, n, r);
	
	// This code is contributed by avanitrachhadiya2155
	
</script>

*/


///////////////////////// permütasyon bu da
	
  function permute(input) {
  //var permArr = [],
    let usedChars = [];
    main();
  	function main() {
    for (var i = 0; i < input.length; i++) {
      var ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length == 0) {
        //permArr.push(usedChars.slice());
       console.log(usedChars);
      }
       
      main();
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    
  }
  //return 0;
}
//document.write(JSON.stringify(permute(["A", "B", "C"])));
permute(["A", "B", "C", "D", "E"]);
