function showDateAndTime(currentDateAndTime) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let day = days[currentDateAndTime.getDay()];
  let hours = currentDateAndTime.getHours();
  let minutes = currentDateAndTime.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  let DisplayDateAndTime = `${day} ${time}`;
  return DisplayDateAndTime;
}

function displayWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
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

let dayTime = document.querySelector("#time-date");
dayTime.innerHTML = showDateAndTime(new Date());

let searchForm = document.querySelector("#search-country-form");
searchForm.addEventListener("submit", cityFormSubmit);

let nowWeatherButton = document.querySelector("#now-button");
nowWeatherButton.addEventListener("click", findCurrentLocation);

searchCity(`London`);
