import { createManyAdvertisements } from './mock-data.js';
import { renderPopup } from './render-ads.js';
import './form.js';
renderPopup(createManyAdvertisements());
