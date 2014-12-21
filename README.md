esensi/build
============

This is the Esensi gulp-based build process. It's useful for Esensi projects and non-Esensi projects alike!

## Requirements

- Node.js
     - Confirmed working with: `v0.10.33`

## Adding esensi/build to Your Project

1. _Make sure your project has a `package.json`._ If it doesn't, you can use `npm init` to help you make one.
2. _Add `gulp` to your project's `package.json`._ Try `npm install --save gulp@v3.8.10`.
3. _Add `esensi/build` to your `package.json`._ Try `npm install --save git+https://github.com/esensi/build.git@v0.4.0`.
4. _Add a Gulpfile.js to your project._ There's a sample Gulpfile.js called `Gulpfile-sample.js` included that you can use to get started.
5. _Provide a configuration file._ By default, the sample Gulpfile looks for the config file in `./app/assets/build.json`, this is the default location for Esensi projects. If you need to change this, adjust your Gulpfile accordingly. We've included `build-sample.json` if you need to add a new config file for your project.

## Available Tasks

The following tasks are run from the command line, like `gulp build:fonts`. 

To run any task in "production" mode, use the `--production` flag when executing a command.

### Build Tasks

- `gulp`, `gulp:build` - Runs all build tasks.
- `gulp build:fonts` - Copies all files from the font source directories to the destination directory.
- `gulp build:images` - Copies all files from the image source directories to the destination directory. If `--production` is used, minifies images.
- `gulp build:scripts` - Bundles / builds JS with Browserify and produces a revision manifest. If `--production` is used, does not build source maps and does uglify JS.
- `gulp build:styles` - Compiles LESS, adds prefixes, and builds CSS and produces a revision manifest. If `--production` is used, does not build source maps and does compress CSS.

### Clean Tasks

- `gulp`, `gulp build:clean` - Runs all clean tasks.
- `gulp clean:fonts` - Empties the fonts destination folder. This does not get run automatically before `build:fonts`.
- `gulp clean:images` - Empties the images destination folder. This does not get run automatically before `build:images`.
- `gulp clean:scripts` - Empties the scripts destination folder. This _does_ get run automatically before `build:scripts`.
- `gulp clean:styles` - Empties the styles destination folder. This _does_ get run automatically before `build:styles`.

### Watch Tasks

- `gulp watch`, `gulp build:watch` - Enables "watch" mode. This watches all source directories for changes, and re-runs the respective build step when it sees any. (For example, if the image source directory changes, `build:images` will run.)
     - **Heads up!** The watch tasks _DO NOT_ detect new files! This is a bug in a third party library that will hopefully be fixed soon.

### Misc. Tasks

- `gulp build:lint`, `gulp lint:scripts` - Runs jshint on _all_ JavaScript files found in the project. (This works fine, but we suggest using a linter inside your IDE / editor instead.)
- `gulp browserSync` - Runs browserSync. This doesn't really work properly. Feel free to fix it.

## How This Package Works

esensi/build is an `npm` module. It is structured like this to reduce duplication between our projects, and make it easier to standardize our process. 

Traditional gulp workflows pack many various tasks into one Gulpfile. Esensi/build uses a very basic Gulpfile in your project root that points to this package. This package breaks each task out into its own file, as seen in the `tasks/` directory. Any file in that folder gets automatically required by the loop in `index.js`.

This project is based loosely on <https://github.com/greypants/gulp-starter>.

## Working with This Package

_To add a new task to this package_, simply add a new task file to `gulp/tasks`. Use the existing tasks as your pattern.

_To add a new task to your project and **not** to this package_, append it to your project's Gulpfile.js or follow the pattern of this package and `require('./path/to/your/new/task.js')`. 

npm >=2.0.0 supports sourcing packages from local paths! This makes testing this package easy -- just use `npm install --save file:path/to/this/directory`.

Seeing `Task 'default' is not in your gulpfile` errors / requiring esensi/build in your project but can't see the tasks? Make sure _this package_ (esensi/build) doesn't have `gulp` in its dependencies! Only the parent project should have `gulp` as a dependency.