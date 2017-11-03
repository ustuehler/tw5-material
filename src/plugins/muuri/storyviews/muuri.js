/*\
title: $:/plugins/ustuehler/muuri/storyviews/muuri.js
type: application/javascript
module-type: storyview

Story view that cooperates with the Muuri grid layout engine

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var easing = "cubic-bezier(0.645, 0.045, 0.355, 1)"; // From http://easings.net/#easeInOutCubic

var MuuriStoryView = function(listWidget) {
	this.listWidget = listWidget;
};

MuuriStoryView.prototype.navigateTo = function(historyInfo) {
	var listElementIndex = this.listWidget.findListItem(0,historyInfo.title);
	if(listElementIndex === undefined) {
		return;
	}
	var listItemWidget = this.listWidget.children[listElementIndex],
		targetElement = listItemWidget.findFirstDomNode();
	// Abandon if the list entry isn't a DOM element (it might be a text node)
	if(!(targetElement instanceof Element)) {
		return;
	}
	// Scroll the node into view
	this.listWidget.dispatchEvent({type: "tm-scroll", target: targetElement});
};

MuuriStoryView.prototype.insert = function(widget) {
	var targetElement = widget.findFirstDomNode(),
		duration = $tw.utils.getAnimationDuration();

	// Abandon if the list entry isn't a DOM element (it might be a text node)
	if(!(targetElement instanceof Element)) {
		return;
	}

  /*
	// Get the current height of the tiddler
	var computedStyle = window.getComputedStyle(targetElement),
		currMarginBottom = parseInt(computedStyle.marginBottom,10),
		currMarginTop = parseInt(computedStyle.marginTop,10),
		currHeight = targetElement.offsetHeight + currMarginTop;
	// Reset the margin once the transition is over
	setTimeout(function() {
		$tw.utils.setStyle(targetElement,[
			{transition: "none"},
			{marginBottom: ""}
		]);
	},duration);
	// Set up the initial position of the element
	$tw.utils.setStyle(targetElement,[
		{transition: "none"},
		{marginBottom: (-currHeight) + "px"},
		{opacity: "0.0"}
	]);
	$tw.utils.forceLayout(targetElement);
	// Transition to the final position
	$tw.utils.setStyle(targetElement,[
		{transition: "opacity " + duration + "ms " + easing + ", " +
					"margin-bottom " + duration + "ms " + easing},
		{marginBottom: currMarginBottom + "px"},
		{opacity: "1.0"}
	]);
  */

  this.addGridItem(targetElement, { instant: true });
};

MuuriStoryView.prototype.remove = function(widget) {
	var targetElement = widget.findFirstDomNode(),
		duration = $tw.utils.getAnimationDuration(),
		removeElement = function() {
			widget.removeChildDomNodes();
		};

	// Abandon if the list entry isn't a DOM element (it might be a text node)
	if(!(targetElement instanceof Element)) {
		removeElement();
		return;
	}

  this.removeGridItem(targetElement, { instant: true, removeElements: true });

  /*
	$tw.utils.forceLayout(targetElement);
	$tw.utils.setStyle(targetElement,[
		{transition: $tw.utils.roundTripPropertyName("transform") + " " + duration + "ms " + easing + ", " +
					"opacity " + duration + "ms " + easing + ", " +
					"margin-bottom " + duration + "ms " + easing},
		{transform: "translateX(-" + currWidth + "px)"},
		{marginBottom: (-currHeight) + "px"},
		{opacity: "0.0"}
	]);
  */
};

MuuriStoryView.prototype.grid = function(targetElement) {
  var grid = targetElement.parentNode;

  if (!(grid instanceof Element)) {
    $tw.utils.error("MuuriStoryView couldn't find grid for " + targetElement.getAttribute('class'));
  }

  return grid;
}

MuuriStoryView.prototype.addGridItem = function(targetElement, options) {
  var grid = this.grid(targetElement);

  grid.add(targetElement, options);
};

MuuriStoryView.prototype.removeGridItem = function(targetElement, options) {
  var grid = this.grid(targetElement);

  grid.remove(targetElement, options);
};

exports.muuri = MuuriStoryView;

})();
