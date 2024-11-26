import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.modal__image');
    this._captionElement = this._popup.querySelector('.modal__caption');

    if (!this._imageElement || !this._captionElement) {
      throw new Error('PopupWithImage: Required elements not found in the DOM');
    }
  }

  // Open the popup with the image and caption data
  open({ name, link }) {
    if (!name || !link) {
      console.warn('PopupWithImage: Missing "name" or "link" data');
      return;
    }

    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;

    super.open(); // Call the parent class's open method
  }
}
