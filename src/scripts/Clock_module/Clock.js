import createDOMElement from '../services/createDOMElement';

/**
 * @param {Number} timeInTargetCountry
 * @param {Number} clockNumbering
 * @param {String} capitalOfCountry
 */

export default class Clock {
  constructor(date, numberOfClock, capitalOfCountry) {
    this.capital = capitalOfCountry;
    this.date = date;
    this.number = numberOfClock;
    this.degree = 6;
    this.hr = 'hr' + this.number;
    this.min = 'min' + this.number;
    this.sec = 'sec' + this.number;
    this.time = 'time' + this.number;
    this.body = 'body' + this.number;
  }

  createTitle = (container) => {
    let titleText = this.capital || 'Local';
    createDOMElement('div', 'clock-title', `${titleText}`, container);
  };

  createClockView = () => {
    const clock = document.querySelector('.clock');
    const clockContainer = createDOMElement('div', 'clock-container', null, clock);

    this.createTitle(clockContainer);

    createDOMElement(
      'div',
      'clock-body',
      [
        createDOMElement('div', 'hour', [
          createDOMElement('div', 'hr', null, null, ['id', `${this.hr}`]),
        ]),
        createDOMElement('div', 'min', [
          createDOMElement('div', 'mn', null, null, ['id', `${this.min}`]),
        ]),
        createDOMElement('div', 'sec', [
          createDOMElement('div', 'sc', null, null, ['id', `${this.sec}`]),
        ]),
      ],
      clockContainer,
      ['data-clock-night', false],
      ['id', `${this.body}`]
    );

    createDOMElement('time', 'time', '10:10:10', clockContainer, ['id', `${this.time}`]);
    return this;
  };

  renderCircleClock() {
    const hour = document.querySelector(`#${this.hr}`);
    const min = document.querySelector(`#${this.min}`);
    const sec = document.querySelector(`#${this.sec}`);

    let date = new Date();

    let hh = (date.getHours() + this.date) * 30;
    let mn = date.getMinutes() * this.degree;
    let sc = date.getSeconds() * this.degree;

    hour.style.transform = `rotateZ(${hh + mn / 12}deg)`;
    min.style.transform = `rotateZ(${mn}deg)`;
    sec.style.transform = `rotateZ(${sc}deg)`;

    this.changeClockView(date.getHours() + this.date);
  }

  renderNumericClock() {
    const numberClock = document.querySelector(`#${this.time}`);
    let date = new Date();

    let hh = date.getHours() + this.date;
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
    setInterval(() => {
      this.renderCircleClock();
      this.renderNumericClock();
    }, 1000);
  }

  addZeros = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  };

  changeClockView = (hour) => {
    const tableBody = document.querySelector(`#${this.body}`);

    if (hour >= 17 || hour <= 6) {
      tableBody.dataset.clockNight = true;
    } else {
      tableBody.dataset.clockNight = false;
    }
  };
}
