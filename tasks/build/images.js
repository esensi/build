/**
 * build:images Task
 *
 * @example gulp build:images
 *
 * Detects any images that have changed, optimizes & moves any that have.
 *
 * Note that generally clean:images is run right before this, so the changed
 * functionality usually does nothing. In the future, you could figure out
 * how to refactor this.
 *
 */

/* jshint node: true */

"use strict";

var gulp     = require('gulp');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var gulpif   = require('gulp-if');
var config   = global.configOpts;

gulp.task('build:images', function() {
    var source = config.images.source;
    var dest   = config.images.dest;

    return gulp.src(source)
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(gulpif(global.is_production, imagemin())) // Optimize, if prod
        .pipe(gulp.dest(dest));
});
