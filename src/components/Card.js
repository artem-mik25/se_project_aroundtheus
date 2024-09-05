// components/Card.js
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate(); // Get card template
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardTitle = this._element.querySelector(".card__title");

    this._setEventListeners(); // Set event listeners on card elements
  }

  // Method to clone the card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true); // Clone the card structure

    return cardElement;
  }

  // Method to set up event listeners for the card
  _setEventListeners() {
    // Event listener for image click
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link); // Handle image click
    });

    // Event listener for like button click
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(); // Handle like button toggle
    });

    // Event listener for delete button click
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(); // Handle card deletion
    });
  }

  // Method to toggle the like button
  _handleLikeButton() {
    this._likeButton.classList.toggle("liked");
  }

  // Method to remove the card
  _handleDeleteButton() {
    this._element.remove();
    this._element = null; // Remove card from DOM and prevent memory leaks
  }

  // Method to render the card
  getView() {
    this._cardImage.src = this._link; // Set image source
    this._cardImage.alt = this._name; // Set alt text for the image
    this._cardTitle.textContent = this._name; // Set card title
    return this._element; // Return the card element
  }
}
