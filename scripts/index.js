const initialCards = [
    {
      name: "Val Thorens",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
      name: "Restaurant terrace",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
      name: "An outdoor cafe",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
      name: "A very long bridge, over the forest and through the trees",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
      name: "Tunnel with morning light",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
      name: "Mountain house",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
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
const profileFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('input[id="name"]');
const jobInput = profileFormElement.querySelector('input[id="description"]');

//functions
function openModal() {
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", ()=>{
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

profileFormElement.addEventListener('submit',handleProfileFormSubmit);

//card template

//function to fill the cards
function getCardElement(data) {
  const cardElement = document.createElement('li');
  cardElement.classList.add('card');
  const cardTitle = data.name;
  const cardImage = data.link;
  cardElement.innerHTML = `
    <img src="${cardImage}" alt="${cardTitle}" class="card__image">
    <div class="card__content">
      <h2 class="card__title">${cardTitle}</h2>
      <button type="button" class="card__like-btn" aria-label="Like ${cardTitle}"></button>
    </div>
  `;

  return cardElement;
}

//card parent ul element
const cardsList = document.querySelector('.cards__list');

// Loop through the initialCards array and append each card to the parent
initialCards.forEach(cardData => {
  const cardElement = getCardElement(cardData);
  cardsList.appendChild(cardElement);
});