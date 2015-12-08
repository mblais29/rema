<html>
	<body>
		<?php
			include 'connection.php';
			try {
					//creates the new record
					$sql="INSERT INTO rema.property(address, city, province, purchase_price, year_built, sqft, type, comments, lat, lon)
		    		VALUES ('$_POST[address]', '$_POST[city]', '$_POST[province]', '$_POST[purchase_price]', '$_POST[year_built]', '$_POST[sqft]', '$_POST[type]', '$_POST[comment]', '$_POST[lat]', '$_POST[lon]')";
				    
				    
				    if(!$sql) {
				        echo 'a activity against this project already exists...';
				      }
				      else{
				      	//Executes the Postgresql Query
				      	pg_query($dbconn, $sql);
						echo $sql;
					}	    
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
