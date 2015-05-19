/* jshint node: true */

/**
 * Gulp Quality Assurance Tasks
 *
 * Uses JSHint to lint the script assets. This works, but we recommend using
 * an "inline" linter in your text editor, like SublimeLinter3, for better
 * results.
 *
 * @example
 *     gulp lint
 *     gulp lint:scripts
 *
 * @package Esensi\Build
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var config = global.configOpts;

// Alias build:lint to lint
gulp.task('build:lint', ['lint']);

// Run all lint subtasks
gulp.task('lint', [
    'lint:scripts'
]);

// Lint scripts subtask
gulp.task('lint:scripts', function()
{
    return gulp.src(config.scripts.lint)
        .pipe(jshint({lookup: true}))
        .pipe(jshint.reporter('default'));
});
