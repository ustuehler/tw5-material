/*\
title: $:/themes/ustuehler/material/modules/macros/grid-item-class.js
type: application/javascript
module-type: macro

Macro to generate a list of CSS classes for the curren tiddler view

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "grid-item-class";

exports.params = [
  { name: "default", default: "grid-item-content" }
];

/*
Run the macro
*/
exports.run = function(defaultClass) {
  var tiddler = this.wiki.getTiddler(this.getVariable("currentTiddler"));
  var output = defaultClass;

  if (!tiddler) {
    return output;
  }

  var viewClass = tiddler.fields['view-class'];
  if (viewClass) {
    output += " " + viewClass;
  }

  var viewSpan = tiddler.fields['span'];
  if (viewSpan) {
    output += " span-" + viewSpan;
  }

  return output;
};
/* with mdc layout grid:
exports.run = function() {
  var tiddler = this.wiki.getTiddler(this.getVariable("currentTiddler"));
  var output = "mdc-layout-grid__cell";

  if (!tiddler) {
    return output;
  }

  var gridCell = tiddler.fields['grid-cell'];
  if (!gridCell) {
    gridCell = "align-top";
  }

  gridCell.split(" ").forEach(function(cls) {
    output += " mdc-layout-grid__cell--" + cls;
  });

  var viewClass = tiddler.fields['view-class'];
  if (viewClass) {
    output += " " + viewClass;
  }

  return output;
};
*/

})();
