## Esensi Build Tasks Package

[![Total Downloads](https://img.shields.io/github/downloads/esensi/build/latest/total.svg?style=flat-square)](https://github.com/esensi/build/releases)
[![Latest Stable Version](https://img.shields.io/github/release/esensi/build.svg?style=flat-square)](https://github.com/esensi/build/releases)
[![License](https://img.shields.io/badge/license-mit-blue.svg?style=flat-square)](https://github.com/esensi/build#licensing)

An [Esensi](https://github.com/esensi) package, coded by [Emerson Media](http://www.emersonmedia.com).

> **Want to work with us on great Laravel applications?**
Email us at [careers@emersonmedia.com](http://emersonmedia.com/contact)

The `Esensi/Build` package is just one package that makes up [Esensi](https://github.com/esensi), a platform built on [Laravel](http://laravel.com). This package uses GulpJS tasks to pre-process CSS, JS, fonts and image assets into optimized builds that Laravel projects need. The tasks will convert LESS into minified and concatenated CSS files, will bundle with Browserify the JS assets into minified and concatenated JS files, and will optimize builds of fonts and images for production-ready use. There are also tasks for working with Jekyll and deploying builds to remote servers. For more details on the inner workings of the tasks please consult the generously documented source code.

> **Have a project in mind?**
Email us at [sales@emersonmedia.com](http://emersonmedia.com/contact), or call 1.877.439.6665.

## Quick Start

Getting started with Esensi/Build is simple. Make sure your project has a `package.json`. If it does not, you can use `npm init` to help you make one. Then follow these steps:

1. Add `gulp` to your project's `package.json`: `npm install --save-dev gulp`
2. Add `esensi/build` to your `package.json`: `npm install --save-dev git+https://github.com/esensi/build.git`
3. Add `browserify-shim` to your `package.json`: `npm install --save-dev browserify-shim`
4. Copy `gulpfile.js` and `build.json` to your project root.
5. Customize `build.json` to fit your source and destination directory requirements.

## Requirements

This package uses NodeJS and relies upon Gulp to be available and running the latest versions. The latest versions are some times not available from the installer repositories: consult with NodeJS official documentation on how to install the latest versions on your system. This package has been tested against the following `npm version` output:

```js
{
  npm: '2.9.0',
  http_parser: '2.3',
  modules: '14',
  node: '0.12.2',
  openssl: '1.0.1m',
  uv: '1.4.2-node1',
  v8: '3.28.73',
  zlib: '1.2.8'
}
```

## Available Tasks

> **Pro Tip:** To run any task with "production" mode optimizations, use the `--production` flag when executing the command.

### Watch Tasks

- `gulp watch` - This watches all source directories for changes, and re-runs the appropriate build steps when changes to the source occur. Example: if a LESS file in the styles source directory changes, `build:styles` will be ran.

### Build Tasks

- `gulp build` - Runs all build subtasks listed below.
- `gulp build:fonts` - Copies all files from the font source to the destination directory.
- `gulp build:images` - Copies all files from the image source to the destination directory.
    - With `--production` switch, the images are compressed.
- `gulp build:scripts` - Bundles source JS with Browserify and source maps and produces a revision manifest.
    - With `--production` switch, the bundled output is stripped of source maps and minified.
- `gulp build:styles` - Pre-processes source LESS into CSS with source maps, browser prefixes, and produces a revision manifest.
    - With `--production` switch, the output is stripped of source maps and then minified.
- `gulp build:clean` - Alias of `gulp clean` task.
- `gulp build:watch` - Alias of `gulp watch` task.
- `gulp build:lint` - Alias of `gulp lint` task.
- `gulp build:jekyll` - Alias of `gulp jekyll` task.

### Jekyll Tasks
- `gulp jekyll` - Runs all Jekyll subtasks listed below.
- `gulp jekyll:build` - Builds Jekyll templates by running `jekyll build`.
    - Uses `--lsi` switch for better related blog posts.

### Clean Tasks

- `gulp clean` - Runs all clean subtasks listed below.
- `gulp clean:fonts` - Empties the fonts destination.
- `gulp clean:images` - Empties the images destination.
- `gulp clean:scripts` - Empties the scripts destination. This task auto-runs before `build:scripts`.
- `gulp clean:styles` - Empties the styles destination. This task auto-runs before `build:styles`.

### Quality Assurance Tasks

- `gulp lint` - Runs all lint subtasks listed below.
- `gulp lint:scripts` - Runs `jshint` on source scripts.

### Deployment Tasks

- `gulp deploy` - Runs all deploy subtasks listed below.
- `gulp deploy:<environment>` - Uses `rsync` to deploy source files to the destination environment. The environments are defined in the `build.json` file.
    - Example: `gulp deploy:production` would deploy to SSH connection defined by the `deployment.connections.production` key in `build.json`.

## How This Package Works

This package is an `npm` module. It is structured like this to reduce duplication between projects, and make it easier to standardize the build process. This package breaks each task out into its own NPM module, as seen in the `src/tasks` directory. Any file in the `src/tasks` directory gets automatically required by the loop in `index.js`.

Traditional Gulp workflows just pack all the tasks into one Gulpfile. This package however is designed to be consumed modularly as a dependency of a project and so it should be required like any other NPM module within a project's Gulpfile. All of the tasks and build commands are then imported with the require statement. Developers can then have a clean Gulpfile which they can use to create project-specific tasks and can easily run `npm update` to get the latest `esensi/build` tasks and improvements.

Because the project Gulpfile is largely empty and uncluttered, it makes for a clean place to require project-specific Gulp tasks. Add a new task to a project by writing it directly in the project's Gulpfile or follow the pattern of this package and `require('./path/to/task.js')`.

Add new tasks direclty to this `esensi/build` package by creating a new task file in the `src/tasks` directory of your pull request branch. Use an existing task as your pattern for development.

## Troubleshooting

- The `gulp watch` task does NOT detect new files: manually restart the task when creating new source files. This limitation is a bug in a third party library that will hopefully be fixed soon.
- This package cannot require `gulp` itself otherwise the following error will be thrown: `Task 'default' is not in your gulpfile`. This can result in tasks not showing up. Instead make sure the parent project is the one that defines the Gulp dependency.

## Contributing

[Emerson Media](http://www.emersonmedia.com) is proud to work with some of the most talented developers in the web development community. The developer team welcomes requests, suggestions, issues, and of course pull requests. When submitting issues please be as detailed as possible and provide code examples where possible. When submitting pull requests please follow the same code formatting and style guides that the Esensi code base uses. Please help the open-source community by including good code test coverage with your pull requests. **All pull requests _must_ be submitted to the version branch to which the code changes apply.**

> **Note:** The Esensi team does its best to address all issues on Wednesdays. Pull requests are reviewed in priority followed by urgent bug fixes. Each week the package dependencies are re-evaluated and updates are made for new tag releases.

## Licensing

Copyright (c) 2014 [Emerson Media, LP](http://www.emersonmedia.com)

This package is released under the MIT license. Please see the [LICENSE.txt](https://github.com/esensi/model/blob/master/LICENSE.txt) file distributed with every copy of the code for commercial licensing terms.
