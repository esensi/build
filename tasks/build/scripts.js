/**
 * build:scripts Task
 *
 * @example gulp build:scripts
 *
 * This task bundles JavaScript together using Browserify.
 *
 * Regular front end dependencies need shimming, see package.json for the
 * "browserify-shim" attribute that contains dependencies and return values,
 * and see "browser" attribute for dependency aliases.
 *
 * Note that the default behavior for build:scripts is to run clean:scripts
 * first. Later on, if you start to use watchify, this may be undesirable.
 *
 * Among other things, this task was based on:
 * https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
 *
 */

/* jshint node: true */

"use strict";

var gulp       = require('gulp');
var browserify = require('browserify');
var gulpif     = require('gulp-if');
var rev        = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var stream     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');
var glob       = require('glob');
var config     = global.configOpts;

gulp.task('build:scripts', ['clean:scripts'], function() {

    var source = config.scripts.source;
    var dest   = config.scripts.dest;

    var pipeline;
    glob(source, {}, function(err, files)
    {
        files.forEach(function(filename)
        {
            var name = filename.split('/');
            name = name[name.length - 1];
            pipeline = browserify(filename, {
                debug: ! global.is_production,
                insertGlobals: true,
                detectGlobals: true,
                noParse: false
            }).bundle()
            .pipe(stream(name))
            .pipe(buffer())
            .pipe(gulpif(!global.is_production, sourcemaps.init({loadMaps: true}))) // load map from browserify file
            .pipe(gulpif(global.is_production, uglify())) // Uglify if production
            .pipe(gulpif(!global.is_production, sourcemaps.write('.'))) // Write maps externally to same directory

            // Save original
            .pipe(gulpif(!config.revisions, gulp.dest(dest)))

            // Build revisions
            .pipe(gulpif(config.revisions, rev()))
            .pipe(gulpif(config.revisions, gulp.dest(dest))) // write rev'd assets to build dir

            // Build revisions manifest
            .pipe(gulpif(config.revisions, rev.manifest()))
            .pipe(gulpif(config.revisions, gulp.dest(dest))); // write manifest to build dir
        });
    });

    return pipeline;

});
