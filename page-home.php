<?php 
	get_header();
?>

	<div id="search-main" class="search--lib-resources flex-container">
		<h2>Search in</h2>
		<div class="wrap-select--resources">
			<div class="selected"></div>
			<ul id="resources" class="resource-list">
				<li class="bartonplus active" data-target="bartonplus" data-option="option-1"><span class="main">Articles, books &amp; more</span> <span class="name">BartonPlus</span></li>
				<li class="vera" data-target="vera" data-option="option-2"><span class="main">E-Journals &amp; databases</span> <span class="name">Vera</span></li>
				<li class="barton" data-target="barton" data-option="option-3"><span class="main">Books &amp; media at MIT</span> <span class="name">Barton Catalog</span></li>
				<li class="worldcat" data-target="worldcat" data-option="option-4"><span class="main">Books &amp; media worldwide</span> <span class="name">MIT's Worldcat</span></li>
				<li class="course-reserves" data-target="course-reserves" data-option="option-5"><span class="main">Course reserves</span></li>
				<li class="site-search" data-target="site-search" data-option="option-6"><span class="main">Libraries website</span></li>
			</ul>
		</div>
		<span class="label">for</span>
		<form id="bartonplus" class="input-submit flex-container">
			<input type="text" class="option-1 active" placeholder="ex: carbon nanotubes" autofocus="autofocus" tabindex="1">
			<input type="text" class="option-2" placeholder="ex: new eng j of med, AIP conf proc">
			<input type="text" class="option-3" placeholder="ex: carbon nanotubes, game design">
			<input type="text" class="option-4" placeholder="ex: carbon nanotubes, game design">
			<input type="text" class="option-5" placeholder="ex: 18.01, STS.320, 21F.108">
			<input type="text" class="option-6" placeholder="ex: hours, study spaces">
			<button type="submit">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="16" viewBox="0 0 12 12" alt="search" class="icon-search">
					<path d="M7.273 0.727q1.187 0 2.19 0.585t1.588 1.588 0.585 2.19-0.585 2.19-1.588 1.588-2.19 0.585q-1.278 0-2.33-0.676l-3.284 3.301q-0.295 0.284-0.688 0.284-0.403 0-0.688-0.284t-0.284-0.688 0.284-0.688l3.301-3.284q-0.676-1.051-0.676-2.33 0-1.188 0.585-2.19t1.588-1.588 2.19-0.585zM7.273 8q0.591 0 1.128-0.23t0.929-0.622 0.622-0.929 0.23-1.128-0.23-1.128-0.622-0.929-0.929-0.622-1.128-0.23-1.128 0.23-0.929 0.622-0.622 0.929-0.23 1.128 0.23 1.128 0.622 0.929 0.929 0.622 1.128 0.23z" fill="#000000"></path>
				</svg>
			</button>
		</form>
		<span class="label">by</span>
		<div class="wrap-select--keywords active">
			<select name="" id="" class="keywords option-1 search-by active" tabindex="3">
				<option value="keyword">Keyword</option>
				<option value="title">Title</option>
				<option value="author">Author</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords search-by option-2" tabindex="3">
				<option value="partial-words">Partial Words In Title</option>
				<option value="title-start">Title Starts With</option>
				<option value="title-exact">Exact Title</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords search-by option-3" tabindex="3">
				<option value="keyword">Keyword</option>
				<option value="title-start">Title starts with</option>
				<option value="author">Author (last name first)</option>
				<option value="call-number">Call number starts with</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords search-by option-4" tabindex="3">
				<option value="keyword">Keyword</option>
				<option value="author">Author</option>
				<option value="title">Title</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords search-by option-5" tabindex="3">
				<option value="course-number">Course number starts with</option>
				<option value="instructor">Instructor keyword</option>
				<option value="course-name">Course name keyword</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords search-by option-6" tabindex="3" disabled>
				<option value="keyword">Keyword</option>
			</select>
		</div>
		<a href="" class="search-advanced bartonplus active">BartonPlus advanced search</a>
		<a href="" class="search-advanced barton">Barton advanced search</a>
		<a href="" class="search-advanced worldcat">WorldCat advanced search</a>
		<a href="" class="search-advanced course-reserves">Course Reserves advanced search</a>
	</div><!-- end div.search-main -->
	<div class="content-main flex-container">
		<div class="col-1 flex-item">
			<div class="hours-locations">
				<h2>Hours &amp; Locations</h2>
				<a href="/barker" class="location"><h3>Barker Library</h3><div class="hours"></div> <span class="special">24/7 Study</span></a>
				<a href="/dewey" class="location"><h3>Dewey Library</h3><div class="hours"></div> <span class="special">24/7 Study</span></a>
				<a href="/hayden" class="location"><h3>Hayden Library</h3><div class="hours"></div> <span class="special">24/7 Study</span></a>
				<a href="#0" class="show-more hidden-non-mobile"><svg class="icon-arrow-down" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="16.3" height="9.4" viewBox="2.7 8.3 16.3 9.4" enable-background="new 2.7 8.3 16.3 9.4" xml:space="preserve"><path d="M18.982 9.538l-8.159 8.159L2.665 9.538l1.284-1.283 6.875 6.875 6.875-6.875L18.982 9.538z"/></svg>Show 3 More</a>
				<a href="/archives" class="location hidden-mobile inactive-mobile"><h3>Institute Archives &amp; Special Collections</h3><div class="hours"></div></a>
				<a href="/lewis" class="location hidden-mobile inactive-mobile"><h3>Lewis Music Library</h3><div class="hours"></div></a>
				<a href="/rotch" class="location hidden-mobile inactive-mobile"><h3>Rotch Library</h3><div class="hours"></div></a>
				<a href="/hours" class="button-primary">All Hours &amp; Locations</a>
				<div class="extra">
					<a href="/map" class="link-map">View Map</a>
					<a href="/study" class="link-study">Find a Study Space</a>
					<p>Quiet, group, and 24/7 study spaces available</p>
				</div>
			</div>
		</div>
		<div class="col-2 flex-item">
			<div class="news-events">
				<h2>News &amp; Events</h2>
				<div class="flex-container">
					<div class="item-1 flex-container">
						<div class="spinner">
						  <div class="rect1"></div>
						  <div class="rect2"></div>
						  <div class="rect3"></div>
						  <div class="rect4"></div>
						  <div class="rect5"></div>
						</div>
						<div class="excerpt-news">
							<h3></h3>
						</div>
						<div class="image"></div>
					</div>
					<div class="item-2 flex-container">
						<div class="spinner">
						  <div class="rect1"></div>
						  <div class="rect2"></div>
						  <div class="rect3"></div>
						  <div class="rect4"></div>
						  <div class="rect5"></div>
						</div>
						<div class="excerpt-news">
							<h3></h3>
						</div>
						<div class="image"></div>
					</div>
				</div>
				<a href="/news" class="button-primary">All News &amp; Events</a>
			</div>
			<div class="guides-experts">
				<h2>Research Guides &amp; Experts</h2>
				<p class="caption">Specialized guides for every research interest.</p>
				<p class="caption">Not sure where to start? <a href="/ask" class="link-ask">Ask Us</a></p>
				<a href="" class="button-secondary">Astronomy</a>
				<a href="" class="button-secondary">Music</a>
				<a href="" class="button-secondary">Real Estate</a>
				<a href="" class="button-secondary">Environmental Engineering</a>
				<a href="" class="button-secondary">Medicine</a>
				<a href="" class="button-secondary">Physics</a>
				<a href="" class="button-secondary">Women and Gender Studies</a>
				<a href="" class="button-primary all-guides">All 125 Guides</a>
				<div class="experts-group flex-container">
					<div class="expert">
					</div>
					<div class="expert">
					</div>
					<div class="expert hidden-mobile">
					</div>
					<div class="expert hidden-mobile">
					</div>
				</div>
				<a href="" class="button-primary view-experts">All <span class="count"></span> Experts</a>
			</div><!-- end div.guides-experts -->
		</div>
	</div>

<?php 
	get_footer();
?>
