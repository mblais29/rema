<?php
	require 'connection.php';
	
	if(isset($_POST['id'])){
		$query = 'DELETE FROM'.' '.$schema_name.'.users WHERE id='.$_POST['id'];
		//echo $query;
		//Executes the Postgresql Query
	  	pg_query($dbconn, $query);
		echo $_POST['name']." Deleted Successfully!";
	}
	//echo $query;
	//echo "<script type='text/javascript'>alert('$result');</script>";
		
?>