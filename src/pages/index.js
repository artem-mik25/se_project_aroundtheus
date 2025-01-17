// index.js (or src/pages/index.js)

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

// 1) Initialize API
const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: 'a44aa497-1b5c-4737-a030-aa953cdc7c47',
    'Content-Type': 'application/json',
  },
});

// 2) Initialize UserInfo
const userInfo = new UserInfo({
  nameSelector: '#profile-title',
  jobSelector: '#profile-description',
  avatarSelector: '.profile__image',
});

// 3) DOM Elements
const profileEditButton = document.querySelector('#profile__edit-button');
const addNewCardButton = document.querySelector('#profile-add-button');
const profileImageEditButton = document.querySelector('#profile-image-edit');

// 4) Popups

// Image preview popup
const imagePopup = new PopupWithImage('#image-preview-modal');
imagePopup.setEventListeners();

// Profile edit popup
const profilePopup = new PopupWithForm('#profile-edit-modal', (formData) => {
  profilePopup.renderLoading(true);
  return api
    .updateUserInfo({ name: formData.title, job: formData.description })
    .then((updatedData) => {
      userInfo.setUserInfo({
        name: updatedData.name,
        job: updatedData.about,
      });
      profilePopup.close();
    })
    .catch((err) => {
      console.error(`Error updating profile: ${err}`);
      alert('Failed to update profile. Please try again.');
    })
    .finally(() => profilePopup.renderLoading(false));
});
profilePopup.setEventListeners();

// “Add place” popup
const addCardPopup = new PopupWithForm('#add-place-modal', (formData) => {
  addCardPopup.renderLoading(true);
  const cardData = { name: formData.title, link: formData.image };

  return api
    .addCard(cardData)
    .then((newCard) => {
      if (typeof newCard.isLiked !== 'boolean') {
        newCard.isLiked = false;
      }
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

// Delete confirmation popup
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

// Avatar edit popup
const avatarPopup = new PopupWithForm('#profile-image-modal', (formData) => {
  const avatarUrl = formData.image.trim();
  if (!avatarUrl) {
    alert('Please provide a valid image URL.');
    return Promise.reject('Invalid URL');
  }
  avatarPopup.renderLoading(true);
  return api
    .updateProfileImage(avatarUrl)
    .then((updatedData) => {
      userInfo.setUserInfo({
        name: updatedData.name,
        job: updatedData.about,
        avatar: updatedData.avatar, // ensure the server’s response has .avatar
      });
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(`Error updating avatar: ${err}`);
      alert('Failed to update avatar. Please try again.');
    })
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

// 5) Section for Cards
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      if (typeof cardData.isLiked !== 'boolean') {
        cardData.isLiked = false;
      }
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  '.cards__list'
);

// 6) Retrieve Data from Server
let currentUserId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    if (userData) {
      currentUserId = userData._id;
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
    } else {
      console.warn('No user data received');
    }

    if (Array.isArray(cardsData)) {
      cardsData.forEach((cardObj) => {
        if (typeof cardObj.isLiked !== 'boolean') {
          cardObj.isLiked = false;
        }
      });

      cardSection._renderedItems = cardsData;
      cardSection.renderItems();
    } else {
      console.warn('Cards data is not an array:', cardsData);
    }
  })
  .catch((err) => {
    console.error(`Error fetching data: ${err}`);
  });

// 7) Create Card Function
function createCard(cardData) {
  if (typeof cardData.isLiked !== 'boolean') {
    cardData.isLiked = false;
  }
  cardData.currentUserId = currentUserId;

  const card = new Card(
    cardData,
    '#card-template',
    (name, link) => {
      imagePopup.open({ name, link });
    },
    (cardId, cardElement) => {
      confirmDeletePopup.open(cardId, cardElement);
    },
<<<<<<< HEAD
    (cardId, wasLiked) => {
      if (wasLiked) {
        return api.dislikeCard(cardId).then((updatedCard) => {
          return updatedCard.isLiked;
        });
      } else {
        return api.likeCard(cardId).then((updatedCard) => {
          return updatedCard.isLiked;
        });
      }
=======
    (cardId) => {
      const isLiked = cardData.isLiked;
      return isLiked ? api.dislikeCard(cardId) : api.likeCard(cardId);
>>>>>>> origin/project-9
    }
  );
  return card.getView();
}

// 8) Hook Up Buttons
profileEditButton?.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  profilePopup.setInputValues({
    title: name,
    description: job,
  });
  profilePopup.open();
});

addNewCardButton?.addEventListener('click', () => {
  addCardPopup.open();
});

profileImageEditButton?.addEventListener('click', () => {
  avatarPopup.open();
});

// 9) Enable Form Validation
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });
}

enableValidation(settings);
