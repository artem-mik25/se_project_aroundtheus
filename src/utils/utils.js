// DOM elements for the image modal
export const imageElement = imageModalWindow.querySelector(".popup__image");
export const imageCaption = imageModalWindow.querySelector(".popup__caption");

// Function to close the modal
export const closeModal = (modalWindow) => {
    modalWindow.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleEscUp);
};

// Function to open the modal
export const openModal = (modalWindow) => {
    modalWindow.classList.add("popup_is-opened");
    document.addEventListener("keyup", handleEscUp);
};

// Function to handle Escape key event for closing the modal
export const handleEscUp = (evt) => {
    evt.preventDefault();
    isEscEvent(evt, closeModal);
};

// Function to check if the key pressed is Escape and run the provided action
export const isEscEvent = (evt, action) => {
    const activePopup = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape") {
        action(activePopup);
    }
};
