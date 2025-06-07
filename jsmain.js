import { formatDate, escapeHtml } from "./utils.js";
import { renderComments } from "./render.js";
import {
  handleAddComment,
  handleAddLikeClick,
  handleAddCommentClick,
} from "./eventListeners.js";

const addFormButton = document.querySelector(".add-form-button");
const addFormNameInput = document.querySelector("#add-form-name");
const addFormTextInput = document.querySelector("#add-form-text");
const commentsList = document.querySelector(".comments");

let comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLiked: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLiked: true,
  },
];

renderComments(comments, commentsList);
handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList
);
handleAddLikeClick(comments, commentsList);
handleAddCommentClick(comments, commentsList);

console.log("It works! (main.js)");