import createDOMElement from './services/createDOMElement.js';
import statement from './constants/TravelPlaningApp-constants.js';

export default class TravelPlaningAppView {
  init() {
    this.appWrapper = createDOMElement('div', 'app-wrapper');
    document.body.prepend(this.appWrapper);

    this.createHeader();
    this.createMainBlock();
    this.createFooter();
  }

  createHeader() {
    this.header = createDOMElement('header', 'header');
    this.appWrapper.appendChild(this.header);
    this.title = createDOMElement('h1', 'title', 'Travel Planning App');

    this.header.appendChild(this.title);

    this.createHeaderOptions();
  }

  createHeaderOptions() {
    const authorization = createDOMElement('div', 'authorization');
    const language = createDOMElement('div', 'language');
    this.options = createDOMElement('div', 'options');

    this.options.append(authorization, language);
    this.header.appendChild(this.options);
  }

  createMainBlock() {
    this.main = createDOMElement('main', 'main');
    this.appWrapper.appendChild(this.main);

    this.createNavigation();
    this.createMainContentBlock();
    this.createSideBar();
  }

  createNavigation() {
    this.navigation = createDOMElement('nav', 'nav');
    this.main.appendChild(this.navigation);

    const menuItem1 = createDOMElement('div', 'nav-item nav1', 'menu1');
    const menuItem2 = createDOMElement('div', 'nav-item nav2', 'menu2');
    const menuItem3 = createDOMElement('div', 'nav-item nav3', 'menu3');

    this.navigation.append(menuItem1, menuItem2, menuItem3);
  }

  createMainContentBlock() {
    this.mainContentBlock = createDOMElement('section', 'main-content-block');
    this.main.appendChild(this.mainContentBlock);
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
    const footer = createDOMElement('footer', 'footer');
    const githubLogo = createDOMElement('img', 'gh-logo', '', '', ['src', statement.githubLogo]);

    const authorsArray = [
      createDOMElement('a', 'gh-link', 'Roman', '', ['href', statement.roman]),
      createDOMElement('a', 'gh-link', 'Maria', '', ['href', statement.maria]),
      createDOMElement('a', 'gh-link', 'Yulia', '', ['href', statement.julia]),
      createDOMElement('a', 'gh-link', 'Slava', '', ['href', statement.slava])
    ];
    const authors = createDOMElement('div', 'authors', authorsArray);
    const rssLogo = createDOMElement('img', 'rss-logo', '', '', ['src', statement.rssLogo]);
    const rsschoolLink = createDOMElement('a', 'rss-link', '', '', ['href', statement.rssLink]);

    rsschoolLink.appendChild(rssLogo);
    footer.append(githubLogo, authors, rsschoolLink);
    this.appWrapper.appendChild(footer);
  }
}
