/*\
title: $:/plugins/ustuehler/mdc/widgets/mdc-auto-init.js
type: application/javascript
module-type: widget
caption: mdc-auto-init

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

  // Insert DOM node
  var domNode = this.document.createElement("div");
  domNode.setAttribute("class","mdc-auto-init");
	parent.insertBefore(domNode,nextSibling);
	this.renderChildren(domNode,null);
  this.domNodes.push(domNode);

  // For each child widget run mdc.autoInit()
  if (this.window.mdc) {
    this.window.mdc.autoInit(domNode);
  } else {
    throw Error("this.window.mdc should be set");
  }
};

/*
Compute the internal state of the widget
*/
MDCAutoInitWidget.prototype.execute = function() {
  this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
MDCAutoInitWidget.prototype.refresh = function(changedTiddlers) {
  if (this.refreshChildren(changedTiddlers)) {
    this.refreshSelf();
    return true;
  }

  return false;
};

exports["mdc-auto-init"] = MDCAutoInitWidget;

})(this);
