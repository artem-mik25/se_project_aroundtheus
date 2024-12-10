import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ModalConfirmDelete from '../components/ModalConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import '../pages/index.css';
import { settings } from '../utils/constants.js';

// Initialize API
const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: 'a44aa497-1b5c-4737-a030-aa953cdc7c47',
    'Content-Type': 'application/json',
  },
});

// Initialize User Info
const userInfo = new UserInfo({
  nameSelector: '#profile-title',
  jobSelector: '#profile-description',
  avatarSelector: '.profile__image',
});

// Validate DOM elements
const profileEditButton = document.querySelector('#profile__edit-button');
const addNewCardButton = document.querySelector('#profile-add-button');
const profileImageEditButton = document.querySelector('#profile-image-edit');

if (!profileEditButton || !addNewCardButton || !profileImageEditButton) {
  console.error('Error: One or more profile buttons not found in the DOM');
}

// Initialize Popups
const imagePopup = new PopupWithImage('#image-preview-modal');
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm('#profile-edit-modal', (formData) => {
  profilePopup.renderLoading(true);
  return api
    .updateUserInfo({ name: formData.title, job: formData.description })
    .then((updatedData) => {
      userInfo.setUserInfo({ name: updatedData.name, job: updatedData.about });
      profilePopup.close();
    })
    .catch((err) => {
      console.error(`Error updating profile: ${err}`);
      alert('Failed to update profile. Please try again.');
    })
    .finally(() => profilePopup.renderLoading(false));
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('#add-place-modal', (formData) => {
  addCardPopup.renderLoading(true);
  const cardData = { name: formData.title, link: formData.image };

  return api
    .addCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(`Error adding card: ${err}`);
      alert('Failed to add card. Please try again.');
    })
    .finally(() => addCardPopup.renderLoading(false));
});
addCardPopup.setEventListeners();

const confirmDeletePopup = new ModalConfirmDelete('#confirm-delete-modal', {
  handleFormSubmit: (cardId, cardElement) => {
    confirmDeletePopup.renderLoading(true);
    return api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.error(`Error deleting card: ${err}`);
        alert('Failed to delete card. Please try again.');
      })
      .finally(() => confirmDeletePopup.renderLoading(false));
  },
});
confirmDeletePopup.setEventListeners();

// Initialize Card Section
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  '.cards__list'
);

// Fetch and render user info and initial cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    if (userData) {
      userInfo.setUserInfo({ name: userData.name, job: userData.about });
      userInfo.setAvatar(userData.avatar);
    } else {
      console.warn('User data is not available');
    }

    if (Array.isArray(cardsData)) {
      cardSection.setItems(cardsData);
    } else {
      console.warn('Cards data is not an array:', cardsData);
    }
  })
  .catch((err) => {
    console.error(`Error fetching data: ${err}`);
  });

// Profile Edit Button
profileEditButton?.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputValues({
    title: currentUserInfo.name,
    description: currentUserInfo.job,
  });
  profilePopup.open();
});

// Add Card Button
addNewCardButton?.addEventListener('click', () => addCardPopup.open());

// Profile Avatar Edit
const avatarPopup = new PopupWithForm('#profile-image-modal', (formData) => {
  const avatarUrl = formData.image;

  if (!avatarUrl.trim()) {
    alert('Please provide a valid image URL.');
    return Promise.reject('Invalid URL');
  }

  avatarPopup.renderLoading(true);
  return api
    .updateProfileImage(avatarUrl)
    .then((updatedData) => {
      userInfo.setAvatar(updatedData.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(`Error updating avatar: ${err}`);
      alert('Failed to update avatar. Please try again.');
    })
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

profileImageEditButton?.addEventListener('click', () => avatarPopup.open());

// Create a new card
const createCard = (cardData) => {
  const card = new Card(
    cardData,
    '#card-template',
    (name, link) => {
      imagePopup.open({ name, link });
    },
    (cardId, cardElement) => {
      confirmDeletePopup.open(cardId, cardElement);
    },
    (cardId, isLiked) => {
      return isLiked ? api.dislikeCard(cardId) : api.likeCard(cardId);
    }
  );
  return card.getView();
};

// Enable form validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });
};

enableValidation(settings);
