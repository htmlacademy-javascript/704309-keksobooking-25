import { validateAdForm, activatePage } from './form.js';
import { isMapInitialized } from './map.js';

validateAdForm();
activatePage( isMapInitialized );
