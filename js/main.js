import { setAdFormSubmit } from './form.js';
import './map.js';
import './slider.js';
import { openModalSuccessSendData, openModalErrorSendData } from './modals.js';
import './form-reset.js';

setAdFormSubmit(openModalSuccessSendData, openModalErrorSendData);
