/* jshint node: true */

/**
 * Gulp Build Fonts Subtask
 *
 * Detects any source fonts that have changed,
 * and copies any that have to destination.
 *
 * Note that generally clean:fonts is run right before this, so the changed
 * functionality usually does nothing. In the future, you could figure out
 * how to refactor this.
 *
 * @example
 *     gulp build:fonts
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
var gulp    = require('gulp');
var config  = global.buildOptions;

// Copy fonts from source to destination
module.exports = async function() {
    const {default: changed} = await requireModule('gulp-changed')

    var source = config.fonts.source;
    var dest = config.fonts.dest;
    return gulp.src(
      source,
      {
        encoding: false,
      },
    )
      .pipe(changed(dest)) // Ignore unchanged files
      .pipe(gulp.dest(dest));
}
