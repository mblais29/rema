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
	                <li class="sidebar-brand">
	                    <h1>Property Information</h1>
	                </li>
	                <li>
	                	<form id="property_form" action="php/property.php" method="post">
		                	<div class="form-group">
		                	  <input type="hidden" class="form-control" id="layerId" name="layerId" >
							  <input type="text" class="form-control" id="address" name="address" placeholder="Enter Address...">
							  <input type="text" class="form-control" id="city" name="city" placeholder="Enter City...">
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
							  <input type="text" class="form-control" id="purchase_price" name="purchase_price" placeholder="Enter Purchase Price...">
							  <input type="date" class="form-control" id="year_built" name="year_built" placeholder="Enter Year Built...">
							  <input type="number" class="form-control" id="sqft"  name="sqft" placeholder="Enter Square Footage...">
							  <input type="number" class="form-control" id="lat" name="lat" readonly>
							  <input type="number" class="form-control" id="lon" name="lon" readonly>
							  <select class="form-control" id="type" name="type">
							      <option value="Detached House">Detached House</option>
							      <option value="Attached House">Attached House</option>
							      <option value="Condo">Condo</option>
							      <option value="Land">Land</option>
							  </select>
							  <textarea class="form-control" rows="5" id="comment" name="comment" placeholder="Enter comment here..."></textarea>
							  <button type="button" class="btn btn-secondary" id="close" onclick="hideForm()">Close</button>
							  <button type="submit" name="submit" id="send" class="btn btn-secondary" value="one" >Submit</button>
							  <button type="submit" name="submit" id="edit" class="btn btn-secondary" value="two" >Edit</button>
							</div>
						</form>
	                </li>
	            </ul>
	            <form id="user_form" action="" method="post">
                    <div class="sidebar-brand">
	                    <h1>User Management</h1>
	                </div>
	            	<input type="text" class="form-control" id="userName" name="userName" placeholder="Enter a Username...">
	            	<input type="password" class="form-control" id="userPassword"  name="userPassword" placeholder="Enter Users Password...">
					<input type="text" class="form-control" id="firstName" name="firstName" placeholder="Enter Users First Name...">
					<input type="text" class="form-control" id="lastName"  name="lastName" placeholder="Enter Users Last Name...">
					<input type="text" class="form-control" id="userEmail"  name="userEmail" placeholder="Enter Users Email...">
					<input type="text" class="form-control" id="userPhone"  name="userPhone" placeholder="Enter Users Phone Number...">
					<select class="form-control" id="userSecurity" name="userSecurity">
				    	<option value="admin">Administrator</option>
				    	<option value="viewer">Viewer</option>
				  	</select>
	        		<button type="button" class="btn btn-secondary" id="close-button" onclick="hideForm()">Close</button>
	        	</form>
	        </div>
	        <div id="settings-page">
	        	<div id="system-admin">
	        		<span class="close-button"><img src="https://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png" draggable="false" style="position: absolute; left: -2px; top: -336px; width: 59px; height: 492px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></span>
	        		<ul id="settings-list" class="nav nav-tabs">
					  <li id="user" class="settings active"><a href="#">Users</a></li>
					  <li id="property" class="settings"><a href="#">Property</a></li>
					  <li id="lease" class="settings"><a href="#">Leases</a></li>
					</ul>
					<div id="settings-user" class="divSize">
						
	        		</div>
					<div id="settings-property" class="hide">Property Page</div>
					<div id="settings-lease" class="hide">Lease Page </div>
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
    
	<? @include data.php ?>


  </body>
</html>