import createDOMElement from '../../services/createDOMElement.js';

export default function createTripCard(newTrip) {
  const tripCardContainer = createDOMElement('div', 'trip-card-container', newTrip.tripName);
  return tripCardContainer;
}
