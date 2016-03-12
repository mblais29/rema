<?php
	require 'connection.php';

	if(isset($_POST['id'])){
		$query = 'DELETE FROM'.' '.$schema_name.'.property_lease WHERE lease_id='.$_POST['id'];
		//echo $query;
		//Executes the Postgresql Query
	  	pg_query($dbconn, $query);
		echo "Deleted Successfully!";
	}
	//echo $query;
	//echo "<script type='text/javascript'>alert('$result');</script>";
		
?>