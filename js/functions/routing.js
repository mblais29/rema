function routing(routeControlDiv, map){ 
  // Set CSS for the routing control border.
  var routeControlUI = document.createElement('div');
  routeControlUI.style.backgroundColor = '#fff';
  routeControlUI.style.border = '2px solid #fff';
  routeControlUI.style.borderRadius = '3px';
  routeControlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  routeControlUI.style.cursor = 'pointer';
  routeControlUI.style.marginBottom = '22px';
  routeControlUI.style.textAlign = 'center';
  routeControlUI.title = 'Click for Route';
  routeControlDiv.appendChild(routeControlUI);

  // Set CSS for the routing control interior.
  var routeControlText = document.createElement('div');
  routeControlText.style.color = 'rgb(25,25,25)';
  routeControlText.style.fontSize = '16px';
  routeControlText.style.paddingLeft = '2px';
  routeControlText.style.paddingRight = '2px';
  routeControlText.innerHTML = '<i class="fa fa-road fa-2x"></i>';
  routeControlUI.appendChild(routeControlText);
  
  routeControlUI.addEventListener('click', function() {
  	//Makes the cursor a pointer 
	document.getElementById("map").firstChild.firstChild.style.cursor = "default";
	alert('Click map for a starting point!');
  	var getOrigin = google.maps.event.addListener(map, 'click', function(event) {
		//console.log(event.latLng.lat());
		//console.log(event.latLng.lng());
		//document.getElementById('route').innerHTML = "Lat: " + event.latLng.lat() + "Lng: " + event.latLng.lng();
		originLatLng = event.latLng;
		google.maps.event.removeListener(getOrigin);
		originMarker = new google.maps.Marker({position: originLatLng, map: map});
		destCoord();
	});
  });
}


function destCoord(){
	//Makes the cursor a pointer 
	document.getElementById("map").firstChild.firstChild.style.cursor = "default";
	alert('Click map for an ending point!');
	
	var getDest = google.maps.event.addListener(map, 'click', function(event) {
		//console.log(event.latLng.lat());
		//console.log(event.latLng.lng());
		destinationLatLng = event.latLng;
		//Creates the remove and details buttons once route is found
		document.getElementById('route').innerHTML = "<button type='button' id='removeButton' class='btn btn-default' onclick='closeRoute(routeMarkers)'>Remove</button><button type='button' id='details' class='btn btn-default' onclick='showRouteDetails(directionsDisplay)'>Details</button>";
		google.maps.event.removeListener(getDest);
		destMarker = new google.maps.Marker({position: destinationLatLng, map: map});

		directionsDisplay.setMap(map);
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	    document.getElementById('mode').addEventListener('change', function() {
	      calculateAndDisplayRoute(directionsService, directionsDisplay);     
	    });
	    //Shows the remove and details buttons
	    $("#route").show('slow');
	    //Sets the Markers to null so if a users creates another route the markers do not duplicate
	    originMarker.setMap(null);	
	    destMarker.setMap(null);

	});	
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {

	//deletes old routes and Markers if there are records in the array
	if(routeMarkers.length > 0){
		for(i=0; i<routeMarkers.length; i++){
	        routeMarkers[i].setMap(null);
	    }
	}
	//Gives the user the option to select the type of travel mode 
  	var selectedMode = document.getElementById('mode').value;
  	directionsService.route({
	    origin: originLatLng,
	    destination: destinationLatLng,
	    travelMode: google.maps.TravelMode[selectedMode]
	  }, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	      var leg = response.routes[ 0 ].legs[ 0 ];
		  makeRoutingMarkers( leg.start_location, icons.start);
		  makeRoutingMarkers( leg.end_location, icons.end);
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	});
}


function showRouteDetails(directionsDisplay){
	//Shows the route div and adds the directions to that div
	$("#route-details").show();
	directionsDisplay.setPanel(document.getElementById('route-details'));
}

function closeRoute(routeMarkers){
	//sets the directionsDisplay to null and re-creates so previous routes don't show while calculating new route
	directionsDisplay.setMap(null);
	directionsDisplay = null;
	directionsDisplay = new google.maps.DirectionsRenderer({
		suppressMarkers: true,
	    draggable: true,
	    map: map
	});
	//Hides the Remove and Details Buttons
	$('#route').hide('slow');
	//Sets the route markers to null -- deletes them
	originMarker = "";
	destMarker = "";
	//hides the routing details
	$("#route-details").hide('slow');
	document.getElementById('route').innerHTML = "";
	document.getElementById('route-details').innerHTML = "";
	//Deletes all markers in routMarkers Array
	for(i=0; i<routeMarkers.length; i++){
        routeMarkers[i].setMap(null);
    }
}

function makeRoutingMarkers( position, icon ) {
 var marker = new google.maps.Marker({
  position: position,
  map: map,
  icon: icon
 });
 routeMarkers.push(marker); 
}

