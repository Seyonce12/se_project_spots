import Api from "../utils/Api";
import { resetValidation, enableValidation, settings, disableButton } from '../scripts/validation'
import '../pages/index.css'


enableValidation(settings)

// changes
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e6198596-f5e3-4af3-863c-34adb4662e36",
    "Content-Type": "application/json"
  }
});

let selectedCardId = ''
let selectedCardEl = ''


//modal buttons
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const avatarEditModalBtn = document.querySelector(".profile__avatar-edit")

//clsoe buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(popup);
  });
});

//modals
const allModals = document.querySelectorAll(".modal");
const editModal = document.querySelector("#edit-modal");
const cardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");
const deleteModal = document.querySelector("#delete-card-modal")
const editAvatarModal = document.querySelector("#edit-avatar-modal")

//profile elements
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileAvatartElement = document.querySelector(".profile__avatar")

//forms
const editFormElement = document.forms["profle-form"];
const cardFormElement = document.forms["card-form"];
//const avatarFormElement = document.forms["avatar-form"]

//form elements
const nameInput = editModal.querySelector("#profile-name-input");
const jobInput = editModal.querySelector("#profile-description-input");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const avatarLinkInput = editAvatarModal.querySelector("#edit-avatar-link-input")
const cardModalSubmitButton = cardModal.querySelector(".modal__submit-btn");
const avatarModalSubmitButton = editAvatarModal.querySelector(".modal__submit-btn")
const editProfileSubmitButton = editModal.querySelector(".modal__submit-btn")
const deleteModalSubmitButton = deleteModal.querySelector(".modal__delete-btn")

//preview modal elemnts
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

// delete modal elements
const deleteModalDeleteBtn = deleteModal.querySelector(".modal__delete-btn")
const deleteModalCancleBtn = deleteModal.querySelector(".modal__cancel-btn")


//functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

allModals.forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

profileEditButton.addEventListener("click", function () {
  getCurrentProfileValues(resetValidation);
  openModal(editModal);
});

avatarEditModalBtn.addEventListener("click", function () {
  openModal(editAvatarModal)
})

avatarModalSubmitButton.addEventListener("click", function (e) {
  e.preventDefault()
  const data = {
    avatar: avatarLinkInput.value
  }
  avatarModalSubmitButton.textContent = 'Saving...'
  api.editAvatar(data).then((dd) => {
    profileAvatartElement.setAttribute('src', data.avatar)
    closeModal(editAvatarModal)
  }).catch((err) => {
    console.error(err)
  }).finally(() => avatarModalSubmitButton.textContent = 'save')
})

cardModalBtn.addEventListener("click", function () {
  openModal(cardModal);
});

function getCurrentProfileValues(callback) {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  callback([nameInput, jobInput], settings);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  editProfileSubmitButton.textContent = 'Saving...'
  api.updateProfileInformation({name: nameValue, about: jobValue}).then(((dd) => {
    profileNameElement.textContent = nameValue.trim();
    profileJobElement.textContent = jobValue.trim();
  })).catch((err) => {
    console.error(err)
  }).finally(() => editProfileSubmitButton.textContent = 'save')

  // close modal
  closeModal(editModal);
}


editFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardSubmit);

//card template
const cardTemplate = document.querySelector("#card-template");

//function to fill the cards
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;
  cardElement.setAttribute('data-id', data._id)
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButtonEl = cardElement.querySelector(".card__like-btn");
  const deleteButtonEl = cardElement.querySelector(".card__delete-btn");

  if (data.isLiked === true) likeButtonEl.classList.add("card__like-btn_liked")

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name || "No Image";

  cardImageEl.addEventListener("click", (e) => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });
  likeButtonEl.setAttribute("aria-label", "Like " + data.name);
  likeButtonEl.addEventListener("click", () => {
    if (likeButtonEl.classList.contains("card__like-btn_liked")) {
      api.unlikeCard(data._id).then((dd) => {
        likeButtonEl.classList.toggle("card__like-btn_liked");
      }).catch((err) => console.error(err))
    }
    else {
      api.likeCard(data._id).then((dd) => {
        likeButtonEl.classList.toggle("card__like-btn_liked");
      }).catch((err) => console.error(err))
    }
    
  });

  deleteButtonEl.addEventListener("click", (e) => {
    selectedCardId = e.target.parentElement.getAttribute('data-id')
    selectedCardEl = cardElement
    openModal(deleteModal)
    
    //cardElement.remove();
  });
  return cardElement;
}

//card parent ul element
const cardsList = document.querySelector(".cards__list");

// Loop through the initialCards array and append each card to the parent
/*
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
*/

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}


// functions
console.log(deleteModal)
deleteModalDeleteBtn.addEventListener('click', () => {
  //console.log(currentCardToDelete)
  deleteModalSubmitButton.textContent = 'Deleting...'
  api.deleteCard(selectedCardId).then((dd) => {
    selectedCardEl.remove()
    closeModal(deleteModal)
  }).catch((err) => console.error(err)).finally(() => deleteModalSubmitButton.textContent = 'Delete')
})

deleteModalCancleBtn.addEventListener('click', () => {
  closeModal(deleteModal)
})

// user information
function displayUserInformation() {
  api.getUserInformation().then((dd) => {
    profileNameElement.textContent = dd.name
    profileJobElement.textContent = dd.about
    profileAvatartElement.setAttribute('src', dd.avatar)
    console.log(dd)
  }).catch((err) => console.error(err))
}

// initial cards
function displayInitialCards() {
  api.getInitialCards().then((dd) => {
    console.log(dd)
    dd.forEach((cardData) => {
      renderCard(cardData, "append");
    });
    }).catch((err) => console.error(err))
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  cardModalSubmitButton.textContent = 'Saving...'
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  }
  api.addNewCard(data).then((dd) => {
      //console.log(dd)
      renderCard(dd)
}).catch((err) => console.error(err)).finally(() => cardModalSubmitButton.textContent = 'Save');
  e.target.reset();
  //disable submit button
  disableButton(cardModalSubmitButton);
  closeModal(cardModal);
}



// display user information
displayUserInformation()

displayInitialCards()



