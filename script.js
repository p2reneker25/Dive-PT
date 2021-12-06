var finalData = []

function update() {
	//API returning object when fetched.
	const time = Date.now();
	document.getElementById("data").innerHTML = "Loading"
	var lat = document.getElementById("lat").value
	var long = document.getElementById("lgn").value
	var wind = document.getElementById("wind").value
	var wave = document.getElementById("wave").value
	var swell = document.getElementById("swell").value

	//tests for invalid characters
	if (/\p{L}/u.test(long) || /\p{L}/u.test(lat) || /\p{L}/u.test(wind) || /\p{L}/u.test(wave) || /\p{L}/u.test(swell)) {
		document.getElementById("data").innerHTML = "ERROR: Location error. Check lat/lng and try again!"
		document.getElementById("image").src = "images/warn.png"
		return
	}
	if (long != "" || lat != "") {
		if (wind != "" || wave != "" || swell != "") //both are full
		{
			document.getElementById("data").innerHTML = "ERROR: Location error. Check boxes and try again!"
			document.getElementById("image").src = "images/warn.png"
			return
		}

		
		getData(lat, long)
		return
	} else {
		if (wind == "" || wave == "" || swell == "") //both are empty
		{
			document.getElementById("data").innerHTML = "ERROR: Location error. Check boxes and try again!"
			document.getElementById("image").src = "images/warn.png"
			return
		}
		
		decision(wave, wind, swell, "user")
	}
}

function getData(lt, lg) {
	var src = "sg"
	var stuffToGet = ['windSpeed', 'waveHeight', 'swellHeight'];
	document.getElementById("image").src = "images/wait.png"
	fetch(`https://api.stormglass.io/v2/weather/point?lat=${lt}&lng=${lg}&params=${stuffToGet}&source=${src}&`, { //Developed by stormglass.io (API I'm using for sea conditions)
		headers: {
			'Authorization': '2257fbce-4196-11ec-8fdf-0242ac130002-2257fc3c-4196-11ec-8fdf-0242ac130002'

		}
	}).then((response) => response.json()).then((jsonData) => {
		var data = JSON.stringify(jsonData)
		filter(data)

	});
}



function filter(data) {
	var data2 = data.split(",")
	var counter = 2
	while (counter < 5) {
		console.log(data2[counter].toString().split(":").pop().replace("}", "").replace("}", ""));
		finalData.push(data2[counter].toString().split(":").pop().replace("}", "").replace("}", "")); // cleanup array for only ints and place them in new array
		counter++

	}
	decision(finalData[0], finalData[1], finalData[2], "api") //call prediction function with data
}

function decision(waveHeight, windSpeed, swellHeight, source) {
	var thresholds = [1.3, 4, 1.3]
	if (waveHeight < thresholds[0] && windSpeed < thresholds[1] && swellHeight < thresholds[2]) {
		document.getElementById("image").src = "images/go.png"
	} else {
		document.getElementById("image").src = "images/stop.png"
	}
  if(source == "api"){
    document.getElementById("data").innerHTML = "Wave Height: " + waveHeight + "m, Wind Speed: " + windSpeed + "m/s, Swell Height: " + swellHeight + "m"
  } else{
    document.getElementById("data").innerHTML =  ""
  }
	
}

function date() {
	var date = Date.now()
	alert(date)
}