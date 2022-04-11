import { resetMarkersAndMapCoords, closePopup, renderSimpleMarkers } from './map.js';
import { pristineReset } from './form.js';
import { resetSliderPosition } from './slider.js';

//функция для очистки формы, фильтров и возврата карты в первоначальное состояние
const resetFormsAndMap = () => {
  //сброс значений до первоначальных у формы "ad-form"
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.reset();
  const inputPriceElement = adFormElement.querySelector('#price');
  inputPriceElement.value = '1000';

  //сброс значений до первоначальных у формы фильтрации "map__filters-container"
  const mapFormElement = document.querySelector('.map__filters');
  mapFormElement.reset();

  //функция для возврата карты и главного маркера в первоначалальное состояние
  resetMarkersAndMapCoords();

  //функция закрытия открытого попапа с объявлением
  closePopup();

  //сброс сообщений валидатора Pristine.js
  pristineReset();

  //перемещение положения ползунка слайдера в изначальное
  resetSliderPosition();

  //получение и отрисовка маркеров аналогично моменту загрузки карты
  renderSimpleMarkers();
};

//обработчик события нажатия на кнопку "очистить"
const buttonAllResetElement = document.querySelector('.ad-form__reset');
buttonAllResetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormsAndMap();
});

export { resetFormsAndMap };
