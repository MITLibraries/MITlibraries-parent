(function($){

var Core = {
	ondomready: function(){
		Core.linkExpandable();
		Core.linkTabs();
		Core.nullAlt();
		jQuery(window).resize(function() {
			Core.handleResize();
		});
		Core.handleResize();
	},
	
	handleResize: function() {
		Core.fixMobileSizes();
	},
	
	fixMobileSizes: function() {

		jQuery(".mobileToday").each(function() {
			console.log(jQuery(this).html());
			var par = jQuery(this).parent();
			console.log(par.height());
			jQuery(this).height(par.height()+5);
		});	
		
		jQuery(".hrList tbody tr").each(function() {
			var maxHeight = 0;
			jQuery(this).find("td:not(.name)").each(function() {
				var td = jQuery(this);
				maxHeight = Math.max(td.height(), maxHeight);
			});

			jQuery(this).find("td:not(.name)").each(function() {
				// jQuery(this).height(maxHeight);
			});
		});
	},	
	
	linkTabs: function() {
		jQuery(".tabnav h2 a").click(function(e) {
			e.preventDefault();
			var par = jQuery(this).parent().parent();
			var container = par.parent().parent();
			
			container.find("li.active").toggleClass("active", false);
			par.toggleClass("active", true);
			
			var id = jQuery(this).attr("href");
			
			var tar = jQuery(id);
			
			var contentPar = tar.parent().parent();
			contentPar.find(".tab.active").toggleClass("active", false);
			
			tar.toggleClass("active", true);
		});
		// Check if there are tabs
		if(jQuery('.tabnav').length) {
			// Store a var
			var tabnav = jQuery('.tabnav');
			var tabcontent = jQuery('.tabcontent');
			// Check if URL has hash
			if(window.location.hash) {
			  var hash = window.location.hash;
			  // Remove all active classes from tabnav and tabcontent
			  jQuery('> li', tabnav).removeClass('active');
			  jQuery('.tab', tabcontent).removeClass('active');
			  // Add active class to tab and tabcontent that matches the hash
			  jQuery('h2 a[href="'+hash+'"]', tabnav).parent().parent().addClass('active');
			  jQuery('.tab'+hash, tabcontent).addClass('active');
			  // Get the top offset of the active tab
			 	var activePos = jQuery('li.active', tabnav).offset().top;
			 	// ...and scroll down to it
			 	jQuery(window).scrollTop(activePos);
			}
		}
	},
	
	linkExpandable: function() {
	
		// Based on Jack Moore's accordion: http://www.jacklmoore.com/notes/jquery-accordion-tutorial/

		jQuery(".expandable h3").click(function(e){
			e.preventDefault();
			jQuery(this).closest("section").find(".content").not(":animated").slideToggle();
			jQuery(this).closest("section").toggleClass("active");
			//var $clickLink = jQuery(this).closest("section").find("a").attr("id");
			//window.location.hash = $clickLink;
		});

		jQuery(".expandable h3 > a").each(function(){
			var $title = jQuery(this).html().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
			var $link = jQuery(this);
			jQuery(this).attr("id", $title);

			if(window.location.hash.substring(1) == $title) {
				jQuery($link).closest("h3").click();
				console.log("the hash is: " + $title);
			}
		});
		
	},
	
	nullAlt: function() {
		jQuery("img[alt='null'], img[alt='Null'], img[alt='NULL']").attr("alt", "");
	}
	
}

window.Core = Core;

jQuery(document).ready(function(){Core.ondomready()});

})(jQuery);
