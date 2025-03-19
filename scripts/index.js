import Api from "../utils/Api";


// changes
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json"
  }
});

const initialCards = [
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    name: "Val Thorens",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    name: "Restaurant terrace",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    name: "An outdoor cafe",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    name: "A very long bridge, over the forest and through the trees",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    name: "Tunnel with morning light",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    name: "Mountain house",
  },
];

//modal buttons
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");

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

//profile elements
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

//forms
const editFormElement = document.forms["profle-form"];
const cardFormElement = document.forms["card-form"];

//form elements
const nameInput = editModal.querySelector("#profile-name-input");
const jobInput = editModal.querySelector("#profile-description-input");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardModalSubmitButton = cardModal.querySelector(".modal__submit-btn");
//preview modal elemnts
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

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
  profileNameElement.textContent = nameValue.trim();
  profileJobElement.textContent = jobValue.trim();
  //close modal
  closeModal(editModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  renderCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  e.target.reset();
  //disable submit button
  disableButton(cardModalSubmitButton);
  closeModal(cardModal);
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
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButtonEl = cardElement.querySelector(".card__like-btn");
  const deleteButtonEl = cardElement.querySelector(".card__delete-btn");

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
    likeButtonEl.classList.toggle("card__like-btn_liked");
  });

  deleteButtonEl.addEventListener("click", (e) => {
    cardElement.remove();
  });
  return cardElement;
}

//card parent ul element
const cardsList = document.querySelector(".cards__list");

// Loop through the initialCards array and append each card to the parent
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}


