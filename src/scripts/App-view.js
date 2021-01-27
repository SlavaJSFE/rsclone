import services from './services/viewServices.js';
import createDOMElement from './services/createDOMElement.js';
import statement from './constants/TravelPlaningApp-constants.js';
import Map from '../scripts/Map_module/Map';
import TODO from './TODO_module/TODO';
import initIcon from '../scripts/TravelIcon_module/initIcon';
import Note from './Notes_module/Notes';
import { clockInstance } from '../scripts/Clock_module/Clock';

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

    initIcon();
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
    if (this.isInstanceClock()) {
      this.removeClocks();
    }

    const mapWidget = createDOMElement('div', 'map', null, null, ['id', 'map']);
    const legend = createDOMElement(
      'div',
      'legend',
      [createDOMElement('h3', null, 'Legend')],
      null,
      ['id', 'legend']
    );
    const searchContainer = createDOMElement('div', 'search-container');

    this.mainContentSection.append(mapWidget, legend, searchContainer);

    const map = new Map();
    map.staticInitMap();
  }

  showNotes() {
    if (this.isInstanceClock()) {
      this.removeClocks();
    }
    const noteContainer = createDOMElement('div', 'notes-container');
    this.mainContentSection.appendChild(noteContainer);
    const note = new Note();
    note.createNoteContainer();
  }

  fillModalAuth() {
    services.fillModal(this.modal);
  }

  fillModalRegistration() {
    services.fillModalSignUp(this.modal);
  }

  showTODOList() {
    if (this.isInstanceClock()) {
      this.removeClocks();
    }
    createDOMElement('div', 'todo-container', null, this.mainContentSection);
    const todo = new TODO();
    todo.createTODOElements();
  }

  changeAuthIcons(user) {
    this.logIn = this.links.querySelector('.log-in');
    this.logOut = this.links.querySelector('.log-out');
    this.singUp = this.links.querySelector('.sign-up');

    if (user) {
      this.logOut.classList.remove('hidden');
      this.logIn.classList.add('hidden');
      this.singUp.classList.add('hidden');
    } else {
      this.logOut.classList.add('hidden');
      this.logIn.classList.remove('hidden');
      this.singUp.classList.remove('hidden');
    }
  }

  isInstanceClock = () => {
    const clock = document.querySelector('#clock-container2');
    return clock ? true : false;
  };

  removeClocks() {
    const clock = document.querySelector('#clock-container2');
    clock.remove();
    clockInstance.stopClock();
  }
}
