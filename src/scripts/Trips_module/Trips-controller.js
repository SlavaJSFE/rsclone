import TripsView from './Trips-view.js';
import Materialize from 'materialize-css';
import TripsModel from './Trips-model.js';

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
      let user = sessionStorage.getItem('user');

      if (user) {
        this.view.fillNewTripModal();

        const datepicker = document.querySelectorAll('.datepicker');
        Materialize.Datepicker.init(datepicker, {
          firstDay: 1,
          format: 'dd.mm.yyyy'
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
      const id = event.target.id;
      const tripDetails = await TripsModel.getTripById(id);

      this.view.showTrip(tripDetails);

      const tripDetailsContainer = document.querySelector('.trip-details');
      tripDetailsContainer.addEventListener('click', (e) => {
        this.handleTripDetailsEvent(e, tripDetailsContainer);
      });
    }
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

  handleTripDetailsEvent(event, tripDetailsContainer) {
    // ! make separate function for modal activation to avoid code duplicate
    this.modalWindow = document.getElementById('modal1');
    this.modal = Materialize.Modal.getInstance(this.modalWindow);
    const removeTripBtn = document.getElementById('remove-trip');
    const addDestinationBtn = document.getElementById('add-destination');
    const map = tripDetailsContainer.querySelector('.map');
    const sights = tripDetailsContainer.querySelector('.sights');
    const notes = tripDetailsContainer.querySelector('.notes');
    const weather = tripDetailsContainer.querySelector('.weather');

    if (event.target === removeTripBtn) {
      this.view.fillRemoveTripModal();
      this.modal.open();
      this.addListenerToCloseBtn();

      const removeModal = document.getElementById('remove-trip-modal');
      removeModal.addEventListener('click', (e) => {
        this.handleTripRemoveModalEvent(e, tripDetailsContainer.id);
      });
    }

    if (event.target === addDestinationBtn) {
      this.view.fillAddDestinationModal();
      this.modal.open();
      this.addListenerToCloseBtn();
    }

    if (event.target === map) {
      console.log('map')
    }

    if (event.target === sights) {
      console.log('sights')
    }

    if (event.target === notes) {
      console.log('notes')
    }

    if (event.target === weather) {
      console.log('weather')
    }
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
