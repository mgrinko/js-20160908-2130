(function() {

  'use strict';

  const LABELS = {
  };

  const SELECTORS = {
  };

  const EVENTS = {
    itemSelected: 'catalogue.itemSelected'
  };

  class ItemCatalogue extends Component {
    constructor(options) {
      super(options.element);

      this._baseUrl = options.baseUrl;

      this._items = [];

      this._mainTemplate = document.getElementById('item-catalogue-template').innerHTML;
      this._itemsTemplate = document.getElementById('item-catalogue-items-template').innerHTML;
      this._itemsTemplateFunction = _.template(this._itemsTemplate);

      this._render();

      this._itemListElement = this._el.querySelector('[data-element="items-list"]');

      this._loadItems();

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
      let filteredItems = this._filterItems(filterValue);

      this._renderItems(filteredItems);
    }

    _loadItems(query) {
      var url = this._baseUrl;

      if (query) {
        url += '?query=' + encodeURIComponent(query)
      }

      this._showSpinner();

      this._xhr = new XMLHttpRequest();

      this._xhr.open('GET', url, true);

      this._xhr.send();

      this._xhr.onload = this._onItemsLoaded.bind(this);
    }

    _onItemsLoaded() {
      if (this._xhr.status !== 200) {
        alert( this._xhr.status + ': ' + this._xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        this._items = JSON.parse(this._xhr.responseText);

        this._renderItems(this._items);
      }
    }

    _filterItems(query) {
      let normalizedQuery = query.toLowerCase();

      return this._items.filter(function(item) {
        return (item.name.toLowerCase().indexOf(normalizedQuery) !== -1)
          || (item.snippet.toLowerCase().indexOf(normalizedQuery) !== -1);
      });
    }

    _showSpinner() {
      this._itemListElement.innerHTML = 'Items are loading...';
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
      let event = new CustomEvent(EVENTS.itemSelected, {
        detail: itemId
      });

      this._el.dispatchEvent(event);
    }
  }

  ItemCatalogue.EVENTS = EVENTS;

  window.ItemCatalogue = ItemCatalogue;

})();

