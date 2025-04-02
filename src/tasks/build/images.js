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

var requireModule = require('../../utils/requireModule')
var gulp     = require('gulp');
var gulpif   = require('gulp-if');
var config   = global.buildOptions;

// Copy fonts from source to destination
module.exports = async function() {
    const {default: changed} = await requireModule('gulp-changed')

    var source = config.images.source;
    var dest = config.images.dest;
    return gulp.src(
      source,
      {
        encoding: false,
      },
    )
      .pipe(changed(dest)) // Ignore unchanged files
      .pipe(gulp.dest(dest));
}
