let searchForm = document.querySelector("#search-form");

function formatDate(timestamp, timezone) {
  let time = new Date(timestamp + timezone);
  let hours = time.getUTCHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = time.getUTCDay();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[day];

  return `Last updated at ${weekDay}, ${hours}:${minutes}.`;
}

function showWeatherCondition(response) {
  let temperatureFigure = document.querySelector("#temp");
  temperatureFigure.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  let weatherDesc = response.data.weather[0].description;
  let capitalized = weatherDesc[0].toUpperCase() + weatherDesc.slice(1);
  descriptionElement.innerHTML = capitalized;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let localTime = document.querySelector("#local-time");
  localTime.innerHTML = formatDate(
    response.data.dt * 1000,
    response.data.timezone * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );

  getForecast(response.data.coord);
}

function getForecast(coords) {
  let lat = coords.lat;
  let lon = coords.lon;
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
    <img
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    width="40px"
    />
    <div class="forecast-temp">
    <p>
    <span class="forecase-temp-max"> ${Math.round(
      forecastDay.temp.max
    )}° </span>
    <span class="forecast-temp-min"> ${Math.round(forecastDay.temp.min)}°</span>
    </p>
    </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showSearchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let placeName = document.querySelector("h1");
  placeName.innerHTML = searchInput.value;
  let apiKey = "3e325415f46bc35d8d6a6bc88d7c8554";
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

searchForm.addEventListener("submit", showSearchResult);
