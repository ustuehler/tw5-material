/*\
title: $:/plugins/ustuehler/mdc-web/utils.js
type: application/javascript
module-type: utils

Utility functions for MDC-Web usage in TiddlyWiki

\*/
(function() {

/*jslint node: true, browser: true */
/*global $tw: false */
'use strict';

if (typeof document !== 'undefined') {

function mdcAutoInit() {
  // Use global mdc object.
  var mdc = window.mdc;

  if (mdc) {
    console.debug("Calling mdc.autoInit()");
    mdc.autoInit();
  } else {
    console.debug("Waiting for window.mdc!=null");
    setTimeout(mdcAutoInit, 10);
    return;
  }
};

exports.mdcAutoInit = mdcAutoInit;

}

}());
