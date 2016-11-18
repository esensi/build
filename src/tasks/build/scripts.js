/* jshint node: true */

/**
 * Gulp Build Scripts Subtask
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
 * @example
 *     gulp build:scripts
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 *
 * @see https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
 */

"use strict";

var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var vueify     = require('vueify');
var gulpif     = require('gulp-if');
var rev        = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var stream     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');
var glob       = require('glob');
var config     = global.buildOptions;

// Bundle source JS into minified destination JS files.
// Cleans scripts first to prepare for build.
gulp.task('build:scripts', ['clean:scripts'], function()
{
    var pipeline;
    var source = config.scripts.source;
    var dest   = config.scripts.dest;
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
            })
            .transform(vueify)
            .transform(babelify)
            .bundle()

            // Adding an error handler, for when the pipe breaks
            // According to: http://www.bennadel.com/blog/2692-you-have-to-explicitly-end-streams-after-pipes-break-in-node-js.htm
            // the stream has to be ended, but it works without ending it
            .on('error', function (err) {
                console.log(err.message);
            })
            
            .pipe(stream(name))
            .pipe(buffer())
            .pipe(gulpif(!global.is_production, sourcemaps.init({loadMaps: true}))) // load map from browserify file
            .pipe(gulpif(global.is_production, uglify())) // Minify in production

            // Build without revision
            .pipe(gulpif(!global.is_production && !config.revisions, sourcemaps.write('.'))) // Write maps externally to same directory
            .pipe(gulpif(!config.revisions, gulp.dest(dest)))

            // Build with revisions
            .pipe(gulpif(config.revisions, rev()))
            .pipe(gulpif(!global.is_production && config.revisions, sourcemaps.write('.'))) // Write maps externally to same directory
            .pipe(gulpif(config.revisions, gulp.dest(dest))) // write assets to build dir

            // Build revisions manifest
            .pipe(gulpif(config.revisions, rev.manifest( name.replace('.js', '.json') )))
            .pipe(gulpif(config.revisions, gulp.dest(dest))); // write manifest to build dir
        });
    });

    return pipeline;

});
