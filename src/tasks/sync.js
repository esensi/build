/* jshint node: true */

/**
 * Gulp Browser Sync Task
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
* @example
 *     gulp sync
 *
 * @package Esensi\Build
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 *
 */

"use strict";

var gulp    = require('gulp');
var browser = require('browser-sync');

// Sync build across browsers
gulp.task('sync', ['build'], function()
{
    // @todo abstract config and source directories
    browser.init(['build/**'], {
        proxy: "localhost:8000"
    });
});
