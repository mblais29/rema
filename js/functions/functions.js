function CenterControl(layerControlDiv, map) {
  // Set CSS for the control border.
  var layerControlUI = document.createElement('div');
  layerControlUI.style.backgroundColor = '#fff';
  layerControlUI.style.border = '2px solid #fff';
  layerControlUI.style.borderRadius = '3px';
  layerControlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  layerControlUI.style.cursor = 'pointer';
  layerControlUI.style.marginBottom = '22px';
  layerControlUI.style.textAlign = 'center';
  layerControlUI.title = 'Click for Layers';
  layerControlDiv.appendChild(layerControlUI);

  // Set CSS for the control interior.
  var layerControlText = document.createElement('div');
  layerControlText.style.color = 'rgb(25,25,25)';
  layerControlText.style.fontSize = '16px';
  layerControlText.style.paddingLeft = '5px';
  layerControlText.style.paddingRight = '5px';
  layerControlText.innerHTML = '<i class="fa fa-bars fa-2x"></i>';
  layerControlUI.appendChild(layerControlText);

  // Setup the click event listeners
  layerControlUI.addEventListener('click', function() {
  	$("#sidebar-layers").show('slow');
  });
}

function routing(routeControlDiv, map){ 
  // Set CSS for the control border.
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

  // Set CSS for the control interior.
  var routeControlText = document.createElement('div');
  routeControlText.style.color = 'rgb(25,25,25)';
  routeControlText.style.fontSize = '16px';
  routeControlText.style.paddingLeft = '2px';
  routeControlText.style.paddingRight = '2px';
  routeControlText.innerHTML = '<i class="fa fa-road fa-2x"></i>';
  routeControlUI.appendChild(routeControlText);
  
  routeControlUI.addEventListener('click', function() {
  	$("#route").show('slow');
  	
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

// Creates an event listener for the Property marker checkbox
function getMarkers(){
	$("#markerCheckbox").unbind('change');
   	$('#markerCheckbox').change(
    function(){
        if (this.checked) {
            //alert('checked');
            //console.log(markers);
            // Loops through markers and sets invisibility to true shows the markers
            for(var i=0; i<markers.length; i++){
		        markers[i].setVisible(true);
		    }
        }else{
        	//alert('not checked');
        	// Loops through markers and sets invisibility to false hides the markers
        	for(var i=0; i<markers.length; i++){
		        markers[i].setVisible(false);
		    }
        }
    });
}

function destCoord(){
	var getDest = google.maps.event.addListener(map, 'click', function(event) {
		//console.log(event.latLng.lat());
		//console.log(event.latLng.lng());
		
		destinationLatLng = event.latLng;
		document.getElementById('route').innerHTML = "Origin: " + originLatLng + "<br/>"  + "Destination: " + destinationLatLng + "<br/>"  + "<button type='button' class='btn btn-default' onclick='directionsDisplay.setMap(null)'>Remove</button>";
		google.maps.event.removeListener(getDest);
		destMarker = new google.maps.Marker({position: destinationLatLng, map: map});
		console.log(originLatLng + "/" + destinationLatLng );
		
		
		directionsDisplay.setMap(map);
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	    document.getElementById('mode').addEventListener('change', function() {
	      calculateAndDisplayRoute(directionsService, directionsDisplay);
	    });
	    originMarker.setMap(null);	
	    destMarker.setMap(null);	

	});	
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: originLatLng,  // Haight.
    destination: destinationLatLng,  // Ocean Beach.
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


function addInfoWindow(data){
	//console.log(data);
	map.data.addListener('mouseover', function(event) {
		document.getElementById('info-box').style.display = "block";
	    document.getElementById('info-box').textContent =
	        event.feature.getProperty('name').toUpperCase();
	  });
	  map.data.addListener('mouseout', function(event) {
	  	document.getElementById('info-box').style.display = "none";
	    document.getElementById('info-box').textContent =
	        "";
	  });
}

function layerRefresh(feature, layer, url, thisCheckbox){
	console.log(layer);
	var selectedLayer = layer.name;
	//console.log(selectedLayer);
	map.data.forEach(function(feature) {
		//filter removes selected layer
   		if (feature.getProperty('category') == selectedLayer) {
        	map.data.remove(feature);
    	}
	});
	var sw = map.getBounds().getSouthWest().lng() + ',' + map.getBounds().getSouthWest().lat();
	var ne = map.getBounds().getNorthEast().lng() + ',' + map.getBounds().getNorthEast().lat();
	//console.log(jsonArr[i]);
	features = [];
	if($(thisCheckbox).is(':checked')){
		$.ajax({
	     	url: url + '&bbox=' + sw + ',' + ne,
	     	dataType: 'json',
	     	contentType: 'application/json',
	     	timeout: 15000,
	     	success: function(data) {
	 			styleLayer(data);
	 			addInfoWindow(data);
	 			features = map.data.addGeoJson(data);
				
				
		    }
		}).fail(function (jqXHR, textStatus, errorThrown) {
			alert("Error processing your request");
			console.log(jqXHR);
			console.log(textStatus);
		    console.log(errorThrown);
		});
	}
}

function addGeoJsonLayers(layers, sw, ne){
	$.ajax({
     	url: layers.url + '&bbox=' + sw + ',' + ne,
     	dataType: 'json',
     	contentType: 'application/json',
     	timeout: 15000,
     	success: function(data) {
 			styleLayer(data);
 			addInfoWindow(data);
			features = map.data.addGeoJson(data);
			console.log(features.length);
			
	    }
	}).fail(function (jqXHR, textStatus, errorThrown) {
		alert("Error processing your request");
		console.log(jqXHR);
		console.log(textStatus);
	    console.log(errorThrown);
	});
}

function styleLayer(data){
	map.data.setStyle(function(feature) {
		switch(feature.getGeometry().getType()) {
		    case 'Point':
		          var icon = 'img/icons/' + feature.getProperty('category') + '.png';
			      var name = feature.getProperty('name');
			      return {
			      	icon: icon,
			      	clickable: true,
			      	title: name
			      };
		        break;
		    case 'MultiPolygon':
		        var color = feature.getProperty('fillcolor');
		        var name = feature.getProperty('name');
		        var opacity = feature.getProperty('fillopacit');
		      	return ({
				      fillColor: color,
				      strokeColor: color,
				      fillOpacity: opacity,
				      strokeWeight: 2
				    });
		        break;
		    case 'MultiLineString':
		        var color = feature.getProperty('color');
		        var name = feature.getProperty('name');
		      	return ({
				      strokeColor: color,
				      strokeOpacity: 0.6,
				      strokeWeight: 2
				    });
		        break;
		}
	});
}
					    
function hideForm(){
	$("#sidebar-wrapper").hide("slow");
	$("#sidebar-layers").hide("slow");
}

function getMarkerCoords(event){
	console.log(event.overlay.position.lat());
	console.log(event.overlay.position.lng());
	var latitude = event.overlay.position.lat();
	var longitude = event.overlay.position.lng();
	var inputLat = document.getElementById("lat");
	inputLat.value = latitude;
	var inputLon = document.getElementById("lon");
	inputLon.value = longitude;
	//Opens the form when marker is placed
	$("#sidebar-wrapper").show("slow");
}

function getCircleCoords(event){
	console.log(event.overlay.getRadius());
	console.log(event.overlay.getCenter().lat());
	console.log(event.overlay.getCenter().lng());
}

/*
function getPolygonCoords(event){
	var polygonVertices = event.overlay.getPath();
	var contentString = "";
  	// Iterate over the vertices.
  	for (var i =0; i < polygonVertices.getLength(); i++) {
    	var latLng = polygonVertices.getAt(i);
    	contentString += 'Coordinate ' + i + ' (' + 'Lat: ' + latLng.lat() + ',' + 'Lng: ' + latLng.lng() + ')';
  	}
  	console.log('LatLng: ' + contentString);
}

function getPolylineCoords(event){
	var polylineVertices = event.overlay.getPath();
	var contentString = "";
  	// Iterate over the vertices.
  	for (var i =0; i < polylineVertices.getLength(); i++) {
    	var latLng = polylineVertices.getAt(i);
    	contentString += 'Coordinate ' + i + ' (' + 'Lat: ' + latLng.lat() + ',' + 'Lng: ' + latLng.lng() + ')';
  	}
  	console.log('LatLng: ' + contentString);
}

function getRectangleCoords(event){
	console.log(event.overlay.getBounds().getNorthEast());
	console.log(event.overlay.getBounds().getSouthWest());
	var neCoord = event.overlay.getBounds().getNorthEast();
	var swCoord = event.overlay.getBounds().getSouthWest();
	console.log(neCoord.lat() + ',' + neCoord.lng());
	console.log(swCoord.lat() + ',' + swCoord.lng());
	
}
*/