'use strict';

import styles from './style.css';

import Component from './../component.js';
import Filter from './../filter.js';
import ajaxService from './../ajaxService.js';

import template from './templates/item-catalogue-template.html';
import itemsTemplateFunction from './templates/item-catalogue-items-template.hbs';

const SELECTORS = {
  itemsList: '[data-element="items-list"]',
  filter: '[data-component="filter"]',
  itemDetailsLink: '[data-element="item-details-link"]',
  itemContainer: '[data-element="item-container"]'
};

const EVENTS = {
  itemSelected: 'catalogue.itemSelected'
};


export default class ItemCatalogue extends Component {
  constructor(options) {
    super(options.element);

    this._baseUrl = options.baseUrl;

    this._items = [];

    this._render();

    this._itemListElement = this._el.querySelector(SELECTORS.itemsList);

    this._loadItems();

    this._filter = new Filter({
      element: this._el.querySelector(SELECTORS.filter)
    });


    this._el.addEventListener('click', this._onItemDetailsLinkClick.bind(this));
    this._filter.getElement().addEventListener(Filter.EVENTS.change, this._onFilterChange.bind(this));
  }

  _onItemDetailsLinkClick(event) {
    let link = event.target.closest(SELECTORS.itemDetailsLink);

    if (!link) {
      return;
    }

    let itemContainer = link.closest(SELECTORS.itemContainer);

    if (!itemContainer) {
      return;
    }

    sdf();

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

    ajaxService.loadJson(url)
      .then(this._onItemsLoadSuccess.bind(this))
      .catch(this._onItemsLoadError.bind(this));
  }

  _onItemsLoadSuccess(items) {
    this._items = items;

    this._renderItems(this._items);
  }

  _onItemsLoadError(error) {
    console.error(error);
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
    this._el.innerHTML = template;
  }

  _renderItems(items) {
    this._itemListElement.innerHTML = itemsTemplateFunction({
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

module.exports = ItemCatalogue;

