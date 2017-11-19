#!/usr/bin/env node

var $tw = require("tiddlywiki/boot/boot.js").TiddlyWiki()
var path = require('path')

process.env['TIDDLYWIKI_PLUGIN_PATH'] = path.resolve('plugins')
process.env['TIDDLYWIKI_THEME_PATH'] = path.resolve('themes')

// Pass the command line arguments to the boot kernel
$tw.boot.argv = ["editions/dev", '--server', '8080']

// Boot the TW5 app
$tw.boot.boot()
