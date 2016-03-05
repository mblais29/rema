//Add the signout event listener
$("#signout").unbind().click(function() {
	//console.log(getCookie("USERNAME"));
	//console.log(document.domain);
	var urlDomain = document.domain; 
	del_cookie(urlDomain); 

});

//Gets the cookie value {name=value}
function getCookie(name){
	var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}
 
//Deletes the USERNAME cookie and returns to the login page
function del_cookie(urlDomain) {
	document.cookie = 'USERNAME=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/;domain=' + urlDomain;
	window.location.replace('login.php');
}


