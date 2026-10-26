/* auth.js: register, login, logout.
   Every registered person is pushed into the `users` array.
   Login searches that array for a matching email + password.
   The array is also saved in localStorage so it survives a refresh. */

const USERS_KEY = "unicalMallUsers";
const SESSION_KEY = "unicalMallSession";

let users = readStorage(USERS_KEY, []);   // [{ name, matric, email, phone, password }]
let currentUser = null;                   // null = nobody is logged in

function readStorage(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved === null ? fallback : saved;
  } catch (error) {
    return fallback;
  }
}

function showMsg(id, text, isError) {
  $(id).textContent = text;
  $(id).className = "note" + (isError ? " error" : "");
}

function togglePassword(inputId, visible) {
  $(inputId).type = visible ? "text" : "password";
}

/* Register -> save the user -> go back to the login screen */
function register(event) {
  event.preventDefault();
  const user = {
    name: $("regName").value.trim(),
    matric: $("regMatric").value.trim().toUpperCase(),
    email: $("regEmail").value.trim().toLowerCase(),
    phone: $("regPhone").value.trim(),
    password: $("regPw").value
  };

  if (users.some(u => u.email === user.email)) {
    return showMsg("registerMsg", "This email is already registered. Please log in.", true);
  }
  if (users.some(u => u.matric === user.matric)) {
    return showMsg("registerMsg", "This matric number is already registered. Please log in.", true);
  }

  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  event.target.reset();
  $("loginEmail").value = user.email;
  showMsg("loginMsg", "Account created. Log in to continue.", false);
  go("login");
}

/* Login -> check the users array -> go to the dashboard */
function login(event) {
  event.preventDefault();
  const email = $("loginEmail").value.trim().toLowerCase();
  const password = $("loginPw").value;

  const found = users.find(u => u.email === email && u.password === password);
  if (!found) {
    return showMsg("loginMsg", "Wrong email or password. Please try again.", true);
  }

  currentUser = found;
  localStorage.setItem(SESSION_KEY, found.email);
  event.target.reset();
  showMsg("loginMsg", "", false);
  go("dashboard");
}

function logout() {
  currentUser = null;
  cart = [];
  localStorage.removeItem(SESSION_KEY);
  showMsg("loginMsg", "You have been logged out.", false);
  go("login");
}

/* Keep the user logged in after a page refresh */
function restoreSession() {
  const email = localStorage.getItem(SESSION_KEY);
  currentUser = users.find(u => u.email === email) || null;
}
