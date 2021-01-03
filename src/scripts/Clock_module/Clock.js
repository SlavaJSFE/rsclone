import create from '../Currency_module/create';

export default class Clock {
  constructor() {
    this.degree = 6;
    this.hour = document.querySelector('.hr');
    this.min = document.querySelector('.mn');
    this.sec = document.querySelector('.sc');
  }

  // createClock = () => {
  //   create('')
  //   return this
  // }

  render() {
    let date = new Date();

    let hh = date.getHours() * 30;
    let mn = date.getMinutes() * this.degree;
    let sc = date.getSeconds() * this.degree;

    this.hour.style.transform = `rotateZ(${hh + mn / 12}deg)`;
    this.min.style.transform = `rotateZ(${mn}deg)`;
    this.sec.style.transform = `rotateZ(${sc}deg)`;
  }

  launchClock() {
    setInterval(() => {
      this.render();
    });
  }
}
