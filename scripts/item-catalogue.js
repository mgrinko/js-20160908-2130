'use strict';

class ItemCatalogue extends Component {
  constructor(options) {
    super(options.element);

    this._items = options.items;
    this._listClass = options.listClass;

    this._template = document.getElementById('item-catalogue-template').innerHTML;
    this._templateFunction = _.template(this._template);

    this._render(this._items);

    this._el.addEventListener('click', this._onItemDetailsLinkClick.bind(this));
  }

  _onItemDetailsLinkClick(event) {
    let link = event.target.closest('[data-element="item-details-link"]');

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
