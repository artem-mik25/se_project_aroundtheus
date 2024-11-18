export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Method to check the response status
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
  }

  // Fetch user information
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error fetching user info:', err);
        throw err;
      });
  }

  // Update user profile information
  updateUserInfo({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about: job }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error updating user info:', err);
        throw err;
      });
  }

  // Update user avatar
  updateProfileImage(avatarUrl) {
    if (!avatarUrl) {
      return Promise.reject('Error: Avatar URL is required.');
    }

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error updating profile image:', err);
        throw err;
      });
  }

  // Fetch initial cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error fetching initial cards:', err);
        throw err;
      });
  }

  // Create a new card
  addCard({ name, link }) {
    if (!name || !link) {
      return Promise.reject('Error: Both name and link are required to add a card.');
    }

    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error adding card:', err);
        throw err;
      });
  }

  // Delete a card
  deleteCard(cardId) {
    if (!cardId) {
      return Promise.reject('Error: Card ID is required to delete a card.');
    }

    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error deleting card:', err);
        throw err;
      });
  }

  // Like a card
  likeCard(cardId) {
    if (!cardId) {
      return Promise.reject('Error: Card ID is required to like a card.');
    }

    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error liking card:', err);
        throw err;
      });
  }

  // Dislike a card
  dislikeCard(cardId) {
    if (!cardId) {
      return Promise.reject('Error: Card ID is required to dislike a card.');
    }

    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error disliking card:', err);
        throw err;
      });
  }

  // Fetch both user info and initial cards
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .catch((err) => {
        console.error('Error fetching app info:', err);
        throw err;
      });
  }
}
