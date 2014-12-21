/**
 * Gulpfile-sample.js
 * 
 * This sample Gulpfile.js will help you get started with esensi/build quickly.
 *
 * Put this Gulpfile.js in the root of your project directory.
 * 
 * To change the location of the configuration file, set 'pathToConfigFile'
 * below. For Esensi projects, './app/assets/build.json' is the default path.
 *
 */

/* jshint node: true */

"use strict";

var pathToConfigFile = './app/assets/build.json';

global.configOpts = require(pathToConfigFile);
require('@esensi/build');
