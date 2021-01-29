import constants from './constants/TravelPlaningApp-constants';

export default class AppModel {
  static async authWithEmailAndPassword(email, password) {
    const { apiKey } = constants;
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.localId;
  }

  static async signUp(email, password) {
    const { apiKey } = constants;
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.localId;
  }

  static setUserToSessionStorage(UID) {
    sessionStorage.setItem('user', JSON.stringify(UID));
  }

  static getUserFromSessionStorage() {
    const user = sessionStorage.getItem('user');
    return user;
  }

  static removeUserFromSessionStorage() {
    sessionStorage.removeItem('user');
  }
}
