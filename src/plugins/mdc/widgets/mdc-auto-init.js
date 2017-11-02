/*\
title: $:/plugins/ustuehler/mdc/widgets/mdc-auto-init.js
type: application/javascript
module-type: widget
caption: snackbar

mdc-auto-init widget to initialize MDC-Web components from HTML elements

\*/
(function (global) {

"use strict";
/*jslint node: true, browser: true */
/*global $tw: false */

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var MDCAutoInitWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
MDCAutoInitWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
MDCAutoInitWidget.prototype.render = function(parent,nextSibling) {
	//var self = this;

	// Compute attributes and execute state
	this.computeAttributes();
	this.execute();

	// Render child widgets
	this.renderChildren(parent,nextSibling);

  // For each child widget, run mdc.autoInit()
  this.domNodes.forEach(function(domNode) {
    this.window.mdc.autoInit(domNode);
  });
};

/*
Compute the internal state of the widget
*/
MDCAutoInitWidget.prototype.execute = function() {
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
MDCAutoInitWidget.prototype.refresh = function(changedTiddlers) {
  return this.refreshChildren(changedTiddlers);
};

exports["mdc-auto-init"] = MDCAutoInitWidget;

})(this);
