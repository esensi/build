/* jshint node: true */

/**
 * Gulp Default Task
 *
 * Provides a default task to a Gulpfile.
 * This just prints a task list as help information.
 *
 * @example
 *     gulp
 *
 * @package Esensi\Build
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp  = require('gulp');
var tasks = require('gulp-task-listing');

// Run task lister as default task
gulp.task('default', tasks);
