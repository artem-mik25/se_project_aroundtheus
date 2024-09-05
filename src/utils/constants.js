// Initial cards data
export const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];
  
  // DOM elements
  export const cardsWrap = document.querySelector(".cards__list");
  
  export const profileEditButton = document.querySelector(".profile__edit-button");
  
  export const editProfileModal = document.querySelector("#edit-modal");
  export const addCardModal = document.querySelector("#add-card-modal");
  export const previewImageModal = document.querySelector("#preview-image-modal");
  
  export const profileFormElement = document.querySelector("#edit-profile-form");
  export const addCardFormElement = document.querySelector("#add-card-modal");
  
  export const closeButtons = document.querySelectorAll(".modal__close");
  
  export const profileTitle = document.querySelector(".profile__title");
  export const profileDescription = document.querySelector(".profile__description");
  
  export const modalImage = previewImageModal.querySelector(".modal__image");
  export const imageDescription = previewImageModal.querySelector(".modal__description");
  
  export const nameInput = profileFormElement.querySelector(".modal__input_type_name");
  export const jobInput = profileFormElement.querySelector(".modal__input_type_description");
  export const cardTitleInput = addCardFormElement.querySelector(".modal__input_type_title");
  export const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
  
  export const addNewCardButton = document.querySelector(".profile__add-button");
  
  // Form submit handler (can be updated later if needed)
  export const handleFormSubmit = (formData) => {
    console.log(formData);
  };
  
  // Form validation configuration
  export const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
  