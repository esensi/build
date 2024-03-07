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
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var config = global.configOpts;

module.exports = function() {

    console.log(config.scripts)

    return
    return gulp.src(config.scripts.lint)
      .pipe(jshint({lookup: true}))
      .pipe(jshint.reporter('default'));
}