export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeToggle
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._isLiked = data.isLiked || false; // Use isLiked property for like state
    this._ownerId = data.ownerId || null; // Owner ID for delete button visibility
    this._currentUserId = data.currentUserId || null; // Current user ID to check for ownership
    this._cardSelector = cardSelector;

    // Callbacks
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeToggle = handleLikeToggle;

    // DOM Elements
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardTitle = this._element.querySelector('.card__title');

    this._setEventListeners();
    this._updateLikeState();
    this._checkDeleteButtonVisibility();
  }

  // Clone the card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    if (!cardElement) {
      throw new Error(`Card: Template with selector "${this._cardSelector}" not found`);
    }

    return cardElement;
  }

  // Set up event listeners for the card
  _setEventListeners() {
    // Image click event
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });

    // Like button event
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    // Delete button event
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId, this._element);
    });
  }

  // Toggle the like state
  _handleLikeButton() {
    this._handleLikeToggle(this._cardId, this._isLiked)
      .then((updatedIsLiked) => {
        this._isLiked = updatedIsLiked; // Update like state
        this._updateLikeState();
      })
      .catch((err) => {
        console.error(`Card: Error toggling like - ${err}`);
      });
  }

  // Update the like button state
  _updateLikeState() {
    this._likeButton.classList.toggle('liked', this._isLiked);
  }

  // Check if the delete button should be visible
  _checkDeleteButtonVisibility() {
    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.style.display = 'none'; // Hide delete button for non-owners
    }
  }

  // Render the card
  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
