import 'regenerator-runtime/runtime';
import { getWeatherData } from './WeatherData';
import createDOMElement from '../services/createDOMElement';
export default class Weather {
  constructor() {}

  createSearchByCity = (town) => {
    const container = document.querySelector('.weather-container');

    const title = createDOMElement('h1', 'weather-title', 'Weather in');
    const input = createDOMElement('form', 'search-location', [
      createDOMElement(
        'input',
        'city-input',
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

    if (town) {
      getWeatherData(town)
        .then((data) => {
          this.createWeatherApp(data);
        })
        .catch((err) => console.log(err));
    }
  };

  transferToCelcius = (temp) => {
    const celcius = Math.round(temp - 273.15);
    return celcius;
  };

  setListeners = () => {
    const searchFrom = document.querySelector('.search-location');
    searchFrom.addEventListener('submit', this.handleRequest);

    const backBtn = document.querySelector('.weather-back');
    backBtn.addEventListener('click', this.goBackToMenu);
  };

  goBackToMenu = () => {
    const weatherContainer = document.querySelector('.weather-container');
    const backBtn = document.querySelector('.weather-back');
    const tripsDetails = document.querySelector('.trip-details');
    tripsDetails.classList.remove('hidden');
    weatherContainer.remove();
    backBtn.remove();
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
    const container = document.querySelector('.weather-container');
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
      'card back-card',
      [
        createDOMElement('div', 'card-top', [
          createDOMElement('div', 'city-name', [
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
        createDOMElement('div', 'card-mid', [
          createDOMElement('div', 'temp', [
            createDOMElement('span', null, `${this.transferToCelcius(city.main.temp)} &deg;C`),
          ]),
          createDOMElement('div', 'condition-temp', [
            createDOMElement('p', 'condition', `${city.weather[0].description}`),
            createDOMElement('p', 'high', `${this.transferToCelcius(city.main.temp_max)} &deg;C`),
            createDOMElement('p', 'low', `${this.transferToCelcius(city.main.temp_min)} &deg;C`),
          ]),
        ]),
        createDOMElement('div', 'icon-container card', [
          createDOMElement('img', null, null, null, ['src', `${iconSrc}`]),
        ]),
        createDOMElement('div', 'card-bottom', [
          createDOMElement('div', 'feelsLike-container', [
            createDOMElement('p', null, `${this.transferToCelcius(city.main.feels_like)} &deg;C`),
            createDOMElement('span', null, 'Feels Like'),
          ]),
          createDOMElement('div', 'humidity-container', [
            createDOMElement('p', null, `${city.main.humidity} %`),
            createDOMElement('span', 'humidity', 'Humidity'),
          ]),
        ]),
      ],
      cardBack
    );
  };
}
