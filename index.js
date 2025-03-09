let countries = [];
let container = document.getElementById("countries_list_container");
let theme_toggle = document.getElementById("toggle_btn");
let select_region = document.getElementById("countries_actions_select");
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
            <p><span>Population:</span>${item.population}</p>
            <p><span>Region:</span>${item.region}</p>
            <p><span>Capital:</span>${item.capital}</p>
            </div>
        </a>
        `;
    container.appendChild(div);
  });
}

theme_toggle.addEventListener("click", () => {
  if (isLightMode) {
    body.style.background = "gray";
    body.style.color = "white";
    isLightMode = false;
  } else {
    body.style.background = "white";
    body.style.color = "black";
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
