<?php

    $db = new PDO("mysql:dbname=login;host=<----HOST---->;charset=utf8;port=<----PORT---->", "root", "<----PASSWORD---->");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $username = $_POST["username"];
	

    $result_PDOStatement_object = $db->query("SELECT * FROM users WHERE username <> '$username'");
    $result = $result_PDOStatement_object->fetchAll();
        
    

    $results = array();

    foreach ($result as $row) {
        $user = array("username" => $row["username"], "name" => $row["name"], 
                        "student_no" => $row["student_no"], "gender" => $row["gender"], 
                        "age" => $row["age"], "admin" => $row["admin"]);
        array_push($results, $user);
    }

	header("Content-type: application/json");
    print(json_encode($results));
        
    
?>



