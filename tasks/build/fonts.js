/**
 * build:fonts Task
 *
 * @example gulp build:fonts
 *
 * Detects any fonts that have changed, copies any that have.
 *
 * Note that generally clean:fonts is run right before this, so the changed
 * functionality usually does nothing. In the future, you could figure out
 * how to refactor this.
 *
 */

/* jshint node: true */

"use strict";

var gulp       = require('gulp');
var changed    = require('gulp-changed');
var config     = global.configOpts;

gulp.task('build:fonts', function() {
    var source = config.fonts.source;
    var dest   = config.fonts.dest;

    return gulp.src(source)
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(gulp.dest(dest));
});
