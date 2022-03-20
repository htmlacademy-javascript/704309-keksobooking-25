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
function validateTitleLength (value) {
  return value.length >= 30 && value.length <= 100;
}
pristine.addValidator(adForm.querySelector('#title'), validateTitleLength, 'От 30 до 100 символов');

//Валидация поля price на максимальное значение
function validatePrice (value) {
  return value <= 100000;
}
pristine.addValidator(adForm.querySelector('#price'), validatePrice, 'Максимальное значение:100 000');

//"Синхронизация" полей room_number и capacity. И валидация поля capacity
const roomNumberField = adForm.querySelector('[name="rooms"]');
const capacityOfGuestsField = adForm.querySelector('[name="capacity"]');
const amountOfGuestsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

function validateCapacityOfGuests () {
  amountOfGuestsOption[roomNumberField.value].includes(capacityOfGuestsField.value);
}

function getCapacityOfGuestsErrorMessage () {
  if (roomNumberField.value === '1') {
    if (roomNumberField.value === '1' && capacityOfGuestsField.value === '1'){
      return ``;
    } else {
      return `\xa0\xa0 ${roomNumberField.value} комната для ${roomNumberField.value} гостя`;
    }
  }

  if (roomNumberField.value === '2'){
    if (roomNumberField.value === '2' && (capacityOfGuestsField.value === '2' || capacityOfGuestsField.value === '1')){
      return ``;
    } else {
      return `\xa0\xa0 ${roomNumberField.value} ${roomNumberField.value === '1' ? 'комната' : 'комнаты'}  для 1-2 гостей`;
    }
  }

  if (roomNumberField.value === '3') {
    if (roomNumberField.value === '3' && (capacityOfGuestsField.value === '3' || capacityOfGuestsField.value === '2' || capacityOfGuestsField.value === '1')){
      return ``;
    } else {
      return `\xa0\xa0 ${roomNumberField.value} ${roomNumberField.value === '1' ? 'комната' : 'комнаты'}  для 1-3 гостей`;
    }
  }

  if (roomNumberField.value === '100') {
    if (roomNumberField.value === '100' && capacityOfGuestsField.value === '0') {
      return ``;
    } else {
      return `\xa0\xa0 ${roomNumberField.value} комнат не для гостей`;
    }
  }
}

pristine.addValidator(capacityOfGuestsField, validateCapacityOfGuests, getCapacityOfGuestsErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
