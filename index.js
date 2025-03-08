let countries = [];

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    countries = data;
    displayCountries(countries);
  });

function displayCountries(data) {
  const container = document.getElementById("countries_list_container");
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("country");
    div.innerHTML = ` <img src=" ${item.flags.png}" alt="" />
          <h3>${item.name.official}</h3>
          <p><span>Population:</span>${item.population}</p>
          <p><span>Region:</span>${item.region}</p>
          <p><span>Capital:</span>${item.capital}</p>
        `;
    container.appendChild(div);
  });
}

let theme_toggle = document.getElementById("toggle_btn");
let body = document.body;
let isLightMode = true;

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
