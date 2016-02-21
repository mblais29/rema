<?php
	require 'connection.php';
	$query = 'SELECT * FROM'.' '.$schema_name.'.calgis_layers ORDER BY name ASC';
	$result = pg_query($query);
	
	//echo "<script type='text/javascript'>alert('$result');</script>";
	if (!$result) {
	  echo "An error occurred.\n";
	  exit;
	}

	$layers = array();
	while ($row = pg_fetch_row($result)) {
	  $layers[] = $row;
	  //echo '</br>'.$layers;
	  //echo "Layer ID: $row[0].'</br>' Name: $row[1].'</br>' Description: $row[2].'</br>' WFS URL: $row[3]";
	  //echo "<br />\n";
	}
	echo json_encode($layers);
	
?>