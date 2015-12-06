$( document ).ready(function() {
	//Global Variables
	var marker = google.maps.drawing.OverlayType.MARKER;
	var circle = google.maps.drawing.OverlayType.CIRCLE;
	var polygon = google.maps.drawing.OverlayType.POLYGON;
	var polyline = google.maps.drawing.OverlayType.POLYLINE;
	var rectangle = google.maps.drawing.OverlayType.RECTANGLE;

	
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
	        marker,
			circle,
			polygon,
			polyline,
			rectangle
	      ]
	    },
	    
	    markerOptions: {
	    	icon: image
	    },
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
  	  
  	  // Creates an event listener once drawing is complete adds 'rightclick' delete function to the object drawn
	  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
	  	console.log(event);
   		var drawingObject = event.type;
   		google.maps.event.addListener(drawingManager, drawingObject + 'complete', function(drawingObject) {
		  	drawingObject.addListener('rightclick', function(){
		  		drawingObject.setMap(null);	  		
		  	});
		  	
		  	switch(event.type){
		  		case 'marker':
		  			alert("You just created a marker");
		  			console.log(event.overlay.position.lat());
					console.log(event.overlay.position.lng());
		  			break;
		  		case 'circle':
		  			alert("You just created a circle");
					console.log(event.overlay.getRadius());
					console.log(event.overlay.getCenter().lat());
					console.log(event.overlay.getCenter().lng());
					
		  			break;
		  		case 'polygon':
		  			alert("You just created a polygon");
		  			var polygonVertices = event.overlay.getPath();
		  			var contentString = "";
				  	// Iterate over the vertices.
				  	for (var i =0; i < polygonVertices.getLength(); i++) {
				    	var latLng = polygonVertices.getAt(i);
				    	contentString += 'Coordinate ' + i + ' (' + 'Lat: ' + latLng.lat() + ',' + 'Lng: ' + latLng.lng() + ')';
				  	}
				  	console.log('LatLng: ' + contentString);
		  			break;
		  		case 'polyline':
		  			alert("You just created a polyline");
		  			var polylineVertices = event.overlay.getPath();
		  			var contentString = "";
				  	// Iterate over the vertices.
				  	for (var i =0; i < polylineVertices.getLength(); i++) {
				    	var latLng = polylineVertices.getAt(i);
				    	contentString += 'Coordinate ' + i + ' (' + 'Lat: ' + latLng.lat() + ',' + 'Lng: ' + latLng.lng() + ')';
				  	}
				  	console.log('LatLng: ' + contentString);
		  			break;
		  		case 'rectangle':
		  			alert("You just created a rectangle");
		  			console.log(event.overlay.getBounds().getNorthEast());
		  			console.log(event.overlay.getBounds().getSouthWest());
		  			var neCoord = event.overlay.getBounds().getNorthEast();
		  			var swCoord = event.overlay.getBounds().getSouthWest();
		  			console.log(neCoord.lat() + ',' + neCoord.lng());
		  			console.log(swCoord.lat() + ',' + swCoord.lng());
		  			break;
		  	}
		  	
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

