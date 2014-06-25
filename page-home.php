<?php 
	get_header();
?>

	<div id="search-main" class="search--lib-resources">
		<h2>Search in</h2>
		<select name="" id="resource" tabindex="2">
			<option value="option-1">Articles, books &amp; more</option>
			<option value="option-2">E-Journals &amp; databases</option>
			<option value="option-3">Books &amp; media at MIT</option>
			<option value="option-4">Books &amp; media worldwide</option>
			<option value="option-5">Course reserves</option>
			<option value="option-6">Libraries website</option>
		</select>
		<label>for</label>
		<input type="text" class="option-1 active" placeholder="ex: carbon nanotubes, oliver twist" autofocus="autofocus" tabindex="1">
		<input type="text" class="option-2" placeholder="ex: new eng j of med, AIP conf proc">
		<input type="text" class="option-3" placeholder="ex: carbon nanotubes, game design">
		<input type="text" class="option-4" placeholder="ex: carbon nanotubes, game design">
		<input type="text" class="option-5" placeholder="ex: 18.01, STS.320, 21F.108">
		<input type="text" class="option-6" placeholder="ex: hours, study spaces">
		<label>by</label>
		<select name="" id="" class="keywords option-1 active" tabindex="3">
			<option value="">Keyword</option>
			<option value="">Title</option>
			<option value="">Author</option>
		</select>
		<select name="" id="" class="keywords option-2" tabindex="3">
			<option value="">Partial Words In Title</option>
			<option value="">Title Starts With</option>
			<option value="">Exact Title</option>
		</select>
		<select name="" id="" class="keywords option-3" tabindex="3">
			<option value="">Keyword</option>
			<option value="">Author (last name first)</option>
			<option value="">Call number starts with</option>
		</select>
		<select name="" id="" class="keywords option-4" tabindex="3">
			<option value="">Keyword</option>
		</select>
		<select name="" id="" class="keywords option-5" tabindex="3">
			<option value="">Course number starts with</option>
			<option value="">Instructor keyword</option>
			<option value="">Course name keyword</option>
		</select>
		<select name="" id="" class="keywords option-6" tabindex="3">
			<option value="">Keyword</option>
		</select>
		<script>
			
			$('#resource').change(function(){
				// Hide all inputs on option change
				$('#search-main input').removeClass('active selected');
				// Get the value of the selected option...
				var resourceOption = $('#resource option:selected').val();
				// ...and show the corresponding input
				$('#search-main input.'+resourceOption).addClass('active selected');
				// Repeat for keyword selects
				$('.keywords').removeClass('active');
				$('#search-main .keywords.'+resourceOption).addClass('active');
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
				<a href="#0" class="show-more hidden-non-mobile">Show 3 More<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="16.3" height="9.4" viewBox="2.7 8.3 16.3 9.4" enable-background="new 2.7 8.3 16.3 9.4" xml:space="preserve"><path d="M18.982 9.538l-8.159 8.159L2.665 9.538l1.284-1.283 6.875 6.875 6.875-6.875L18.982 9.538z"/></svg></a>
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
