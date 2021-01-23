export default class AppModel {
  static async authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDgKLFvYaOMMroest_opHKECaaiY4_lwaU';
    let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return data.idToken;
  }

  static setUserToSessionStorage(email) {
    sessionStorage.setItem('user', JSON.stringify({
      email
    }));
  }

  static getUserFromSessionStorage() {
    const user = sessionStorage.getItem('user');
    return user;
  }

  static removeUserFromSessionStorage() {
    sessionStorage.removeItem('user');
  }
}
