/* jshint node: true */

/**
 * Filters file glob for .css, .less, and .scss files.
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
  return /(\.(css|scss|less)$)/i.test(path.extname(name));
};