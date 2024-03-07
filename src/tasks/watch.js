/* jshint node: true */

/**
 * Gulp Watch Task
 *
 * This is a very simple task that watches source directories for changes,
 * and re-runs build tasks accordingly.
 *
 * Note: gaze (the library that gulp.watch and gulp-watch use to do filesystem
 * watching) does _not_ detect new files nor deleted files, only modified files.
 * New versions of gaze will fix this, and updating gulp should just integrate
 * these fixes.
 *
 * Also note: we use gulp-watch here because we've always used it, and it logs
 * events in a nice way. We don't use gulp-watch to its full potential, and
 * could perhaps use gulp.watch if we wrote a custom logger (which is easy).
 *
 * @example
 *     gulp watch
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 *
 * @todo This task could one day make use of watchify for JavaScript, however this
 *       has been tried multiple times and watchify is REALLY hard to work with,
 *       so be warned...
 *
 * @todo This task could make good use of gulp-notify to alert on any errors. This
 *       will probably require a refactor of the build tasks, though.
 */

"use strict";

var gulp     = require('gulp');
var config   = global.buildOptions;

// Watch source directories for changes
// and run appropriate build subtask.
module.exports = function() {
    // Watch scripts
    gulp.watch(config.scripts.watch, gulp.series('build:scripts'));

    // Watch styles
    gulp.watch(config.styles.watch, gulp.series('build:styles'));

    // Watch images
    gulp.watch(config.images.watch, gulp.series('clean:images', 'build:images'));

    // Watch fonts
    gulp.watch(config.fonts.watch, gulp.series('clean:fonts', 'build:fonts'));
}
