// components/Popup.js
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); // Bind to ensure `this` references the class
  }

  // Public method to open the popup
  open() {
    this._popup.classList.add('modal_opened');
    document.addEventListener('keydown', this._handleEscClose); // Attach Esc key event
  }

  // Public method to close the popup
  close() {
    this._popup.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose); // Detach Esc key event
  }

  // Private method to close popup on Esc key press
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Public method to set event listeners (closing on click and close button)
  setEventListeners() {
    // Close the popup when clicking on the close button or outside the form
    this._popup.addEventListener('mousedown', (event) => {
      if (
        event.target.classList.contains('modal__close') ||
        event.target === this._popup
      ) {
        this.close();
      }
    });
  }
}
