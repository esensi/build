/**
 * browserSync task
 *
 * @example gulp clean
 * @example gulp clean:scripts
 * @example gulp clean:styles
 * @example gulp clean:fonts
 * @example gulp clean:images
 * @example gulp build:clean
 *
 * A "simple enough" set of tasks that just clean out destination directories.
 *
 * Note that these tasks wipe out the contents of the destination directories.
 * An area for potential optimization would be to be smarter about this, and
 * don't wipe out stuff that will be rebuilt exactly the same later.
 *
 */

/* jshint node: true */

"use strict";

var gulp    = require('gulp');
var del     = require('del');
var config  = global.configOpts;

// Exclude certain files, and set up del config properly
function clean_template(glob) {

    glob = Array.isArray(glob) ?  glob : [glob];
    glob.push('!.gitignore');
    glob.push('!.gitkeep');

    del(glob);
}

// Clean everything
gulp.task('clean', ['build:clean']);
gulp.task('build:clean', function () {
    gulp.start('clean:scripts', 'clean:styles', 'clean:fonts', 'clean:images');
});

// Clean scripts
gulp.task('clean:scripts', function () {
    return clean_template(config.scripts.dest + '*');
});

// Clean styles
gulp.task("clean:styles", function () {
    return clean_template(config.styles.dest + '*');
});

// Clean fonts
gulp.task("clean:fonts", function () {
    return clean_template(config.fonts.dest + '*');
});

// Clean images
gulp.task("clean:images", function () {
    return clean_template(config.images.dest + '*');
});
