import createDOMElement from '../services/createDOMElement.js';
import createTripCard from './services/createTripCard.js';
import TripDetails from './services/TripDetails.js';
import services from './services/tripsViewServices.js';
import Map from '../Map_module/Map';
import Notes from '../Notes_module/Notes';
import Weather from '../Weather_module/Weather';
import TODO from '../TODO_module/TODO';

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
    this.myTripsContainer.classList.add('hidden');
    this.trip = new TripDetails(tripObject);
    this.mainContentSection.appendChild(this.trip);
  }

  goBackToUserTrips() {
    this.trip.remove();
    this.myTripsContainer.classList.remove('hidden');
  }

  setTripCard(tripObject) {
    const tripCard = createTripCard(tripObject);
    this.myTripsContainer.appendChild(tripCard);
  }

  showMap(town, id) {
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

    const map = new Map(id);
    map.handleApi(town);
  }

  showWeather(town) {
    this.mainContentSection.innerHTML = '';

    const weatherContainer = createDOMElement('div', 'weather-container');
    this.mainContentSection.append(weatherContainer);

    const weather = new Weather();
    weather.createSearchByCity(town);
  }

  showNotes() {
    this.mainContentSection.innerHTML = '';

    const noteContainer = createDOMElement('div', 'notes-container');
    this.mainContentSection.appendChild(noteContainer);

    const note = new Notes();

    note.createNoteContainer();
  }

  showTODO() {
    this.mainContentSection.innerHTML = '';

    const todoContainer = createDOMElement('div', 'todo-container');
    this.mainContentSection.appendChild(todoContainer);

    const todo = new TODO();
    todo.createTODOElements();
  }
}
