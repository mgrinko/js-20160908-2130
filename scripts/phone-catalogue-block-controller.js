'use strict';

class PhoneCatalogueBlockController {
  constructor(options) {
    this._el = options.element;

    this._catalogue = new ItemCatalogue({
      element: this._el.querySelector('[data-component="item-catalogue"]'),
      items: options.phones
    });

    this._viewer = new ItemViewer({
      element: this._el.querySelector('[data-component="item-viewer"]')
    });

    this._catalogue.show();
  }
}
