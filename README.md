[MIT Libraries](http://libraries.mit.edu) Wordpress Theme
========

[![Build Status](https://travis-ci.org/MITLibraries/MITlibraries-parent.svg?branch=master)](https://travis-ci.org/MITLibraries/MITlibraries-parent)
[![Code Climate](https://codeclimate.com/github/MITLibraries/MITlibraries-parent/badges/gpa.svg)](https://codeclimate.com/github/MITLibraries/MITlibraries-parent)

This is the main Wordpress theme for the MIT Libraries.

__Note:__ Primary CSS and JS (including `css/build/minified/global.css`, `js/build/hours.min.js` and `js/build/production.min.js`, as registered in `functions.php`) are not checked in. These build files are complied and/or concatenated and/or minified automatically (using [Grunt](http://gruntjs.com/), for example).

## A note for developers and contributors:

Pull requests are evaluated by Travis-CI for syntax errors and security flaws using relevant sections of the WordPress Coding Standards. They are also evaluated by CodeClimate using static code analysis and linting provided by PHPCS and PHPMD. We expect that contributors are running those tools locally, or otherwise ensuring that pull requests conform to those standards. We have included the `codesniffer.local.xml` configuration for local use, which is typically invoked by the following command:

```
phpcs -psvn . --standard=./codesniffer.local.xml --extensions=php --report=source --report=full
```
