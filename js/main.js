//Global Variables
var map;
var markers = [];
var jsonArr = [];
var currentBounds = "";
var propMarkers = [];
var selectedPropMarkerLat = "";
var selectedPropMarkerLon = "";
//Layer Global Variables
var layers = [];
var layerTree = [];
var topLevelcheckBox;
var midLevelCheckBox;
var featureInfoWindow = new google.maps.InfoWindow();

// Routing Global Variables
var originLatLng = "";
var destinationLatLng = "";
var originMarker;
var destMarker;
var routeMarkers = [];
var directionsDisplay = new google.maps.DirectionsRenderer({
	suppressMarkers: true,
    draggable: true,
    map: map
  });
var directionsService = new google.maps.DirectionsService;
// Start/Finish icons for routing
var icons = {
  start: new google.maps.MarkerImage(
   // URL
   'img/icons/start.png',
   // (width,height)
   new google.maps.Size( 30, 50 ),
   // The origin point (x,y)
   new google.maps.Point( 0, 0 )
   // The anchor point (x,y)
   //new google.maps.Point( 22, 32 )
  ),
  end: new google.maps.MarkerImage(
   // URL
   'img/icons/end.png',
   // (width,height)
   new google.maps.Size( 30, 50 ),
   // The origin point (x,y)
   new google.maps.Point( 0, 0 )
   // The anchor point (x,y)
   //new google.maps.Point( 22, 32 )
  )
 };

$( document ).ready(function() {
	
	$('#wrapper').css("visibility", "hidden");
	// Hides the Form on load
    $("#route-details").hide();
    
	var drawMarker = google.maps.drawing.OverlayType.MARKER;
	var circle = google.maps.drawing.OverlayType.CIRCLE;
	var polygon = google.maps.drawing.OverlayType.POLYGON;
	var polyline = google.maps.drawing.OverlayType.POLYLINE;
	var rectangle = google.maps.drawing.OverlayType.RECTANGLE;
		
	//Create the Map
   	map = new google.maps.Map(document.getElementById('map'), {
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
	    drawingMode: null,
	    drawingControl: true,
	    drawingControlOptions: {
	      position: google.maps.ControlPosition.TOP_CENTER,
	      drawingModes: [
	        drawMarker,
			circle
			/*polygon,
			polyline,
			rectangle*/
	      ],
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

	  // HTML5 geolocation.
	  /*if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      var pos = {
		        lat: position.coords.latitude,
		        lng: position.coords.longitude
		      };
		      map.setCenter(pos);
		    });	
		}*/
		
	  //Creates the top right layer and routing divs
	  var layerControlDiv = document.createElement('div');
	  layerControlDiv.id = 'toggleControl';
	  var layerControl = new CenterControl(layerControlDiv, map);
		
	  layerControlDiv.index = 1;
	  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(layerControlDiv);
	  
	  var routeControlDiv = document.createElement('div');
	  routeControlDiv.id = 'routetoggleControl';
	  var routeControl = new routing(routeControlDiv, map);
		
	  routeControlDiv.index = 1;
	  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(routeControlDiv);
	  
	  
		//Get Layers
		function getLayers(){
			$.ajax({
	            url: "../rema/php/layers.php",
	            dataType: 'json',
	            contentType: 'application/json',
	            success: function (data) {
	            	//console.log(data);
	            	for (i = 0; i < data.length; i++) {
	    				var record = {
	    					"country": data[i][5], 
							"province": data[i][6]
							};
	    				var JSONrecord = JSON.stringify(record);
	    				//Checks to see if record is already in the array
	    				if($.inArray(JSONrecord, layerTree) !== -1){
	    					//console.log("Record " + JSONrecord + " already Exists");
	    				}else{
	    					layerTree.push(JSONrecord);
	    				}
	            	}
	            	addTopLayerTree(layerTree);
	            	addLayers(data);	            	
	            }
	        });	
		}
	
	getLayers();
	getPropertyMarkers();	
});


window.onload = function(){
	var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
	map.fitBounds(bounds);
	$('#loading').hide();
	$('#wrapper').css("visibility", "visible");
};



