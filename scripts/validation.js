const showInputError = (inputElement, errorMsg) => {
  inputElement.nextElementSibling.textContent = errorMsg;
  inputElement.classList.add("modal__input-error");
};

const hideInputError = (inputElement) => {
  inputElement.nextElementSibling.textContent = "";
  inputElement.classList.remove("modal__input-error");
};

const checkInputValidity = (formEl, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__submit-btn");

  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(frameElement, inputElement);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidaion = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidaion();
