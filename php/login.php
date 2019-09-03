<?php 
	$text = file_get_contents("../login.txt");
	  
	//echo $text;  
	  
	$arr = explode(',', $text);
	  
	$name = $_GET["name"];
	$password = $_GET["password"];
  
  //echo $name . " " . $password . "\n";
  
  //echo $arr[0] . " " . $arr[1] . "\n";
    
	if(($name == $arr[0]) && ($password == $arr[1])) {
		//var_dump($result);				
    echo "./timer.html";
	}else{
		echo "no";
	}
?>