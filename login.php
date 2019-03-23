<?php

    $db = new PDO("mysql:dbname=login;host=<----HOST---->;charset=utf8;port=<----PORT---->", "root", "<----PASSWORD---->");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    
    
    $username = $_POST["username"];
    $password = $_POST["password"];
    $password = hash(hash_algos()[2], $password, false); // md5
    
    
    $result_PDOStatement_object = $db->query("SELECT * FROM users WHERE username = '$username'");
    $result = $result_PDOStatement_object->fetchAll();
	    
    $login_result;
    $name;
    $student_no;
    $gender;
    $age;
    $admin;
    
    if (count($result) != 0) {
        foreach ($result as $row) {
            if ($row["password"] == $password) {
                $login_result = "success";
                $username = $row["username"];
                $name = $row["name"];
                $student_no = $row["student_no"];
                $gender = $row["gender"];
                $age = $row["age"];
                $admin = $row["admin"];
                setcookie("username", $username, time()+86400*30, "/");
                setcookie("name", $name, time()+86400*30, "/");
                setcookie("student_no", $student_no, time()+86400*30, "/");
                setcookie("gender", $gender, time()+86400*30, "/");
                setcookie("age", $age, time()+86400*30, "/");
                setcookie("admin", $admin, time()+86400*30, "/");
            } else {
                $login_result = "password incorrect!";
            }
        }
        
    } else {
        $login_result = "account does not exist";
    }   
    
    $return = array("result" => $login_result, "username" => $username);
    print(json_encode($return));
    
        
    
?>



