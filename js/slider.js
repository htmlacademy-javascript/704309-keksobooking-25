//Реализация слайдера при помощи noUiSlider
const adForm = document.querySelector('.ad-form');
const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');

//Сброс формы в момент загрузки страницы для корректной работы плэйсхолдера поля "Цена за ночь"
window.onload = () => {
  adForm.reset();
};

//Создание слайдера с первоначальными настройками
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  step: 1,
  start: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseInt(value, 10);
    },
  },
});

//Запись значения с ползунка в поле "Цена за ночь"
sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

//Запись значения в слайдер (корректировка положения ползунка) в момент записи значения в поле "Цена за ночь" и смене фокуса
priceField.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceField.value);
});
