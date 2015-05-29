/* jshint node: true */

/**
 * Gulp Deploy Tasks
 *
 * This simply runs all the deploy subtasks.
 *
 * @example
 *     gulp deploy
 *     gulp deploy:<environment>
 *
 * @package Esensi\Build
 * @author daniel <daniel@emersonmedia.com>
 * @author matt <matt@emersonmedia.com>
 * @copyright 2014 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var rsync       = require('gulp-rsync');
var sequence    = require('run-sequence');
var config      = global.buildOptions;
var deploy      = config.deployment;
var connections = deploy.connections;

// Run all deploy subtasks with production optimizations
gulp.task('deploy', function()
{
    // Get the original production state to reset when we're done
    var original = global.is_production;
    global.is_production = true;

    // Get all the environments we need to deploy to
    // Add them to the sequence of tasks to run
    var tasks = [];
    for(var environment in connections)
    {
        // Add the deploy task for the given environment
        tasks.push('deploy:' + environment);
    }

    // Now run the tasks in sequence
    // Add the callback that resets the production state when we're done
    sequence(tasks, function() {
        global.is_production = original;
    });
});

// Create gulp deploy subtasks for each environment.
// Uses rsync to deploy source files to remote server via SSH.
for(var environment in connections)
{
    gulp.task('deploy:' + environment, function()
    {
        var connection = connections[environment];
        var rsyncOptions = {
            destination: connection.dest,
            hostname: connection.hostname,
            username: connection.username,
            incremental: true,
            progress: true,
            relative: true,
            emptyDirectories: true,
            recursive: true,
            clean: false
        };
        return gulp.src(deploy.source)
            .pipe(rsync(rsyncOptions));
    });
}
