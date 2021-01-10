import createDOMElement from '../services/createDOMElement.js';
import TripCard from './TripCard.js';
import TripDetails from './TripDetails.js';

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

  createTripsModalWindow() {
    const modalWindow = createDOMElement('div', 'trips-modal');
    this.closeSpan = createDOMElement('span', 'trip-modal-close');
    this.closeCircle = createDOMElement('div', 'trip-close-circle', this.closeSpan);
    const input = `<div class="select">
                      <p>Enter destination</p>
                      <input class="destination-input" type="text" name="destination" value=""><br>
                      <button class="submit-btn">Submit</button>
                    </div>`;

    modalWindow.innerHTML = input;
    modalWindow.prepend(this.closeCircle);
    return modalWindow;
  }

  showTrip(id) {
    this.mainContentSection.innerHTML = '';
    const trip = new TripDetails(id);
    this.mainContentSection.appendChild(trip);
  }

  createTripCard(destination) {
    const tripCard = new TripCard(destination);
    this.myTripsContainer.appendChild(tripCard);
  }
}