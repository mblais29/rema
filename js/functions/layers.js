//Creates the Layer Control
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
  	$("#sidebar-layers").show('slow').removeClass('displayNone');
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
		if(document.getElementById("close-nav") === null){
			$('#sidebar-layers').append('<button type="button" class="btn btn-secondary" id="close-nav" onclick="hideForm()">Close</button>');
		}
		
		$('#topLevel' + result['country']).append('<div id="midLevel' + result['province'] + '" ><i class="fa fa-plus" id="midfa" style="margin-left:2px; color: #fff"></i><input type="checkbox" class="layerTreeMid" id="layerTreeMid' + result['province'] + '"/><h3 class="sidebar-layers-label">' + result['province'] + '</h3></div>');	
		topLevelcheckBox = $('#layerTreeTop' + result['country']);
		midLevelCheckBox = result['province'];
		attachTopLayerListener(topLevelcheckBox, midLevelCheckBox, topLevelId);
	}
	
}

function attachTopLayerListener(topLevelcheckBox, midLevelCheckBox, topLevelId){
	
	//console.log('#midLevel' + midLevelCheckBox);
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
			//Unchecks all children layers when topLevelId is unchecked
			$("#" + topLevelId).children('div').find("input[type='checkbox']").prop('checked', false).change();
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
		//console.log($(currentMidLevelDiv));
		var checked = $(currentMidLevelDiv).is(':checked');
		if(checked){
			//console.log("Checked");
			//console.log($('#midLevel' + midLevelCheckBox).children('div'));

			$('#midLevel' + midLevelCheckBox).children('div').show();
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").removeClass("fa fa-plus");
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").addClass("fa fa-minus");
		}else{
			//console.log("Not Checked");
			//Unchecks all children layers when midLevelId is unchecked
			$('#midLevel' + midLevelCheckBox).children('div').find("input[type='checkbox']").prop('checked', false).change();
			$('#midLevel' + midLevelCheckBox).children('div').hide();
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").removeClass("fa fa-minus");
			$("#midLevel" + midLevelCheckBox).children(":nth-child(1)").addClass("fa fa-plus");
		}
	});
	
}

//Get Property Markers
function getPropertyMarkers(){
	
  //Use Custom Icon for Marker
  var image = {
	  url: 'img/icons/location.png',
	  size: new google.maps.Size(71, 71),
	  origin: new google.maps.Point(0, 0),
	  anchor: new google.maps.Point(17, 34),
	  scaledSize: new google.maps.Size(50, 50)
  };
  $.ajax("../rema/php/data.php",
	{
	    type: 'GET',
	    dataType: 'json',
	    success: function (data) {
	        //console.log(data);
	        //console.log("lat: " + data[0][9]);
	        //console.log("lon: " + data[0][10]);
	        
	        for (i = 0; i < data.length; i++) {
	        	var layer_id = data[i][0];
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
									    '<h3 class="panel-title">Property Info</h3><a href="#" id="edit'+i+'" onclick="getMarkerData('+i+')">Edit</a>'+
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

			  propMarkers.push({
			  	"layer_id": data[i][0],
	        	"address": data[i][1],
		        "city": data[i][2],
		        "province": data[i][3],
		        "purchasePrice": data[i][4],
		        "buildingAge": data[i][5],
		        "sqft": data[i][6],
		        "type": data[i][7],
		        "comments": data[i][8],
		        "lat": data[i][9],
		        "lon": data[i][10]
			  });	
			     
			  var markerProp = new google.maps.Marker({
			       position: myLatLong,
			       map: map,
			       title: "Property",
			       icon: image,
			       draggable: false
			   });
			   markerProp.set("id", i);

			   
			   google.maps.event.addListener(markerProp,'click', (function(markerProp,contentString,infowindow){ 
			        return function() {
			           infowindow.setContent(contentString);
			           infowindow.open(map,markerProp);
			           selectedPropMarkerLat = markerProp.getPosition().lat();
			           selectedPropMarkerLon = markerProp.getPosition().lng();

			        };
			   })(markerProp,contentString,infowindow));
			   //Hides the markers when map first loads
			   markerProp.setVisible(false);
			   
			   google.maps.event.addListener(markerProp,'dragend', (function(){
				   	selectedPropMarkerLat = markerProp.getPosition().lat();
				    selectedPropMarkerLon = markerProp.getPosition().lng();
					//Updates the property table lat and lon when user drags property marker
				    $('#lat').val(selectedPropMarkerLat);
				    $('#lon').val(selectedPropMarkerLon);
			   	
			   }));
			   	
			   	
			   	
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
				//iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;';});
				
				// Moves the arrow 76px to the left margin 
				//iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;';});
				
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

function getMarkerData(i){
	
	hideForm();
	$("#send").hide();
	$("#user_form").hide();
	$(".sidebar-nav").show();
	$("#sidebar-wrapper").show("slow");
	//makes all markers draggable
	setMarkerDraggable();

	$('#layerId').val(propMarkers[i].layer_id);
	$('#address').val(propMarkers[i].address);
	$('#city').val(propMarkers[i].city);
	//Updates the select to data
	var propertyProvince = document.getElementById( "province" );
	var provinceSelectedOption = propertyProvince.options[ propertyProvince.selectedIndex ].value;
	if( provinceSelectedOption !== propMarkers[i].province){
		$("#province").val(propMarkers[i].province);
	};
	
	$('#purchase_price').val(propMarkers[i].purchasePrice);
	$('#year_built').val(propMarkers[i].buildingAge);
	$('#sqft').val(propMarkers[i].sqft);
	$('#lat').val(propMarkers[i].lat);
	$('#lon').val(propMarkers[i].lon);
	//Updates the select to data 
	var propertyType = document.getElementById( "type" );
	var typeSelectedOption = propertyType.options[ propertyType.selectedIndex ].value;
	if( typeSelectedOption !== propMarkers[i].type){
		$("#type").val(propMarkers[i].type);
	};
	$('#comment').val(propMarkers[i].comments);
	
}

function setMarkerDraggable(){
	
	for(var i=0; i<markers.length; i++){
        markers[i].setOptions({draggable: true});
   };
   
}

//Adds all the layers in the database
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
	    	//console.log(checked);
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

//Makes request to Geoserver to get the geojson layer
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
				//console.log(features.length);
				
		    }
		}).fail(function (jqXHR, textStatus, errorThrown) {
			alert("Error processing your request");
			console.log(jqXHR);
			console.log(textStatus);
		    console.log(errorThrown);
		});
		
}

//Refreshes the displayed layers that are turned on when bounding box changes
function layerRefresh(feature, layer, url, thisCheckbox){
	
	//console.log(layer);
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

//Styles for the polygon, lines or point layers
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
	
	$("#sidebar-wrapper").hide("slow").addClass('displayNone');
	$("#sidebar-layers").hide("slow").addClass('displayNone');
	$("#user_form").trigger('reset');
	$("#property_form").trigger('reset');
	
	
}

//Retrieves the Marker Coordinates
function getMarkerCoords(event){
	
	document.getElementById("property_form").reset();
	$('#edit').hide();
	$('#send').show();
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

//Retrieves the Circle Coordinates
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