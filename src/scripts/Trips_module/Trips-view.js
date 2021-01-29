import createDOMElement from '../services/createDOMElement';
import createTripCard from './services/createTripCard';
import TripDetails from './services/TripDetails';
import services from './services/tripsViewServices';
import Map from '../Map_module/Map';
import Notes from '../Notes_module/Notes';
import Weather from '../Weather_module/Weather';
import TODO from '../TODO_module/TODO';
import { clockInstance } from '../Clock_module/Clock';

export default class TripsView {
  constructor() {
    this.mainContentSection = document.querySelector('.main-content-section');
    this.modal = document.getElementById('modal1');
    this.init();
    this.currClock;
  }

  init() {
    this.myTripsContainer = createDOMElement('div', 'trips-container');
    this.newTripBtn = services.createNewTripBtn();

    this.myTripsContainer.append(this.newTripBtn);
    this.mainContentSection.appendChild(this.myTripsContainer);
  }

  renderTripsCards(userTripsArray) {
    console.log()
    const trips = userTripsArray;
    if (userTripsArray.length === 0) {
      const noTripsInfo = services.createNoTripsInfo();
      this.myTripsContainer.appendChild(noTripsInfo);
    }
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

    // === clock render
    const clockContainer = document.querySelector('#clock-container2');
    if (clockContainer) {
      this.removeClocks();
    }

    this.showClocks();
    // ===

    services.createPagination(tripObject.tripRoute);
  }

  goBackToUserTrips() {
    this.tripDetailsBlock.remove();
    this.myTripsContainer.classList.remove('hidden');

    this.removeClocks();
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

  checkNoTrips() {
    const noTripsBlock = this.myTripsContainer.querySelector('.no-trips');

    if (noTripsBlock) {
      noTripsBlock.remove();
    }
  }

  showMap(town, id) {
    this.tripDetailsBlock.classList.add('hidden');

    const mapWidget = createDOMElement('div', 'map', null, null, ['id', 'map']);
    const legend = createDOMElement(
      'div',
      'legend',
      [createDOMElement('h3', null, 'Legend')],
      null,
      ['id', 'legend']
    );
    const searchContainer = createDOMElement('div', 'search-container');
    const backBtn = createDOMElement('div', 'map_btn-container');

    this.mainContentSection.append(mapWidget, legend, searchContainer, backBtn);

    const map = new Map(town, id);
    map.handleApi();
  }

  showWeather(town) {
    this.tripDetailsBlock.classList.add('hidden');

    const backBtn = createDOMElement('div', 'btn back-btn weather-back', [
      createDOMElement('i', 'material-icons', 'arrow_back'),
    ]);

    const weatherContainer = createDOMElement('div', 'weather-container');
    this.mainContentSection.append(backBtn, weatherContainer);

    const weather = new Weather();
    weather.createSearchByCity(town);
  }

  showNotes(town, id) {
    this.tripDetailsBlock.classList.add('hidden');

    const noteContainer = createDOMElement('div', 'notes-container');
    const backBtn = createDOMElement('div', 'btn back-btn note-back', [
      createDOMElement('i', 'material-icons', 'arrow_back'),
    ]);

    this.mainContentSection.append(backBtn, noteContainer);

    const note = new Notes(town, id);

    note.createNoteContainer();
  }

  showTODO(town, id) {
    this.tripDetailsBlock.classList.add('hidden');

    const todoContainer = createDOMElement('div', 'todo-container');
    const backBtn = createDOMElement('div', 'btn back-btn todo-back', [
      createDOMElement('i', 'material-icons', 'arrow_back'),
    ]);

    this.mainContentSection.append(backBtn, todoContainer);

    const todo = new TODO(town, id);
    todo.createTODOElements();
  }

  removeClocks() {
    const clock = document.querySelector('#clock-container2');
    clock.remove();
    clockInstance.stopClock();
  }

  showClocks() {
    const tripDetailsContainer = document.querySelector('.trip-destination');
    if (tripDetailsContainer.innerHTML !== 'Minsk') {
      clockInstance.createClockView(tripDetailsContainer.innerHTML, 2).launchClock();
    }
  }
}
