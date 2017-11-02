/*\
title: $:/plugins/ustuehler/muuri/widgets/muuri.js
type: application/javascript
module-type: widget
caption: muuri

Packery cascading grid layout widget

\*/
(function (global) {

"use strict";
/*jslint node: true, browser: true */
/*global $tw: false */

var Widget = require("$:/core/modules/widgets/widget.js").widget;

if (typeof window !== 'undefined') {
  var Muuri = require("$:/plugins/ustuehler/muuri/muuri.min.js");
}

var MuuriWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
MuuriWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
MuuriWidget.prototype.render = function(parent,nextSibling) {
	//var self = this;

	// Compute attributes and execute state
	this.computeAttributes();
	this.execute();

  // Insert DOM node
  var domNode = this.document.createElement("div");
  domNode.setAttribute("class","grid");
	parent.insertBefore(domNode,nextSibling);
	this.renderChildren(domNode,null);
  this.domNodes.push(domNode);

  var muuri = new Muuri(domNode, {
    items: '.grid-item',
		layout: {
			fillGaps: true,
			horizontal: false,
			alignRight: false,
			alignBottom: false,
			rounding: false
		},
    dragEnabled: false,
    containerClass: 'grid',
    itemClass: 'grid-item',
		itemVisibleClass: 'muuri-shown',
		itemHiddenClass: 'muuri-hidden',
		itemPositioningClass: 'muuri-positioning',
		itemDraggingClass: 'muuri-dragging',
		itemReleasingClass: 'muuri-releasing'
  });

  // add() and remove() should be invoked on the grid container by the
  // storyview when tiddlers get inserted or removed
  domNode.add = function(elements, options) {
    console.log("MuriWidget adding elements " + elements);
    muuri.add(elements, options);
  };
  domNode.remove = function(elements, options) {
    console.log("MuriWidget removing elements " + elements);
    muuri.remove(elements, options);
  };

  // Register a handler to fire when child DOM elements are added or removed.
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type == 'childList') {
        // Trigger the grid layout engine
        console.log("MuriWidget observed a change in childList");
        ///muuri.layout();
      }
    });    
  });
  observer.observe(domNode, { childList: true });
};

/*
Compute the internal state of the widget
*/
MuuriWidget.prototype.execute = function() {
  this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
MuuriWidget.prototype.refresh = function(changedTiddlers) {
  if (this.refreshChildren(changedTiddlers)) {
    if (this.grid) {
      this.grid.layout();
    }
    return true;
  }
  return false;
};

exports["muuri"] = MuuriWidget;

})(this);
