class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;    
    this._headers = headers
  }

  _fetch(dir, method, data) {
    return fetch(`${this._baseUrl}/${dir}`, {
      method: method,
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
    });
  }

  register(data) {
    return this._fetch('signup', 'POST', data);
  }

  login(data) {
    return this._fetch('signin', 'POST', data);
  }

  logout() {
    return this._fetch('signout', 'POST');
  }

  getUser() {
    return this._fetch('users/me', 'GET');
  }

  setUser(data) {
    return this._fetch('users/me', 'PATCH', data);
  }

  setUserAvatar(data) {
    return this._fetch('users/me/avatar', 'PATCH', data);
  }

  getCards() {
    return this._fetch('cards', 'GET');
  }

  addCard(data) {
    return this._fetch('cards', 'POST', data);
  }

  deleteCard(cardId) {
    return this._fetch(`cards/${cardId}`, 'DELETE');
  }

  changeLikeCardStatus(cardId, toLike) {
    if (toLike) {
      return this._fetch(`cards/${cardId}/likes`, 'PUT');
    } else {
      return this._fetch(`cards/${cardId}/likes`, 'DELETE');
    }
  }
}

const api = new Api({
  baseUrl: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
