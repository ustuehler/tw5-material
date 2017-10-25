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

exports.mdcAutoInit = mdcAutoInit;

function toggleDrawer() {
  var drawer = document.querySelector('.mdc-permanent-drawer');

  drawer.style.display = drawer.style.display == 'none' ? '' : 'none';
};

function mdcAutoInit() {
  // Use global mdc object.
  var mdc = window.mdc;

  if (mdc) {
    console.log("Calling mdc.autoInit()");
    mdc.autoInit();
  } else {
    console.log("Waiting for window.mdc!=null");
    setTimeout(mdcAutoInit, 10);
    return;
  }

  var menu = document.querySelector('.tc-toolbar-menu');

  if (menu) {
    console.log('Registering click event handler for toolbar menu');
    menu.addEventListener('click', function() {
      toggleDrawer();
    });
  } else {
    console.log('Waiting for .tc-toolbar-menu');
    setTimeout(mdcAutoInit, 10);
    return;
  }

  console.log('Registered toolbar menu click event handler');
};

}

}());
