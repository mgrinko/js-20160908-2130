'use strict';

const BASE_URL = location.origin + location.pathname.slice(0, -1);

const ajaxService = {
  loadJson(url, options) {
    options = options || {};

    let xhr = new XMLHttpRequest();
    let method = options.method || 'GET';

    xhr.open(method, BASE_URL + url, true);

    let promise = new Promise(function(resolve, reject) {
      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject();

          return;
        }

        resolve( JSON.parse(xhr.responseText) );
      };

      xhr.onerror = function() {
        reject();
      };

      xhr.send();
    });

    return promise
      .catch(function() {
        let error = new Error(xhr.status + ': ' + xhr.statusText);

        console.error('Ajax error', error);

        throw error;
      });
  }
};