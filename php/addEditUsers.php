
<?php
include 'connection.php';
// Only process POST requests.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
		switch( $_POST['submit'] ) {
		case 'one':
			try {
				//creates the new record
				$sql="INSERT INTO $schema_name.users(first_name, last_name, email, phone, username, pwd, security)
	    		VALUES ('$_POST[firstName]', '$_POST[lastName]', '$_POST[userEmail]', '$_POST[userPhone]', '$_POST[userName]', crypt('$_POST[userPassword]', gen_salt('bf')), '$_POST[userSecurity]')";

		      	//Executes the Postgresql Query
		      	pg_query($dbconn, $sql);
				//echo $_POST['userName'];
				echo "Created ".$_POST['userName']." Successfully!";
			}catch (Exception $e) {
			    echo 'Caught exception: ',  $e->getMessage(), "\n";
				//catch error if exists
				$res1 = pg_get_result($dbconn);
				echo pg_result_error_field($res1, PGSQL_DIAG_SQLSTATE);
			}
			break;
		case 'two':
			try {
				//Select the updated user password from the database
				$query = "SELECT pwd FROM $schema_name.users WHERE id='$_POST[userId]'";
				$result = pg_query($dbconn,$query);
				
				$password = "";
				while ($row = pg_fetch_row($result)) {
				  //echo "Password: $row[0]";
				  $password = $row[0];
				}
				
				//Check to see if database password matches the Posted password, if so do not update the password, else delete user and re-insert the user with encrypted password
				if($password === $_POST['userPassword']){
					$sql="UPDATE $schema_name.users SET first_name='$_POST[firstName]', last_name='$_POST[lastName]', 
						email='$_POST[userEmail]', phone='$_POST[userPhone]', 
						username='$_POST[userName]', security='$_POST[userSecurity]' WHERE id='$_POST[userId]' ";

					//echo "<script type='text/javascript'>alert('$sql');</script>";
					pg_query($dbconn, $sql);
					echo "Updated ".$_POST['userName']." Successfully!";
				}else{
					//echo 'Password Was Changed.....';
					//echo $password.'<br/>'.$_POST['userPassword'].'<br/>';
					
					//Delete User info
					$delSql = "DELETE FROM $schema_name.users WHERE id='$_POST[userId]'";
					pg_query($dbconn, $delSql);
					//echo '<br/>'.$delSql.'<br/>';
					
					//Insert all the new records for the user
					$sql="INSERT INTO $schema_name.users(id, first_name, last_name, email, phone, username, pwd, security)
	    			VALUES ('$_POST[userId]','$_POST[firstName]', '$_POST[lastName]', '$_POST[userEmail]', '$_POST[userPhone]', '$_POST[userName]', crypt('$_POST[userPassword]', gen_salt('bf')), '$_POST[userSecurity]')";
						
					pg_query($dbconn, $sql);
					echo "Updated ".$_POST['userName']." Successfully!";
				};	
			}catch (Exception $e) {
			   echo 'Caught exception: ',  $e->getMessage(), "\n";
				//catch error if exists
				$res1 = pg_get_result($dbconn);
				echo pg_result_error_field($res1, PGSQL_DIAG_SQLSTATE);
			}
			break;
	}
}    
?>
