import { validateAdForm, activatePage } from './form.js';
import { isMapInitialized } from './map.js';
import './slider.js';

validateAdForm();
activatePage( isMapInitialized );
