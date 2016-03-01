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
		<div id="wrapper">
		  	<div id="login">
		  		<form id="login_form" action="php/login_con.php" method="post">
		  			<div id="header">
		  				<img id="loading-image" src="img/mblais.png" width="100" height="100" alt="Loading..." />
		  			</div>
		  			<label class="login-label" for="username">USERNAME</label>
		  			<input type="text" class="form-control loginInput" id="username" name="username" >
		  			<label class="login-label" for="password">PASSWORD</label>
		  			<input type="password" class="form-control loginInput" id="password" name="password" >
		  			<button type="submit" name="submit" id="sendLogin" class="btn btn-secondary" >Login</button>
		  		</form>
		  	</div>
 		</div>
	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="components/jquery/jquery-2.1.4.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="components/bootstrap/bootstrap-3.3.5/js/bootstrap.min.js"></script>
    <script src="js/functions/layers.js"></script>

  	</body>
</html>