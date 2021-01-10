import createDOMElement from './createDOMElement.js';

export default class TripCard {
  constructor(destination) {
    this.destination = destination;
    return this.createTripCard();
  }

  createTripCard() {
    const tripCardContainer = createDOMElement('div', 'trip-card-container', this.destination);
    return tripCardContainer;
  }
}
