import { TIME_CHECKIN_CHECKOUT, TYPE_OF_PLACEMENT } from './mock-data.js';
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
  const minTitleLength = 30;
  const maxTitleLength = 100;
  return value.length >= minTitleLength && value.length <= maxTitleLength;
};
pristine.addValidator(adForm.querySelector('#title'), validateTitleLength, 'От 30 до 100 символов');

//Валидация поля price на максимальное значение
const priceField = adForm.querySelector('#price');
const maxPriceValue = 100000;
const validatePriceField = (value) => {
  if (value <= maxPriceValue && value >= priceField.dataset.pristineMin){
    return true;
  }
};

const getPriceFieldErrorMessage = () => {
  if (priceField.dataset.pristineMin >= priceField.value) {
    return `Минимальная цена ${priceField.placeholder}`;
  } else if (priceField.value > maxPriceValue) {
    return `Максимальная цена ${maxPriceValue}`;
  }
};
pristine.addValidator(priceField, validatePriceField, getPriceFieldErrorMessage);

//"Синхронизация" полей room_number и capacity
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

//Валидация полей type и price
const PRICES_OF_PLACEMENT = [
  10000,
  1000,
  5000,
  0,
  3000
];
//Функция для валидации поля price в зависимости от значения поля type
const typePlacementField = adForm.querySelector('#type');
const getMinPriceValue = () => {
  PRICES_OF_PLACEMENT.forEach((element, i) => {
    if (TYPE_OF_PLACEMENT[i] === typePlacementField.value) {
      priceField.placeholder = element;
      priceField.dataset.pristineMin = element;
    }
  });
  return true;
};
pristine.addValidator(typePlacementField, getMinPriceValue);

//"Синхронизация" полей timein и timeout
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');

const syncingTimeFieldsValues = () => {
  timeinField.addEventListener('change', (evt) => {
    if (evt.currentTarget.value === TIME_CHECKIN_CHECKOUT[0]) {
      timeoutField.value = TIME_CHECKIN_CHECKOUT[0];
    } else if (evt.currentTarget.value === TIME_CHECKIN_CHECKOUT[1]) {
      timeoutField.value = TIME_CHECKIN_CHECKOUT[1];
    } else if (evt.currentTarget.value === TIME_CHECKIN_CHECKOUT[2]) {
      timeoutField.value = TIME_CHECKIN_CHECKOUT[2];
    }
  });

  timeoutField.addEventListener('change', (evt) => {
    if (evt.currentTarget.value === TIME_CHECKIN_CHECKOUT[0]) {
      timeinField.value = TIME_CHECKIN_CHECKOUT[0];
    } else if (evt.currentTarget.value === TIME_CHECKIN_CHECKOUT[1]) {
      timeinField.value = TIME_CHECKIN_CHECKOUT[1];
    } else if (evt.currentTarget.value === TIME_CHECKIN_CHECKOUT[2]) {
      timeinField.value = TIME_CHECKIN_CHECKOUT[2];
    }
  });
  return true;
};
pristine.addValidator(timeinField, syncingTimeFieldsValues);
pristine.addValidator(timeoutField, syncingTimeFieldsValues);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
