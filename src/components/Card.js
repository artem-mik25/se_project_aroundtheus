// components/Card.js

export default class Card {
  /**
   * @param {Object} data
   * @param {string} data.name        - Card title
   * @param {string} data.link        - Card image URL
   * @param {string} data._id         - Card ID
   * @param {boolean} [data.isLiked]  - Whether this card is currently liked
   *
   * @param {string}   cardSelector
   * @param {Function} handleImageClick   - Called on image click
   * @param {Function} handleDeleteClick  - Called on trash icon click
   * @param {Function} handleLikeToggle   - (cardId, wasLiked) => returns Promise<boolean>
   */
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

    // By default, assume false if not provided
    this._isLiked = typeof data.isLiked === 'boolean' ? data.isLiked : false;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeToggle = handleLikeToggle;

    // DOM
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._setEventListeners();
    this._updateLikeState();
  }

  /**
   * Clones the card from the <template>.
   */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    if (!cardElement) {
      throw new Error(
        `Card: Could not find template with selector "${this._cardSelector}"`
      );
    }
    return cardElement;
  }

  /**
   * Set up listeners for image, like button, and delete button.
   */
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    // Always show the delete button (no ownership check)
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId, this._element);
    });
  }

  /**
   * Called when user clicks the heart; toggles isLiked via handleLikeToggle.
   */
  _handleLikeButton() {
    this._handleLikeToggle(this._cardId, this._isLiked)
      .then((newIsLiked) => {
        // newIsLiked is a boolean: true means now liked, false means unliked
        this._isLiked = newIsLiked;
        this._updateLikeState();
      })
      .catch((err) => {
        console.error('Card: Error toggling like:', err);
      });
  }

  /**
   * Update the heart icon based on the boolean _isLiked.
   */
  _updateLikeState() {
    // Switch the "liked" class on or off:
    this._likeButton.classList.toggle('liked', this._isLiked);
  }

  /**
   * Returns the fully populated card element.
   */
  getView() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
}
