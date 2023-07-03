export default class Draw {
  constructor(parent) {
    this.parent = parent;
  }

  getItem(teg, selector, parent, content) {
    const item = document.createElement(teg);
    item.classList.add(selector);
    item.textContent = content;
    parent.appendChild(item);

    return item;
  }

  drawUI() {
    const container = this.getItem('div', 'container', this.parent);
    this.getItem('div', 'container__header', container, 'Поиск билетов');
    const searchContainer = this.getItem('div', 'search-container', container);
    const from = this.getItem('form', 'from', searchContainer);
    this.getItem('div', 'from__text', from, 'Откуда:');
    this.getItem('input', 'from__input', from);
    const to = this.getItem('form', 'to', searchContainer);
    this.getItem('div', 'to__text', to, 'Куда:');
    this.getItem('input', 'to__input', to);
    const adultsChildren = this.getItem('div', 'adults-children', searchContainer);
    const adults = this.getItem('form', 'adults', adultsChildren);
    this.getItem('div', 'adults__text', adults, 'Взрослые:');
    const adultsСhoose = this.getItem('div', 'adults__choose', adults);
    this.getItem('div', 'minus', adultsСhoose, '-');
    this.getItem('div', 'quantity', adultsСhoose, '1');
    this.getItem('div', 'plus', adultsСhoose, '+');
    const children = this.getItem('form', 'children', adultsChildren);
    this.getItem('div', 'children__text', children, 'Дети до 10 лет:');
    const childrenСhoose = this.getItem('div', 'children__choose', children);
    this.getItem('div', 'minus', childrenСhoose, '-');
    this.getItem('div', 'quantity', childrenСhoose, '1');
    this.getItem('div', 'plus', childrenСhoose, '+');
    const childrenFiveRoundtrip = this.getItem('div', 'childrenFive-roundtrip', searchContainer);
    const childrenFive = this.getItem('form', 'childrenFive', childrenFiveRoundtrip);
    this.getItem('div', 'childrenFive__text', childrenFive, 'Дети до 5 лет:');
    const childrenFiveСhoose = this.getItem('div', 'childrenFive__choose', childrenFive);
    this.getItem('div', 'minus', childrenFiveСhoose, '-');
    this.getItem('div', 'quantity', childrenFiveСhoose, '1');
    this.getItem('div', 'plus', childrenFiveСhoose, '+');
    const roundtrip = this.getItem('form', 'roundtrip', childrenFiveRoundtrip);
    this.getItem('div', 'roundtrip__text', roundtrip, 'Туда и обратно:');
    this.getItem('div', 'roundtrip__input', roundtrip);
    const date = this.getItem('form', 'date', searchContainer);
    this.getItem('div', 'date__text', date, 'Дата:');
    this.getItem('input', 'date__input', date);
    const thereBack = this.getItem('div', 'there-back', date);
    thereBack.classList.add('hidden');
    this.getItem('div', 'there__text', thereBack, 'Туда:');
    this.getItem('div', 'back__text', thereBack, 'Обратно:');
    const thereBackInput = this.getItem('div', 'there-back__input', date);
    thereBackInput.classList.add('hidden');
    this.getItem('input', 'there__input', thereBackInput);
    this.getItem('input', 'back__input', thereBackInput);
    this.getItem('div', 'calendar', searchContainer);
    this.getItem('button', 'submit', searchContainer, 'Найти билеты');
  }

  showThereBack() {
    document.querySelector('.there-back').classList.remove('hidden');
    document.querySelector('.there-back__input').classList.remove('hidden');
    document.querySelector('.date__text').classList.add('hidden');
    document.querySelector('.date__input').classList.add('hidden');
  }

  showDate() {
    document.querySelector('.there-back').classList.add('hidden');
    document.querySelector('.there-back__input').classList.add('hidden');
    document.querySelector('.date__text').classList.remove('hidden');
    document.querySelector('.date__input').classList.remove('hidden');
  }
}
