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

  // Method to set values to the form inputs
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name] || ''; // Populate inputs with corresponding values or default to empty
    });
  }

  // Method to render loading state for form submission
  renderLoading(isLoading, loadingText = 'Saving...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true; // Disable the button during loading
    } else {
      this._submitButton.textContent = this._defaultSubmitButtonText;
      this._submitButton.disabled = false; // Re-enable the button after loading
    }
  }

  // Overriding setEventListeners to add form submit handling
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();

      this.renderLoading(true); // Show loading state when form is submitted

      // Call the form submit handler and ensure it returns a promise
      this._handleFormSubmit(inputValues)
        .then(() => {
          this.close(); // Close the form popup after successful submission
        })
        .catch((err) => {
          console.error(`Form submission error: ${err}`);
        })
        .finally(() => {
          this.renderLoading(false); // Reset loading state regardless of success or failure
        });
    });
  }

  // Overriding the close method to reset form and remove loading state
  close() {
    super.close();
    this._formElement.reset();
    this.renderLoading(false); // Reset loading state when popup is closed
  }
}
