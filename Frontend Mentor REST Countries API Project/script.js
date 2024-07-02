const countries = document.querySelector(".countries");
const filterRegion = document.querySelector(".filter-region");
const filterList = document.querySelector(".filter-list");
const filterListItem = document.querySelectorAll(".filter-list li");
const filterIcon = document.querySelector(".filter-icon");
const searchInput = document.querySelector(".search-container input");

const themeChanger = document.querySelector(".dark-mode");
const themeText = document.querySelector(".dark-mode span");
const themeicon = document.querySelector(".dark-mode i");

let alllCountriesData;

filterRegion.addEventListener("click", () => {
  if (filterList.style.display != "block") {
    filterList.style.display = "block";
    filterIcon.classList = "fa-solid fa-angle-up";
  } else {
    filterList.style.display = "none";
    filterIcon.classList = "fa-solid fa-chevron-down";
  }
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList == "dark-theme") {
    themeText.innerText = "Light Mode";
    themeicon.classList = "fa-regular fa-sun";
  } else {
    themeText.innerText = "Dark Mode";
    themeicon.classList = "fa-regular fa-moon";
  }
});

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    getCountries(data);
    alllCountriesData = data;
  });

filterListItem.forEach((listItem) => {
  listItem.addEventListener("click", (e) => {
    filterRegion.firstElementChild.innerHTML = e.target.innerHTML;
    filterList.style.display = "none";

    fetch(`https://restcountries.com/v3.1/region/${e.target.innerHTML}`)
      .then((res) => res.json())
      .then((data) => {
        countries.innerHTML = "";
        getCountries(data);
      });
  });
});

function getCountries(data) {
  data.forEach((item) => {
    const country = document.createElement("a");
    country.classList.add("country");

    country.href = `country.html?name=${item.name.common}`;

    country.innerHTML = `
          <img src=${item.flags.svg} alt="flag" />
          <div class="content">
              <h3>${item.name.common}</h3>
              <p>population: <span>${item.population.toLocaleString(
                "en-IN"
              )}</span></p>
              <p>Region: <span>${item.region}</span></p>
              <p>capital: <span>${item.capital}</span></p>
        </div>`;

    countries.append(country);
  });
}

searchInput.addEventListener("input", (e) => {
  let filteredData = alllCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value)
  );
  countries.innerHTML = "";
  getCountries(filteredData);
});
