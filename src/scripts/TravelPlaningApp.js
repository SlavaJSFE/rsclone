import TravelPlaningAppView from './TravelPlanningApp-view.js';
import Currency from '../scripts/Currency_module/Currency';
import Clock from '../scripts/Clock_module/Clock';
import Map from '../scripts/Map_module/Map';

export default class TravelPlaningApp {
  static init() {
    // const view = new TravelPlaningAppView();
    // view.init();
    // const clock1 = new Clock(null, 1, 'Minsk');
    // clock1.createClockView().launchClock();
    // const clock2 = new Clock(-3, 2, 'London');
    // clock2.createClockView().launchClock();
    // const currency = new Currency();
    // currency.handleMethods();

    const map = new Map();
    // map.initMap();
    map.handleApi('london');
  }
}
