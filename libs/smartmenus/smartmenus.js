jQuery(document).ready(function() {

	// TODO: Figure out min/max width parameters
	$('#main-menu').smartmenus({
		mainMenuSubOffsetX: -1,
		subMenusSubOffsetX: 10,
		subMenusSubOffsetY: 0,
		subMenusMinWidth: '30em',
		subMenusMaxWidth: '30em',
		showTimeout: 0,
		hideTimeout: 0
	});

});
