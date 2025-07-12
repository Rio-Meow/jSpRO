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

let comments = [];

async function loadComments() {
  try {
    comments = await getComments();
    renderComments(comments, commentsList);
    handleAddLikeClick(comments, commentsList);
    handleAddCommentClick(comments, commentsList);
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
    alert("Не удалось загрузить комментарии, попробуйте позднее");
  }
}

loadComments();

handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList,
  loadComments // 
);

console.log("It works! (main.js)");