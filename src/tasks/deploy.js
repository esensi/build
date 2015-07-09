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
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var rsync       = require('gulp-rsync');
var awspublish  = require('gulp-awspublish');
var sequence    = require('run-sequence');
var config      = global.buildOptions;
var awsCreds    = global.awsCredentials;
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

// Deploy with rsync
var deployWithRsync = function(connection){
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
};

// Deploy to S3, with gulp-awspublish
var deployToS3 = function(connection){

    var awsOptions = {
        params: {
            "Bucket": connection.bucket
        },
        "accessKeyId": awsCreds[connection.bucket].AWS_KEY,
        "secretAccessKey": awsCreds[connection.bucket].AWS_SECRET,
        "region": "" // See below for explanation of blank region.
    };

    // "us-standard" is the default region for S3 buckets, and it uses a blank
    // region, so we set that in awsOptions. If bucket is in another region,
    // we actually set it.
    if (connection.region !== "us-standard") {
        awsOptions.region = connection.region;
    }

    var awsPublisher = awspublish.create(awsOptions);

    var awsHeaders = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    return gulp.src(deploy.source)
        // Gzip and set Content-Encoding headers
        .pipe(awspublish.gzip())
        // Add Content-Length, Content-Type and headers specified above
        // and publish to the bucket.
        .pipe(awsPublisher.publish(awsHeaders))
        // sync removes remote files that aren't present on local
        .pipe(awsPublisher.sync())
        // Create a cache file to speed up consecutive uploads
        // (Saved to .aws-publish-<bucketname>)
        .pipe(awsPublisher.cache())
        // Print upload updates to console
        .pipe(awspublish.reporter());
};

// Create gulp deploy subtasks for each environment.
// Uses rsync to deploy source files to remote server via SSH,
// or gulp-awspublish to deploy to S3.
for(var environment in connections)
{
    (function(environment)
    {
        gulp.task('deploy:' + environment, function()
        {

            var connection = connections[environment];

            // S3
            if (connection.type === "s3") {
                return deployToS3(connection);
            }
            // Any other connection type defaults to rsync
            else {
                return deployWithRsync(connection);
            }

        });
    })(environment);
}
