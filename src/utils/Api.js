class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(dir, method, data) {
    return fetch(`${this._baseUrl}/${dir}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  getUser() {
    return this._fetch('users/me', 'GET');
  }

  getCards() {
    return this._fetch('cards', 'GET');
  }

  setUser(data) {
    return this._fetch('users/me', 'PATCH', data);
  }

  setUserAvatar(data) {
    return this._fetch('users/me/avatar', 'PATCH', data);
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'dcd995c7-2c2d-4a8b-8d07-0386baa3ce28',
    'Content-Type': 'application/json',
  },
});

export default api;
