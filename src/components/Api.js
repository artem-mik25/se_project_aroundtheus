class Api {
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
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    // Update user profile information
    updateUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
        .then(this._checkResponse);
    }
  
    // Update user avatar
    updateUserAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      })
        .then(this._checkResponse);
    }
  
    // Fetch initial cards
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    // Create a new card
    addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(this._checkResponse);
    }
  
    // Delete a card
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    // Like a card
    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    // Dislike a card
    dislikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    // Fetch both user info and initial cards
    getAppInfo() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }
  }
  
  // Initialize the Api class
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "d51ab04f-f0c7-488c-9ccf-8638ccbc2294",
      "Content-Type": "application/json"
    }
  });
  