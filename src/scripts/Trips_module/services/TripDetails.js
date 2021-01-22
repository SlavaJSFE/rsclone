import createDOMElement from '../../services/createDOMElement.js';

export default class TripDetails {
  constructor(tripObject) {
    this.trip = tripObject;

    const tripDetails = this.createTripContent();
    return tripDetails;
  }

  createTripContent() {
    const tripContainer = createDOMElement('section', 'trip-details', null, null, ['id', this.trip.id]);

    const tripDetailsHeader = createDOMElement('div', 'trip-details-header', null, tripContainer);

    createDOMElement('div', 'trip-title', this.trip.tripName, tripDetailsHeader);
    createDOMElement('div', 'trip-destination', this.trip.tripRoute[0], tripDetailsHeader);
    createDOMElement('div', 'trip-date', `Trip date: ${this.trip.startDate} - ${this.trip.endDate}`,
      tripDetailsHeader);

    const map = createDOMElement('div', 'trip-icon map', null, tripContainer);
    createDOMElement('img', null, null, map, ['src', './assets/images/icons/map.svg']);
    createDOMElement('span', null, 'Map', map);

    const sights = createDOMElement('div', 'trip-icon sights', null, tripContainer);
    createDOMElement('img', null, null, sights, ['src', './assets/images/icons/cathedral.svg']);
    createDOMElement('span', null, 'Sights', sights);

    const notes = createDOMElement('div', 'trip-icon notes', null, tripContainer);
    createDOMElement('img', null, null, notes, ['src', './assets/images/icons/test.svg']);
    createDOMElement('span', null, 'Notes', notes);

    const weather = createDOMElement('div', 'trip-icon weather', null, tripContainer);
    createDOMElement('img', null, null, weather, ['src', './assets/images/icons/cloudy.svg']);
    createDOMElement('span', null, 'Weather', weather);

    const todo = createDOMElement('div', 'trip-icon todo', null, tripContainer);
    createDOMElement('img', null, null, todo, ['src', './assets/images/icons/school.svg']);
    createDOMElement('span', null, 'To Do', todo);

    const important = createDOMElement('div', 'trip-icon important', null, tripContainer);
    createDOMElement('img', null, null, important, ['src', './assets/images/icons/school.svg']);
    createDOMElement('span', null, 'Important', important);

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
