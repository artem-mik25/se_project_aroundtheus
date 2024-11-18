// Open a modal window
export const openModal = (modalWindow) => {
    if (!modalWindow) {
      console.warn('openModal: No modal window provided');
      return;
    }
    modalWindow.classList.add('modal_opened');
    document.addEventListener('keydown', handleEscKey);
  };
  
  // Close a modal window
  export const closeModal = (modalWindow) => {
    if (!modalWindow) {
      console.warn('closeModal: No modal window provided');
      return;
    }
    modalWindow.classList.remove('modal_opened');
    document.removeEventListener('keydown', handleEscKey);
  };
  
  // Handle the Escape key for closing modals
  const handleEscKey = (evt) => {
    if (evt.key === 'Escape') {
      const activeModal = document.querySelector('.modal_opened');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  };
  
  // Check if the pressed key is Escape and run a specific action
  export const isEscapeKey = (evt, action) => {
    if (evt.key === 'Escape') {
      action();
    }
  };
  
  // Safely select an element by selector
  export const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`selectElement: Element with selector "${selector}" not found`);
    }
    return element;
  };
  
  // Utility to clear all children of an element
  export const clearContainer = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };
  
  // Example DOM elements for image preview
  export const imageModalWindow = document.querySelector('.modal_image');
  export const imageElement = imageModalWindow?.querySelector('.modal__image');
  export const imageCaption = imageModalWindow?.querySelector('.modal__caption');
  
  if (!imageModalWindow || !imageElement || !imageCaption) {
    console.error('Error: Image modal elements are missing from the DOM');
  }
  