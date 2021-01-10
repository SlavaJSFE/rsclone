import createDOMElement from '../services/createDOMElement.js';

export default class TripDetails {
  constructor(id) {
    this.tripId = id;
    const tripDetails = this.createTripContent();
    return tripDetails;
  }

  createTripContent() {
    const tripContainer = createDOMElement('section', 'trip-details');
    const title = createDOMElement('h2', 'trip-title', `${this.tripId}`);
    const tripDate = createDOMElement('div', 'trip-date', 'Trip Date');
    const map = createDOMElement('div', 'trip-icon map', 'Map');
    const sites = createDOMElement('div', 'trip-icon attractions', 'Attractions');
    const notes = createDOMElement('div', 'trip-icon notes', 'Notes');
    const weather = createDOMElement('div', 'trip-icon weather', 'Weather');
    const aboutPlace = createDOMElement('div', 'trip-icon about-place', `About ${this.tripId}`);
    const important = createDOMElement('div', 'trip-icon important', 'Important');
    tripContainer.append(
      title,
      tripDate,
      map,
      sites,
      notes,
      weather,
      aboutPlace,
      important
    );
    return tripContainer;
  }
}
