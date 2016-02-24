function CenterControl(layerControlDiv, map) {
  // Set CSS for the layer control border.
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

  // Set CSS for the layer control interior.
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

function addTopLayerTree(layerTree){
	for(var i=0; i<layerTree.length; i++){
		var result = JSON.parse(layerTree[i]);
		//console.log(result['country']);
		var topLevelId = "topLevel" + result['country'];
		//If the toplevel id does not exist it will create the toplevel layer tree
		if(document.getElementById("topLevel" + result['country']) === null)
		{
			$('#sidebar-layers').append('<div id="topLevel' + result['country'] + '" ><i class="fa fa-plus" style="margin-left:2px; color: #fff"></i><input type="checkbox" class="layerTreeTop" id="layerTreeTop' + result['country'] + '"/><h3 class="sidebar-layers-label">' + result['country'] + '</h3></div>');
		}
		
		$('#topLevel' + result['country']).append('<div id="midLevel' + result['province'] + '" ><i class="fa fa-plus" id="midfa" style="margin-left:2px; color: #fff"></i><input type="checkbox" class="layerTreeMid" id="layerTreeMid' + result['province'] + '"/><h3 class="sidebar-layers-label">' + result['province'] + '</h3></div>');	
		topLevelcheckBox = $('#layerTreeTop' + result['country']);
		midLevelCheckBox = result['province'];
		attachTopLayerListener(topLevelcheckBox, midLevelCheckBox, topLevelId);
	}
}

function attachTopLayerListener(topLevelcheckBox, midLevelCheckBox, topLevelId){
	console.log('#midLevel' + midLevelCheckBox);
	$(topLevelcheckBox).change(function () {
		//console.log(topLevelcheckBox);
		var checked = $(topLevelcheckBox).is(':checked');
		if(checked){
			//console.log("Checked");
			$('#midLevel' + midLevelCheckBox).show();
			$("#" + topLevelId).children(":nth-child(1)").removeClass("fa fa-plus");
			$("#" + topLevelId).children(":nth-child(1)").addClass("fa fa-minus");
		}else{
			//console.log("Not Checked");
			$("#" + topLevelId).children(":nth-child(1)").removeClass("fa fa-minus");
			$("#" + topLevelId).children(":nth-child(1)").addClass("fa fa-plus");
			$('#midLevel' + midLevelCheckBox).hide();
		}
	});
	attachMidLayerListener(midLevelCheckBox);
}

function attachMidLayerListener(midLevelCheckBox){
	
	$('#layerTreeMid' + midLevelCheckBox).change(function () {
		var currentMidLevelDiv = $('#layerTreeMid' + midLevelCheckBox);
		console.log($(currentMidLevelDiv));
		var checked = $(currentMidLevelDiv).is(':checked');
		if(checked){
			console.log("Checked");
			console.log($('#midLevel' + midLevelCheckBox).children('div'));
			$('#midLevel' + midLevelCheckBox).children('div').show();
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").removeClass("fa fa-plus");
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").addClass("fa fa-minus");
		}else{
			console.log("Not Checked");
			$('#midLevel' + midLevelCheckBox).children('div').hide();
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").removeClass("fa fa-minus");
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").addClass("fa fa-plus");
		}
	});
	

}

function addLayers(data){
	//console.log(data[0][6]);
	for (i = 0; i < data.length; i++) {
		var currentDiv = $('layer'+ i);
		$('#midLevel' + data[i][6]).append('<div id="layer'+ i +'" class="checkbox" />');
		$('#layer'+ i).append('<label id="label'+ i +'">');
		$('#label'+ i).append('<input type="checkbox" id="checkbox'+ i +'" /><img src="img/icons/' + data[i][3] + '.png' + '" style="width: 20px; height: auto" /><h3 class="sidebar-layers-label">' + data[i][1] + '</h3>');

		var thisCheckbox = document.getElementById("checkbox"+ i);
		jsonArr.push({
	        id: i,
	        url: data[i][4],
	        icon: 'img/icons/' + data[i][3] + '.png',
	        layer: 'layer'+ i,
	        name: data[i][3],
	        tiled: data[i][7],
	    });
	    attachChangeListener(thisCheckbox,i);
	    $('#midLevel' + data[i][6]).hide();
	    $('#layer'+ i).hide();
	}
	
}

//Add the event listener to each newly created checkbox
function attachChangeListener(thisCheckbox,i) {
	    $(thisCheckbox).change(function () {
	    	var checked = $(this).is(':checked');
	    	console.log(checked);
	    	layers = jsonArr[i];
	    	if (checked) {
	    		var sw = map.getBounds().getSouthWest().lng() + ',' + map.getBounds().getSouthWest().lat();
	    		var ne = map.getBounds().getNorthEast().lng() + ',' + map.getBounds().getNorthEast().lat();
				addGeoJsonLayers(layers, sw, ne);
	
				google.maps.event.addListener(map, 'dragend', function(feature) {
					var layer = layers;
					var url = jsonArr[i].url;
					layerRefresh(feature, layer, url, thisCheckbox);
				});
				google.maps.event.addListener(map, 'zoom_changed', function(feature) {
					var layer = layers;
					var url = jsonArr[i].url;
					layerRefresh(feature, layer, url, thisCheckbox);
				});
	
	    	}else{
	    		
	    		var selectedLayer = layers.name;
	    		map.data.forEach(function(feature) {
			       //filter removes selected layer
			       if (feature.getProperty('category') == selectedLayer) {
			                map.data.remove(feature);
			            }
					});
					
	        	}
	    });
}

function destCoord(){
	
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

function addInfoWindow(data){
	//console.log(data);
	map.data.addListener('mouseover', function(event) {
		document.getElementById('info-box').style.display = "block";
	    document.getElementById('info-box').textContent =
	        event.feature.getProperty('name').toUpperCase();
	  });
	  map.data.addListener('mouseout', function(event) {
	  	document.getElementById('info-box').style.display = "none";
	    document.getElementById('info-box').textContent = "";
	  });
	  map.data.addListener('click', function(event) {
	  	var info = event.feature.getProperty("name");
	  	console.log(event.feature.R);
	  	var allInfo = event.feature.R;
	  	var featureProperties = [];
	  	for (var prop in allInfo) {
		    featureProperties.push('<div class="featureProp">' + prop + ': ' + allInfo[prop] + '</div><br/>');
		}
		//.join(' '); removes the commas
	  	featureInfoWindow.setContent('<header id="infoHeader">DETAILS</header><div id="featureInfo">' + featureProperties.join(' ').toUpperCase() + '</div>');
	  	featureInfoWindow.setPosition(event.latLng);
        featureInfoWindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
        featureInfoWindow.open(map);
        $("#featureInfo").parents().parents().css({"min-width": "200px"});
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
		if(layers.tiled === 0){
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
		}else{
			
		var tiledLayer = new google.maps.ImageMapType({getTileUrl:
			function(sw, ne) {
				var bbox = sw + ',' + ne;
				//base WMS URL
				var url = "http://localhost:8081/geoserver/REMA/wms?";
					url += "&service=WMS";
					url += "&version=1.1.0";
					url += "&request=GetMap";
					url += "&layers=REMA:yt_contours_50k";
					url += "&styles=";
					url += "&format=image/png";
					url += "&TRANSPARENT=TRUE";
					url += "&srs=EPSG:3857";
					url += "&bbox=" + bbox;
					url += "&width=256";
					url += "&height=256";
					url += "&tiled=true";
					return url;
					},
					
				tileSize: new google.maps.Size(256, 256),
				opacity: 0.85,
				isPng: true
				});
				map.overlayMapTypes.push(tiledLayer);
		
		}
	}
}

function addGeoJsonLayers(layers, sw, ne){
	if(layers.tiled === 0){
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
	}else{
		var mapBounds = this.map.getBounds();
		var northEast = mapBounds.getNorthEast();
		var southWest = mapBounds.getSouthWest();
		var neMerc = toMercator(northEast);
		var swMerc = toMercator(southWest);
		
		var bbox = swMerc.x + ',' + swMerc.y + ',' + neMerc.x + ',' + neMerc.y;
		console.log(bbox);
		var tiledLayer = new google.maps.ImageMapType({
			getTileUrl: function() {
				//base WMS URL
				var url = "http://localhost:8081/geoserver/REMA/wms?";
					url += "&service=WMS";
					url += "&version=1.1.0";
					url += "&request=GetMap";
					url += "&layers=REMA:yt_contours_50k";
					url += "&styles=";
					url += "&format=image/png";
					url += "&TRANSPARENT=TRUE";
					url += "&srs=EPSG:3857";
					url += "&bbox=" + bbox;
					url += "&width=256";
					url += "&height=256";
					url += "&tiled=true";
					return url;
					
					},
				tileSize: new google.maps.Size(256, 256),
				opacity: 0.85,
				isPng: true
				});
				map.overlayMapTypes.push(tiledLayer);
				map.overlayMapTypes.insertAt(0, tiledLayer);
	}
}

function toMercator(coord){
	console.log(coord);
	var lat = coord.lat();
	var lng = coord.lng();
	
	if((Math.abs(lng) > 180 || Math.abs(lat) > 90 ))
		return;
	var num = lng * 0.017453292519943295;
	var x = 6378137.0 * num;
	var a = lat * 0.017453292519943295;
	var merc_lon = x;
	var merc_lat = 3189068.5 * Math.log((1.0 + Math.sin(a))/(1.0 - Math.sin(a)));
	return{x: merc_lon, y: merc_lat};
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

//Uncomment to get other vertices positions for google drawing tool
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