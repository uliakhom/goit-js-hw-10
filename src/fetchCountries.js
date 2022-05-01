const BASE_URL = 'https://restcountries.com/v3.1/name/';
export function fetchCountries(value) {
  return fetch(`${BASE_URL}${value}?fields=flags,name,capital,population,languages `).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    },
  );
}
