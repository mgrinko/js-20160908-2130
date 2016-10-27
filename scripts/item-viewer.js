'use strict';

class ItemViewer extends Component {
  constructor(options) {
    super(options.element);

    this.LABELS = {
      back: options.backButtonLabel || 'Back',
      submit: options.submitButtonLabel || 'Submit'
    };

    this._template = document.getElementById('item-viewer-template').innerHTML;
    this._templateFunction = _.template(this._template);

    this._el.addEventListener('click', this._onBackButtonClick.bind(this));
  }

  render(itemDetails) {
    this._el.innerHTML = this._templateFunction({
      item: itemDetails,
      backButtonLabel: this.LABELS.back,
      submitButtonLabel: this.LABELS.submit
    });
  }

  _onBackButtonClick(event) {
    let backButton = event.target.closest('[data-element="back"]');

    if (!backButton) {
      return;
    }

    this._triggerBackEvent();
  }

  _triggerBackEvent() {
    let event = new CustomEvent('viewer.back');

    this._el.dispatchEvent(event);
  }
}
