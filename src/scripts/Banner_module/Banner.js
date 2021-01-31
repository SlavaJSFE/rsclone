import 'regenerator-runtime/runtime';
import createDOMElement from '../services/createDOMElement';

export default class Banner {
  static createBanner() {
    const mainContentBlock = document.querySelector('.main-content-section');

    const mainPageWrapper = createDOMElement('div', 'main-page-wrapper');

    const bannerContainer = createDOMElement('div', 'banner-container');

    const canvas = createDOMElement('canvas', null, null, null, ['id', 'canvas2']);

    bannerContainer.appendChild(canvas);
    mainPageWrapper.appendChild(bannerContainer);
    mainContentBlock.append(mainPageWrapper);
  }
}
