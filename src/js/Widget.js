import moment from 'moment';
import Draw from './Draw';
import Calendar from './Calendar';

export default class Widget {
  constructor(parent) {
    this.parent = parent;
    this.calendar = new Calendar();
    this.draw = new Draw(this.parent);
    this.moment = moment();
    this.year;
    this.month;
  }

  init() {
    this.draw.drawUI();
    this.year = Number(this.moment.format('YYYY'));
    this.month = Number(this.moment.format('MM'));
    this.calendarNode = document.querySelector('.calendar');
    this.bindToDOM();
  }

  bindToDOM() {
    document.addEventListener('click', this.click.bind(this));
  }

  click(e) {
    e.preventDefault();
    const { target } = e;

    if (target.classList.contains('next')) {
      this.next();
    } else if (target.classList.contains('prev')) {
      this.prev();
    } else if (target.classList.contains('check')) {
      target.classList.remove('check');
      this.draw.showDate();
    } else if (target.classList.contains('roundtrip__input')) {
      target.classList.add('check');
      this.draw.showThereBack();
    } else if (target.classList.contains('there__input') || target.classList.contains('back__input') || target.classList.contains('date__input')) {
      this.calendarNode.classList.remove('hidden');

      Array.from(document.querySelectorAll('.active-input')).forEach((el) => {
        el.classList.remove('active-input');
      });

      target.classList.add('active-input');

      if (this.calendarNode.textContent !== '') {
        this.calendar.delete();
      }

      this.calendar.create(this.calendarNode, this.year, this.month);
    } else if (target.tagName.toLowerCase() === 'td') {
      if (!target.classList.contains('inactive')) {
        Array.from(document.querySelectorAll('td')).forEach((el) => {
          el.classList.remove('active');
        });

        target.classList.add('active');

        if (this.month.length !== 2) {
          document.querySelector('.active-input').value = `${target.textContent}.0${this.month}.${this.year}`;
        } else {
          document.querySelector('.active-input').value = `${target.textContent}.${this.month}.${this.year}`;
        }

        this.checkDate();
      }
    } else if (!target.classList.contains('there__input') || !target.classList.contains('back__input') || !target.classList.contains('date__input')) {
      this.calendarNode.classList.add('hidden');
    }
  }

  next() {
    this.calendar.delete();

    if (this.month < 12) {
      this.month++;
      this.calendar.create(this.calendarNode, this.year, this.month);
    } else {
      this.year++;
      this.month = 1;
      this.calendar.create(this.calendarNode, this.year, this.month);
    }
  }

  prev() {
    this.calendar.delete();

    if (this.month === 1) {
      this.year--;
      this.month = 12;
      this.calendar.create(this.calendarNode, this.year, this.month);
    } else {
      this.month--;
      this.calendar.create(this.calendarNode, this.year, this.month);
    }
  }

  checkDate() {
    const there = document.querySelector('.there__input');
    const back = document.querySelector('.back__input');
    const thereArr = there.value.split('.');
    const backArr = back.value.split('.');

    if (thereArr[2] > backArr[2] || (thereArr[2] === backArr[2] && Number(thereArr[1]) > Number(backArr[1])) || (thereArr[2] === backArr[2] && thereArr[1] === backArr[1] && Number(thereArr[0]) > Number(backArr[0]))) {
      back.classList.add('wrong');
    } else {
      back.classList.remove('wrong');
    }
  }
}
