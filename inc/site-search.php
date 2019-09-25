<?php
/**
 * This is the template for the site search form that points to the Google
 * Custom Search Engine.
 *
 * @package MIT_Libraries_Parent
 * @since 1.8.0
 */

?>
<div class="entry-content">

	<form action="https://www.google.com/cse" id="cse-search-box">
		<h2><label for="q">Search the Libraries' web site:</label></h2>
		<div>
			<input type="hidden" name="cx" value="012139403769412284441:qmnizspyywg">
			<input type="hidden" name="ie" value="UTF-8">
			<input type="text" id="q" name="q" size="80" style="width: 300px;">
			<input type="submit" name="sa" value="Search">
		</div>
	</form>

	<h2>Browse our <a href="/site-search">A-Z index of pages</a> on this site.</h2>

	<p>You can also check out these commonly-used resources:</p>

	<ul>
		<li><a href="//libraries.mit.edu/quicksearch">Quick search: Books, articles, &amp; more at MIT</a></li>
		<li><a href="//libguides.mit.edu/directory">Staff directory</a></li>
		<li><a href="/research-guides">Research guides - databases by subject</a></li>
		<li><a href="/about/shortcuts/">Shortcuts to frequently used pages</a></li>
		<li><a href="//web.mit.edu/search.html">MIT web site search</a></li>
	</ul>

	<p><a href="/ask">Need more help? Ask us!</a></p>

</div><!-- .entry-content -->
