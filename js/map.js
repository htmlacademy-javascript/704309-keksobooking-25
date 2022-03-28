import { cards } from './mock-data.js';
import { renderPopup } from './render-ads.js';
let isMapInitialized = false;

//Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    isMapInitialized = true;
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);

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
    lat: 35.6895,
    lng: 139.692,
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
const resetButtonElement = document.querySelector('.ad-form__reset');
resetButtonElement.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: 35.6895,
    lng: 139.692,
  });

  map.setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);
});

//Замена изображения штатной иконки для обычной метки
const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//Отображение обычных меткок на карте, реализация показа всплывающего окна с подробной информвцией
//при нажатии нажатии на любую из обычных меток
cards.forEach((card) => {
  const {lat, lng} = card.location;
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
    .bindPopup(renderPopup(card));
});

export { isMapInitialized };

