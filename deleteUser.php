<?php

    $db = new PDO("mysql:dbname=login;host=<----HOST---->;charset=utf8;port=<----PORT---->", "root", "<----PASSWORD---->");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    
    $username = $_POST["username"];
	

    $db->exec("DELETE FROM users WHERE username = '$username'");
        

?>



