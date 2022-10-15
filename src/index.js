import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

let countryName;

inputRef.addEventListener('input', e => {
  countryName = e.target.value;
  fetchCountries(countryName).then(countries => renderCountriesList(countries));

  function renderCountriesList(countries) {
    const countriesMarkup = countries.map(
      ({ capital, flags, languages, name }) => {
        return `<div>
    <img src=${flags.svg} width='200px'><p>${name.official}</P>
      </div>`;
      }
    );
    countriesListRef.innerHTML = countriesMarkup;
    if ((countries.length = 1)) {
      return;
    }
  }
});
