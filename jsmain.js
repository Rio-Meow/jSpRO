import { formatDate, escapeHtml } from "./modules/utils.js";
import { renderComments } from "./modules/render.js";
import {
  handleAddComment,
  handleAddLikeClick,
  handleAddCommentClick,
} from "./modules/eventListeners.js";
import { getComments, addComment } from "./modules/api.js";

const addFormButton = document.querySelector(".add-form-button");
const addFormNameInput = document.querySelector("#add-form-name");
const addFormTextInput = document.querySelector("#add-form-text");
const commentsList = document.querySelector(".comments");
const loadingIndicator = document.createElement("p"); 

let comments = [];
let initialLoad = true; 
let storedName = ""; 
let storedText = ""; 

async function loadComments() {
  if (initialLoad) {
    commentsList.innerHTML = "";
    loadingIndicator.textContent = "Загрузка комментариев...";
    commentsList.appendChild(loadingIndicator); 
  }

  try {
    comments = await getComments();
    if (initialLoad) {
      loadingIndicator.remove(); 
    }
    renderComments(comments, commentsList);
    handleAddLikeClick(comments, commentsList);
    handleAddCommentClick(comments, commentsList);
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
    if (initialLoad) {
      loadingIndicator.textContent = "Не удалось загрузить комментарии. Попробуйте позднее."; 
    }
  } finally {
    initialLoad = false; 
  }
}

loadComments(); 

addFormNameInput.addEventListener("input", () => {
  storedName = addFormNameInput.value;
});

addFormTextInput.addEventListener("input", () => {
  storedText = addFormTextInput.value;
});

handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList,
  loadComments,
);

addFormNameInput.value = storedName;
addFormTextInput.value = storedText;

console.log("It works! (main.js)");