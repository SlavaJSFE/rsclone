import 'regenerator-runtime/runtime';

const COUNTRIES_INFO_API = 'https://restcountries.eu/rest/v2/all';
const CURRENCY_API =
  'https://api.currencyfreaks.com/latest?apikey=64ab7c03c8b848d7bfd307cbf5845df2';

export const getCountriesInfoData = async function a() {
  const response = await fetch(COUNTRIES_INFO_API);
  return response.json();
};

export const getCurrencyInfoData = async function b() {
  const response = await fetch(CURRENCY_API);
  return response.json();
};
