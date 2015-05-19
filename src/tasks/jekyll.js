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
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var process = require('child_process');

// Alias build:jekyll to jekyll
gulp.task('build:jekyll', ['jekyll']);

// Run all jekyll subtasks
gulp.task('jekyll', [
    'jekyll:build'
]);

// Build jekyll templates.
// Runs build of other assets first.
gulp.task('jekyll:build', ['build'], function(callback)
{
    // Run `jekyll build` in a child process
    // Uses the `--lsi` flag to improve related blog posts
    process.exec('jekyll build --lsi', function(err, stdout, stderr)
    {
        gutil.log(stdout);
        callback(err);
    });
});
