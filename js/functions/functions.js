function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click for Layers';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontSize = '16px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<i class="fa fa-bars fa-2x"></i>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
  	//alert("Button has been clicked");
  	$("#sidebar-layers").show('slow');
    //map.setCenter(chicago);
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

function addInfoWindow(data){
	console.log(data);
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
		      	return ({
				      fillColor: color,
				      strokeColor: color,
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