import Popup from './Popup.js';

export default class ModalConfirmDelete extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.modal__form');
    this._submitButton = this._form.querySelector('.modal__button'); // Add reference to the submit button
    this._defaultButtonText = this._submitButton.textContent; // Store the default button text
  }

  // Method to render loading state
  renderLoading(isLoading, loadingText = 'Deleting...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true; // Disable the button during loading
    } else {
      this._submitButton.textContent = this._defaultButtonText;
      this._submitButton.disabled = false; // Re-enable the button after loading
    }
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardElement);
    });
  }
}
