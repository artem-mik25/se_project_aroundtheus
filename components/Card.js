// components/Card.js
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteButton();
    });
  }

  _handleLikeButton() {
    this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
