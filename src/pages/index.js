// index.js
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ModalConfirmDelete from '../components/ModalConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { initialCards, settings } from '../utils/constants.js';
import '../pages/index.css';

// Wrappers and Elements
const cardsWrap = document.querySelector('.cards__list');
const profileEditButton = document.querySelector('#profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const avatarEditIcon = document.querySelector('.profile__avatar-container');

// Form Elements
const profileEditForm = document.forms['profile-form'];
const addCardFormElement = document.forms['card-form'];
const avatarEditFormElement = document.forms['avatar-form'];

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
  avatarSelector: '.profile__image'
});

// Create an instance of PopupWithForm for the profile edit form
const profileFormPopup = new PopupWithForm('#profile-edit-modal', (formData) => {
  profileFormPopup.renderLoading(true, 'Saving...'); // Show "Saving..." text
  
  // Simulate an API request or add your actual API request here
  setTimeout(() => {
    userInfo.setUserInfo({ name: formData.title, job: formData.description });
    profileFormPopup.renderLoading(false); // Reset button text
    profileFormPopup.close();  // Close the popup after submission
  }, 2000); // Simulated delay to demonstrate loading state
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

// Initialize the delete confirmation modal
const modalConfirmDelete = new ModalConfirmDelete('#confirm-delete-modal', {
  handleFormSubmit: (cardId, cardElement) => {
    // Perform deletion logic here (e.g., API call)
    cardElement.remove();
    modalConfirmDelete.close();
  },
});
modalConfirmDelete.setEventListeners();

// Create and render cards
const createCard = (cardData) => {
  const card = new Card(
    cardData,
    '#card-template',
    handleImageClick,
    (cardId, cardElement) => {
      modalConfirmDelete.open(cardId, cardElement);
    }
  );

  return card.getView();
};

const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    cardSection.addItem(cardElement);
  }
}, '.cards__list');

cardSection.renderItems();

// Create an instance of PopupWithForm for the add card form
const addPlaceFormPopup = new PopupWithForm('#add-place-modal', (formData) => {
  addPlaceFormPopup.renderLoading(true, 'Saving...'); // Show "Saving..." text

  const cardData = { name: formData.title, link: formData.image };

  // Prevent adding a card if the fields are empty or invalid
  if (!cardData.name.trim() || !cardData.link.trim()) {
    alert('Please fill out both the name and image URL fields.');
    addPlaceFormPopup.renderLoading(false); // Reset button text in case of validation error
    return;
  }

  setTimeout(() => {
    const newCard = createCard(cardData);
    cardSection.addItem(newCard);
    addPlaceFormPopup.renderLoading(false); // Reset button text
    addPlaceFormPopup.close();  // Close the popup after submission
  }, 2000); // Simulated delay to demonstrate loading state
});
addPlaceFormPopup.setEventListeners();

// Handle opening the add card popup
addNewCardButton.addEventListener('click', () => {
  addPlaceFormPopup.open();
});

// Create an instance of PopupWithForm for the avatar edit form
const avatarFormPopup = new PopupWithForm('#avatar-edit-modal', (formData) => {
  avatarFormPopup.renderLoading(true, 'Saving...'); // Show "Saving..." text

  const newAvatarLink = formData.avatar;

  // Simulate an API request or add your actual API request here
  setTimeout(() => {
    userInfo.setUserInfo({ avatar: newAvatarLink });
    avatarFormPopup.renderLoading(false); // Reset button text
    avatarFormPopup.close();  // Close the popup after submission
  }, 2000); // Simulated delay to demonstrate loading state
});
avatarFormPopup.setEventListeners();

// Handle opening the avatar edit popup
avatarEditIcon.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector('#avatar-input').value = currentUserInfo.avatar; // Pre-fill with the current avatar URL
  avatarFormPopup.open();
});
