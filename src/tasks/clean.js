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

var requireModule = require('../utils/requireModule')
var gulp   = require('gulp');
var config = global.buildOptions;

// Exclude certain files, and set up del config properly
async function cleaner(glob) {
    const {deleteSync: del} = await requireModule('del')

    glob = Array.isArray(glob) ?  glob : [glob];
    glob.push('!.gitignore');
    glob.push('!.gitkeep');
    del(glob);
}

// Clean scripts subtask
function cleanScripts() {
    return cleaner(config.scripts.dest + '**/*');
}

// Clean styles subtask
function cleanStyles() {
    return cleaner(config.styles.dest + '**/*');
}

// Clean fonts subtask
function cleanFonts() {
    return cleaner(config.fonts.dest + '**/*');
}

// Clean images subtask
function cleanImages() {
    return cleaner(config.images.dest + '**/*');
}

module.exports = {
    cleanScripts,
    cleanStyles,
    cleanFonts,
    cleanImages
}