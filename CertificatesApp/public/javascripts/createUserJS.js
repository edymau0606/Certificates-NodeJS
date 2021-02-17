var changePasswordFlag = 0;
var URL = (window.location.search).substring(1);
var flag = getQueryVariable("flag");
var userName = getQueryVariable("userName")
var submitButton = document.getElementById("createUserButton")
if(flag=="edit"){
  var changePassButton = document.getElementById("changePassButton")
  var title = document.getElementById("title")
  var userNameText = document.getElementById("userNameT")
  userNameText.value = userName
  var divPassword = document.getElementById("divPassword")
  var divCPassword = document.getElementById("divCPassword")
  var divBlankRow2 = document.getElementById("divBlankRow2")
  var divBlankRow3 = document.getElementById("divBlankRow3")
  var divBlankRow4 = document.getElementById("divBlankRow4")
  var passwordLabel = document.getElementById("passwordLabel")
  passwordLabel.innerHTML = "New Password"
  divPassword.hidden = true
  divCPassword.hidden = true
  divBlankRow2.hidden = true
  divBlankRow3.hidden = true
  divBlankRow4.hidden = true
  changePassButton.hidden = false
  title.innerHTML = "Edit User: "+userName
  submitButton.innerHTML = "Update"
}

var userNames = []
var settings = {
  "async": true,
  "crossDomain": true,
  "url": window.location.origin + "/getUsers",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
  }
}

$.ajax(settings).done(function (response) {
  var users = (JSON.parse(response)).data
  for (let i = 0; i < users.length; i++) {
    userNames.push(users[i].userName);
  }
});

function showChangePassword(){
  changePasswordFlag = 1
  var changePassButton = document.getElementById("changePassButton")
  var cancelChangePassButton = document.getElementById("cancelChangePassButton")
  var divPassword = document.getElementById("divPassword")
  var divCPassword = document.getElementById("divCPassword")
  var divBlankRow2 = document.getElementById("divBlankRow2")
  var divBlankRow3 = document.getElementById("divBlankRow3")
  var divBlankRow4 = document.getElementById("divBlankRow4")
  divPassword.hidden = false
  divCPassword.hidden = false
  divBlankRow2.hidden = false
  divBlankRow3.hidden = false
  divBlankRow4.hidden = false
  changePassButton.hidden = true
  cancelChangePassButton.hidden = false
}

function hideChangePassword(){
  changePasswordFlag = 0
  var changePassButton = document.getElementById("changePassButton")
  var cancelChangePassButton = document.getElementById("cancelChangePassButton")
  var divPassword = document.getElementById("divPassword")
  var divCPassword = document.getElementById("divCPassword")
  var divBlankRow2 = document.getElementById("divBlankRow2")
  var divBlankRow3 = document.getElementById("divBlankRow3")
  var divBlankRow4 = document.getElementById("divBlankRow4")
  var passwordText = document.getElementById("password")
  var cPasswordText = document.getElementById("cPassword")
  passwordText.value = ""
  cPasswordText.value = ""
  changePassButton.hidden = true
  divPassword.hidden = true
  divCPassword.hidden = true
  divBlankRow2.hidden = true
  divBlankRow3.hidden = true
  divBlankRow4.hidden = true
  changePassButton.hidden = false
  cancelChangePassButton.hidden = true
}

function validate() {
  $("#createUserButton").attr("disabled", true);
  var userName = document.getElementById("userNameT");
  var userNameError = document.getElementById("userNameError");
  var divUserName = document.getElementById("divUserName");

  var password = document.getElementById("passWordLabel");
  var passwordError = document.getElementById("passwordError");
  var divPassword = document.getElementById("divPassword");

  var cPassword = document.getElementById("cPassWordLabel");
  var cPasswordError = document.getElementById("cPasswordError");
  var divCPassword = document.getElementById("divCPassword");

  if (userName.value == "") {
    cleanErrors();
    userNameError.innerHTML = "Insert a User Name"
    userNameError.hidden = false;
    divUserName.setAttribute("class", "container has-error has-feedback")
    $("#createUserButton").attr("disabled", false);
    return false;
  } else if (userNames.includes(userName.value)&&flag==false) {
      cleanErrors();
    userNameError.innerHTML = "User Name Already Exists"
    userNameError.hidden = false;
    divUserName.setAttribute("class", "container has-error has-feedback")
    $("#createUserButton").attr("disabled", false);
    return false;
  } else if (password.value == "") {
    cleanErrors();
    console.log(changePasswordFlag)
    if(changePasswordFlag==0 && flag=="edit"){
      updateUser(changePasswordFlag);
      return true;
    } else {
      passwordError.innerHTML = "Insert a Password"
      passwordError.hidden = false;
      divPassword.setAttribute("class", "container has-error has-feedback")
      $("#createUserButton").attr("disabled", false);
      return false;
    }
  } else if (password.value != cPassword.value) {
    cleanErrors();
    cPasswordError.innerHTML = "Password Mismatch"
    cPasswordError.hidden = false;
    divCPassword.setAttribute("class", "container has-error has-feedback")
    $("#createUserButton").attr("disabled", false);
    return false;
  } else {
    cleanErrors();
    if(flag=="edit"){
      updateUser(changePasswordFlag);
    } else{
      insertUser();
    }
    return true;
  }
}

function cleanErrors(){
      userNameError.hidden = true;
      cPasswordError.hidden = true;
      passwordError.hidden = true;
      var divUserName = document.getElementById("divUserName");
      var divPassword = document.getElementById("divPassword");
      var divCPassword = document.getElementById("divCPassword");
      divUserName.setAttribute("class", "container")
      divCPassword.setAttribute("class", "container")
      divPassword.setAttribute("class", "container")
}

function insertUser() {
  var userName = document.getElementById("userNameT").value;
  var userPassword = document.getElementById("passWordLabel").value;
  
  console.log("Mando esto: "+ userName + userPassword)
  var data = JSON.stringify({
    "userName": userName,
    "userPassword": userPassword
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      location.href = window.location.origin + "/users"
    }
  });

  xhr.open("POST", window.location.origin + "/users");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
}

function updateUser(flag) {
  var userName = document.getElementById("userNameT").value;
  var userPassword;
  if(flag==1){
    userPassword = document.getElementById("password").value;
  } else{
    userPassword = "";
  }
  var userRole = document.getElementById("role").value
  
  var data = JSON.stringify({
    "userName": userName,
    "userPassword": userPassword,
    "userRole": userRole
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      location.href = window.location.origin + "/user"
    }
  });

  xhr.open("PUT", window.location.origin + "/user/"+getQueryVariable("userName"));
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
  
}

function getQueryVariable(variable) {
      var query = URL;
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == variable) {
              return pair[1];
          }
      }
      return false;
  }