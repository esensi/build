/* jshint node: true */

/**
 * Filters file glob for .js and .coffee files.
 *
 * @package Esensi\Build
 * @author Daniel LaBarge <daniel@emersonmedia.com>
 * @author Matt Malinowski <matt@emersonmedia.com>
 * @copyright 2015 Emerson Media LP
 * @license https://github.com/esensi/build/blob/master/LICENSE.txt MIT License
 * @link http://www.emersonmedia.com
 */

"use strict";

var path = require('path');

module.exports = function(name)
{
    return /(\.(js|coffee)$)/i.test(path.extname(name));
};
