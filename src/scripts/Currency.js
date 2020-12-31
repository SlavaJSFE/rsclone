import 'regenerator-runtime/runtime';
import { getCountriesInfoData, getCurrencyInfoData } from './Data';
import create from './create';

const CURRENCY_RATES = ['RUB', 'EUR', 'BYN', 'GBP', 'AUD', 'BRL', 'CNY', 'CAD', 'CHF', 'JPY'];

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

    console.log(Object.keys(this.currencyData.rates));

    this.createCurrencyTitle();
    this.createCurrencyInfo();
    return this;
  }

  createCurrencyTitle = () => {
    const table = document.querySelector('.table-currency');

    create('div', 'currency-title', 'USD exchange rate data', table);
  };

  createCurrencyInfo = () => {
    const table = document.querySelector('.table-currency');

    Object.keys(this.currencyData.rates).map((currencyCode) => {
      let currentData;
      let flag;

      if (currencyCode === 'USD') {
        currentData = this.findCountryData(currencyCode);
        flag = './assets/img/us_flag.svg';
      } else if (currencyCode === 'EUR') {
        currentData = this.findCountryData(currencyCode);
        flag = './assets/img/eu_flag.svg';
      } else {
        currentData = this.findCountryData(currencyCode);
        flag = currentData.flag;
      }

      const rate = this.currencyData.rates[currencyCode];

      if (!currentData) return;

      create(
        'div',
        'currency-container',
        [
          create('div', 'currency-info', [
            create('img', 'currency-info__flag', null, null, ['src', `${flag}`]),
            create('div', 'currency-info__name', `${currencyCode}`),
          ]),
          create('div', 'currency-rate', `${rate}`),
        ],
        table
      );
    });
  };

  findCountryData = (currencyCode) => {
    return this.countriesInfoData.find((item) => item.currencies[0].code === currencyCode);
  };
}
