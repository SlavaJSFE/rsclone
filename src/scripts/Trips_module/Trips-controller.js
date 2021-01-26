import Materialize from 'materialize-css';
import TripsView from './Trips-view';
import TripsModel from './Trips-model';
import Sights from '../../scripts/Sights_module/Sights.js';
import objTranslate from '../../scripts/Language_module/sightsLang.component';
import { local } from '../../scripts/Language_module/languageSwicher';

export default class Trips {
  init() {
    this.view = new TripsView();

    this.showUserTrips();
    this.addTripEventListener();
  }

  addTripEventListener() {
    this.view.myTripsContainer.addEventListener('click', (event) => this.handleTripsEvent(event));
  }

  async handleTripsEvent(event) {
    this.modalWindow = document.getElementById('modal1');
    this.modal = Materialize.Modal.getInstance(this.modalWindow);

    if (event.target === this.view.newTripBtn) {
      const user = sessionStorage.getItem('user');

      if (user) {
        this.view.fillNewTripModal();

        const datepicker = document.querySelectorAll('.datepicker');
        Materialize.Datepicker.init(datepicker, {
          firstDay: 1,
          format: 'dd.mm.yyyy',
        });

        this.modal.open();

        const form = document.getElementById('new-trip-form');
        form.addEventListener('submit', (e) => {
          this.handleSubmit(e);
        });
      } else {
        this.view.fillNotAuthModal();
        this.modal.open();
      }

      this.addListenerToCloseBtn();
    }

    if (event.target.className && event.target.className.includes('trip-details-link')) {
      event.preventDefault();

      const { id } = event.target;
      const tripDetails = await TripsModel.getTripById(id);
      this.showTrip(tripDetails);
      // const { id } = event.target;
      // const tripDetails = await TripsModel.getTripById(id);

      // this.view.showTrip(tripDetails);

      // const pagination = document.querySelector('.pagination');
      // pagination.addEventListener('click', (e) => {
      //   this.handlePagination(e, pagination);
      // });

      // this.tripDetailsContainer = document.querySelector('.trip-details');
      // this.addTripDetailsListeners(this.tripDetailsContainer);
      // this.addDestinationListeners();
    }
  }

  async showTrip(tripDetails) {
    this.view.showTrip(tripDetails);

    const pagination = document.querySelector('.pagination');
    pagination.addEventListener('click', (event) => {
      this.handlePagination(event, pagination);
    });

    this.tripDetailsContainer = document.querySelector('.trip-details');
    this.addTripDetailsListeners(this.tripDetailsContainer);
    this.addDestinationListeners();
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const tripObject = TripsModel.setNewTrip();
    await TripsModel.setToDatabase(tripObject, user.email);

    this.modal.close();
    this.view.setTripCard(tripObject);
  }

  async showUserTrips() {
    try {
      const tripsArray = await TripsModel.getTripsFromDatabase();
      this.view.renderTripsCards(tripsArray);
    } catch (error) {
      console.log(error);
    }
  }

  handlePagination(event, pagination) {
    event.preventDefault();

    const currentActive = pagination.querySelector('.active');
    const leftArrow = pagination.querySelector('.left-arrow');
    const rightArrow = pagination.querySelector('.right-arrow');
    const pageNumber = 'a';

    if (event.target === currentActive.firstChild) {
      return;
    }

    if (event.target.localName === pageNumber) {
      currentActive.classList.remove('active');
      event.target.closest('li').classList.add('active');
    }

    if (event.target === leftArrow && currentActive.previousSibling !== pagination.firstChild) {
      currentActive.classList.remove('active');
      currentActive.previousSibling.classList.add('active');
    }

    if (event.target === rightArrow && currentActive.nextSibling !== pagination.lastChild) {
      currentActive.classList.remove('active');
      currentActive.nextSibling.classList.add('active');
    }

    const nextActive = pagination.querySelector('.active');

    if (nextActive !== currentActive) {
      this.view.showDestinationDetails(nextActive);
      this.addDestinationListeners();
      Trips.setArrowsDisabled(pagination, nextActive);
    }
  }

  static setArrowsDisabled(pagination, currentActive) {
    if (currentActive.nextSibling === pagination.lastChild) {
      pagination.lastChild.classList.add('disabled');
    } else {
      pagination.lastChild.classList.remove('disabled');
    }

    if (currentActive.previousSibling === pagination.firstChild) {
      pagination.firstChild.classList.add('disabled');
    } else {
      pagination.firstChild.classList.remove('disabled');
    }
  }

  addTripDetailsListeners(tripDetailsContainer) {
    // ! make separate function for modal activation to avoid code duplicate
    this.modalWindow = document.getElementById('modal1');
    this.modal = Materialize.Modal.getInstance(this.modalWindow);
    const goBackBtn = tripDetailsContainer.querySelector('.back-btn');
    const optionsBtn = tripDetailsContainer.querySelector('.options-btn');
    const removeTripBtn = document.getElementById('remove-trip');
    const addDestinationBtn = document.getElementById('add-destination');

    goBackBtn.addEventListener('click', () => {
      this.view.goBackToUserTrips();
    });

    optionsBtn.addEventListener('click', () => {
      this.view.handleOptionsDropdown();
    });

    removeTripBtn.addEventListener('click', () => {
      this.view.fillRemoveTripModal();
      this.modal.open();
      this.addListenerToCloseBtn();

      const removeModal = document.getElementById('remove-trip-modal');
      removeModal.addEventListener('click', (event) => {
        this.handleTripRemoveModalEvent(event, tripDetailsContainer.id);
      });
    });

    addDestinationBtn.addEventListener('click', () => {
      this.view.fillAddDestinationModal();
      this.modal.open();
      this.addListenerToCloseBtn();

      const form = document.getElementById('new-destination-form');
      form.addEventListener('submit', (event) => {
        this.handleNewDestinationSubmit(event, tripDetailsContainer.id);
      });
    });
  }

  addDestinationListeners() {
    const currentCity = this.tripDetailsContainer.querySelector('.trip-destination').textContent;
    this.map = this.tripDetailsContainer.querySelector('.map');
    this.sights = this.tripDetailsContainer.querySelector('.sights');
    this.notes = this.tripDetailsContainer.querySelector('.notes');
    this.weather = this.tripDetailsContainer.querySelector('.weather');
    this.todo = this.tripDetailsContainer.querySelector('.todo');
    this.important = this.tripDetailsContainer.querySelector('.important');

    this.map.addEventListener('click', () => {
      console.log(currentCity);
      this.view.showMap(currentCity, this.tripDetailsContainer.id);
    });

    this.sights.addEventListener('click', () => {
      console.log(currentCity);
      let sights = new Sights();
      document.querySelector('.main-content-section').innerHTML = '';
      sights.createSightsInfo();
      sights.search(currentCity);
      document.querySelector('#search_form').innerHTML = `${
        objTranslate.sightsLang['article_' + local]
      } ${currentCity}`;
    });

    this.notes.addEventListener('click', () => {
      this.view.showNotes(this.tripDetailsContainer.id);
    });

    this.weather.addEventListener('click', () => {
      this.view.showWeather(currentCity);
      console.log(currentCity);
    });

    this.todo.addEventListener('click', () => {
      this.view.showTODO(currentCity, this.tripDetailsContainer.id);
      console.log(currentCity);
    });

    this.important.addEventListener('click', () => {
      console.log(currentCity);
    });
  }

  async handleNewDestinationSubmit(event, tripId) {
    event.preventDefault();

    await TripsModel.setNewDestination(tripId);
    const updatedTrip = await TripsModel.getTripById(tripId);
    this.view.tripDetailsBlock.remove();
    this.showTrip(updatedTrip);

    const currentDestination = this.view.tripDetailsBlock.querySelector('.destination-details');
    const lastDestination = updatedTrip.tripRoute.length;
    currentDestination.remove();
    this.view.trip.fillDestination(lastDestination);

    this.modal.close();
  }

  async handleTripRemoveModalEvent(event, tripId) {
    const cancelBtn = document.getElementById('cancel-remove-trip');
    const removeBtn = document.getElementById('remove-trip-permanently');

    if (event.target === cancelBtn) {
      this.modal.close();
    }
    if (event.target === removeBtn) {
      await TripsModel.removeTripFromDatabase(tripId);
      this.view.mainContentSection.innerHTML = '';
      this.init();
      this.modal.close();
    }
  }

  addListenerToCloseBtn() {
    const closeModalBtn = document.getElementById('close-modal-btn');
    closeModalBtn.addEventListener('click', () => {
      this.modal.close();
    });
  }
}

// OpenTripMap apiKey:
// 5ae2e3f221c38a28845f05b6d6abeebb861dd05be680cb6c5c452fa0
