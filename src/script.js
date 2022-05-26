function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 7 || hours > 20) {
    let background = document.querySelector("#background");
    background.classList.add("dark-mode");
    nowWeatherButton.classList.add("now-button-dark-mode");
  }

  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = document.querySelector("#future-forecast");
  let forecastHTML = `<div class="row">
            <div class="d-flex justify-content-center">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `      <div class="col-2 day-forecast">
              <p>
              <div id="forecast-date">${day}</div>
              <div class="day-forecast-emoji" id="forecast-icon">⛅</div>
              <span id="forecast-min">6°</span>/<span id="forecast-max">16°</span>
              </p>
          </div>`;
  });
  forecastHTML =
    forecastHTML +
    `</div>
            </div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `5c32603554bdbae2e57c8722d88e7625`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#time-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  centigrade = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML = Math.round(centigrade);

  feelsLikeCentigrade = response.data.main.feels_like;
  document.querySelector("#feels-like").innerHTML =
    Math.round(feelsLikeCentigrade);
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `5c32603554bdbae2e57c8722d88e7625`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function cityFormSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#country-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = `5c32603554bdbae2e57c8722d88e7625`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function findCentigrade(event) {
  event.preventDefault();
  centigradeLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = Math.round(centigrade);
  document.querySelector("#feels-like").innerHTML =
    Math.round(feelsLikeCentigrade);
}
function findFahrenheit(event) {
  event.preventDefault();
  centigradeLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheit = Math.round((centigrade * 9) / 5 + 32);
  let feelsLikeFahrenheit = Math.round((feelsLikeCentigrade * 9) / 5 + 32);
  document.querySelector("#current-temp").innerHTML = fahrenheit;
  document.querySelector("#feels-like").innerHTML = feelsLikeFahrenheit;
}

let searchForm = document.querySelector("#search-country-form");
searchForm.addEventListener("submit", cityFormSubmit);

let nowWeatherButton = document.querySelector("#now-button");
nowWeatherButton.addEventListener("click", findCurrentLocation);

let feelsLikeCentigrade = null;
let centigrade = null;
let centigradeLink = document.querySelector("#centigrade");
let fahrenheitLink = document.querySelector("#fahrenheit");
centigradeLink.addEventListener("click", findCentigrade);
fahrenheitLink.addEventListener("click", findFahrenheit);

searchCity(`London`);
