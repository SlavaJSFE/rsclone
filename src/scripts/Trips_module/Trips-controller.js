import TripsView from './Trips-view.js';

export default class Trips {
  constructor(allTrips) {
    this.trips = allTrips;
  }

  init() {
    this.view = new TripsView();
    this.addTripEventListener();
  }

  addTripEventListener() {
    this.view.myTripsContainer.addEventListener('click', (event) => this.handleTripsEvent(event.target));
  }

  handleTripsEvent(target) {
    const submitDestination = this.view.mainContentSection.querySelector('.submit-btn');
    if (target === this.view.newTripBtn) {
      this.view.modalWindow.classList.toggle('active');
    }
    if (target === this.view.closeCircle || target === this.view.closeSpan) {
      this.view.modalWindow.classList.toggle('active');
    }
    if (target === submitDestination) {
      const input = this.view.modalWindow.querySelector('.destination-input');
      this.view.createTripCard(input.value);
      input.value = '';
      this.view.modalWindow.classList.toggle('active');
    }
    if (target.className && target.className.includes('trip-card-container')) {
      const currentTrip = target.className.split(' ')[1];
      this.view.showTrip(currentTrip);
    }
  }
}
