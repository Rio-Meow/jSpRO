import { renderComments } from "./modules/render.js";
import { handleAddLikeClick, handleAddCommentClick } from "./modules/eventListeners.js";
import { getComments, addComment } from "./modules/api.js";
import { login } from "./modules/auth.js";

const commentsList = document.querySelector(".comments");
const addForm = document.querySelector("#add-form");
const authForm = document.querySelector("#auth-form");
const loginButton = document.querySelector("#login-button");
const loginInput = document.querySelector("#login-input");
const passwordInput = document.querySelector("#password-input");
const addFormButton = document.querySelector(".add-form-button");
const addFormTextInput = document.querySelector("#add-form-text");

let comments = [];

async function loadComments() {
  try {
    comments = await getComments();
    renderComments(comments, commentsList);
    handleAddLikeClick(comments, commentsList);
    handleAddCommentClick(comments, commentsList);
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
  }
}

function checkAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    addForm.style.display = "block";
    authForm.style.display = "none";
    addFormButton.disabled = false;
  } else {
    addForm.style.display = "none";
    authForm.style.display = "block";
    addFormButton.disabled = true;
  }
}

loginButton.addEventListener("click", () => {
  const loginValue = loginInput.value;
  const passwordValue = passwordInput.value;

  login({ login: loginValue, password: passwordValue })
    .then(() => {
      checkAuth();
      loadComments();
    })
    .catch((error) => {
      alert(error.message || "Неверный логин или пароль");
    });
});

addFormButton.addEventListener("click", () => {
  const name = document.querySelector("#add-form-name").value;
  const text = addFormTextInput.value;

  console.log("Name:", name);
  console.log("Text:", text);

  if (!name || !text) {
      alert("Пожалуйста, заполните все поля");
      return;
  }

  addComment({ name, text })
    .then(() => {
      document.querySelector("#add-form-name").value = "";
      addFormTextInput.value = "";
      return loadComments();
    })
    .catch((error) => {
      alert("Ошибка: " + error);
    });
});

checkAuth();
loadComments();