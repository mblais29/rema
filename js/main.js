//Global Variables
var map;
var markers = [];
var jsonArr = [];
var currentBounds = "";
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
// Start/Finish icons
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
	  
	  // Hides the Form on load
	  $("#sidebar-wrapper").hide();
	  $("#sidebar-layers").hide();
	  $("#route-details").hide();
	  
	  $.ajax("../rema/php/data.php",
		{
		    type: 'GET',
		    dataType: 'json',
		    success: function (data) {
		        //console.log(data);
		        //console.log("lat: " + data[0][9]);
		        //console.log("lon: " + data[0][10]);
		        
		        
		        for (i = 0; i < data.length; i++) {
		        	var address = data[i][1];
			        var city = data[i][2];
			        var province = data[i][3];
			        var purchasePrice = data[i][4];
			        var buildingAge = data[i][5];
			        var sqft = data[i][6];
			        var type = data[i][7];
			        var comments = data[i][8];
			        var lat = data[i][9];
			        var lon = data[i][10];
			       	var myLatLong = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
				   	//MARKERS
				   	var contentString = '<div class="panel panel-info">'+
				   						  '<div class="panel-heading">'+
										    '<h3 class="panel-title">Property Info</h3>'+
										  '</div>'+
										  '<div class="panel-body">'+
										  	'<ul class="list-group">'+
											  '<li class="list-group-item">' + 'Building: ' + address + ', ' + city+  ', ' + province + '</li>'+
											  '<br><li class="list-group-item">' + 'Purchase Price: ' + purchasePrice + '</li>'+
											  '<br><li class="list-group-item">' + 'Built: ' + buildingAge + '</li>'+
											  '<br><li class="list-group-item">' + 'Area: ' + sqft + ' sqft' + '</li>'+
											  '<br><li class="list-group-item">' + 'Type: ' + type + '</li>'+
											  '<br><li class="list-group-item">' + 'Comments: ' + comments + '</li>'+
										   '</ul>'+
										  '</div>';
				  var infowindow = new google.maps.InfoWindow();	
				   			   
				  var markerProp = new google.maps.Marker({
				       position: myLatLong,
				       map: map,
				       title: "Property",
				       icon: image
				   });

				   google.maps.event.addListener(markerProp,'click', (function(markerProp,contentString,infowindow){ 
				        return function() {
				           infowindow.setContent(contentString);
				           infowindow.open(map,markerProp);
				        };
				   })(markerProp,contentString,infowindow));
				   //Hides the markers when map first loads
				   markerProp.setVisible(false);
		
				   google.maps.event.addListener(infowindow, 'domready', function() {
			
				   // Reference to the DIV which receives the contents of the infowindow using jQuery
				   var iwOuter = $('.gm-style-iw');
				
				   /* The DIV we want to change is above the .gm-style-iw DIV.
				    * So, we use jQuery and create a iwBackground variable,
				    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
				    */
				   var iwBackground = iwOuter.prev();
				
				   // Remove the background shadow DIV
				   iwBackground.children(':nth-child(2)').css({'display' : 'block'});
				
				   // Remove the white background DIV
				   iwBackground.children(':nth-child(4)').css({'display' : 'block'});
				   
				   // Moves the infowindow 115px to the right.
				   iwOuter.parent().parent().css({right: '0px'});
				   
				   iwOuter.prev().css({left: '-12px'});
				   
				   // Moves the shadow of the arrow 76px to the left margin 
					iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
					
					// Moves the arrow 76px to the left margin 
					iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
					
					iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
					
					var iwCloseBtn = iwOuter.next();

					// Apply the desired effect to the close button
					iwCloseBtn.css({
					  //opacity: '1', // by default the close button has an opacity of 0.7
					  right: '15px', top: '5px', // button repositioning
					  //width: '23px',
					  //height: '23px',
					  //border: '5px solid #bce8f1', // increasing button border and new color
					  //'border-radius': '13px', // circular effect
					  //'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
					  });
					
					// The API automatically applies 0.7 opacity to the button after the mouseout event.
					// This function reverses this event to the desired value.
					iwCloseBtn.mouseout(function(){
					  $(this).css({opacity: '1'});
					});
				});
				// Stores the marker information in an array
				markers.push(markerProp);
			  }
			  
			}
		});
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
});



