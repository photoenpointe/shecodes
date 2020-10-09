
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
}
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temptoday").innerHTML = Math.round(
    response.data.main.temp
  );
}

function handleLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function getLocation(position) {
  let apiKey = "af11ba20356f076c2cd217a6bc9cd25e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showWeather);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", handleLocation);
