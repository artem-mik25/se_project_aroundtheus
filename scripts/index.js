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

  // Elements
  const profileEditButton = document.querySelector("#profile-edit-button");
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const modalEditClose = document.querySelector("#modal-edit-close");
  const profileTitle = document.querySelector("#profile-title");
  const profileDescription = document.querySelector("#profile-description");
  const profileTitleInput = document.querySelector("#profile-title-input");
  const profileDescriptionInput = document.querySelector("#profile-description-input");
  const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
  const newPlaceModal = document.querySelector("#add-card-modal");
  const addCardButton = document.querySelector("#add-card-button");
  const closeNewPlaceModalButton = document.querySelector("#add-card-close");
  const newPlaceForm = document.querySelector("#add-card-form");
  const newPlaceTitleInput = document.querySelector("#title-add-input");
  const newPlaceUrlInput = document.querySelector("#url-add-input");
  const previewModal = document.querySelector("#preview-modal");
  const closePreviewModalButton = document.querySelector("#preview-close-modal");
  const previewImage = document.querySelector("#preview-image-modal");
  const previewTitle = document.querySelector("#preview-title-modal");
  const cardListEl = document.querySelector("#cards-list");
  const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

  // Functions

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
  }

  function openModal(modal) {
    modal.classList.add("modal_opened");
  }

  function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardTitleEl.textContent = cardData.name;

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
      previewImage.src = cardData.link;
      previewImage.alt = cardData.name;
      previewTitle.textContent = cardData.name;
      openModal(previewModal);
    });

    return cardElement;
  }

  function renderCard(cardData, cardListEl) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
  }

  function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
  }

  function handleNewPlaceFormSubmit(e) {
    e.preventDefault();
    const name = newPlaceTitleInput.value;
    const link = newPlaceUrlInput.value;
    renderCard({ name, link }, cardListEl);
    closeModal(newPlaceModal);
    newPlaceForm.reset();
  }

  // Event Listeners

  profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal);
  });

  modalEditClose.addEventListener("click", () => {
    closeModal(profileEditModal);
  });

  addCardButton.addEventListener("click", () => openModal(newPlaceModal));
  closeNewPlaceModalButton.addEventListener("click", () => closeModal(newPlaceModal));
  closePreviewModalButton.addEventListener("click", () => closeModal(previewModal));
  profileEditForm.addEventListener("submit", handleProfileEditSubmit);
  newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

  initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
});
