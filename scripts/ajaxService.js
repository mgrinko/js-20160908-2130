'use strict';

const BASE_URL = location.origin + location.pathname.slice(0, -1);

const ajaxService = {
  loadJson(url, options) {
    let xhr = new XMLHttpRequest();
    let method = options.method || 'GET';

    xhr.open(method, BASE_URL + url, true);

    xhr.send();

    xhr.onload = function() {
      if (xhr.status !== 200) {
        options.onerror(new Error(xhr.status + ': ' + xhr.statusText));

        return;
      }

      options.onsuccess( JSON.parse(xhr.responseText) );
    };
    
    xhr.onerror = function() {
      options.onerror(new Error(xhr.status + ': ' + xhr.statusText));
    };
  }
};