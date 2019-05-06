


(function() {
    'use strict';
    
    var loggedIn = false;
    var username;
    var name;
    var studentNo;
    var gender;
    var age;
    var admin;
    
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
        initialize();
        
    };
    
    function initialize() {
        if (getCookie("username")) {
            loggedIn = true;
            username = getCookie("username");
            name = getCookie("name");
            studentNo = getCookie("student_no");
            gender = getCookie("gender");
            admin = getCookie("admin");
            if (gender == 1) {
                gender = "male";
            } else {
                gender = "female";
            }
            age = getCookie("age");
        }
        if (loggedIn) {
            $("username").innerHTML = username;
            $("username1").innerHTML = username;
            $("name").innerHTML = name;
            $("studentNo").innerHTML = studentNo;
            $("gender").innerHTML = gender;
            $("age").innerHTML = age;

            $("signIn").classList.add("hidden");
            $("signInNote").classList.add("hidden");
            $("signOut").classList.remove("hidden");
            $("information").classList.remove("hidden");
            $("signOut").onclick = signOut;

            if (admin == 1) {
                $("admin").classList.remove("hidden");

                var ajaxPostPromise = 
				AjaxPostPromise("users.php", {
					username : username
				});
                ajaxPostPromise
                    .then(JSON.parse)
                    .then(getUsers)
                    .catch();
            }
        }
    }

    function getUsers(response) {
        var list = $("users")
        for (var i = 0; i < response.length; i++) {
            var userGender = response[i]["gender"];
            if (userGender == 1) {
                userGender = "male";
            } else {
                userGender = "female";
            }
            var userAdmin = response[i]["admin"];
            if (userAdmin == 0) {
                userAdmin = "no";
            } else {
                userAdmin = "yes";
            }
            
            var user = "Username: " + response[i]["username"] + ", Name: " + response[i]["name"] +
                    ", Student Number: " + response[i]["student_no"] + ", Gender: " + userGender + 
                    ", Age: " + response[i]["age"] + ", Administrator?: " + userAdmin + "     --operations----> ";
            var item = document.createElement("li");

            var deleteButton = document.createElement("button");
            deleteButton.onclick = deleteUser;
            deleteButton.innerHTML = "delete user";
            deleteButton.id = "username_" + response[i]["username"];

            item.innerText = user;
            item.appendChild(deleteButton);
            list.appendChild(item);
        }
    }

    function deleteUser() {
        var toDelete = this.id.substring(9);
        
        var ajaxPostPromise = 
        AjaxPostPromise("deleteUser.php", {
            username : toDelete
        });
        ajaxPostPromise
            .then(function() {window.location.reload();})
            .catch();
    }
    
    function signOut() {
        deleteCookie("username");
        window.location.reload();
    }
    
    function deleteCookie(name) { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval = getCookie(name); 
        if(cval != null) {
            document.cookie= name + "="+cval+"; expires="+exp.toGMTString() + "; path=/;"; 
        }
    }
    
    function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function havingError(errorMessage) {
        alert("Ohhh... There is something wrong: " + errorMessage);
    }
    
    
})();