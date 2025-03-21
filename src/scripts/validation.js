export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: ".modal__submit-btn_disabled",
  inputErrorClass: ".modal__input-error",
  errorClass: ".modal__error",
};

export const showInputError = (inputElement, errorMsg, config) => {
  inputElement.nextElementSibling.textContent = errorMsg;
  inputElement.classList.add(config.inputErrorClass);
};

export const hideInputError = (inputElement, config) => {
  inputElement.nextElementSibling.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

export const checkInputValidity = (inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

export const resetValidation = (inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(input, config);
  });
};

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
};

export const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
};

export const enableButton = (buttonElement) => {
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

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

//enableValidation(settings);
