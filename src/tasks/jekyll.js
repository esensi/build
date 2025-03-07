/* jshint node: true */

/**
 * Gulp Jekyll Tasks
 *
 * This simply runs a Jekyll build from Gulp.
 *
 * @example
 *     gulp jekyll
 *     gulp jekyll:build
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var log   = require('fancy-log');
var process = require('child_process');

// Build jekyll templates.
function jekyllBuild(callback) {
    // Run `jekyll build` in a child process
    // Uses the `--lsi` flag to improve related blog posts
    process.exec('jekyll build --lsi', function(err, stdout, stderr)
    {
        log(stdout);
        callback(err);
    });
}

function jekyllWatch(callback) {

    // Run `jekyll serve --watch` in a child process
    process.exec('jekyll serve --watch', function(err, stdout, stderr)
    {
        log(stdout);
        callback(err);
    });
}

module.exports = {
    jekyllBuild,
    jekyllWatch
}


