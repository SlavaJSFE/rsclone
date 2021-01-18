import createDOMElement from './createDOMElement.js';
import statement from '../constants/TravelPlaningApp-constants';
import objTranslate from '../Language_module/commonLang.component';
import '../Language_module/languageSwicher';
import { local } from '../Language_module/languageSwicher';

const services = {
  createHeader() {
    const header = createDOMElement('header', 'header');
    const title = createDOMElement('h1', 'title', 'RYMS Travel');

    header.appendChild(title);

    return header;
  },

  createHeaderLinks() {
    const linksContainer = createDOMElement('div', 'header-links');

    const authorization = createDOMElement('div', 'authorization btn black', 'Sing in', linksContainer);
    createDOMElement('i', 'material-icons left', 'fingerprint', authorization);

    const language = createDOMElement('div', 'language btn black', null, linksContainer);
    // createDOMElement('i', 'material-icons left', 'language', language);
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
      zh: objTranslate.commonLang['langSelect5_' + local]
    };
    let i = 0;
    let selectIndex = 0;
    for (let key in languages) {
      optionsLang[i] = document.createElement('option');
      optionsLang[i].innerHTML = languages[key];
      optionsLang[i].value = key;
      langSwitcher.appendChild(optionsLang[i]);
      if (local === key) {
        selectIndex = i;
      }
      i += 1;
    }
    optionsLang[selectIndex].selected = true;

    language.appendChild(langSwitcher);

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

    const menuItem1 = createDOMElement('div', 'nav-item home', objTranslate.commonLang['main_' + local]);
    const menuItem2 = createDOMElement('div', 'nav-item my-trips', objTranslate.commonLang['myTrips_' + local]);
    const menuItem3 = createDOMElement('div', 'nav-item map', objTranslate.commonLang['map_' + local]);
    const menuItem4 = createDOMElement('div', 'nav-item notes', objTranslate.commonLang['notes_' + local]);
    const menuItem5 = createDOMElement('div', 'nav-item sights', objTranslate.commonLang['sights_' + local]);

    navigation.append(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5);

    return navigation;
  },

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
