import createDOMElement from '../../services/createDOMElement';

export default function createTripCard(tripObject) {
  let tripRoute = '';
  tripObject.tripRoute.forEach((place) => {
    tripRoute = `${tripRoute + place} - `;
  });
  const route = tripRoute.slice(0, -3);

  const tripCardContainer = createDOMElement('div', 'card small');

  const cardImage = createDOMElement('div', 'card-image', null, tripCardContainer);
  createDOMElement('img', null, null, cardImage, ['src', 'http://lorempixel.com/400/200/nature']);
  createDOMElement('span', 'card-title', tripObject.tripName, cardImage);

  const cardContent = createDOMElement('div', 'card-content', null, tripCardContainer);
  createDOMElement('div', 'card-trip-route', `Trip Route: ${route}`, cardContent);
  createDOMElement('div', 'card-dates', `Trip Dates: ${tripObject.startDate} - ${tripObject.endDate}`, cardContent);

  const cardAction = createDOMElement('div', 'card-action', null, tripCardContainer);
  createDOMElement('a', 'trip-details-link', 'Details', cardAction, ['href', ''], ['id', `${tripObject.id}`]);

  return tripCardContainer;
}
