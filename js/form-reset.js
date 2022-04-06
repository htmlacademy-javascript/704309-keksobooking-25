import { resetMarkersAndMapCoords } from './map.js';
import { closePopup } from './map.js';

//функция для очистки формы, фильтров и возврата карты в первоначальное состояние
const resetFormsAndMap = () => {
  //сброс значений до первоначальных у формы "ad-form"
  const adFormElement = document.querySelector('.ad-form');
  const adFormInputElements = adFormElement.querySelectorAll('input');
  const adFormSelectElements = adFormElement.querySelectorAll('select');
  const adFormTextareaElement = adFormElement.querySelector('textarea');
  adFormTextareaElement.value = '';

  for (let i = 0; i < adFormInputElements.length; i++) {
    if (adFormInputElements[i].name === 'title') {
      adFormInputElements[i].value = '';
    }
    else if (adFormInputElements[i].name === 'address') {
      adFormInputElements[i].value = '35.6824, 139.75219';
    }
    else if (adFormInputElements[i].type === 'number') {
      adFormInputElements[i].value = '1000';
    }
    else if (adFormInputElements[i].type === 'checkbox') {
      adFormInputElements[i].checked = false;
    }
    else if (adFormInputElements[i].type === 'file') {
      adFormInputElements[i].value = '';
    }
  }

  for (let i = 0; i < adFormSelectElements.length; i++) {
    if (adFormSelectElements[i].name === 'type') {
      adFormSelectElements[i].value = 'flat';
    }
    else if (adFormSelectElements[i].name === 'timein') {
      adFormSelectElements[i].value = '12:00';
    }
    else if (adFormSelectElements[i].name === 'timeout') {
      adFormSelectElements[i].value = '12:00';
    }
    else if (adFormSelectElements[i].name === 'rooms') {
      adFormSelectElements[i].value = '1';
    }
    else if (adFormSelectElements[i].name === 'capacity') {
      adFormSelectElements[i].value = '3';
    }
  }
  //сброс значений до первоначальных у области фильтров "map__filters-container"
  const mapFormElement = document.querySelector('.map__filters');
  const mapFormSelectElements = mapFormElement.querySelectorAll('select');
  const mapFormInputElements = mapFormElement.querySelectorAll('input');

  for (let i = 0; i < mapFormSelectElements.length; i++) {
    mapFormSelectElements[i].value = 'any';
  }

  for (let i = 0; i < mapFormInputElements.length; i++) {
    mapFormInputElements[i].checked = false;
  }

  //функция для возврата карты и главного маркера в первоначалальное состояние
  resetMarkersAndMapCoords();

  //закрытие открытого попапа с объявлением
  closePopup();
};

//обработчик события нажатия на кнопку "очистить"
const buttonAllResetElement = document.querySelector('.ad-form__reset');
buttonAllResetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormsAndMap();
});

export { resetFormsAndMap };
