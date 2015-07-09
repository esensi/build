/* jshint node: true */

/**
 * Gulp Build Images Subtask
 *
 * Detects any source images that have changed,
 * and copies any that have to destination. With the
 * --production switch enabled the build also compresses
 * the images for load-time optimizations.
 *
 * Note that generally clean:images is run right before this, so the changed
 * functionality usually does nothing. In the future, you could figure out
 * how to refactor this.
 *
 * @example
 *     gulp build:images
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp     = require('gulp');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var gulpif   = require('gulp-if');
var config   = global.buildOptions;

// Copy fonts from source to destination
gulp.task('build:images', function()
{
    var source = config.images.source;
    var dest   = config.images.dest;
    return gulp.src(source)
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(gulpif(global.is_production, imagemin())) // Optimize for production
        .pipe(gulp.dest(dest));
});
