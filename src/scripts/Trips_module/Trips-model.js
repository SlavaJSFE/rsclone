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
      endDate: inputEndDate.value,
      // placeToVisit: [inputDestination.value],
    };

    inputName.innerHTML = '';
    inputDestination.innerHTML = '';
    inputStartDate.innerHTML = '';
    inputEndDate.innerHTML = '';

    return newTrip;
  }

  static async setToDatabase(tripObject, UID) {
    const trip = tripObject;

    const response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}.json`, {
      method: 'POST',
      body: JSON.stringify(trip),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    trip.id = data.name;
    return trip;
  }

  static async getTripsFromDatabase() {
    const UID = JSON.parse(sessionStorage.getItem('user'));

    const response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}.json?`);
    const data = await response.json();
    if (data && data.error) {
      return `<p class="error">${response.error}</p>`;
    }

    return data ? Object.keys(data).map((key) => ({
      ...data[key],
      id: key,
    })) : [];
  }

  static async getTripById(id) {
    const UID = JSON.parse(sessionStorage.getItem('user'));

    const response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${id}.json`);
    const data = await response.json();
    data.id = id;
    return data;
  }

  static async updateTripName(tripId) {
    const inputNewName = document.getElementById('change-name-input');
    const UID = JSON.parse(sessionStorage.getItem('user'));

    await fetch(
      `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${tripId}/tripName.json`,
      {
        method: 'PUT',
        body: JSON.stringify(inputNewName.value),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  static async updateTripDates(tripId) {
    const inputStartDate = document.getElementById('change-start-date');
    const inputEndDate = document.getElementById('change-end-date');
    const UID = JSON.parse(sessionStorage.getItem('user'));

    if (inputStartDate.value) {
      await fetch(
        `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${tripId}/startDate.json`,
        {
          method: 'PUT',
          body: JSON.stringify(inputStartDate.value),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    if (inputEndDate.value) {
      await fetch(
        `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${tripId}/endDate.json`,
        {
          method: 'PUT',
          body: JSON.stringify(inputEndDate.value),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  }

  static async removeTripFromDatabase(id) {
    const UID = JSON.parse(sessionStorage.getItem('user'));

    const response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${id}.json`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }

  static async setNewDestination(tripId) {
    const inputNewDestination = document.getElementById('add-destination');
    const UID = JSON.parse(sessionStorage.getItem('user'));

    const response = await fetch(
      `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${tripId}/tripRoute.json`,
    );
    const routeArray = await response.json();
    routeArray.push(inputNewDestination.value);

    await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${tripId}/tripRoute.json`, {
      method: 'PUT',
      body: JSON.stringify(routeArray),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async removeDestination(tripId, destination) {
    const UID = JSON.parse(sessionStorage.getItem('user'));

    const response = await fetch(
      `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${tripId}/tripRoute.json`,
    );
    const routeArray = await response.json();
    const updatedRouteArray = routeArray.filter((place) => place !== destination);

    await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${tripId}/tripRoute.json`, {
      method: 'PUT',
      body: JSON.stringify(updatedRouteArray),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// write and read database rules
// {
//   "rules": {
//     ".read": "now < 1612821600000",  // 2021-2-9
//     ".write": "now < 1612821600000",  // 2021-2-9
//   }
// }
