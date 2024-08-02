// pages/index.js
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Initial Cards Data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago.jpg",
  },
];

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-place-modal");
const cardImageModal = document.querySelector("#image-preview-modal");
const cardImageModalImage = document.querySelector("#image-preview");
const cardImageModalTitle = document.querySelector("#image-caption");

// Form Elements
const profileEditForm = document.forms["profile-form"];
const addCardFormElement = document.forms["card-form"];

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModalClose = document.querySelector("#profile-edit-close");
const addCardModalClose = document.querySelector("#add-place-close");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardImageModalClose = document.querySelector("#image-preview-close");
const closeButtons = document.querySelectorAll('.modal__close');

// Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const cardTitleInput = document.querySelector("#place-title-input");
const cardUrlInput = document.querySelector("#place-image-input");

// Profile Elements
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");

// Validation Config
const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Form Validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// Functions
document.addEventListener("DOMContentLoaded", () => {
  const modalList = document.querySelectorAll(".modal");

  modalList.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal(modal);
      }
    });
  });
});

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalByPressingESCKey);
  }
}

function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeModalByPressingESCKey);
  }
}

function closeModalByPressingESCKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    if (modal) closeModal(modal);
  }
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, wrapper) {
  const card = createCard(cardData);
  wrapper.prepend(card);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  profileEditForm.reset();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
}

const handleImageClick = (name, link) => {
  cardImageModalImage.src = link;
  cardImageModalImage.alt = name;
  cardImageModalTitle.textContent = name;
  openModal(cardImageModal);
};

// Universal handler for close buttons
closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});

// Form Listeners
if (profileEditForm) profileEditForm.addEventListener("submit", handleProfileEditSubmit);
if (addCardFormElement) addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
if (profileEditButton) profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
if (addNewCardButton) addNewCardButton.addEventListener("click", () => openModal(addCardModal));

// Initial Render
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
