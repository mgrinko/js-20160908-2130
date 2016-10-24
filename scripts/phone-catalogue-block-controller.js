'use strict';

class PhoneCatalogueBlockController {
  constructor(options) {
    this._el = options.element;

    this._catalogue = new ItemCatalogue({
      element: this._el.querySelector('[data-component="item-catalogue"]'),
      items: options.phones,
      listClass: 'phones'
    });

    this._viewer = new ItemViewer({
      element: this._el.querySelector('[data-component="item-viewer"]')
    });

    this._catalogue.show();

    this._catalogue.getElement().addEventListener('itemSelected', this._onCatalogueItemSelected.bind(this));
  }

  _onCatalogueItemSelected(event) {
    alert(event.detail);

    // this._catalogue.hide();
    // this._viewer.hide();
    // this._viewer.render({});
  }
}
