function getLeases(){
	$.ajax({
        url: "../rema/php/getLeases.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	var table = $('<table></table>').addClass('table table-striped lease-table');
        	var header = table.append('<thead><tr><th class="heading">Tenant</th><th class="heading">Start Date</th><th class="heading">End Date</th><th class="heading">Income</th><th class="heading">Frequency</th><th class="heading">Property</th><th class="heading">Deposit</th><th class="heading"></th></tr></thead>');
        	var body = header.append('<tbody id="table-lease"></tbody>');
        	console.log(data);
        	for (i = 0; i < data.length; i++) {
			    var row = $('<tr>').append(
		            $('<td>').text(data[i][9] + ' ' + data[i][10]),
		            $('<td>').text(data[i][2]),
		            $('<td>').text(data[i][3]),
		            $('<td>').text(data[i][4]),
		            $('<td>').text(data[i][5]),
		            $('<td>').text(data[i][15] + ', ' + data[i][16] + ', ' + data[i][17]),
		            $('<td>').text(data[i][7]),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="gotoProperty('+ data[i][14] +')">Go</button>'),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="editLease(' + i + ')">Edit</button>')
		        ); 
		        body.append(row);
		        //push the id to help retrive marker lat, lon from propMarker Array
		        leaseInfo.push({
				  	"lease_id": data[i][0],
		        	"tenant_id": data[i][1],
			        "start_date": data[i][2],
			        "end_date": data[i][3],
			        "income": data[i][4],
			        "freq": data[i][5],
			        "property": data[i][6],
			        "deposit": data[i][7]
				  });
	
        	}
        	$('#settings-lease').append(table);    
        }
    });	
}

function editLease(i){

	$('#user_form').hide();
	$('#property_form').hide();
	$('#leaseSend').hide();
	
	$("#sidebar-wrapper").show("slow");
	$("#lease_form").show();
	
	//Insert Lease Info Array values
	var tenant = leaseInfo[i].tenant_id;
	$('#leaseStart').val(leaseInfo[i].start_date);
	$('#leaseEnd').val(leaseInfo[i].end_date);
	$('#leaseAmount').val(leaseInfo[i].income);
	$('#freq').val(leaseInfo[i].freq);
	var prop = leaseInfo[i].property;
	$('#deposit').val(leaseInfo[i].deposit);
	//Updates the select options
	tenantDropdown(tenant);
	propertyDropdown(prop);

	
}

function propertyDropdown(prop){
	$.ajax({
        url: "../rema/php/selectProperty.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	//console.log(data);

        	for (i = 0; i < data.length; i++) {
			    $('#property').append(
			    	$('<option value="'+data[i][0]+'">').text('ID: ' + data[i][0] + ' - ' + ' ( ' + data[i][1] + ', ' + data[i][2] + ', ' + data[i][3] + ' )')	
			    );
			}	
        },
        complete: function() {
	      selectProp(prop); 
	    }  
 	});
 	
}

function tenantDropdown(tenant,prop){
	$.ajax({
        url: "../rema/php/selectTenant.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	//console.log(data);

        	for (i = 0; i < data.length; i++) {
			    $('#tenant').append(
			    	$('<option value="'+data[i][0]+'">').text('ID: ' + data[i][0] + ' ( ' + data[i][1] + ', ' + data[i][2] + ' )')	
			    );
			}
        	
        },
        complete: function() {
	      selectTenant(tenant); 
	    }
 	});
}

function selectTenant(tenant){
	//Updates the select to data 
	var tenantId = document.getElementById( "tenant" );
	var tenantSelectedOption = tenantId.options[ tenantId.selectedIndex ].value;
	if( tenantSelectedOption !== tenant){
		$("#tenant").val(tenant);
	};
}

function selectProp(prop){
	//Updates the select to data
	var propertyId = document.getElementById( "property" );
	var propertySelectedOption = propertyId.options[ propertyId.selectedIndex ].value;
	if( propertySelectedOption !== prop){
		$("#property").val(prop);
	};
}
