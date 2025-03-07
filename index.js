/* jshint node: true */

/**
 * Main Package File
 *
 * This file simply autoloads all the defined Gulpfile tasks and utilities.
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var argh = require('argh');
var gulp = require('gulp');
var listTasks =require('gulp-task-listing')
/**
 * Command Line Options
 *
 * --production: Optimizes the build for production
 *
 * (Sets the is_production global if you use --production command line flag.)
 *
 */
global.is_production = argh.argv.production;

const {
  buildFonts,
  buildImages,
  buildScripts,
  buildStyles
} = require('./src/tasks/build')
const {
  cleanScripts,
  cleanStyles,
  cleanFonts,
  cleanImages
} = require('./src/tasks/clean')
const {
  jekyllBuild,
  jekyllWatch
} = require('./src/tasks/jekyll')
const deployFns = require('./src/tasks/deploy')
const lint = require('./src/tasks/lint')
const watch = require('./src/tasks/watch')
const workbench = require('./src/tasks/workbench')

/** Build tasks  */
gulp.task('build:fonts', buildFonts)
gulp.task('build:images', buildImages)
gulp.task('build:scripts', gulp.series(cleanScripts, buildScripts))
gulp.task('build:styles', gulp.series(cleanStyles, buildStyles))
// Run all build subtasks
gulp.task('build', gulp.series('build:fonts', 'build:images', 'build:scripts', 'build:styles'));

/** Clean tasks */
gulp.task('clean:scripts', cleanScripts)
gulp.task('clean:styles', cleanStyles)
gulp.task('clean:fonts', cleanFonts)
gulp.task('clean:images', cleanImages)
// Run all clean subtasks
gulp.task('clean', gulp.series('clean:fonts', 'clean:images', 'clean:scripts', 'clean:styles'));
// Alias build:clean to clean
gulp.task('build:clean', gulp.series('clean'));

/** Deploy tasks */
for (let name in deployFns) {
  gulp.task('deploy:'+name, deployFns[name]);
}
gulp.task('deploy', gulp.series(...Object.values(deployFns)));

/** Jekyll tasks */
gulp.task('jekyll:build', jekyllBuild)
// Serve jekyll templates.
gulp.task('jekyll:watch', jekyllWatch)
// Alias jekyll:serve to jekyll:watch
gulp.task('jekyll:serve', gulp.series('jekyll:watch'));
// Run all jekyll subtasks
gulp.task('jekyll', gulp.series(
  'jekyll:build'
));
// Alias build:jekyll to jekyll
gulp.task('build:jekyll', gulp.series('jekyll'));

/** Lint tasks */
gulp.task('lint:scripts', lint);
// Run all lint subtasks
gulp.task('lint', gulp.series(
  'lint:scripts'
));
// Alias build:lint to lint
gulp.task('build:lint', gulp.series('lint'));

/** Watch tasks */
gulp.task('watch', gulp.series('clean', 'build', watch));
// Alias build:watch to watch
gulp.task('build:watch', gulp.series('watch'));

/** Workbench tasks */
gulp.task('workbench', workbench);

/** Default task */
gulp.task('default', listTasks);
