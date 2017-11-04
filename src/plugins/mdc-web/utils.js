/*\
title: $:/plugins/ustuehler/mdc-web/utils.js
type: application/javascript
module-type: utils

Initializes MDC-Web

\*/
'use string';
(function() {

if (typeof document !== 'undefined') {

var mdc = require("$:/plugins/ustuehler/mdc-web/material-components-web.min.js");

function mdcAutoInit() {
  console.log("Calling mdc.autoInit()");
  mdc.autoInit();
}

exports.mdcAutoInit = mdcAutoInit;

exports.showSnackbar = function(message, timeout) {
  document.querySelector('.mdc-snackbar').widget.show({
    message: message,
    timeout: timeout || 2750
  })
};

}

}());
