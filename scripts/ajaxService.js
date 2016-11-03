'use strict';

const BASE_URL = location.origin + location.pathname.slice(0, -1);

const ajaxService = {
  loadJson(url, options) {
    options = options || {};

    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      let method = options.method || 'GET';

      xhr.open(method, BASE_URL + url, true);

      xhr.send();

      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));

          return;
        }

        resolve( JSON.parse(xhr.responseText) );
      };

      xhr.onerror = function() {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      };
    });
  }
};