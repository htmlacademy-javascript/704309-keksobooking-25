//Реализация слайдера при помощи noUiSlider
const sliderElement = document.querySelector('.ad-form__slider');
const priceFieldElement = document.querySelector('#price');
const typeFieldElement = document.querySelector('#type');
const MIN_PRICE = 0;
const MAX_PRICE = 100000;
//Данные для функции получения минимального значения value и placeholder для поля price
const MinPriceForType = {
  BUNGALOW: '0',
  FLAT: '1000',
  HOTEL: '3000',
  HOUSE: '5000',
  PALACE: '10000'
};

//Создание слайдера с первоначальными настройками
noUiSlider.create(sliderElement, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseInt(value, 10),
  },
});

//Запись значения с ползунка в поле "Цена за ночь"
sliderElement.noUiSlider.on('update', () => {
  priceFieldElement.value = sliderElement.noUiSlider.get();
});

//Запись значения в слайдер (корректировка положения ползунка) в момент записи значения в поле "Цена за ночь" и смене фокуса
priceFieldElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceFieldElement.value);
});

//Функция для получения минимального значения value и placeholder для поля price
const getMinPrice = () => Number(MinPriceForType[typeFieldElement.value.toUpperCase()]);
typeFieldElement.addEventListener('change', () => {
  const minPriceValue = getMinPrice();
  sliderElement.noUiSlider.updateOptions({
    start: minPriceValue,
  });
  priceFieldElement.value = minPriceValue;
  priceFieldElement.placeholder = minPriceValue;
});

//Функция для сброса позиции ползунка слайдера в первоначальное
const resetSliderPosition = () => {
  sliderElement.noUiSlider.updateOptions({
    start: 1000,
  });
};

export { resetSliderPosition };
