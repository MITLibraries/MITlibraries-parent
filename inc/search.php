<?php
/**
 * Template for search bar
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

?>
<div id="search-main" class="search--lib-resources flex-container">
	<form id="site-search" method="get" action="https://mit-bento.herokuapp.com/search/bento" style="display: block;">
		<h2><label for="mitlib-searchtext">Search for</label></h2>
		<input type="text" class="option-7 bento" placeholder="ex: Janet Mock, exobiology, library hours" name="q" id="mitlib-searchtext"><button type="submit" style="display: inline;"><span class="visually-hidden">search</span><!-- per accessibility review/to be clipped via CSS -->
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="16" viewBox="0 0 12 12" aria-hidden="true" class="icon-search">
				<path d="M7.273 0.727q1.187 0 2.19 0.585t1.588 1.588 0.585 2.19-0.585 2.19-1.588 1.588-2.19 0.585q-1.278 0-2.33-0.676l-3.284 3.301q-0.295 0.284-0.688 0.284-0.403 0-0.688-0.284t-0.284-0.688 0.284-0.688l3.301-3.284q-0.676-1.051-0.676-2.33 0-1.188 0.585-2.19t1.588-1.588 2.19-0.585zM7.273 8q0.591 0 1.128-0.23t0.929-0.622 0.622-0.929 0.23-1.128-0.23-1.128-0.622-0.929-0.929-0.622-1.128-0.23-1.128 0.23-0.929 0.622-0.622 0.929-0.23 1.128 0.23 1.128 0.622 0.929 0.929 0.622 1.128 0.23z"></path>
			</svg>
		</button>
	</form>
	<a href="/search" class="search-advanced">More search tools &amp; help</a>
</div><!-- end div.search-main -->
