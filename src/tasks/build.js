/* jshint node: true */

/**
 * Gulp Build Task
 *
 * This simply runs all the build subtasks.
 *
 * @example
 *     gulp build
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp = require('gulp');

// Run all build subtasks
gulp.task( 'build', [
    'build:fonts',
    'build:images',
    'build:scripts',
    'build:styles'
]);
