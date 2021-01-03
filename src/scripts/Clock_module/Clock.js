import create from '../Currency_module/create';

export default class Clock {
  constructor() {
    this.degree = 6;
  }

  createTitle = () => {
    create('div', 'clock-title', 'Current time', document.body);
  };

  createClock = () => {
    this.createTitle();

    create(
      'div',
      'clock',
      [
        create('div', 'hour', [create('div', 'hr')]),
        create('div', 'min', [create('div', 'mn')]),
        create('div', 'sec', [create('div', 'sc')]),
      ],
      document.body
    );

    create('time', 'time', '10:10:10', document.body);

    return this;
  };

  renderCircleClock() {
    let hour = document.querySelector('.hr');
    let min = document.querySelector('.mn');
    let sec = document.querySelector('.sc');

    let date = new Date();

    let hh = date.getHours() * 30;
    let mn = date.getMinutes() * this.degree;
    let sc = date.getSeconds() * this.degree;

    hour.style.transform = `rotateZ(${hh + mn / 12}deg)`;
    min.style.transform = `rotateZ(${mn}deg)`;
    sec.style.transform = `rotateZ(${sc}deg)`;
  }

  renderNumericClock() {
    const numberClock = document.querySelector('.time');
    let date = new Date();

    let hh = date.getHours();
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
    });
  }

  addZeros = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  };
}
