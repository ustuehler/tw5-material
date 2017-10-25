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

function toggleDrawer() {
  var drawer = document.querySelector('.mdc-permanent-drawer');

  drawer.style.display = drawer.style.display == 'none' ? '' : 'none';
};

function init() {
  if (mdc) {
    console.log("Calling mdc.autoInit()");
    mdc.autoInit();
  } else {
    console.log("Waiting for window.mdc!=null");
    setTimeout(init, 10);
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
    setTimeout(init, 10);
    return;
  }

  console.log('Registered toolbar menu click event handler');
}

// I don't want to diverge too much from the mdc-web-cdn plugin and there is no
// <script> tag to trigger this function.
init();

}

}());
