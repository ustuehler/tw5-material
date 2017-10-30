/*\
title: $:/plugins/ustuehler/mdc-web/utils.js
type: application/javascript
module-type: library

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

}

}());
