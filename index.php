<?php
//Checks to see if the user has logged in yet before proceeding to the map
$cookie_name = 'USERNAME';
if(!isset($_COOKIE[$cookie_name])) {
	echo "<script type='text/javascript'>alert('User login is required...');window.location.replace(\"login.php\");</script>";
} /*else {
    echo "Cookie '" . $cookie_name . "' is set!<br>";
    echo "Value is: " . $_COOKIE[$cookie_name];
}*/
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Real Estate Management App</title>
    <!-- Favicon -->
    <link rel="shortcut icon" href="img/mblais.png" type="image/x-icon" />
	<!-- Google -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcVieGnFnEqNe_YE8HSQeFn9cEMWBVif4&sensor=false&libraries=drawing" type="text/javascript"></script>
	<link href='https://fonts.googleapis.com/css?family=Signika:600,400' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700' rel='stylesheet' type='text/css'>
	<!-- Bootstrap -->
    <link href="components/bootstrap/bootstrap-3.3.5/css/bootstrap.min.css" rel="stylesheet">
	<link href="components/font-awesome-4.5.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
	
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
	  <body>
	  	<!--- Adds a ajax loader if page is taking time to load --->
		<div id="loading" class="col-lg-12 text-center vcenter">
		  <img id="loading-image" src="img/mblais.png" width="100" height="100" alt="Loading..." /><br/>
		  <img id="loading-image" src="img/ajax-loader.gif" alt="Loading..." />
		</div>
	  	<div id="wrapper">
		  	<!-- Navigation -->
	        <div id="sidebar-wrapper" class="displayNone">
	            <ul class="sidebar-nav">
                	<form id="property_form" action="php/property.php" method="post">
                		<li class="sidebar-brand">
		                    <h1>Property Information</h1>
		                </li>
	                	  <input type="hidden" class="form-control" id="layerId" name="layerId" >
	                	  <label for="address">Address:</label>
						  <input type="text" class="form-control" id="address" name="address" placeholder="Enter Address...">
						  <label for="city">City:</label>
						  <input type="text" class="form-control" id="city" name="city" placeholder="Enter City...">
						  <label for="province">Province:</label>
						  <select class="form-control" id="province" name="province">
						      <option value="AB">Alberta</option>
						      <option value="BC">British Columbia</option>
						      <option value="MB">Manitoba</option>
						      <option value="NB">New Brunswick</option>
						      <option value="NL">Newfoundland</option>
						      <option value="NT">Northwest Territory</option>
						      <option value="NS">Nova Scotia</option>
						      <option value="NU">Nunavat</option>
						      <option value="ON">Ontario</option>
						      <option value="PE">Prince Edward Island</option>
						      <option value="QC">Quebec</option>
						      <option value="SK">Saskatchewan</option>
						      <option value="YT">Yukon</option>
						  </select>
						  <label for="purchase_price">Purchase Price:</label>
						  <input type="text" class="form-control" id="purchase_price" name="purchase_price" placeholder="Enter Purchase Price...">
						  <label for="year_built">Year Built:</label>
						  <input type="date" class="form-control" id="year_built" name="year_built" placeholder="Enter Year Built...">
						  <label for="sqft">Square Feet:</label>
						  <input type="number" class="form-control" id="sqft"  name="sqft" placeholder="Enter Square Footage...">
						  <label for="lat">Latitude:</label>
						  <input type="number" class="form-control" id="lat" name="lat" readonly>
						  <label for="lon">Longitude:</label>
						  <input type="number" class="form-control" id="lon" name="lon" readonly>
						  <label for="type">Building Type:</label>
						  <select class="form-control" id="type" name="type">
						      <option value="Detached House">Detached House</option>
						      <option value="Attached House">Attached House</option>
						      <option value="Condo">Condo</option>
						      <option value="Land">Land</option>
						  </select>
						  <label for="comment">Comments:</label>
						  <textarea class="form-control" rows="5" id="comment" name="comment" placeholder="Enter comment here..."></textarea>
						  <button type="button" class="btn btn-secondary" id="close" onclick="hideForm()">Close</button>
						  <button type="submit" name="submit" id="send" class="btn btn-secondary" value="one" >Submit</button>
						  <button type="submit" name="submit" id="edit" class="btn btn-secondary" value="two" >Save</button>
					</form>
	            </ul>
	            <form id="user_form" action="php/addEditUsers.php" method="post" autocomplete='off'>
                    <div class="sidebar-brand">
	                    <h1>User Management</h1>
	                </div>
	                <input type="hidden" class="form-control" id="userId" name="userId" >
	                <label for="userName">Username:</label>
	            	<input type="text" class="form-control" id="userName" name="userName" style="text-transform:uppercase" placeholder="Enter a Username...">
	            	<label for="userPassword">Password:</label>
	            	<input type="password" class="form-control" id="userPassword"  name="userPassword" placeholder="Enter Users Password...">
					<label for="firstName">First Name:</label>
					<input type="text" class="form-control" id="firstName" name="firstName" placeholder="Enter Users First Name...">
					<label for="firstName">Last Name:</label>
					<input type="text" class="form-control" id="lastName"  name="lastName" placeholder="Enter Users Last Name...">
					<label for="userEmail">Email:</label>
					<input type="email" class="form-control" id="userEmail"  name="userEmail" placeholder="Enter Users Email...">
					<label for="userPhone">Phone:</label>
					<input type="text" class="form-control" id="userPhone"  name="userPhone" placeholder="Enter Users Phone Number...">
					<label for="userSecurity">Security:</label>
					<select class="form-control" id="userSecurity" name="userSecurity">
				    	<option value="Administrator">Administrator</option>
				    	<option value="Viewer">Viewer</option>
				  	</select>
	        		<button type="button" class="btn btn-secondary" id="close-button" onclick="hideForm()">Close</button>
	        		<button type="submit" name="submit" id="userSend" class="btn btn-secondary" value="one" >Submit</button>
					<button type="submit" name="submit" id="userEdit" class="btn btn-secondary" value="two" >Save</button>
	        	</form>
	        	<form id="lease_form" action="php/addEditLeases.php" method="post" autocomplete='off'>
                    <div class="sidebar-brand">
	                    <h1>Lease Management</h1>
	                </div>
	                <input type="hidden" class="form-control" id="leaseId" name="leaseId" >
	                <label for="tenant">Tenant:</label>
	            	<select class="form-control" id="tenant" name="tenant">
				    	
				  	</select>
	            	<label for="leaseStart">Lease Start Date:</label>
	            	<input type="date" class="form-control" id="leaseStart"  name="leaseStart">
					<label for="leaseEnd">Lease End Date:</label>
					<input type="date" class="form-control" id="leaseEnd" name="leaseEnd">
					<label for="leaseAmount">Income:</label>
					<input type="text" class="form-control" id="leaseAmount"  name="leaseAmount" placeholder="Enter Amount Income....">
					<label for="freq">Frequency:</label>
					<select class="form-control" id="freq" name="freq">
				      	<option value="Weekly">Weekly</option>
				      	<option value="Bi-Weekly">Bi-Weekly</option>
				      	<option value="Monthly">Monthly</option>
				      	<option value="Annually">Annually</option>
				    </select>
					<label for="property">Property:</label>
					<select class="form-control" id="property" name="property">
				    	
				  	</select>
					<label for="deposit">Deposit:</label>
					<input type="text" class="form-control" id="deposit"  name="deposit">
	        		<button type="button" class="btn btn-secondary" id="close-button" onclick="hideForm()">Close</button>
	        		<button type="submit" name="submit" id="leaseSend" class="btn btn-secondary" value="one" >Submit</button>
					<button type="submit" name="submit" id="leaseEdit" class="btn btn-secondary" value="two" >Save</button>
	        	</form>
	        </div>
	        <div id="settings-page" class="displayNone">
	        	<div id="system-admin">
	        		<span class="close-button"><img src="https://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png" draggable="false" style="position: absolute; left: -2px; top: -336px; width: 59px; height: 492px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></span>
	        		<ul id="settings-list" class="nav nav-tabs">
					  <li id="user" class="settings active"><a href="#">Users</a></li>
					  <li id="property" class="settings"><a href="#">Property</a></li>
					  <li id="lease" class="settings"><a href="#">Leases</a></li>
					</ul>
					<div id="settings-user" class="divSize"></div>
					<div id="settings-property" class="hide"></div>
					<div id="settings-lease" class="hide"></div>
	        	</div>
	        </div>
	        <div id="sidebar-layers" class="displayNone">
	        	<div class="checkbox">
				  <label>
				  	<input type="checkbox" value="" id="markerCheckbox" onclick="getMarkers()"><img src="img/icons/location.png" style="width: 20px; height: 25px" /><h3 class="sidebar-layers-label">Properties</h3>
				  </label>
				</div>
	        </div>
	        <div id="route-details"></div>
	        <!-- Page Content -->
	        <div id="page-content-wrapper">
	            <div class="container-fluid">
	            	<div id="floating-panel">
					    <select id="mode" class="form-control">
					      <option value="DRIVING">Driving</option>
					      <option value="WALKING">Walking</option>
					      <option value="BICYCLING">Bicycling</option>
					      <option value="TRANSIT">Transit</option>
					    </select>
				    </div>
				    <div id="floating-user-panel">
					    <div class="dropdown">
						    <button class="btn btn-default dropdown-toggle" id="signIn" type="button" data-toggle="dropdown"><?php echo $_COOKIE['USERNAME'] ?>
						    <span class="caret"></span></button>
						    <ul class="dropdown-menu">
						      <li><a href="#" id="signout">Sign Out</a></li>
						    </ul>
						</div>
				    </div>
				  	<div id="map"></div>
				  	<div class="iw-bottom-gradient"></div>
				  	<div id="info-box"></div>
				  	<!--- Uncomment route div to see the Origin and Destination lat/lng --->
				  	<div id="route"></div>
	            </div>
	        </div>
 		</div>
	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="components/jquery/jquery-2.1.4.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="components/bootstrap/bootstrap-3.3.5/js/bootstrap.min.js"></script>
    <!-- Include custom jquery -->
    <script src="js/main.js"></script>
    <script src="js/functions/layers.js"></script>
    <script src="js/functions/WMSTiled.js"></script>
    <script src="js/functions/routing.js"></script>
    <script src="js/functions/signout.js"></script>
    <script src="js/functions/admin.js"></script>
    <script src="js/functions/property.js"></script>
    <script src="js/functions/leases.js"></script>
    
	<? @include data.php ?>


  </body>
</html>