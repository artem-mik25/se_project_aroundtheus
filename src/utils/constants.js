// utils/constants.js

export const initialCards = [
  {
    _id: '1',
    name: 'Yosemite Valley',
    link: require('../images/yosemite.jpg'),
  },
  {
    _id: '2',
    name: 'Lake Louise',
    link: require('../images/lake-louise.jpg'),
  },
  {
    _id: '3',
    name: 'Bald Mountains',
    link: require('../images/bald-mountains.jpg'),
  },
  {
    _id: '4',
    name: 'Latemar',
    link: require('../images/latemar.jpg'),
  },
  {
    _id: '5',
    name: 'Vanoise National Park',
    link: require('../images/vanoise.jpg'),
  },
  {
    _id: '6',
    name: 'Lago di Braies',
    link: require('../images/lago.jpg'),
  },
];

export const settings = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
};
