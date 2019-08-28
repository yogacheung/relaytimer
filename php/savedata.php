<?php
  $data = file_get_contents('php://input');
  $myfile = fopen("../data.txt", "w");
  fwrite($myfile, $data);
  fclose($myfile);
?>