import { formatDate, escapeHtml } from "./utils.js";
import { renderComments } from "./render.js";
import {
  handleAddComment,
  handleAddLikeClick,
  handleAddCommentClick,
} from "./eventListeners.js";
import { getComments, addComment } from "./api.js";

const addFormButton = document.querySelector(".add-form-button");
const addFormNameInput = document.querySelector("#add-form-name");
const addFormTextInput = document.querySelector("#add-form-text");
const commentsList = document.querySelector(".comments");

let comments = [];

async function loadComments() {
  comments = await getComments();
  renderComments(comments, commentsList);
  handleAddLikeClick(comments);
  handleAddCommentClick(comments);
}

loadComments();

handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList,
  addComment,
  loadComments
);

console.log("It works! (main.js)");