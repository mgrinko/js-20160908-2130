'use strict';

class Component {
  constructor(element) {
    this._el = element;
  }

  getElement() {
    return this._el;
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  hide() {
    this._el.classList.add('js-hidden');
  }
}