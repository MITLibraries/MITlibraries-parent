//
// Experts
//

// This implements a Fisher-Yates shuffle.
// See also: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffleExperts(data) {
	var m = data.length, t, i;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = data[m];
		data[m] = data[i];
		data[i] = t;
	}
	return data;
}

// This parses the data structure returned by the WordPress API
function parseExperts(data) {

	// Expert names
	var expertName1 = data[0].title.rendered;
	var expertName2 = data[1].title.rendered;
	var expertName3 = data[2].title.rendered;
	var expertName4 = data[3].title.rendered;

	// Expert images
	var expertPhoto1 = data[0].featured_media;
	var expertPhoto2 = data[1].featured_media;
	var expertPhoto3 = data[2].featured_media;
	var expertPhoto4 = data[3].featured_media;

	// Expert job titles (post excerpts)
	var expertExcerpt1 = data[0].excerpt.rendered;
	var expertExcerpt2 = data[1].excerpt.rendered;
	var expertExcerpt3 = data[2].excerpt.rendered;
	var expertExcerpt4 = data[3].excerpt.rendered;

	// Expert URL (currently an ACF field)
	var expertURL1 = data[0].meta.expert_url;
	var expertURL2 = data[1].meta.expert_url;
	var expertURL3 = data[2].meta.expert_url;
	var expertURL4 = data[3].meta.expert_url;

	// Append extra markup only if JSON request successful
	$('.expert').append('<a class="link-profile no-underline">');
	// Append expert image div
	$('.expert .link-profile').append('<img alt="" class="expert-photo">');
	// Append empty spans for expert names
	$('.expert .link-profile').append('<span class="name"></span>');
	// Append empty spans for expert titles
	$('.expert .link-profile').append('<span class="title-job"></span>');
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
	// Add expert excerpt
	$('.expert .title-job:eq(0)').html(expertExcerpt1);
	$('.expert .title-job:eq(1)').html(expertExcerpt2);
	$('.expert .title-job:eq(2)').html(expertExcerpt3);
	$('.expert .title-job:eq(3)').html(expertExcerpt4);
	// Add expert URL
	$('.expert .link-profile:eq(0)').attr('href', expertURL1);
	$('.expert .link-profile:eq(1)').attr('href', expertURL2);
	$('.expert .link-profile:eq(2)').attr('href', expertURL3);
	$('.expert .link-profile:eq(3)').attr('href', expertURL4);
	// Add the expert count to the "All Experts" button
	$('.view-experts .count').text(data.length);
}

$(function(){
	
	// Much of this could be eliminated by just loading this URL:
	// /wp-json/wp/v2/experts?filter[orderby]=rand&filter[posts_per_page]=4
	$.getJSON('/wp-json/wp/v2/experts?per_page=99')
		.done(function(data){
			parseExperts(shuffleExperts(data));
		});

});
