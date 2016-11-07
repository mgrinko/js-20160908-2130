'use strict';

// import ItemCatalogue from './item-catalogue.js';
// import ItemViewer from './item-viewer.js';
// import ajaxService from './ajaxService.js';

const ItemCatalogue = require('./item-catalogue');
const ItemViewer = require('./item-viewer.js');
const ajaxService = require('./ajaxService.js');

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
    this._viewer.fade()
      .then(function() {
        this._catalogue.show();
      }.bind(this));
  }

  _onCatalogueItemSelected(event) {
    let phoneId = event.detail;
    let url = '/data/phones/' + phoneId + '.json';

    this._fadePromise = this._catalogue.fade();

    this._ajaxPromise = ajaxService.loadJson(url);


    this._fadePromise.then(function() {
      this._ajaxPromise
        .then(this._showPhoneDetails.bind(this))
    }.bind(this));


    this._fadePromise
      .then(function() {
        return this._ajaxPromise;
      }.bind(this))

      .then(this._showPhoneDetails.bind(this))

      .catch(this._onError.bind(this));


    Promise.all([this._fadePromise, this._ajaxPromise])
      .then(function(results) {
        console.log(results[1]);
      }.bind(this))

      .catch(this._onError.bind(this));

  }

  _showPhoneDetails(phoneDetails) {
    this._viewer.render(phoneDetails);
    this._viewer.show();
  }

  _onError(error) {
    console.error(error);
  }
}

module.exports = PhoneCatalogueBlockController;