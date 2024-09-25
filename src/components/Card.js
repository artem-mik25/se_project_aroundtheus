// components/Card.js
export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id; // Ensure _id is present in card data
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick; // Store the handleDeleteClick callback

    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardTitle = this._element.querySelector(".card__title");

    this._setEventListeners();
  }

  // Method to clone the card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Method to set up event listeners for the card
  _setEventListeners() {
    // Event listener for image click
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    // Event listener for like button click
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Event listener for delete button click
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId, this._element);
    });
  }

  // Method to toggle the like button
  _handleLikeButton() {
    this._likeButton.classList.toggle("liked");
  }

  // Method to render the card
  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._element;
  }
}
