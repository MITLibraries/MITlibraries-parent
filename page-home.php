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
		<form class="input-submit flex-container">
			<input type="text" class="option-1 active" placeholder="ex: carbon nanotubes, oliver twist" autofocus="autofocus" tabindex="1">
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
			<select name="" id="" class="keywords option-1 active" tabindex="3">
				<option value="">Keyword</option>
				<option value="">Title</option>
				<option value="">Author</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords option-2" tabindex="3">
				<option value="">Partial Words In Title</option>
				<option value="">Title Starts With</option>
				<option value="">Exact Title</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords option-3" tabindex="3">
				<option value="">Keyword</option>
				<option value="">Author (last name first)</option>
				<option value="">Call number starts with</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords option-4" tabindex="3">
				<option value="">Keyword</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords option-5" tabindex="3">
				<option value="">Course number starts with</option>
				<option value="">Instructor keyword</option>
				<option value="">Course name keyword</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<div class="wrap-select--keywords">
			<select name="" id="" class="keywords option-6" tabindex="3">
				<option value="">Keyword</option>
			</select>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"/></svg>
		</div>
		<a href="" class="search-advanced bartonplus active">BartonPlus advanced search</a>
		<a href="" class="search-advanced barton">Barton advanced search</a>
		<a href="" class="search-advanced worldcat">WorldCat advanced search</a>
		<a href="" class="search-advanced course-reserves">Course Reserves advanced search</a>
		<script>

			// All available resources	
			var resourcesAll = $('#resources li');

			$('#resources').on('click', 'li', function(event) {
				// To show or hide the parent <ul>
				$(this).parent().toggleClass('active');
				// Remove active class from any <li> that has it...
				$(resourcesAll).removeClass('active');
				// And add the class to the <li> that gets clicked
				$(this).toggleClass('active');
				
				// Get the main text of the currently selected <li>
				var selectedText = $('#resources li.active .main').text();
				// Show this text above the dropdown (when active), mimicing a <select>
				if ($('#resources').hasClass('active')) {
					console.log('open');
					$('.wrap-select--resources .selected').text(selectedText).addClass('active');
				}
				// Remove the text when the dropdown is closed
				else {
					console.log('closed');
					$('.wrap-select--resources .selected').text('').removeClass('active');
				}
				// Get the class of the selected resource
				var searchSelected = $('#resources li.active').attr('data-target');
				// Apply this class, as an id, to the form.
				$('#search-main form').attr('id', searchSelected);
			});

			function hiddenFields() {
				// Add hidden fields, necessary for BartonPlus search
				if ($('#bartonplus').length) {
					$('#bartonplus')
						.append("<input name='direct' value='true' type='hidden'>")
						.append("<input name='scope' value='site' type='hidden'>")
						.append("<input name='site' value='eds-live' type='hidden'>")
						.append("<input name='authtype' value='ip,guest' type='hidden'>")
						.append("<input name='custid' value='s8978330' type='hidden'>")
						.append("<input name='profile' value='eds' type='hidden'>")
						.append("<input name='groupid' value='main' type='hidden'>")
						.append('<input name="bquery" value="" type="hidden">');
				}
				// Vera
				if($('#vera').length) {
					$('#vera')
					.append("<input type='hidden' name='param_perform_save' value='searchTitle' />")
					.append("<input type='hidden' name='param_chinese_checkbox_save' value='0' />")
					.append("<input type='hidden' name='param_type_save' value='textSearch' />")
					.append("<input type='hidden' name='param_type_value' value='textSearch' />")
					.append("<input type='hidden' name='param_jumpToPage_value' value='' />")
					.append("<input type='hidden' name='param_services2filter_save' value='getAbstract' />")
					.append("<input type='hidden' name='param_services2filter_save' value='getFullTxt' />");
				}
				// Worldcat
				if($('#worldcat'.length)) {
					$('#worldcat')
						.append("<input type='hidden' name='qt' value='wc_org_mit'/>")
						.append("<input type='hidden' name='qt' value='affiliate'/>");
				}
			}

			$('#search-main').on('click', '#resources', function(event){
				// Hide all inputs on option change
				$('#search-main input').removeClass('active');
				// Get the value of the selected option...
				var resourceOption = $('#resources li.active').attr('data-option');
				// ...and show the corresponding input
				$('#search-main input.'+resourceOption).addClass('active');
				// Repeat for keyword selects
				$('.keywords').parent().removeClass('active');
				$('.keywords').removeClass('active');
				$('#search-main .keywords.'+resourceOption).addClass('active');
				$('#search-main .keywords.'+resourceOption).parent().addClass('active');
				// Advanced search
				var searchSelected = $('#resources li.active').attr('data-target');
				$('#search-main a.search-advanced').removeClass('active');
				$('#search-main a.search-advanced.'+searchSelected).addClass('active');
			});

			$(document).on('click', function(event){
				if(!$('#resources.active').has(event.target).length == 0) {
					return;
				}
				else {
					$('#resources').removeClass('active');
					$('#search-main .selected').removeClass('active').text('');
				}
			});


			$('#search-main form').on('submit', function(){
				// Get the query entered...
				var searchQuery = $('input.active', this).val();
				alert(searchQuery);
				// Barton...
				if ($('#bartonplus').length) {
					// Set the correct action for the BartonPlus form
					$('#bartonplus').attr('action', 'http://search.ebscohost.com/login.aspx');
					// Add hidden fields
					hiddenFields();
					// Add search query to the bquery value, which sends it along to EDS
					$('input[name="bquery"]', this).val(searchQuery);
					}
				// Vera...
				if ($('#vera').length) {
					// Vera actions
					$('#vera')
						.attr('action', 'http://owens.mit.edu/sfx_local/az/mit_all')
						.attr('name', 'az_user_form')
						.attr('method', 'get')
						.attr('accept-charset', 'UTF-8')
						.attr('id', 'verasearch')
						.addClass('searchform');
					// Add hidden fields
					hiddenFields();
					// Add the query val
					$('input', this)
						.attr('name','param_pattern_value')
						.attr('id','param_pattern_value')
						.addClass('searchtext')
						.val(searchQuery);
				}
				// Barton
				if($('#barton').length) {
					$('input', this)
						.attr("action", "http://library.mit.edu/F/")
						.val(searchQuery);
				}
				// Worldcat
				if($('#worldcat').length) {
					// Add hidden fields
					hiddenFields();
					$('input', this)
						.attr("action", "http://mit.worldcat.org/search")
						.attr("name","q")
						.val(searchQuery);
				}
			});
			

		</script>
	</div><!-- end div.search-main -->
	<div class="content-main flex-container">
		<div class="col-1 flex-item">
			<div class="hours-locations">
				<h2>Hours &amp; Locations</h2>
				<a href="/barker"><h3>Barker Library</h3></a>
				<a href="/dewey"><h3>Dewey Library</h3></a>
				<a href="/hayden"><h3>Hayden Library</h3></a>
				<a href="#0" class="show-more hidden-non-mobile"><svg class="icon-arrow-down" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="16.3" height="9.4" viewBox="2.7 8.3 16.3 9.4" enable-background="new 2.7 8.3 16.3 9.4" xml:space="preserve"><path d="M18.982 9.538l-8.159 8.159L2.665 9.538l1.284-1.283 6.875 6.875 6.875-6.875L18.982 9.538z"/></svg>Show 3 More</a>
				<a href="/archives" class="hidden-mobile inactive-mobile"><h3>Institute Archives &amp; Special Collections</h3></a>
				<a href="/lewis" class="hidden-mobile inactive-mobile"><h3>Lewis Music Library</h3></a>
				<a href="/rotch" class="hidden-mobile inactive-mobile"><h3>Rotch Library</h3></a>
				<a href="/map">View Map</a>
				<a href="/study" class="study">Find a Study Space</a>
				<a href="/hours" class="button-primary">All Hours &amp; Locations</a>
			</div>
			<script>
				$(document).on('click', '.hours-locations .show-more', function(){
					var all = $(this).parent();
					var hiddenLocs = $(all).children('.hidden-mobile');
					$(this).addClass('inactive').trigger('more-locs');
				});
				$(document).on('more-locs', function(){
						console.log('hello, world');	
					$('.hours-locations .show-more').hide(100);
					$('.hours-locations .hidden-mobile').removeClass('hidden-mobile');
						//$('.hidden-mobile', this).removeClass('inactive');
					});
			</script>
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
				<script>
					$.getJSON('/news/wp-json/posts')
						.done(function(data){
							var newsItem1 = data[0];
							var newsItem2 = data[1];
							$('.item-1 h3').append(newsItem1.title);
							$('.item-2 h3').append(newsItem2.title);
							var newsImage1 = '/news/files/'+newsItem1.featured_image.attachment_meta.file;
							var newsImage2 = '/news/files/'+newsItem2.featured_image.attachment_meta.file;
							$('.item-1 .image').css('background-image', 'url('+newsImage1+')').trigger('newsLoaded1');
							$('.item-2 .image').css('background-image', 'url('+newsImage2+')').trigger('newsLoaded2');
						});
						$('.item-1').on('newsLoaded1', function(){
							$('.item-1 .spinner').hide();
						});
						$('.item-2').on('newsLoaded2', function(){
							$('.item-2 .spinner').hide();
						});
				</script>
				<a href="/news" class="button-primary">All News &amp; Events</a>
			</div>
			<div class="guides-experts">
				<h2>Research Guides &amp; Experts</h2>
				<p class="caption">Specialized guides for every research interest.</p>
				<p class="caption">Not sure where to start?<a href="/ask">Ask Us</a></p>
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
				<script>
					$.getJSON('/wp-json/posts?type=experts')
						.done(function(data){
							// Count the objects
							var dataLength = data.length;
							var arr = [];
							while(arr.length < 4){
							  var randomNumber=Math.ceil(Math.random()*dataLength);
							  var found=false;
							  for(var i=0;i<arr.length;i++){
							    if(arr[i]==randomNumber){found=true;break}
							  }
							  if(!found)arr[arr.length]=randomNumber;
							}
							var expertName1 = data[arr[0]].title;
							var expertName2 = data[arr[1]].title;
							var expertName3 = data[arr[2]].title;
							var expertName4 = data[arr[3]].title;

							var expertPhoto1 = data[arr[0]].featured_image.guid;
							var expertPhoto2 = data[arr[1]].featured_image.guid;
							var expertPhoto3 = data[arr[2]].featured_image.guid;
							var expertPhoto4 = data[arr[3]].featured_image.guid;

							// Pick two random numbers from the data array
							// var randomImage1 = Math.round(Math.random()*dataLength);
							// var randomImage2 = Math.round(Math.random()*dataLength);
							// // Regenerate randomImage2 if it equals randomImage1
							// while (randomImage1 == randomImage2) {
							// 	randomImage2 = Math.round(Math.random()*dataLength);
							// }
							// console.log('object 1 is '+randomImage1+' and object 2 is '+randomImage2);
							// // Get the image URL
							// var expertPhoto1 = data[randomImage1].featured_image.guid;
							// var expertPhoto2 = data[randomImage2].featured_image.guid;
							// Append expert image only if JSON request successful
							$('.expert').append('<img class="expert-photo">');
							// Append empty spans for expert names
							$('.expert').append('<span class="name"></span>');
							// Add expert name to appropriate span
							$('.expert .name:eq(0)').text(expertName1);
							$('.expert .name:eq(1)').text(expertName2);
							$('.expert .name:eq(2)').text(expertName3);
							$('.expert .name:eq(3)').text(expertName4);
							// Add image URL to src attribute
							$('.expert .expert-photo:eq(0)').attr('src', expertPhoto1);
							$('.expert .expert-photo:eq(1)').attr('src', expertPhoto2);
							$('.expert .expert-photo:eq(2)').attr('src', expertPhoto3);
							$('.expert .expert-photo:eq(3)').attr('src', expertPhoto4);
							// Add the expert count to the "All Experts" button
							$('.view-experts .count').text(dataLength);
						});
				</script>
			</div><!-- end div.guides-experts -->
		</div>
	</div>

<?php 
	get_footer();
?>
