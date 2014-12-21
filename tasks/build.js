/**
 * build Task
 *
 * @example gulp build
 *
 * Just runs all the other tasks required for a successful build.
 *
 */

/* jshint node: true */

"use strict";

var gulp = require('gulp');

gulp.task(
    'build',
    ['build:scripts', 'build:styles', 'build:fonts', 'build:images']
);
