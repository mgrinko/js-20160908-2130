(function() {

  'use strict';

  const LABELS = {
    backButton: 'Back',
    submitButton: 'Submit'
  };

  const SELECTORS = {
    template: '#item-viewer-template',
    backButton: '[data-element="back"]'
  };

  const EVENTS = {
    back: 'viewer.back'
  };


  class ItemViewer extends Component {
    constructor(options) {
      super(options.element);

      this._LABELS = {
        backButton: options.backButtonLabel || LABELS.backButton,
        submitButton: options.submitButtonLabel || LABELS.submitButton
      };

      this._template = document.querySelector(SELECTORS.template).innerHTML;
      this._templateFunction = _.template(this._template);

      this._el.addEventListener('click', this._onBackButtonClick.bind(this));
    }

    render(itemDetails) {
      this._el.innerHTML = this._templateFunction({
        item: itemDetails,
        backButtonLabel: this._LABELS.backButton,
        submitButtonLabel: this._LABELS.submitButton
      });
    }

    _onBackButtonClick(event) {
      let backButton = event.target.closest(SELECTORS.backButton);

      if (!backButton) {
        return;
      }

      this._triggerBackEvent();
    }

    _triggerBackEvent() {
      let event = new CustomEvent(EVENTS.back);

      this._el.dispatchEvent(event);
    }
  }

  window.ItemViewer = ItemViewer;

})();