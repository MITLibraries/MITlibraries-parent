$(function() {
	$('#nav-main .link-primary > a').click(function(){
		var linkHref = $(this).attr('href');
		var linkText = $(this).text();
		var linkInfo = 'mega-nav_top_' + linkText + '_' + linkHref;
		TrackEvent('link', 'click', linkInfo, 1);
	});
	$('#nav-main .links-sub a').click(function(){
		var linkHref = $(this).attr('href');
		var linkText = $(this).text();
		var linkInfo = 'mega-nav_sub_' + linkText + '_' + linkHref;
		TrackEvent('link', 'click', linkInfo, 1);
	});
	function TrackEvent(Category,Action,Label,Value){
		ga('send', {
			hitType: 'event',
			eventCategory: Category,
			eventAction: Action,
			eventLabel: Label,
			eventValue: Value
		});
	}
});
