/* jshint node: true */

/**
 * Gulp Build Styles Subtask
 *
 * This task compiles LESS into CSS and minifies in production.
 *
 * @example
 *     gulp build:styles
 *
 * @package Esensi\Build
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 *
 */

"use strict";

var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gulpif       = require('gulp-if');
var less         = require('gulp-less');
var rev          = require('gulp-rev');
var sourcemaps   = require('gulp-sourcemaps');
var config       = global.buildOptions;

// Compiles source LESS to destination CSS.
// Cleans styles first to prepare for build.
gulp.task('build:styles', ['clean:styles'], function () {

    gulp.src(config.styles.source)

        // In development, use sourcemaps. We must 'init' before processing
        // begins, and 'write' after it's done. If you add more processing
        // steps, make sure you check to make sure your plugin is supported:
        // @link https://github.com/floridoo/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support
        .pipe(gulpif(!global.is_production,sourcemaps.init()))

        // Compile LESS and compress in production
        .pipe(less({ compress: global.is_production }))

        // Handle any LESS errors. This is hacky and one-off. We have a lot of
        // issues with LESS errors being uncaught. Hopefully gulp 4 will bring
        // comprehensive error handling and we can remove all this nonsense.
        .on('error', function(err){ console.log(err.message); })

        // Run autoprefixer: set browsers to target in the build.json file.
        .pipe(autoprefixer(config.autoprefixerOpts))

        // In development, use sourcemaps. The '.' writes maps externally to
        // same directory. Default is internal write.
        .pipe(gulpif(!global.is_production, sourcemaps.write('.')))

        // Save original
        .pipe(gulpif(!config.revisions, gulp.dest(config.styles.dest)))

        // Build revisions
        .pipe(gulpif(config.revisions, rev()))
        .pipe(gulpif(config.revisions, gulp.dest(config.styles.dest))) // write assets to build dir

        // Build revisions manifest
        .pipe(gulpif(config.revisions, rev.manifest('manifest.json')))
        .pipe(gulpif(config.revisions, gulp.dest(config.styles.dest))); // write manifest to build dir

});
