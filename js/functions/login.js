
function submitUserForm(){
	// AJAX Code To Submit Form.
	$.ajax({
		type: "POST",
		url: "../php/login_con.php",
		cache: false,
		success: function(result){
			alert(result);
		}
	});
	return false;
};