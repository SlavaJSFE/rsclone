import createDOMElement from './createDOMElement';
import statement from '../constants/TravelPlaningApp-constants';
import translate from '../Language_module/commonLang.component';
import { local } from '../constants/language';

console.log(local);

const services = {
  createHeader() {
    const header = createDOMElement('header', 'header');

    return header;
  },

  createBurger() {
    const burger = createDOMElement('div', 'burger-menu', [
      createDOMElement('div', 'burger-inner'),
    ]);

    return burger;
  },

  createCanvas() {
    const canvas = createDOMElement('canvas', null, null, null, ['id', 'canvas']);

    return canvas;
  },

  createHeaderLinks() {
    const linksContainer = createDOMElement('div', 'header-links');

    const authorization = createDOMElement('div', 'authorization', null, linksContainer);

    const logIn = createDOMElement('div', 'btn log-in', translate[`logIn_${local}`], authorization);
    createDOMElement('i', 'material-icons left', 'fingerprint', logIn);

    const logOut = createDOMElement(
      'div',
      'log-out btn',
      translate[`logOut_${local}`],
      authorization
    );
    createDOMElement('i', 'material-icons left', 'mood', logOut);

    const singUp = createDOMElement(
      'div',
      'btn sign-up',
      translate[`signUp_${local}`],
      authorization
    );
    createDOMElement('i', 'material-icons left', 'person_add', singUp);

    const language = createDOMElement('div', 'language btn', null, linksContainer);

    const langSwitcher = `<i class="material-icons left">language</i>
                          <select class="langSwitcher">
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                            <option value="pl">Polski</option>
                            <option value="de">Deutsch</option>
                            <option value="zh">中文</option>
                          </select>`;

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

    const authentication = translate[`authentication_${local}`];
    const password = translate[`password_${local}`];
    const enter = translate[`enter_${local}`];

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>${authentication}</h4>
                            <form id="auth-form">
                              <div class="input-field">
                                <input id="email" class="validate" type="email" required>
                                <label for="email">Email</label>
                              </div>
                              <div class="input-field">
                                <input id="password" class="validate" type="password" required>
                                <label for="password">${password}</label>
                              </div>
                              <button id="auth-btn" class="btn waves-effect waves-light" type="submit">
                                ${enter}
                                <i class="material-icons right">send</i>
                              </button>
                            </form>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  fillModalSignUp(modal) {
    const modalWindow = modal;

    const registration = translate[`registration_${local}`];
    const password = translate[`password_${local}`];
    const createAccount = translate[`createAccount_${local}`];

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>${registration}</h4>
                            <form id="sign-up-form">
                              <div class="input-field">
                                <input id="email" class="validate" type="email" required>
                                <label for="email">Email</label>
                              </div>
                              <div class="input-field">
                                <input id="password" class="validate" type="password" required>
                                <label for="password">${password}</label>
                              </div>
                              <button id="sign-up-btn" class="btn waves-effect waves-light" type="submit">
                                ${createAccount}
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
    createDOMElement('div', 'nav-item home', translate[`main_${local}`], menuItem1);

    const menuItem2 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-my-trips']);
    createDOMElement('i', 'material-icons', 'airport_shuttle', menuItem2);
    createDOMElement('div', 'nav-item my-trips', translate[`myTrips_${local}`], menuItem2);

    const menuItem3 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-map']);
    createDOMElement('i', 'material-icons', 'place', menuItem3);
    createDOMElement('div', 'nav-item map', translate[`map_${local}`], menuItem3);

    const menuItem4 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-notes']);
    createDOMElement('i', 'material-icons', 'notes', menuItem4);
    createDOMElement('div', 'nav-item notes', translate[`notes_${local}`], menuItem4);

    const menuItem5 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-sights']);
    createDOMElement('i', 'material-icons', 'account_balance', menuItem5);
    createDOMElement('div', 'nav-item sights', translate[`sights_${local}`], menuItem5);

    const menuItem6 = createDOMElement('div', 'nav-item-block', null, null, ['id', 'nav-todo']);
    createDOMElement('i', 'material-icons', 'check_box', menuItem6);
    createDOMElement('div', 'nav-item todo', translate[`mustVisit_${local}`], menuItem6);

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
