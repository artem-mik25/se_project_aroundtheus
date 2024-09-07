export const initialCards = [
  {
    name: 'Yosemite Valley',
    link: new URL('../images/yosemite.jpg', import.meta.url),
  },
  {
    name: 'Lake Louise',
    link: new URL('../images/lake-louise.jpg', import.meta.url),
  },
  {
    name: 'Bald Mountains',
    link: new URL('../images/bald-mountains.jpg', import.meta.url),
  },
  {
    name: 'Latemar',
    link: new URL('../images/latemar.jpg', import.meta.url),
  },
  {
    name: 'Vanoise National Park',
    link: new URL('../images/vanoise.jpg', import.meta.url),
  },
  {
    name: 'Lago di Braies',
    link: new URL('../images/lago.jpg', import.meta.url),
  },
];

export const settings = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
};
