/* jshint node: true */

/**
 * Gulp Clean Tasks
 *
 * These tasks wipe out the contents of the destination directories.
 * An area for potential optimization would be to be smarter about this, and
 * don't wipe out stuff that will be rebuilt exactly the same later.
 *
 * @example
 *     gulp clean
 *     gulp clean:fonts
 *     gulp clean:images
 *     gulp clean:scripts
 *     gulp clean:styles
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var gulp   = require('gulp');
var del    = require('del');
var config = global.buildOptions;

// Exclude certain files, and set up del config properly
function cleaner(glob) {
    glob = Array.isArray(glob) ?  glob : [glob];
    glob.push('!.gitignore');
    glob.push('!.gitkeep');
    del(glob);
}

// Alias build:clean to clean
gulp.task('build:clean', ['clean']);

// Run all clean subtasks
gulp.task('clean', [
    'clean:fonts',
    'clean:images',
    'clean:scripts',
    'clean:styles'
]);

// Clean scripts subtask
gulp.task('clean:scripts', function()
{
    return cleaner(config.scripts.dest + '**/*');
});

// Clean styles subtask
gulp.task("clean:styles", function()
{
    return cleaner(config.styles.dest + '**/*');
});

// Clean fonts subtask
gulp.task("clean:fonts", function()
{
    return cleaner(config.fonts.dest + '**/*');
});

// Clean images subtask
gulp.task("clean:images", function()
{
    return cleaner(config.images.dest + '**/*');
});
