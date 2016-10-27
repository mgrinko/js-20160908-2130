'use strict';

class ItemCatalogue extends Component {
  constructor(options) {
    super(options.element);

    this._items = options.items;
    this._listClass = options.listClass;

    this._mainTemplate = document.getElementById('item-catalogue-template').innerHTML;
    this._itemsTemplate = document.getElementById('item-catalogue-items-template').innerHTML;
    this._itemsTemplateFunction = _.template(this._itemsTemplate);

    this._render();

    this._itemListElement = this._el.querySelector('[data-element="items-list"]');

    this._renderItems(this._items);

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });


    this._el.addEventListener('click', this._onItemDetailsLinkClick.bind(this));
    this._filter.getElement().addEventListener('filter.change', this._onFilterChange.bind(this));
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

  _onFilterChange(event) {
    let filterValue = event.detail;
    let filteredItems = this._getItems(filterValue);

    this._renderItems(filteredItems);
  }

  _getItems(query) {
    return this._items.filter(function(item) {
      return (item.name.indexOf(query) !== -1)
        || (item.snippet.indexOf(query) !== -1);
    });
  }

  _render() {
    this._el.innerHTML = this._mainTemplate;
  }

  _renderItems(items) {
    this._itemListElement.innerHTML = this._itemsTemplateFunction({
      items: items
    });
  }

  _triggerItemSelectedEvent(itemId) {
    let event = new CustomEvent('itemSelected', {
      detail: itemId
    });

    this._el.dispatchEvent(event);
  }
}
