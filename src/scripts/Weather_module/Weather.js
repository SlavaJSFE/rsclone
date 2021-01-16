import 'regenerator-runtime/runtime';
import { getWeatherData } from './WeatherData';
import createDOMElement from '../services/createDOMElement';
export default class Weather {
  constructor() {}

  createWeatherCard = () => {
    const container = document.querySelector('.container');

    const title = createDOMElement('h1', 'text-center weather-title', 'Weather in');
    const input = createDOMElement('form', 'search-location', [
      createDOMElement(
        'input',
        'form-control text-muted form-rounded p-4 shadow-sm',
        null,
        null,
        ['type', 'search'],
        ['name', 'city'],
        ['placeholder', 'Enter your city'],
        ['autocomplete', 'off']
      ),
    ]);

    const cardBack = createDOMElement('div', 'card rounded my-3 shadow-lg back-card', [
      createDOMElement('div', 'card-top text-center', [
        createDOMElement('div', 'city-name my-3', [
          createDOMElement('p', null, 'Abuja'),
          createDOMElement('span', null, '...'),
        ]),
        createDOMElement('img', 'card-img-top time', null, null, [
          'src',
          './assets/night_image.svg',
        ]),
      ]),
    ]);

    createDOMElement(
      'div',
      'card-body',
      [
        createDOMElement('div', 'card-mid row', [
          createDOMElement('div', 'col-8 text-center temp', [
            createDOMElement('span', null, '30&deg;C'),
          ]),
          createDOMElement('div', 'col-4 condition-temp', [
            createDOMElement('p', 'condition', 'Thunder Storm'),
            createDOMElement('p', 'high', '30&deg;C'),
            createDOMElement('p', 'low', '30&deg;C'),
          ]),
        ]),
        createDOMElement('div', 'icon-container card shadow mx-auto', [
          createDOMElement('img', null, null, null, ['src', './assets/cloud.svg']),
        ]),
        createDOMElement('div', 'card-bottom px-5 py-5 row', [
          createDOMElement('div', 'col text-center', [
            createDOMElement('p', null, '30&deg;C'),
            createDOMElement('span', null, 'Feels Like'),
          ]),
          createDOMElement('div', 'col text-center', [
            createDOMElement('p', null, '55%'),
            createDOMElement('span', 'humidity', 'Humidity'),
          ]),
        ]),
      ],
      cardBack
    );

    container.append(title, input, cardBack);
    this.setListeners();
  };

  transferToCelcius = (temp) => {
    const celcius = Math.round(temp - 273.15);
    return celcius;
  };

  setListeners = () => {
    const searchFrom = document.querySelector('.search-location');
    searchFrom.addEventListener('submit', this.handleRequest);
  };

  handleRequest = (event) => {
    const searchFrom = document.querySelector('.search-location');
    const cityValue = document.querySelector('.search-location input');
    event.preventDefault();

    const cityName = cityValue.value.trim().toLowerCase();
    console.log(cityName);
    searchFrom.reset();

    getWeatherData(cityName)
      .then((data) => {
        this.updateWeatherApp(data);
      })
      .catch((err) => console.log(err));
  };

  updateWeatherApp = (city) => {
    console.log(city);
  };
  // handleApi() {
  //   const city = 'Minsk';
  //   console.log('test');
  //   getWeatherData(city)
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }
}
