import 'regenerator-runtime/runtime';
import Sights from './Sights.js';

const next_button = document.querySelector("#next_button");
if (next_button !== null) {
	next_button.addEventListener("click", function () {
		sights.showNext();
	});
}

const sights = new Sights();

document.querySelector("body").addEventListener("click", function (event) {
	let button_search = event.target.closest('.search');
	if (button_search !== null) {
		sights.search(null);
	}
});

document.querySelector("body").addEventListener("click", function (event) {
	let next_button = event.target.closest('#next_button');
	if (next_button !== null) {
		sights.showNext();
	}
});