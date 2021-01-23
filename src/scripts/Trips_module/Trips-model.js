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

  static async setToDatabase(tripObject, email) {
    const trip = tripObject;
    const userName = email.split('@')[0];

    const response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${userName}.json`, {
      method: 'POST',
      body: JSON.stringify(trip),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    trip.id = data.name;
    return trip;
  }

  static async getTripsFromDatabase() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const email = user.email;
    const userName = email.split('@')[0];

    let response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${userName}.json?`);
    let data = await response.json();
    if (data && data.error) {
      return `<p class="error">${response.error}</p>`;
    }

    return data ? Object.keys(data).map((key) => ({
      ...data[key],
      id: key
    })) : [];
  }

  static async getTripById(id) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userName = user.email.split('@')[0];

    let response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${userName}/${id}.json`);
    let data = await response.json();
    data.id = id;
    return data;
  }

  static async setNewDestination(tripId) {
    const inputNewDestination = document.getElementById('first-destination');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userName = user.email.split('@')[0];

    const response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${userName}/${tripId}/tripRoute.json`);
    const routeArray = await response.json();
    routeArray.push(inputNewDestination.value);

    const result = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${userName}/${tripId}/tripRoute.json`, {
      method: 'PUT',
      body: JSON.stringify(routeArray),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(result)
  }

  static async removeTripFromDatabase(id) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userName = user.email.split('@')[0];

    let response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${userName}/${id}.json`, {
      method: 'DELETE'
    });
    let data = await response.json();
    return data;
  }
}

// write and read database rules
// {
//   "rules": {
//     ".read": "now < 1612821600000",  // 2021-2-9
//     ".write": "now < 1612821600000",  // 2021-2-9
//   }
// }
