//функция для определения типа жилья
const getOfferType = (type) => {
  const BuildingType = {
    FLAT: 'flat',
    BUNGALOW: 'bungalow',
    HOUSE: 'house',
    PALACE: 'palace',
    HOTEL: 'hotel',
  };

  switch (type) {
    case BuildingType.FLAT:
      return 'Квартира';
    case BuildingType.BUNGALOW:
      return 'Бунгало';
    case BuildingType.HOUSE:
      return 'Дом';
    case BuildingType.PALACE:
      return 'Дворец';
    case BuildingType.HOTEL:
      return 'Отель';
    default:
      throw Error('Incorrect type');
  }
};

//функция определения нажатия клавиши "Escape"
const isEscapeKey = (evt) => evt.key === 'Escape';

//функция для устранения "дребезга" (например при частом изменении параметров фильтра)
//взята с сайта: https://www.freecodecamp.org/news/javascript-debounce-example. Доработана Академией.
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getOfferType, isEscapeKey, debounce };
