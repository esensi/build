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
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp    = require('gulp');
var changed = require('gulp-changed');
var config  = global.buildOptions;

// Copy fonts from source to destination
gulp.task('build:fonts', function()
{
    var source = config.fonts.source;
    var dest   = config.fonts.dest;
    return gulp.src(source)
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(gulp.dest(dest));
});
