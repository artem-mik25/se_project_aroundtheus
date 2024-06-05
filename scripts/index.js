document.addEventListener('DOMContentLoaded', () => {
  const initialCards = [
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

  const profileEditButton = document.querySelector("#profile__edit-button");
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const closeModalButton = document.querySelector("#modal-edit-close");
  const profileTitle = document.querySelector("#profile-title");
  const profileDescription = document.querySelector("#profile-description");
  const profileTitleInput = document.querySelector("#profile-title-input");
  const profileDescriptionInput = document.querySelector("#profile-description-input");
  const profileEditForm = document.querySelector("#profile-edit-form");
  const cardListEl = document.querySelector("#cards-list");
  const cardTemplate = document.querySelector("#card-template").content;

  const profileAddButton = document.querySelector("#profile-add-button");
  const addPlaceModal = document.querySelector("#add-place-modal");
  const modalAddClose = document.querySelector("#modal-add-close");
  const addPlaceForm = document.querySelector("#add-place-form");
  const placeTitleInput = document.querySelector("#place-title-input");
  const placeImageInput = document.querySelector("#place-image-input");

  const imagePreviewModal = document.querySelector("#image-preview-modal");
  const modalPreviewClose = document.querySelector("#modal-preview-close");
  const imagePreview = document.querySelector("#image-preview");
  const imageCaption = document.querySelector("#image-caption");

  // Profile Edit Modal Handlers
  profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add("modal_opened");
  });

  closeModalButton.addEventListener("click", () => {
    profileEditModal.classList.remove("modal_opened");
  });

  profileEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    profileEditModal.classList.remove("modal_opened");
  });

  // Add Place Modal Handlers
  profileAddButton.addEventListener("click", () => {
    addPlaceModal.classList.add("modal_opened");
  });

  modalAddClose.addEventListener("click", () => {
    addPlaceModal.classList.remove("modal_opened");
  });

  addPlaceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newCard = {
      name: placeTitleInput.value,
      link: placeImageInput.value,
    };
    const cardElement = getCardElement(newCard);
    cardListEl.prepend(cardElement); // Add the new card to the beginning
    addPlaceModal.classList.remove("modal_opened");
    addPlaceForm.reset();
  });

  function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    cardImage.addEventListener("click", () => {
      imagePreview.src = data.link;
      imagePreview.alt = data.name;
      imageCaption.textContent = data.name;
      imagePreviewModal.classList.add("modal_opened");
    });

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("liked");
    });

    cardDeleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    return cardElement;
  }

  initialCards.forEach((card) => {
    const cardElement = getCardElement(card);
    cardListEl.append(cardElement);
  });

  // Image Preview Modal Handler
  modalPreviewClose.addEventListener("click", () => {
    imagePreviewModal.classList.remove("modal_opened");
  });

  // Event delegation to handle dynamically added delete buttons
  cardListEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__delete-button')) {
      const cardElement = event.target.closest('.card');
      cardElement.remove();
    }
  });
});
