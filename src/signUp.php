<?php
    
    $db = new PDO("mysql:dbname=login;host=<----HOST---->;charset=utf8;port=<----PORT---->", "root", "<----PASSWORD---->");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $username = $_POST["username"];
    $password = $_POST["password"];
    $password = hash(hash_algos()[2], $password, false); // md5
    $name = $_POST["name"];
    $student_no = $_POST["student_no"];
    $gender = $_POST["gender"];
    $age = $_POST["age"];
    $admin = $_POST["admin"];
    


    $result_PDOStatement_object = $db->query("SELECT * FROM users WHERE username = '$username'");
    $result = $result_PDOStatement_object->fetchAll();
    
    $sign_up_result;
    
    if (count($result) == 0) {
        $rowsAffected = $db->exec("
            INSERT INTO users
                (username, password, name, student_no, gender, age, admin)
            VALUES
                ('$username', '$password', '$name', '$student_no', '$gender', '$age', '$admin')
        ");
        $sign_up_result = "success";
    } else {
        $sign_up_result = "This username has been registered";
    }
    
    setcookie("username", $username, time()+86400*30, "/");
    setcookie("name", $name, time()+86400*30, "/");
    setcookie("student_no", $student_no, time()+86400*30, "/");
    setcookie("gender", $gender, time()+86400*30, "/");
    setcookie("age", $age, time()+86400*30, "/");
    setcookie("admin", $admin, time()+86400*30, "/");
    print(json_encode(["result" => $sign_up_result]));
    
?>



