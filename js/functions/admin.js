//Creates the Admin Layer Control
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
  	//SHows the Admin Page
  	$('#settings-page').show('slow').removeClass('displayNone');
  	//Checks to see if the table is already created to avoid duplicating tables
  	if($('.user-table').length || $('.property-table').length){
  		console.log('Table already created');
  	}else{
  		getUsers();
  		getProperty();
  	}
  	
  });
  
}

//---------------------------------------------------------

	// Creates the main Admin Settings Page
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
	
//---------------------------------------------------------
	
	//Get Users in Database
	function getUsers(){
		//empty the user array before re-populating the array
		userInfo = [];
		$.ajax({
	        url: "../rema/php/getUsers.php",
	        dataType: 'json',
	        contentType: 'application/json',
	        success: function (data) {
	        	var table = $('<table></table>').addClass('table table-striped user-table');
	        	var header = table.append('<thead><tr><th class="heading">First Name</th><th class="heading">Last Name</th><th class="heading">Username</th><th class="heading">Security</th><th class="heading"></th><th class="heading"><button type="button" class="btn btn-info edit-button" id="new-button" onclick="addUsers()">New</button></th></tr></thead>');
	        	var body = header.append('<tbody id="user-tab"></tbody>');
	        	
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
	
	function addUsers(){
		//Adds the notValid class right away as there is not text in the email input to validate
		if($('#userEmail').attr('class','form-control valid')){
    		$('#userEmail').removeClass('form-control valid');
    		$('#userEmail').addClass('form-control notValid');
    	}
		addUserFormValid();
	        
		$("#sidebar-wrapper").show("slow");
		$("#user_form").show();
		$("#userSend").show();
		$("#user_form").trigger("reset");
		$(".sidebar-nav").hide();
		$("#userEdit").hide();
	}
	
	function createUsers(formData){
		$.ajax({
	        url: $("#user_form").attr('action'),
	        type: "POST",
	        data: formData,
	        success: function (data) {
	        	alert(data);
	        	//Deletes the old table storing the Users Info before creating a new one
	        	$('.user-table').remove();
	        	getUsers();
	        	//Resets the Form
	        	$("#user_form").trigger("reset");
	        	//Hide Sidebar Wrapper Form
	        	$("#sidebar-wrapper").hide();
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
		
		var email = userInfo[i].email;
		validateEmail(email);
		
		editUserFormValid();
		
		//Updates the select to data 
		var securityType = document.getElementById( "userSecurity" );
		var securitySelectedOption = securityType.options[ securityType.selectedIndex ].value;
		if( securitySelectedOption !== userInfo[i].security){
			$("#userSecurity").val(userInfo[i].security);
		};
		var previousValue = $("#userPassword").val();
		//console.log(previousValue);
		$("#userPassword").blur(function(e) {
		    var currentValue = $(this).val();
		    if(currentValue != previousValue) {
		         previousValue = currentValue;
		         console.log(previousValue);
		    }
		});
	}
	
	function deleteUser(i){
	
		var userId = userInfo[i].user_id;
		var userName = userInfo[i].username;
		var formData = {name:userName,id:userId};
		
		$.ajax({
	        url: "../rema/php/deleteUsers.php",
	        type: "POST",
	        data: formData,
	        success: function (data) {
	        	//console.log(data);
	        	alert(data);
	        	//Deletes the old table storing the Users Info before creating a new one
	        	$('.user-table').remove();
	        	//Resets the Form
	        	getUsers();
	        	//Hide Sidebar Wrapper Form
	        	$("#sidebar-wrapper").hide();
	        }
	 });
	}

//---------------------------------------------------------

	// User Form Modifications
	
	var sumbitButton = "";
	
	//Catches which submit button was clicked before being submitted
	$('#user_form').on('click', 'button[type=submit]', function(e) {
	      sumbitButton = $(this).val();
	});
	
	//Allows only numbers to be entered in the phone textbox
	$("#userPhone").keydown(function (e) {
	    // Allow: backspace, delete, tab, escape, enter and .
	    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	         // Allow: Ctrl+A, Command+A
	        (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	         // Allow: home, end, left, right, down, up
	        (e.keyCode >= 35 && e.keyCode <= 40)) {
	             // let it happen, don't do anything
	             return;
	    }
	    // Ensure that it is a number and stop the keypress
	    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        e.preventDefault();
	    }
	});
	
	$('#userEmail').keyup(function(){
		//Validates User's email input
	    var validateEmail =  /^[\w\.-_]+@[\w\.-_]+\.[a-zA-Z]{2,3}$/; 
	    console.log(validateEmail.test(this.value));
	    console.log(this.value);
	    if (validateEmail.test(this.value)){
	    	$('#userEmail').removeClass('form-control notValid');
	        $('#userEmail').addClass('form-control valid');
	    } else {
	    	$('#userEmail').removeClass('form-control valid');
	    	$('#userEmail').addClass('form-control notValid');
	    }
	});
	
	function validateEmail(email){
		//Validates User's email input
	    var validateEmail =  /^[\w\.-_]+@[\w\.-_]+\.[a-zA-Z]{2,3}$/;
	    var input = email;
	    if (validateEmail.test(input)){
	        $('#userEmail').addClass('form-control valid');
	    } else {
	    	$('#userEmail').addClass('form-control notValid');
	    }
	
	}
	
	// Set up an event listener for the User form.
	$("#user_form").submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();
	    // Serialize form data and submit button value
	    var formData = $("#user_form").serialize() + '&submit=' + sumbitButton;
		createUsers(formData);
	});

	// Selects all input text under User Form and Attach's Validation
	$('#user_form').find('input[type=text]').each(function(){
     var text_value = $(this).val();
     if(text_value != '')
       {
        $(this).addClass('form-control valid');
       }else{
       	$(this).addClass('form-control notValid');
       }
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
  	
  	// Selects all input passwords under User Form and Attach's Validation
  	$('#user_form').find('input[type=password]').each(function(){
     var text_value = $(this).val();
     if(text_value != '')
       {
        $(this).addClass('form-control valid');
       }else{
       	$(this).addClass('form-control notValid');
       }
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

	function editUserFormValid(){
		$('#user_form').find('input[type=text]').each(function(){
			var text_value = $(this).val();
	     	if(text_value != '')
	       	{
	        	$(this).addClass('form-control valid');
	       	}else{
	       		$(this).addClass('form-control notValid');
	       	}
       	});
       	$('#user_form').find('input[type=password]').each(function(){
			var text_value = $(this).val();
	     	if(text_value != '')
	       	{
	        	$(this).addClass('form-control valid');
	       	}else{
	       		$(this).addClass('form-control notValid');
	       	}
       	});
	}
	
	function addUserFormValid(){
		$('#user_form').find('input[type=text]').each(function(){
			if($(this).attr('class','form-control valid')){
    			$(this).removeClass('form-control valid');
    			$(this).addClass('form-control notValid');
    		}
       	});
       	$('#user_form').find('input[type=password]').each(function(){
			if($(this).attr('class','form-control valid')){
    			$(this).removeClass('form-control valid');
    			$(this).addClass('form-control notValid');
    		}
       	});
	}

//---------------------------------------------------------









