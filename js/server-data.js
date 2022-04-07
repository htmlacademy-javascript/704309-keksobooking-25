import { resetFormsAndMap } from './form-reset.js';
import { unblockSubmitButton } from './form.js';
//Получение данных с сервера (методом GET)
const getData = (onSuccess, onError, url) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onSuccess, onError, url, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        unblockSubmitButton();
        resetFormsAndMap();
        return;
      }
      onError();
      unblockSubmitButton();
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
