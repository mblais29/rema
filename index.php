<!DOCTYPE html>
<html ng-app="store" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Real Estate Management App</title>
    
	<!-- Google -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcVieGnFnEqNe_YE8HSQeFn9cEMWBVif4&sensor=false&libraries=drawing" type="text/javascript"></script>
	<link href='https://fonts.googleapis.com/css?family=Signika:600,400' rel='stylesheet' type='text/css'>
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
	  <body>
	  	<div id="wrapper">
		  	<!-- Navigation -->
	        <div id="sidebar-wrapper">
	            <ul class="sidebar-nav">
	                <li class="sidebar-brand">
	                    <h1>Property Information</h1>
	                </li>
	                <li>
	                	<form id="property_form" action="php/property.php" method="post">
		                	<div class="form-group">
							  <input type="text" class="form-control" id="address" name="address" placeholder="Enter Address...">
							  <input type="text" class="form-control" id="city" name="city" placeholder="Enter City...">
							  <input type="text" class="form-control" id="province" name="province" placeholder="Enter Province...">
							  <input type="number" class="form-control" id="purchase_price" name="purchase_price" placeholder="Enter Purchase Price...">
							  <input type="date" class="form-control" id="year_built" name="year_built" placeholder="Enter Year Built...">
							  <input type="number" class="form-control" id="sqft"  name="sqft" placeholder="Enter Square Footage...">
							  <input type="number" class="form-control" id="lat" name="lat" readonly>
							  <input type="number" class="form-control" id="lon" name="lon" readonly>
							  <input type="text" class="form-control" id="type" name="type" placeholder="Enter Dwelling Type 'Condo, detached house etc'...">
							  <textarea class="form-control" rows="5" id="comment" name="comment" placeholder="Enter comment here..."></textarea>
							  <button type="button" class="btn btn-secondary" id="close" onclick="hideForm()">Close</button>
							  <button type="submit" name="send" class="btn btn-secondary">Submit</button>
							</div>
						</form>
	                </li>
	            </ul>
	        </div>
	        <div id="sidebar-layers">
	        	<div class="checkbox">
				  <label>
				  	<input type="checkbox" value="" id="markerCheckbox" onclick="getMarkers()"><img src="img/icons/location.png" style="width: 20px; height: 25px" /><h3 class="sidebar-layers-label">Properties</h3>
				  </label>
				</div>
				<button type="button" class="btn btn-secondary" id="close-nav" onclick="hideForm()">Close</button>
	        </div>
	        <!-- Page Content -->
	        <div id="page-content-wrapper">
	            <div class="container-fluid">
				  	<div id="map"></div>
				  	<div class="iw-bottom-gradient"></div>
	            </div>
	        </div>
 		</div>	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="components/jquery/jquery-2.1.4.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="components/bootstrap/bootstrap-3.3.5/js/bootstrap.min.js"></script>
    <!-- Include custom jquery -->
    <script src="js/main.js"></script>
    <script src="js/functions/functions.js"></script>
	<? @include data.php ?>
  </body>
</html>