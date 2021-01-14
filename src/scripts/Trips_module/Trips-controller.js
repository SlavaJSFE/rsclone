import TripsView from './Trips-view.js';
import Materialize from 'materialize-css';
import TripsModel from './Trips-model.js';

export default class Trips {
  constructor(allTrips) {
    this.trips = allTrips;
  }

  init() {
    this.view = new TripsView();
    this.addTripEventListener();
  }

  addTripEventListener() {
    const newTripForm = document.getElementById('trip-create-form');
    this.view.myTripsContainer.addEventListener('click', (event) => this.handleTripsEvent(event));
    document.addEventListener('DOMContentLoaded', () => {
      const datepicker = document.querySelectorAll('.datepicker');
      Materialize.Datepicker.init(datepicker, {
        firstDay: 1
      });
    });
    newTripForm.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  handleTripsEvent(event) {
    if (event.target === this.view.newTripBtn) {
      this.view.modalWindow.classList.toggle('active');
    }
    if (event.target === this.view.closeModalBtn) {
      this.view.modalWindow.classList.toggle('active');
    }
    if (event.target.className && event.target.className.includes('trip-card-container')) {
      const currentTrip = event.target.className.split(' ')[1];
      this.view.showTrip(currentTrip);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const tripObject = TripsModel.setNewTrip();
    TripsModel.setToDatabase(tripObject).then((response) => {
      console.log('added to database', response);
    });
    this.view.setTripCard(tripObject);
    this.view.modalWindow.classList.toggle('active');
  }
}
