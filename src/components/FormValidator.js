export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement) {
    if (!inputElement.id) {
      console.warn('Input element is missing an "id" attribute. Skipping validation for this input.');
      return;
    }

    let errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    // Dynamically create the error element if missing
    if (!errorElement) {
      console.warn(`Error element for input "${inputElement.id}" not found. Creating it dynamically.`);
      errorElement = document.createElement('span');
      errorElement.id = `${inputElement.id}-error`;
      errorElement.classList.add(this._config.errorClass);
      inputElement.insertAdjacentElement('afterend', errorElement);
    }

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    if (!inputElement.id) {
      console.warn('Input element is missing an "id" attribute. Skipping error hiding for this input.');
      return;
    }

    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._config.errorClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('reset', () => {
      this._inputList.forEach(inputElement => {
        this._hideInputError(inputElement);
      });
      setTimeout(() => {
        this._toggleButtonState();
      }, 1);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
