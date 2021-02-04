import { getCountriesInfoData, getCurrencyInfoData } from './CurrencyData';
import createDOMElement from '../services/createDOMElement';
import translate from '../Language_module/todoLang';
import { local } from '../constants/language';

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

    // this.createCurrencySearch();
    this.createCurrencyTitle();
    this.createCurrencyInfo();
    return this;
  }

  createCurrencyTitle = () => {
    const table = document.querySelector('.currency');
    const exchangeRate = translate[`exchangeRate_${local}`];
    const data = this.currencyData.date.slice(0, 10);

    createDOMElement(
      'div',
      'currency-title',
      `${this.currencyData.base} ${exchangeRate} ${data}`,
      table,
    );
  };

  createCurrencyInfo = () => {
    const table = document.querySelector('.currency');
    const tableBody = createDOMElement('div', 'currency-body', null, table);
    CURRENCY_RATES.forEach((currencyCode) => {
      let flag;

      if (currencyCode === 'EUR') {
        flag = '../assets/images/eu_flag.svg';
      } else if (currencyCode === 'BYN') {
        flag = '../assets/images/by_flag.svg';
      } else if (currencyCode === 'GBP') {
        flag = '../assets/images/gb_flag.svg';
      } else if (currencyCode === 'AUD') {
        flag = '../assets/images/aus_flag.svg';
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
            `${Number(this.currencyData.rates[currencyCode]).toFixed(2)}`,
          ),
        ],
        tableBody,
      );
    });
  };

  findCountryData = (currencyCode) => this.countriesInfoData.find((item) => item.currencies[0].code === currencyCode);
}
