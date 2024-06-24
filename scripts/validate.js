// Function to show input error
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.add(inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(errorClass);
    }
  }
  
  // Function to hide input error
  function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.remove(inputErrorClass);
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(errorClass);
    }
  }
  
  // Function to check input validity
  function checkInputValidity(formEl, inputEl, config) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, config);
    } else {
      hideInputError(formEl, inputEl, config);
    }
  }
  
  // Function to check if any input is invalid
  function hasInvalidInput(inputList) {
    return inputList.some((inputEl) => !inputEl.validity.valid);
  }
  
  // Function to toggle submit button state
  function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    const isFormInvalid = hasInvalidInput(inputEls);
    submitButton.classList.toggle(inactiveButtonClass, isFormInvalid);
    submitButton.disabled = isFormInvalid;
  }
  
  // Function to set event listeners on the form
  function setEventListeners(formEl, config) {
    const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
    const submitButton = formEl.querySelector(config.submitButtonSelector);
  
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity(formEl, inputEl, config);
        toggleButtonState(inputEls, submitButton, config);
      });
    });
  
    formEl.addEventListener("reset", () => {
      inputEls.forEach((inputEl) => {
        hideInputError(formEl, inputEl, config);
      });
      toggleButtonState(inputEls, submitButton, config);
    });
  }
  
  // Function to enable validation on forms
  function enableValidation(config) {
    const formEls = Array.from(document.querySelectorAll(config.formSelector));
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        // Check all inputs validity on form submit
        const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
        inputEls.forEach((inputEl) => {
          checkInputValidity(formEl, inputEl, config);
        });
        toggleButtonState(inputEls, formEl.querySelector(config.submitButtonSelector), config);
      });
      setEventListeners(formEl, config);
    });
  }
  
  // Configuration for validation
  const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
  
  // Enable validation with the given configuration
  enableValidation(config);
  