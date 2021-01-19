import createDOMElement from '../../services/createDOMElement.js';

export default class TripDetails {
  constructor(tripObject) {
    this.trip = tripObject;

    const tripDetails = this.createTripContent();
    return tripDetails;
  }

  createTripContent() {
    const tripContainer = createDOMElement('section', 'trip-details', null, null, ['id', this.trip.id]);

    createDOMElement('div', 'trip-title', this.trip.tripName, tripContainer);
    createDOMElement('div', 'trip-destination', this.trip.tripRoute[0], tripContainer);
    createDOMElement('div', 'trip-date', `Trip date: ${this.trip.startDate} - ${this.trip.endDate}`, tripContainer);
    const map = createDOMElement('div', 'trip-icon map', 'Map', tripContainer);
    createDOMElement('img', null, null, map, ['src', './assets/images/icons/map.svg']);
    const sights = createDOMElement('div', 'trip-icon sights', 'Sights', tripContainer);
    createDOMElement('img', null, null, sights, ['src', './assets/images/icons/cathedral.svg']);
    const notes = createDOMElement('div', 'trip-icon notes', 'Notes', tripContainer);
    createDOMElement('img', null, null, notes, ['src', './assets/images/icons/test.svg']);
    const weather = createDOMElement('div', 'trip-icon weather', 'Weather', tripContainer);
    createDOMElement('img', null, null, weather, ['src', './assets/images/icons/cloudy.svg']);
    createDOMElement('div', 'trip-icon about-place', `About ${this.trip.tripRoute[0]}`, tripContainer);
    const important = createDOMElement('div', 'trip-icon important', 'Important', tripContainer);
    createDOMElement('img', null, null, important, ['src', './assets/images/icons/school.svg']);

    const pagination = createDOMElement('ul', 'pagination', null, tripContainer);
    const paginationContent = `<li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                                <li class="active"><a href="#!">1</a></li>
                                <li class="waves-effect"><a href="#!">2</a></li>
                                <li class="waves-effect"><a href="#!">3</a></li>
                                <li class="waves-effect"><a href="#!">4</a></li>
                                <li class="waves-effect"><a href="#!">5</a></li>
                                <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`;
    pagination.innerHTML = paginationContent;

    const buttons = createDOMElement('div', 'trip-details-buttons', null, tripContainer);

    const addDestination = createDOMElement('button', 'btn waves-effect waves-light', 'Add Destination',
      buttons, ['id', 'add-destination']);
    createDOMElement('i', 'material-icons left', 'add', addDestination);

    const removeTrip = createDOMElement('button', 'btn waves-effect waves-light', 'Remove This Trip',
      buttons, ['id', 'remove-trip']);
    createDOMElement('i', 'material-icons left', 'delete', removeTrip);

    return tripContainer;
  }
}
