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
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
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
var sequence = require('run-sequence');
var watch    = require('gulp-watch');
var config   = global.configOpts;

// Alias build:watch to watch
gulp.task('build:watch', ['watch']);

// Watch source directories for changes
// and run appropriate build subtask.
// Runs clean task first to prepare build.
gulp.task('watch', ['clean'], function()
{
    // Run build at start then begins watching
    gulp.start('build');

    // Watch scripts
    watch(config.scripts.watch, {'name': 'scripts'}, function()
    {
        // Scripts run clean:scripts before building
        gulp.start('build:scripts');
    });

    // Watch styles
    watch(config.styles.watch, {'name': 'styles'}, function()
    {
        // Styles run clean:styles before building
        gulp.start('build:styles');
    });

    // Watch images
    watch(config.images.watch, {'name': 'images'}, function()
    {
        // Use sequence to ensure synchronicity
        sequence(['clean:images', 'build:images']);
    });

    // Watch fonts
    watch(config.fonts.watch, {'name': 'fonts'}, function()
    {
        // Use sequence to ensure synchronicity
        sequence(['clean:fonts', 'build:fonts']);
    });

});
