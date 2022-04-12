import { renderPopup } from './render-ads.js';
import { getData } from './server-data.js';
import { openModalServerError } from './modals.js';
import { debounce } from './utils.js';

const MAX_ADS_AMOUNT = 10;
const savedTenRowDataElements = [];
const START_COORDS = {
  lat: 35.6824,
  lng: 139.75219,
};
const MAP_ZOOM = 13;
const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const mapFormFields = mapForm.children;
const adFormFields = adForm.children;
const urlToGetData = 'https://25.javascript.pages.academy/keksobooking/data';
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_SETTINGS = [26, 52];
const PIN_ICON_SIZE = [40, 40];
const PIN_ICON_SETTINGS = [20, 40];
const addressFieldElement = document.querySelector('#address');
const defaultValue = 'any';
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const defaultCheckedValue = false;
const checkboxFilterWifiElement = document.querySelector('#filter-wifi');
const checkboxFilterDishwasherElement = document.querySelector('#filter-dishwasher');
const checkboxFilteParkingElement = document.querySelector('#filter-parking');
const checkboxFilterWasherElement = document.querySelector('#filter-washer');
const checkboxFilterElevatorElement = document.querySelector('#filter-elevator');
const checkboxFilterConditionerElement = document.querySelector('#filter-conditioner');
const arrayFilterElements = [checkboxFilterWifiElement, checkboxFilterDishwasherElement, checkboxFilteParkingElement, checkboxFilterWasherElement, checkboxFilterElevatorElement, checkboxFilterConditionerElement];
const BEFORE_MIDDLE_PRICE = 10000;
const AFTER_MIDDLE_PRICE = 50000;
const RERENDER_DELAY = 500;
const arrayCheckedFilterElements = [];

//Изменение состояния страницы (Активное/Неактивное)
const activatePage = (activate = false) => {
  mapForm.classList[activate ? 'remove' : 'add']('map__filters--disabled');
  adForm.classList[activate ? 'remove' : 'add']('ad-form--disabled');
  for (const mapFormField of mapFormFields){
    mapFormField[activate ? 'removeAttribute' : 'setAttribute']('disabled', 'disabled');
  }
  for (const adFormField of adFormFields) {
    adFormField[activate ? 'removeAttribute' : 'setAttribute']('disabled', 'disabled');
  }
};

//Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    getData(getFilteredData, openModalServerError, urlToGetData);
  })
  .setView({
    lat: START_COORDS.lat,
    lng: START_COORDS.lng,
  }, MAP_ZOOM);

//Создание слоя с изображениями карт
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

//Замена изображения штатной иконки для главной метки
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_SETTINGS,
});

//Создание главного маркера
const mainMarker = L.marker(
  {
    lat: START_COORDS.lat,
    lng: START_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

//Добавление главного маркера на карту
mainMarker.addTo(map);

//Запись координат главной метки в поле address
mainMarker.on('moveend', (evt) => {
  const mainMarkerСoordinates = evt.target.getLatLng();
  addressFieldElement.value = `${(mainMarkerСoordinates.lat).toFixed(5)}, ${(mainMarkerСoordinates.lng).toFixed(5)}`;
});

//Возврат в главной метки в изначальное положение, восстановление изначального масштаба карты
const resetMarkersAndMapCoords = () => {
  mainMarker.setLatLng({
    lat: START_COORDS.lat,
    lng: START_COORDS.lng,
  });

  map.setView({
    lat: START_COORDS.lat,
    lng: START_COORDS.lng,
  }, MAP_ZOOM);
};

//Замена изображения штатной иконки для обычной метки
const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: PIN_ICON_SIZE,
  iconAnchor: PIN_ICON_SETTINGS,
});

//Создание слоя для отрисовки на нём обычных меток
const markerGroup = L.layerGroup().addTo(map);

//Функция для очистки слоя со всеми штатными метками
const deleteMarkerGroupLayer = () => {
  markerGroup.clearLayers();
};

//Функция для оторисовки обычных меткок на карте. Реализация показа всплывающего окна с подробной информацией
//при нажатии нажатии на любую из обычных меток
const renderSimpleMarkers = (cards = savedTenRowDataElements) => {
  deleteMarkerGroupLayer();
  for (let i = 0; i < cards.length; i++) {
    const {lat, lng} = cards[i].location;
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon,
    }
    );

    marker
      .addTo(markerGroup)
      .bindPopup(renderPopup(cards[i]));
  }
  activatePage(true);
};

//Функция для закрытия открытого попапа с информацией об объявлении
const closePopup = () => {
  map.closePopup();
};

//Реализация фильтрации всех select и checkbox
housingPriceElement.value = housingTypeElement.value = housingRoomsElement.value = housingGuestsElement.value = defaultValue;

//Функция для проверки селекта "housing-type"
const checkType = (rowDataType) => {
  if (housingTypeElement.value === rowDataType.offer.type || housingTypeElement.value === defaultValue) {
    return true;
  }
};

//Функция для проверки селекта "housing-price"
const checkPrice = (rowDataPrice) => {
  if ((housingPriceElement.value === defaultValue) ||
    (housingPriceElement.value === 'low' && rowDataPrice.offer.price <= BEFORE_MIDDLE_PRICE) ||
    (housingPriceElement.value === 'middle' && rowDataPrice.offer.price > BEFORE_MIDDLE_PRICE && rowDataPrice.offer.price <= AFTER_MIDDLE_PRICE) ||
    (housingPriceElement.value === 'high' && rowDataPrice.offer.price > AFTER_MIDDLE_PRICE)) {
    return true;
  }
};

//Функция для проверки селекта "housing-rooms"
const checkRooms = (rowDataRooms) => {
  if (housingRoomsElement.value === defaultValue ||
    (housingRoomsElement.value === '1' && housingRoomsElement.value === String(rowDataRooms.offer.rooms)) ||
    (housingRoomsElement.value === '2' && housingRoomsElement.value === String(rowDataRooms.offer.rooms)) ||
    (housingRoomsElement.value === '3' && housingRoomsElement.value === String(rowDataRooms.offer.rooms)) ||
    (housingRoomsElement.value === '100' && housingRoomsElement.value === String(rowDataRooms.offer.rooms))) {
    return true;
  }
};

//Функция для проверки селекта "housing-guests"
const checkGuests = (rowDataGuests) => {
  if (housingGuestsElement.value === defaultValue ||
    (housingGuestsElement.value === '3' && housingGuestsElement.value === String(rowDataGuests.offer.guests)) ||
    (housingGuestsElement.value === '2' && housingGuestsElement.value === String(rowDataGuests.offer.guests)) ||
    (housingGuestsElement.value === '1' && housingGuestsElement.value === String(rowDataGuests.offer.guests)) ||
    (housingGuestsElement.value === '0' && housingGuestsElement.value === String(rowDataGuests.offer.guests))) {
    return true;
  }
};

//Функция для проверки чекбоксов "housing-features"
const checkFeatures = (rowDataFeatures) => {
  if (rowDataFeatures.offer.features === undefined) {
    // избавляемся от ошибки в те моменты, когда у предложения вообще отсутствуют преимущества (features)
    rowDataFeatures.offer.features = [];
  }
  if ((checkboxFilterWifiElement.checked || checkboxFilterDishwasherElement.checked || checkboxFilteParkingElement.checked ||
    checkboxFilterWasherElement.checked || checkboxFilterElevatorElement.checked || checkboxFilterConditionerElement.checked) === defaultCheckedValue) {
    return true;
  }
  for (let i = 0; i < arrayFilterElements.length; i++) {
    if (arrayFilterElements[i].checked === true) {
      arrayCheckedFilterElements.push(arrayFilterElements[i].value);
    }
  }
  const arrayAmountEqualElements = [];
  for (let i = 0; i < arrayCheckedFilterElements.length; i++) {
    if (rowDataFeatures.offer.features.includes(arrayCheckedFilterElements[i])) {
      arrayAmountEqualElements.push(arrayCheckedFilterElements[i]);
    }
  }
  if (arrayAmountEqualElements.length === arrayCheckedFilterElements.length) {
    return true;
  }
};

//Функция отвечающая за фильтрацию объявлений при изменении значений select и checkbox формы ".map__filters"

const applyFilter = (evt, rowData) => {
  closePopup();                 //закрытие открытого попапа
  resetMarkersAndMapCoords();   //возвращение карты к начальным координатам
  deleteMarkerGroupLayer();     //удаление текущего слоя с метками
  if (!(evt.target.nodeName === 'SELECT' || evt.target.nodeName === 'INPUT')) {
    return null;
  }
  const resultArray = [];
  for (let i = 0; i < rowData.length; i++) {
    if (checkType(rowData[i]) && checkPrice(rowData[i]) && checkRooms(rowData[i]) && checkGuests(rowData[i]) && checkFeatures(rowData[i])) {
      if (resultArray.length === MAX_ADS_AMOUNT) {
        break;
      }
      resultArray.push(rowData[i]);
    }
  }
  renderSimpleMarkers(resultArray);
};

function getFilteredData (rowData) {
  for (const element of rowData) {
    savedTenRowDataElements.push(element);
    if (savedTenRowDataElements.length === MAX_ADS_AMOUNT) {
      break;
    }
  }
  renderSimpleMarkers(savedTenRowDataElements); //получение и отрисовка первых 10 объявлений при загрузке страницы
  mapForm.addEventListener('change', debounce((evt) => applyFilter(evt, rowData), RERENDER_DELAY));
}

export { resetMarkersAndMapCoords, closePopup, activatePage, renderSimpleMarkers };
