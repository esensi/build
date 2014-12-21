/**
 * browserSync task
 *
 * @example gulp browserSync
*
 * Makes cross-browser / cross-device testing easier. Check out
 * http://www.browsersync.io/ for more details.
 * 
 * The short version is that BrowserSync will wrap your development URL
 * with a proxy server, and when something changes in your build directory,
 * it'll reload the required resources in all browsers.
 * 
 * This is a "rough draft" of this task, and it doesn't really work properly
 * right now. If you have a need for this, take a look at
 * http://www.browsersync.io/docs/gulp/ for all of the other great stuff you
 * can do with this, and fix it up.
 *
 */

/* jshint node: true */

"use strict";

var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browser-sync', ['build'], function() {
    browserSync.init(['build/**'], {
        proxy: "localhost:8000"
    });
});
