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

  fade() {
    let promise = new Promise(function(resolve, reject) {
      this._el.classList.add('fading');

      this._el.addEventListener('transitionend', function() {
        this._el.classList.add('js-hidden');
        this._el.classList.remove('fading');

        resolve(123);
      }.bind(this));
    }.bind(this));

    return promise;
  }
}