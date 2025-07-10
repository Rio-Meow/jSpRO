import { formatDate, escapeHtml, delay } from "./utils.js";
import { renderComments } from "./render.js";
import {
  handleAddComment,
  handleAddLikeClick,
  handleAddCommentClick,
} from "./eventListeners.js";
import { getComments, addComment, login, register, getToken } from "./api.js";

const addFormButton = document.querySelector("#add-form-button");
const addFormNameInput = document.querySelector("#add-form-name");
const addFormTextInput = document.querySelector("#add-form-text");
const commentsList = document.querySelector(".comments");
const commentsLoader = document.querySelector("#comments-loader");
const addCommentLoader = document.querySelector("#add-comment-loader");

const authForm = document.querySelector("#auth-form");
const loginInput = document.querySelector("#login-input");
const passwordInput = document.querySelector("#password-input");
const loginButton = document.querySelector("#login-button");
const authError = document.querySelector("#auth-error");
const registerLink = document.querySelector("#register-link");

const registerForm = document.querySelector("#register-form");
const registerLoginInput = document.querySelector("#register-login-input");
const registerPasswordInput = document.querySelector("#register-password-input");
const registerButton = document.querySelector("#register-button");
const registerError = document.querySelector("#register-error");
const loginLink = document.querySelector("#login-link");

let comments = [];
let formNameValue = "";
let formTextValue = "";
let token = await getToken();

async function loadComments() {
  commentsLoader.style.display = "block";
  try {
    comments = await getComments();
    renderComments(comments, commentsList);
    handleAddLikeClick(comments);
    handleAddCommentClick(comments);
  } catch (e) {
    console.error(e);
  } finally {
    commentsLoader.style.display = "none";
  }
}

function showAddForm() {
  authForm.style.display = "none";
  registerForm.style.display = "none";
  addFormButton.style.display = "inline-block";
  document.querySelector(".add-form").style.display = "block";
}

function hideAddForm() {
  authForm.style.display = "block";
  registerForm.style.display = "none";
  addFormButton.style.display = "none";
  document.querySelector(".add-form").style.display = "none";
}

function showRegisterForm() {
  authForm.style.display = "none";
  registerForm.style.display = "block";
}

function showLoginForm() {
  authForm.style.display = "block";
  registerForm.style.display = "none";
}

if (token) {
  showAddForm();
  loadComments();
} else {
  hideAddForm();
  loadComments();
}

handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList,
  addComment,
  loadComments,
  addCommentLoader,
  formNameValue,
  formTextValue,
  token
);

loginButton.addEventListener("click", () => {
  const loginValue = loginInput.value;
  const passwordValue = passwordInput.value;

  login({ login: loginValue, password: passwordValue })
    .then((newToken) => {
      token = newToken;
      showAddForm();
      loadComments();
    })
    .catch((error) => {
      console.error("Ошибка при авторизации:", error);
      authError.textContent = `Ошибка авторизации: ${error.message}`;
      authError.style.display = "block";
    });
});

registerLink.addEventListener("click", (event) => {
  event.preventDefault();
  showRegisterForm();
});

registerButton.addEventListener("click", () => {
  const loginValue = registerLoginInput.value;
  const passwordValue = registerPasswordInput.value;

  register({ login: loginValue, password: passwordValue })
    .then(() => {
      alert("Регистрация прошла успешно!");
      showLoginForm();
    })
    .catch((error) => {
      console.error("Ошибка при регистрации:", error);
      registerError.textContent = `Ошибка регистрации: ${error.message}`;
      registerError.style.display = "block";
    });
});

loginLink.addEventListener("click", (event) => {
  event.preventDefault();
  showLoginForm();
});

addFormNameInput.addEventListener("input", (event) => {
  formNameValue = event.target.value;
});

addFormTextInput.addEventListener("input", (event) => {
  formTextValue = event.target.value;
});

addFormNameInput.value = formNameValue;
addFormTextInput.value = formTextValue;

console.log("It works! (main.js)");