import createDOMElement from '../services/createDOMElement.js';
import createTripCard from './services/createTripCard.js';
import TripDetails from './services/TripDetails.js';
import services from './services/tripsViewServices.js';
import Map from '../Map_module/Map';

export default class TripsView {
  constructor() {
    this.mainContentSection = document.querySelector('.main-content-section');
    this.modal = document.getElementById('modal1');
    this.init();
  }

  init() {
    this.myTripsContainer = createDOMElement('div', 'trips-container');
    this.newTripBtn = services.createNewTripBtn();

    this.myTripsContainer.append(this.newTripBtn);
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
    services.fillModalNewTrip(this.modal);
  }

  fillNotAuthModal() {
    services.fillModalNotAuthorized(this.modal);
  }

  fillAddDestinationModal() {
    services.fillModalAddDestination(this.modal);
  }

  fillRemoveTripModal() {
    services.fillModalRemoveTrip(this.modal);
  }

  showTrip(tripObject) {
    this.mainContentSection.innerHTML = '';
    const trip = new TripDetails(tripObject);
    this.mainContentSection.appendChild(trip);
  }

  setTripCard(tripObject) {
    const tripCard = createTripCard(tripObject);
    this.myTripsContainer.appendChild(tripCard);
  }

  showMap(town) {
    this.mainContentSection.innerHTML = '';

    const mapWidget = createDOMElement('div', 'map', null, null, ['id', 'map']);
    const content = createDOMElement('div', 'content');
    const legend = createDOMElement(
      'div',
      'legend',
      [createDOMElement('h3', null, 'Legend')],
      null,
      ['id', 'legend']
    );
    const searchContainer = createDOMElement('div', 'search-container');
    this.mainContentSection.append(mapWidget, content, legend, searchContainer);

    const map = new Map();
    map.handleApi(town);
  }
}
