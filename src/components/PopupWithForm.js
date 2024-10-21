// components/PopupWithForm.js
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.modal__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.modal__input'));
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

  // Overriding setEventListeners to add form submit handling
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // Call the provided callback function
      this.close();  // Close the form popup after submit
    });
  }
}
