const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: ".modal__submit-btn-disabled",
  inputErrorClass: ".modal__input-error",
  errorClass: ".modal__error",
};

const showInputError = (inputElement, errorMsg, config) => {
  inputElement.nextElementSibling.textContent = errorMsg;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (inputElement, config) => {
  inputElement.nextElementSibling.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const resetValidation = (inputList) => {
  inputList.forEach((input) => {
    hideInputError(input, settings);
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
};

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
};

const enableButton = (buttonElement) => {
  buttonElement.disabled = false;
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
