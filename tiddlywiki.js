#!/usr/bin/env node

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("tiddlywiki/boot/boot.js").TiddlyWiki();

// Pass the command line arguments to the boot kernel
$tw.boot.argv = ["editions/material", "--server"];

// Boot the TW5 app
$tw.boot.boot();
