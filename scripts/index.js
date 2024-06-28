document.addEventListener('DOMContentLoaded', () => {
  const initialCards = [
    {
      name: 'Yosemite Valley',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
    },
    {
      name: 'Lake Louise',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
    },
    {
      name: 'Bald Mountains',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
    },
    {
      name: 'Latemar',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
    },
    {
      name: 'Vanoise National Park',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
    },
    {
      name: 'Lago di Braies',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
    },
  ]

  // Profile Edit Modal Elements
  const profileEditButton = document.querySelector('#profile__edit-button')
  const profileEditModal = document.querySelector('#profile-edit-modal')
  const profileTitle = document.querySelector('#profile-title')
  const profileDescription = document.querySelector('#profile-description')
  const profileTitleInput = document.querySelector('#profile-title-input')
  const profileDescriptionInput = document.querySelector(
    '#profile-description-input'
  )
  const profileEditForm = document.forms['profile-form']

  // Add Place Modal Elements
  const profileAddButton = document.querySelector('#profile-add-button')
  const addPlaceModal = document.querySelector('#add-place-modal')
  const addPlaceForm = document.forms['card-form']
  const placeTitleInput = document.querySelector('#place-title-input')
  const placeImageInput = document.querySelector('#place-image-input')

  // Image Preview Modal Elements
  const imagePreviewModal = document.querySelector('#image-preview-modal')
  const imagePreview = document.querySelector('#image-preview')
  const imageCaption = document.querySelector('#image-caption')

  const cardListEl = document.querySelector('#cards-list')
  const cardTemplate = document.querySelector('#card-template').content

  // Universal handler for close buttons
  const closeButtons = document.querySelectorAll('.modal__close')
  closeButtons.forEach((button) => {
    const popup = button.closest('.modal')
    button.addEventListener('click', () => closeModal(popup))
  })

  // Function to open a modal
  function openModal(modal) {
    console.log('Opening modal:', modal)
    modal.classList.add('modal_opened')
    document.addEventListener('keydown', handleEscClose)
  }

  // Function to close a modal
  function closeModal(modal) {
    console.log('Closing modal:', modal)
    modal.classList.remove('modal_opened')
    document.removeEventListener('keydown', handleEscClose)
  }

  // Handle closing modal with Esc key
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openModal = document.querySelector('.modal_opened')
      if (openModal) closeModal(openModal)
    }
  }

  // Handle closing modal by clicking on the overlay
  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('modal_opened')) {
      closeModal(evt.target)
    }
  }

  function resetForm(form) {
    form.reset()
    form.querySelectorAll('.modal__input').forEach((input) => {
      input.dispatchEvent(new Event('input'))
    })
  }

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('mousedown', handleOverlayClose)
  })

  // Profile Edit Modal Handlers
  profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent
    profileDescriptionInput.value = profileDescription.textContent
    openModal(profileEditModal)
  })

  profileEditForm.addEventListener('submit', (event) => {
    event.preventDefault()
    profileTitle.textContent = profileTitleInput.value
    profileDescription.textContent = profileDescriptionInput.value
    closeModal(profileEditModal)
  })

  // Add Place Modal Handlers
  profileAddButton.addEventListener('click', () => {
    openModal(addPlaceModal)
  })

  addPlaceForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newCard = {
      name: placeTitleInput.value,
      link: placeImageInput.value,
    }
    const cardElement = getCardElement(newCard)
    cardListEl.prepend(cardElement)
    addPlaceForm.reset() // Clear inputs immediately after submission
    closeModal(addPlaceModal)
  })

  // Function to create a card element
  function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true).firstElementChild
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const cardLikeButton = cardElement.querySelector('.card__like-button')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')

    cardImage.src = data.link
    cardImage.alt = data.name
    cardTitle.textContent = data.name

    cardImage.addEventListener('click', () => {
      console.log('Image clicked:', data.name)
      imagePreview.src = data.link
      imagePreview.alt = data.name
      imageCaption.textContent = data.name
      openModal(imagePreviewModal)
    })

    cardLikeButton.addEventListener('click', () => {
      cardLikeButton.classList.toggle('liked')
    })

    cardDeleteButton.addEventListener('click', () => {
      cardElement.remove()
    })

    return cardElement
  }

  // Render initial cards
  initialCards.forEach((card) => {
    const cardElement = getCardElement(card)
    cardListEl.append(cardElement)
  })
})
