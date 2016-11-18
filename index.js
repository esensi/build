/* jshint node: true */

/**
 * Main Package File
 *
 * This file simply autoloads all the defined Gulpfile tasks and utilities.
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var argh = require('argh');
var fs = require('fs');
var recursiveReadSync = require('recursive-readdir-sync');

/**
 * Command Line Options
 *
 * --production: Optimizes the build for production
 *
 * (Sets the is_production global if you use --production command line flag.)
 *
 */
global.is_production = argh.argv.production;

// Autoload all of the tasks
var onlyScripts = require(__dirname + '/src/filters/scripts');
var directory = __dirname + '/src/tasks/';
var tasks = recursiveReadSync(directory)
    .filter(onlyScripts);
tasks.forEach(function(task) {
    require(task);
});
