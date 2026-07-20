$(document).ready(function(){

$("#showPassword").click(function(){

let pass=$("#loginPassword");

if(pass.attr("type")=="password"){

pass.attr("type","text");

$(this).html('<i class="fa-solid fa-eye-slash"></i>');

}

else{

pass.attr("type","password");

$(this).html('<i class="fa-solid fa-eye"></i>');

}

});

$("#loginForm").submit(function(e){

e.preventDefault();

let email=$("#loginEmail").val();

let password=$("#loginPassword").val();

let user=JSON.parse(localStorage.getItem("user"));

if(user==null){

alert("Please create an account first.");

return;

}

if(email==user.email && password==user.password){

localStorage.setItem("currentUser",JSON.stringify(user));

alert("Login Successful");

window.location="profile.html";

}

else{

alert("Invalid Email or Password");

}

});

});
$("#signupForm").submit(function(e){

e.preventDefault();

let name=$("#name").val();

let email=$("#email").val();

let password=$("#password").val();

let confirm=$("#confirmPassword").val();

if(password!=confirm){

alert("Passwords do not match");

return;

}

let user={

name:name,

email:email,

password:password,

rating:800,

wins:0,

losses:0,

games:0,

country:"India",

bio:"Chess Player"

};

localStorage.setItem("user",JSON.stringify(user));

alert("Account Created Successfully");

window.location="login.html";

});