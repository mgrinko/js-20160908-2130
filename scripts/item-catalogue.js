'use strict';

class ItemCatalogue {
  constructor(options) {
    this._el = options.element;
    this._items = options.items;
    this._listClass = options.listClass;

    this._template = document.getElementById('item-catalogue-template').innerHTML;
    this._templateFunction = _.template(this._template);

    this._render(this._items);

    this._el.addEventListener('click', this._onItemClick.bind(this));
  }

  getElement() {
    return this._el;
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  _onItemClick(event) {
    let link = event.target.closest('[data-element="item-detail-link"]');

    if (!link) {
      return;
    }

    let itemContainer = link.closest('[data-element="item-container"]');

    if (!itemContainer) {
      return;
    }

    this._triggerItemSelectedEvent(itemContainer.dataset.itemId);
  }

  _render(items) {
    this._el.innerHTML = this._templateFunction({
      items: items,
      listClass: this._listClass
    });
  }

  _triggerItemSelectedEvent(itemId) {
    let event = new CustomEvent('itemSelected', {
      detail: itemId
    });

    this._el.dispatchEvent(event);
  }
}
