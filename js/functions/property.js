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
		       propertyInfo.push({
			  	"id": data[i][0]
			  });
	
        	}
        	$('#settings-property').append(table);           	
        }
    });	
}

function gotoProperty(id){
	//console.log(id);
	//console.log(propertyInfo);
	console.log(propMarkers);
	var result = $.grep(propMarkers, function(e){ 
					return e.layer_id == id; 
				});
	console.log(result);

	
	
}
	



