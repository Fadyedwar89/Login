var inputName = document.getElementById("inputName");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputRePassword = document.getElementById("inputRePassword");
var btnSginup = document.getElementById("signup");
var btnLogin = document.getElementById("btnLogin");
var alertDiv = document.getElementById("alert-div"); //---> change d-none to flex
var alldata = []; // storage all data come from local
var ls = localStorage.getItem("data of user");
var username = localStorage.getItem("user name"); // get name of user
var welcome = document.getElementById("welcome");
if (ls) {
  alldata = JSON.parse(ls);
}

if (username) {
  welcome.innerHTML = `welcome mr/mrs ${username} in our Restaurant `;
}
function saveData() {
  var data = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
    rePassword: inputRePassword.value,
  };
  if (
    inputName.classList.contains("is-valid") &&
    inputEmail.classList.contains("is-valid") &&
    inputPassword.classList.contains("is-valid") &&
    inputRePassword.classList.contains("is-valid") &&
    inputPassword.value == inputRePassword.value
  ) {
    alldata.push(data);
    localStorage.setItem("data of user", JSON.stringify(alldata));
    localStorage.setItem("user name", data.name); // to display in login padg
    clear();
    loginPadge();
  } else if (
    inputName.classList.contains("is-invalid") ||
    inputEmail.classList.contains("is-invalid") ||
    inputPassword.classList.contains("is-invalid") ||
    inputRePassword.classList.contains("is-invalid")
  ) {
    alertDiv.classList.replace("d-none", "d-flex");
    alertDiv.innerHTML = `  <div> <i class="fa-solid fa-asterisk  text-danger pe-2"></i>
                            <span id="alert-text" class=" text-danger h6"> Name ( min = 3 max = 20 ) charcter  </span>
                        </div>
                        <div> <i class="fa-solid fa-asterisk  text-danger pe-2"></i>
                            <span id="alert-text" class=" text-danger h6"> Email name@example.com </span>
                        </div> 
                        <div> <i class="fa-solid fa-asterisk  text-danger pe-2"></i>
                            <span id="alert-text" class=" text-danger h6"> password  (1)captal letter (1)small letter (1) number 0->9  (1) @#$*&</span>
                        </div> `;
  } else if (
    inputName.value == "" ||
    inputEmail.value == "" ||
    inputPassword.value == "" ||
    inputRePassword.value == ""
  ) {
    alertDiv.classList.replace("d-none", "d-flex");
  }
}

function clear() {
  var data = {
    name: (inputName.value = ""),
    email: (inputEmail.value = ""),
    password: (inputPassword.value = ""),
    rePassword: (inputRePassword.value = ""),
  };
}
// <!-- ========== Start sign up input event ========== -->

if (inputEmail) {
  // bec  of error not found when swith between page login & home

  inputEmail.oninput = function () {
    validation(this);
  };

  var checkPass = ""; // to save password to check  it in repassword
  inputPassword.oninput = function () {
    checkPass = validation(this);
  };
  if (btnSginup) {
    btnSginup.addEventListener("click", function () {
      saveData();
    });

    inputName.oninput = function () {
      validation(this);
    };

    inputRePassword.oninput = function () {
      if (checkPass == this.value) {
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
      } else {
        this.classList.add("is-invalid");
      }
    };
  }

  // <!-- ========== End sign up input event ========== -->
}

// <!-- ========== start sign in input event ========== -->
if (btnLogin) {
  btnLogin.onclick = function () {
    if (inputEmail.value == "" || inputPassword.value == "") {
      alertDiv.classList.replace("d-none", "d-flex");
    } else if (signinAxis()) {
      loginPadge();
    } else {
      alertDiv.classList.replace("d-none", "d-flex");
      alertDiv.innerHTML = `
         <div> <i class="fa-solid fa-asterisk  text-danger pe-2"></i>
        <span id="alert-text" class=" text-danger h6"> incorrect email or password </span>
    </div>`;
    }
  };
}

function signinAxis() {
  var signinData = {
    email: inputEmail.value,
    password: inputPassword.value,
  };
  for (let i = 0; i < alldata.length; i++) {
    if (
      alldata[i].email == signinData.email &&
      alldata[i].password == signinData.password
    ) {
      // set in local storge to get in next padge
      localStorage.setItem("user name", alldata[i].name);
      return true;
    }
  }
}

function validation(e) {
  var regex = {
    inputName: /^[ \w]{3,20}$/,
    inputEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    inputPassword:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };

  if (regex[e.id].test(e.value)) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
  } else {
    e.classList.add("is-invalid");
  }
  return e.value;
}

function loginPadge() {
  location.replace("login.html");
}
