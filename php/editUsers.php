<?php
require 'connection.php';
	$query = 'SELECT * FROM'.' '.$schema_name.'.users ORDER BY username ASC';
	$result = pg_query($query);
	
	//echo "<script type='text/javascript'>alert('$result');</script>";
	if (!$result) {
	  echo "An error occurred.\n";
	  exit;
	}

	$users = array();
	while ($row = pg_fetch_row($result)) {
	  $users[] = $row;
	  //echo "User ID: $row[0].'</br>' First Name: $row[1].'</br>' Last Name: $row[2].'</br>' Email: $row[3].'</br>' Phone: $row[4].'</br>' Username: $row[5].'</br>' Password: $row[6].'</br>' Security: $row[7]";
	  //echo "<br />\n";
	}
	echo json_encode($users);
?>