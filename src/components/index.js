import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import '../pages/index.css';

// Initial Cards Data
const initialCards = [
  {
    name: 'Yosemite Valley',
    link: require('../images/yosemite.jpg'),
  },
  {
    name: 'Lake Louise',
    link: require('../images/lake-louise.jpg'),
  },
  {
    name: 'Bald Mountains',
    link: require('../images/bald-mountains.jpg'),
  },
  {
    name: 'Latemar',
    link: require('../images/latemar.jpg'),
  },
  {
    name: 'Vanoise National Park',
    link: require('../images/vanoise.jpg'),
  },
  {
    name: 'Lago di Braies',
    link: require('../images/lago.jpg'),
  },
];

// Wrappers and Elements
const cardsWrap = document.querySelector('.cards__list');
const profileEditButton = document.querySelector('#profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');

// Form Elements
const profileEditForm = document.forms['profile-form'];
const addCardFormElement = document.forms['card-form'];

// Validation Configuration
const validationConfig = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
};

// Enable Validation for Forms
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// Create an instance of UserInfo
const userInfo = new UserInfo({
  nameSelector: '#profile-title',
  jobSelector: '#profile-description',
});

// Create an instance of PopupWithForm for the profile edit form
const profileFormPopup = new PopupWithForm('#profile-edit-modal', (formData) => {
  // Update the user info with new data
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
});
profileFormPopup.setEventListeners();

// Handle opening the profile edit popup with pre-filled current user data
profileEditButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector('#profile-title-input').value = currentUserInfo.name;
  document.querySelector('#profile-description-input').value = currentUserInfo.job;
  profileFormPopup.open();
});

// Create an instance of PopupWithImage for the image popup
const imagePopup = new PopupWithImage('#image-preview-modal');
imagePopup.setEventListeners();

// Handle image click to open the image popup
const handleImageClick = (name, link) => {
  imagePopup.open({ name, link });
};

// Create a card and render it
const createCard = (cardData) => {
  const card = new Card(cardData, '#card-template', handleImageClick);
  return card.getView();
};

// Render cards on the page
const renderCard = (cardData, wrapper) => {
  const card = createCard(cardData);
  wrapper.prepend(card);
};

// Initial render of cards
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

// Create an instance of PopupWithForm for the add card form
const addPlaceFormPopup = new PopupWithForm('#add-place-modal', (formData) => {
  const cardData = { name: formData.title, link: formData.image };
  renderCard(cardData, cardsWrap); // Render the new card
});
addPlaceFormPopup.setEventListeners();

// Handle opening the add card popup
addNewCardButton.addEventListener('click', () => {
  addPlaceFormPopup.open();
});
