import createDOMElement from '../services/createDOMElement.js';
import createTripCard from './services/createTripCard.js';
import TripDetails from './TripDetails.js';
import services from './services/tripsViewServices.js';

export default class TripsView {
  constructor() {
    this.mainContentSection = document.querySelector('.main-content-section');
    this.init();
  }

  init() {
    this.myTripsContainer = createDOMElement('div', 'trips-container');
    this.newTripBtn = createDOMElement('button', 'new-trip-btn', 'New Trip');
    this.modalWindow = this.createTripsModalWindow();

    this.myTripsContainer.append(this.newTripBtn, this.modalWindow);

    this.mainContentSection.appendChild(this.myTripsContainer);
  }

  renderTripsCards(userTripsArray) {
    const trips = userTripsArray;
    trips.forEach((trip) => {
      const tripCard = createTripCard(trip);
      this.myTripsContainer.appendChild(tripCard);
    });
  }

  fillNewTripModal() {
    services.fillModalNewTrip();
  }

  createTripsModalWindow() {
    const modalWindow = createDOMElement('div', 'trips-modal');
    this.closeModalBtn = createDOMElement('i', 'material-icons close', 'close');

    const input = `<form id="trip-create-form">
                      <div class="input-field">
                        <i class="material-icons prefix">wysiwyg</i>
                        <input id="trip-name" type="text" required>
                        <label for="trip-name">Trip Name</label>
                      </div>
                      <div class="input-field">
                        <i class="material-icons prefix">place</i>
                        <input id="first-destination" class="autocomplete" type="text" required>
                        <label for="first-destination">Enter Your First Destination</label>
                      </div>
                      <div class="input-field">
                        <i class="material-icons prefix">today</i>
                        <input id="start-date" type="text" class="datepicker">
                        <label for="start-date">Start Date</label>
                      </div>
                      <div class="input-field">
                        <i class="material-icons prefix">today</i>
                        <input id="end-date" type="text" class="datepicker">
                        <label for="end-date">End Date</label>
                      </div>
                      <button id="new-trip-submit" class="btn waves-effect waves-light" type="submit" name="action">
                        Create New Trip
                        <i class="material-icons right">send</i>
                      </button>
                    </form>`;

    modalWindow.innerHTML = input;
    modalWindow.prepend(this.closeModalBtn);
    return modalWindow;
  }

  showTrip(id) {
    this.mainContentSection.innerHTML = '';
    const trip = new TripDetails(id);
    this.mainContentSection.appendChild(trip);
  }

  setTripCard(tripObject) {
    const tripCard = createTripCard(tripObject);
    this.myTripsContainer.appendChild(tripCard);
  }
}
