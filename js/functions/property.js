//Get Properties in Database
function getProperty(){
	//empty the user array before re-populating the array
	propertyInfo = [];
	$.ajax({
        url: "../rema/php/getProperty.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	var table = $('<table></table>').addClass('table table-striped property-table');
        	var header = table.append('<thead><tr><th class="heading">Address</th><th class="heading">City</th><th class="heading">Province</th><th class="heading">Purchase Price</th><th class="heading">Sqft</th><th class="heading">Type</th></tr></thead>');
        	var body = header.append('<tbody id="prop-table"></tbody>');
        	for (i = 0; i < data.length; i++) {
			    var row = $('<tr>').append(
		            $('<td>').text(data[i][1]),
		            $('<td>').text(data[i][2]),
		            $('<td>').text(data[i][3]),
		            $('<td>').text(data[i][4]),
		            $('<td>').text(data[i][6]),
		            $('<td>').text(data[i][7]),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="gotoProperty('+ data[i][0] +')">Go</button>')
		            //$('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="deleteUser('+i+')">Delete</button>')
		        ); 
		        body.append(row);
		        //push the id to help retrive marker lat, lon from propMarker Array
		        propertyInfo.push({
			  	  "id": data[i][0]
			    });
	
        	}
        	$('#settings-property').append(table);           	
        }
    });	
}

function gotoProperty(id){
	var selectedId = id;
	//Gets the correct property info from propMarkers
	var result = $.grep(propMarkers, function(e){ 
					return e.layer_id == id; 
				});
	var newLat = result[0].lat;
	var newLon = result[0].lon;
	for(var i=0; i<markers.length; i++){
        markers[i].setVisible(true);
    }
    //Zooms into the selected property
    map.setZoom(15);
    map.setCenter(new google.maps.LatLng(newLat, newLon));
    document.getElementById("markerCheckbox").checked = true;
	
}
	



