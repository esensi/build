/* jshint node: true */

/**
 * Gulp Live Reload Task
 *
 * Provides a workbench to developers to begin development.
 * This task will watch for asset changes and then reload the
 * site automatically with the new builds.
 *
* @example
 *     gulp workbench
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 *
 */

"use strict";

var gulp       = require('gulp');
var livereload = require('gulp-livereload');
var config     = global.buildOptions;

// Live reload site based on watch tasks
module.exports = function() {

    // Setup the initial watch tasks
    gulp.series(config.workbench.init, function() {
        livereload.listen();

        // Now watch the folders for changes to live reload
        var source = config.workbench.watch;
        gulp.watch(source).on('change', (path) => gulp.src(path).pipe(livereload()));
    });
}
