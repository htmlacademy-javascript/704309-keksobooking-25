import { getServerData } from './server-data.js';
import { isEscapeKey } from './utils.js';

//модальное окно при ошибке запроса данных с сервера
const modalErrorMessageTemplate = document.querySelector('#error--server').content.querySelector('.error'); //получение разметки из шаблона
const bodyElement = document.querySelector('body'); //элемент для отрисовки модального окна. (перед закрывающимся элементом <body>)

const modalErrorMessageElement = modalErrorMessageTemplate.cloneNode(true);
const ERROR_MESSAGE = 'Ошибка запроса данных с сервера:';
modalErrorMessageElement.querySelector('.error__message').textContent = ERROR_MESSAGE;
modalErrorMessageElement.classList.add('hidden');
bodyElement.appendChild(modalErrorMessageElement);

const openModalServerError = (error) => {
  modalErrorMessageElement.classList.remove('hidden');
  modalErrorMessageElement.querySelector('.error__message--text').textContent = error.message;
};

//обработчик клика для закрытия модального окна с ошибкой сервера
const closeModalErrorMessageElement = modalErrorMessageElement.querySelector('.error__button--close');
closeModalErrorMessageElement.addEventListener('click', () => {
  modalErrorMessageElement.classList.add('hidden');
});

//ФУНКЦИЯ-ЗАГЛУШКА. (РАЗОБРАТЬСЯ КАК ОТ НЕЁ ИЗБАВИТЬСЯ!)
const onSuccess = () => {};
getServerData(onSuccess, openModalServerError);

//функции открытия/закрытия модального окна для оповещения пользователя об УСПЕШНОЙ отправке данных из формы с объявлением
const modalSuccessSendDataTemplate = document.querySelector('#success').content.querySelector('.success'); //получение разметки из шаблона
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalSuccessSendData();
    closeModalErrorSendData();
  }
};

const modalSuccessSendDataElement = modalSuccessSendDataTemplate.cloneNode(true);
modalSuccessSendDataElement.classList.add('hidden');
bodyElement.appendChild(modalSuccessSendDataElement);

const openModalSuccessSendData = () => {
  modalSuccessSendDataElement.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

function closeModalSuccessSendData () {
  modalSuccessSendDataElement.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
}

modalSuccessSendDataElement.addEventListener('click', () => {
  closeModalSuccessSendData();
});

//функция открытия/закрытия модального окна для оповещения пользователя о НЕУСПЕШНОЙ отправке данных из формы с объявлением
const modalErrorSendDataTemplate = document.querySelector('#error').content.querySelector('.error'); //получение разметки из шаблона

const modalErrorSendDataElement = modalErrorSendDataTemplate.cloneNode(true);
const modalErrorRetryButtonElement = modalErrorSendDataElement.querySelector('.error__button'); //кнопка для повторной отправки объявления
modalErrorSendDataElement.classList.add('hidden');
bodyElement.appendChild(modalErrorSendDataElement);

const openModalErrorSendData = () => {
  modalErrorSendDataElement.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

function closeModalErrorSendData() {
  modalErrorSendDataElement.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
}

modalErrorRetryButtonElement.addEventListener('click', () => {
  closeModalErrorSendData();
});

modalErrorSendDataElement.addEventListener('click', () => {
  closeModalErrorSendData();
});

export { openModalSuccessSendData, openModalErrorSendData };
