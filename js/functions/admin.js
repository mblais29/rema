//Creates the Layer Control
function AdminControl(adminControlDiv, map) {
	
  // Set CSS for the layer control border.
  var adminControlUI = document.createElement('div');
  adminControlUI.style.backgroundColor = '#fff';
  adminControlUI.style.border = '2px solid #fff';
  adminControlUI.style.borderRadius = '3px';
  adminControlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  adminControlUI.style.cursor = 'pointer';
  adminControlUI.style.marginBottom = '22px';
  adminControlUI.style.textAlign = 'center';
  adminControlUI.title = 'Click for Settings';
  adminControlDiv.appendChild(adminControlUI);

  // Set CSS for the layer control interior.
  var adminControlText = document.createElement('div');
  adminControlText.style.color = 'rgb(25,25,25)';
  adminControlText.style.fontSize = '16px';
  adminControlText.style.paddingLeft = '2px';
  adminControlText.style.paddingRight = '2px';
  adminControlText.innerHTML = '<i class="fa fa-cogs fa-2x"></i>';
  adminControlUI.appendChild(adminControlText);

  // Setup the click event listeners
  adminControlUI.addEventListener('click', function() {
  	//$("#settings-page").show('slow');
  	$('#settings-page').show('slow').removeClass('displayNone');
  	if($('.user-table').length){
  		console.log('Table already created');
  	}else{
  		openSettings();
  	}
  	
  });
  
}

function openSettings(){
	//$("#settings-page").show('slow');
	getUsers();
}

$('li.settings a').on('click', function(){
	//alert($(this).parent().attr('id'));
	var id = $(this).parent().attr('id');
    $(this).parent().addClass('active').siblings().removeClass('active');
    settingListCheck(id);
});

function settingListCheck(id){
	var page = "#settings-" + id;
	$(page).removeClass('hide').siblings('div').addClass('hide divSize');
}

$('.close-button').on('click', function(c){
	$(this).parent().parent().fadeOut('slow', function(c){
	});
	$('#settings-page').hide().addClass('displayNone');
});

//Get Users in Database
function getUsers(){
	$.ajax({
        url: "../rema/php/getUsers.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	var table = $('<table></table>').addClass('table table-striped user-table');
        	var header = table.append('<thead><tr><th class="heading">First Name</th><th class="heading">Last Name</th><th class="heading">Username</th><th class="heading">Security</th><th class="heading"></th><th class="heading"><button type="button" class="btn btn-info edit-button" id="new-button" onclick="addUsers()">New</button></th></tr></thead>');
        	var body = header.append('<tbody></tbody>');
        	
        	for (i = 0; i < data.length; i++) {

			     var row = $('<tr>').append(
		            $('<td>').text(data[i][1]),
		            $('<td>').text(data[i][2]),
		            $('<td>').text(data[i][5]),
		            $('<td>').text(data[i][7]),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="editUser('+i+')">Edit</button>'),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="deleteUser('+i+')">Delete</button>')
		        ); 
		        body.append(row);
		        
		        userInfo.push({
			  	"user_id": data[i][0],
	        	"first_name": data[i][1],
		        "last_name": data[i][2],
		        "email": data[i][3],
		        "phone": data[i][4],
		        "username": data[i][5],
		        "pwd": data[i][6],
		        "security": data[i][7]
			  });
	
        	}
        	$('#settings-user').append(table);           	
        }
    });	
}

function editUser(i){
	$("#sidebar-wrapper").show("slow");
	$("#user_form").show();
	$("#userEdit").show();
	$(".sidebar-nav").hide();
	$("#userSend").hide();
	//Insert User Info Array values
	$('#userId').val(userInfo[i].user_id);
	$('#userName').val(userInfo[i].username);
	$('#userPassword').val(userInfo[i].pwd);
	$('#firstName').val(userInfo[i].first_name);
	$('#lastName').val(userInfo[i].last_name);
	$('#userEmail').val(userInfo[i].email);
	$('#userPhone').val(userInfo[i].phone);

	//Updates the select to data 
	var securityType = document.getElementById( "userSecurity" );
	var securitySelectedOption = securityType.options[ securityType.selectedIndex ].value;
	if( securitySelectedOption !== userInfo[i].security){
		$("#userSecurity").val(userInfo[i].security);
	};
	var previousValue = $("#userPassword").val();
	console.log(previousValue);
	$("#userPassword").blur(function(e) {
	    var currentValue = $(this).val();
	    if(currentValue != previousValue) {
	         previousValue = currentValue;
	         console.log(previousValue);
	    }
	});
}

function addUsers(){
	$("#sidebar-wrapper").show("slow");
	$("#user_form").show();
	$("#userSend").show();
	$("#user_form").trigger("reset");
	$(".sidebar-nav").hide();
	$("#userEdit").hide();
}

function deleteUser(i){
	console.log(userInfo[i].user_id);
	console.log(userInfo[i].username);
	var userId = userInfo[i].user_id;
	var userName = userInfo[i].username;
	var formData = {name:userName,id:userId};
	
	$.ajax({
        url: "../rema/php/deleteUsers.php",
        type: "POST",
        data: formData,
        success: function (data) {
        	//console.log(data);
        	alert('Username ' + data + ' has been removed!');
        	$('.user-table').remove();
        	getUsers();
        }
 });
}









