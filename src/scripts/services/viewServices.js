import createDOMElement from './createDOMElement.js';
import statement from '../constants/TravelPlaningApp-constants';

const services = {
  createHeader() {
    const header = createDOMElement('header', 'header');
    const title = createDOMElement('h1', 'title', 'Travel Planning App');

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
    const modalContent = createDOMElement('div', 'modal-content');
    createDOMElement('h4', null, 'Authentication', modalContent);

    const form = createDOMElement('form', null, null, modalContent, ['id', 'auth-form']);

    const inputEmail = createDOMElement('div', 'input-field', null, form);
    createDOMElement('input', 'validate', null, inputEmail, ['type', 'email'], ['id', 'email']);
    createDOMElement('label', null, 'Email', inputEmail, ['for', 'email']);

    const inputPassword = createDOMElement('div', 'input-field', null, form);
    createDOMElement('input', 'validate', null, inputPassword, ['type', 'email'], ['id', 'password']);
    createDOMElement('label', null, 'Password', inputPassword, ['for', 'password']);

    createDOMElement('button', 'btn waves-effect waves-light', 'Enter', form, ['type', 'submit']);

    modalWindow.innerHTML = '';
    modalWindow.appendChild(modalContent);
  },

  createNavigation() {
    const navigation = createDOMElement('nav', 'nav');

    const menuItem1 = createDOMElement('div', 'nav-item my-trips', 'My Trips');
    const menuItem2 = createDOMElement('div', 'nav-item map', 'Map');
    const menuItem3 = createDOMElement('div', 'nav-item notes', 'Notes');
    const menuItem4 = createDOMElement('div', 'nav-item attractions', 'Attractions');

    navigation.append(menuItem1, menuItem2, menuItem3, menuItem4);

    return navigation;
  },

  createFooter() {
    const footer = createDOMElement('footer', 'footer');
    const githubLogo = createDOMElement('img', 'gh-logo', null, null, ['src', statement.githubLogo]);

    const authorsArray = [
      createDOMElement('a', 'gh-link', 'Roman', null, ['href', statement.roman]),
      createDOMElement('a', 'gh-link', 'Maria', null, ['href', statement.maria]),
      createDOMElement('a', 'gh-link', 'Yulia', null, ['href', statement.julia]),
      createDOMElement('a', 'gh-link', 'Slava', null, ['href', statement.slava]),
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
