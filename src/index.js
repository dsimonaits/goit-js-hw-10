import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

let countryName = '';

function resetMarkup() {
  countriesListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  countryName = event.target.value;
  searchCountries(countryName.trim());
  if (!countryName) {
    resetMarkup();
  }
}

function searchCountries(countryName) {
  if (!countryName) {
    return;
  }
  fetchCountries(countryName)
    .then(countries => {
      if (countries.length >= 10) {
        countriesListRef.innerHTML = '';
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      renderMarkup(countries);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      resetMarkup();
    });
}

function renderMarkup(countries) {
  const countriesMarkup = countries
    .map(({ flags, name }) => {
      return `<div class='country-thumb'>
    <img src=${flags.svg} width='40px'><p>${name.official}</P>
      </div>`;
    })
    .join('');

  const countrieMarkup = countries
    .map(({ capital, flags, languages, name, population }) => {
      const languagesToString = Object.values(languages)
        .toString()
        .replaceAll(',', ', ');
      return `<div class='country-thumb'>
    <img src=${flags.svg} width='40px'><h2>${name.official}</h2></div><ul class='info-list'><li><b>Capital:</b> ${capital}</li><li><b>Population:</b> ${population}</li><li><b>Languages:</b> ${languagesToString}</li></ul>`;
    })
    .join('');

  if (countries.length > 1) {
    (countriesListRef.innerHTML = countriesMarkup),
      (countryInfoRef.innerHTML = '');
  } else
    (countryInfoRef.innerHTML = countrieMarkup),
      (countriesListRef.innerHTML = '');
}
