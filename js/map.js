import { renderPopup } from './render-ads.js';
import { getServerData } from './server-data.js';
import { openModalServerError } from './modals.js';
const START_COORDS = {
  lat: 35.6824,
  lng: 139.75219,
};

//Изменение состояния страницы (Активное/Неактивное)
const activatePage = (activate = false) => {
  const adForm = document.querySelector('.ad-form');
  const mapForm = document.querySelector('.map__filters');
  const mapFormFields = mapForm.children;
  const adFormFields = adForm.children;

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
const urlToGetData = 'https://25.javascript.pages.academy/keksobooking/data';
const map = L.map('map-canvas')
  .on('load', () => {
    activatePage(true);
    getServerData(renderSimpleMarkers, openModalServerError, urlToGetData);
  })
  .setView({
    lat: START_COORDS.lat,
    lng: START_COORDS.lng,
  }, 13);

//Создание слоя с изображениями карт
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

//Замена изображения штатной иконки для главной метки
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

mainMarker.addTo(map);

//Запись координат главной метки в поле address
const addressFieldElement = document.querySelector('#address');
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
  }, 13);
};

//Замена изображения штатной иконки для обычной метки
const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//Отображение обычных меткок на карте. Реализация показа всплывающего окна с подробной информацией
//при нажатии нажатии на любую из обычных меток
function renderSimpleMarkers (cards) {
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
      .addTo(map)
      .bindPopup(renderPopup(cards[i]));
  }
}

const closePopup = () => {
  map.closePopup();
};

export { resetMarkersAndMapCoords, closePopup };
