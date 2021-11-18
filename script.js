var finalData = []
function update()
{
  //API returning object when fetched.
const time = Date.now();
var lat = document.getElementById("lat").value
var lng = document.getElementById("lgn").value
var src = "sg"
var stuffToGet=['windSpeed', 'waveHeight', 'swellHeight'];
document.getElementById("image").src = "images/wait.png"

fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${stuffToGet}&source=${src}&`, {
  headers: {
    'Authorization': '2257fbce-4196-11ec-8fdf-0242ac130002-2257fc3c-4196-11ec-8fdf-0242ac130002'
     
  }
}).then((response) => response.json()).then((jsonData) => {
    var data = JSON.stringify(jsonData)
    //console.log(data)
    //console.log(data)
    filter(data)

});

}

function filter(data)
{
  //alert(data)
  var data2 = data.split(",")
  var counter = 2
  while(counter<5)
  {
 // console.log(data2[counter].toString().split(":").pop().replace("}", "").replace("}", ""));
  finalData.push(data2[counter].toString().split(":").pop().replace("}", "").replace("}", "")); // cleanup array for only ints and place them in new array
  counter++
  
  }
  //alert(finalData)
  decision(finalData[0], finalData[1], finalData[2])//call prediction function with data
}

function decision(waveHeight, windSpeed, swellHeight)
{
  var thresholds = [1.3,4,1.3]
  //alert(swellHeight)
  //alert(waveHeight)
  //alert(windSpeed)
  if(waveHeight<thresholds[0] && windSpeed<thresholds[1] && swellHeight<thresholds[2])
  {
    //alert("Good to dive")
    document.getElementById("image").src = "images/go.png"
  }
  else{
    //alert("No sir!")
    document.getElementById("image").src = "images/stop.png"
  }
  //output values to text
  document.getElementById("data").innerHTML = "Wave Height: "+waveHeight+"m, Wind Speed: " +windSpeed+"m/s, Swell Height: "  + swellHeight+"m"
}

//wave wind swell