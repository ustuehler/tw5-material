/*\
title: $:/plugins/ustuehler/mdc/widgets/action-toggledrawer.js
type: application/javascript
module-type: widget
caption: action-toggledrawer

Action widget that toggles the visibility of the first drawer found in the document

\*/
(function (global) {

"use strict";
/*jslint node: true, browser: true */
/*global $tw: false */

var drawerTypes = {
  permanent: {
    class: "MDCPermanentDrawer",
    selector: ".mdc-permanent-drawer"
  },
  persistent: {
    class: "MDCPersistentDrawer",
    selector: ".mdc-persistent-drawer"
  },
  temporary: {
    class: "MDCTemporaryDrawer",
    selector: ".mdc-temporary-drawer"
  }
};

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ActionToggleDrawerWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ActionToggleDrawerWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ActionToggleDrawerWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ActionToggleDrawerWidget.prototype.execute = function() {
  this.type = this.getAttribute("type", "temporary")
  if (!drawerTypes[this.type]) {
    throw Error("invalid drawer type: " + this.type);
  }
  this["class"] = drawerTypes[this.type]["class"];
  this.selector = drawerTypes[this.type].selector;
  // Compute the internal state of child widgets.
  this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
ActionToggleDrawerWidget.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();

  if (changedAttributes["class"] || changedAttributes.selector) {
    this.refreshSelf();
    return true;
  }

  return this.refreshChildren(changedTiddlers);
};

/*
 * Invoke the action associated with this widget
 */
ActionToggleDrawerWidget.prototype.invokeAction = function(triggeringWidget,event) {
  var self = this;
  var el = this.document.querySelector(this.selector);

  if (el) {
    var constructor = global.mdc.drawer[this["class"]];
    var drawer = new constructor(el);

    drawer.open = !drawer.open;
  }

  return true; // Action was invoked
}

/*
 * Don't allow actions to propagate, because we invoke actions ourself
 */
ActionToggleDrawerWidget.prototype.allowActionPropagation = function() {
  return false;
};

exports["action-toggledrawer"] = ActionToggleDrawerWidget;

})(this);
