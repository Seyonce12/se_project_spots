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
const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

//profile elements
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

//profile form elements
const editFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");

//functions
function openModal() {
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", function(){
  getCurrentProfileValues();
  openModal();
});

editModalCloseBtn.addEventListener("click", closeModal);

function getCurrentProfileValues()
{
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileNameElement.textContent = nameValue.trim();
  profileJobElement.textContent = jobValue.trim();
  //close modal
  closeModal();
}

editFormElement.addEventListener('submit',handleProfileFormSubmit);

//card template
const cardTemplate = document.querySelector("#card-template");

//function to fill the cards
function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name || 'No Image';
  const likeButtonEl = cardElement.querySelector(".card__like-btn");
  likeButtonEl.setAttribute("aria-label", "Like " + data.name);
  return cardElement;
}

//card parent ul element
const cardsList = document.querySelector('.cards__list');

// Loop through the initialCards array and append each card to the parent
initialCards.forEach(cardData => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});