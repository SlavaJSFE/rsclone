import 'regenerator-runtime/runtime';

export default class Banner {
	constructor() {
	}
	createBanner() {
		const main_content_block = document.querySelector('.main-content-section');

		const banner_container = document.createElement('div');
		banner_container.classList.add('banner-container');

		const canvas = document.createElement('canvas');
		canvas.setAttribute('id', 'canvas2');

		banner_container.appendChild(canvas);
		main_content_block.appendChild(banner_container);
	}
}