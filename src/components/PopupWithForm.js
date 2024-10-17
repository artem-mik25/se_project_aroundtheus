// components/PopupWithForm.js
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.modal__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.modal__input'));
    this._submitButton = this._formElement.querySelector('.modal__button');
    this._defaultSubmitButtonText = this._submitButton.textContent; // Store default button text
  }

  // Private method to collect input values from all form fields
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Overriding the open method to reset the form
  open() {
    super.open();
    this._formElement.reset();
  }

  // Method to render loading state for form submission
  renderLoading(isLoading, loadingText = 'Saving...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultSubmitButtonText;
    }
  }

  // Overriding setEventListeners to add form submit handling
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true); // Show loading state when form is submitted
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Overriding the close method to reset form and remove loading state
  close() {
    super.close();
    this._formElement.reset();
    this.renderLoading(false); // Reset loading state when popup is closed
  }
}
