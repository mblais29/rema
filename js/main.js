$( document ).ready(function() {
	//Global Variables
	var marker = google.maps.drawing.OverlayType.MARKER;
	var circle = google.maps.drawing.OverlayType.CIRCLE;
	var polygon = google.maps.drawing.OverlayType.POLYGON;
	var polyline = google.maps.drawing.OverlayType.POLYLINE;
	var rectangle = google.maps.drawing.OverlayType.RECTANGLE;

	//Create the Map
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
  	  
  	  //Use Custom Icon for Marker
	  var image = {
		  url: 'img/icons/location.png',
		  size: new google.maps.Size(71, 71),
		  origin: new google.maps.Point(0, 0),
		  anchor: new google.maps.Point(17, 34),
		  scaledSize: new google.maps.Size(50, 50)
		};
	  
	  //Creates the Drawing Manager, uncomment to add polygon, polyline, or rectangle  
	  var drawingManager = new google.maps.drawing.DrawingManager({
	    drawingMode: google.maps.drawing.OverlayType.MARKER,
	    drawingControl: true,
	    drawingControlOptions: {
	      position: google.maps.ControlPosition.TOP_CENTER,
	      drawingModes: [
	        marker,
			circle
			/*polygon,
			polyline,
			rectangle*/
	      ]
	    },
	    
	    markerOptions: {
	    	icon: image,
	    	draggable: true
	    },
	    circleOptions: {
	      fillColor: '#1CA2EF',
	      fillOpacity: 0.5,
	      strokeWeight: 3,
	      clickable: true,
	      editable: true,
	      zIndex: 1
	    }
	    /*polygonOptions: {
	      fillColor: '#1CA2EF',
	      fillOpacity: 0.5,
	      strokeWeight: 3,
	      clickable: true,
	      editable: true,
	      zIndex: 1
	    },
	    rectangleOptions: {
	      fillColor: '#1CA2EF',
	      fillOpacity: 0.5,
	      strokeWeight: 3,
	      clickable: true,
	      editable: true,
	      zIndex: 1
	    }*/
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
		  	//Marker event listener
		  	drawingObject.addListener('dragend', function(){
		  		console.log(event.overlay.position.lat());
				console.log(event.overlay.position.lng());
				getMarkerCoords(event);  		
		  	});
		  	//Circle event Listener
		  	drawingObject.addListener('center_changed', function() {
            	console.log(event.overlay.getRadius());
				console.log(event.overlay.getCenter().lat());
				console.log(event.overlay.getCenter().lng());
	        });
	        drawingObject.addListener('radius_changed', function() {
            	console.log(event.overlay.getRadius());
				console.log(event.overlay.getCenter().lat());
				console.log(event.overlay.getCenter().lng());
	        });
	        
		  	switch(event.type){
		  		case 'marker':
			        getMarkerCoords(event);
		  			//alert("You just created a marker");
		  			break;
		  		case 'circle':
		  			alert("You just created a circle");
					getCircleCoords(event);
		  			break;
		  		/*case 'polygon':
		  			alert("You just created a polygon");
		  			getPolygonCoords(event);
		  			break;
		  		case 'polyline':
		  			alert("You just created a polyline");
		  			getPolylineCoords(event);
		  			break;
		  		case 'rectangle':
		  			alert("You just created a rectangle");
		  			getRectangleCoords(event);
		  			break;*/
		  	}
		  	
		});
	  });

	  //Creates an info window showing the current position
	  //var infoWindow = new google.maps.InfoWindow({map: map});
	
	  // Try HTML5 geolocation.
	  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      var pos = {
		        lat: position.coords.latitude,
		        lng: position.coords.longitude
		      };
		      //infoWindow.setPosition(pos);
		      //infoWindow.setContent('Location found.');
		      map.setCenter(pos);
		    });	
		}
		
	  // Create the DIV to hold the control and call the CenterControl() constructor
	  // passing in this DIV.
	  var centerControlDiv = document.createElement('div');
	  centerControlDiv.id = 'toggleControl';
	  var centerControl = new CenterControl(centerControlDiv, map);
	
	  centerControlDiv.index = 1;
	  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
	  
	  // Hides the Form on load
	  $("#sidebar-wrapper").hide();
	
});

