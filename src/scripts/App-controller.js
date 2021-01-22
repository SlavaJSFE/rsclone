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
import Weather from './Weather_module/Weather';

export default class TravelPlaningApp {
  static init() {
    this.model = Model;
    this.view = new TravelPlaningAppView(this.model);
    // this.view.init();

    // const clock1 = new Clock(null, 1, 'Minsk');
    // clock1.createClockView().launchClock();

    // const clock2 = new Clock(-3, 2, 'London');
    // clock2.createClockView().launchClock();

    // const currency = new Currency();
    // currency.handleMethods();

    // const navItemHome = document.getElementById('nav-home');
    // this.fillMainContentSection(navItemHome);

    // const map = new Map();
    // map.handleApi('london');

    // const todo = new TODO();
    // todo.createTODOElements();

    const weather = new Weather();
    weather.createSearchByCity();

    this.addAppEventListener();
  }

  static addAppEventListener() {
    const navItemHome = document.getElementById('nav-home');
    const navItemMyTrips = document.getElementById('nav-my-trips');
    const navItemMap = document.getElementById('nav-map');
    const navItemNotes = document.getElementById('nav-notes');
    const navItemSights = document.getElementById('nav-sights');
    const navItemTodo = document.getElementById('nav-todo');

    this.view.header.addEventListener('click', (event) => this.handleHeaderEvent(event.target));

    navItemHome.addEventListener('click', () => this.fillMainContentSection(navItemHome));
    navItemMyTrips.addEventListener('click', () => this.fillMainContentSection(navItemMyTrips));
    navItemMap.addEventListener('click', () => this.fillMainContentSection(navItemMap));
    navItemNotes.addEventListener('click', () => this.fillMainContentSection(navItemNotes));
    navItemSights.addEventListener('click', () => this.fillMainContentSection(navItemSights));
    navItemTodo.addEventListener('click', () => this.fillMainContentSection(navItemTodo));

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
    const previousNavItem = this.view.navigation.querySelector('.active');
    previousNavItem.classList.remove('active');

    if (currentItem.id === 'nav-home') {
      this.view.mainContentSection.innerHTML = '<h3>Start Page</h3>';
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-my-trips') {
      this.view.mainContentSection.innerHTML = '';
      const tripsComponent = new Trips();
      tripsComponent.init();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-map') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showMap();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-notes') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showNotes();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-sights') {
      const sights = new Sights();
      this.view.mainContentSection.innerHTML = '';
      sights.createSearcher();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-todo') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showTODOList();
      currentItem.classList.add('active');
    }
  }
}
