'use strict';

class PhoneCatalogueBlockController {
  constructor(options) {
    this._el = options.element;

    this._catalogue = new ItemCatalogue({
      element: this._el.querySelector('[data-component="item-catalogue"]'),
      baseUrl: '/data/phones/phones.json'
    });

    this._viewer = new ItemViewer({
      element: this._el.querySelector('[data-component="item-viewer"]'),
      submitButtonLabel: 'Add to basket'
    });

    this._catalogue.show();

    this._catalogue.getElement().addEventListener(ItemCatalogue.EVENTS.itemSelected, this._onCatalogueItemSelected.bind(this));
    this._viewer.getElement().addEventListener(ItemViewer.EVENTS.back, this._onViewerBack.bind(this));
  }

  _onViewerBack() {
    this._viewer.fade(function() {
      this._catalogue.show();
    }.bind(this));
  }

  _onCatalogueItemSelected(event) {
    let phoneId = event.detail;
    let url = '/data/phones/' + phoneId + '.json';

    this._phoneDetails = null;
    this._isCatalogueAnimationEnded = null;

    this._catalogue.fade(this._onCatalogueAnimationEnd.bind(this));

    ajaxService.loadJson(url, {
      onsuccess: this._onPhoneDetailsLoadSuccess.bind(this),
      onerror: this._onPhoneDetailsLoadError.bind(this)
    });
  }

  _onPhoneDetailsLoadSuccess(phoneDetails) {
    this._phoneDetails = phoneDetails;

    if (this._isCatalogueAnimationEnded) {
      this._viewer.render(phoneDetails);
      this._viewer.show();
    }
  }

  _onCatalogueAnimationEnd() {
    this._isCatalogueAnimationEnded = true;

    if (this._phoneDetails) {
      this._viewer.render(this._phoneDetails);
      this._viewer.show();
    }
  }

  _onPhoneDetailsLoadError(error) {
    console.error(error);
  }
}
