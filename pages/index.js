// pages/index.js
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
    link: "./images/vanoise.jpg", // Corrected file name
  },
  {
    name: "Lago di Braies",
    link: "./images/lago.jpg",
  },
];

/* Wrappers */
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-place-modal");
const profileEditForm = profileEditModal ? profileEditModal.querySelector(".modal__form") : null;
const addCardFormElement = addCardModal ? addCardModal.querySelector(".modal__form") : null;
const cardImageModal = document.querySelector("#image-preview-modal");
const cardImageModalImage = document.querySelector("#image-preview");
const cardImageModalTitle = document.querySelector("#image-caption");

/* Buttons and other DOM nodes */
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModalClose = profileEditModal ? profileEditModal.querySelector("#profile-edit-close") : null;
const addCardModalClose = addCardModal ? addCardModal.querySelector("#add-place-close") : null;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardImageModalClose = cardImageModal ? cardImageModal.querySelector("#image-preview-close") : null;

/* Form Data */
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const cardTitleInput = addCardFormElement ? addCardFormElement.querySelector(".modal__input_type_title") : null;
const cardUrlInput = addCardFormElement ? addCardFormElement.querySelector(".modal__input_type_url") : null;

/* Validation */

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

if (profileEditForm) {
  const editFormValidator = new FormValidator(validationConfig, profileEditForm);
  editFormValidator.enableValidation();
}

if (addCardFormElement) {
  const addFormValidator = new FormValidator(validationConfig, addCardFormElement);
  addFormValidator.enableValidation();
}

/* Functions */

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
  return card.getView(); // Updated method call
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
  e.target.reset();
  if (editFormValidator) editFormValidator.toggleButtonState();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  renderCard({ name, link }, cardsWrap);
  if (addFormValidator) addFormValidator.toggleButtonState();
  closeModal(addCardModal);
}

const handleImageClick = (name, link) => {
  cardImageModalImage.src = link;
  cardImageModalImage.alt = name;
  cardImageModalTitle.textContent = name;
  openModal(cardImageModal);
};

/* Form Listeners */
if (profileEditForm) profileEditForm.addEventListener("submit", handleProfileEditSubmit);
if (addCardFormElement) addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
if (profileEditButton) profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
if (profileModalClose) profileModalClose.addEventListener("click", () => closeModal(profileEditModal));
if (addNewCardButton) addNewCardButton.addEventListener("click", () => openModal(addCardModal));
if (addCardModalClose) addCardModalClose.addEventListener("click", () => closeModal(addCardModal));
if (cardImageModalClose) cardImageModalClose.addEventListener("click", () => closeModal(cardImageModal));

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
