'use strict';

class Tree {
  constructor(el, data) {
    var markup = document.getElementById('tree-template').innerHTML;

    el.addEventListener('click', this._onBranchTitleClick.bind(this));

    el.innerHTML = this._createTreeHTML(data);

    el.classList.add('tree');
  }

  _onBranchTitleClick(event) {
    let titleElement = event.target.closest('.tree__branch-title');

    if (!titleElement) {
      return;
    }

    this._toggleBranch(titleElement.closest('.tree__branch'));
  }

  _toggleBranch(branchElement) {
    branchElement.classList.toggle('tree__branch--closed');
  }

  _render(data) {
    let html = `<ul class="tree__branch-list">`;

    for (let key in data.obj) {
      html += `
          <li class="tree__branch">
            <span class="tree__branch-title">
              <b>${key}</b>
            </span>

            ${ this._createTreeHTML(data.obj[key]) }
          </li>
        `;
    }

    html += `</ul>`;

    return html;
  }

  _createTreeHTML(obj) {
    if (this._isObjectEmpty(obj)) {
      return '';
    }

    return this._render({
      obj: obj
    });
  }

  _isObjectEmpty(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }
}