# Hours

## Current setup

We're currently handling hours two ways on libraries.mit.edu:

1. At [libraries.mit.edu/hours](http://libraries.mit.edu/hours), one can view a weekly display of each library location's hours, with a date picker, next week/last week navigation, etc.

	These hours entries exist in Wordpress. Broadly speaking, each hours entry exists as a single post in Wordpress. This is hugely inefficient, and has been a big problem for the site. The hours have to be uploaded as a crazy multi-sheet spreadsheet ([here](//wikis.mit.edu/confluence/display/UXWS/Hours)) via an [Excel-to-PHP](https://github.com/zgreen/MITlibraries-parent/tree/prod/libs/PHPExcel-develop) spreadsheet plugin, parsed with [a heavy PHP script](github.com/zgreen/MITlibraries-parent/blob/prod/lib/hours.php), and spat out onto the page. The only reason this page doesn't take many, many seconds to load is that all that data gets cached by Wordpress (using the W3 Total Cache plugin). These hours posts also heavily pollute the site, are indexed by search engines, confuse users, etc.

2. Each location's hours for today also appear on the homepage, and on individual location pages (like [libraries.mit.edu/barker](//libraries.mit.edu)). Beginning a few months back, we started using using a little jQuery to Ajax these values onto those pages from a [JSON file](//github.com/zgreen/MITlibraries-parent/blob/prod/hours.json) ([homepage script here](https://github.com/zgreen/MITlibraries-parent/blob/prod/js/hours-home.js#L18), and [location page script here](https://github.com/zgreen/MITlibraries-parent/blob/prod/js/core.js#L121)).

	We did this for two reasons:
	1. To speed up the load time on those pages, as the Wordpress queries were very heavy.
	2. To make sure that those hours values were never cached (there were some instances where the cache held onto a previous day's hours, displaying that value as the hours for the current day).

	This solution solved those problems, but unfortunately--because there's no good way to build out the proper data structure for handling these hours values in Wordpress--to date we have been hand editing the `hours.json` file with individual day-by-day entries.

## Next steps

Ideally, the hours values should exist solely as JSON values, and should not live in Wordpress at all.

[This branch](//github.com/zgreen/MITlibraries-parent/tree/hours-underscore) sets a new data structure for handling hours ([term-hours.json](//github.com/zgreen/MITlibraries-parent/blob/hours-underscore/term-hours.json)). Hours are __term based__, with start/end dates, and default Monday-Sunday open/closed values per location. Each location is also given a set of exceptions for handling special hours.

Visit [libraries-dev.mit.edu/term-hours](http://libraries-dev.mit.edu/term-hours/) to view this new structure in action.

Using jQuery and Underscore.js, [this script](https://github.com/zgreen/MITlibraries-parent/blob/hours-underscore/js/page-term-hours.js) Ajax-es today's hours for each location onto the `term-hours` page, checking first for exceptions and then defaulting to the hours for the current day. [Moment.js](http://momentjs.com/) is used for date handling, and the [Twix.js plugin](http://isaaccambron.com/twix.js/) is used to create date ranges.

This page represents a workable solution for displaying "Today's hours" for any given location.

From here, we'd like to template out a weekly view similar to our current one on [libraries.mit.edu/hours](http://libraries.mit.edu/hours). This should be possible using Underscore, though a jQuery plugin like [CLNDR.js](http://kylestetz.github.io/CLNDR/) is also a possibility.

Additionally, we'd like some sort of GUI/form that would allow people to add/update hours JSON values without having to acutally hand edit the JSON file itself. Backbone.js? PHP form? Drupal? Open to suggestions...

## To-dos

1. Implement new "Today's hours" script, as detailed above, for use on the MIT Libraries' homepage and individual location pages.
2. Create a weekly template view for all location hours. Ideally, this would include prev/next week and datepicker functionality.
3. Build out GUI/form to POST/EDIT/DELETE hours values.
