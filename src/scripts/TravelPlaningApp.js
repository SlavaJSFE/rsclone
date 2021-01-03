import TravelPlaningAppView from './TravelPlanningApp-view.js';
import Currency from '/scripts/Currency_module/Currency';

export default class TravelPlaningApp {
  static init() {
    const view = new TravelPlaningAppView();
    view.init();
    const currency = new Currency();
    currency.handleMethods();
  }
}
