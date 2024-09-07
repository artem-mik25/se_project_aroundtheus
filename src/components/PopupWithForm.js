import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);  // Fixed typo 'ppopupSelector' to 'popupSelector'
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

  // Overriding setEventListeners to add form submit handling
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // Call the provided callback function
      this._formElement.reset(); // Reset the form only after submission
      this.close(); // Close the form popup after submit
    });
  }


  close() {
    super.close();
  }
}
