import { debounce } from './utils.js';
import { resetMarkersAndMapCoords, closePopup, renderSimpleMarkers, deleteMarkerGroupLayer } from './map.js';

const mapForm = document.querySelector('.map__filters');
const MAX_ADS_AMOUNT = 10;
const savedTenRowDataElements = [];
const defaultValue = 'any';
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const defaultCheckedValue = false;
const checkboxFilterWifiElement = document.querySelector('#filter-wifi');
const checkboxFilterDishwasherElement = document.querySelector('#filter-dishwasher');
const checkboxFilterParkingElement = document.querySelector('#filter-parking');
const checkboxFilterWasherElement = document.querySelector('#filter-washer');
const checkboxFilterElevatorElement = document.querySelector('#filter-elevator');
const checkboxFilterConditionerElement = document.querySelector('#filter-conditioner');
const arrayFilterElements = [checkboxFilterWifiElement, checkboxFilterDishwasherElement, checkboxFilterParkingElement, checkboxFilterWasherElement, checkboxFilterElevatorElement, checkboxFilterConditionerElement];
const BEFORE_MIDDLE_PRICE = 10000;
const AFTER_MIDDLE_PRICE = 50000;
const RERENDER_DELAY = 500;

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
  if ((checkboxFilterWifiElement.checked || checkboxFilterDishwasherElement.checked || checkboxFilterParkingElement.checked ||
    checkboxFilterWasherElement.checked || checkboxFilterElevatorElement.checked || checkboxFilterConditionerElement.checked) === defaultCheckedValue) {
    return true;
  }
  const arrayCheckedFilterElements = [];
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

const getFilteredData = (rowData) => {
  for (const element of rowData) {
    savedTenRowDataElements.push(element);
    if (savedTenRowDataElements.length === MAX_ADS_AMOUNT) {
      break;
    }
  }
  renderSimpleMarkers(savedTenRowDataElements); //получение и отрисовка первых 10 объявлений при загрузке страницы
  mapForm.addEventListener('change', debounce((evt) => applyFilter(evt, rowData), RERENDER_DELAY));
};

export { getFilteredData, savedTenRowDataElements };
