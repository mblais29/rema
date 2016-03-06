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
  	$("#settings-page").show('slow');
  	$('#settings-page').css("visibility", "visible");
  	if($('.user-table').length){
  		console.log('table already created');
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
	$('#settings-page').css("visibility", "hidden");
});

//Get Users in Database
function getUsers(){
	$.ajax({
        url: "../rema/php/editUsers.php",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	var table = $('<table></table>').addClass('table table-striped user-table');
        	var header = table.append('<thead><tr><th>First Name</th><th>Last Name</th><th>Username</th><th>Security</th></tr></thead>');
        	var body = header.append('<tbody></tbody>');
        	
        	for (i = 0; i < data.length; i++) {

			     var row = $('<tr>').append(
		            $('<td>').text(data[i][1]),
		            $('<td>').text(data[i][2]),
		            $('<td>').text(data[i][5]),
		            $('<td>').text(data[i][7]),
		            $('<td>').html('<button type="button" class="btn btn-info edit-button" onclick="editUser()">Edit</button>')
		        ); 
		        body.append(row);
	
        	}
        	$('#settings-user').append(table);           	
        }
    });	
}

function editUser(){
	$("#sidebar-wrapper").show("slow");
	$(".sidebar-nav").hide();
}









