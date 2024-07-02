const countryName = new URLSearchParams(window.location.search).get("name");
const flagImage = document.querySelector(".country-details img");
const country = document.querySelector(".details-text h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topDomain = document.querySelector(".top-domain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const borderCountries = document.querySelector(".border-countries");

const themeChanger = document.querySelector(".dark-mode");
const themeText = document.querySelector(".dark-mode span");
const themeicon = document.querySelector(".dark-mode i");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([data]) => {
    flagImage.src = data.flags.svg;
    console.log(flagImage);
    country.innerText = data.name.common;
    if (data.name.nativeName) {
      nativeName.innerText = Object.values(data.name.nativeName)[0].common;
    } else {
      nativeName.innerText = data.name.nativeName;
    }
    population.innerText = data.population.toLocaleString("en-IN");
    region.innerText = data.region;
    topDomain.innerText = data.tld.join(", ");

    if (data.capital) {
      capital.innerHTML = data.capital?.[0];
    }

    if (data.subregion) {
      subRegion.innerText = data.subregion;
    }

    if (data.currencies) {
      currency.innerText = Object.values(data.currencies).map(
        (curr) => curr.name
      );
    }

    if (data.languages) {
      language.innerText = Object.values(data.languages).join(", ");
    }

    if (data.borders) {
      data.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryElement = document.createElement("a");
            borderCountryElement.href = `country.html?name=${borderCountry.name.common}`;
            borderCountryElement.innerHTML = `${borderCountry.name.common}`;
            borderCountries.append(borderCountryElement);
          });
      });
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
