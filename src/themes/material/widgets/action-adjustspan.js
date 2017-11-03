/*\
title: $:/plugins/ustuehler/mdc/widgets/action-showsnackbar.js
type: application/javascript
module-type: widget
caption: action-showsnackbar

Action widget that shows the first snackbar found in the document with a message and optional action button

\*/
(function () {

"use strict";
/*jslint node: true, browser: true */
/*global $tw: false */

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ActionAdjustSpanWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ActionAdjustSpanWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ActionAdjustSpanWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ActionAdjustSpanWidget.prototype.execute = function() {
  this.actionTiddler = this.getAttribute("tiddler",this.getVariable("currentTiddler"));
  this.actionAdjust = parseInt(this.getAttribute("adjust","0"), 10);

  // Compute the internal state of child widgets.
  this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
ActionAdjustSpanWidget.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();

  if (changedAttributes.actionAdjust || changedAttributes.actionTiddler) {
    this.refreshSelf();
    return true;
  }

  return this.refreshChildren(changedTiddlers);
};

/*
 * Invoke the action associated with this widget
 */
ActionAdjustSpanWidget.prototype.invokeAction = function(triggeringWidget,event) {
  var self = this;
  var tiddler = this.wiki.getTiddler(this.actionTiddler);
  var adjust = this.actionAdjust;
  var spanDefault = 4;
  var span = parseInt(tiddler.fields.span || (spanDefault + ""), 10);
  var spanMax = 12;
  var spanMin = 2;
  var field = "span";

  span += adjust;

  if (span < spanMin) {
    span = spanMin;
  }

  if (span > spanMax) {
    span = spanMax;
  }

  var options = { suppressTimestamp: true };
  self.wiki.setText(self.actionTiddler, field, undefined, span + "", options);
  return true; // Action was invoked
}

/*
 * Don't allow actions to propagate, because we invoke actions ourself
 */
ActionAdjustSpanWidget.prototype.allowActionPropagation = function() {
  return false;
};

exports["action-adjustspan"] = ActionAdjustSpanWidget;

})();
