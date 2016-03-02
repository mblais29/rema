$(document).ready(function () {
	// Set up an event listener for the contact form.
	$('#login_form').submit(function(event) {
	    // Stop the browser from submitting the form.
	    //event.preventDefault();
	
	    
	    // Serialize the form data.
		var formData = $('#login_form').serialize();
		var url = $('#login_form').attr('action');
		alert(formData);
		
		submitForm(formData,url);

	});
	
	function submitForm(formData,url){
		// Submit the form using AJAX.
		$.ajax({
		    type: 'POST',
		    url: url,
		    data: formData,
		    success:function(data, textStatus, xhr) 
	        {
	            //data: return data from server
	            console.log(xhr);
	        },
	        error: function(xhr, textStatus, errorThrown) 
	        {
	            alert(xhr.responseText);      
	        }
		});
		
		
	
	}
	
	
});

