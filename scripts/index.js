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
const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

const cardModal = document.querySelector("#add-card-modal");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");

//profile elements
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

//profile form elements
const editFormElement = document.querySelector('form[name="edit-profile"]');
const cardFormElement = document.querySelector('form[name="add-card-form"]');
const nameInput = editModal.querySelector("#profile-name-input");
const jobInput = editModal.querySelector("#profile-description-input");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close_type_preview");
//functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", function () {
  getCurrentProfileValues();
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalBtn.addEventListener("click", function () {
  cardLinkInput.value = "";
  cardNameInput.value = "";
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

function getCurrentProfileValues() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
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
  const cardElement = getCardElement({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  cardsList.prepend(cardElement);
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

cardImageEl.addEventListener("click",(e)=>{
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
    e.target.closest(".card").remove();
  });
  return cardElement;
}

previewModalCloseBtn.addEventListener("click",()=>{
  closeModal(previewModal);
})

//card parent ul element
const cardsList = document.querySelector(".cards__list");

// Loop through the initialCards array and append each card to the parent
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
