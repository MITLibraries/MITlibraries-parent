(function($){

var Core = {
	ondomready: function(){
		Core.linkExpandable();
		Core.linkTabs();
		Core.nullAlt();
		Core.buildHours();
		$(window).resize(function() {
			Core.handleResize();
		});
		Core.handleResize();
	},
	
	handleResize: function() {
		Core.fixMobileSizes();
	},
	
	fixMobileSizes: function() {

		$(".mobileToday").each(function() {
			console.log($(this).html());
			var par = $(this).parent();
			console.log(par.height());
			$(this).height(par.height()+5);
		});	
		
		$(".hrList tbody tr").each(function() {
			var maxHeight = 0;
			$(this).find("td:not(.name)").each(function() {
				var td = $(this);
				maxHeight = Math.max(td.height(), maxHeight);
			});

			$(this).find("td:not(.name)").each(function() {
				$(this).height(maxHeight);
			});
		});
	},	
	
	linkTabs: function() {
		$(".tabnav h2 a").click(function(e) {
			e.preventDefault();
			var par = $(this).parent().parent();
			var container = par.parent().parent();
			
			container.find("li.active").toggleClass("active", false);
			par.toggleClass("active", true);
			
			var id = $(this).attr("href");
			
			var tar = $(id);
			
			var contentPar = tar.parent().parent();
			contentPar.find(".tab.active").toggleClass("active", false);
			
			tar.toggleClass("active", true);
		});
	},
	
	linkExpandable: function() {
	
		// Based on Jack Moore's accordion: http://www.jacklmoore.com/notes/jquery-accordion-tutorial/

		$(".expandable h3").click(function(e){
			e.preventDefault();
			$(this).closest("section").find(".content").not(":animated").slideToggle();
			$(this).closest("section").toggleClass("active");
			//var $clickLink = $(this).closest("section").find("a").attr("id");
			//window.location.hash = $clickLink;
		});

		$(".expandable h3 > a").each(function(){
			var $title = $(this).html().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
			var $link = $(this);
			$(this).attr("id", $title);

			if(window.location.hash.substring(1) == $title) {
				$($link).closest("h3").click();
				console.log("the hash is: " + $title);
			}
		});
		
	},
	
	nullAlt: function() {
		$("img[alt='null'], img[alt='Null'], img[alt='NULL']").attr("alt", "");
	},

	findToday: function(testDay) {
		var today, d, m, yyyy;
		if (!testDay) {
			today = new Date();
			d = today.getDate();
			m = today.getMonth() + 1;
			yyyy = today.getFullYear();
			today = m + "/" + d + "/" + yyyy;
		} else {
			today = testDay;
		}
		return today;
	},

	buildHours: function() {
		var loc, name, thisDay, msg;
		loc = $('[data-location-hours]');
		msg = "unavailable";
		$.ajax({
			cache: false,
			url: "/wp-content/themes/libraries/hours.json",
			dataType: "json"
		})
			.done(function (json) {
				$.each(loc, function() {
					// get the name of this library
					name = $(this).data("location-hours");
					// look up that library's hours in JSON
					// thisDay = '1/1/1970';
					thisDay = Core.findToday(thisDay);
					if (json[name] && json[name].hours[thisDay]) {
						$(this).text(json[name].hours[thisDay].replace(/:00/g,""));
					} else {
						$(this).html(msg);
					}
				});
			})
			.fail(function (textStatus, error) {
				var err = textStatus + ", " + error;
				console.log("Hours lookup failed: " + err);
				$.each(loc, function() {
					$(this).html(msg);
				});
			});
	}
	
}

window.Core = Core;

$(document).ready(function(){Core.ondomready()});

})(jQuery);
