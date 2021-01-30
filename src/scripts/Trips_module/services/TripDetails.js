import createDOMElement from '../../services/createDOMElement';

export default class TripDetails {
  constructor(tripObject) {
    this.trip = tripObject;
  }

  createTripContent() {
    const tripContainer = createDOMElement('section', 'trip-details', null, null, ['id', this.trip.id]);

    const goBackBtn = createDOMElement('div', 'btn back-btn', null, tripContainer);
    createDOMElement('i', 'material-icons', 'arrow_back', goBackBtn);

    const optionsBtn = TripDetails.createOptionsBtn();
    tripContainer.appendChild(optionsBtn);

    this.contentWrapper = createDOMElement('div', 'destinations-wrapper', null, tripContainer);

    createDOMElement('ul', 'pagination', null, tripContainer);

    const buttons = createDOMElement('div', 'trip-details-buttons', null, tripContainer);

    const addDestination = createDOMElement('button', 'btn waves-effect waves-light', 'Add Destination',
      buttons, ['id', 'add-destination']);
    createDOMElement('i', 'material-icons left', 'add', addDestination);

    const removeDestination = createDOMElement('button', 'btn waves-effect waves-light', 'Remove Destination',
      buttons, ['id', 'remove-destination']);
    createDOMElement('i', 'material-icons left', 'delete', removeDestination);

    const firstDestination = 1;
    this.fillDestination(firstDestination);

    return tripContainer;
  }

  static createOptionsBtn() {
    const btnWrapper = createDOMElement('div', 'options-btn');
    const content = `<div id="options-dropdown" class="drop-content">
                      <div class="drop-option" id="change-trip-name">Change trip name</div>
                      <div class="divider"></div>
                      <div class="drop-option" id="change-dates">Change dates</div>
                      <div class="divider"></div>
                      <div class="drop-option" id="remove-trip">Remove this trip</div>
                      <div class="tooltip"></div>
                    </div>
                    <div class="btn" data-target="options-dropdown">
                      <i class="material-icons">settings</i>
                    </div>`;

    btnWrapper.innerHTML = content;

    return btnWrapper;
  }

  fillDestination(destinationIndex) {
    const arrayIndex = destinationIndex - 1;
    const city = this.trip.tripRoute[arrayIndex];

    this.fillDestinationDetails(city, destinationIndex);
  }

  fillDestinationDetails(city, index) {
    const wrapper = createDOMElement('div', `destination-details ${city}`, null, null,
      ['id', `destination-${index}`]);

    const tripDetailsHeader = createDOMElement('div', 'trip-details-header', null, wrapper);
    createDOMElement('div', 'trip-title', this.trip.tripName, tripDetailsHeader);
    createDOMElement('div', 'trip-destination', city, tripDetailsHeader);
    createDOMElement('div', 'trip-date',
      `Trip date: <span>${this.trip.startDate}</span> - <span>${this.trip.endDate}</span>`,
      tripDetailsHeader);

    const map = createDOMElement('div', 'trip-icon map', null, wrapper);
    createDOMElement('img', null, null, map, ['src', './assets/images/icons/map.svg']);
    createDOMElement('span', null, 'Map', map);

    const sights = createDOMElement('div', 'trip-icon sights', null, wrapper);
    createDOMElement('img', null, null, sights, ['src', './assets/images/icons/cathedral.svg']);
    createDOMElement('span', null, 'Sights', sights);

    const notes = createDOMElement('div', 'trip-icon notes', null, wrapper);
    createDOMElement('img', null, null, notes, ['src', './assets/images/icons/test.svg']);
    createDOMElement('span', null, 'Notes', notes);

    const weather = createDOMElement('div', 'trip-icon weather', null, wrapper);
    createDOMElement('img', null, null, weather, ['src', './assets/images/icons/cloudy.svg']);
    createDOMElement('span', null, 'Weather', weather);

    const todo = createDOMElement('div', 'trip-icon todo', null, wrapper);
    createDOMElement('img', null, null, todo, ['src', './assets/images/icons/school.svg']);
    createDOMElement('span', null, 'To Do', todo);

    const important = createDOMElement('div', 'trip-icon important', null, wrapper);
    createDOMElement('img', null, null, important, ['src', './assets/images/icons/school.svg']);
    createDOMElement('span', null, 'Important', important);

    this.contentWrapper.appendChild(wrapper);
  }
}
