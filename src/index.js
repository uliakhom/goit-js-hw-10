import './css/styles.css';
import debounce from 'lodash.throttle';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const ERROR_MESSAGE = 'Oops, there is no country with that name';
const MANY_MATCHES_MESSAGE = 'Too many matches found. Please enter a more specific name.';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function onInput(value) {
  if (!value) {
    clearResult();
    return;
  }
  if (refs.input.value === '') return;
  fetchCountries(refs.input.value.trim())
    .then(response => {
      toMakeResult(response);
    })
    .catch(error => {
      clearResult();
      console.log(error);
      Notiflix.Notify.failure(ERROR_MESSAGE);
    });
}

function toMakeResult(item) {
  clearResult();

  if (item.length > 10) {
    Notiflix.Notify.info(MANY_MATCHES_MESSAGE);
    return;
  } else if (item.length <= 10 && item.length >= 2) {
    renderList(item);

    return;
  } else {
    renderInfo(item);
  }
}
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function renderList(arr) {
  const markup = arr.reduce(
    (acc, country) =>
      acc +
      `<li class= "list"><img width="50" src="${country.flags.svg}"> ${country.name.official}</li>`,
    '',
  );

  refs.countryList.insertAdjacentHTML('beforeend', markup);
  makeCSS();
}

function renderInfo(arr) {
  const markup = arr.reduce(
    (acc, country) =>
      acc +
      `<ul><li class= "item">capital: ${country.capital}</li><li class= "item">population: ${
        country.population
      }</li><li class= "item">languages: ${Object.values(country.languages)}</li></ul>`,
    '',
  );
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
  renderList(arr);
  makeCSS();
}

function clearResult() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

document.body.style.backgroundColor = '#c7f0d2';

function makeCSS() {
  const item = document.querySelectorAll('.item');
  item.forEach(e => {
    e.style.marginBottom = 15 + 'px';
    e.style.listStyleType = 'none';
    e.style.fontWeight = 400;
    e.style.fontSize = 20 + 'px';
    e.style.fontStyle = 'italic';
  });

  const list = document.querySelectorAll('.list');
  list.forEach(e => {
    e.style.marginBottom = 15 + 'px';
    e.style.listStyleType = 'none';
    e.style.fontWeight = 500;
    e.style.fontSize = 25 + 'px';
  });
}
