import createDOMElement from '../../services/createDOMElement';
import translate from '../../Language_module/tripCardLang';
import { local } from '../../constants/language';

export default function createTripCard(tripObject) {
  const route = translate[`route_${local}`];
  const dates = translate[`dates_${local}`];
  const details = translate[`details_${local}`];

  let tripsPlaces = '';
  tripObject.tripRoute.forEach((place) => {
    tripsPlaces = `${tripsPlaces + place} - `;
  });
  const routeArr = tripsPlaces.slice(0, -3);

  const tripCardContainer = createDOMElement('div', 'card small');

  const cardImage = createDOMElement('div', 'card-image', null, tripCardContainer);
  createDOMElement('img', null, null, cardImage, ['src', './assets/images/architecture-3095716_640.jpg']);
  createDOMElement('span', 'card-title', tripObject.tripName, cardImage);

  const cardContent = createDOMElement('div', 'card-content', null, tripCardContainer);
  createDOMElement('div', 'card-trip-route', `${route}: ${routeArr}`, cardContent);
  createDOMElement('div', 'card-dates', `${dates}: ${tripObject.startDate} - ${tripObject.endDate}`, cardContent);

  const cardAction = createDOMElement('div', 'card-action', null, tripCardContainer);
  createDOMElement('a', 'trip-details-link', details, cardAction, ['href', ''], ['id', `${tripObject.id}`]);

  return tripCardContainer;
}
