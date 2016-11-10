'use strict';

const Component = require('./component.js');

const EVENTS = {
  change: 'filter.change'
};

const SELECTORS = {
  field: '[data-element="field"]'
};

class Filter extends Component {
  constructor(options) {
    super(options.element);

    this._fieldElement = this._el.querySelector(SELECTORS.field);

    this._fieldElement.oninput = this._onFiledValueChange.bind(this);
  }

  _onFiledValueChange(event) {
    this._triggerFilterChangeEvent();
  }

  _triggerFilterChangeEvent() {
    let event = new CustomEvent(EVENTS.change, {
      detail: this._fieldElement.value
    });

    this._el.dispatchEvent(event);
  }
}

Filter.EVENTS = EVENTS;

module.exports = Filter;

