//Функция для определения типа жилья
function getOfferType (type) {
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
}
//Функция определения нажатия клавиши "Escape"
const isEscapeKey = (evt) => evt.key === 'Escape';

const TYPE_OF_PLACEMENT = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

export { getOfferType, isEscapeKey, TYPE_OF_PLACEMENT };

