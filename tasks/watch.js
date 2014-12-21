/**
 * watch Task
 *
 * @example gulp watch
 * @example gulp build:watch
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
 * TODOs:
 * - This task could one day make use of watchify for JavaScript, however this
 * has been tried multiple times and watchify is REALLY hard to work with, so be
 * warned...
 * - This task could make good use of gulp-notify to alert on any errors. This
 * will probably require a refactor of the build tasks, though.
 *
 */

/* jshint node: true */

"use strict";

var gulp    = require('gulp');
var watch   = require('gulp-watch');
var config  = global.configOpts;

gulp.task('watch', ['build:watch']);
gulp.task('watch', function() {

    // Fonts
    gulp.start('clean:fonts', 'build:fonts');
    watch(config.fonts.source, {'name': 'fonts'}, function () {
        gulp.start('clean:fonts', 'build:fonts');
    });

    // Images
    gulp.start('clean:images', 'build:images');
    watch(config.images.source, {'name': 'images'}, function () {
        gulp.start('clean:images', 'build:images');
    });

    // Scripts
    gulp.start('clean:scripts', 'build:scripts');
    watch(config.scripts.source, {'name': 'scripts'}, function () {
        gulp.start('clean:scripts', 'build:scripts');
    });

    // Styles
    gulp.start('clean:styles', 'build:styles');
    watch(config.styles.source, {'name': 'styles'}, function () {
        gulp.start('clean:styles', 'build:styles');
    });

});
