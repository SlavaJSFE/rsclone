import Materialize from 'materialize-css';
import Model from './App-model';
import TravelPlaningAppView from './App-view';
import Currency from './Currency_module/Currency';
import Clock from './Clock_module/Clock';
import Trips from './Trips_module/Trips-controller';
import Sights from './Sights_module/Sights';
import './Sights_module/EventsSights';
import services from './services/appControllerServices';
// import Banner from './Banner_module/Banner';
// import initBanner from './Banner_module/initBanner';
// import MainPageContent from './MainPageContent_module/MainPageContent';

export default class TravelPlaningApp {
  static init() {
    services.setLanguage();
    this.model = Model;
    this.view = new TravelPlaningAppView(this.model);
    this.view.init();

    const clock1 = new Clock();
    clock1.createClockView('Minsk', 1).launchClock();

    const currency = new Currency();
    currency.handleMethods();

    this.tripsComponent = new Trips();

    const navItemHome = document.getElementById('nav-home');
    this.fillMainContentSection(navItemHome);

    this.addConstDOMElements();
    this.addAppEventListener();
    this.checkAuth();
  }

  static addConstDOMElements() {
    this.logIn = this.view.header.querySelector('.log-in');
    this.logOut = this.view.header.querySelector('.log-out');
    this.signUp = this.view.header.querySelector('.sign-up');

    const modal = document.querySelectorAll('.modal');
    Materialize.Modal.init(modal, { opacity: 0.6 });
  }

  static addAppEventListener() {
    const langSwitcher = document.querySelector('.langSwitcher');
    const navItemHome = document.getElementById('nav-home');
    const navItemMyTrips = document.getElementById('nav-my-trips');
    const navItemMap = document.getElementById('nav-map');
    const navItemNotes = document.getElementById('nav-notes');
    const navItemSights = document.getElementById('nav-sights');
    const navItemTodo = document.getElementById('nav-todo');
    const overlay = document.querySelector('.overlay');
    const sideBarLabel = document.querySelector('.sidebar-label');

    this.view.header.addEventListener('click', (event) => this.handleHeaderEvent(event.target));

    langSwitcher.addEventListener('change', () => this.changeLanguage(langSwitcher));

    navItemHome.addEventListener('click', () => this.fillMainContentSection(navItemHome));
    navItemMyTrips.addEventListener('click', () => this.fillMainContentSection(navItemMyTrips));
    navItemMap.addEventListener('click', () => this.fillMainContentSection(navItemMap));
    navItemNotes.addEventListener('click', () => this.fillMainContentSection(navItemNotes));
    navItemSights.addEventListener('click', () => this.fillMainContentSection(navItemSights));
    navItemTodo.addEventListener('click', () => this.fillMainContentSection(navItemTodo));

    overlay.addEventListener('click', (event) => this.closeOverlay(event));
    sideBarLabel.addEventListener('click', this.handleSideBarLabelEvent);
  }

  static closeOverlay() {
    this.view.closeNav();
  }

  static handleHeaderEvent(target) {
    this.modalWindow = document.getElementById('modal1');
    this.modal = Materialize.Modal.getInstance(this.modalWindow);

    if (target.classList.value === 'burger-menu' || target.classList.value === 'burger-inner') {
      this.view.toggleNav();
    }

    if (target === this.logIn
        || target === this.logIn.children[0]
        || target === this.logIn.children[1]) {
      this.view.fillModalAuth();
      this.modal.open();

      const form = document.getElementById('auth-form');
      form.addEventListener('submit', (event) => {
        this.handleAuth(event);
      });

      this.addCloseListener();
    }

    if (target === this.logOut
        || target === this.logOut.children[0]
        || target === this.logOut.children[1]) {
      this.model.removeUserFromSessionStorage();
      this.checkMyTripsActive();
      this.view.changeAuthIcons();
    }

    if (target === this.signUp
      || target === this.signUp.children[0]
      || target === this.signUp.children[1]) {
      this.modal.open();
      this.view.fillModalRegistration();

      const form = document.getElementById('sign-up-form');
      form.addEventListener('submit', (event) => {
        this.handleSignUp(event);
      });

      this.addCloseListener();
    }
  }

  static async handleAuth(event) {
    event.preventDefault();

    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    const UID = await this.model.authWithEmailAndPassword(email, password);

    if (UID) {
      this.model.setUserToSessionStorage(UID);
      this.modalWindow.innerHTML = '';
      this.modal.close();
      this.view.changeAuthIcons('user');

      this.checkMyTripsActive();
    }
  }

  static async handleSignUp(event) {
    event.preventDefault();

    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    const UID = await this.model.signUp(email, password);

    if (UID) {
      this.model.setUserToSessionStorage(UID);
      this.modalWindow.innerHTML = '';
      this.modal.close();
      this.view.changeAuthIcons('user');

      this.checkMyTripsActive();
    }
  }

  static changeLanguage(langSwitcher) {
    const currentLanguage = langSwitcher.value;

    services.changeLanguage(currentLanguage);

    if (this.view.isInstanceClock()) {
      this.view.removeClocks();
    }

    window.location.reload();

    this.view.appWrapper.remove();
    TravelPlaningApp.init();
  }

  static fillMainContentSection(currentItem) {
    const previousNavItem = this.view.navigation.querySelector('.active');
    previousNavItem.classList.remove('active');

    if (currentItem.id === 'nav-home') {
      this.view.mainContentSection.innerHTML = '';
      if (this.view.isInstanceClock()) {
        this.view.removeClocks();
      }
      // Banner.createBanner();
      // initBanner();

      // MainPageContent.createMainPageContent();
      this.view.closeNav();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-my-trips') {
      this.view.mainContentSection.innerHTML = '';
      this.tripsComponent.init();
      this.view.closeNav();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-map') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showMap();
      this.view.closeNav();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-notes') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showNotes();
      this.view.closeNav();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-sights') {
      const sights = new Sights();
      this.view.mainContentSection.innerHTML = '';
      sights.createSightsInfo();
      this.view.closeNav();
      currentItem.classList.add('active');
    }

    if (currentItem.id === 'nav-todo') {
      this.view.mainContentSection.innerHTML = '';
      this.view.showTODOList();
      this.view.closeNav();
      currentItem.classList.add('active');
    }
  }

  static checkAuth() {
    const user = this.model.getUserFromSessionStorage();

    this.view.changeAuthIcons(user);
  }

  static checkMyTripsActive() {
    const currentNavItem = this.view.navigation.querySelector('.active');

    if (currentNavItem.id === 'nav-my-trips') {
      this.fillMainContentSection(currentNavItem);
    }
  }

  static addCloseListener() {
    const closeModalBtn = document.getElementById('close-modal-btn');
    closeModalBtn.addEventListener('click', () => {
      this.modal.close();
    });
  }

  static handleSideBarLabelEvent() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('active');
  }
}
