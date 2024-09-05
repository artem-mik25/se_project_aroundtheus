// components/PopupWithImage.js
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.modal__image');
    this._captionElement = this._popup.querySelector('.modal__caption');
  }

  // Overriding the open method to accept data and set image and caption
  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open(); // Call the parent class open method
  }
}
