/*\
title: $:/plugins/ustuehler/mdc-web/utils.js
type: application/javascript
module-type: library

Initializes MDC-Web

\*/
(function() {
'use strict';

var mdc = require("$:/plugins/ustuehler/mdc-web/material-components-web.min.js");

function mdcAutoInit() {
  console.log("Calling mdc.autoInit()");
  mdc.autoInit();
}

exports.mdcAutoInit = mdcAutoInit;

}());
