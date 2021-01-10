import model from './TravelPlanningApp-model.js';
import TravelPlaningAppView from './TravelPlanningApp-view.js';
import Currency from './Currency_module/Currency';
import Clock from './Clock_module/Clock';

export default class TravelPlaningApp {
  static init() {
    this.model = model;
    this.view = new TravelPlaningAppView(model);
    this.view.init();

    const clock1 = new Clock(null, 1, 'Minsk');
    clock1.createClockView().launchClock();

    const clock2 = new Clock(-3, 2, 'London');
    clock2.createClockView().launchClock();

    const currency = new Currency();
    currency.handleMethods();

    this.createEventListener();
  }

  static createEventListener() {
    this.view.navigation.addEventListener('click', (event) => this.handleNavEvent(event.target));
    this.view.mainContentSection.addEventListener('click', (event) => this.handleMyTripsEvent(event.target));
  }

  static handleNavEvent(target) {
    if (target.className && target.className.includes('nav-item')) {
      const currentItem = target.className.split(' ')[1];
      this.view.fillMainContentSection(currentItem);
    }
  }

  static handleMyTripsEvent(target) {
    const submitDestination = this.view.mainContentSection.querySelector('.submit-btn');
    if (target === this.view.newTripBtn) {
      this.view.modalWindow.classList.toggle('active');
    }
    if (target === this.view.closeCircle || target === this.view.closeSpan) {
      this.view.modalWindow.classList.toggle('active');
    }
    if (target === submitDestination) {
      const input = this.view.modalWindow.querySelector('.destination-input');
      console.log(input.value);
      this.view.createTripCard(input.value);
      input.value = '';
      this.view.modalWindow.classList.toggle('active');
    }
  }
}
