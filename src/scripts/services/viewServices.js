import createDOMElement from './createDOMElement.js';
import statement from '../constants/TravelPlaningApp-constants';
import objTranslate from '../Language_module/commonLang.component';
import '../Language_module/languageSwicher';
import { local } from '../Language_module/languageSwicher'

const services = {
	createHeader() {
		const header = createDOMElement('header', 'header');
		const title = createDOMElement('h1', 'title', objTranslate.commonLang['title_' + local]);
		header.appendChild(title);
		return header;
	},

	createNavigation() {
		const navigation = createDOMElement('nav', 'nav');

		const menuItem1 = createDOMElement('div', 'nav-item my-trips', objTranslate.commonLang['menuItem1_' + local]);
		const menuItem2 = createDOMElement('div', 'nav-item map', objTranslate.commonLang['menuItem2_' + local]);
		const menuItem3 = createDOMElement('div', 'nav-item notes', objTranslate.commonLang['menuItem3_' + local]);
		const menuItem4 = createDOMElement('div', 'nav-item attractions', objTranslate.commonLang['menuItem4_' + local]);
		navigation.append(menuItem1, menuItem2, menuItem3, menuItem4);
		return navigation;
	},

	createFooter() {
		const footer = createDOMElement('footer', 'footer');
		const githubLogo = createDOMElement('img', 'gh-logo', '', '', ['src', statement.githubLogo]);

		const authorsArray = [
			createDOMElement('a', 'gh-link', 'Roman', '', ['href', statement.roman]),
			createDOMElement('a', 'gh-link', 'Maria', '', ['href', statement.maria]),
			createDOMElement('a', 'gh-link', 'Yulia', '', ['href', statement.julia]),
			createDOMElement('a', 'gh-link', 'Slava', '', ['href', statement.slava]),
		];
		const authors = createDOMElement('div', 'authors', authorsArray);
		const rssLogo = createDOMElement('img', 'rss-logo', '', '', ['src', statement.rssLogo]);
		const rsschoolLink = createDOMElement('a', 'rss-link', '', '', ['href', statement.rssLink]);

		rsschoolLink.appendChild(rssLogo);
		footer.append(githubLogo, authors, rsschoolLink);

		return footer;
	}
};

export default services;
