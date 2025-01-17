// components/FormValidator.js
<<<<<<< HEAD

=======
>>>>>>> origin/project-9
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement) {
<<<<<<< HEAD
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
=======
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
>>>>>>> origin/project-9
    if (!errorElement) {
      console.error('Error Element Not Found:', `#${inputElement.id}-error`);
      return;
    }
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
<<<<<<< HEAD
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
=======
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
>>>>>>> origin/project-9
    if (!errorElement) {
      console.error('Error Element Not Found:', `#${inputElement.id}-error`);
      return;
    }
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
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
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('reset', () => {
      this._inputList.forEach((inputElement) => {
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
