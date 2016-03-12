function getTenants(){
	tenantInfo = [];
	$.ajax({
        url: "../rema/php/getTenants.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	var table = $('<table></table>').addClass('table table-striped tenant-table');
        	var header = table.append('<thead><tr><th class="heading">Tenant</th><th class="heading">Phone</th><th class="heading">Email</th><th class="heading">Occupation</th><th class="heading"></th><th class="heading"><button type="button" class="btn btn-info edit-button" id="new-button" onclick="addNewTenant()">New</button></th></tr></thead>');
        	var body = header.append('<tbody id="table-lease"></tbody>');
        	//console.log(data);
        	for (i = 0; i < data.length; i++) {
			    var row = $('<tr>').append(
		            $('<td>').text(data[i][1] + ' ' + data[i][2]),
		            $('<td>').text(data[i][3]),
		            $('<td>').text(data[i][4]),
		            $('<td>').text(data[i][5]),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="editTenant(' + i + ')">Edit</button>'),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="deleteTenant(' + i + ')">Delete</button>')
		        ); 
		        body.append(row);
		        //push the id to help retrieve marker lat, lon from propMarker Array
		        tenantInfo.push({
				  	"tenant_id": data[i][0],
		        	"firstName": data[i][1],
			        "lastName": data[i][2],
			        "phone": data[i][3],
			        "email": data[i][4],
			        "occupation": data[i][5]
				  });
	
        	}
        	$('#settings-tenant').append(table);
        }
    });	
}

function addNewTenant(){
	$("#tenant_form").trigger("reset");

	$('#user_form').hide();
	$('#property_form').hide();
	$('#lease_form').hide();
	$('#tenantEdit').hide();
	$('#tenantSend').show();
	
	$("#sidebar-wrapper").show("slow");
	$("#tenant_form").show();
	$('#email').removeClass('form-control valid');
	$('#email').addClass('form-control notValid');
	addTenantFormValid();

}


// User Form Modifications
	
var sumbitButton = "";

//Catches which submit button was clicked before being submitted
$('#tenant_form').on('click', 'button[type=submit]', function(e) {
      sumbitButton = $(this).val();
});

// Set up an event listener for the User form.
$("#tenant_form").submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();
    // Serialize form data and submit button value
    var formData = $("#tenant_form").serialize() + '&submit=' + sumbitButton;
	createTenant(formData);
});

	
function createTenant(formData){
	$.ajax({
        url: $("#tenant_form").attr('action'),
        type: "POST",
        data: formData,
        success: function (data) {
        	alert(data);
        	//Deletes the old table storing the Users Info before creating a new one
        	$('.tenant-table').remove();
        	getTenants();
        	//Resets the Form
        	$("#tenant_form").trigger("reset");
        	//Hide Sidebar Wrapper Form
        	$("#sidebar-wrapper").hide();
        }
	});
}

function editTenant(i){

	$('#user_form').hide();
	$('#property_form').hide();
	$('#lease_form').hide();
	$('#tenantSend').hide();
	$('#tenantEdit').show();
	
	$("#sidebar-wrapper").show("slow");
	$("#tenant_form").show();
	
	//Insert Lease Info Array values
	$('#firstname').val(tenantInfo[i].firstName);
	$('#lastname').val(tenantInfo[i].lastName);
	$('#phone').val(tenantInfo[i].phone);
	$('#email').val(tenantInfo[i].email);
	$('#occup').val(tenantInfo[i].occupation);

	editTenantFormValid();
	var email = tenantInfo[i].email;
	validateEmail(email);

	
}

function deleteTenant(i){
	var id = tenantInfo[i].tenant_id;
	var formData = {id:id};
	
	$.ajax({
        url: "../rema/php/deleteTenants.php",
        type: "POST",
        data: formData,
        success: function (data) {
        	console.log(data);
        	//Deletes the old table storing the Users Info before creating a new one
        	$('.tenant-table').remove();
        	//Resets the Form
        	getTenants();
        	//Hide Sidebar Wrapper Form
        	$("#sidebar-wrapper").hide();
        }
 });
}

// Selects all input text under User Form and Attach's Validation
$('#tenant_form').find('input[type=text], input[type=date]').each(function(){
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

function addTenantFormValid(){
	$('#tenant_form').find('input[type=text], input[type=date]').each(function(){
		var text_value = $(this).val();
	     if(text_value != '')
	       {
	        $(this).addClass('form-control valid');
	       }else{
	       	$(this).addClass('form-control notValid');
	       }
   	});
}

$('#email').keyup(function(){
	//Validates User's email input
    var validateEmail =  /^[\w\.-_]+@[\w\.-_]+\.[a-zA-Z]{2,3}$/; 
    if (validateEmail.test(this.value)){
    	$('#email').removeClass('form-control notValid');
        $('#email').addClass('form-control valid');
    } else {
    	$('#email').removeClass('form-control valid');
    	$('#email').addClass('form-control notValid');
    }
});	

function validateEmail(email){
	//Validates User's email input
    var validateEmail =  /^[\w\.-_]+@[\w\.-_]+\.[a-zA-Z]{2,3}$/;
    var input = email;
    if (validateEmail.test(input)){
        $('#email').addClass('form-control valid');
    } else {
    	$('#email').addClass('form-control notValid');
    }

}

function addTenantFormValid(){
	$('#tenant_form').find('input[type=text]').each(function(){
		if($(this).attr('class','form-control valid')){
			$(this).removeClass('form-control valid');
			$(this).addClass('form-control notValid');
		}
   	});
   	$('#user_form').find('input[type=date]').each(function(){
		if($(this).attr('class','form-control valid')){
			$(this).removeClass('form-control valid');
			$(this).addClass('form-control notValid');
		}
   	});
}

function editTenantFormValid(){
	$('#tenant_form').find('input[type=text], input[type=date]').each(function(){
		var text_value = $(this).val();
	     if(text_value != '')
	       {
	        $(this).addClass('form-control valid');
	       }else{
	       	$(this).addClass('form-control notValid');
	       }
   	});
}
