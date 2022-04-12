import { sendData } from './server-data.js';
import { openModalSuccessSendData, openModalErrorSendData } from './modals.js';
import { resetFormsAndMap } from './form-reset.js';

const adForm = document.querySelector('.ad-form');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const roomNumberField = adForm.querySelector('[name="rooms"]');
const capacityOfGuestsField = adForm.querySelector('[name="capacity"]');
const amountOfGuestsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};
const priceField = adForm.querySelector('#price');
const MAX_PRICE_VALUE = 100000;
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const urlForSendData = 'https://25.javascript.pages.academy/keksobooking';

//Валидация с помощью библиотеки PristineJS
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

//Функция валидации поля title на количество введённых символов
const validateTitleLength = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
//Функция вывода сообщения об ошибке для поля title
const getTitleLengthErrorMessage = () => 'От 30 до 100 символов';
pristine.addValidator(adForm.querySelector('#title'), validateTitleLength, getTitleLengthErrorMessage);

//"Синхронизация" полей "Количество комнат" (room_number) и "Количество мест" (capacity)
//Функция валидации поля capacity
const validateCapacityOfGuests = () => amountOfGuestsOption[roomNumberField.value].includes(capacityOfGuestsField.value);
//Функция вывода сообщения об ошибке для поля capacity
const getCapacityOfGuestsErrorMessage = () => 'Недопустимое значение';
pristine.addValidator(capacityOfGuestsField, validateCapacityOfGuests, getCapacityOfGuestsErrorMessage);

//Функция валидации поля price на максимальное и минимальное значения
const validatePriceField = (value) => !(parseInt(value, 10) > MAX_PRICE_VALUE || parseInt(priceField.placeholder, 10) > parseInt(value, 10));
//Функция вывода сообщения об ошибке для поля price
const getPriceFieldErrorMessage = () => {
  if (parseInt(priceField.placeholder, 10) > parseInt(priceField.value, 10)) {
    return `Минимальная цена ${priceField.placeholder}`;
  } else if (parseInt(priceField.value, 10) > MAX_PRICE_VALUE) {
    return `Максимальная цена ${MAX_PRICE_VALUE}`;
  }
};
pristine.addValidator(priceField, validatePriceField, getPriceFieldErrorMessage);

//Функция для "Синхронизации" полей timein и timeout
const onTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);

//Функции для блокировки/разблокировки кнопки "Опубликовать"
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.style.backgroundColor = '#ccc';
  submitButton.style.color = '#b8b8b8';
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.style.backgroundColor = 'white';
  submitButton.style.color = 'black';
  submitButton.textContent = 'Опубликовать';
};

const onSuccessSentDataActions = () => {
  openModalSuccessSendData();
  unblockSubmitButton();
  resetFormsAndMap();
};

const onErrorSentDataActions = () => {
  openModalErrorSendData();
  unblockSubmitButton();
};

//Проверка отправляемой формы на валидность. Отправка формы на сервер. Обработка ответа при помощи "fetch"
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData(evt.target);
  sendData(onSuccessSentDataActions, onErrorSentDataActions, urlForSendData, formData);
});

//Функция для сброса работы валидатора Pristine в момент нажатия кнопки "Очистить"
const resetPristine = () => {
  pristine.reset();
};

export { resetPristine };
