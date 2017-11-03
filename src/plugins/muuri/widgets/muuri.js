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
	var self = this;

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
    showDuration: 0,
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
    muuri.add(elements, options);
  };
  domNode.remove = function(elements, options) {
    console.log("MuriWidget removing elements " + elements);
    muuri.remove(elements, options);
  };

  // Register resize event handlers for all children
  self.registerMissingResizeListeners(domNode, muuri);

  // Register a handler to fire when child DOM elements are added or removed.
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type == 'childList') {
        console.log("MuuriWidget observed a change in childList");
        // Register resize event handlers for new children
        self.registerMissingResizeListeners(domNode, muuri);
      }
    });    
  });
  observer.observe(domNode, { childList: true });
};

/*
Register 
*/
MuuriWidget.prototype.registerMissingResizeListeners = function(domNode, grid) {
  for (var i = 0; i < domNode.children.length; i++) {
    var item = domNode.children[i];

    console.log(item);

    if (typeof item.resizeHandler === 'undefined') {
      item.resizeHandler = (function(item) {
        return function() {
          console.log("MuuriWidget got a resize event from " + item.getAttribute('class'));
          grid.hide(item, {
            instant: true,
            onFinish: function() {
              grid.show(item);
            }
          });
        };
      })(item);

      console.log("MuuriWidget registering for resize events from " + item.getAttribute('class'));
      $tw.utils.addResizeListener(item, item.resizeHandler);

      console.log("MuriWidget adding elements " + item);
      grid.add(item, { instant: true, index: -1 });

      // FIXME: leak: grid.remove() missing
    }
  }
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
  return this.refreshChildren(changedTiddlers);
};

exports["muuri"] = MuuriWidget;

})(this);
