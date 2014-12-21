/**
 * scriptFilter
 *
 * Filters out non .coffee and .js files. Prevents accidental inclusion of
 * possible hidden files. Used for building the Gulpfile from tasks.
 *
 */

/* jshint node: true */

"use strict";

var path = require("path");

module.exports = function(name) {
    return /(\.(js|coffee)$)/i.test(path.extname(name));
};