'use strict';

class ItemCatalogue {
  constructor(options) {
    this._el = options.element;
    this._items = options.items;
    this._listClass = options.listClass;

    this._template = document.getElementById('item-catalogue-template').innerHTML;
    this._templateFunction = _.template(this._template);

    this._render(this._items);
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  _render(items) {
    this._el.innerHTML = this._templateFunction({
      items: items,
      listClass: this._listClass
    });
  }
}
