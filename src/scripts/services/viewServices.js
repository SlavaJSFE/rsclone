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
    const modal = createDOMElement('div', 'modal', 'This is modal window', '', ['id', 'modal1']);
    return modal;
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
