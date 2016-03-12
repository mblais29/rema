function getLeases(){
	leaseInfo = [];
	$.ajax({
        url: "../rema/php/getLeases.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	var table = $('<table></table>').addClass('table table-striped lease-table');
        	var header = table.append('<thead><tr><th class="heading">Tenant</th><th class="heading">Start Date</th><th class="heading">End Date</th><th class="heading">Income</th><th class="heading">Frequency</th><th class="heading">Property</th><th class="heading">Deposit</th><th class="heading"></th><th class="heading"></th><th class="heading"><button type="button" class="btn btn-info edit-button" id="new-button" onclick="addNewLease()">New</button></th></tr></thead>');
        	var body = header.append('<tbody id="table-lease"></tbody>');
        	//console.log(data);
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
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="editLease(' + i + ')">Edit</button>'),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="deleteLease(' + i + ')">Delete</button>')
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

function addNewLease(){
	$('#user_form').hide();
	$('#property_form').hide();
	$('#leaseEdit').hide();
	$('#leaseSend').show();
	
	$("#sidebar-wrapper").show("slow");
	$("#lease_form").show();
	
	propertyDropdown();
	tenantDropdown();

}

function editLease(i){

	$('#user_form').hide();
	$('#property_form').hide();
	$('#leaseSend').hide();
	$('#leaseEdit').show();
	
	$("#sidebar-wrapper").show("slow");
	$("#lease_form").show();
	
	//Insert Lease Info Array values
	var tenant = leaseInfo[i].tenant_id;
	$('#leaseStart').val(leaseInfo[i].start_date);
	$('#leaseEnd').val(leaseInfo[i].end_date);
	$('#leaseAmount').val(leaseInfo[i].income);
	var frequency = leaseInfo[i].freq;
	//$('#freq').val(leaseInfo[i].freq);
	var prop = leaseInfo[i].property;
	$('#deposit').val(leaseInfo[i].deposit);
	//Updates the select options
	if($('#tenant option').length === 0){
		tenantDropdown(tenant);
	}
	if($('#property option').length === 0){
		propertyDropdown(prop);
	}
	if($('#freq option').length === 0){
		selectFreq(frequency);
	}
	
	addLeaseFormValid();

	
}

// User Form Modifications
	
	var sumbitButton = "";
	
	//Catches which submit button was clicked before being submitted
	$('#lease_form').on('click', 'button[type=submit]', function(e) {
	      sumbitButton = $(this).val();
	});
	
// Set up an event listener for the User form.
	$("#lease_form").submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();
	    // Serialize form data and submit button value
	    var formData = $("#lease_form").serialize() + '&submit=' + sumbitButton;
		createLeases(formData);
	});
	
function createLeases(formData){
	$.ajax({
        url: $("#lease_form").attr('action'),
        type: "POST",
        data: formData,
        success: function (data) {
        	alert(data);
        	//Deletes the old table storing the Users Info before creating a new one
        	$('.lease-table').remove();
        	getLeases();
        	//Resets the Form
        	$("#lease_form").trigger("reset");
        	//Hide Sidebar Wrapper Form
        	$("#sidebar-wrapper").hide();
        }
	});
}

function deleteLease(i){
	var id = leaseInfo[i].lease_id;
	var formData = {id:id};
	
	$.ajax({
        url: "../rema/php/deleteLeases.php",
        type: "POST",
        data: formData,
        success: function (data) {
        	console.log(data);
        	//Deletes the old table storing the Users Info before creating a new one
        	$('.lease-table').remove();
        	//Resets the Form
        	getLeases();
        	//Hide Sidebar Wrapper Form
        	$("#sidebar-wrapper").hide();
        }
 });
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

function selectFreq(frequency){
	//Updates the select to data
	var freqId = document.getElementById( "freq" );
	var freqSelectedOption = freqId.options[ freqId.selectedIndex ].value;
	if( freqSelectedOption !== frequency){
		$("#freq").val(frequency);
	};
}

// Selects all input text under User Form and Attach's Validation
$('#lease_form').find('input[type=text], input[type=date]').each(function(){
     $(this).keyup(function(){
     	var text = $(this).val();
     	if(text != '')
         {
           if($(this).attr('class','form-control notValid')){
    		  $(this).removeClass('form-control notValid');
    	   }
           $(this).addClass('form-control valid');
         }else{
           if($(this).attr('class','form-control valid')){
    		  $(this).removeClass('form-control valid');
    	   }
       	   $(this).addClass('form-control notValid');
         }
      });
});
  	
function addLeaseFormValid(){
	$('#lease_form').find('input[type=text], input[type=date]').each(function(){
		var text_value = $(this).val();
	     if(text_value != '')
	       {
	        $(this).addClass('form-control valid');
	       }else{
	       	$(this).addClass('form-control notValid');
	       }
   	});
}
