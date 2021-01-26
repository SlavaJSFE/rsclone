import createDOMElement from '../services/createDOMElement';
import createTripCard from './services/createTripCard';
import TripDetails from './services/TripDetails';
import services from './services/tripsViewServices';
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
    this.tripDetailsBlock = this.trip.createTripContent();
    this.mainContentSection.appendChild(this.tripDetailsBlock);

    services.createPagination(tripObject.tripRoute);
  }

  goBackToUserTrips() {
    this.tripDetailsBlock.remove();
    this.myTripsContainer.classList.remove('hidden');
  }

  handleOptionsDropdown() {
    this.dropdown = document.getElementById('options-dropdown');
    this.dropdown.classList.toggle('show');
  }

  showDestinationDetails(currentActive) {
    const currentDestination = this.tripDetailsBlock.querySelector('.destination-details');
    const pageNumber = currentActive.firstChild.textContent;

    currentDestination.remove();
    this.trip.fillDestination(pageNumber);
  }

  setTripCard(tripObject) {
    const tripCard = createTripCard(tripObject);
    this.myTripsContainer.appendChild(tripCard);
  }

  showMap(town, id) {
    this.trip.classList.add('hidden');

    const mapWidget = createDOMElement('div', 'map', null, null, ['id', 'map']);
    const legend = createDOMElement(
      'div',
      'legend',
      [createDOMElement('h3', null, 'Legend')],
      null,
      ['id', 'legend'],
    );
    const searchContainer = createDOMElement('div', 'search-container');
    const backBtn = createDOMElement('div', 'map_btn-container');

    this.mainContentSection.append(mapWidget, legend, searchContainer, backBtn);

    const map = new Map(town, id);
    map.handleApi();
  }

  showWeather(town) {
    this.trip.classList.add('hidden');

    const backBtn = createDOMElement('div', 'btn back-btn weather-back', [
      createDOMElement('i', 'material-icons', 'arrow_back'),
    ]);

    const weatherContainer = createDOMElement('div', 'weather-container');
    this.mainContentSection.append(backBtn, weatherContainer);

    const weather = new Weather();
    weather.createSearchByCity(town);
  }

  showNotes(id) {
    this.trip.classList.add('hidden');

    const noteContainer = createDOMElement('div', 'notes-container');
    const backBtn = createDOMElement('div', 'btn back-btn note-back', [
      createDOMElement('i', 'material-icons', 'arrow_back'),
    ]);

    this.mainContentSection.append(backBtn, noteContainer);

    const note = new Notes(id);

    note.createNoteContainer();
  }

  showTODO(town, id) {
    this.trip.classList.add('hidden');

    const todoContainer = createDOMElement('div', 'todo-container');
    const backBtn = createDOMElement('div', 'btn back-btn todo-back', [
      createDOMElement('i', 'material-icons', 'arrow_back'),
    ]);

    this.mainContentSection.append(backBtn, todoContainer);

    const todo = new TODO(town, id);
    todo.createTODOElements();
  }
}
