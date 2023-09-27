const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");

const btn = document.getElementById("login-cta");
btn.addEventListener("click", login);
function login() {
  console.log(usernameEl.value);
  if (usernameEl.value === passwordEl.value) {
    localStorage.setItem("auth", usernameEl.value);
    localStorage.setItem("user", usernameEl.value);
    location.replace("./home.html");
  } else {
    const msg = document.getElementById("msg");
    msg.textContent = "您的账号密码不一致，请您重新输入";
  }
}
