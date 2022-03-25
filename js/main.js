import { renderPopup } from './render-ads.js';
import { cards } from './mock-data.js';
import { validateAdForm, activatePage } from './form.js';

renderPopup(cards[0]);
validateAdForm();
activatePage(true);
