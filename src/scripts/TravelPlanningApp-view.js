import services from './services/viewServices.js';
import createDOMElement from './services/createDOMElement.js';
import statement from './constants/TravelPlaningApp-constants.js';
import TripCard from './services/TripCard.js';

export default class TravelPlaningAppView {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.appWrapper = createDOMElement('div', 'app-wrapper');
    document.body.prepend(this.appWrapper);

    this.createHeader();
    this.createMain();
    this.createFooter();

    this.fillMainContentSection('my-trips');
  }

  createHeader() {
    this.header = services.createHeader();
    this.appWrapper.appendChild(this.header);

    this.createHeaderOptions();
  }

  createHeaderOptions() {
    const authorization = createDOMElement('div', 'authorization');
    const language = createDOMElement('div', 'language');
    this.options = createDOMElement('div', 'options');

    this.options.append(authorization, language);
    this.header.appendChild(this.options);
  }

  createMain() {
    this.main = createDOMElement('main', 'main');
    this.appWrapper.appendChild(this.main);

    this.createNavigation();
    this.createMainContentBlock();
    this.createSideBar();
  }

  createNavigation() {
    this.navigation = services.createNavigation();
    this.main.appendChild(this.navigation);
  }

  createMainContentBlock() {
    this.mainContentSection = createDOMElement('section', 'main-content-section');
    this.main.appendChild(this.mainContentSection);
  }

  createSideBar() {
    this.sideBar = createDOMElement('aside', 'side-bar');
    this.main.appendChild(this.sideBar);

    const clockWidget = createDOMElement('div', 'clock');
    const mapWidget = createDOMElement('div', 'map');
    const currencyWidget = createDOMElement('div', 'currency');

    this.sideBar.append(clockWidget, mapWidget, currencyWidget);
  }

  createFooter() {
    this.footer = services.createFooter();
    this.appWrapper.appendChild(this.footer);
  }

  fillMainContentSection(content) {
    if (content === 'my-trips') {
      this.showMyTrips();
    }
    if (content === 'map') {
      this.showMap();
    }
    if (content === 'notes') {
      this.showNotes();
    }
  }

  showMyTrips() {
    this.mainContentSection.innerHTML = '';
    this.myTripsContainer = createDOMElement('div', 'trips-container');
    this.newTripBtn = createDOMElement('button', 'new-trip-btn', 'New Trip');

    this.myTripsContainer.appendChild(this.newTripBtn);

    this.mainContentSection.appendChild(this.myTripsContainer);

    this.createTripsModalWindow();
  }

  createTripsModalWindow() {
    this.modalWindow = createDOMElement('div', 'trips-modal');
    this.closeSpan = createDOMElement('span', 'trip-modal-close');
    this.closeCircle = createDOMElement('div', 'trip-close-circle', this.closeSpan);
    const input = `<div class="select">
                      <p>Enter destination</p>
                      <input class="destination-input" type="text" name="destination" value=""><br>
                      <button class="submit-btn">Submit</button>
                    </div>`;

    this.modalWindow.innerHTML = input;
    this.modalWindow.prepend(this.closeCircle);
    this.myTripsContainer.appendChild(this.modalWindow);
  }

  createTripCard(destination) {
    const tripCard = new TripCard(destination);
    this.myTripsContainer.appendChild(tripCard);
  }

  showMap() {
    const mapImage = createDOMElement('img', 'map-image', '', '', ['src', statement.map]);
    this.mainContentSection.innerHTML = '';
    this.mainContentSection.appendChild(mapImage);
  }

  showNotes() {
    const notesImage = createDOMElement('img', 'notes-image', '', '', ['src', statement.notes]);
    this.mainContentSection.innerHTML = '';
    this.mainContentSection.appendChild(notesImage);
  }
}
