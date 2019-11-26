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
					<div class="column-1-2 border-right">
						<h2>Start here</h2>
						<ul>
							<li><a href="#">Quick search <span class="about">Books, articles, and more at MIT</span></a></li>
							<li><a href="#">Vera <span class="about">E-journals & databases</span></a></li>
							<li><a href="#">Barton catalog <span class="about">Classic catalog search</span></a></li>
							<li><a href="#">WorldCat <span class="about">Books & more worldwide</span></a></li>
							<li><a href="#">Course reserves</a></li>
							<li><a href="#" class="bottom extra">More search tools & help <span class="about">Images, data, DSpace, etc.</span></a></li>
						</ul>
					</div>
					<div class="column-1-2">
						<h2>Also try</h2>
						<ul>
							<li><a href="#">FullText Finder <span class="about">Find specific citations</span></a></li>
							<li><a href="#">Google Scholar for MIT <span class="about">Change settings to get better access</span></a></li>
							<li><a href="#">DSpace@MIT <span class="about">MIT research</span></a></li>
							<li><a href="#">Dome <span class="about">MIT-digitized images, maps, etc.</span></a></li>
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
					<div class="column-1-2 border-right">
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
					<div class="column-1-2 border-right">
						<h2>Renew, request, suggest</h2>
						<ul>
							<li><a href="#">Your account <span class="about">Renew MIT items</span></a></li>
							<li><a href="#">Barton catalog <span class="about">Request items owned by MIT</span></a></li>
							<li><a href="#">WorldCat <span class="about">Request items not owned by MIT</span></a></li>
							<li><a href="#">ILLiad <span class="about">Track your Interlibrary Borrowing requests</span></a></li>
							<li><a href="#">Suggest a purchase</a></li>
							<li><a href="#">More options & help</a></li>
						</ul>
					</div>
					<div class="column-1-2">
						<h2>More information</h2>
						<ul>
							<li><a href="#">Get it <span class="about">Understand your options</span></a></li>
							<li><a href="#">Circulation FAQ <span class="about">Info about fines, renewing, etc.</span></a></li>
							<li><a href="#">Course reserves & TIP FAQ</a></li>
							<li><a href="#">Visit non-MIT libraries <span class="about">Harvard, Borrow Direct, etc.</span></a></li>
						</ul>
					</div>
				</li>
			</ul>
		</li>

		<!-- Research support group (2 column) -->
		<li><a href="/research">Research support</a>
			<ul class="mega-menu push">
				<li>
					<div class="column-1-2 border-right">
						<h2>Help & useful tools</h2>
						<ul>
							<li><a href="#">Ask us <span class="about">Email, chat, call, drop by</span></a></li>
							<li><a href="#">Research guides & expert librarians <span class="about">For every research interest</span></a></li>
							<li><a href="#">Connect from on and off-campus <span class="about">Tips & tricks</span></a></li>
							<li><a href="#">Productivity tools <span class="about">Apps, RSS, etc.</span></a></li>
							<li><a href="#">New books by subject <span class="about">Browse or subscribe to RSS feeds</span></a></li>
							<li><a href="#">More research support</a></li>
						</ul>
					</div>
					<div class="column-1-2">
						<h2>Publishing & content management</h2>
						<ul>
							<li><a href="#">Citation & writing tools <span class="about">Mendeley, Zotero, & Overleaf</span></a></li>
							<li><a href="#">Citing sources <span class="about">Avoid plagiarism, format references, etc.</span></a></li>
							<li><a href="#">Manage your info & data <span class="about">Organize your data, files, and more</span></a></li>
							<li><a href="#">Getting published <span class="about">Tools & help</span></a></li>
							<li><a href="#">Scholarly publishing <span class="about">Open access & copyright</span></a></li>
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
					<div class="column-1-2 border-left">
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
		<li><a href="/ask"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16.593px" height="16px" viewBox="0 0 16.593 16" enable-background="new 0 0 16.593 16" xml:space="preserve"><path d="M16.593 6.278c0 1.074-0.074 2.148-0.241 3.185 -0.204 1.353-1.722 2.574-3.055 2.722 -1.353 0.131-2.686 0.204-4.02 0.223L5.74 15.833C5.63 15.944 5.481 16 5.334 16c-0.094 0-0.167-0.019-0.241-0.037C4.871 15.87 4.74 15.647 4.74 15.407V12.37c-0.481-0.036-0.963-0.055-1.443-0.111 -1.334-0.148-2.853-1.443-3.074-2.796C0.074 8.426 0 7.352 0 6.296c0-1.092 0.074-2.185 0.223-3.24 0.222-1.352 1.74-2.648 3.074-2.797C4.963 0.093 6.63 0 8.297 0s3.333 0.093 5 0.259c1.333 0.149 2.851 1.445 3.055 2.797C16.519 4.111 16.593 5.204 16.593 6.278"/></svg><span>Ask us</span></a>
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
		<li><a href="#"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="15.4" height="16" viewBox="0 0 15.4 16" enable-background="new 0 0 15.445 16" xml:space="preserve"><path d="M13.4 15.7C12.2 15.9 10.4 16 7.7 16c-5.4 0-7.3-0.6-7.3-0.6 -0.3-0.1-0.4-0.4-0.4-0.7 0.3-1.6 1.2-2.5 2.5-3.3 0.3-0.2 0.8-0.4 1.2-0.6 0.8-0.3 1.8-0.7 2-1.3C5.8 9.2 5.7 8.6 5.2 7.9c-1.4-2.3-1.7-4.3-0.8-5.9C5.1 0.7 6.4 0 7.7 0c1.4 0 2.6 0.7 3.3 2 0.9 1.6 0.7 3.6-0.8 5.9C9.8 8.6 9.6 9.2 9.8 9.6c0.2 0.6 1.2 1 2 1.3 0.4 0.2 0.9 0.4 1.2 0.6 1.2 0.8 2.1 1.6 2.5 3.3 0.1 0.3-0.1 0.6-0.4 0.7C15 15.4 14.5 15.6 13.4 15.7"/></svg><span>Account</span></a></li>

	</ul>
</nav>
<!-- End rebuilt navbar -->
