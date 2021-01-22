import services from './services/viewServices.js';
import createDOMElement from './services/createDOMElement.js';
import statement from './constants/TravelPlaningApp-constants.js';
import Map from '../scripts/Map_module/Map';
import TODO from './TODO_module/TODO';

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
  }

  createHeader() {
    this.header = services.createHeader();
    this.links = services.createHeaderLinks();
    this.modal = services.createModal();

    this.header.append(this.links, this.modal);

    this.appWrapper.appendChild(this.header);
  }

  createMain() {
    this.main = createDOMElement('main', 'main');
    this.appWrapper.appendChild(this.main);

    this.createNavigation();
    this.createMainContentSection();
    this.createSideBar();
  }

  createNavigation() {
    this.navigation = services.createNavigation();
    this.main.appendChild(this.navigation);
  }

  createMainContentSection() {
    this.mainContentSection = createDOMElement('section', 'main-content-section');
    this.main.appendChild(this.mainContentSection);
  }

  createSideBar() {
    this.sideBar = createDOMElement('aside', 'side-bar z-depth-4');
    this.main.appendChild(this.sideBar);

    const clockWidget = createDOMElement('div', 'clock');
    const currencyWidget = createDOMElement('div', 'currency');

    this.sideBar.append(clockWidget, currencyWidget);
  }

  createFooter() {
    this.footer = services.createFooter();
    this.appWrapper.appendChild(this.footer);
  }

  showMap() {
    const mapWidget = createDOMElement('div', 'map', null, null, ['id', 'map']);
    const content = createDOMElement('div', 'content');
    const legend = createDOMElement(
      'div',
      'legend',
      [createDOMElement('h3', null, 'Legend')],
      null,
      ['id', 'legend']
    );
    const searchContainer = createDOMElement('div', 'search-container');
    this.mainContentSection.append(mapWidget, content, legend, searchContainer);

    const map = new Map();
    map.staticInitMap();
  }

  showNotes() {
    const notesImage = createDOMElement('img', 'notes-image', null, null, ['src', statement.notes]);
    this.mainContentSection.appendChild(notesImage);
  }

  fillModalAuth() {
    services.fillModal(this.modal);
  }

  showTODOList() {
    createDOMElement('div', 'todo-container', null, this.mainContentSection);
    const todo = new TODO();
    todo.createTODOElements();
  }
}
