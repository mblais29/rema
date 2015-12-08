<?php


$schema_name = 'rema';
$username = 'postgres';
$password = 'afm';

$dbconn = pg_connect("host=localhost port=5432 dbname=rema user=postgres password=afm");

// Check connection
if ($dbconn) {
    //echo "Connection established.";
} else{
    die("Connection could not be established.<br><br>");
}


/*$query = 'SELECT * FROM'.' '.$schema_name.'.users';
$result = pg_query($query);

if (!$result) {
  echo "An error occurred.\n";
  exit;
}

while ($row = pg_fetch_row($result)) {
  echo "ID: $row[0]  First Name: $row[1] Last Name: $row[2] Email: $row[3] Phone: $row[4]";
  echo "<br />\n";
}*/
?>
