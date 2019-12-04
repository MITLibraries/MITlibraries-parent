<?php
/**
 * Template for top mobile hamburger navigation
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

?>
<nav>
	<button class="menu--toggle"><!-- Mobile Hamburger icon -->
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18.909px" height="13.091px" viewBox="2.182 6.545 18.909 13.091" enable-background="new 2.182 6.545 18.909 13.091" xml:space="preserve"><path d="M2.909,6.545h17.454c0.197,0,0.367,0.072,0.512,0.216c0.145,0.144,0.216,0.314,0.216,0.511s-0.071,0.367-0.216,0.511
		c-0.145,0.144-0.314,0.216-0.512,0.216H2.909c-0.197,0-0.367-0.072-0.511-0.216C2.254,7.639,2.182,7.469,2.182,7.272
		s0.072-0.367,0.216-0.511C2.542,6.617,2.712,6.545,2.909,6.545z M20.363,13.818H2.909c-0.197,0-0.367-0.072-0.511-0.216
		s-0.216-0.314-0.216-0.511c0-0.196,0.072-0.367,0.216-0.511s0.314-0.216,0.511-0.216h17.454c0.197,0,0.367,0.072,0.512,0.216
		s0.216,0.314,0.216,0.511c0,0.197-0.071,0.367-0.216,0.511S20.561,13.818,20.363,13.818z M20.363,19.636H2.909
		c-0.197,0-0.367-0.071-0.511-0.216s-0.216-0.314-0.216-0.511s0.072-0.367,0.216-0.511c0.144-0.145,0.314-0.217,0.511-0.217h17.454
		c0.197,0,0.367,0.072,0.512,0.217c0.145,0.144,0.216,0.314,0.216,0.511s-0.071,0.366-0.216,0.511S20.561,19.636,20.363,19.636z"/>
		</svg>
	</button><!-- end hamburger icon -->
</nav>

<!-- Menu shown on mobile screens, when the hamburger icon is tapped. -->
<nav id="nav-mobile" class="nav-main hidden-non-mobile" aria-hidden="true">
	<ul>
		<li><a href="/search" class="no-underline mobile-nav-link hide-mobile-nav-link">Search</a></li>
		<li><a href="/hours" class="no-underline mobile-nav-link hide-mobile-nav-link">Hours & locations</a></li>
		<li><a href="/borrow" class="no-underline mobile-nav-link hide-mobile-nav-link">Borrow & request</a></li>
		<li><a href="/research-support" class="no-underline mobile-nav-link hide-mobile-nav-link">Research support</a></li>
		<li><a href="/about" class="no-underline mobile-nav-link hide-mobile-nav-link">About</a></li>
	</ul>
</nav>
