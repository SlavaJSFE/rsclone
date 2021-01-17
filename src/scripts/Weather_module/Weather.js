import 'regenerator-runtime/runtime';
import { getWeatherData } from './WeatherData';
import createDOMElement from '../services/createDOMElement';
export default class Weather {
  constructor() {}

  createSearchByCity = () => {
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

    container.append(title, input);
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
    const container = document.querySelector('.container');
    const searchFrom = document.querySelector('.search-location');
    const cityValue = document.querySelector('.search-location input');
    const card = document.querySelector('.card');
    event.preventDefault();

    if (card) {
      card.remove(container);
    }

    const cityName = cityValue.value.trim().toLowerCase();
    console.log(cityName);
    searchFrom.reset();

    getWeatherData(cityName)
      .then((data) => {
        this.createWeatherApp(data);
      })
      .catch((err) => console.log(err));
  };

  isDayTime = (icon) => {
    if (icon.includes('d')) {
      return true;
    } else {
      return false;
    }
  };

  createWeatherApp = (city) => {
    console.log(city);
    const container = document.querySelector('.container');
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;

    let cardImg = 'night_image.svg';
    let isNight = true;

    if (this.isDayTime(imageName)) {
      cardImg = 'day_image.svg';
      isNight = false;
    }

    const cardBack = createDOMElement(
      'div',
      'card rounded my-3 shadow-lg back-card',
      [
        createDOMElement('div', 'card-top text-center', [
          createDOMElement('div', 'city-name my-3', [
            createDOMElement('p', null, `${city.name}`, null, ['data-night', `${isNight}`]),
            createDOMElement('span', null, '...'),
          ]),
          createDOMElement('img', 'card-img-top time', null, null, ['src', `./assets/${cardImg}`]),
        ]),
      ],
      container
    );

    createDOMElement(
      'div',
      'card-body',
      [
        createDOMElement('div', 'card-mid row', [
          createDOMElement('div', 'col-8 text-center temp', [
            createDOMElement('span', null, `${this.transferToCelcius(city.main.temp)} &deg;C`),
          ]),
          createDOMElement('div', 'col-4 condition-temp', [
            createDOMElement('p', 'condition', `${city.weather[0].description}`),
            createDOMElement('p', 'high', `${this.transferToCelcius(city.main.temp_max)} &deg;C`),
            createDOMElement('p', 'low', `${this.transferToCelcius(city.main.temp_min)} &deg;C`),
          ]),
        ]),
        createDOMElement('div', 'icon-container card shadow mx-auto', [
          createDOMElement('img', null, null, null, ['src', `${iconSrc}`]),
        ]),
        createDOMElement('div', 'card-bottom px-5 py-5 row', [
          createDOMElement('div', 'col text-center', [
            createDOMElement('p', null, `${this.transferToCelcius(city.main.feels_like)} &deg;C`),
            createDOMElement('span', null, 'Feels Like'),
          ]),
          createDOMElement('div', 'col text-center', [
            createDOMElement('p', null, `${city.main.humidity} %`),
            createDOMElement('span', 'humidity', 'Humidity'),
          ]),
        ]),
      ],
      cardBack
    );
  };
}
