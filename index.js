/**
 * index.js
 *
 * Just puts all of the gulp tasks together.
 *
 */

/* jshint node: true */

"use strict";

var fs = require('fs');
var wrench = require('wrench');
var onlyScripts = require(__dirname + '/util/scriptFilter');
var argh = require('argh');

/**
 * Command Line Options
 *
 * --production: Optimizes the build for production
 * 
 * (Sets the is_production global if you use --production command line flag.)
 *
 */
global.is_production = argh.argv.production;

// Put all gulp tasks together
var tasks = wrench.readdirSyncRecursive(__dirname + '/tasks/').filter(onlyScripts);
tasks.forEach(function(task) {
    require(__dirname + '/tasks/' + task);
});
