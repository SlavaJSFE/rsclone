import Materialize from 'materialize-css';
import Model from './App-model.js';
import TravelPlaningAppView from './App-view.js';
import Currency from './Currency_module/Currency';
import Clock from './Clock_module/Clock';
import Trips from './Trips_module/Trips-controller.js';
import Sights from './Sights_module/Sights.js';
import './Sights_module/EventsSights';
import Map from './Map_module/Map';
import TODO from './TODO_module/TODO';

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

    // const map = new Map();
    // map.handleApi('london');

    // const todo = new TODO();
    // todo.createTODOElements();

    this.addAppEventListener();
  }

  static addAppEventListener() {
    this.view.header.addEventListener('click', (event) => this.handleHeaderEvent(event.target));
    this.view.navigation.addEventListener('click', (event) => this.handleNavEvent(event.target));
    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.querySelectorAll('.modal');
      Materialize.Modal.init(modal, { opacity: 0.6 });
    });
  }

  static handleNavEvent(target) {
    if (target.className && target.className.includes('nav-item')) {
      const currentItem = target.className.split(' ')[1];
      this.fillMainContentSection(currentItem);
    }
  }

  static handleHeaderEvent(target) {
    const authorization = this.view.header.querySelector('.authorization');
    this.modalWindow = document.getElementById('modal1');
    this.modal = Materialize.Modal.getInstance(this.modalWindow);

    if (target === authorization) {
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
    if (currentItem === 'todo') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showTODOList();
    }
  }
}
