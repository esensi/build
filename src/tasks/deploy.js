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
var colors       = require('ansi-colors');
var log       = require('fancy-log');
var rsync       = require('gulp-rsync');
var awspublish  = require('gulp-awspublish');
var config      = global.buildOptions;
var awsCreds    = global.awsCredentials;
var deploy      = config.deployment;
var connections = deploy.connections;

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

    // gulp-awspublish only works with a single source, unlike rsync.
    // So, if deploy.source isn't a string...
    if (typeof deploy.source !== "string" || deploy.source instanceof String) {
        // ... and it's length 1, convert to array ...
        if (deploy.source.length === 1) {
            deploy.source = deploy.source[0];
        }
        // ... otherwise error out.
        else {
            log(
                colors.bgRed("Error!"),
                "deploy.source is an array and S3 deployment doesn't support arrays. Make deploy.source a single-value array or string and try again!"
            );
            return false;
        }
    }

    // gulp-awspublish also won't work with a source like `./public`, it wants
    // `./public/**`. So, check for this, and display a message.
    if( deploy.source.substring(0,2) === './' && deploy.source.substring(deploy.source.length-3) !== '/**' ) {
        log(
            colors.yellow("Heads up!"),
            "You're trying to deploy '" + deploy.source + "'. If you're trying to deploy an entire directory to S3, you need to end your source with '/**'. (If you're not trying to deploy a directory, ignore this and carry on.)"
        );
    }

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

const fns = {}

for(var environment in connections) {
    (function(environment)
    {
        fns[environment] = async function() {

            var connection = connections[environment];

            // S3
            if (connection.type === "s3") {
                return deployToS3(connection);
            }
            // Any other connection type defaults to rsync
            else {
                return deployWithRsync(connection);
            }

        }
    })(environment);
}

module.exports = fns
