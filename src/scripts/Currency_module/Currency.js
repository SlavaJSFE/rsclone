import 'regenerator-runtime/runtime';
import { getCountriesInfoData, getCurrencyInfoData } from './Data';
import create from './create';

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

    this.createCurrencySearch();
    this.createCurrencyTitle();
    this.createCurrencyInfo();
    return this;
  }

  createCurrencyTitle = () => {
    const table = document.querySelector('.table-currency');

    const data = this.currencyData.date.slice(0, 10);

    create('div', 'currency-title', `${this.currencyData.base} exchange rate ${data}`, table);
  };

  createCurrencyInfo = () => {
    const table = document.querySelector('.table-currency');

    CURRENCY_RATES.forEach((currencyCode) => {
      let flag;

      if (currencyCode === 'EUR') {
        flag = 'img/eu_flag.svg';
      } else if (currencyCode === 'BYN') {
        flag = 'img/by_flag.svg';
      } else if (currencyCode === 'GBP') {
        flag = 'img/gb_flag.svg';
      } else if (currencyCode === 'AUD') {
        flag = 'img/aus_flag.svg';
      } else {
        flag = this.findCountryData(currencyCode).flag;
      }

      // if (!currentData) return;

      create(
        'div',
        'currency-container',
        [
          create('div', 'currency-info', [
            create('img', 'currency-info__flag', null, null, ['src', `${flag}`]),
            create('div', 'currency-info__name', `${currencyCode}`),
          ]),
          create(
            'div',
            'currency-rate',
            `${Number(this.currencyData.rates[currencyCode]).toFixed(2)}`
          ),
        ],
        table
      );
    });
  };

  findCountryData = (currencyCode) => {
    return this.countriesInfoData.find((item) => item.currencies[0].code === currencyCode);
  };

  createCurrencySearch = () => {
    const table = document.querySelector('.table-currency');
    create('input', 'currency-search', null, table, ['placeholder', 'Search you currency rate']);
  };

  // findCurrencyRate = (currencyCode) => {
  //   const rate = Object.keys(this.currencyData.rates).find(
  //     (item) => this.currencyData.rates[currencyCode]
  //   );
  //   console.log(rate);
  // };
}
