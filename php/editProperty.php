<html>
	<body>
		<?php
			include 'connection.php';
			try {
				$sql="UPDATE $schema_name.property SET address='$_POST[address]', city='$_POST[city]', 
						province='$_POST[province]', purchase_price='$_POST[purchase_price]', 
						year_built='$_POST[year_built]', sqft='$_POST[sqft]', type='$_POST[type]', 
						comments='$_POST[comment]', lat='$_POST[lat]', 
						lon='$_POST[lon]' WHERE layer_id='$_POST[layerId]'";
						
					
					//echo "<script type='text/javascript'>alert('$sql');</script>";
					echo $sql;
					echo $_POST[address];
				    /*if(!$sql) {
				        echo 'a activity against this project already exists...';
				      }
				      else{
				      	//Executes the Postgresql Query
				      	pg_query($dbconn, $sql);
						echo $sql;
					}    */
				    // use exec() because no results are returned
					echo "New Record Created Successfully";
				}catch (Exception $e) {
				    echo 'Caught exception: ',  $e->getMessage(), "\n";
					//catch error if exists
					$res1 = pg_get_result($dbconn);
					echo pg_result_error_field($res1, PGSQL_DIAG_SQLSTATE);
				}
				if($_SERVER['REQUEST_METHOD'] == 'POST') {
					//Refreshes the page to show new record
					header("Refresh:0; url=../index.php");
					exit();
				}
				
			    
		?>
	</body>
</html>
