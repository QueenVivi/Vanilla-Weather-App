// let apiKey = "3e325415f46bc35d8d6a6bc88d7c8554";
// let city = searchInput.value;
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let searchForm = document.querySelector("#search-form");

function showSearchResult() {
  let searchInput = document.querySelector("#search-input");
  let placeName = document.querySelector("h1");
  placeName.innerHTML = searchInput.value;
}

searchForm.addEventListener("submit", showSearchResult);
