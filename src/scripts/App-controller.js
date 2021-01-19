import Materialize from 'materialize-css';
import Model from './App-model.js';
import TravelPlaningAppView from './App-view.js';
import Currency from './Currency_module/Currency';
import Clock from './Clock_module/Clock';
import Trips from './Trips_module/Trips-controller.js';
import Sights from './Sights_module/Sights.js';
import './Sights_module/EventsSights';

export default class TravelPlaningApp {
  static init() {
    this.model = Model;
    this.view = new TravelPlaningAppView(this.model);
    this.view.init();

    const clock1 = new Clock(null, 1, 'Minsk');
    clock1.createClockView().launchClock();

    const clock2 = new Clock(-3, 2, 'London');
    clock2.createClockView().launchClock();

    const currency = new Currency();
    currency.handleMethods();

    this.tripsComponent = new Trips();
    this.tripsComponent.init();
    // this.fillMainContentSection('home');

    this.addAppEventListener();
  }

  static addAppEventListener() {
    const navItemHome = document.getElementById('nav-home');
    const navItemMyTrips = document.getElementById('nav-my-trips');
    const navItemMap = document.getElementById('nav-map');
    const navItemNotes = document.getElementById('nav-notes');
    const navItemSights = document.getElementById('nav-sights');

    this.view.header.addEventListener('click', (event) => this.handleHeaderEvent(event.target));

    navItemHome.addEventListener('click', () => this.fillMainContentSection('home'));
    navItemMyTrips.addEventListener('click', () => this.fillMainContentSection('my-trips'));
    navItemMap.addEventListener('click', () => this.fillMainContentSection('map'));
    navItemNotes.addEventListener('click', () => this.fillMainContentSection('notes'));
    navItemSights.addEventListener('click', () => this.fillMainContentSection('sights'));

    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.querySelectorAll('.modal');
      Materialize.Modal.init(modal, { opacity: 0.6 });
    });
  }

  static handleHeaderEvent(target) {
    const authorization = this.view.header.querySelector('.authorization');
    this.modalWindow = document.getElementById('modal1');
    this.modal = Materialize.Modal.getInstance(this.modalWindow);

    if (target === authorization || target === authorization.children[0]) {
      this.view.fillModalAuth();
      this.modal.open();

      const form = document.getElementById('auth-form');
      form.addEventListener('submit', (event) => {
        this.handleAuth(event);
      });

      const closeModalBtn = document.getElementById('close-modal-btn');
      closeModalBtn.addEventListener('click', () => {
        this.modal.close();
      });
    }
  }

  static async handleAuth(event) {
    event.preventDefault();

    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    let token = await this.model.authWithEmailAndPassword(email, password);

    if (token) {
      this.model.setUserToSessionStorage(email);
      this.modal.close();
      this.modalWindow.innerHTML = '';

      this.tripsComponent.showUserTrips();
    }
  }

  static fillMainContentSection(currentItem) {
    if (currentItem === 'home') {
      this.view.mainContentSection.innerHTML = '<h3>Start Page</h3>';
    }
    if (currentItem === 'my-trips') {
      this.view.mainContentSection.innerHTML = '';
      const tripsComponent = new Trips();
      tripsComponent.init();
    }
    if (currentItem === 'map') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showMap();
    }
    if (currentItem === 'notes') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showNotes();
    }
    if (currentItem === 'sights') {
      const sights = new Sights();
      this.view.mainContentSection.innerHTML = '';
      sights.createSearcher();
    }
  }
}
