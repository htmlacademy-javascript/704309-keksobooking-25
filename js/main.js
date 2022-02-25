// Функция получения случайного целого числа из переданного диапазона включительно.
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomInteger = function (min, max) {
  if (min < 0 || max < 0) {
    throw Error('Positive number is required');
  } else if (max < min) {
    [min, max] = [max, min];
  } else if (max === min) {
    return max;
  }

  return Math.round(Math.random() * (max - min) + min);
};
//вызов функции, чтобы не было замечаний от ESLint
getRandomInteger();

// Функция получения случайного числа с плавающей точкой из переданного диапазона включительно.

const getRandomFloat = function (min, max, numbersAfterPoint) {
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
//вызов функции, чтобы не было замечаний от ESLint
getRandomFloat();
