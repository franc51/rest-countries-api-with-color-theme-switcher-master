let country_name = localStorage.getItem("country");
let theme_toggle = document.getElementById("toggle_btn");
let isLightMode = true;
let body = document.body;

console.log(country_name);

function getCountryByName(input_name) {
  fetch(`https://restcountries.com/v3.1/name/${input_name}`)
    .then((response) => response.json())
    .then((data) => {
      country = data[0];
      displayCountry(country);
    });
}
getCountryByName(country_name);
function displayCountry(country) {
  const name = document.getElementById("name");
  const native_name = document.getElementById("native_name");
  const population = document.getElementById("population");
  const region = document.getElementById("region");
  const subregion = document.getElementById("subregion");
  const capital = document.getElementById("capital");
  const top_level_domains = document.getElementById("top_level_domains");
  const currencies = document.getElementById("currencies");
  const languages = document.getElementById("languages");
  const country_border = document.getElementById("country_border");
  const country_flag = document.getElementById("country_flag");
  console.log(country);
  if (country.borders) {
    country_border.innerHTML = country.borders;
  }
  country_flag.src = country.flags.png;
  name.innerHTML = country.name.official;
  native_name.innerHTML = country.name.official;
  population.innerHTML = country.population;
  region.innerHTML = country.region;
  subregion.innerHTML = country.subregion;
  capital.innerHTML = country.capital;
  top_level_domains.innerHTML = country.tld;
  currencies.innerHTML =
    country.currencies.XCD.name + country.currencies.XCD.symbol;
  languages.innerHTML = country.languages.eng;
}

theme_toggle.addEventListener("click", () => {
  if (isLightMode) {
    body.style.background = "hsl(207, 26%, 17%)";
    body.style.color = "whitesmoke";
    countries_header_container.style.boxShadow =
      "1px 1px 7px 5px rgb(43, 42, 42)";
    countries_header_container.style.background = "hsl(209, 23%, 22%)";
    theme_toggle.style.backgroundColor = "hsl(209, 23%, 22%)";

    theme_toggle.style.color = "whitesmoke";
    theme_toggle.style.backgroundImage = "url('files/design/moonDark.png')";

    document.querySelectorAll(".country").forEach((country) => {
      country.style.boxShadow = "1px 1px 10px 5px rgb(34, 33, 33)";
      country.style.backgroundColor = "hsl(209, 23%, 22%)";
      country.style.color = "white";
      theme_toggle.style.color = "white";
    });

    countries_actions_search.style.backgroundColor = "hsl(209, 23%, 22%)";
    countries_actions_search.style.color = "black";
    countries_actions_search.style.boxShadow = "none";

    select_region.style.backgroundColor = "hsl(209, 23%, 22%)";

    isLightMode = false;
  } else {
    body.style.background = "white";
    body.style.color = "black";

    document.querySelectorAll(".country").forEach((country) => {
      country.style.boxShadow = "1px 1px 10px 5px rgb(231, 225, 225)";
      country.style.backgroundColor = "white";
      country.style.color = "black";
      theme_toggle.style.color = "black";
    });

    theme_toggle.style.backgroundImage = "url('files/design/moon.png')";
    theme_toggle.style.backgroundColor = "white";

    countries_header_container.style.boxShadow =
      "1px 1px 10px 5px rgb(190, 184, 184)";
    countries_header_container.style.background = "white";

    countries_actions_search.style.backgroundColor = "whitesmoke";
    countries_actions_search.style.color = "black";
    countries_actions_search.style.boxShadow = "none";

    select_region.style.backgroundColor = "whitesmoke";

    isLightMode = true;
  }
});
