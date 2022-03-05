//Display current date

function formatDate(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();

  let currentDate = `${day}, ${month} ${date}, ${hour}:${minute}`;
  return currentDate;
}

formatDate(new Date());

let currentTime = document.querySelector("#date-now");
currentTime.innerHTML = formatDate(new Date());

//Change City Name HTML & Change TºC - Real Data

function changeCity(event) {
  event.preventDefault();

  function showTemp(response) {
    console.log(response.data);
    let tempNow = document.querySelector("#temp-now");
    let temperatureNow = Math.round(response.data.main.temp);
    let weatherDescription = document.querySelector("#description");
    let description = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let feelsLikeElement = document.querySelector("#feels-like");
    tempNow.innerHTML = temperatureNow;
    weatherDescription.innerHTML = description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  }

  let searchInput = document.querySelector("#searchCity");
  let cityName = document.querySelector("#cityInput");

  if (searchInput.value) {
    cityName.innerHTML = `${searchInput.value}`;
    let apiKey = "6f1385822df624244d834e0a055792a2";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);
  } else {
    alert(`Please, search for a city`);
  }
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", changeCity);

//Change Unit

function tempToF(event) {
  event.preventDefault();
  let tempInF = document.querySelector("#temp-now");
  tempInF.innerHTML = 74;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempToF);

function tempToC(event) {
  event.preventDefault();
  let tempInC = document.querySelector("#temp-now");
  tempInC.innerHTML = 23;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", tempToC);

//Current Location - Change Name & TºC (Real data)

function currentLocation(event) {
  event.preventDefault();

  function showTemp(response) {
    let tempNow = document.querySelector("#temp-now");
    let temperatureNow = Math.round(response.data.main.temp);
    let weatherDescription = document.querySelector("#description");
    let description = response.data.weather[0].description;
    let cityName = document.querySelector("#cityInput");
    let cityNow = response.data.name;
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let feelsLikeElement = document.querySelector("#feels-like");
    tempNow.innerHTML = temperatureNow;
    weatherDescription.innerHTML = description;
    cityName.innerHTML = cityNow;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "6f1385822df624244d834e0a055792a2";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}
let gps = document.querySelector("#gps");
gps.addEventListener("click", currentLocation);
