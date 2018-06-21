var weatherButton = document.getElementById('weatherButton');
var zipCode = document.getElementById('zipCode');

var enterWeather = document.getElementById('weatherButton');

// Execute a function when the user releases a key on the keyboard
weatherButton.addEventListener("keyup", function(getWeather) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("weatherButton").click();
  }
});


// Output variables
var output = document.getElementById('output');
var cityOutput = document.getElementById('cityOutput');
var tempK = document.getElementById('temperatureOutputK');
var tempF = document.getElementById('temperatureOutputF');
var tempC = document.getElementById('temperatureOutputC');
var condition = document.getElementById('condition');
var weatherImage = document.getElementById('weatherImage');

// Error variables
var error = document.getElementById('error');
var errorMessage = document.getElementById('errorMessage');

// api variables
// uniniated variable for api request
var apiRequest;
// variable for my openweatherMap API access
var appId = "4363e3e1747e40f10b2355eee16763f6";

// Waits for page to load before firing
document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		// Initialize your application or run some code.
		weatherButton.onclick = getWeather;
		// if(weatherButton.onclick || input.keyCode === 13){
		// 	getWeather();
		}
};

var myWindow = document.getElementById('myContainer');
var resizeButton = document.getElementById('resizeButton');

resizeButton.onclick = resizeWin;

function resizeWin() {
	myWindow.resizeTo(500, 800);
	myWindow.focus();
}

// function for retrieving information from api
function getWeather() {
	// Set up url for fetching weather data.
	var url= "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=<appId>";
	// console.log("This is working.");
	// zipcode from input is assigned to api url
	url = url.replace("<zipCode>", zipCode.value);
	// my api id replaces variable in api url
	url = url.replace("<appId>", appId);

	// Code that fetches data from the API URL and stores it in results.
	// creates a new instance of apiRequest
	apiRequest = new XMLHttpRequest();
	apiRequest.onload = catchResponse;
	apiRequest.onerror = httpRequestOnError;
	apiRequest.open('get', url, true);
	apiRequest.send();
}

// sets up error response
function httpRequestOnError() {
	output.style.display = 'none';
	errorMessage.innerHTML = 'There was a problem reaching the weather API. Try again later.'
	error.style.display = 'block';
}

function catchResponse() {
// if status of api is not an error,
// function prepares output to appear on html page
	if (apiRequest.statusText === "OK") {

		var response = JSON.parse(apiRequest.responseText);
		console.log(response);


		error.style.display = 'none';
		cityOutput.innerHTML = response.name;
		tempK.innerHTML = Math.round(response.main.temp) + ' K';
		tempF.innerHTML = convertKtoF(response.main.temp) + '&deg; F';
		tempC.innerHTML = convertKtoC(response.main.temp) + '&deg; C';
		condition.innerHTML = response.weather[0].description;
		displayImage(response.weather[0].description, convertKtoF(response.main.temp));
		output.style.display = 'block';
	}
	else {
		error.style.display = 'block';
		errorMessage.innerHTML = apiRequest.statusText;
    document.getElementById("cityOutput").reset();
    document.getElementById("temperatureOutputK").reset();
    document.getElementById("temperatureOutputF").reset();
    document.getElementById("temperatureOutputC").reset();
    document.getElementById("condition").reset();
	}

}

// funtions to calculate temperature conversions
function convertKtoF(kelvin) {
	var fahr = kelvin * (9/5) - 459.67;
	return Math.round(fahr);
}

function convertKtoC(kelvin) {
	var cel = kelvin - 273.15;
	return Math.round(cel);
}

function displayImage(condition,tempF) {
	// tries to match to either condition first
	if(condition.includes('rain')){
		weatherImage.src = "images/rain.jpg";
		}
	else if (condition.includes('thunderstorm')){
		weatherImage.src = "images/thunderstorm.jpg";
	}
	else if (condition.includes('overcast', 'cloudy')){
		weatherImage.src = "images/cloudy.jpeg";
	}
	else if (condition.includes('snow')){
		weatherImage.src = "images/snow-car.jpeg";
		}
 // if neither condition above matches,
 // image will be determined by temperature
	else if (tempF > 85 && !condition.includes('rain')) {
		weatherImage.src = "images/hot-sun.jpg";
		}
	else if ((tempF > 65 && tempF < 85 || condition.includes('clear sky')) && !condition.includes('rain')) {
		weatherImage.src = "images/perfectweather.jpg";
		}
	else if (tempF < 32 || !condition.includes('snow')) {
		weatherImage.src = "images/freezing-cold.jpeg";
	// else if (errorMessage)
} else {
		weatherImage.src = "images/sheep-animated-gif.gif";
		// weatherImage.src="http://bestanimations.com/Animals/Mammals/sheep-animated-gif.gif";
	}
}
