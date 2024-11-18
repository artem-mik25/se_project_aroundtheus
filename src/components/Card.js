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
    this._likes = data.likes || [];
    this._ownerId = data.ownerId || null; // Owner ID for delete button visibility
    this._currentUserId = data.currentUserId || null; // Current user ID to check for likes
    this._cardSelector = cardSelector;

    // Callbacks
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeToggle = handleLikeToggle;

    // DOM Elements
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-count');
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

  // Toggle the like state and update the counter
  _handleLikeButton() {
    this._handleLikeToggle(this._cardId)
      .then((updatedLikes) => {
        this._likes = updatedLikes; // Update likes array
        this._updateLikeState();
      })
      .catch((err) => {
        console.error(`Card: Error toggling like - ${err}`);
      });
  }

  // Update the like button state and like counter
  _updateLikeState() {
    const isLiked = this._likes.some((user) => user._id === this._currentUserId);
    this._likeButton.classList.toggle('liked', isLiked);

    // Update the like counter if it exists in the DOM
    if (this._likeCounter) {
      this._likeCounter.textContent = this._likes.length || 0;
    }
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

    // Update the like counter if it exists
    if (this._likeCounter) {
      this._likeCounter.textContent = this._likes.length || 0;
    }

    return this._element;
  }
}
