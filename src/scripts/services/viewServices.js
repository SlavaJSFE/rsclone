import createDOMElement from './createDOMElement.js';
import statement from '../constants/TravelPlaningApp-constants';
import objTranslate from '../Language_module/commonLang.component';
import '../Language_module/languageSwicher';
import { local } from '../Language_module/languageSwicher';

const services = {
  createHeader() {
    const header = createDOMElement('header', 'header');
    const canvas = createDOMElement('canvas');
    canvas.setAttribute('id', 'canvas');
    header.appendChild(canvas);

    return header;
  },

  createHeaderLinks() {
    const linksContainer = createDOMElement('div', 'header-links');

    const authorization = createDOMElement('div', 'authorization', null, linksContainer);

    const logIn = createDOMElement('div', 'btn log-in', 'Log In', authorization);
    createDOMElement('i', 'material-icons left', 'fingerprint', logIn);

    const logOut = createDOMElement('div', 'log-out btn', 'Log Out', authorization);
    createDOMElement('i', 'material-icons left', 'mood', logOut);

    const singUp = createDOMElement('div', 'btn sign-up', 'Sing Up', authorization);
    createDOMElement('i', 'material-icons left', 'person_add', singUp);

    const language = createDOMElement('div', 'language btn', null, linksContainer);

    const langSwitcher = `<i class="material-icons left">language</i>
                          <select class="langSwitcher">
                            <div><option value="ru">Русский</option></div>
                            <div><option value="en">English</option></div>
                            <div><option value="pl">Polski</option></div>
                            <div><option value="de">Deutsch</option></div>
                            <div><option value="zh">中文</option></div>
                            
                          </select>`;
    // document.createElement('select');
    // langSwitcher.setAttribute('name', '');
    // langSwitcher.setAttribute('id', '');
    // langSwitcher.classList.add('langSwitcher');

    // const optionsLang = [];
    // const languages = {
    //   ru: objTranslate.commonLang['langSelect1_' + local],
    //   en: objTranslate.commonLang['langSelect2_' + local],
    //   pl: objTranslate.commonLang['langSelect3_' + local],
    //   de: objTranslate.commonLang['langSelect4_' + local],
    //   zh: objTranslate.commonLang['langSelect5_' + local],
    // };
    // let i = 0;
    // let selectIndex = 0;
    // for (let key in languages) {
    //   optionsLang[i] = document.createElement('option');
    //   optionsLang[i].innerHTML = languages[key];
    //   optionsLang[i].value = key;
    //   langSwitcher.appendChild(optionsLang[i]);
    //   if (local === key) {
    //     selectIndex = i;
    //   }
    //   i += 1;
    // }
    // optionsLang[selectIndex].selected = true;

    // language.appendChild(langSwitcher);
    language.innerHTML = langSwitcher;

    const options = Array.from(language.querySelectorAll('option'));
    const currentLang = options.filter((option) => option.value === local);
    currentLang[0].selected = true;

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

  fillModalSignUp(modal) {
    const modalWindow = modal;

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>Registration</h4>
                            <form id="sign-up-form">
                              <div class="input-field">
                                <input id="email" class="validate" type="email" required>
                                <label for="email">Email</label>
                              </div>
                              <div class="input-field">
                                <input id="password" class="validate" type="password" required>
                                <label for="password">Password</label>
                              </div>
                              <button id="sign-up-btn" class="btn waves-effect waves-light" type="submit">
                                Sign Up
                                <i class="material-icons right">send</i>
                              </button>
                            </form>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  createNavigation() {
    const navigation = createDOMElement('nav', 'nav');

    const menuItem1 = createDOMElement('div', 'nav-item-block active', null, null, [
      'id',
      'nav-home',
    ]);
    createDOMElement('i', 'material-icons', 'home', menuItem1);
    createDOMElement('div', 'nav-item home', objTranslate.commonLang['main_' + local], menuItem1);

    const menuItem2 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-my-trips']);
    createDOMElement('i', 'material-icons', 'airport_shuttle', menuItem2);
    createDOMElement(
      'div',
      'nav-item my-trips',
      objTranslate.commonLang['myTrips_' + local],
      menuItem2
    );

    const menuItem3 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-map']);
    createDOMElement('i', 'material-icons', 'place', menuItem3);
    createDOMElement('div', 'nav-item map', objTranslate.commonLang['map_' + local], menuItem3);

    const menuItem4 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-notes']);
    createDOMElement('i', 'material-icons', 'notes', menuItem4);
    createDOMElement('div', 'nav-item notes', objTranslate.commonLang['notes_' + local], menuItem4);

    const menuItem5 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-sights']);
    createDOMElement('i', 'material-icons', 'account_balance', menuItem5);
    createDOMElement(
      'div',
      'nav-item sights',
      objTranslate.commonLang['sights_' + local],
      menuItem5
    );

    const menuItem6 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-todo']);
    createDOMElement('i', 'material-icons', 'check_box', menuItem6);
    createDOMElement('div', 'nav-item todo', objTranslate.commonLang['todo_' + local], menuItem6);

    navigation.append(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6);

    return navigation;
  },

  createFooter() {
    const footer = createDOMElement('footer', 'footer');
    const githubLogo = createDOMElement('img', 'gh-logo', null, null, [
      'src',
      statement.githubLogo,
    ]);

    const authorsArray = [
      createDOMElement(
        'a',
        'gh-link',
        [createDOMElement('span', 'roman-link', 'Roman')],
        null,
        ['href', statement.roman],
        ['target', 'blank']
      ),
      createDOMElement(
        'a',
        'gh-link',
        [createDOMElement('span', 'maria-link', 'Maria')],
        null,
        ['href', statement.maria],
        ['target', 'blank']
      ),
      createDOMElement(
        'a',
        'gh-link',
        [createDOMElement('span', 'yulia-link', 'Yulia')],
        null,
        ['href', statement.julia],
        ['target', 'blank']
      ),
      createDOMElement(
        'a',
        'gh-link',
        [createDOMElement('span', 'slava-link', 'Slava')],
        null,
        ['href', statement.slava],
        ['target', 'blank']
      ),
    ];
    const authors = createDOMElement('div', 'authors', authorsArray);
    const rssLogo = createDOMElement('img', 'rss-logo', null, null, ['src', statement.rssLogo]);
    const rsschoolLink = createDOMElement(
      'a',
      'rss-link',
      null,
      null,
      ['href', statement.rssLink],
      ['target', 'blank']
    );

    rsschoolLink.appendChild(rssLogo);
    footer.append(githubLogo, authors, rsschoolLink);

    return footer;
  },
};

export default services;
