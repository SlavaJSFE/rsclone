import Materialize from 'materialize-css';
import TripsView from './Trips-view';
import TripsModel from './Trips-model';
import Sights from '../Sights_module/Sights';
import objTranslate from '../Language_module/sightsLang.component';
import { local } from '../constants/language';
import services from './services/tripsControllerServices';

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

        Trips.activateDatepicker();

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
    this.addOptionsListeners(this.tripDetailsContainer);
    this.addDestinationListeners();
  }

  async handleSubmit(event) {
    event.preventDefault();

    const UID = JSON.parse(sessionStorage.getItem('user'));
    const tripObject = TripsModel.setNewTrip();
    await TripsModel.setToDatabase(tripObject, UID);

    this.modal.close();
    this.view.setTripCard(tripObject);
    this.view.checkNoTrips();
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

    services.switchPagination(event, pagination, currentActive);

    const nextActive = pagination.querySelector('.active');

    if (nextActive !== currentActive) {
      this.showChosenDestination(pagination, nextActive);
    }
  }

  showChosenDestination(pagination, nextActive) {
    this.view.showDestinationDetails(nextActive);

    this.view.removeClocks();
    this.view.showClocks();

    this.addDestinationListeners();
    services.setArrowsDisabled(pagination, nextActive);
  }

  addTripDetailsListeners(tripDetailsContainer) {
    const goBackBtn = tripDetailsContainer.querySelector('.back-btn');
    const optionsBtn = tripDetailsContainer.querySelector('.options-btn');
    const removeDestinationBtn = document.getElementById('remove-destination');
    const addDestinationBtn = document.getElementById('add-destination');

    goBackBtn.addEventListener('click', () => {
      this.view.goBackToUserTrips();
    });

    optionsBtn.addEventListener('click', () => {
      this.view.handleOptionsDropdown();
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

    removeDestinationBtn.addEventListener('click', () => {
      this.view.fillRemoveDestinationModal(this.currentCity);
      this.modal.open();
      this.addListenerToCloseBtn();

      const removeDestinationModal = document.getElementById('remove-destination-modal');
      removeDestinationModal.addEventListener('click', (event) => {
        this.handleDestinationRemoveEvent(event, tripDetailsContainer.id);
      });
    });
  }

  addOptionsListeners(tripDetailsContainer) {
    const changeName = document.getElementById('change-trip-name');
    const changeDates = document.getElementById('change-dates');
    const removeTrip = document.getElementById('remove-trip');

    changeName.addEventListener('click', () => {
      this.view.fillChangeTripNameModal();
      this.modal.open();
      this.addListenerToCloseBtn();

      const form = document.getElementById('change-name-form');
      form.addEventListener('submit', (event) => {
        this.handleChangeNameSubmit(event, tripDetailsContainer.id);
      });
    });

    changeDates.addEventListener('click', () => {
      this.view.fillChangeDatesModal();
      Trips.activateDatepicker();
      this.modal.open();
      this.addListenerToCloseBtn();

      const form = document.getElementById('change-dates-form');
      form.addEventListener('submit', (event) => {
        this.handleChangeDatesSubmit(event, tripDetailsContainer.id);
      });
    });

    removeTrip.addEventListener('click', () => {
      this.view.fillRemoveTripModal();
      this.modal.open();
      this.addListenerToCloseBtn();

      const removeTripModal = document.getElementById('remove-trip-modal');
      removeTripModal.addEventListener('click', (event) => {
        this.handleTripRemoveEvent(event, tripDetailsContainer.id);
      });
    });
  }

  addDestinationListeners() {
    this.currentCity = this.tripDetailsContainer.querySelector('.trip-destination').textContent;
    this.map = this.tripDetailsContainer.querySelector('.map');
    this.sights = this.tripDetailsContainer.querySelector('.sights');
    this.notes = this.tripDetailsContainer.querySelector('.notes');
    this.weather = this.tripDetailsContainer.querySelector('.weather');
    this.todo = this.tripDetailsContainer.querySelector('.todo');
    this.important = this.tripDetailsContainer.querySelector('.important');

    this.map.addEventListener('click', () => {
      this.view.showMap(this.currentCity, this.tripDetailsContainer.id);
    });

    this.sights.addEventListener('click', () => {
      const sights = new Sights();
      this.view.mainContentSection.innerHTML = '';
      sights.createSightsInfo();
      sights.search(this.currentCity);
      document.querySelector('#search_form').innerHTML = `${objTranslate.sightsLang[`article_${local}`]
        } ${this.currentCity}`;
    });

    this.notes.addEventListener('click', () => {
      this.view.showNotes(this.currentCity, this.tripDetailsContainer.id);
    });

    this.weather.addEventListener('click', () => {
      this.view.showWeather(this.currentCity);
    });

    this.todo.addEventListener('click', () => {
      this.view.showTODO(this.currentCity, this.tripDetailsContainer.id);
    });

    this.important.addEventListener('click', () => {
      console.log(this.currentCity);
    });
  }

  async handleChangeNameSubmit(event, tripId) {
    event.preventDefault();

    await TripsModel.updateTripName(tripId);
    this.view.mainContentSection.innerHTML = '';
    this.init();

    const tripDetails = await TripsModel.getTripById(tripId);
    this.showTrip(tripDetails);

    this.modal.close();
  }

  async handleChangeDatesSubmit(event, tripId) {
    event.preventDefault();

    await TripsModel.updateTripDates(tripId);
    this.view.mainContentSection.innerHTML = '';
    this.init();

    const tripDetails = await TripsModel.getTripById(tripId);
    this.showTrip(tripDetails);

    this.modal.close();
  }

  async handleTripRemoveEvent(event, tripId) {
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

  async handleNewDestinationSubmit(event, tripId) {
    event.preventDefault();

    await TripsModel.setNewDestination(tripId);
    const updatedTrip = await TripsModel.getTripById(tripId);
    this.view.tripDetailsBlock.remove();
    this.showTrip(updatedTrip);

    const pagination = document.querySelector('.pagination');
    const currentActive = pagination.querySelector('.active');
    currentActive.classList.remove('active');
    const newDestinationPage = pagination.lastChild.previousSibling;
    newDestinationPage.classList.add('active');

    this.showChosenDestination(pagination, newDestinationPage);

    this.modal.close();
  }

  async handleDestinationRemoveEvent(event, tripId) {
    const cancelBtn = document.getElementById('cancel-remove-destination');
    const removeBtn = document.getElementById('remove-destination-permanently');

    if (event.target === cancelBtn) {
      this.modal.close();
    }
    if (event.target === removeBtn) {
      await TripsModel.removeDestination(tripId, this.currentCity);

      this.view.mainContentSection.innerHTML = '';
      this.init();

      const tripDetails = await TripsModel.getTripById(tripId);
      this.showTrip(tripDetails);

      this.modal.close();
    }
  }

  static activateDatepicker() {
    const datepicker = document.querySelectorAll('.datepicker');
    Materialize.Datepicker.init(datepicker, {
      firstDay: 1,
      format: 'dd.mm.yyyy',
    });
  }

  addListenerToCloseBtn() {
    const closeModalBtn = document.getElementById('close-modal-btn');
    closeModalBtn.addEventListener('click', () => {
      this.modal.close();
    });
  }
}
