import model from './App-model.js';
import TravelPlaningAppView from './App-view.js';
import Currency from './Currency_module/Currency';
import Clock from './Clock_module/Clock';
import Trips from './Trips_module/Trips-controller.js';
import Sights from './Sights_module/Sights.js';
import './Sights_module/EventsSights';
import Weather from './Weather_module/Weather.js';

export default class TravelPlaningApp {
  static init() {
    // this.model = model;
    // this.view = new TravelPlaningAppView(model);
    // this.view.init();
    // const clock1 = new Clock(null, 1, 'Minsk');
    // clock1.createClockView().launchClock();
    // const clock2 = new Clock(-3, 2, 'London');
    // clock2.createClockView().launchClock();
    // const currency = new Currency();
    // currency.handleMethods();
    // const tripsComponent = new Trips();
    // tripsComponent.init();
    // this.addAppEventListener();

    const weather = new Weather();
    weather.createWeatherCard();
  }

  static addAppEventListener() {
    this.view.navigation.addEventListener('click', (event) => this.handleNavEvent(event.target));
  }

  static handleNavEvent(target) {
    if (target.className && target.className.includes('nav-item')) {
      const currentItem = target.className.split(' ')[1];
      this.fillMainContentSection(currentItem);
    }
  }

  static fillMainContentSection(currentItem) {
    if (currentItem === 'my-trips') {
      this.view.mainContentSection.innerHTML = '';
      const tripsComponent = new Trips();
      tripsComponent.init();
    }
    if (currentItem === 'map') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showMap();
    }
    if (currentItem === 'notes') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showNotes();
    }
    if (currentItem === 'attractions') {
      const sights = new Sights();
      this.view.mainContentSection.innerHTML = '';
      sights.createSearcher();
    }
  }
}
