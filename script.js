
function update()
{
  //API returning object when fetched.
const time = Date.now();
var lat = document.getElementById("lat").value
var lng = document.getElementById("lgn").value
var src = "sg"
var stuffToGet=['swellHeight', 'waveHeight', 'windSpeed'];


fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${stuffToGet}&source=${src}&`, {
  headers: {
    'Authorization': '2257fbce-4196-11ec-8fdf-0242ac130002-2257fc3c-4196-11ec-8fdf-0242ac130002'
     
  }
}).then((response) => response.json()).then((jsonData) => {
    var data = JSON.stringify(jsonData)
    console.log(data)

});

}

function filter()
{
  var data = update()
  var data2 = data.split(",")
  var counter = 2
  while(counter<5)
  {
  console.log(data2 [counter]);
  counter++
  }
}

function dive(swellHeight, waveHeight, windSpeed)
{
  var thresholds = [5,5,15]
  var counter=0
  while(counter<2)
  {
    counter++    
  }

}
