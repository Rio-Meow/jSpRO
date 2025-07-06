import { formatDate, escapeHtml } from "./utils.js";
import { renderComments } from "./render.js";
import {
  handleAddComment,
  handleAddLikeClick,
  handleAddCommentClick,
} from "./eventListeners.js";
import { getComments, addComment } from "./api.js";

const addFormButton = document.querySelector("#add-form-button"); 
const addFormNameInput = document.querySelector("#add-form-name");
const addFormTextInput = document.querySelector("#add-form-text");
const commentsList = document.querySelector(".comments");
const commentsLoader = document.querySelector("#comments-loader"); 
const addCommentLoader = document.querySelector("#add-comment-loader");

let comments = [];

async function loadComments() {
  commentsLoader.style.display = "block"; 
  try {
    comments = await getComments();
    renderComments(comments, commentsList);
    handleAddLikeClick(comments);
    handleAddCommentClick(comments);
  } finally {
    commentsLoader.style.display = "none"; 
  }
}

loadComments();

handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList,
  addComment,
  loadComments,
  addCommentLoader 
);

console.log("It works! (main.js)");