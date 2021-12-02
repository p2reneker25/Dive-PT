var finalData = []
function update()
{
  //API returning object when fetched.
const time = Date.now();
document.getElementById("data").innerHTML = "Loading"
var lat = document.getElementById("lat").value
var lng = document.getElementById("lgn").value
var src = "sg"
var stuffToGet=['windSpeed', 'waveHeight', 'swellHeight'];
document.getElementById("image").src = "images/wait.png"
//Check for blank data or invalid characters
if(/\p{L}/u.test(lng) || /\p{L}/u.test(lat) || lng == "" || lat=="")
{
  document.getElementById("data").innerHTML = "ERROR: Location error. Check lat/lng and try again!"
  document.getElementById("image").src = "images/warn.png"
}

fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${stuffToGet}&source=${src}&`, { //Developed by stormglass.io (API I'm using for sea conditions)
  headers: {
    'Authorization': '2257fbce-4196-11ec-8fdf-0242ac130002-2257fc3c-4196-11ec-8fdf-0242ac130002'
     
  }
}).then((response) => response.json()).then((jsonData) => {
    var data = JSON.stringify(jsonData)
    filter(data)

});

}

function filter(data)
{
  var data2 = data.split(",")
  var counter = 2
  while(counter<5)
  {
  console.log(data2[counter].toString().split(":").pop().replace("}", "").replace("}", ""));
  finalData.push(data2[counter].toString().split(":").pop().replace("}", "").replace("}", "")); // cleanup array for only ints and place them in new array
  counter++
  
  }
  decision(finalData[0], finalData[1], finalData[2])//call prediction function with data
}

function decision(waveHeight, windSpeed, swellHeight)
{
  var thresholds = [1.3,4,1.3]

  if(waveHeight<thresholds[0] && windSpeed<thresholds[1] && swellHeight<thresholds[2])
  {
    document.getElementById("image").src = "images/go.png"
  }
  else{
    document.getElementById("image").src = "images/stop.png"
  }
  //output values to text
  document.getElementById("data").innerHTML = "Wave Height: "+waveHeight+"m, Wind Speed: " +windSpeed+"m/s, Swell Height: "  + swellHeight+"m"
}
function date()
{
    var date = Date.now()
    alert(date)
}
