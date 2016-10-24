'use strict';

class ItemCatalogue {
  constructor(options) {
    this._el = options.element;

  }

  show() {
    this._el.classList.remove('js-hidden');
  }
}
