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
//вызов функции, чтобы не было замечаний от ESLint
getRandomInteger();

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
//вызов функции, чтобы не было замечаний от ESLint
getRandomFloat();

const TITLES_OF_PLACEMENT = [
  'Гостиница Султан',
  'Хостел Багратион',
  'Апартаменты на Ленина',
  'Солнечная студия',
  'Отель "Осенний бульвар"',
  'Студия у метро Селигерская',
  'Апартаменты Алтай',
  'Студия у Фёдора',
  'Квартира у Кудринской башни',
  'Неплохая студия на Авиамоторной',
];

const TYPE_OF_PLACEMENT = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECKIN_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_OF_PLACEMENT = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION_OF_PLACEMENT = [
  'Апартаменты расположены в самом центре, из окон открывается шикарный вид на город.',
  'Стойка регистрации работает круглосуточно. В радиусе 5 минут ходьбы от отеля можно посетить различные кафе и рестораны.',
  'Район, в котором расположены апартаменты, - это любимая часть города среди наших гостей согласно независимым отзывам.',
  'В распоряжении гостей собственная ванная комната с душем и тапочками. В некоторых номерах есть гостиная зона и балкон.',
  'Апартаменты расположены на севере города, недалеко от реки',
  'Гости могут покататься на речном трамвае от причала, который находится в непосредственной близости от квартиры.',
  'Этот 4-звездочный отель предлагает услуги консьержа и камеру хранения багажа.',
  'К услугам гостей доставка еды и напитков в номер, трансфер от аэропорта.',
  'В ресторане неподалёку от апартаментов подают блюда традиционной русской и европейской кухни.',
  'Поездка на метро от апартаментов до центра города занимает 15 минут.',
];

const PHOTOS_OF_PLACEMENT = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIrandomIntForArrayberrandomIntForArraybera4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNrandomIntForArrayberQGWrandomIntForArrayberZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//Функция по генерации массива случайной длинны из переданного массива. Минимальное количество элелементов в новом массиве: 1.
const getRandomArraySlice = (array) => array.sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(1, array.length));

//Функция для получения необходимого количества значений исходного массива с записью в новый массив.
//Вне зависимости от того, больше по количеству элементов должен быть новый массив или меньше.
const getRandomPhotos = (arrayWithPhotos, amountOfPhotos) => {
  const resultArray = [];
  for (let i = 0; i < amountOfPhotos; i++) {
    for (let j = 0; j < arrayWithPhotos.length; j++) {
      if (resultArray.length >= amountOfPhotos){
        break;
      } else {
        resultArray.push(arrayWithPhotos[j]);
      }
    }
  }
  return resultArray;
};

//Функция для декомпозиции кода. Позволяет получить случайный элемент переданного массива.
const getRandomElementOfArray = (elements) => {
  const result = elements[getRandomInteger(0, elements.length - 1)];
  return result;
};

//Функция для сборки одного рекламного объявления. Будет создан один объект.
const createAdvertisement = (idx) => {
  const currentIndex = idx + 1;
  //Свойства для offer
  const randomPrice = getRandomInteger(500, 5000);
  const randomQuantityOfRooms = getRandomInteger(1, 20);
  const randomQuantityOfGuests = getRandomInteger(1, 10);
  const getRandomFeatures = getRandomArraySlice(FEATURES_OF_PLACEMENT);

  //Свойства для location
  const randomLatitude = getRandomFloat(35.65, 35.7, 5);
  const randomLongitude = getRandomFloat(139.7, 139.8, 5);

  const advertismentObject = {
    author: {
      avatar: `img/avatars/user${(currentIndex.toString()).padStart(2, '0')}.png`,
    },
    offer: {
      title: getRandomElementOfArray(TITLES_OF_PLACEMENT),
      address: `${randomLatitude}, ${randomLongitude}`,
      price: randomPrice,
      type: getRandomElementOfArray(TYPE_OF_PLACEMENT),
      rooms: randomQuantityOfRooms,
      guests: randomQuantityOfGuests,
      checkin: getRandomElementOfArray(TIME_CHECKIN_CHECKOUT),
      checkout: getRandomElementOfArray(TIME_CHECKIN_CHECKOUT),
      features: getRandomFeatures,
      description: getRandomElementOfArray(DESCRIPTION_OF_PLACEMENT),
      photos: getRandomPhotos(PHOTOS_OF_PLACEMENT, getRandomInteger(1, 10)),
    },
    location: {
      lat: randomLatitude,
      lng: randomLongitude,
    },
  };
  return advertismentObject;
};

//Функция по созданию массива объектов аналогичных переданному объекту.
const NUMBER_OF_ADVERTISEMENTS = 10;
const createManyAdvertisements = () => Array.from({length: NUMBER_OF_ADVERTISEMENTS}).map((item, idx) => createAdvertisement(idx));
createManyAdvertisements();
