import 'regenerator-runtime/runtime';
import { getCountriesInfoData, getCurrencyInfoData } from './Data';
import createDOMElement from '../services/createDOMElement';

const CURRENCY_RATES = ['EUR', 'RUB', 'BYN', 'GBP', 'AUD', 'BRL', 'CNY', 'CAD', 'JPY'];

export default class Currency {
  constructor() {
    this.currencyData = [];
    this.countriesInfoData = [];
  }

  async handleMethods() {
    const [countriesData, currencyData] = await Promise.all([
      getCountriesInfoData(),
      getCurrencyInfoData(),
    ]);

    this.countriesInfoData = countriesData;
    this.currencyData = currencyData;

    console.log(this.countriesInfoData);
    console.log(this.currencyData);

    // this.createCurrencySearch();
    this.createCurrencyTitle();
    this.createCurrencyInfo();
    return this;
  }

  createCurrencyTitle = () => {
    const table = document.querySelector('.currency');

    const data = this.currencyData.date.slice(0, 10);

    createDOMElement(
      'div',
      'currency-title',
      `${this.currencyData.base} exchange rate ${data}`,
      table
    );
  };

  createCurrencyInfo = () => {
    const table = document.querySelector('.currency');
    const tableBody = createDOMElement('div', 'currency-body', null, table);
    CURRENCY_RATES.forEach((currencyCode) => {
      let flag;

      if (currencyCode === 'EUR') {
        flag = '../assets/eu_flag.svg';
      } else if (currencyCode === 'BYN') {
        flag = '../assets/by_flag.svg';
      } else if (currencyCode === 'GBP') {
        flag = '../assets/gb_flag.svg';
      } else if (currencyCode === 'AUD') {
        flag = '../assets/aus_flag.svg';
      } else {
        flag = this.findCountryData(currencyCode).flag;
      }

      // if (!currentData) return;
      createDOMElement(
        'div',
        'currency-container',
        [
          createDOMElement('div', 'currency-info', [
            createDOMElement('img', 'currency-info__flag', null, null, ['src', `${flag}`]),
            createDOMElement('div', 'currency-info__name', `${currencyCode}`),
          ]),
          createDOMElement(
            'div',
            'currency-rate',
            `${Number(this.currencyData.rates[currencyCode]).toFixed(2)}`
          ),
        ],
        tableBody
      );
    });
  };

  findCountryData = (currencyCode) => {
    return this.countriesInfoData.find((item) => item.currencies[0].code === currencyCode);
  };

  // createCurrencySearch = () => {
  //   const table = document.querySelector('.currency');
  //   createDOMElement('input', 'currency-search', null, table, [
  //     'placeholder',
  //     'Search you currency rate',
  //   ]);
  // };

  // findCurrencyRate = (currencyCode) => {
  //   const rate = Object.keys(this.currencyData.rates).find(
  //     (item) => this.currencyData.rates[currencyCode]
  //   );
  //   console.log(rate);
  // };
}
