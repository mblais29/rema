
<?php
	include 'connection.php';

		if(isset($_POST['submit']))
			{
			try {	
				getUser($schema_name,$dbconn);
			}catch (Exception $e) {
			    echo 'Caught exception: ',  $e->getMessage(), "\n";
				//catch error if exists
				$res1 = pg_get_result($dbconn);
				echo pg_result_error_field($res1, PGSQL_DIAG_SQLSTATE);
			}
		}
		
		function getUser($schema_name,$dbconn) {
			//checks to see if the user exists
			
			$username = "SELECT username FROM ".$schema_name.".users WHERE username = '$_POST[username]' LIMIT 1";
			$usernameResults = pg_query($dbconn, $username);
			$numrows = pg_numrows($usernameResults);
			if($numrows > 0){
				$usernameResponse = pg_fetch_result($usernameResults, 0, 0);
				checkPassword($usernameResponse,$dbconn,$schema_name);
			}else{
				echo "<script type='text/javascript'>alert('User does not exist..');window.location.replace(\"../login.php\");</script>";
			}
			
			
			
			/*if ($usernameResponse) {
			    //echo 'Retrieved User '.$usernameResponse;
				checkPassword($usernameResponse,$dbconn,$schema_name);
			} else{
				
			}*/
		}
		
		function checkPassword($usernameResponse,$dbconn,$schema_name) {
			//Authenticates to see if the password is valid
			$sql="SELECT (pwd = crypt('$_POST[password]', pwd)) AS password FROM ".$schema_name.".users WHERE username ='".$usernameResponse."' LIMIT 1";
		    //echo '<br/> SQL Query: '.$sql;
			$getResults = pg_query($dbconn, $sql);
			$response = pg_fetch_result($getResults, 0, 0);
			
		
			if ($response == 't') {
			    echo "<script type='text/javascript'>alert('Username and Password are Correct...');</script>";
				$cookie_name = "USERNAME";
				$cookie_value = $usernameResponse;
				setcookie($cookie_name, $cookie_value, time() + (86400 * 1), "/"); //86400 * 1 cookie expires in one day
				header("Location: ../index.php");
		    	exit;
			} else{
			    echo "<script type='text/javascript'>alert('Password is Incorrect...');window.location.replace(\"../login.php\");</script>";
			}
		
		}

	
		
	    
?>

