import TravelPlaningAppView from './TravelPlanningApp-view.js';

export default class TravelPlaningApp {
  static init() {
    const view = new TravelPlaningAppView();
    view.init();
  }
}
