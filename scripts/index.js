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

  console.log(initialCards);

  // DOM Elements
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

  // Function to fill profile form with current profile data
  function fillProfileForm() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }

  // Function to open the edit profile modal
  function openEditProfileModal() {
    fillProfileForm();
    profileEditModal.classList.add("modal_opened");
  }

  // Open edit profile modal
  profileEditButton.addEventListener("click", openEditProfileModal);

  // Close edit profile modal
  closeModalButton.addEventListener("click", () => {
    profileEditModal.classList.remove("modal_opened");
  });

  // Handle profile edit form submission
  profileEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    profileEditModal.classList.remove("modal_opened");
  });

  // Function to create a card element
  function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    return cardElement;
  }

  // Render initial cards
  initialCards.forEach((card) => {
    const cardElement = getCardElement(card);
    cardListEl.append(cardElement);
  });
});
