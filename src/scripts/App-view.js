import services from './services/appViewServices';
import createDOMElement from './services/createDOMElement';
import Map from './Map_module/Map';
import TODO from './TODO_module/TODO';
import initIcon from './TravelIcon_module/initIcon';
import Note from './Notes_module/Notes';
import { clockInstance } from './Clock_module/Clock';

export default class TravelPlaningAppView {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.appWrapper = createDOMElement('div', 'app-wrapper');

    this.overlay = createDOMElement('div', 'overlay');

    document.body.prepend(this.overlay, this.appWrapper);

    this.createHeader();
    this.createMain();
    this.createFooter();

    initIcon();
  }

  createHeader() {
    this.header = services.createHeader();
    this.burger = services.createBurger();
    this.canvas = services.createCanvas();
    this.links = services.createHeaderLinks();
    this.modal = services.createModal();

    this.header.append(this.burger, this.canvas, this.links, this.modal);

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
    this.sideBar = createDOMElement('aside', 'side-bar z-depth-6');
    this.main.appendChild(this.sideBar);

    const clockWidget = createDOMElement('div', 'clock');
    const currencyWidget = createDOMElement('div', 'currency');
    const sideBarLabel = services.createSideBarLabel();

    this.sideBar.append(clockWidget, currencyWidget, sideBarLabel);
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
      'legend-container',
      [createDOMElement('h3', null, 'Legend')],
      null
    );
    const searchContainer = createDOMElement('div', 'search-container');

    const legendBtn = createDOMElement('div', 'legend-btn');

    this.mainContentSection.append(mapWidget, legendBtn, legend, searchContainer);

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
    return !!clock;
  };

  removeClocks() {
    this.clock = document.querySelector('#clock-container2');
    this.clock.remove();
    clockInstance.stopClock();
  }

  toggleNav() {
    this.overlay.classList.toggle('active');
    this.appWrapper.classList.toggle('active');
  }

  closeNav() {
    this.overlay.classList.remove('active');
    this.appWrapper.classList.remove('active');
  }
}
