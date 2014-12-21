/**
 * Lint Tasks
 *
 * @example gulp build:lint
 * @example gulp lint:scripts
 *
 * Uses JSHint to lint the script assets. (This works, but we recommend using
 * an "inline" linter in your text editor, like SublimeLinter3, for better
 * results.)
 *
 */

 /* jshint node: true */

"use strict";

var jshint  = require('gulp-jshint');
var gulp    = require('gulp');
var config  = global.configOpts;

gulp.task('lint:scripts', ['build:lint']);
gulp.task('build:lint', function() {
    gulp.src([
            // Gulp itself
            './Gulpfile.js',

            //Js hint config
            './.jshintrc',

            // Composer dependency declaration and configs
            './composer.json',

            // JS package dependency declaration, and some configs
            './package.json',

             // All scripts
            config.scripts.source + '**/*.js',

            // Except Google Analytics
            '!' + config.scripts.source + 'common/google-analytics.js'
        ])
        .pipe(jshint({lookup: true}))
        .pipe(jshint.reporter('default'));
});
