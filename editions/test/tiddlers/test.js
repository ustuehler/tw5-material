/*\
title: test-tobibeer/PLUGINNAME-filter.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the PLUGINNAME filter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

describe("test PLUGINNAME filter", function() {

	// Create a wiki
	var wiki = new $tw.Wiki({
		shadowTiddlers: {
			"$:/shadow": {
				tiddler: new $tw.Tiddler({title: "$:/shadow"}),
			}
		}
	});

	// Add a few  tiddlers
	wiki.addTiddler({
		title: "foo",
		modified:"20151218",
		text:"foo: bar\nfoo 1: baz"
	});
	wiki.addTiddler({title: "bar",key:"val"});
	wiki.addTiddler({title: "baz"});
	var fakeWidget = {getVariable: function() {return "foo";}};

	// Tests

	//it("description", function() {
	//	expect(wiki.filterTiddlers(
	//		"[[]ust[]]"
	//	,fakeWidget).join(",")).toBe("foo 1");
	//});
});

})();
