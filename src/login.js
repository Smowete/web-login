/* comments are in comment.txt */

(function() {
    'use strict';
    
    var $ = function(id) {
        return document.getElementById(id);
    };
    var qs = function(sel) {
        return document.querySelector(sel); 
    };
    var qsa = function(sel) {
        return document.querySelectorAll(sel); 
    };
    
    window.onload = function() {
        $("loginButton").onclick = login;
        $("signUpButton").onclick = signUp;
    };
    
    function login() {
        var pass = true;
		if ($("usernameInput").value.length == 0) {
			$("usernameInput").focus();
			pass = false;
			alert("Please enter your USERNAME");
		} else if ($("passwordInput").value.length == 0) {
			$("passwordInput").focus();
			pass = false; 
			alert("Please enter your PASSWORD");
		}
		
		if (pass) {
			var username = $("usernameInput").value;
			var password = $("passwordInput").value;
			
			var ajaxPostPromise = 
				AjaxPostPromise("login.php", {
					username : username, 
					password : password
				});
			ajaxPostPromise
				.then(JSON.parse)
				.then(afterLogin)
				.catch(havingError);
		}
    }
    
    function afterLogin(response) {
        if(response["result"] == "success") {
            window.location.href="index.html";
        } else {
            $("loginResult").innerHTML = response["result"];
        }
    }
    
    function signUp() {
        $("loginButton").classList.add("hidden");
        $("signUpButton").classList.add("hidden");
        
        $("name").classList.remove("hidden");
		$("password2").classList.remove("hidden");
		$("studentNo").classList.remove("hidden");
		$("age").classList.remove("hidden");
		$("gender").classList.remove("hidden");
		$("admin").classList.remove("hidden");
        $("submitButton").classList.remove("hidden"); 
        $("doing").innerHTML = "Sign Up";
        $("submitButton").onclick = submitSignUp;
    }
    
    function submitSignUp() {
		var pass = true;
		if ($("usernameInput").value.length == 0) {
			$("usernameInput").focus();
			pass = false;
			alert("Please enter your USERNAME");
		} else if ($("passwordInput").value.length == 0) {
			$("passwordInput").focus();
			pass = false; 
			alert("Please enter your PASSWORD");
		} else if ($("passwordInput2").value.length == 0) {
			$("passwordInput2").focus();
			pass = false;
			alert("Please re-enter your PASSWORD");
		} else if ($("nameInput").value.length == 0) {
			$("nameInput").focus();
			pass = false;
			alert("Please enter a NAME");
		} else if ($("studentNoInput").value.length == 0) {
			$("studentNoInput").focus();
			pass = false;
			alert("Please enter a STUDENT NUMBER");
		} else if ($("ageInput").value.length == 0) {
			$("ageInput").focus();
			pass = false;
			alert("Please enter a AGE");
		}
		

		if (pass) {
			var username = $("usernameInput").value;
			var password = $("passwordInput").value;
			var password2 = $("passwordInput2").value;
			var name = $("nameInput").value;
			var studentNo = $("studentNoInput").value;
			var age = $("ageInput").value;
			var gender = 1;
			if ($("genderInput2").checked == true) {
				gender = 2;
			}
			var admin = 0;
			if ($("adminInput").checked == true) {
				admin = 1;
			}
			if (password == password2) {
				var ajaxPostPromise = 
					AjaxPostPromise("signUp.php", {
						username : username, 
						password : password,
						name : name,
						student_no : studentNo,
						age : age,
						gender : gender,
						admin : admin
					});
				ajaxPostPromise
					.then(JSON.parse)
					.then(aftersignUp)
					.catch(havingError);
			} else {
				$("passwordInput").innerHTML = null;
				$("passwordInput2").innerHTML = null;
				$("loginResult").innerHTML = "passwords do not match, please re-enter";
			}
		}
    }
    
    function aftersignUp(response) {
        if (response["result"] == "success") {
            $("loginResult").innerHTML = response["result"];
            window.location.href="index.html";
        } else {
            $("loginResult").innerHTML = response["result"];
        }
    }
    
    function havingError(errorMessage) {
        alert("Ohhh... There is something wrong: " + errorMessage);
    }
    
})();




