// components/Api.js
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Method to check the response status
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // If the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  // Fetch user information
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to fetch user info: ${err}`);
      });
  }

  // Update user profile information
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to update user info: ${err}`);
      });
  }

  // Update user avatar
  updateUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to update user avatar: ${err}`);
      });
  }

  // Fetch initial cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to fetch initial cards: ${err}`);
      });
  }

  // Create a new card
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to add new card: ${err}`);
      });
  }

  // Delete a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to delete card: ${err}`);
      });
  }

  // Like a card
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to like card: ${err}`);
      });
  }

  // Dislike a card
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse)
      .catch((err) => {
        console.error(`Failed to dislike card: ${err}`);
      });
  }

  // Fetch both user info and initial cards
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .catch((err) => {
        console.error(`Failed to fetch app info: ${err}`);
      });
  }
}

// Initialize the Api class
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/groupId", // Replace 'groupId' with your group ID
  headers: {
    authorization: "d51ab04f-f0c7-488c-9ccf-8638ccbc2294",
    "Content-Type": "application/json",
  },
});

export { api };
