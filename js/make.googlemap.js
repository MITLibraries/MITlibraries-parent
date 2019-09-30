jQuery(function(){

	jQuery(function(buildMarkers) {
		jQuery("#mapMarkers .location").each(function() {
			var name = jQuery(this).find(".name").html();
			name = name.replace("&amp;", "&");
			var lat = parseFloat(jQuery(this).find(".lat").html());
			var lng = parseFloat(jQuery(this).find(".lng").html());
			var description = jQuery(this).find(".description").html();
			var id = jQuery(this).find(".id").html();
			
			var latlng = new google.maps.LatLng(lat, lng);
			//var latlng = new google.maps.LatLng(42.358330, -71.093173)
			
			var infowindow = new google.maps.InfoWindow({
				
			});
			
			var infoBox = new InfoBox({
				content: description,
				disableAutoPan: false,
				maxWidth: 280,
				pixelOffset: new google.maps.Size(-140,-181),
				boxStyle: {
					//background: 'url(http://mitlibraries.seangw.com/wp-content/themes/libraries/images/infobox.png)',
					opacity: 1,
					
					//width: "280px",
					//height: "180px",
				},
				closeBoxURL: mapIconBase + "close-sfw.gif",
				closeBoxMargin: "4px 4px 4px 4px",
				infoBoxClearance: new google.maps.Size(1,1),
				isHidden: false,
				pane: "floatPane",
				enableEventPropagation: false
			});
			
			var activeMarker = new google.maps.MarkerImage(mapIconBase + 'map-marker-active.png');

			var defaultMarker = new google.maps.MarkerImage(mapIconBase + 'map-marker-default.png');
			
			
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				icon: defaultMarker,
				html: description,
				id: id,
				title: name
			});
			
			google.maps.event.addListener(marker, "click", function () {
				for (var i=0; i<arMarkers.length; i++) {
					arMarkers[i].setIcon(defaultMarker);
					}
					this.setIcon(activeMarker);
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				//infowindow.setContent(this.html);
				//infowindow.open(map,marker);
				
				if (lastMarker != "")
					lastMarker.close();
				lastMarker = infoBox;
				infoBox.open(map, marker);
				
			});
			
			google.maps.event.addListener(map, 'click', function() {
				if(infoBox) {
					infoBox.close();
					marker.setIcon(defaultMarker);
				}					
			});
			
			google.maps.event.addListener(infoBox, "closeclick", function() {
				marker.setIcon(defaultMarker);
			});
			
			arMarkers.push(marker);
		});
	});

		jQuery(function(initMap) {
		var canvas = document.getElementById('map');
		var opts = {
			center: new google.maps.LatLng(42.35978069999999, -71.09360909999998),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(canvas, opts);
		needMap = 0;		
		
		buildMarkers();
		
		google.maps.event.addListener(map, 'idle', function() { // remove .gm-style added by GMAPs API
    		jQuery('.gm-style').removeClass('gm-style');
		});
		
	});

	jQuery(function(buildMap) {
		jQuery(".map").click(function(e) {
			//e.preventDefault();
			var stage = jQuery("#stage");
			if (needMap) initMap();

			if (stage.hasClass("activeMap")) {
				// map open
			} else {
				// open map
				jQuery("#showMap").click();
			}
			
			var id = jQuery(this).attr("data-target");
			
			
			for(i=0;i<arMarkers.length;i++) {
				var marker = arMarkers[i];
				
				if (marker.id == id) {
					focusMarker = marker;
					map.panTo(marker.getPosition());
					google.maps.event.trigger(marker, "click");
					
				}
			}

			
			jQuery("html, body").animate({scrollTop: 0}, 500);
			


			
			
			
		});
	});

			jQuery(function(showMap) {
		jQuery("#map").slideDown(200, function() {
			google.maps.event.trigger(map, 'resize');
		});
	});
	
	jQuery(function(hideMap) {
		jQuery("#map").slideUp(200);
	});
		
		jQuery("#showMap").click(function(e) {
			e.preventDefault();
			if (needMap) initMap();
			
			if (jQuery(this).hasClass("btn-warning")) {
				jQuery(this).toggleClass("btn-warning", false);
				jQuery(this).html("Hide map");
				jQuery("#stage").toggleClass("activeMap", true);
				showMap();
				location.hash = "!map";
				

				
			} else {
				jQuery(this).toggleClass("btn-warning", true);
				jQuery(this).html("Show map");
				jQuery("#stage").toggleClass("activeMap", false);
				hideMap();
				// reset hash
				location.hash = "!";
			}
		});
		
		
		if (showMap) {
			jQuery("#showMap").click();
		}
		
		var hash = location.hash.substr(2);
		if (hash != "") {
			if (hash == "map") {
				jQuery("#showMap").click();
			} else {
				jQuery("a[href='#!"+hash+"']").click();
			}
		}

});