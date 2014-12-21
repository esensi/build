/**
 * build:styles Task
 *
 * @example gulp build:styles
 *
 * Just compiles LESS to CSS.
 *
 */

/* jshint node: true */

"use strict";

var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gulpif       = require('gulp-if');
var less         = require('gulp-less');
var rev          = require('gulp-rev');
var sourcemaps   = require('gulp-sourcemaps');
var config       = global.configOpts;

gulp.task("build:styles", ['clean:styles'], function () {

    gulp.src(config.styles.source)

        // If not production, use sourcemaps. We must 'init' before processing
        // begins, and 'write' after it's done. (If you add more processing
        // steps, make sure you check to make sure your plugin is supported:
        // https://github.com/floridoo/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support)
        .pipe(gulpif(!global.is_production,sourcemaps.init()))

        // Compile LESS, compress if in production.
        .pipe(less({ compress: global.is_production }))

        // Run autoprefixer. (Don't pass any options b/c the defaults are fine.)
        .pipe(autoprefixer())

        // If not production, use sourcemaps. ('.' writes maps externally to
        // same directory. Default is internal write.)
        .pipe(gulpif(!global.is_production, sourcemaps.write('.')))

        // Build revisions
        .pipe(rev())
        .pipe(gulp.dest(config.styles.dest)) // write rev'd assets to build dir

        // Build revisions manifest
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.styles.dest)); // write manifest to build dir

});
