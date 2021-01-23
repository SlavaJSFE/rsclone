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
      const id = event.target.id;
      const tripDetails = await TripsModel.getTripById(id);

      this.view.showTrip(tripDetails);

      const tripDetailsContainer = document.querySelector('.trip-details');
      this.addTripDetailsListener(tripDetailsContainer);

      // const tripDetailsContainer = document.querySelector('.trip-details');
      // tripDetailsContainer.addEventListener('click', (e) => {
      //   this.handleTripDetailsEvent(e, tripDetailsContainer);
      // });
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

  addTripDetailsListener(tripDetailsContainer) {
    // ! make separate function for modal activation to avoid code duplicate
    this.modalWindow = document.getElementById('modal1');
    this.modal = Materialize.Modal.getInstance(this.modalWindow);
    const removeTripBtn = document.getElementById('remove-trip');
    const addDestinationBtn = document.getElementById('add-destination');
    const map = tripDetailsContainer.querySelector('.map');
    const sights = tripDetailsContainer.querySelector('.sights');
    const notes = tripDetailsContainer.querySelector('.notes');
    const weather = tripDetailsContainer.querySelector('.weather');
    const todo = tripDetailsContainer.querySelector('.todo');
    const currentCity = tripDetailsContainer.querySelector('.trip-destination').textContent;

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
    });

    map.addEventListener('click', () => {
      console.log(currentCity);
      this.view.showMap(currentCity);
    });

    sights.addEventListener('click', () => {
      console.log(currentCity);
    });

    notes.addEventListener('click', () => {
      this.view.showNotes();
    });

    weather.addEventListener('click', () => {
      this.view.showWeather(currentCity);
      console.log(currentCity);
    });

    todo.addEventListener('click', () => {
      console.log(currentCity);
    });
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
