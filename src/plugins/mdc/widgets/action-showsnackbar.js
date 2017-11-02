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

var ActionShowSnackbarWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ActionShowSnackbarWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ActionShowSnackbarWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ActionShowSnackbarWidget.prototype.execute = function() {
	this.message = this.getAttribute("message", "");
	this.actionText = this.getAttribute("actionText", "");
	this.timeout = parseInt(this.getAttribute("timeout", "2750"));

  // Compute the internal state of child widgets.
  this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
ActionShowSnackbarWidget.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();

  if (changedAttributes.message || changedAttributes.actionText || changedAttributes.timeout) {
    this.refreshSelf();
    return true;
  }

  return this.refreshChildren(changedTiddlers);
};

/*
 * Invoke the action associated with this widget
 */
ActionShowSnackbarWidget.prototype.invokeAction = function(triggeringWidget,event) {
  var self = this;
  var snackbar = this.document.getElementsByClassName("mdc-snackbar")[0];

  console.log(triggeringWidget);
  console.log(event);
  console.log(this.actionText);
  console.log(this.children);
  console.log(this);

  if (snackbar !== undefined) {
    var data = {
      message: this.message,
      actionText: this.actionText,
      actionHandler: function() {
        console.log("Invoking child action widgets");
        self.invokeActions(triggeringWidget,event);
      },
      timeout: this.timeout
    };

    snackbar.widget.show(data);
  }

  return true; // Action was invoked
}

/*
 * Don't allow actions to propagate, because we invoke actions ourself
 */
ActionShowSnackbarWidget.prototype.allowActionPropagation = function() {
  return false;
};

exports["action-showsnackbar"] = ActionShowSnackbarWidget;

})();
