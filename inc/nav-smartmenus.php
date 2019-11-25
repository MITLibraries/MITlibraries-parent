<?php
/**
 * Template for top navigation, implemented using SmartMenus (https://www.smartmenus.org/)
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

?>
<div class="menu--toggle"><!-- Mobile Hamburger icon -->
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18.909px" height="13.091px" viewBox="2.182 6.545 18.909 13.091" enable-background="new 2.182 6.545 18.909 13.091" xml:space="preserve"><path d="M2.909,6.545h17.454c0.197,0,0.367,0.072,0.512,0.216c0.145,0.144,0.216,0.314,0.216,0.511s-0.071,0.367-0.216,0.511
	c-0.145,0.144-0.314,0.216-0.512,0.216H2.909c-0.197,0-0.367-0.072-0.511-0.216C2.254,7.639,2.182,7.469,2.182,7.272
	s0.072-0.367,0.216-0.511C2.542,6.617,2.712,6.545,2.909,6.545z M20.363,13.818H2.909c-0.197,0-0.367-0.072-0.511-0.216
	s-0.216-0.314-0.216-0.511c0-0.196,0.072-0.367,0.216-0.511s0.314-0.216,0.511-0.216h17.454c0.197,0,0.367,0.072,0.512,0.216
	s0.216,0.314,0.216,0.511c0,0.197-0.071,0.367-0.216,0.511S20.561,13.818,20.363,13.818z M20.363,19.636H2.909
	c-0.197,0-0.367-0.071-0.511-0.216s-0.216-0.314-0.216-0.511s0.072-0.367,0.216-0.511c0.144-0.145,0.314-0.217,0.511-0.217h17.454
	c0.197,0,0.367,0.072,0.512,0.217c0.145,0.144,0.216,0.314,0.216,0.511s-0.071,0.366-0.216,0.511S20.561,19.636,20.363,19.636z"/>
	</svg>
</div><!-- end hamburger icon -->

<!-- Start rebuilt navbar -->
<nav id="nav-main" class="nav-main" aria-label="Primary">
	<ul id="main-menu" class="sm sm-mitlib">

		<!-- Search group (2 column) -->
		<li><a href="#">Search</a>
			<ul class="mega-menu">
				<li>
					<div class="column-1-2">
						<h2>Start here</h2>
						<ul>
							<li><a href="#">Quicksearch</a></li>
							<li><a href="#">Vera</a></li>
							<li><a href="#">Barton catalog</a></li>
							<li><a href="#">WorldCat</a></li>
							<li><a href="#">Course reserves</a></li>
							<li><a href="#">More search tools & help</a></li>
						</ul>
					</div>
					<div class="column-1-2">
						<h2>Also try</h2>
						<ul>
							<li><a href="#">FullText Finder</a></li>
							<li><a href="#">Google Scholar for MIT</a></li>
							<li><a href="#">DSpace@MIT</a></li>
							<li><a href="#">Dome</a></li>
							<li><a href="#">Site search</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</li>

		<!-- Hours & locations group (2 column) -->
		<li><a href="#">Hours & locations</a>
			<ul class="mega-menu">
				<li>
					<div class="column-1-2">
						<h2>Locations</h2>
							<ul>
								<li><a href="#">Barker Library</a></li>
								<li><a href="#">Dewey Library</a></li>
								<li><a href="#">Hayden Library</a></li>
								<li><a href="#">Rotch Library</a></li>
								<li><a href="#">Distinctive Collections</a></li>
								<li><a href="#">Lewis Music Library</a></li>
								<li><a href="#">Library Storage Annex</a></li>
								<li><a href="#">All hours & location</a></li>
							</ul>
					</div>
					<div class="column-1-2">
						<h2>Using the libraries</h2>
							<ul>
								<li><a href="#">Map of locations</a></li>
								<li><a href="#">Study spaces</a></li>
								<li><a href="#">Persons with disabilities</a></li>
								<li><a href="#">Scan, copy, print</a></li>
								<li><a href="#">Exhibits & galleries</a></li>
								<li><a href="#">Non-MIT visitors</a></li>
								<li><a href="#">Library use policy</a></li>
							</ul>
					</div>
				</li>
			</ul>
		</li>

		<!-- Borrow & request group (2 column) -->
		<li><a href="/borrow">Borrow & request</a>
			<ul class="mega-menu">
				<li>
					<div class="column-1-2">
						<h2>Renew, request, suggest</h2>
						<ul>
							<li><a href="#">Your account</a></li>
							<li><a href="#">Barton catalog</a></li>
							<li><a href="#">WorldCat</a></li>
							<li><a href="#">ILLiad</a></li>
							<li><a href="#">Suggest a purchase</a></li>
							<li><a href="#">More options & help</a></li>
						</ul>
					</div>
					<div class="column-1-2">
						<h2>More information</h2>
						<ul>
							<li><a href="#">Get it</a></li>
							<li><a href="#">Circulation FAQ</a></li>
							<li><a href="#">Course reserves & TIP FAQ</a></li>
							<li><a href="#">Visit non-MIT libraries</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</li>

		<!-- Research support group (2 column) -->
		<li><a href="/research">Research support</a>
			<ul class="mega-menu push">
				<li>
					<div class="column-1-2">
						<h2>Help & useful tools</h2>
						<ul>
							<li><a href="#">Ask us</a></li>
							<li><a href="#">Research guides & expert librarians</a></li>
							<li><a href="#">Connect from on and off-campus</a></li>
							<li><a href="#">Productivity tools</a></li>
							<li><a href="#">New books by subject</a></li>
							<li><a href="#">More research support</a></li>
						</ul>
					</div>
					<div class="column-1-2">
						<h2>Publishing & content management</h2>
						<ul>
							<li><a href="#">Citation & writing tools</a></li>
							<li><a href="#">Citing sources</a></li>
							<li><a href="#">Manage your info & data</a></li>
							<li><a href="#">Getting published</a></li>
							<li><a href="#">Scholarly publishing</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</li>

		<!-- About group (2 column) -->
		<li><a href="/about">About</a>
			<ul class="mega-menu push">
				<li>
					<div class="column-1-2">
						<h2>About the Libraries</h2>
						<ul>
							<li><a href="#">About us</a></li>
							<li><a href="#">Contact us</a></li>
							<li><a href="#">Jobs</a></li>
							<li><a href="#">Giving to the MIT Libraries</a></li>
						</ul>
					</div>
					<div class="column-1-2">
						<h2>News, events, & exhibits</h2>
						<ul>
							<li><a href="#">Classes & events</a></li>
							<li><a href="#">News</a></li>
							<li><a href="#">Exhibits & galleries</a></li>
							<li><a href="#">In the media</a></li>
							<li><a href="#">MIT Reads</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</li>

		<!-- Ask us group (1 column) -->
		<li><a href="/ask">Ask us</a>
			<ul class="mega-menu push">
				<li>
					<div class="wrap-button-chat">
						<div id='libchat_be2c654b63dd43f31c56295ee5d78d88'></div>
					</div>
					<a class="more" href="#">More ways to ask us</a>
				</li>
			</ul>
		</li>

		<!-- Account group (no submenu) -->
		<li><a href="#">Account</a></li>

	</ul>
</nav>
<!-- End rebuilt navbar -->
