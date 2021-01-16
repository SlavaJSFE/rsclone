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

  handleTripsEvent(event) {
    if (event.target === this.view.newTripBtn) {
      let user = sessionStorage.getItem('user');

      if (user) {
        this.modalWindow = document.getElementById('modal1');
        this.modal = Materialize.Modal.getInstance(this.modalWindow);

        this.view.fillNewTripModal();

        const datepicker = document.querySelectorAll('.datepicker');
        Materialize.Datepicker.init(datepicker, {
          firstDay: 1
        });

        // this.modal.open();
        // document.addEventListener('DOMContentLoaded', () => {
        //   Materialize.updateTextFields();
        // });

        const form = document.getElementById('new-trip-form');
        form.addEventListener('submit', (e) => {
          this.handleSubmit(e);
        }, { once: true });
      } else {
        console.log('you are not signed in')
      }
    }
    if (event.target === this.view.closeModalBtn) {
      this.view.modalWindow.classList.toggle('active');
    }
    if (event.target.className && event.target.className.includes('trip-card-container')) {
      const currentTrip = event.target.className.split(' ')[1];
      this.view.showTrip(currentTrip);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const tripObject = TripsModel.setNewTrip();
    const response = await TripsModel.setToDatabase(tripObject, user.email);

    console.log('added to database', response);

    this.view.setTripCard(tripObject);
    this.view.modalWindow.classList.toggle('active');
  }

  async showUserTrips() {
    try {
      const tripsArray = await TripsModel.getTripsFromDatabase();
      this.view.renderTripsCards(tripsArray);
    } catch (error) {

    }
  }
}
