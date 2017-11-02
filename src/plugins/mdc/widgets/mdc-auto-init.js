/*\
title: $:/plugins/ustuehler/mdc/widgets/mdc-auto-init.js
type: application/javascript
module-type: widget
caption: snackbar

Snackbar widget using MDC-Web components

\*/
(function (global) {

"use strict";
/*jslint node: true, browser: true */
/*global $tw: false */

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var SnackbarWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
SnackbarWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
SnackbarWidget.prototype.render = function(parent,nextSibling) {
	//var self = this;

	// Compute attributes and execute state
	this.computeAttributes();
	this.execute();

  // Create text element
	var textNode = this.document.createElement("div");
	textNode.setAttribute("class","mdc-snackbar__text");
	textNode.textContent = this.message;

  // Create action button element
	var actionButtonNode = this.document.createElement("button");
	actionButtonNode.setAttribute("class","mdc-snackbar__action-button");
	actionButtonNode.textContent = this.actionButtonLabel;

  // Create action wrapper element
	var actionWrapperNode = this.document.createElement("div");
	actionWrapperNode.setAttribute("class","mdc-snackbar__action-wrapper");
  actionWrapperNode.appendChild(actionButtonNode);

	// Create snackbar element
	var domNode = this.document.createElement("div");
	domNode.setAttribute("class","mdc-snackbar");
	domNode.setAttribute("aria-live","assertive");
	domNode.setAttribute("aria-atomic","true");
	domNode.setAttribute("aria-hidden","true");
	domNode.appendChild(textNode);
	domNode.appendChild(actionWrapperNode);

  // Create the snackbar behaviour
  var MDCSnackbar = global.mdc.snackbar.MDCSnackbar;
  var snackbar = new MDCSnackbar(domNode);
  snackbar.dismissesOnAction = true;
  this.snackbar = snackbar;

	// Insert element
	parent.insertBefore(domNode,nextSibling);
	this.renderChildren(domNode,null);
	this.domNodes.push(domNode);

  // Allow access to this widget via the DOM node (for $action-showsnackbar)
  domNode.widget = this;
};

/*
Compute the internal state of the widget
*/
SnackbarWidget.prototype.execute = function() {
};

/*
Show the snackbar
*/
SnackbarWidget.prototype.show = function(data) {
  if (this.snackbar) {
    var data2 = {
      message: data.message || "",
      timeout: data.timeout || 2750
    };

    if (data.actionText) {
      data2.actionText = data.actionText;
      data2.actionHandler = data.actionHandler || function() {
        console.log(data2.actionText);
      }
    }

    this.snackbar.show(data2);
  }
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
SnackbarWidget.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();

  if (changedAttributes.message || changedAttributes.actionButtonLabel) {
    this.refreshSelf();
    return true;
  }

  return this.refreshChildren(changedTiddlers);
};

exports["mdc-auto-init"] = SnackbarWidget;

})(this);
