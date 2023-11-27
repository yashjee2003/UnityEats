let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");
let login = document.getElementById("login");
let contnue = document.getElementById("continue");
let form = document.getElementById("signIn-signUp");
let passCheck = document.getElementById("password-emoji");
passCheck.classList.add("fa-solid", "fa-eye");
login.classList.add("disable-login");

signIn.onclick = function () {
  if (!signUp.classList.contains("disable")) {
    nameField.classList.toggle("disable-nameField");
    contnue.classList.add("disable-login");
    login.classList.remove("disable-login");
    title.innerHTML = "Sign In";
    signUp.classList.toggle("disable");
    signIn.classList.toggle("disable");
  }
};

signUp.onclick = function () {
  if (!signIn.classList.contains("disable")) {
    nameField.classList.toggle("disable-nameField");
    login.classList.add("disable-login");
    contnue.classList.remove("disable-login");
    title.innerHTML = "Sign Up";
    signUp.classList.toggle("disable");
    signIn.classList.toggle("disable");
  }
};

async function checkPassoword() {
  let getPass = document.getElementById("pass");
  console.log(getPass.type);
  if (getPass.type === "password") {
    passCheck.classList.remove("fa-eye");
    passCheck.classList.add("fa-eye-slash");
    getPass.type = "text";
  } else {
    getPass.type = "password";
    passCheck.classList.add("fa-eye");
    passCheck.classList.remove("fa-eye-sl ash");
  }
}

async function checkDetails() {
  let getName = document.getElementById("name");
  let getEmail = document.getElementById("email");
  let getPass = document.getElementById("pass");
  let status = document.getElementById("status");
  let email = getEmail.value;
  let pass = getPass.value;
  let response;
  try {
    if (!contnue.classList.contains("disable-login")) {
      let name = getName.value;
      if (name == "") {
        return (status.textContent = "❌ Please Fill all the Parameters!!!");
      }
      if (email == "") {
        return (status.textContent = "❌ Please Fill all the Parameters!!!");
      }
      if (pass == "") {
        return (status.textContent = "❌ Please Fill all the Parameters!!!");
      }
      response = await fetch(
        `http://104.131.181.55:3030/api/continue/${name}/${email}/${pass}`
      );
    } else {
      if (email == "") {
        return (status.textContent = "❌ Please Fill all the Parameters!!!");
      }
      if (pass == "") {
        return (status.textContent = "❌ Please Fill all the Parameters!!!");
      }
      response = await fetch(
        `http://104.131.181.55:3030/api/login/${email}/${pass}`
      );
    }
    let result = await response.json();
    console.log(result);
    if (result.success == true) {
      if (result.message == "Registration Successfull") {
        form.reset();
        status.style.color = "#3c00a0";
        status.textContent = `✅ Registration Completed`;
        nameField.classList.toggle("disable-nameField");
        login.classList.remove("disable-login");
        contnue.classList.add("disable-login");
        title.innerHTML = "Sign Up";
        signUp.classList.toggle("disable");
        signIn.classList.toggle("disable");
      } else {
        window.location.assign(
          "http://127.0.0.1:3000/CSE-326/CA%203/Food%20Donation/home.html"
        );
      }
    } else {
      form.reset();
      status.style.color = "#FF0000";
      if (result.message == "Internal Server Error") {
        status.textContent = "❌ Server Error, Please try again later!!!";
      } else if (result.message == "This Email is Already Used") {
        status.textContent = "❌ This Email is already Registered!!!";
      } else if (result.message == "Invalid Email or Password") {
        status.textContent = "❌ This Email is not Registered!!!";
      } else if (result.message == "Incorrect Password") {
        status.textContent = "❌ Incorrect Password!!!";
      }
    }
  } catch (e) {}
}
