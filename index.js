let countries = [];
let container = document.getElementById("countries_list_container");
let theme_toggle = document.getElementById("toggle_btn");
let select_region = document.getElementById("countries_actions_select");
countries_header_container = document.getElementById(
  "countries_header_container"
);
let countries_actions_search = document.getElementById(
  "countries_actions_search"
);
let body = document.body;
let isLightMode = true;

function getAllCountries() {
  container.innerHTML = "";
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      displayCountries(countries);
    });
}
getAllCountries();

function getCountryByRegion(filter_region) {
  container.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/region/${filter_region}`)
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      displayCountries(countries);
    });
}

function getCountryByName(input_name) {
  container.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/name/${input_name}`)
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      displayCountries(countries);
    });
}

function displayCountries(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("country");
    div.addEventListener("click", () => {
      localStorage.setItem("country", item.name.official);
    });
    div.innerHTML = ` 
        <a class="card_link" href="country-page.html">
            <img class="flag-img" src=" ${item.flags.png}" alt="" />
            <div class="country_info_">
            <h3 class="country_name">${item.name.official}</h3>
            <p><span>Population: </span>${item.population}</p>
            <p><span>Region: </span>${item.region}</p>
            <p><span>Capital: </span>${item.capital}</p>
            </div>
        </a>
        `;
    container.appendChild(div);
  });
}

theme_toggle.addEventListener("click", () => {
  if (isLightMode) {
    body.style.background = "hsl(207, 26%, 17%)";
    body.style.color = "whitesmoke";
    countries_header_container.style.boxShadow =
      "1px 1px 7px 5px rgb(43, 42, 42)";
    countries_header_container.style.background = "hsl(209, 23%, 22%)";
    theme_toggle.style.backgroundColor = "hsl(207, 26%, 17%)";

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
select_region.addEventListener("change", (event) => {
  let selected_filter_region = event.target.value;
  getCountryByRegion(selected_filter_region);
});

countries_actions_search.addEventListener("change", (event) => {
  let input_name = event.target.value;
  if (input_name === "") {
    getAllCountries();
  } else {
    getCountryByName(input_name);
  }
});
