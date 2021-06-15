<?php
/**
 * Template for top navigation, showing Alma / Primo as discovery options.
 *
 * @package MIT_Libraries_Parent
 * @since 1.11.0
 */

?>

<!-- Menu shown on non-mobile screens -->
<nav class="nav-main hidden-mobile" aria-label="Primary">
	<ul class="nav-main-list flex-container">
		<li class="link-primary flex-end">
			<h2 class="main-nav-header">
				<a id="main-nav-searchmenu-title" href="#" class="no-underline search-link main-nav-link menu-control">Search</a>
			</h2>
			<div aria-labelledby="main-nav-searchmenu-title" id="main-nav-searchmenu" class="links-sub flex-container group">
			  <div class="col-1 flex-item">
					<h3 class="heading-col">Start here</h3>
					<ul class="list-unbulleted">
						<li><a href="/search">Search tools home</a></li>
						<li><a href="/search-collections">Search our collections <span class="about">Books, articles, and more</span></a></li>
						<li><a href="/worldcat">WorldCat<span class="about">Books &amp; more worldwide</span></a></li>
						<li><a href="/search-reserves">Course reserves</a></li>
					</ul>
			  </div>
			  <div class="col-2 flex-item">
					<h3 class="heading-col">Also try</h3>
					<ul class="list-unbulleted">
						<li><a href="/google-scholar-tips">Google Scholar for MIT <span class="about">Change settings to get better access</span></a></li>
						<li><a href="/dspace">DSpace@MIT <span class="about">MIT research</span></a></li>
						<li><a href="/dome">Dome <span class="about">MIT-digitized images, maps, etc.</span></a></li>
						<li><a href="/site-search">Site search</a></li>
					</ul>
			  </div>
			</div><!-- end div.links-sub -->
		</li><!-- end div.links-primary -->
		<li class="link-primary flex-end">
			<h2 class="main-nav-header">
				<a id="main-nav-hoursmenu-title" href="#" class="no-underline main-nav-link menu-control">Hours &amp; locations</a>
			</h2>
			<div aria-labelledby="main-nav-hoursmenu-title" id="main-nav-hoursmenu" class="links-sub flex-container group">
			  <div class="col-1 flex-item">
					<h3 class="heading-col">Locations</h3>
					<ul class="list-unbulleted">
						<li><a href="/hours">Hours and locations home</a></li>
						<li><a href="/barker">Barker Library</a></li>
						<li><a href="/dewey">Dewey Library</a></li>
						<li><a href="/hayden">Hayden Library</a></li>
						<li><a href="/rotch">Rotch Library</a></li>
						<li><a href="/distinctive-collections">Distinctive Collections</a></li>
						<li><a href="/music">Lewis Music Library</a></li>
						<li><a href="/lsa">Library Storage Annex</a></li>
					</ul>
			  </div>
			  <div class="col-2 flex-item">
					<h3 class="heading-col">Using the Libraries</h3>
					<ul class="list-unbulleted">
						<li><a href="/locations">Map of locations</a></li>
						<li><a href="/study">Study spaces</a></li>
						<li><a href="/disabilities">Persons with disabilities</a></li>
						<li><a href="/copying">Scan, copy, print</a></li>
						<li><a href="/exhibits">Exhibits &amp; galleries</a></li>
						<li><a href="/visitors">Non-MIT visitors</a></li>
						<li><a href="/use-policies">Library use policy</a></li>
					</ul>
			  </div>
			</div><!-- end div.links-sub -->
		</li><!-- end div.links-primary -->
		<li class="link-primary flex-end">
			<h2 class="main-nav-header">
				<a id="main-nav-borrowmenu-title" href="#" class="no-underline main-nav-link menu-control">Borrow &amp; request</a>
			</h2>
			<div aria-labelledby="main-nav-borrowmenu-title" id="main-nav-borrowmenu" class="links-sub flex-container group">
			  <div class="col-1 flex-item">
					<h3 class="heading-col">Renew, request, suggest</h3>
					<ul class="list-unbulleted">
						<li><a href="/borrow">Borrow &amp; request home</a></li>
						<li><a href="/accounts">Accounts overview <span class="about">Your Account, ILLiad, Aeon, etc.</span></a></li>
						<li><a href="/search-collections">Search our collections <span class="about">Request items owned by MIT</span></a></li>
						<li><a href="/worldcat">WorldCat <span class="about">Request items not owned by MIT</span></a></li>
						<li><a href="/illiad">ILLiad <span class="about">Track your Interlibrary Borrowing requests</span></a></li>
						<li><a href="/suggest-purchase">Suggest a purchase</a></li>
					</ul>
			  </div>
			  <div class="col-2 flex-item">
					<h3 class="heading-col">More information</h3>
					<ul class="list-unbulleted">
						<li><a href="/reserves">Course reserves &amp; TIP</a></li>
						<li><a href="/borrow-direct">Borrow Direct <span class="about">Request items from Harvard, Yale, etc.</span></a></li>
						<li><a href="/otherlibraries">Visit non-MIT libraries <span class="about">Harvard, Borrow Direct, etc.</span></a></li>
					</ul>
			  </div>
			</div>
		</li>
		<li class="link-primary flex-end">
			<h2 class="main-nav-header">
				<a id="main-nav-researchmenu-title"href="#" class="no-underline main-nav-link menu-control">Research support</a>
			</h2>
			<div aria-labelledby="main-nav-researchmenu-title" id="main-nav-researchmenu" class="links-sub flex-container push group">
			  <div class="col-1 flex-item">
					<h3 class="heading-col">Help &amp; useful tools</h3>
					<ul class="list-unbulleted">
						<li><a href="/research-support">Research support home</a></li>
						<li><a href="/ask">Ask us <span class="about">Email, chat, call, drop by</span></a></li>
						<li><a href="/experts">Research guides &amp; expert librarians <span class="about">For every research interest</span></a></li>
						<li><a href="/authenticate">Authenticate to online resources <span class="about">Tips &amp; tricks</span></a></li>
					</ul>
			  </div>
			  <div class="col-2 flex-item">
					<h3 class="heading-col">Publishing &amp; content management</h3>
					<ul class="list-unbulleted">
						<li><a href="/references">Citation &amp; writing tools <span class="about">Mendeley, Zotero, &amp; Overleaf</span></a></li>
						<li><a href="/citing">Citing sources <span class="about">Avoid plagiarism, format references, etc.</span></a></li>
						<li><a href="/data-services">Data services <span class="about">GIS, data management, statistical support</span></a></li>
						<li><a href="/scholarly">Scholarly publishing <span class="about">Open access &amp; copyright</span></a></li>
						<li><a href="/apis">APIs for scholarly resources</a></li>
					</ul>
			  </div>
			</div><!-- end div.links-sub -->
		</li><!-- end div.links-primary -->
		<li class="link-primary flex-end">
			<h2 class="main-nav-header">
				<a id="main-nav-aboutmenu-title" href="#" class="no-underline main-nav-link menu-control">About</a>
			</h2>
			<div aria-labelledby="main-nav-aboutmenu-title" id="main-nav-aboutmenu" class="links-sub flex-container push group">
			  <div class="col-1 flex-item">
					<h3 class="heading-col">About the Libraries</h3>
					<ul class="list-unbulleted">
						<li><a href="/about/">About us home</a></li>
						<li><a href="/contact">Contact us</a></li>
						<li><a href="/jobs">Jobs</a></li>
						<li><a href="/giving">Giving to the MIT Libraries</a></li>
					</ul>
			  </div>
			  <div class="col-2 flex-item">
					<h3 class="heading-col">News, events, &amp; exhibits</h3>
					<a href="/events">Classes &amp; events</a>
					<a href="/news">News</a>
					<a href="/exhibits">Exhibits &amp; galleries</a>
					<a href="/news/in-the-media">In the media</a>
					<a href="/mit-reads/">MIT Reads</a>
			  </div>
			</div><!-- end div.links-sub -->
		</li><!-- end div.links-primary -->
		<li class="link-primary flex-end small chat push">
			<h2 class="main-nav-header">
				<a id="main-nav-askusmenu-title" href="#" class="no-underline main-nav-link menu-control"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16.593px" height="16px" viewBox="0 0 16.593 16" enable-background="new 0 0 16.593 16" xml:space="preserve"><path d="M16.593 6.278c0 1.074-0.074 2.148-0.241 3.185 -0.204 1.353-1.722 2.574-3.055 2.722 -1.353 0.131-2.686 0.204-4.02 0.223L5.74 15.833C5.63 15.944 5.481 16 5.334 16c-0.094 0-0.167-0.019-0.241-0.037C4.871 15.87 4.74 15.647 4.74 15.407V12.37c-0.481-0.036-0.963-0.055-1.443-0.111 -1.334-0.148-2.853-1.443-3.074-2.796C0.074 8.426 0 7.352 0 6.296c0-1.092 0.074-2.185 0.223-3.24 0.222-1.352 1.74-2.648 3.074-2.797C4.963 0.093 6.63 0 8.297 0s3.333 0.093 5 0.259c1.333 0.149 2.851 1.445 3.055 2.797C16.519 4.111 16.593 5.204 16.593 6.278"/></svg><span>Ask Us</span></a>
			</h2>
			<div aria-labelledby="main-nav-askusmenu-title" id="main-nav-askusmenu" class="links-sub push">
			  <div class="wrap-button-chat">
				<div id='libchat_be2c654b63dd43f31c56295ee5d78d88'></div>
			  </div>
			  <a class="more" href="/ask">More ways to ask us</a>
			</div>
		</li>
		<li class="link-primary flex-end small">
			<h2 class="main-nav-header">
				<a href="/accounts" class="no-underline main-nav-link account-link">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="15.4" height="16" viewBox="0 0 15.4 16" enable-background="new 0 0 15.445 16" xml:space="preserve"><path d="M13.4 15.7C12.2 15.9 10.4 16 7.7 16c-5.4 0-7.3-0.6-7.3-0.6 -0.3-0.1-0.4-0.4-0.4-0.7 0.3-1.6 1.2-2.5 2.5-3.3 0.3-0.2 0.8-0.4 1.2-0.6 0.8-0.3 1.8-0.7 2-1.3C5.8 9.2 5.7 8.6 5.2 7.9c-1.4-2.3-1.7-4.3-0.8-5.9C5.1 0.7 6.4 0 7.7 0c1.4 0 2.6 0.7 3.3 2 0.9 1.6 0.7 3.6-0.8 5.9C9.8 8.6 9.6 9.2 9.8 9.6c0.2 0.6 1.2 1 2 1.3 0.4 0.2 0.9 0.4 1.2 0.6 1.2 0.8 2.1 1.6 2.5 3.3 0.1 0.3-0.1 0.6-0.4 0.7C15 15.4 14.5 15.6 13.4 15.7"/></svg><span>Account</span>
				</a>
			</h2>
		</li>
	</ul>
</nav>
