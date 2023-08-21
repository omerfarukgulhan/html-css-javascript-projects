const userInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];

eventListener();

function eventListener() {
  userInput.addEventListener("keyup", displayMatches);
  document.addEventListener("DOMContentLoaded", response(endpoint, cities));
}

function findMatches(userKeyWord, cities) {
  return cities.filter((area) => {
    const regex = new RegExp(userKeyWord, "gi");
    return area.city.match(regex) || area.state.match(regex);
  });
}

function displayMatches(e) {
  const matchArray = findMatches(e.target.value, cities);
  const uiOnMatch = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(regex, `<span class="hl">${e.target.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${e.target.value}</span>`);
      return `
                    <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                    </li>`;
    })
    .join("");
  suggestions.innerHTML = uiOnMatch;
}

function response(endpoint, cities) {
  fetch(endpoint)
    .then((data) => data.json())
    .then((data) => cities.push(...data));
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
