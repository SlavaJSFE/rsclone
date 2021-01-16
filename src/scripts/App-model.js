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

  static setUserToSessionStorage(email, token) {
    sessionStorage.setItem('user', JSON.stringify({
      email,
      token
    }));
  }

  // static async getTripsFromDatabase(email, token) {
  //   const userName = email.split('@')[0];
  //   let response = await fetch(`https://rsclone-833d0-default-rtdb.firebaseio.com/${userName}.json?auth=${token}`);
  //   let data = await response.json();
  //   if (data && data.error) {
  //     return `<p class="error">${response.error}</p>`;
  //   }

  //   return data ? Object.keys(data).map((key) => ({
  //     ...data[key],
  //     id: key
  //   })) : [];
  // }
}
