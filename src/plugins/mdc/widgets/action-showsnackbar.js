/*\
title: $:/plugins/ustuehler/mdc/widgets/action-showsnackbar.js
type: application/javascript
module-type: widget

Action widget to show a message and optional action button in the nearest snackbar among siblings of the parent DOM node

\*/
(function () {

"use strict";
/*jslint node: true, browser: true */
/*global $tw: false */

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ShowSnackbarWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ShowSnackbarWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ShowSnackbarWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ShowSnackbarWidget.prototype.execute = function() {
	this.message = this.getAttribute("message", "");
	this.actionText = this.getAttribute("actionText", "");
	this.timeout = parseInt(this.getAttribute("timeout", "2750"));

  this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
ShowSnackbarWidget.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();

  if (changedAttributes.message || changedAttributes.actionText) {
    this.refreshSelf();
    return true;
  }

  return this.refreshChildren(changedTiddlers);
};

/*
 * Invoke the action associated with this widget
 */
ShowSnackbarWidget.prototype.invokeAction = function(triggeringWidget,event) {
  var snackbar = this.document.getElementsByClassName("mdc-snackbar")[0];

  if (snackbar !== undefined) {
    var data = {
      message: this.message,
      actionText: this.actionText,
      timeout: this.timeout
    };

    snackbar.widget.show(data);
  }

  return true; // Action was invoked
}

exports["action-showsnackbar"] = ShowSnackbarWidget;

})();
