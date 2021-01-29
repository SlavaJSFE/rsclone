import objTranslate from '../Language_module/commonLang.component';
import TravelPlaningApp from '../App-controller';

export let local = 'ru';
let langSwitcher;
const title = document.querySelector('.titleText');
const spanText = document.querySelector('.spanText');

window.addEventListener("DOMContentLoaded", () => {
	langSwitcher = document.querySelector('.langSwitcher');
})

console.log(langSwitcher);
document.querySelector("body").addEventListener("change", function (event) {
	let selectLang = event.target.closest('.langSwitcher');
	if (selectLang !== null) {
		langSwitcher = document.querySelector('.langSwitcher');
		local = langSwitcher.value;
		document.body.innerHTML = '';
		TravelPlaningApp.init();
	}
});

