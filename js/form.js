import { resetFormsAndMap } from './form-reset.js';

//Валидация с помощью библиотеки PristineJS
const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

//Валидация поля title на количество введённых символов
const validateTitleLength = (value) => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  return value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
};
pristine.addValidator(adForm.querySelector('#title'), validateTitleLength, 'От 30 до 100 символов');

//"Синхронизация" полей "Количество комнат" (room_number) и "Количество мест" (capacity)
const roomNumberField = adForm.querySelector('[name="rooms"]');
const capacityOfGuestsField = adForm.querySelector('[name="capacity"]');
const amountOfGuestsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};
//Функция валидации поля capacity
const validateCapacityOfGuests = () => amountOfGuestsOption[roomNumberField.value].includes(capacityOfGuestsField.value);
//Функция вывода сообщения об ошибке
const getCapacityOfGuestsErrorMessage = () => 'Недопустимое значение';
pristine.addValidator(capacityOfGuestsField, validateCapacityOfGuests, getCapacityOfGuestsErrorMessage);

//Валидация поля price на максимальное и минимальное значения
const priceField = adForm.querySelector('#price');
const MAX_PRICE_VALUE = 100000;
const validatePriceField = (value) => !(parseInt(value, 10) > MAX_PRICE_VALUE || parseInt(priceField.placeholder, 10) > parseInt(value, 10));

const getPriceFieldErrorMessage = () => {
  if (parseInt(priceField.placeholder, 10) > parseInt(priceField.value, 10)) {
    return `Минимальная цена ${priceField.placeholder}`;
  } else if (parseInt(priceField.value, 10) > MAX_PRICE_VALUE) {
    return `Максимальная цена ${MAX_PRICE_VALUE}`;
  }
};
pristine.addValidator(priceField, validatePriceField, getPriceFieldErrorMessage);

//"Синхронизация" полей timein и timeout
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const onTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);

//Функции для блокировки/разблокировки кнопки "Опубликовать"
const submitButton = adForm.querySelector('.ad-form__submit');
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

//Проверка отправляемой формы на валидность. Обработка ответа при помощи "fetch"
const setAdFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);

      fetch(
        'https://25.javascript.pages.academy/keksobooking',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
            unblockSubmitButton();
            resetFormsAndMap();
          } else {
            onFail();
            unblockSubmitButton();
          }
        })
        .catch(() => {
          // onFail();
        });
    }
  });
};

const pristineReset = () => {
  pristine.reset();
};

export { setAdFormSubmit, pristineReset };
