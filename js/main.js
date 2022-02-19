'use strict';
// Функция получения случайного целого числа из переданного диапазона включительно.
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomNumber = function (min, max) {
  if (min <= 0) {
    return alert('Начальное и конечное значения диапазона должны быть положительными.');
  }

  if (max <= min) {
    return alert('Начальное значение должно быть меньше конечного.');
  }

  return Math.round(Math.random() * (max - min) + min);
};

// Функция получения случайного числа с плавающей точкой из переданного диапазона включительно.

const getRandomFloat = function (min, max, numbersAfterPoint) {
  if (min <= 0) {
    return alert('Начальное и конечное значения диапазона должны быть положительными.');
  }

  if (max <= min) {
    return alert('Начальное значение должно быть меньше конечного.');
  }

  const randomNumber = Math.random() * (max - min) + min;

  return Number(randomNumber.toFixed(numbersAfterPoint));
};
