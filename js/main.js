$( document ).ready(function() {
	   var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 0.1313, lng: 50.8429},
	    mapTypeControl: true,
	    mapTypeControlOptions: {
	      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
	      mapTypeIds: [
	        google.maps.MapTypeId.ROADMAP,
	        google.maps.MapTypeId.SATELLITE,
	        google.maps.MapTypeId.TERRAIN
	      ]
	    },
	    scrollwheel: true,
	    zoom: 14
	  });
	  
	  var image = {
		  url: 'img/icons/location.png',
		  size: new google.maps.Size(71, 71),
		  origin: new google.maps.Point(0, 0),
		  anchor: new google.maps.Point(17, 34),
		  scaledSize: new google.maps.Size(50, 50)
		};
		    
	  var drawingManager = new google.maps.drawing.DrawingManager({
	    drawingMode: google.maps.drawing.OverlayType.MARKER,
	    drawingControl: true,
	    drawingControlOptions: {
	      position: google.maps.ControlPosition.TOP_CENTER,
	      drawingModes: [
	        google.maps.drawing.OverlayType.MARKER,
	        google.maps.drawing.OverlayType.CIRCLE,
	        google.maps.drawing.OverlayType.POLYGON,
	        google.maps.drawing.OverlayType.POLYLINE,
	        google.maps.drawing.OverlayType.RECTANGLE
	      ]
	    },
	    
	    markerOptions: {icon: image},
	    circleOptions: {
	      fillColor: '#ff0000',
	      fillOpacity: 0.5,
	      strokeWeight: 5,
	      clickable: true,
	      editable: true,
	      zIndex: 1
	    }
	  });
	  drawingManager.setMap(map);
	  //Adds an event listener when marker is right clicked object will be removed
	  google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
	  	console.log(marker);
	  	marker.addListener('rightclick', function() {
    		marker.setMap(null);
  		});
	  });
	  //Adds an event listener when marker is right clicked object will be removed
	  google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
	  	console.log(circle);
	  	circle.addListener('rightclick', function() {
    		circle.setMap(null);
  		});
	  });
	  

	  
	  //Creates an info window showing the current position
	  var infoWindow = new google.maps.InfoWindow({map: map});
	
	  // Try HTML5 geolocation.
	  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      var pos = {
		        lat: position.coords.latitude,
		        lng: position.coords.longitude
		      };
		      infoWindow.setPosition(pos);
		      infoWindow.setContent('Location found.');
		      map.setCenter(pos);
		    });	
		}
		
	
});

