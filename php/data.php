<?php
	include 'connection.php';
	$query = 'SELECT * FROM'.' '.$schema_name.'.property';
	$result = pg_query($query);
	
	//echo "<script type='text/javascript'>alert('$result');</script>";
	if (!$result) {
	  echo "An error occurred.\n";
	  exit;
	}

	$markers = array();
	while ($row = pg_fetch_assoc($result)) {
	  $markers = $row['lat'].','.$row['lon'];
		//echo '</br>'.$markers;
	  //echo "Property ID: $row[0]  Address: $row[1] City: $row[2] Province: $row[3] Purchase Price: $row[4] Year Built: $row[5] Square Feet: $row[6] Building Type: $row[7] Comments: $row[8] Latitude: $row[9] Longitude: $row[10]";
	  //echo "<br />\n";
	}
	echo $markers;
	
?>

