import { getOfferType } from './utils.js';
import { createManyAdvertisementsData } from './mock-data.js';

const renderPopup = (dataForRendering) => {
  const similarContainerElement = document.querySelector('#map-canvas'); //место отрисовки карточек полученных на основе шаблона
  const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup'); //получение разметки шаблона
  const similarCards = dataForRendering; //получен объект с данными из массива объявлений

  const cardElement = similarCardTemplate.cloneNode(true); //получен клонированный элемент

  cardElement.querySelector('.popup__title').textContent = similarCards.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = similarCards.offer.address;
  cardElement.querySelector('.popup__type').textContent = getOfferType(similarCards.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${similarCards.offer.rooms} комнаты для ${similarCards.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarCards.offer.checkin}, выезд до ${similarCards.offer.checkout}`;
  cardElement.querySelector('.popup__avatar').src = similarCards.author.avatar;

  //отрисовка поля description
  if (similarCards.offer.description.length === 0) {
    cardElement.querySelector('.popup__description').hidden = true;
  } else {
    cardElement.querySelector('.popup__description').textContent = similarCards.offer.description;
  }

  //отрисовка поля price
  const priceElement = document.createElement('span');
  priceElement.textContent = ' ₽/ночь';
  cardElement.querySelector('.popup__text--price').textContent = similarCards.offer.price;
  cardElement.querySelector('.popup__text--price').appendChild(priceElement);

  //отрисовка поля features
  if (similarCards.offer.features.length === 0) {
    cardElement.querySelector('.popup__features').hidden = true;
  } else {
    const featuresArray = similarCards.offer.features; //доступные удобства. Массив строк.
    const featuresContainerElement = cardElement.querySelector('.popup__features'); // элемент, в который будут записан новый список элементов
    const featureListFragment = document.createDocumentFragment(); //вспомогательный фрагмент, для дальнейшей его вставки в разметку

    featuresArray.forEach((feature) => {
      const featureListItem = featuresContainerElement.querySelector(`.popup__feature--${feature}`);

      if (featureListItem){
        featureListFragment.append(featureListItem);
      }
    });

    featuresContainerElement.innerHTML = '';
    featuresContainerElement.append(featureListFragment);
  }

  //отрисовка поля photos
  const photosArray = similarCards.offer.photos;
  const photosContainerElement = cardElement.querySelector('.popup__photos');
  const photoListFragment = document.createDocumentFragment();

  if (similarCards.offer.photos.length === 0) {
    cardElement.querySelector('.popup__photo').hidden = true;
  } else {
    photosArray.forEach((photo) => {
      const photoListItem = photosContainerElement.querySelector('.popup__photo').cloneNode(true);
      photoListItem.src = photo;
      photoListFragment.append(photoListItem);
    });
    photosContainerElement.innerHTML = '';
    photosContainerElement.append(photoListFragment);
  }

  return similarContainerElement.appendChild(cardElement); //отрисовка клонированного элемента в поле #map-canvas
};

//Функция по рендерингу необходимого количества объявлений
const renderPopupsNeededAmount = (amount) => {
  for (let i = 0; i < amount; i++) {
    renderPopup(createManyAdvertisementsData()[i]);
  }
};

export { renderPopupsNeededAmount };
