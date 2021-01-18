import createDOMElement from './createDOMElement.js';
import statement from '../constants/TravelPlaningApp-constants';
import objTranslate from '../Language_module/commonLang.component';
import '../Language_module/languageSwicher';
import { local } from '../Language_module/languageSwicher';

const services = {
  createHeader() {
    const header = createDOMElement('header', 'header');
    const title = createDOMElement('h1', 'title', objTranslate.commonLang['title_' + local]);

    header.appendChild(title);

    return header;
  },

  createHeaderLinks() {
    const linksContainer = createDOMElement('div', 'header-links');

    const authorization = createDOMElement('div', 'authorization btn black', 'Sing in', linksContainer);
    createDOMElement('i', 'material-icons left', 'fingerprint', authorization);

    const language = createDOMElement('div', 'language btn black', 'Language', linksContainer);
    createDOMElement('i', 'material-icons left', 'language', language);

    return linksContainer;
  },

  createModal() {
    const modal = createDOMElement('div', 'modal', null, null, ['id', 'modal1']);
    return modal;
  },

  fillModal(modal) {
    const modalWindow = modal;

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>Authentication</h4>
                            <form id="auth-form">
                              <div class="input-field">
                                <input id="email" class="validate" type="email" required>
                                <label for="email">Email</label>
                              </div>
                              <div class="input-field">
                                <input id="password" class="validate" type="password" required>
                                <label for="password">Password</label>
                              </div>
                              <button id="auth-btn" class="btn waves-effect waves-light" type="submit">
                                Enter
                                <i class="material-icons right">send</i>
                              </button>
                            </form>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  createNavigation() {
    const navigation = createDOMElement('nav', 'nav');

    const menuItem1 = createDOMElement('div', 'nav-item home', 'Main');
    const menuItem2 = createDOMElement('div', 'nav-item my-trips', 'My Trips');
    const menuItem3 = createDOMElement('div', 'nav-item map', 'Map');
    const menuItem4 = createDOMElement('div', 'nav-item notes', 'Notes');
    const menuItem5 = createDOMElement('div', 'nav-item sights', 'Sights');

    navigation.append(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5);

    return navigation;
  },

  // createNavigation() {
  // 	const navigation = createDOMElement('nav', 'nav');

  // 	const menuItem1 = createDOMElement('div', 'nav-item my-trips', objTranslate.commonLang['menuItem1_' + local]);
  // 	const menuItem2 = createDOMElement('div', 'nav-item map', objTranslate.commonLang['menuItem2_' + local]);
  // 	const menuItem3 = createDOMElement('div', 'nav-item notes', objTranslate.commonLang['menuItem3_' + local]);
  // 	const menuItem4 = createDOMElement('div', 'nav-item attractions', objTranslate.commonLang['menuItem4_' + local]);
  // 	navigation.append(menuItem1, menuItem2, menuItem3, menuItem4);
  // 	return navigation;
  // },

  createFooter() {
    const footer = createDOMElement('footer', 'footer');
    const githubLogo = createDOMElement('img', 'gh-logo', null, null, ['src', statement.githubLogo]);

    const authorsArray = [
      createDOMElement('a', 'gh-link', 'Roman', null, ['href', statement.roman]),
      createDOMElement('a', 'gh-link', 'Maria', null, ['href', statement.maria]),
      createDOMElement('a', 'gh-link', 'Yulia', null, ['href', statement.julia]),
      createDOMElement('a', 'gh-link', 'Slava', null, ['href', statement.slava])
    ];
    const authors = createDOMElement('div', 'authors', authorsArray);
    const rssLogo = createDOMElement('img', 'rss-logo', null, null, ['src', statement.rssLogo]);
    const rsschoolLink = createDOMElement('a', 'rss-link', null, null, ['href', statement.rssLink]);

    rsschoolLink.appendChild(rssLogo);
    footer.append(githubLogo, authors, rsschoolLink);

    return footer;
  }
};

export default services;
