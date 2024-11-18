export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    if (!this._popup) {
      throw new Error(`Popup: Element with selector "${popupSelector}" not found`);
    }

    this._handleEscClose = this._handleEscClose.bind(this); // Bind context
  }

  // Open the popup
  open() {
    this._popup.classList.add('modal_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Close the popup
  close() {
    this._popup.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Private method to close popup on Escape key
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Set event listeners for closing the popup
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      // Close on overlay click or close button click
      if (
        evt.target.classList.contains('modal__close') ||
        evt.target === this._popup
      ) {
        this.close();
      }
    });
  }
}
