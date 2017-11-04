/*\
title: $:/plugins/ustuehler/mdc/utils.js
type: application/javascript
module-type: utils

Utility methods like showSnackbar()

\*/
(function() {
'use strict';

exports.showSnackbar = function(message, timeout) {
  $tw.rootWidget.querySelector('.mdc-snackbar').widget.show({
    message: message,
    timeout: timeout || 2750
  })
};

}());
