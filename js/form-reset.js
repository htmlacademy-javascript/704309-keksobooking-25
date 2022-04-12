import { resetMarkersAndMapCoords, closePopup, renderSimpleMarkers } from './map.js';
import { resetPristine } from './form.js';
import { resetSliderPosition } from './slider.js';

const buttonAllResetElement = document.querySelector('.ad-form__reset');
const adFormElement = document.querySelector('.ad-form');
const inputPriceElement = adFormElement.querySelector('#price');
const avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview img');
const adImagePreviewElement = adFormElement.querySelector('.ad-form__photo img');
const mapFormElement = document.querySelector('.map__filters');

//функция для очистки формы, фильтров и возврата карты в первоначальное состояние
const resetFormsAndMap = () => {
  //сброс значений до первоначальных у формы "ad-form"
  adFormElement.reset();
  inputPriceElement.value = '1000';
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  adImagePreviewElement.src = 'img/muffin-grey.svg';

  //сброс значений до первоначальных у формы фильтрации "map__filters-container"
  mapFormElement.reset();

  //функция для возврата карты и главного маркера в первоначалальное состояние
  resetMarkersAndMapCoords();

  //функция закрытия открытого попапа с объявлением
  closePopup();

  //сброс сообщений валидатора Pristine.js
  resetPristine();

  //перемещение положения ползунка слайдера в изначальное
  resetSliderPosition();

  //получение и отрисовка маркеров аналогично моменту загрузки карты
  renderSimpleMarkers();
};

//обработчик события нажатия на кнопку "очистить"
buttonAllResetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormsAndMap();
});

export { resetFormsAndMap };
