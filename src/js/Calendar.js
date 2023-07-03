import moment from 'moment';

export default class Calendar {
  constructor() {
    this.moment = moment();
    this.moment.lang('ru');
  }

  create(elem, year, month) {
    const mon = month - 1;
    const d = new Date(year, mon);

    let table = `
    <div class="calendar__header">
    <div class="prev"><</div>
    <div class="calendar__title">${d.toLocaleString('default', { month: 'long' })} ${year}</div>
    <div class="next">></div>
    </div>
    <table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>
    `;

    for (let i = 0; i < this.getDay(d); i++) {
      table += '<td></td>';
    }

    while (d.getMonth() === mon) {
      table += `<td>${d.getDate()}</td>`;

      if (this.getDay(d) % 7 === 6) {
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    if (this.getDay(d) !== 0) {
      for (let i = this.getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    table += '</tr></table>';

    elem.innerHTML = table;

    const arr = Array.from(document.querySelectorAll('td'));
    arr.forEach((el) => {
      if (el.textContent === this.moment.format('D') && mon === (this.moment.format('M') - 1) && year === Number((this.moment.format('YYYY')))) {
        el.classList.add('today');
      }
      if (Number(el.textContent) < Number(this.moment.format('D')) && mon === (this.moment.format('M') - 1) && year === Number((this.moment.format('YYYY')))) {
        el.classList.add('inactive');
      }
      if (mon < (this.moment.format('M') - 1) && year <= Number((this.moment.format('YYYY')))) {
        el.classList.add('inactive');
      }
      if (year < Number((this.moment.format('YYYY')))) {
        el.classList.add('inactive');
      }
    });
  }

  getDay(date) {
    let day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
  }

  delete() {
    document.querySelector('.calendar__header').remove();
    document.querySelector('table').remove();
  }
}
