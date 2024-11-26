import yosemite from '../images/yosemite.jpg';
import lakeLouise from '../images/lake-louise.jpg';
import baldMountains from '../images/bald-mountains.jpg';
import latemar from '../images/latemar.jpg';
import vanoise from '../images/vanoise.jpg';
import lago from '../images/lago.jpg';

export const initialCards = [
  {
    _id: '1',
    name: 'Yosemite Valley',
    link: yosemite,
  },
  {
    _id: '2',
    name: 'Lake Louise',
    link: lakeLouise,
  },
  {
    _id: '3',
    name: 'Bald Mountains',
    link: baldMountains,
  },
  {
    _id: '4',
    name: 'Latemar',
    link: latemar,
  },
  {
    _id: '5',
    name: 'Vanoise National Park',
    link: vanoise,
  },
  {
    _id: '6',
    name: 'Lago di Braies',
    link: lago,
  },
];

export const settings = {
  // Form input field selector
  inputSelector: '.modal__input',

  // Submit button selector
  submitButtonSelector: '.modal__button',

  // Class for a disabled submit button
  inactiveButtonClass: 'modal__button_disabled',

  // Class for an input field with an error
  inputErrorClass: 'modal__input_type_error',

  // Class to display error messages
  errorClass: 'modal__error_visible',
};
