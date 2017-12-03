#!/usr/bin/env node
// This is invoked as a shell script by NPM

var plugin = require('./node_modules/tw5-plugin/plugins/ustuehler/core/modules/plugin.js').plugin
var $tw = require('tiddlywiki/boot/boot.js').TiddlyWiki()

// Resolve missing plugins and themes to node modules
plugin.setPluginsEnv('TIDDLYWIKI_PLUGIN_PATH')
plugin.setThemesEnv('TIDDLYWIKI_THEME_PATH')

// Pass the command line arguments to the boot kernel
$tw.boot.argv = process.argv.slice(2)

// Assume some default arguments for nodemon
if ($tw.boot.argv.length == 0) {
  $tw.boot.argv = ['editions/dev', '--server', '8080']
}

// Boot the TW5 app
$tw.boot.boot()
