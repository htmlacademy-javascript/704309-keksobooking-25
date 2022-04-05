//Реализация слайдера при помощи noUiSlider
const sliderElement = document.querySelector('.ad-form__slider');
const priceFieldElement = document.querySelector('#price');
const MIN_PRICE = 0;
const MAX_PRICE = 100000;

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