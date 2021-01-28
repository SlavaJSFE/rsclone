import createDOMElement from '../services/createDOMElement';

/**
 * @param {String} townOfDestination
 * @param {Number} clockNumber
 */

export default class Clock {
  constructor() {
    this.town;
    this.degree = 6;
    this.id;
    this.diff;
    this.timer;
  }

  async getLocationInfo() {
    const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${this.town}&apikey=5ae2e3f221c38a28845f05b6b4769a5488ad4d3bf7cfc1d16c76e7a4
      `);

    const townInfo = await response.json();

    const res = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=1IENVIEJ7OK0&format=json&by=position&lat=${townInfo.lat}&lng=${townInfo.lon}
    `);

    const timezone = await res.json();
    const date = new Date(timezone.formatted);
    const currentDate = new Date();

    this.diff = date.getHours() - currentDate.getHours();
  }

  createTitle = (container) => {
    let titleText = this.town;
    createDOMElement('div', 'clock-title', `${titleText}`, container);
  };

  createClockView = (town, id) => {
    this.town = town;
    this.id = id;
    const clock = document.querySelector('.clock');
    const clockContainer = createDOMElement('div', 'clock-container', null, clock, [
      'id',
      `clock-container${this.id}`,
    ]);

    this.createTitle(clockContainer);

    createDOMElement(
      'div',
      'clock-body',
      [
        createDOMElement('div', 'hour', [
          createDOMElement('div', 'hr', null, null, ['id', `hr${this.id}`]),
        ]),
        createDOMElement('div', 'min', [
          createDOMElement('div', 'mn', null, null, ['id', `mn${this.id}`]),
        ]),
        createDOMElement('div', 'sec', [
          createDOMElement('div', 'sc', null, null, ['id', `sc${this.id}`]),
        ]),
      ],
      clockContainer,
      ['data-clock-night', false],
      ['id', `body${this.id}`]
    );

    createDOMElement('time', 'time', '10:10:10', clockContainer, ['id', `numClock${this.id}`]);

    this.getLocationInfo();

    return this;
  };

  renderCircleClock() {
    const hour = document.querySelector(`#hr${this.id}`);
    const min = document.querySelector(`#mn${this.id}`);
    const sec = document.querySelector(`#sc${this.id}`);

    let date = new Date();

    let hh = (date.getHours() + this.diff) * 30;
    let mn = date.getMinutes() * this.degree;
    let sc = date.getSeconds() * this.degree;

    hour.style.transform = `rotateZ(${hh + mn / 12}deg)`;
    min.style.transform = `rotateZ(${mn}deg)`;
    sec.style.transform = `rotateZ(${sc}deg)`;

    this.changeClockView(hh);
  }

  renderNumericClock() {
    const numberClock = document.querySelector(`#numClock${this.id}`);
    let date = new Date();

    let hh = date.getHours() + this.diff;
    if (hh > 24) {
      hh = hh - 24;
    }
    let mn = date.getMinutes();
    let sc = date.getSeconds();

    numberClock.innerHTML = `${this.addZeros(hh)}<span>:</span>${this.addZeros(
      mn
    )}<span>:</span>${this.addZeros(sc)}`;
  }

  launchClock() {
    this.timer = setInterval(() => {
      this.renderCircleClock();
      this.renderNumericClock();
    }, 1000);
  }

  stopClock() {
    clearInterval(this.timer);
  }

  addZeros = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  };

  changeClockView = (hour) => {
    const tableBody = document.querySelector(`#body${this.id}`);

    if (hour >= 17 || hour <= 6) {
      tableBody.dataset.clockNight = true;
    } else {
      tableBody.dataset.clockNight = false;
    }
  };
}

export const clockInstance = new Clock();
