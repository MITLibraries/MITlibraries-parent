<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<title>	MIT Libraries, MIT Library</title>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="description" content="Gateway to the MIT Libraries' wide range of services and resources including research help, study spaces, print and electronic books/journals and more." />
		<meta name="keywords" lang="en-us" content="library, barton, vera, dspace, librarian" />
		<meta http-equiv="pragma" content="no-cache" />
		<link rel="icon" href="favicon.ico" type="image/x-icon" />
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<link rel="stylesheet" type="text/css" href="styles/styles1.css" media="all" />
		<!--[if lt IE 8]>
			<link href="styles/ie1.css" media="screen" rel="stylesheet" type="text/css" />
		<![endif]-->
		<!--[if IE 6]>
			<link href="styles/ie6.css" media="screen" rel="stylesheet" type="text/css" />
		<![endif]-->
		<!--[if IE 7]>
			<link href="styles/ie71.css" media="screen" rel="stylesheet" type="text/css" />
		<![endif]-->
		<link rel="stylesheet" type="text/css" href="styles/print.css" media="print" />
		<script type="text/javascript" src="scripts/jquery.js"></script>
		<script type="text/javascript" src="scripts/jquery-ui.js"></script>
		<script type="text/javascript" src="scripts/jquery.cookie.js"></script>
		<!--[if IE]>
			<script type="text/javascript" src="scripts/iescriptfixes.js"></script>
		<![endif]-->
		<script type="text/javascript" src="scripts/swfobject.js"></script>
		<script type="text/javascript" src="scripts/jquery.infieldlabel.js"></script>
		<!-- 
			ga_discovery.js allows for event tracking within the discovery environment.
			Updated 7/23/13 - MB
		 -->
		<script type="text/javascript" src="scripts/ga_discovery.js?130723b"></script>
		<!-- 
			discovery_router.js connects each tab's search form with its resource.
			Updated 6/13/13 - MB
		 -->
		<script type="text/javascript" src="scripts/discovery-router.js?130710b"></script>
		<script type="text/javascript" src="/wp-content/themes/libraries/js/nullAlt.js"></script>
		<!--The meta tag below is to allow Google Webmaster tools to know we own this site - DD 20120329-->
		<meta name="google-site-verification" content="82Cv3HFWvcefC_9XauvglcfB4h3o0uuiC3nKWWkL_eE" />
		<!--
			Google Analytics being called in asynchronous mode in order to accommodate 
			event tracking. 
			Implemented 12/14/2012 - MB
		-->
		<script type="text/javascript" src="/scripts/googleanalytics-async.js"></script>
	</head>
<body class="nojs">
<!-- Beta site indicator...use if we need an urgent home page message
<div id="betastripe">
	<strong>Message</strong> <a href="/homepage-feedback">include link as needed</a>
</div> -->

<div id="container" class="home floatwrapper">
	
	<!-- Masthead area -->
	<div id="masthead">
		<!-- Skip nav link -->
		<a href="#searchcontainer" id="skipnav">Skip navigation</a>
		
		<!-- Logo -->
		<h1 class="siteName"><a href="/">MIT Libraries</a></h1> 
 		<img src="/images/logo_printonly.gif" width="172" height="72" alt="" class="printonly" />

		<!-- Main nav -->
		<ul id="mainnav" class="floatwrapper">
			<li><a href="/barton-account">YOUR ACCOUNT</a></li>
			<li><a href="/hours">HOURS</a></li>
			<li><a href="/locations">LIST OF LIBRARIES</a></li>
			<li><a href="/about/site-search">SITE SEARCH</a></li>
		</ul>
		
		<!-- Ask us / Tell us navigation area -->
		<div id="suggestionnav" class="floatwrapper">
			<a href="/ask" id="askus">ASK US!</a>
			<a href="/suggestions" id="tellus">TELL US!</a>
		</div>
	</div>
	
	<!-- Search boxes and photo -->
	<div id="searchcontainer" class="floatwrapper">
		<!-- Search box with tabs -->
		<div id="mitlibrarysearches" class="floatwrapper">
			<!-- Tab titles -->
			<ul id="mitlibrarysearchnav">
				<li><a href="#tab_start" title="Search for articles, books, and more">Start your search</a></li>
				<li><a href="#tab_ejournals" title="Search for e-journals and databases by title">E-journals &amp; databases</a></li>
				<li><a href="#tab_books" title="Search books and media">Books &amp; media</a></li>
				<li><a href="#tab_coursereserves" title="Search the Barton Catalog for your course reserves">Course reserves</a></li>
				<li><a href="#tab_more" title="Search for specialized content">More search options</a></li>
			</ul>
			
			<!-- This div only shows if user does not have Javascript enabled, replaces tabs -->
			<div id="nojstabnavreplacement" class="nojs">&nbsp;</div>
			
			<div class="mitlibrarysearchwrapper">
				<div class="mitlibraryshadowwrapper">
					<div class="searchshadowmid floatwrapper">
						
						<!-- 1: Start your search tab -->
						<div id="tab_start" class="mitlibrarysearchtabcontent floatwrapper">
							<div class="mitlibrarysearchform">
								<h2 style="margin-bottom: 2px;">Start your search with BartonPlus</h2>
								<h3>MIT catalog, articles, &amp; e-resources</h3>
								<form id="bartonplus" name="bartonplus" action="" class="searchform bartonplus" method="get" target="_top">

									<div class="hiddenfields"></div>

									<!-- search text field -->
									<div class="searchfield floatwrapper">
										<label for="bartonrequest">Ex: carbon nanotubes, oliver twist, shakespeare</label>
										<input type="text" id="bartonrequest" name="uquery" class="searchtext" title="Enter title, author, etc. (ex: game design)" />
										<button type="submit">Search</button>
									</div>

									<!-- radio buttons -->
									<div class="columns one-column floatwrapper">
										<div class="column">
											<div class="floatwrapper">
												<input type="checkbox" name="articles" id="articles" value="articles" rel="Limit to articles &amp; e-resources only" /><label for="articles">Limit to articles &amp; e-resources only</label>
											</div>
											<div class="columns two-column bartonoptions floatwrapper radiorow">
												<div class="column">
													<div class="radiorow floatwrapper">
														<input type="radio" name="r1" id="multi-keyword" value="" checked="checked" class="radio" rel="Enter title, author, etc. (ex: game design)" /><label for="multi-keyword">Keyword</label>
													</div>
													<div class="radiorow floatwrapper">
														<input type="radio" name="r1" id="multi-title" value="TI " class="radio" rel="Enter title, author, etc. (ex: game design)" /><label for="multi-title">Title</label>
													</div>
													<div class="radiorow floatwrapper">
														<input type="radio" name="r1" id="multi-author" value="AU " class="radio" rel="Enter title, author, etc. (ex: game design)" /><label for="multi-author">Author</label>
													</div>
												</div>
											</div>
										</div>
									</div>	

								</form>
							</div>
							<!-- sidebar -->
							<div class="mitlibrarysearchoptions">
								Looking for the classic <a href="/barton">Barton catalog</a>?<br>
								<br>
								Looking for non-MIT items?<br><a href="http://mit.worldcat.org/">MIT's WorldCat</a><br>
								<br>
								<h3 class="needHelp">Need help?</h3>
								<ul>
									<li><a href="/research-guides">Research guides</a></li>
									<li><a href="/experts">Subject experts</a></li>
								</ul>
							</div>
							<div class="whatami"><a class="panel" href="#">What am I searching?</a>
								<span>        
									<table>
										<tr>
											<th scope="row"><a href="/bartonplus">BartonPlus</a></th>
											<td>Searches the Barton Catalog, as well as most MIT-licensed e-resources, including e-books and full-text articles. Extensive, but does not index ALL materials available to the MIT community. <a href="http://libguides.mit.edu/about-bartonplus">More about BartonPlus</a></td>
										</tr>
									</table>
								</span>
							</div>
						</div>

						<!-- 2: E-journals and databases tab -->
						<div id="tab_ejournals" class="mitlibrarysearchtabcontent floatwrapper">
							<div class="mitlibrarysearchform">
								<h2>E-journals &amp; databases by title</h2>
								<form name="az_user_form" method="get" accept-charset="UTF-8" action="http://owens.mit.edu/sfx_local/az/mit_all" class="searchform" id="verasearch">
									<input type="hidden" name="param_perform_save" value="searchTitle" />
									<input type="hidden" name="param_chinese_checkbox_save" value="0" />
									<input type="hidden" name="param_type_save" value="textSearch" />
									<input type="hidden" name="param_type_value" value="textSearch" />
									<input type="hidden" name="param_jumpToPage_value" value="" />
									<input type="hidden" name="param_services2filter_save" value="getAbstract" />
									<input type="hidden" name="param_services2filter_save" value="getFullTxt" />

									<!-- search text field -->
									<div class="searchfield floatwrapper">
										<label for="param_pattern_value">Ex: new eng j of med, AIP conf proc</label>
										<input type="text" name="param_pattern_value" value="" id="param_pattern_value" class="searchtext" title="Enter words or parts of words in title (ex: new england journal med)" />
										<button type="submit">SEARCH</button>
									</div>

									<!-- radio buttons -->
									<div class="columns one-column floatwrapper">
										<div class="column">
											<div class="radiorow floatwrapper">
												<input type="radio" name="param_textSearchType_value" id="contains" value="contains" checked="checked" class="radio" rel="Enter words or parts of words in title (ex: new england journal med)" /><label for="contains">Partial words in title</label>
											</div>
											<div class="radiorow floatwrapper">
												<input type="radio" name="param_textSearchType_value" id="startsWith" value="startsWith" class="radio" rel="Enter first words in title (ex. journal of urban)" /><label for="startsWith">Title starts with</label>
											</div>
											<div class="radiorow floatwrapper">
												<input type="radio" name="param_textSearchType_value" id="exactMatch" value="exactMatch" class="radio" rel="Enter complete title (ex. science)" /><label for="exactMatch">Exact title</label>
											</div>
										</div>
									</div>

								</form>
							</div>
							<!-- sidebar -->
							<div class="mitlibrarysearchoptions">
								See also:
								<ul>
									<li><a href="/barton">Barton Catalog</a></li>
									<li><a href="/ejournals">Vera A-Z lists</a></li>
								</ul>
								Popular:
								<ul>
									<li><a href="/get/factiva">Factiva</a></li>
									<li><a href="/get/ieee">IEEE Xplore</a></li>
									<li><a href="/get/jstor">JSTOR</a></li>
									<li><a href="/get/nature">Nature</a></li>
									<li><a href="/get/pubmed">PubMed</a></li>
									<li><a href="/get/science">Science</a></li>
									<li><a href="/get/webofsci">Web of Science</a></li>
								</ul>
							</div>
							<div class="whatami"><a class="panel" href="#">What am I searching?</a>
						    <span>
						    		<table>
						    			<tr>
						    				<th scope="row"><a href="/ejournals">Vera A-Z lists</a></th>
						    				<td>Search by title for e-journals and databases provided by the MIT Libraries. Do not search for individual articles here.</td>
						    			</tr>
						    		</table>
						    </span>
						    </div>
						</div>

						<!-- 3: Books and media tab -->
						<div id="tab_books" class="mitlibrarysearchtabcontent floatwrapper">
							<div class="mitlibrarysearchform">
								<h2>Books &amp; media</h2>
								<form id="booksearch" name="booksearch" action="http://search.ebscohost.com/login.aspx" class="searchform" method="get">
									<!-- container for hidden fields, inserted on form submit -->
									<div class="hiddenfields"></div>

									<!-- search text field -->
									<div class="searchfield floatwrapper">
										<label for="bookrequest">Ex: carbon nanotubes, game design</label>
										<input type="text" id="bookrequest" name="request" class="searchtext" title="Enter title, author, etc. (ex: game design)" />
										<button type="submit">SEARCH</button>
									</div>

									<!-- radio buttons -->
									<div class="columns one-column floatwrapper">
										<div class="column">
											<div class="radiorow floatwrapper">
												<input type="radio" name="BooksMediaSearch" id="Barton" value="Barton" checked="checked" class="radio" rel="Enter title, author, etc. (ex: game design)" /><label for="Barton"><strong>Barton:</strong> MIT catalog</label>
												<!-- radio buttons -->
												<div class="columns two-column bartonoptions floatwrapper">
													<div class="column">
														<div class="radiorow floatwrapper">
															<input type="radio" name="code" id="bartonkeyword" value="find_WRD" checked="checked" class="radio" rel="Enter title, author, etc. (ex: game design)" /><label for="bartonkeyword">Keyword</label>
														</div>
														<div class="radiorow floatwrapper">
															<input type="radio" name="code" id="bartontitle" value="scan_TTL" class="radio" rel="Enter first words in title (ex: introduction to fluid mechanics)" /><label for="bartontitle">Title begins with</label>	
														</div>
													</div>
													<div class="column last">
														<div class="radiorow floatwrapper">
															<input type="radio" name="code" id="bartonauthor" value="scan_AUT" class="radio" rel="Enter author, last name first (ex: gates bill)" /><label for="bartonauthor">Author (last name first)</label>
														</div>
														<div class="radiorow floatwrapper">
															<input type="radio" name="code" id="bartoncallnumber" value="scan_CND" class="radio" rel="Enter call# of item (ex: ta405.t5854)" /><label for="bartoncallnumber">Call number begins with</label>
														</div>
													</div>
												</div>
											</div>
											<div class="radiorow floatwrapper">
												<input type="radio" name="BooksMediaSearch" id="WorldCat" value="WorldCat" class="radio" rel="Enter author, title, etc. (ex: game design)" /><label for="WorldCat"><strong>MIT's WorldCat:</strong> Libraries worldwide</label>					
											</div>
										</div>
									</div>	
								</form>
							</div>
							<!-- sidebar -->
							<div class="mitlibrarysearchoptions">
								Barton catalog:
								<ul>
									<li><a href="/barton-advanced">Advanced</a></li>
									<li><a href="/barton-conferences">Conferences</a></li>
									<li><a href="/barton-journals">Journals</a></li>
									<li><a href="/barton-theses">MIT theses</a></li>
								</ul>
								Looking for non-MIT items?<br><a href="http://mit.worldcat.org/">MIT's WorldCat</a>
							</div>
							<div class="whatami"><a class="panel" href="#">What am I searching?</a>
								<span>
									<table>
										<tr class="barton">
											<th scope="row"><a href="/barton">Barton</a></th>
											<td>The MIT Libraries catalog.  Search for and request items held in the MIT Libraries collections.</td>
										</tr>
										<tr class="worldcat">
											<th scope="row"><a href="http://mit.worldcat.org/">MIT's WorldCat</a></th>
											<td>A worldwide catalog. Search for and request items in the MIT Libraries and libraries beyond MIT, including Borrow Direct and the Boston Library Consortium.</td>
										</tr>
									</table>
								</span>
							</div>
						</div>

						<!-- 4: Course reserves tab -->
						<div id="tab_coursereserves" class="mitlibrarysearchtabcontent floatwrapper">
							<div class="mitlibrarysearchform">
								<h2>Course reserves</h2>
								<form name="getInfo" action="http://library.mit.edu/F/" class="searchform barton" id="bartoncoursesearch" method="get">
									<div class="hiddenfields">
										<input type='hidden' name='func' value=''/>
									</div>

									<!-- search text field -->
									<div class="searchfield floatwrapper">
										<label for="coursereservesrequest">Ex: 18.01, STS.320, 21F.108</label>
										<input type="text" name="request" value="" id="coursereservesrequest" class="searchtext" title="Enter course number (ex: 18.01)" />
										<button type="submit">SEARCH</button>
									</div>

									<!-- radio buttons -->
									<div class="columns one-column floatwrapper">
										<div class="column">
											<div class="radiorow floatwrapper">
												<input name="code" id="coursenumber" value="scan_CNB" checked="checked" type="radio" class="radio" rel="Enter course number (ex: 18.01)" /><label for="coursenumber">Course number begins with</label>
											</div>
											<div class="radiorow floatwrapper">
												<input name="code" id="instructorkeyword" value="find_WIN" type="radio" class="radio" rel="Enter instructor name (ex. smith)" /><label for="instructorkeyword">Instructor keyword</label>
											</div>
											<div class="radiorow floatwrapper">
												<input name="code" id="coursenamekeyword" value="find_WOU" type="radio" class="radio" rel="Enter course name (ex: introduction robotics)" /><label for="coursenamekeyword">Course name keyword</label>
											</div>
										</div>
									</div>
								</form>
							</div>
							<!-- sidebar -->
							<div class="mitlibrarysearchoptions">
								<p><a href="/barton-reserves">Search reserves by title, author, call#</a></p>
								<p><a href="/reserves">Reserves &amp; TIP FAQ</a></p>
								<p>E-reserves in <a href="http://stellar.mit.edu">Stellar</a></p>
								<p><a href="/help/course.html">Class guides</a></p>
							</div>
							<div class="whatami"><a class="panel" href="#">What am I searching?</a>
								<span>        
									<table>
										<tr>
											<th scope="row"><a href="/barton-reserves">Course reserves</a></th>
											<td>Search the MIT Libraries catalog for materials that have been put aside for your courses.</td>
										</tr>
									</table>
								</span>
							</div>
						</div>

						<!-- 5: More search options tab -->
						<div id="tab_more" class="mitlibrarysearchtabcontent floatwrapper">
							<div class="mitlibrarysearchform">
								<h2>More search options</h2>
								<form name="othersearch" method="get" accept-charset="UTF-8" action="" class="searchform" id="othersearch">
									<div class="hiddenfields"></div>

									<!-- search text field -->
									<div class="searchfield floatwrapper">
										<label for="searchtext">Ex: edgerton, mit press, carbon nanotubes</label>
										<input type="text" name="searchtext" value="" id="searchtext" class="searchtext" title="Enter words or parts of words in title (ex: new england journal med)" />
										<button type="submit">SEARCH</button>
									</div>

									<!-- radio buttons -->
									<div class="columns one-column floatwrapper">
										<div class="column">
											<div class="radiorow floatwrapper">
												<input type="radio" name="searchTarget" checked="checked" id="dspace" value="dspace" class="radio" rel="Enter first words in title (ex. journal of urban)" /><label for="dspace"><strong>DSpace@MIT:</strong> MIT theses and scholarly papers</label>
											</div>
											<div class="radiorow floatwrapper">
												<input type="radio" name="searchTarget" id="dome" value="dome" class="radio" rel="Ex: hagia sophia, kevin lynch" /><label for="dome"><strong>Dome:</strong> MIT Libraries’ digital images, maps, etc.</label>
											</div>
											<div class="radiorow floatwrapper">
												<input type="radio" name="searchTarget" id="archnet" value="archnet" class="radio" rel="Ex: mosque" /><label style="width:350px;" for="archnet"><strong>ArchNet Digital Library:</strong> architecture in Muslim societies</label>
											</div>
										</div>
									</div>
								</form>
							</div>
							<!-- sidebar -->
							<div class="mitlibrarysearchoptions">
								Looking for geospatial data? <a href="http://arrowsmith.mit.edu/">GeoWeb</a>
								<br><br>
								Help finding:
								<ul>
									<li><a href="http://libguides.mit.edu/finding-data">Data</a></li>
									<li><a href="http://libguides.mit.edu/findingimages">Images</a></li>
									<li><a href="/archives">Archival materials</a></li>
								</ul>
							</div>
							<div class="whatami"><a class="panel" href="#">What am I searching?</a>
						    	<span>
						    		<table>
						    			<tr>
						    				<th scope="row"><a href="http://dspace.mit.edu/">DSpace@MIT</a></th>
						    				<td>Search MIT's institutional repository for MIT's digital research materials including theses, conference papers, technical reports, preprints and more.</td>
						    			</tr>
						    			<tr>
						    				<th scope="row"><a href="http://dome.mit.edu/">Dome</a></th>
						    				<td>Search digital images, maps, and other documents from the MIT Libraries’ collections.</td>
						    			</tr>
						    			<tr>
						    				<th scope="row"><a href="https://archnet.org/">Archnet</a></th>
						    				<td>Search an international online community for architects, planners, urban designers, landscape architects, conservationists, and scholars, with a focus on Muslim cultures and civilizations.</td>
						    			</tr>
						    		</table>
						        </span>
						    </div>
						</div>

						<!-- Search box content for those without Javascript -->
						<div id="nojstabreplacement" class="nojs">
							<div class="mitlibrarysearchform">
								<h2><span>MIT</span> Libraries Searches</h2>
								<ul class="linklist">
									<li>Start your search with <a href="/bartonplus">BartonPlus</a></li>
									<li>E-Journals and databases: <a href="/ejournals">Vera A-Z lists</a></li>
									<li>Books and media: <a href="/barton">Barton Catalog</a> and <a href="/worldcat">MIT's WorldCat</a></li>
									<li><a href="/barton-reserves">Course Reserves</a></li>
									<li>More search options: <a href="/dspace">DSpace@MIT</a>, <a href="/dome">Dome</a> and <a href="http://archnet.org">ArchNet</a></li>
								</ul>
							</div>
						</div>
				
					</div>
					<div class="searchshadowbot png"> </div>				
				</div>
			</div>
		</div>	
		
		<!-- Featured Image -->
		<?php
			$featureImage = get_field("photo");
			$featureImageUrl = get_field("photo_url");
			if ($featureImage != ""): 
		
				if ($featureImageUrl != ""): ?>
					<a href="<?php echo $featureImageUrl; ?>"><img src="<?php echo $featureImage; ?>" width="222" height="189" alt="" title="" id="featuredimage" /></a>
				<?php else: ?>
					<img src="<?php echo $featureImage; ?>" width="222" height="189" alt="" title="" id="featuredimage" />
				
		<?php 
		
				endif; 
			else: ?>
		<a href="/hayden/24study.html"><img src="/images/photos/24hr-1.jpg" width="222" height="189" alt="24 hour study space" title="24 hour study space, Hayden" id="featuredimage" /></a>
		
		<?php endif; ?>

	</div>
	
	<!-- Overall content container (both content and sidebar) -->
	<div id="contentcontainer" class="floatwrapper">
		<div class="contentouterwrapper">
			<div class="contentshadowwrapper">
				<div class="contentshadowmid">
		
					<!-- Content area (at right, with gradient) -->
					<div id="content" class="mainContent">
						
						<?php get_template_part('inc/alert'); ?>

						<h2>Library Services</h2>
						
						<h3 class="allservices"><a href="/about/site-search">Services A-Z</a></h3>
			
						<!-- List of Library Services, first row -->
						<div class="libraryservices columns three-column floatwrapper">
						  <!-- Guides list -->
						  <div class="column">
						   <h3><a href="/locations">Hours &amp; locations</a></h3>
						   <ul class="linklist">
						    <li><a href="/hours">Hours</a></li>
						    <li><a href="/locations">List of libraries</a></li>
						    <li><a href="/study">Study spaces</a> <span class="pipe">|</span> <a href="/study/reserve/">Reserve a group study space</a></li>
						    <li><a href="/exhibits">Exhibits &amp; galleries</a></li>
						    <li><a href="/map">Map</a></li>
						  </ul>
						</div>

						<!-- Borrow or request list -->
						<div class="column">
						  <h3><a href="/borrow">Borrow &amp; request</a></h3>
						  <ul class="linklist">
						    <li><a href="/barton-account">Your Account</a></li>
						    <li><a href="/getit">Request from non-MIT libraries:</a> <a href="/ilb">ILB,</a> <a href="/ordering/borrowdirect.html">BorrowDirect</a></li>
						    <li><a href="http://libguides.mit.edu/circfaq">Circulation FAQ</a></li>
						    <li><a href="/reserves">Course reserves &amp; TIP FAQ</a></li>
						    <li><a href="/ordering/non-mit-access/index.html">Visit non-MIT libraries:</a> <a href="/harvard"> Harvard,</a> <a href="/blc">BLC</a></li>
						    <li><a href="/suggest-purchase">Suggest a purchase</a></li>
						    <li><a href="/borrow">More&#8230;</a></li>
						  </ul>
						</div>

						<!-- Help list -->
						<div class="column last">
						  <h3><a href="/research-support">Expert help</a></h3>
						  <ul class="linklist">
						    <li><a href="/ask">Ask Us!</a></li>
						    <li><a href="/experts">Librarians &amp; subject experts</a></li>
						    <li><a href="/research-guides">Research guides: tools and databases for your topic</a></li>
						    <li><a href="http://libguides.mit.edu/classguides">Class &amp; program guides</a></li>
						    <li><a href="/about/faqs/remote.html">E-resource troubleshooting</a></li>
						    <li><a href="/research-support">More&#8230;</a></li>
						  </ul>
						</div>
						</div>

						<!-- List of Library Services, second row -->
						<div class="libraryservices columns three-column floatwrapper">

						 <!-- Tools list -->
						 <div class="column">
						  <h3><a href="/research-support">Publishing &amp; writing</a></h3>
						  <ul class="linklist">
						    <li><a href="scholarly">Scholarly publishing: open access &amp; copyright</a></li>
						    <li><a href="http://dspace.mit.edu/">DSpace@MIT: MIT scholarly papers</a></li>
						    <li><a href="/oapolicy">Faculty open access policy</a></li>
						    <li><a href="http://libguides.mit.edu/publishing">Getting published: tools &amp; help</a></li>
						    <li><a href="/archives/thesis-specs/index.html">MIT thesis specifications</a></li>
						    <li><a href="/research-support">More&#8230;</a></li>
						  </ul>                            
						</div>


						<!-- Publishing list -->
						<div class="column">
						  <h3><a href="/productivity-tools">Productivity tools</a></h3>
						  <ul class="linklist">
						    <li><a href="/references">Citation software:</a> <a href="/endnote">EndNote,</a> <a href="/refworks">RefWorks,</a> <a href="/zotero">Zotero,</a> <a href="/mendeley">Mendeley</a></li>
						    <li><a href="http://libguides.mit.edu/manage-info">Manage your information</a></li>
						    <li><a href="/apps">Apps for academics</a></li>
						    <li><a href="/libx">LibX</a></li>
						    <li><a href="/help/rss/barton/">New books RSS feeds</a></li>
						    <li><a href="/productivity-tools">More&#8230;</a></li>
						  </ul>
						</div>

						<!-- Visit the library list -->
						<div class="column last">
						  <h3><a href="/about">About us</a></h3>
						  <ul class="linklist">
						    <li><a href="http://libguides.mit.edu/directory">Staff directory</a></li>
						    <li><a href="/news">News</a></li>
						    <li><a href="/calendar">Calendar of events: classes &amp; workshops</a></li>
						    <li><a href="/about/guidelines.html">Guidelines for use</a></li>
						    <li><a href="/about">More&#8230;</a></li>
						  </ul>
						</div>
						</div>

					</div>
				</div>
				<div class="contentshadowbot png"> </div>
			</div>
		</div>
		
		<!-- Sidebar area on left -->
		<div id="sidebar">
			
			<?php get_template_part( 'inc/homepage', 'news' ); ?>
						
			<!-- Ask the Expert section -->
			<div class="section last">
			<h2>Ask the expert</h2>
<?php 

$arexpert = get_field("featured_expert");


if ($arexpert) {
	$expertIndex = array_rand($arexpert);
	$expert = $arexpert[$expertIndex];
	
	
	$name = $expert->post_title;
	$bio = $expert->post_excerpt;
	$url = get_post_meta($expert->ID, "expert_url", 1);
	
	if (has_post_thumbnail($expert->ID)) {
		$thumb = get_the_post_thumbnail($expert->ID, array(108,108));
	} else {
		$thumb = "";
	}
		
?>
 
 <a href="<?php echo $url; ?>"><?php echo $thumb ?></a><br/>
 <h3><a href="<?php echo $url; ?>"><?php echo $name; ?></a></h3>
		<p><?php echo $bio; ?></p>
				<ul class="linklist">
 <li><a href="<?php echo $url; ?>">How can <?php echo $name; ?> help you?</a></li>
<li><a href="http://libguides.mit.edu/content.php?pid=110460&sid=1651114">More experts</a></li>
      </ul>
<?php 
	} else {
?>
 <a href="/profile/willer"><img src="/img/staff-photos/willer-100x100.jpg" width="100" alt="Ann Marie Willer" class="portrait" /></a>
 <h3><a href="/profile/willer">Ann Marie Willer</a></h3>
		<p>Preservation Librarian</p>
				<ul class="linklist">
 <li><a href="/profile/willer">How can Ann Marie help you?</a></li>
<li><a href="http://libguides.mit.edu/content.php?pid=110460&sid=1651114">More experts</a></li>
      </ul>
<?php } ?>
</div>

			
		</div>
		
		<!-- Footer area -->
		<div id="footer" class="floatwrapper">
			
			<!-- Footer nav -->
			<div id="footernav">
				<p><a href="/faculty">Faculty</a> | <a href="/alumni">Alumni</a> | <a href="/visitors">Visitors</a> | <a href="/giving/">Giving</a> | <a href="/mobile">Mobile version</a></p>
				<p><a href="http://libguides.mit.edu/directory">Staff Directory</a> | <a href="/about/contact.html">Contact us</a></p>
		  </div>
			
			<!-- Social networking links -->
			<div id="socialnetworking">
				<h2 class="follow">Follow MIT Libraries:</h2>
				<ul class="floatwrapper">
					<li><a href="http://twitter.com/mitlibraries" class="icon twitter" title="Twitter">Twitter</a></li>
					<li><a href="/facebook" class="icon facebook" title="Facebook">Facebook</a></li>
					<li><a href="https://foursquare.com/mitlibraries" class="icon foursquare" title="Foursquare">Foursquare</a></li>
					<li><a href="/news/rss-feeds/" class="icon rss" title="RSS Feeds">RSS Feeds</a></li>
					<li><a href="http://libguides.mit.edu/content.php?pid=104796&sid=788991" class="icon google" title="Google Scholar">Google Scholar</a></li>
					<li><a href="http://www.flickr.com/photos/mit-libraries/" class="icon flickr" title="Flickr">Flickr</a></li>
				</ul>
			</div>
		</div>
	</div>
	
	<!-- MIT footer -->
	<div id="mitfooter">
		<a href="http://web.mit.edu/"><img src="images/logo_mit.png" width="54" height="28" alt="MIT" id="mitlogo" class="png" /></a>
		<img src="images/logo_mit_printonly.gif" width="54" height="28" alt="MIT" class="printonly" />
		<div class="address">
			<a href="http://web.mit.edu/">Massachusetts Institute of Technology</a><br />
			77 Massachusetts Avenue<br />
			Cambridge MA 02139-4307
		</div>
	</div>
</div>

</body>
</html>
