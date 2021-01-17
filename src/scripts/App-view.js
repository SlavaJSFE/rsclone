import services from './services/viewServices.js';
import createDOMElement from './services/createDOMElement.js';
import statement from './constants/TravelPlaningApp-constants.js';
import { local } from '../scripts/Language_module/languageSwicher';
import objTranslate from '../scripts/Language_module/commonLang.component';
export default class TravelPlaningAppView {
	constructor(model) {
		this.model = model;
	}

	init() {
		this.appWrapper = createDOMElement('div', 'app-wrapper');
		document.body.prepend(this.appWrapper);

		this.createHeader();
		this.createHeaderOptions();
		this.createMain();
		this.createFooter();
	}

	createHeader() {
		this.header = services.createHeader();
		this.appWrapper.appendChild(this.header);
	}

	createHeaderOptions() {
		const authorization = createDOMElement('div', 'authorization');
		const language = createDOMElement('div', 'language');
		this.options = createDOMElement('div', 'options');

		const langSwitcher = document.createElement('select');
		langSwitcher.setAttribute('name', '');
		langSwitcher.setAttribute('id', '');
		langSwitcher.classList.add('langSwitcher');

		const optionsLang = [];
		const languages = {
			ru: objTranslate.commonLang['langSelect1_' + local],
			en: objTranslate.commonLang['langSelect2_' + local],
			pl: objTranslate.commonLang['langSelect3_' + local],
			de: objTranslate.commonLang['langSelect4_' + local],
			zh: objTranslate.commonLang['langSelect5_' + local],
		};
		let i = 0;
		let selectIndex = 0;
		for (let key in languages) {
			optionsLang[i] = document.createElement("option");
			optionsLang[i].innerHTML = languages[key];
			optionsLang[i].value = key;
			langSwitcher.appendChild(optionsLang[i]);
			if (local === key) {
				selectIndex = i;
			}
			i++;
		}
		optionsLang[selectIndex].selected = true;

		language.appendChild(langSwitcher);
		this.options.append(authorization, language);
		this.header.appendChild(this.options);
	}

	createMain() {
		this.main = createDOMElement('main', 'main');
		this.appWrapper.appendChild(this.main);

		this.createNavigation();
		this.createMainContentSection();
		this.createSideBar();
	}

	createNavigation() {
		this.navigation = services.createNavigation();
		this.main.appendChild(this.navigation);
	}

	createMainContentSection() {
		this.mainContentSection = createDOMElement('section', 'main-content-section');
		this.main.appendChild(this.mainContentSection);
	}

	createSideBar() {
		this.sideBar = createDOMElement('aside', 'side-bar');
		this.main.appendChild(this.sideBar);

		const clockWidget = createDOMElement('div', 'clock');
		const mapWidget = createDOMElement('div', 'map');
		const currencyWidget = createDOMElement('div', 'currency');

		this.sideBar.append(clockWidget, mapWidget, currencyWidget);
	}

	createFooter() {
		this.footer = services.createFooter();
		this.appWrapper.appendChild(this.footer);
	}

	showMap() {
		const mapImage = createDOMElement('img', 'map-image', '', '', ['src', statement.map]);
		this.mainContentSection.appendChild(mapImage);
	}

	showNotes() {
		const notesImage = createDOMElement('img', 'notes-image', '', '', ['src', statement.notes]);
		this.mainContentSection.appendChild(notesImage);
	}
}
