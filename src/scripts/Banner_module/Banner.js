import 'regenerator-runtime/runtime';

export default class Banner {
  static createBanner() {
    const mainContentBlock = document.querySelector('.main-content-section');

    const mainPageWrapper = document.createElement('div');
    mainPageWrapper.classList.add('main-page-wrapper');

    const bannerContainer = document.createElement('div');
    bannerContainer.classList.add('banner-container');

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas2');

    bannerContainer.appendChild(canvas);
    mainPageWrapper.appendChild(bannerContainer);
    mainContentBlock.appendChild(mainPageWrapper);
  }
}
