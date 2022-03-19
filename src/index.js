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
    let tempNow = document.querySelector("#temp-now");
    let temperatureNow = Math.round(response.data.main.temp);
    let weatherDescription = document.querySelector("#description");
    let description = response.data.weather[0].main;
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let feelsLikeElement = document.querySelector("#feels-like");
    let iconElement = document.querySelector("#icon");
    let cityName = document.querySelector("#cityInput");
    let cityNow = response.data.name;

    cityName.innerHTML = cityNow;
    tempNow.innerHTML = temperatureNow;
    weatherDescription.innerHTML = description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    feelsLikeElement.innerHTML = `${Math.round(
      response.data.main.feels_like
    )}ºC`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", description);

    function tempToF(event) {
      event.preventDefault();
      let tempInF = document.querySelector("#temp-now");
      tempInF.innerHTML = Math.round(temperatureNow * 1.8 + 32);
      feelsLikeElement.innerHTML = `${Math.round(
        response.data.main.feels_like * 1.8 + 32
      )}ºF`;
      celsius.classList.remove("active");
      fahrenheit.classList.add("active");
    }

    function tempToC(event) {
      event.preventDefault();
      let tempInC = document.querySelector("#temp-now");
      tempInC.innerHTML = temperatureNow;
      feelsLikeElement.innerHTML = `${Math.round(
        response.data.main.feels_like
      )}ºC`;
      celsius.classList.add("active");
      fahrenheit.classList.remove("active");
    }

    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", tempToF);

    let celsius = document.querySelector("#celsius");
    celsius.addEventListener("click", tempToC);
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

//Current Location - Change Name & TºC (Real data)

function currentLocation(event) {
  event.preventDefault();

  function showTemp(response) {
    let tempNow = document.querySelector("#temp-now");
    let temperatureNow = Math.round(response.data.main.temp);
    let weatherDescription = document.querySelector("#description");
    let description = response.data.weather[0].main;
    let cityName = document.querySelector("#cityInput");
    let cityNow = response.data.name;
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let feelsLikeElement = document.querySelector("#feels-like");
    let iconElement = document.querySelector("#icon");

    tempNow.innerHTML = temperatureNow;
    weatherDescription.innerHTML = description;
    cityName.innerHTML = cityNow;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    feelsLikeElement.innerHTML = `${Math.round(
      response.data.main.feels_like
    )}ºC`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", description);

    function tempToF(event) {
      event.preventDefault();
      let tempInF = document.querySelector("#temp-now");
      tempInF.innerHTML = Math.round(temperatureNow * 1.8 + 32);
      feelsLikeElement.innerHTML = `${Math.round(
        response.data.main.feels_like * 1.8 + 32
      )}ºF`;
      celsius.classList.remove("active");
      fahrenheit.classList.add("active");
    }

    function tempToC(event) {
      event.preventDefault();
      let tempInC = document.querySelector("#temp-now");
      tempInC.innerHTML = temperatureNow;
      feelsLikeElement.innerHTML = `${Math.round(
        response.data.main.feels_like
      )}ºC`;
      celsius.classList.add("active");
      fahrenheit.classList.remove("active");
    }

    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", tempToF);
    let celsius = document.querySelector("#celsius");
    celsius.addEventListener("click", tempToC);
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

//Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row next5days">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col" id="forecast-day">
              <ul>
                <li>${day}</li>

                <li>
                  <img
                    class="emoji"
                    src="src/images/sunny.png"
                    alt=""
                    width="36"
                  />
                </li>
                <li><strong>23ºC</strong></li>
                <li><small>9ºC</small></li>
              </ul>
            </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Show something on load

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showTemp(response) {
  let tempNow = document.querySelector("#temp-now");
  let temperatureNow = Math.round(response.data.main.temp);
  let weatherDescription = document.querySelector("#description");
  let description = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsLikeElement = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");
  let cityName = document.querySelector("#cityInput");
  let cityNow = response.data.name;

  cityName.innerHTML = cityNow;
  tempNow.innerHTML = temperatureNow;
  weatherDescription.innerHTML = description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}ºC`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", description);

  function tempToF(event) {
    event.preventDefault();
    let tempInF = document.querySelector("#temp-now");
    tempInF.innerHTML = Math.round(temperatureNow * 1.8 + 32);
    feelsLikeElement.innerHTML = `${Math.round(
      response.data.main.feels_like * 1.8 + 32
    )}ºF`;
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
  }

  function tempToC(event) {
    event.preventDefault();
    let tempInC = document.querySelector("#temp-now");
    tempInC.innerHTML = temperatureNow;
    feelsLikeElement.innerHTML = `${Math.round(
      response.data.main.feels_like
    )}ºC`;
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
  }

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", tempToF);

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", tempToC);
}

function search(city) {
  let apiKey = "6f1385822df624244d834e0a055792a2";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

search("New York");
displayForecast();
