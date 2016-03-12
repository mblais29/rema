<?php
require 'connection.php';
	$query = 'SELECT tenant_id, first_name, last_name FROM'.' '.$schema_name.'.property_tenant ORDER BY tenant_id ASC';
	$result = pg_query($query);
	
	//echo "<script type='text/javascript'>alert('$result');</script>";
	if (!$result) {
	  echo "An error occurred.\n";
	  exit;
	}

	$selectTenant = array();
	while ($row = pg_fetch_row($result)) {
	  $selectTenant[] = $row;
	  //echo "User ID: $row[0].'</br>' First Name: $row[1].'</br>' Last Name: $row[2].'</br>' Email: $row[3].'</br>' Phone: $row[4].'</br>' Username: $row[5].'</br>' Password: $row[6].'</br>' Security: $row[7]";
	  //echo "<br />\n";
	}
	echo json_encode($selectTenant);
?>