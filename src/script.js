
let today = new Date();
let date = today.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[today.getMonth()];
let year = today.getFullYear();
let hour = today.getHours();
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function formatForecastHour(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let dates = document.querySelector("#date");
dates.innerHTML = `${month} ${date}, ${year}`;
let time = document.querySelector("#time");
time.innerHTML = `${hour}:${minutes}`;


function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getCity(city);
}

let searchInput = document.querySelector("#search-box");
searchInput.addEventListener("submit", handleSearch);

function getCity(city) {
  let apiKey = "af11ba20356f076c2cd217a6bc9cd25e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showForecast);

}

getCity("New York");

function showWeather(response) {
  Celsius = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temptoday").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatForecastHour(forecast.dt * 1000)}
      </h3>
           <img
                src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="WeatherIcon" id="icon"/>
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp)}°C
      </div>
    </div>
  `;
  }
}

function handleLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function getLocation(position) {
  let apiKey = "af11ba20356f076c2cd217a6bc9cd25e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showWeather);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showForecast);

}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temptoday","weather-forecast-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let Fahrenheit = (Celsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(Fahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temptoday"); 
  temperatureElement.innerHTML = Math.round(Celsius);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", handleLocation);

let iconElement = document.querySelector("#icon");

let Celsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
