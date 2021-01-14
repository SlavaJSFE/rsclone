export default class TripsModel {
  static setNewTrip() {
    const inputName = document.getElementById('trip-name');
    const inputDestination = document.getElementById('first-destination');
    const inputStartDate = document.getElementById('start-date');
    const inputEndDate = document.getElementById('end-date');

    const newTrip = {
      tripName: inputName.value,
      tripRoute: [inputDestination.value],
      startDate: inputStartDate.value,
      endDate: inputEndDate.value
    };

    inputName.innerHTML = '';
    inputDestination.innerHTML = '';
    inputStartDate.innerHTML = '';
    inputEndDate.innerHTML = '';

    return newTrip;
  }

  static setToDatabase(tripObject) {
    const trip = tripObject;
    return fetch('https://rsclone-833d0-default-rtdb.firebaseio.com/trips.json', {
      method: 'POST',
      body: JSON.stringify(trip),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        trip.id = response.name;
        return trip;
      });
  }

  // static getFromDatabase() {
  //   return fetch('https://rsclone-833d0-default-rtdb.firebaseio.com/trips.json', {
  //     method: 'GET'
  //   })
  //     .then(response => )
  // }
}
