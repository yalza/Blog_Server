const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

class User {
  saveUser(username, password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }

  // Lấy giá trị username và password từ localStorage
  getUser() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    return { username, password };
  }
}

module.exports = new User();
