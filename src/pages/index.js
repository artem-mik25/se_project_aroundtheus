import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { initialCards, settings } from '../utils/constants.js';
import '../pages/index.css';

// Wrappers and Elements
const cardsWrap = document.querySelector('.cards__list');
const profileEditButton = document.querySelector('#profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');

// Form Elements
const profileEditForm = document.forms['profile-form'];
const addCardFormElement = document.forms['card-form'];

// Enable Validation for Forms
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });
};

enableValidation(settings);

// Create an instance of UserInfo
const userInfo = new UserInfo({
  nameSelector: '#profile-title',
  jobSelector: '#profile-description',
});

// Create an instance of PopupWithForm for the profile edit form
const profileFormPopup = new PopupWithForm('#profile-edit-modal', (formData) => {
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
  profileFormPopup.close();  // Close the popup after submission
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

// Create and render cards
const createCard = (cardData) => {
  const card = new Card(cardData, '#card-template', handleImageClick);
  return card.getView();
};

const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = createCard(cardData);
    cardSection.addItem(card);
  }
}, '.cards__list');

cardSection.renderItems();

// Create an instance of PopupWithForm for the add card form
const addPlaceFormPopup = new PopupWithForm('#add-place-modal', (formData) => {
  const cardData = { name: formData.title, link: formData.image };

  // Prevent adding a card if the fields are empty or invalid
  if (!cardData.name.trim() || !cardData.link.trim()) {
    alert('Please fill out both the name and image URL fields.');
    return;
  }

  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
  addPlaceFormPopup.close();  // Close the popup after submission
});
addPlaceFormPopup.setEventListeners();

// Handle opening the add card popup
addNewCardButton.addEventListener('click', () => {
  addPlaceFormPopup.open();
});
