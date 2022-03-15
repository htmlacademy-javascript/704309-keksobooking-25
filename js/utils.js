// Функция получения случайного целого числа из переданного диапазона включительно.
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    throw Error('Positive number is required');
  } else if (max < min) {
    [min, max] = [max, min];
  } else if (max === min) {
    return max;
  }

  return Math.round(Math.random() * (max - min) + min);
};


// Функция получения случайного числа с плавающей точкой из переданного диапазона включительно.

const getRandomFloat = (min, max, numbersAfterPoint) => {
  if (min < 0 || max < 0) {
    throw Error('Positive number is required');
  } else if (max < min) {
    [min, max] = [max, min];
  } else if (max === min) {
    return max;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return Number(randomNumber.toFixed(numbersAfterPoint));
};

//Функция для декомпозиции кода. Позволяет получить случайный элемент переданного массива.
const getRandomElementOfArray = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция по генерации массива случайной длинны из переданного массива. Минимальное количество элелементов в новом массиве: 1.
const getRandomArraySlice = (array) => array.sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(0, array.length));

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

export { getRandomInteger, getRandomFloat, getRandomElementOfArray, getRandomArraySlice, getOfferType };

