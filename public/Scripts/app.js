/*
File name: app.js
Author's name: Sisi Li
Web site name: Sisi's Portfilo
File description: this is a custom javascript file 
*/

/*contact form input validation*/ 
function formValidation(){
let uname = document.contact.name;
let uemail = document.contact.email;
let umessage = document.contact.message;


if(allLetter(uname))
{
 if(ValidateEmail(uemail))
{
if(IsEmpty(umessage)){

}
}
}
return false;
}


/* create a function to validate username */ 
function allLetter(uname)
{ 
let letters = /^[A-Za-z]+$/;
if(uname.value.match(letters))
{
return true;
}
else
{
alert('Username must have alphabet characters only');
uname.focus();
return false;
}
}

/* create a function to validate email */ 
function ValidateEmail(uemail)
{
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(uemail.value.match(mailformat))
{
return true;
}
else
{
alert("You have entered an invalid email address!");
uemail.focus();
return false;
}
}

/* create a function to validate message*/ 
function IsEmpty(umessage)
{
if(umessage.value=="")
{
alert("You have not entered message!");
umessage.focus();
return false;
}
}