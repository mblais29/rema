
<?php
include 'connection.php';
// Only process POST requests.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
		switch( $_POST['submit'] ) {
		case 'one':
			try {
				//creates the new record
				$sql="INSERT INTO $schema_name.property_tenant(first_name, last_name, phone, email, occupation)
	    		VALUES ('$_POST[firstname]', '$_POST[lastname]', '$_POST[phone]', '$_POST[email]', '$_POST[occup]')";
				//echo $sql;
		      	//Executes the Postgresql Query
		      	pg_query($dbconn, $sql);
				//echo $_POST['userName'];
				echo "Created the Tenant Successfully!";
			}catch (Exception $e) {
			    echo 'Caught exception: ',  $e->getMessage(), "\n";
				//catch error if exists
				$res1 = pg_get_result($dbconn);
				echo pg_result_error_field($res1, PGSQL_DIAG_SQLSTATE);
			}
			break;
		case 'two':
			try {
				$sql="UPDATE $schema_name.property_lease SET tenant_id='$_POST[tenant]', lease_start_date='$_POST[leaseStart]', 
						lease_end_date='$_POST[leaseEnd]', lease_amount='$_POST[leaseAmount]', 
						lease_freq='$_POST[freq]', property_id='$_POST[property]', lease_deposit='$_POST[deposit]'";
						
					
					//echo "<script type='text/javascript'>alert('$sql');</script>";
					pg_query($dbconn, $sql);
					//echo $sql;
				    /*if(!$sql) {
				        echo 'a activity against this project already exists...';
				      }
				      else{
				      	//Executes the Postgresql Query
				      	pg_query($dbconn, $sql);
						echo $sql;
					}    */
				    // use exec() because no results are returned
					echo "Updated Record Successfully";
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
